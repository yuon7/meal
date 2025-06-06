"use client";

import { createClient } from "@/utils/supabase/client";
import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

interface Message {
  id: string;
  text: string;
  userId: string;
  created_at: string;
}

export default function Chat({ user }: { user: User | null }) {
  if (!user) {
    return null;
  }
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    const { data } = await supabase
      .from("Message")
      .select("*")
      .order("createdAt", { ascending: true });
    if (data) {
      setMessages(data);
    }
  }, [supabase]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (!user) {
      return;
    }

    const { error: insertError } = await supabase.from("Message").insert([
      {
        id: crypto.randomUUID(),
        text: newMessage,
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      //TODO: mantineのnotificationとかで通知したい
      console.error("Error sending message:", insertError);
      return;
    }

    setNewMessage("");
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("Message")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Message",
        },
        () => {
          fetchMessages();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMessages, supabase]);

  return (
    <Container size="md" py="md">
      <Stack>
        <Title order={1} ta="center">
          Chat Room
        </Title>
        <Paper style={{ height: "60vh", overflowY: "auto" }} p="md" withBorder>
          <Stack gap={16}>
            {messages.map((message) => (
              <Paper key={message.id} withBorder p="md" radius="md">
                <Group justify="space-between" mb={4}>
                  <Text size="sm" c="dimmed">
                    {/* 将来的にはユーザーネームを期待する */}
                    {user?.email || "Anonymous"}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {new Date(message.created_at).toLocaleString()}
                  </Text>
                </Group>
                <Text size="lg">{message.text}</Text>
              </Paper>
            ))}
          </Stack>
        </Paper>
        <form onSubmit={handleSendMessage}>
          <Group gap={8}>
            <TextInput
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ flex: 1 }}
            />
            <Button type="submit" variant="filled">
              送信
            </Button>
          </Group>
        </form>
      </Stack>
    </Container>
  );
}
