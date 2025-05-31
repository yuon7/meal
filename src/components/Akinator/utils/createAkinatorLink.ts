import { Answer } from "@/components/Akinator/types/types";

const formatToday = (): string => {
  const today = new Date();
  return today.toISOString().slice(0, 10).replace(/-/g, "");
};

export const createAkinatorLink = (answers: Answer[]): string => {
  let sa = "";
  let sk = "";
  let svps = "1";
  let sw = "";

  for (const ans of answers) {
    switch (ans.questionId) {
      case 0: // エリア
        sa = ans.answer[0] ?? "";
        break;
      case 1: // 人数
        if (ans.answer.includes("1人")) svps = "1";
        else if (ans.answer.includes("2人")) svps = "2";
        else svps = "3";
        break;
      case 2: // ジャンル
        sk = ans.answer.join(" ");
        break;
      case 3: // 店名キーワード
        sw = ans.answer[0] ?? "";
        break;
    }
  }

  const params = new URLSearchParams({
    vs: "1",
    sa,
    sk,
    lid: "top_navi1",
    vac_net: "",
    svd: formatToday(),
    svt: "1900",
    svps,
    hfc: "1",
    sw,
  });

  return `https://tabelog.com/tokyo/A1323/A132305/R134/rstLst/?${params.toString()}`;
};
