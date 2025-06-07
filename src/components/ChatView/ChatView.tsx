"use client";

import { User } from "@supabase/supabase-js";
import { FormEvent, Dispatch, SetStateAction } from "react";
import styles from "./ChatView.module.css";

interface Room {
  id: string;
  area: string;
  mealType: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
}

interface Participant {
  id: string;
  userId: string;
  username: string;
}

interface ChatViewProps {
  selectedRoomId: string | null;
  selectedRoom?: Room;
  user: User;
  messages: Message[];
  newMessage: string;
  setNewMessage: Dispatch<SetStateAction<string>>;
  handleSendMessage: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  participants: Participant[];
}

export default function ChatView({
  selectedRoomId,
  selectedRoom,
  user,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  participants,
}: ChatViewProps) {

  if (!selectedRoomId) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>チャット</h2>
        <div className={styles.noRoomSelected}>
          ルームが選択されていません
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatCard}>
        <div className={styles.chatHeader}>
          <h3 className={styles.roomTitle}>
            {selectedRoom
              ? `${selectedRoom.area} - ${selectedRoom.mealType}`
              : "チャット"}
          </h3>
          <span className={styles.messageCount}>{messages.length} メッセージ</span>
        </div>

        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={styles.emptyMessages}>
              まだメッセージがありません。最初のメッセージを送信してみましょう！
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={styles.messageItem}>
                <div className={styles.messageHeader}>
                  <span className={styles.messageAuthor}>
                    {message.userId === user.id
                      ? "あなた"
                      : participants.find((p) => p.userId === message.userId)
                          ?.username || "不明"}
                  </span>
                  <span className={styles.messageTime}>
                    {new Date(message.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className={styles.messageText}>{message.text}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className={styles.messageForm}>
          <textarea
            className={styles.messageInput}
            placeholder="メッセージを入力..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const form = e.currentTarget.closest('form');
                if (form) {
                  const formEvent = new Event('submit', { bubbles: true, cancelable: true });
                  Object.defineProperty(formEvent, 'currentTarget', { value: form });
                  handleSendMessage(formEvent as any);
                }
              }
            }}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!newMessage.trim()}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}