"use client";

type retrunQuestion = Question & {
  isFinished: boolean;
};
export type Question = {
  id: number;
  text: string;
  options?: string[];
  allowMultiple?: boolean;
  allowEmpty?: boolean;
  freeInput?: boolean;
};

export const questions: Question[] = [
  {
    id: 0,
    text: "どのエリアで探しますか？",
    freeInput: true,
    allowEmpty: true,
  },
  {
    id: 1,
    text: "何人で行きますか？",
    options: ["1人", "2人", "3人以上"],
    allowMultiple: true,
    allowEmpty: true,
  },
  {
    id: 2,
    text: "食べたいジャンルは何ですか？",
    options: ["和食", "洋食", "中華", "焼肉", "カフェ", "その他"],
    allowMultiple: true,
    allowEmpty: true,
  },
  {
    id: 3,
    text: "店名に含まれるキーワードがあれば教えてください",
    freeInput: true,
    allowEmpty: true,
  },
];

const useAkinator = (id: number): retrunQuestion => {
  if (questions[id]) {
    const isFinished = id === questions.length - 1;
    return {
      ...questions[id],
      isFinished,
    };
  } else {
    throw new Error("Invalid question ID");
  }
};

export default useAkinator;
