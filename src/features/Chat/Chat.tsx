"use client";

import { createClient } from "@/utils/supabase/client";
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useChatMessages } from "./hooks/useChatMessages";
import { useChatRooms } from "./hooks/useChatRooms";
import { useRoomParticipants } from "./hooks/useRoomParticipants";

export default function Chat({ user }: { user: User | null }) {
  if (!user) {
    return null;
  }

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const { rooms } = useChatRooms();
  const { messages, newMessage, setNewMessage, handleSendMessage } =
    useChatMessages(selectedRoomId, user);
  const { participants } = useRoomParticipants(selectedRoomId, user);

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  return (
    <Container size="lg" py="md">
      <Stack gap="lg">
        <Title order={1} ta="center">
          チャットルーム
        </Title>

        <Card withBorder p="md">
          <Stack gap="md">
            <Title order={3}>ルームを選択</Title>
            {rooms.length === 0 ? (
              <Text c="dimmed">利用可能なルームがありません</Text>
            ) : (
              <Grid>
                {rooms.map((room) => (
                  <Grid.Col key={room.id} span={{ base: 12, sm: 6, md: 4 }}>
                    <Card
                      withBorder
                      p="sm"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedRoomId === room.id
                            ? "var(--mantine-color-blue-light)"
                            : undefined,
                      }}
                      onClick={() => setSelectedRoomId(room.id)}
                    >
                      <Stack gap="xs">
                        <Group justify="space-between">
                          <Text fw={500} size="sm">
                            {room.area} - {room.mealType}
                          </Text>
                          <Badge
                            size="xs"
                            color={room.isClosed ? "red" : "green"}
                          >
                            {room.isClosed ? "終了" : "募集中"}
                          </Badge>
                        </Group>
                        <Text size="xs" c="dimmed">
                          {room.date}
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            )}
          </Stack>
        </Card>

        {selectedRoomId ? (
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Card withBorder p="md">
                <Stack gap="md">
                  <Group justify="space-between">
                    <Title order={3}>
                      {selectedRoom
                        ? `${selectedRoom.area} - ${selectedRoom.mealType}`
                        : "チャット"}
                    </Title>
                    <Badge color="blue">{messages.length} メッセージ</Badge>
                  </Group>

                  <Paper
                    style={{ height: "50vh", overflowY: "auto" }}
                    p="md"
                    withBorder
                  >
                    <Stack gap={16}>
                      {messages.length === 0 ? (
                        <Text ta="center" c="dimmed">
                          まだメッセージがありません。最初のメッセージを送信してみましょう！
                        </Text>
                      ) : (
                        messages.map((message) => (
                          <Paper key={message.id} withBorder p="md" radius="md">
                            <Group justify="space-between" mb={4}>
                              <Text size="sm" c="dimmed">
                                {message.userId === user.id
                                  ? "あなた"
                                  : participants.find(
                                      (p) => p.userId === message.userId
                                    )?.username || "不明"}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {new Date(message.createdAt).toLocaleString()}
                              </Text>
                            </Group>
                            <Text size="lg">{message.text}</Text>
                          </Paper>
                        ))
                      )}
                    </Stack>
                  </Paper>

                  <form onSubmit={handleSendMessage}>
                    <Group gap={8}>
                      <TextInput
                        placeholder="メッセージを入力..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <Button
                        type="submit"
                        variant="filled"
                        disabled={!newMessage.trim()}
                      >
                        送信
                      </Button>
                    </Group>
                  </form>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card withBorder p="md">
                <Stack gap="md">
                  <Group justify="space-between">
                    <Title order={4}>参加者</Title>
                    <Badge size="sm" variant="light">
                      {participants.length}人
                    </Badge>
                  </Group>

                  <Stack gap="xs">
                    {participants.length === 0 ? (
                      <Text size="sm" c="dimmed" ta="center">
                        参加者がいません
                      </Text>
                    ) : (
                      participants.map((participant) => (
                        <Paper
                          key={participant.id}
                          p="sm"
                          withBorder
                          radius="md"
                        >
                          <Group justify="space-between">
                            <Text size="sm" fw={500}>
                              {participant.username}
                            </Text>
                            {participant.isHost && (
                              <Badge size="xs" color="orange">
                                ホスト
                              </Badge>
                            )}
                          </Group>
                        </Paper>
                      ))
                    )}
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        ) : (
          <Card withBorder p="md">
            <Text ta="center" c="dimmed">
              チャットを開始するには、上記からルームを選択してください。
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
