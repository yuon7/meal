import { QUERY_MAP } from "./queryMap";

// 質問に合わせて型定義をし直す
export interface SearchOptions {
  foodGenre?: string;
  ambience?: string[];
  budjets?: string;
  [key: string]: string | string[] | undefined;
}

const makeTabelogQuery = (options: SearchOptions): string => {
  let query = "?";

  for (const [_, value] of Object.entries(options)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (QUERY_MAP[item]) {
          query += QUERY_MAP[item];
        }
      });
    } else if (typeof value === "string" && QUERY_MAP[value]) {
      query += QUERY_MAP[value];
    }
  }

  return query.slice(0, -1);
};

export default makeTabelogQuery;
