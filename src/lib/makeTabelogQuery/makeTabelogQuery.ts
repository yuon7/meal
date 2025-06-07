import { QUERY_MAP } from "./queryMap";

const makeTabelogQuery = (query: string[][]): string => {
  const queryList: string[] = ["?"];
  query.forEach((pair) => {
    const [value] = pair;
    if (value && value in QUERY_MAP) {
      queryList.push(QUERY_MAP[value]);
    }
  });
  return queryList.join("").slice(0, -1);
};

export default makeTabelogQuery;
