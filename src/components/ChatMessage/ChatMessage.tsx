import React from "react";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  type: "question" | "answer";
  text: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ type, text }) => {
  return (
    <div
      className={`${styles.messageContainer} ${type === "question" ? styles.question : styles.answer}`}
    >
      <div className={styles.messageBubble}>
        <p className={styles.messageText}>{text}</p>
      </div>
    </div>
  );
};
