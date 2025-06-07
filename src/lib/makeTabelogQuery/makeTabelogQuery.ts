import { QUERY_MAP } from "./queryMap";

const makeTabelogQuery = (query: string[][]): string => {
  const queryList: string[] = ["?"];
  query.forEach((row) => {
    row.forEach((terms) => {
      const value = terms;
      if (value && value in QUERY_MAP) {
        queryList.push(QUERY_MAP[value]);
      }
    });
  });
  return queryList.join("").slice(0, -1);
};

export default makeTabelogQuery;
