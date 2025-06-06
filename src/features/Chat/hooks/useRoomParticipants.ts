import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

export interface Participant {
  id: string;
  userId: string;
  username: string;
  isHost: boolean;
}

export function useRoomParticipants(selectedRoomId: string | null, user: User) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const supabase = createClient();

  const fetchParticipants = useCallback(async () => {
    if (!selectedRoomId) {
      setParticipants([]);
      return;
    }

    try {
      const response = await fetch(`/api/rooms/${selectedRoomId}/participants`);
      if (!response.ok) {
        throw new Error("Failed to fetch participants");
      }
      const roomParticipants = await response.json();

      const participantsWithUsernames = roomParticipants.map((participant: any) => {
        return {
          id: participant.id,
          userId: participant.userId,
          username:
            participant.userId === user?.id
              ? user.user_metadata?.full_name || "あなた"
              : participant.userId,
          isHost: participant.isHost,
        };
      });

      setParticipants(participantsWithUsernames);
    } catch (error) {
      console.error("Error fetching participants:", error);
      setParticipants([]);
    }
  }, [selectedRoomId, user]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  useEffect(() => {
    if (!selectedRoomId) return;

    const participantChannel = supabase
      .channel(`RoomParticipant_${selectedRoomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "RoomParticipant",
          filter: `roomId=eq.${selectedRoomId}`,
        },
        () => {
          fetchParticipants();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(participantChannel);
    };
  }, [selectedRoomId, fetchParticipants, supabase]);

  return {
    participants,
    fetchParticipants,
  };
}
