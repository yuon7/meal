export interface Question {
  id: number;
  type: "question";
  text: string;
  options: string[];
  allowMultiple?: boolean;
}

export const allQuestions: Question[] = [
  {
    id: 1,
    type: "question",
    text: "どんな雰囲気のお店がいいですか？",
    options: ["カジュアル", "落ち着いた", "賑やか", "おしゃれ"],
  },
  {
    id: 2,
    type: "question",
    text: "どんな料理のジャンルがお好みですか？",
    options: ["和食", "洋食", "中華", "イタリアン", "カフェ"],
    allowMultiple: true,
  },
  {
    id: 3,
    type: "question",
    text: "予算はどれくらいですか？",
    options: ["〜1,000円", "1,000円〜3,000円", "3,000円〜5,000円", "5,000円〜"],
  },
  {
    id: 4,
    type: "question",
    text: "こだわりはありますか？",
    options: ["個室", "飲み放題", "食べ放題", "ペット可"],
    allowMultiple: true,
  },
];
