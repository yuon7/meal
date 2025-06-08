import React from "react";
import { Button, Group } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { Logout } from "@/app/auth/logout/action";

type UserButtonsProp = {
  user: User | null;
};

export const UserButtons = ({ user }: UserButtonsProp) => {
  if (user)
    return (
      <Group gap="xs">
        <Button size="sm" variant="outline" onClick={() => Logout()}>
          ログアウト
        </Button>
      </Group>
    );

  return (
    <Group gap="xs">
      <Button
        size="sm"
        variant="outline"
        onClick={() => (window.location.href = "/auth/login")}
      >
        ログインまたは新規登録
      </Button>
    </Group>
  );
};
