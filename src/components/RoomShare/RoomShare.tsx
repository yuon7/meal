import React, { useState, useEffect } from "react";
import {
  Alert,
  Paper,
  Text,
  Group,
  TextInput,
  ActionIcon,
  CopyButton,
  Tooltip,
  Notification,
  Stack,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface RoomShareSectionProps {
  roomId: string;
  showCreatedAlert?: boolean;
}

export const RoomShareSection = ({
  roomId,
  showCreatedAlert = false,
}: RoomShareSectionProps) => {
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const roomUrl = `${window.location.origin}/rooms/${roomId}`;

  useEffect(() => {
    if (showCreatedAlert) {
      setShowSuccessNotification(true);
      // 5秒後に自動で非表示
      const timer = setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showCreatedAlert]);

  return (
    <Stack gap="md">
      {showSuccessNotification && (
        <Notification
          icon={<IconCheck size={18} />}
          color="green"
          title="ルーム作成完了"
          onClose={() => setShowSuccessNotification(false)}
          withCloseButton
        >
          ルームが正常に作成されました！下記のURLを共有してメンバーを招待してください。
        </Notification>
      )}

      {showCreatedAlert && (
        <Alert color="green" title="作成完了">
          ルームが正常に作成されました。下記のURLを共有してメンバーを招待してください。
        </Alert>
      )}

      <Paper p="md" withBorder>
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
                  {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </Paper>
    </Stack>
  );
};
