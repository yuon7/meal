// src/components/ChatMessage/ChatMessage.tsx
import React from "react";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  type: "question" | "answer";
  text: string;
  quote?: string;
  author?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  text,
  quote,
  author,
}) => {
  return (
    <div
      className={`${styles.messageContainer} ${type === "question" ? styles.question : styles.answer}`}
    >
      <div className={styles.messageBubble}>
        <p className={styles.messageText}>{text}</p>
        {/* 質問メッセージで引用がある場合のみ表示 */}
        {type === "question" && quote && (
          <blockquote className={styles.messageQuote}>
            <p className={styles.quoteText}>{quote}</p>
            {author && <footer className={styles.author}>— {author}</footer>}
          </blockquote>
        )}
      </div>
    </div>
  );
};
