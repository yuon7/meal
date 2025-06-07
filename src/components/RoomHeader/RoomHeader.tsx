import React from "react";
import { Group, Title, Badge } from "@mantine/core";

interface RoomHeaderProps {
  isClosed: boolean;
  participantCount: number;
  maxUser: number;
}

export function RoomHeader({
  isClosed,
  participantCount,
  maxUser,
}: RoomHeaderProps) {
  const isRoomFull = participantCount >= maxUser;
  let badgeColor: "gray" | "orange" | "green" = "green";
  let badgeText: string = "募集中";

  if (isClosed) {
    badgeColor = "gray";
    badgeText = "締切済み";
  } else if (isRoomFull) {
    badgeColor = "orange";
    badgeText = "満員";
  }

  return (
    <Group justify="space-between">
      <Title order={3}>ルーム情報</Title>
      <Badge color={badgeColor} variant="filled" size="lg">
        {badgeText}
      </Badge>
    </Group>
  );
}
