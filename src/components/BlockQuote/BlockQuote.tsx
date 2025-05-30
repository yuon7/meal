import React from "react";
import styles from "./BlockQuote.module.css";

interface BlockQuoteProps {
  questionText: string;
}

export const BlockQuote: React.FC<BlockQuoteProps> = ({ questionText }) => {
  return (
    <div className={styles.blockquoteContainer}>
      <p className={styles.questionText}>{questionText}</p>
    </div>
  );
};
