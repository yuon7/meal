"use client";

import { UserButtons } from "@/components/UserButtons/UserButtons";
import { Avatar, Box, Card, Group, Text } from "@mantine/core";
import { User } from "@supabase/supabase-js";

type UserProp = {
  user: User | null;
};

export default function Profile({ user }: UserProp) {
  return (
    <Card shadow="lg" radius="md">
      <Group justify="space-between">
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
          </Box>
        </Group>
        <UserButtons user={user} />
      </Group>
    </Card>
  );
}
