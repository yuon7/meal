import { IconArrowLeft } from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Center,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import classes from "./page.module.css";
import React from "react";

type Props = {
  searchParams: { email: string };
};

export default function ConfirmSignup({ searchParams }: Props) {
  return (
    <div className={classes.container}>
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
          確認メールを送信しました
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          {searchParams.email} に確認メールを送信しました。
        </Text>
        <form>
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <Stack gap="xs">
              <Text ta="center" c="dimmed" mb="xs">
                メール内のリンクをクリックして、アカウントを有効化してください。
              </Text>
            </Stack>
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Link href="/auth/login" passHref legacyBehavior>
                <Anchor c="dimmed" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft size={12} stroke={1.5} />
                    <Box ml={5}>ログインページに戻る</Box>
                  </Center>
                </Anchor>
              </Link>
            </Group>
          </Paper>
        </form>
      </Container>
    </div>
  );
}
