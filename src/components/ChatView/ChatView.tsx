"use client";

import { User } from "@supabase/supabase-js";
import { useChatMessages } from "@/features/Chat/hooks/useChatMessages";
import { useChatRooms } from "@/features/Chat/hooks/useChatRooms";
import { useRoomParticipants } from "@/features/Chat/hooks/useRoomParticipants";
import styles from "./ChatView.module.css";

interface ChatViewProps {
  selectedRoomId: string | null;
  user: User;
}

export default function ChatView({ selectedRoomId, user }: ChatViewProps) {
  const { rooms } = useChatRooms();
  const { messages, newMessage, setNewMessage, handleSendMessage } =
    useChatMessages(selectedRoomId, user);
  const { participants } = useRoomParticipants(selectedRoomId, user);

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

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
                handleSendMessage(e);
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