export interface Question {
  id: number;
  type: "question";
  text: string;
  options: string[];
  allowMultiple?: boolean;
  required?: boolean;
}

export const allQuestions: Question[] = [
  {
    id: 1,
    type: "question",
    text: "食べたい料理のジャンルは？",
    options: ["和食", "洋食", "中華", "イタリアン", "焼肉・ホルモン", "居酒屋・ダイニングバー", "アジア・エスニック", "ラーメン", "カフェ・スイーツ"],
    allowMultiple: true,
  },
  {
    id: 2,
    type: "question",
    text: "今回はどんな目的でのご利用ですか？",
    options: ["友人・知人と気軽に", "デートで使いたい", "記念日・お祝いに", "接待・会食で", "一人でゆっくり"],
  },
  {
    id: 3,
    type: "question",
    text: "どんな雰囲気のお店がいいですか？",
    options: ["賑やか・活気がある", "落ち着いた雰囲気", "おしゃれな空間", "夜景・景色がきれい", "アットホームな感じ"],
    allowMultiple: true,
  },
  {
    id: 4,
    type: "question",
    text: "一人あたりのご予算の上限は？",
    options: ["指定なし", "1,000円", "2,000円", "3,000円", "5,000円", "8,000円", "15,000円", "30,000円以上"],
  },
  {
    id: 5,
    type: "question",
    text: "その他に譲れない『こだわり条件』はありますか？",
    options: ["個室でゆっくりしたい", "飲み放題がほしい", "禁煙席がある", "子連れでも安心", "ペット同伴OK", "駐車場がある"],
    allowMultiple: true,
    required: false, 
  },
];