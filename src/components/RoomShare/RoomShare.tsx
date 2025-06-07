"use client";

import {
  Stack,
  Alert,
  Paper,
  Text,
  Group,
  TextInput,
  ActionIcon,
  CopyButton,
  Tooltip,
  Container,
  Box,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import styles from "./RoomShare.module.css";

interface RoomShareProps {
  roomId: string;
  showCreatedAlert?: boolean;
}

export const RoomShare = ({
  roomId,
  showCreatedAlert = false,
}: RoomShareProps) => {
  const roomUrl = `${window.location.origin}/rooms/${roomId}`;

  return (
    <Container size="md" className={styles.rootContainer}>
      <Stack gap="lg">
        <Box className={styles.shareWrapper}>
          {showCreatedAlert && (
            <Alert
              className={styles.alertMargin}
              icon={<IconCheck size={18} />}
              color="green"
              title="作成完了"
            >
              ルームが作成されました。下記のURLを共有してメンバーを招待してください。
            </Alert>
          )}

          <Paper p="md" withBorder mb="md">
            <Text size="sm" c="dimmed" mb="xs">
              ルームURL
            </Text>
            <Group gap="xs">
              <TextInput
                flex={1}
                value={roomUrl}
                readOnly
                styles={{
                  input: {
                    fontFamily: "monospace",
                    fontSize: "12px",
                    backgroundColor: "var(--mantine-color-gray-0)",
                  },
                }}
              />
              <CopyButton value={roomUrl} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "コピーしました！" : "URLをコピー"}
                    withArrow
                    position="right"
                  >
                    <ActionIcon
                      color={copied ? "teal" : "gray"}
                      variant="light"
                      onClick={copy}
                      size="lg"
                    >
                      {copied ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
};
