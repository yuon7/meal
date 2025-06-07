import React from "react";
import { Group, Text, ThemeIcon, Grid } from "@mantine/core";
import {
  IconMapPin,
  IconToolsKitchen2,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";

interface RoomBasicInfoProps {
  area: string;
  mealType: string;
  date: string;
  createdAt: Date;
}

export function RoomBasicInfo({
  area,
  mealType,
  date,
  createdAt,
}: RoomBasicInfoProps) {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  };

  const formatCreatedAt = (dt: Date) => {
    return new Date(dt).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Grid gutter="md">
      <Grid.Col span={6}>
        <Group gap="xs">
          <ThemeIcon color="blue" size="sm" radius="xl">
            <IconMapPin size={16} />
          </ThemeIcon>
          <div>
            <Text size="xs" c="dimmed">
              エリア
            </Text>
            <Text fw={500}>{area}</Text>
          </div>
        </Group>
      </Grid.Col>

      <Grid.Col span={6}>
        <Group gap="xs">
          <ThemeIcon color="orange" size="sm" radius="xl">
            <IconToolsKitchen2 size={16} />
          </ThemeIcon>
          <div>
            <Text size="xs" c="dimmed">
              食事タイプ
            </Text>
            <Text fw={500}>{mealType}</Text>
          </div>
        </Group>
      </Grid.Col>

      <Grid.Col span={6}>
        <Group gap="xs">
          <ThemeIcon color="teal" size="sm" radius="xl">
            <IconCalendar size={16} />
          </ThemeIcon>
          <div>
            <Text size="xs" c="dimmed">
              開催日
            </Text>
            <Text fw={500}>{formatDate(date)}</Text>
          </div>
        </Group>
      </Grid.Col>

      <Grid.Col span={6}>
        <Group gap="xs">
          <ThemeIcon color="gray" size="sm" radius="xl">
            <IconClock size={16} />
          </ThemeIcon>
          <div>
            <Text size="xs" c="dimmed">
              作成日時
            </Text>
            <Text fw={500} size="sm">
              {formatCreatedAt(createdAt)}
            </Text>
          </div>
        </Group>
      </Grid.Col>
    </Grid>
  );
}
