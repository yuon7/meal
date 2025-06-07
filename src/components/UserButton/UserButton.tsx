"use client";

import { Logout } from "@/app/auth/logout/action";
import { Avatar, Button, Group, Menu, Text } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export function UserButton({
  user,
  closeDrawer,
}: {
  user: User | null;
  closeDrawer?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = async () => {
    closeDrawer?.();
    await Logout();
    router.refresh();
  };

  if (pathname === "/auth/login") {
    return null;
  }

  if (!user) {
    return (
      <Button variant="default" onClick={handleLogin}>
        ログイン
      </Button>
    );
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="transparent" w="100%">
          <Group wrap="nowrap" w="100%">
            <Avatar src={user?.user_metadata.avatar_url} radius="xl" />

            <div style={{ flex: 1, minWidth: 0 }}>
              <Text c="dimmed" size="xs" truncate="end">
                {user?.user_metadata.email}
              </Text>
            </div>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconLogout size={14} />}
          onClick={handleLogout}
          color="red"
        >
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
