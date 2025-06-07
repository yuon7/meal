"use client";

import { Avatar, Box, Card, Group, Text } from "@mantine/core";
import { User } from "@supabase/supabase-js";

type UserProps = {
  user: User | null;
};

export default function Profile({ user }: UserProps) {
  return (
    <Card shadow="lg" radius="md">
      <Group>
        <Avatar
          size="lg"
          src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
          alt="プロフィール画像"
        />
        <Box>
          <Text fw={600}>
            {user?.user_metadata?.full_name || "ゲストユーザー"}
          </Text>
          <Text size="sm" c="dimmed">
            今日も良い1日を！
          </Text>
        </Box>
      </Group>
    </Card>
  );
}
