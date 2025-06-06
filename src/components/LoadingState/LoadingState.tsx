import React from "react";
import { Card, Stack, Divider, Grid, Skeleton, Container } from "@mantine/core";

interface LoadingStateProps {
  isCreated: boolean;
}

export function LoadingState({ isCreated }: LoadingStateProps) {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        {isCreated && <Skeleton height={100} />}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Skeleton height={30} width="30%" />
            <Divider />
            <Grid gutter="md">
              {[...Array(4)].map((_, i) => (
                <Grid.Col key={i} span={6}>
                  <Skeleton height={50} />
                </Grid.Col>
              ))}
            </Grid>
            <Divider />
            <Skeleton height={100} />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
