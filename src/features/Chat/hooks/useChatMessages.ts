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

    const { data, error } = await supabase
      .from("Message")
      .select("*")
      .eq("roomId", selectedRoomId)
      .order("createdAt", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    if (data) {
      setMessages(data);
    }
  }, [selectedRoomId, supabase]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoomId || !user) return;

    const { error } = await supabase.from("Message").insert([
      {
        id: crypto.randomUUID(),
        text: newMessage,
        userId: user.id,
        roomId: selectedRoomId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    setNewMessage("");
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