import React from "react";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  type: "question" | "answer";
  text: string | string[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ type, text }) => {
  const displayText = Array.isArray(text) ? text.join(", ") : text;

  return (
    <div
      className={`${styles.messageContainer} ${type === "question" ? styles.question : styles.answer}`}
    >
      <div className={styles.messageBubble}>
        <p className={styles.messageText}>{displayText}</p>
      </div>
    </div>
  );
};
