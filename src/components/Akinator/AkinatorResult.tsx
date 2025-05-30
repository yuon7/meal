import React from "react";
import { Answer } from "@/components/Akinator/types/types";
import { createAkinatorLink } from "@/components/Akinator/utils/createAkinatorLink";

type Props = {
  answers: Answer[];
};

const AkinatorResult = ({ answers }: Props) => (
  <div>
    <h2>選択結果一覧</h2>
    <ul>
      {answers.map((ans) => (
        <li key={ans.questionId}>
          質問{ans.questionId + 1}: {ans.answer.join(", ")}
        </li>
      ))}
    </ul>
    <div style={{ marginTop: "2em" }}>
      <a
        href={createAkinatorLink(answers)}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        この条件で食べログ検索する
      </a>
    </div>
  </div>
);

export default AkinatorResult;
