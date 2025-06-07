"use client";

import { User } from "@supabase/supabase-js";
import styles from "./ParticipantsList.module.css";

interface Participant {
  id: string;
  userId: string;
  username: string;
  isHost?: boolean;
}

interface ParticipantsListProps {
  selectedRoomId: string | null;
  user: User;
  participants: Participant[];
}

export default function ParticipantsList({
  selectedRoomId,
  user,
  participants,
}: ParticipantsListProps) {
  const getInitials = (username: string) => {
    return username
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!selectedRoomId) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>参加者一覧</h2>
        <div className={styles.emptyState}>ルームが選択されていません</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>参加者一覧 ({participants.length}人)</h2>
      {participants.length === 0 ? (
        <div className={styles.emptyState}>参加者がいません</div>
      ) : (
        participants.map((participant) => (
          <div key={participant.id} className={styles.participantCard}>
            <div className={styles.avatar}>
              {getInitials(participant.username)}
            </div>
            <div className={styles.participantInfo}>
              <h3 className={styles.participantName}>
                {participant.username}
                {participant.userId === user.id && " (あなた)"}
              </h3>
              <p className={styles.participantRole}>
                {participant.isHost ? "ホスト" : "参加者"}
              </p>
            </div>
            <div className={styles.badges}>
              {participant.isHost && (
                <span className={styles.hostBadge}>ホスト</span>
              )}
              <span className={styles.onlineBadge}>オンライン</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
