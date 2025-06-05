import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Group, 
  Text, 
  Badge, 
  Stack, 
  Divider, 
  Title,
  Avatar,
  Tooltip,
  ThemeIcon,
  Grid,
  Progress,
  Box,
  Skeleton,
  Alert
} from '@mantine/core';
import { 
  IconCalendar, 
  IconMapPin, 
  IconToolsKitchen2, 
  IconUsers, 
  IconCrown,
  IconClock,
  IconAlertCircle
} from '@tabler/icons-react';

// 型定義
type RoomParticipant = {
  id: string;
  roomId: string;
  userId: string;
  isHost: boolean;
};

type RoomWithParticipant = {
  id: string;
  maxUser: number;
  area: string;
  mealType: string;
  date: string;
  isClosed: boolean;
  createdAt: Date;
  RoomParticipant: RoomParticipant[];
};

interface RoomCardProps {
  roomId: string;
}

export const RoomCard = ({ roomId }: RoomCardProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [roomWithParticipant, setRoomWithParticipant] = useState<RoomWithParticipant | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 日付フォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      weekday: 'short'
    });
  };
  
  const formatCreatedAt = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/rooms/${roomId}`);
        
        if (!res.ok) {
          throw new Error('ルーム情報の取得に失敗しました');
        }
        
        const data = await res.json();
        setRoomWithParticipant(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  // ローディング中の表示
  if (loading) {
    return (
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
    );
  }

  // エラー表示
  if (error || !roomWithParticipant) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Alert icon={<IconAlertCircle size={16} />} title="エラー" color="red">
          {error || 'ルーム情報が見つかりません'}
        </Alert>
      </Card>
    );
  }

  const participantCount = roomWithParticipant.RoomParticipant.length;
  const progressValue = (participantCount / roomWithParticipant.maxUser) * 100;
  const isRoomFull = participantCount >= roomWithParticipant.maxUser;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        {/* ヘッダー部分 */}
        <Group justify="space-between">
          <Title order={4}>ルーム情報</Title>
          <Badge 
            color={roomWithParticipant.isClosed ? "gray" : isRoomFull ? "orange" : "green"} 
            variant="filled"
            size="lg"
          >
            {roomWithParticipant.isClosed ? "締切済み" : isRoomFull ? "満員" : "募集中"}
          </Badge>
        </Group>

        <Divider />

        {/* 基本情報 */}
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Group gap="xs">
              <ThemeIcon color="blue" size="sm" radius="xl">
                <IconMapPin size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">エリア</Text>
                <Text fw={500}>{roomWithParticipant.area}</Text>
              </div>
            </Group>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Group gap="xs">
              <ThemeIcon color="orange" size="sm" radius="xl">
                <IconToolsKitchen2 size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">食事タイプ</Text>
                <Text fw={500}>{roomWithParticipant.mealType}</Text>
              </div>
            </Group>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Group gap="xs">
              <ThemeIcon color="teal" size="sm" radius="xl">
                <IconCalendar size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">開催日</Text>
                <Text fw={500}>{formatDate(roomWithParticipant.date)}</Text>
              </div>
            </Group>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Group gap="xs">
              <ThemeIcon color="gray" size="sm" radius="xl">
                <IconClock size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">作成日時</Text>
                <Text fw={500} size="sm">{formatCreatedAt(roomWithParticipant.createdAt)}</Text>
              </div>
            </Group>
          </Grid.Col>
        </Grid>

        <Divider />

        {/* 参加者情報 */}
        <Box>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <IconUsers size={20} />
              <Text fw={500}>参加者</Text>
            </Group>
            <Text size="sm" c="dimmed">
              {participantCount} / {roomWithParticipant.maxUser}名
            </Text>
          </Group>
          
          <Progress 
            value={progressValue} 
            color={isRoomFull ? "orange" : "blue"}
            size="md"
            radius="xl"
            mb="md"
          />

          {/* 参加者アバター */}
          <Group gap="sm">
            {roomWithParticipant.RoomParticipant.map((participant: RoomParticipant, index: number) => (
              <Tooltip
                key={participant.id}
                label={participant.isHost ? "ホスト" : `参加者${index + 1}`}
                withArrow
              >
                <Box style={{ position: 'relative' }}>
                  <Avatar 
                    radius="xl" 
                    size="md"
                    color={participant.isHost ? "blue" : "gray"}
                  >
                    {participant.isHost ? "H" : `P${index + 1}`}
                  </Avatar>
                  {participant.isHost && (
                    <ThemeIcon
                      size="xs"
                      radius="xl"
                      color="yellow"
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                      }}
                    >
                      <IconCrown size={12} />
                    </ThemeIcon>
                  )}
                </Box>
              </Tooltip>
            ))}
            
            {/* 残り枠表示 */}
            {participantCount < roomWithParticipant.maxUser && (
              <Text size="sm" c="dimmed">
                +{roomWithParticipant.maxUser - participantCount}名募集中
              </Text>
            )}
          </Group>
        </Box>

        {/* ルームID（デバッグ用） */}
        <Box>
          <Text size="xs" c="dimmed">
            Room ID: {roomWithParticipant.id}
          </Text>
        </Box>
      </Stack>
    </Card>
  );
};

