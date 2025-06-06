import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { tabelogAgent } from "../agents/tabelog-agent";
import { tabelogSearchResultsTool } from "../tools/tabelog-tool";

// 検索結果のレストラン情報の型定義
interface SearchRestaurantInfo {
  name: string;
  url: string;
  genre: string;
  area: string;
  station: string;
  distance: string;
  rating: number;
  reviewCount: number;
  savedCount: number;
  budgetDinner: string;
  budgetLunch: string;
  description: string;
  hasVpoint: boolean;
  isHotRestaurant: boolean;
  thumbnailImages: string[];
}

// ユーザー好みの型定義
interface UserPreference {
  budget: string;
  genres: string[];
  purpose: string;
}

// 推薦結果の型定義
interface RecommendationResult {
  restaurant: SearchRestaurantInfo;
  recommendReason: string;
  matchScore: number;
}

// モックユーザー好み
const mockPreference: UserPreference = {
  budget: "5000円以下",
  genres: ["バル", "焼肉"],
  purpose: "友人との会食",
};

// レストラン情報のZodスキーマ
const SearchRestaurantInfoSchema = z.object({
  name: z.string(),
  url: z.string(),
  genre: z.string(),
  area: z.string(),
  station: z.string(),
  distance: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  savedCount: z.number(),
  budgetDinner: z.string(),
  budgetLunch: z.string(),
  description: z.string(),
  hasVpoint: z.boolean(),
  isHotRestaurant: z.boolean(),
  thumbnailImages: z.array(z.string()),
});

// Step 1: レストラン一覧取得
const fetchRestaurants = createStep({
  id: "fetch-restaurants",
  description: "食べログの検索結果URLからレストラン一覧を取得",
  inputSchema: z.object({
    url: z.string().url(),
  }),
  outputSchema: z.object({
    restaurants: z.array(SearchRestaurantInfoSchema),
  }),
  execute: async ({ inputData }) => {
    try {
      // ダミーのruntimeContextを提供
      const result = await tabelogSearchResultsTool.execute({
        context: {
          url: inputData.url,
        },
        runtimeContext: {} as any, // APIの要件を満たすために型アサーションを使用
      });

      return {
        restaurants: result.restaurants,
      };
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
      throw new Error("レストラン情報の取得に失敗しました");
    }
  },
});

// Step 2: モックユーザー好み取得
const getMockPreferences = createStep({
  id: "get-mock-preferences",
  description: "モックユーザー好みデータの取得",
  inputSchema: z.object({
    restaurants: z.array(SearchRestaurantInfoSchema),
  }),
  outputSchema: z.object({
    restaurants: z.array(SearchRestaurantInfoSchema),
    preferences: z.object({
      budget: z.string(),
      genres: z.array(z.string()),
      purpose: z.string(),
    }),
  }),
  execute: async ({ inputData }) => {
    return {
      restaurants: inputData.restaurants,
      preferences: mockPreference,
    };
  },
});

// Step 3: レストラン分析と推薦
const analyzeAndRecommend = createStep({
  id: "analyze-and-recommend",
  description: "レストランの分析と推薦",
  inputSchema: z.object({
    restaurants: z.array(SearchRestaurantInfoSchema),
    preferences: z.object({
      budget: z.string(),
      genres: z.array(z.string()),
      purpose: z.string(),
    }),
  }),
  outputSchema: z.array(
    z.object({
      restaurant: SearchRestaurantInfoSchema,
      recommendReason: z.string(),
      matchScore: z.number(),
    }),
  ),
  execute: async ({ inputData }) => {
    const prompt = `
あなたはレストラン推薦システムです。以下の情報を元に、ユーザーの好みに合うレストランを推薦してください。
もしユーザーの好みを推測することが不可能な場合はおすすめのお店を以下のスキーマに従って出力してください

ユーザーの好み：
${JSON.stringify(inputData.preferences, null, 2)}

利用可能なレストラン一覧：
${JSON.stringify(inputData.restaurants, null, 2)}

必要な処理：
1. 上記のレストラン一覧から、ユーザーの好みに最も合うものを選択（最大3件）
2. 各レストランについて、推薦理由を説明
3. ユーザーの好みとのマッチ度を0-100のスコアで評価

以下の形式で、必ずValidなJSONとして出力してください：
[
  {
    "restaurant": {
      "name": "レストラン名",
      "url": "URL",
      "genre": "ジャンル",
      "area": "エリア",
      "station": "最寄り駅",
      "distance": "駅からの距離",
      "rating": 3.5,
      "reviewCount": 100,
      "savedCount": 1000,
      "budgetDinner": "予算（夜）",
      "budgetLunch": "予算（昼）",
      "description": "説明",
      "hasVpoint": true,
      "isHotRestaurant": true,
      "thumbnailImages": ["画像URL"]
    },
    "recommendReason": "具体的な推薦理由を記述",
    "matchScore": 85
  }
]

注意事項：
- 必ず配列として返してください
- restaurantオブジェクトは入力データの形式を正確に維持してください
- recommendReasonは具体的な理由を日本語で説明してください
- matchScoreは0から100の整数値で指定してください
- 結果は常に1件以上、最大3件を返してください
`;

    try {
      const outputSchema = z.array(
        z.object({
          restaurant: SearchRestaurantInfoSchema,
          recommendReason: z.string(),
          matchScore: z.number(),
        }),
      );

      const generateResult = await tabelogAgent.generate(prompt, {
        output: outputSchema,
      });
      console.log("生成された結果:", generateResult);

      if (!generateResult) {
        throw new Error("推薦結果の生成に失敗しました");
      }

      // レスポンスの検証と整形
      let resultArray;
      try {
        resultArray = JSON.parse(JSON.stringify(generateResult.object));
        if (!Array.isArray(resultArray)) {
          resultArray = [generateResult];
        }

        // 各要素が必要なプロパティを持っているか確認
        resultArray = resultArray.filter(
          (item) =>
            item &&
            item.restaurant &&
            typeof item.recommendReason === "string" &&
            typeof item.matchScore === "number",
        );

        if (resultArray.length === 0) {
          throw new Error("有効な推薦結果が見つかりませんでした");
        }
      } catch (error) {
        console.error("レスポンスの解析に失敗:", error);
        throw new Error(
          `推薦結果の解析に失敗しました: ${error instanceof Error ? error.message : "不明なエラー"}`,
        );
      }

      // スキーマ検証を行う
      return outputSchema.parse(resultArray);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "不明なエラーが発生しました";
      throw new Error(`レストランの推薦処理に失敗しました: ${errorMessage}`);
    }
  },
});

// ワークフローの定義
export const restaurantRecommendationWorkflow = createWorkflow({
  id: "restaurant-recommendation",
  description: "食べログの検索結果URLから好みに合うレストランを推薦",
  inputSchema: z.object({
    url: z.string().url(),
  }),
  outputSchema: z.array(
    z.object({
      restaurant: SearchRestaurantInfoSchema,
      recommendReason: z.string(),
      matchScore: z.number(),
    }),
  ),
})
  .then(fetchRestaurants)
  .then(getMockPreferences)
  .then(analyzeAndRecommend);

// ワークフローのコミット
restaurantRecommendationWorkflow.commit();
