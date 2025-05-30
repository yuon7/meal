// src/components/Blockquote/BlockQuote.tsx
import React from "react";
import styles from "./BlockQuote.module.css";

interface BlockQuoteProps {
  quote?: string;
  author?: string;
  questionText: string;
}

export const BlockQuote: React.FC<BlockQuoteProps> = ({ quote, author, questionText }) => {
  return (
    <div className={styles.blockquoteContainer}>
      <p className={styles.questionText}>{questionText}</p>
      {quote && (
        <blockquote className={styles.blockquote}>
          <p className={styles.quoteText}>{quote}</p>
          {author && <footer className={styles.author}>— {author}</footer>}
        </blockquote>
      )}
    </div>
  );
};