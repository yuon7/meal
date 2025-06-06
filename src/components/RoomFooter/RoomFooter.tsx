import React from "react";
import { Box, Text, Container, Stack } from "@mantine/core";
import { RoomShareSection } from "@/components/RoomShare/RoomShare";

interface RoomFooterProps {
  roomId: string;
  isCreated: boolean;
}

export function RoomFooter({ roomId, isCreated }: RoomFooterProps) {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        {isCreated && (
          <RoomShareSection roomId={roomId} showCreatedAlert={true} />
        )}
        <Box>
          <Text size="xs" c="dimmed">
            Room ID: {roomId}
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
