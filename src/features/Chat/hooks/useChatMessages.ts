import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

export interface Message {
  id: string;
  text: string;
  userId: string;
  roomId?: string;
  createdAt: string;
  updatedAt: string;
}

export function useChatMessages(selectedRoomId: string | null, user: User | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    if (!selectedRoomId) {
      setMessages([]);
      return;
    }

    try {
      const response = await fetch(`/api/rooms/${selectedRoomId}/messages`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const messages: Message[] = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  }, [selectedRoomId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoomId || !user) return;

    try {
      const response = await fetch(`/api/rooms/${selectedRoomId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newMessage,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (!selectedRoomId) return;

    const messageChannel = supabase
      .channel(`Message_${selectedRoomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Message",
          filter: `roomId=eq.${selectedRoomId}`,
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [selectedRoomId, fetchMessages, supabase]);

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    fetchMessages,
  };
}