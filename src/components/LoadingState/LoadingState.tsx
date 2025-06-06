import React from "react";
import {
  Card,
  Stack,
  Divider,
  Grid,
  Skeleton,
  Container,
  Group,
  Box,
} from "@mantine/core";

interface LoadingStateProps {
  isCreated: boolean;
}

export function LoadingState({ isCreated }: LoadingStateProps) {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group align="center">
              <Skeleton circle height={32} width={32} />
              <Skeleton height={20} width="30%" />
              <Skeleton height={20} width="30%" />
            </Group>
            <Divider />
            <Stack>
              <Skeleton height={16} width="40%" />
              <Skeleton height={16} width="30%" />
              <Skeleton height={16} width="50%" />
            </Stack>
            <Divider />
            <Box>
              <Grid gutter="sm">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Grid.Col key={idx} span={3}>
                    <Group>
                      <Skeleton circle height={32} width={32} />
                      <Skeleton height={14} width="60%" />
                    </Group>
                  </Grid.Col>
                ))}
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Grid.Col key={idx + 4} span={3}>
                    <Group>
                      <Skeleton circle height={32} width={32} />
                      <Skeleton height={14} width="60%" />
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
            <Divider />
            <Box style={{ textAlign: "center" }}>
              <Skeleton height={36} width={96} radius="md" />
            </Box>
          </Stack>
        </Card>
        {isCreated && (
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack gap="md">
              <Skeleton height={20} width="50%" />
              <Skeleton height={16} width="80%" />
              <Divider />
              <Box style={{ textAlign: "center" }}>
                <Skeleton height={14} width="30%" />
              </Box>
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
