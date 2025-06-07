"use client";

import {
  Container,
  Card,
  Avatar,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Grid,
  Box,
} from "@mantine/core";
import {
  IconChefHat,
  IconUser,
  IconUsers,
  IconMapPin,
  IconStar,
  IconClock,
  IconToolsKitchen2,
  IconArrowRight,
} from "@tabler/icons-react";
import classes from "./Home.module.css";

export function Home() {
  return (
    <div className={classes.container}>
      <Container size={800} className={classes.content}>
        <Stack gap="xl">
          {/* Hero Section */}
          <Box ta="center" className={classes.hero}>
            <div className={classes.heroIcon}>
              <IconChefHat size={40} color="white" />
            </div>
            <Text size="2rem" fw={800} c="white" mt="md" pb={12}>
              Qrate
            </Text>
            <Text size="lg" c="white" className={classes.heroSubtext}>
              行ってみたいお店を一緒に決めよう！
            </Text>
          </Box>

          {/* Profile Card */}
          <Card className={classes.profileCard} shadow="lg" radius="md">
            <Group>
              <Avatar size="lg" className={classes.avatar}>
                <IconUser size={24} />
              </Avatar>
              <Box style={{ flex: 1 }}>
                <Text fw={600} c="dark">
                  田中 太郎さん
                </Text>
                <Text size="sm" c="dimmed">
                  今日も美味しいお店を見つけましょう！
                </Text>
              </Box>
              <Box ta="right"></Box>
            </Group>
          </Card>

          {/* Main Actions */}
          <Stack gap="md">
            <Card className={classes.actionCard} shadow="lg" radius="md">
              <Group>
                <div className={classes.actionIconPink}>
                  <IconUser size={24} color="white" />
                </div>
                <Box style={{ flex: 1 }}>
                  <Text fw={600} size="lg" c="dark" mb={4}>
                    ひとりで探す
                  </Text>
                  <Text size="sm" c="dimmed" mb="xs">
                    気分に合わせてお店を選択
                  </Text>
                  <Group gap="xs">
                    <Badge
                      variant="outline"
                      size="xs"
                      leftSection={<IconMapPin size={12} />}
                    >
                      好きなお店
                    </Badge>
                    <Badge
                      variant="outline"
                      size="xs"
                      leftSection={<IconStar size={12} />}
                    >
                      おすすめ
                    </Badge>
                  </Group>
                </Box>
                <Button className={classes.buttonPink} size="sm">
                  開始
                  <IconArrowRight size={16} style={{ marginLeft: 4 }} />
                </Button>
              </Group>
            </Card>

            <Card className={classes.actionCard} shadow="lg" radius="md">
              <Group>
                <div className={classes.actionIconTeal}>
                  <IconUsers size={24} color="white" />
                </div>
                <Box style={{ flex: 1 }}>
                  <Text fw={600} size="lg" c="dark" mb={4}>
                    ルームを作成
                  </Text>
                  <Text size="sm" c="dimmed" mb="xs">
                    みんなでお店を決めよう
                  </Text>
                  <Group gap="xs">
                    <Badge
                      variant="outline"
                      size="xs"
                      leftSection={<IconUsers size={12} />}
                    >
                      グループ決め
                    </Badge>
                    <Badge
                      variant="outline"
                      size="xs"
                      leftSection={<IconClock size={12} />}
                    >
                      リアルタイム
                    </Badge>
                  </Group>
                </Box>
                <Button className={classes.buttonTeal} size="sm">
                  作成
                  <IconArrowRight size={16} style={{ marginLeft: 4 }} />
                </Button>
              </Group>
            </Card>
          </Stack>

          {/* Quick Actions */}
          <Grid>
            <Grid.Col span={6}>
              <Card className={classes.quickActionCard} shadow="md" radius="md">
                <Stack align="center" gap="xs">
                  <div className={classes.quickActionIconYellow}>
                    <IconStar size={20} />
                  </div>
                  <Text fw={500} size="sm" c="dark">
                    お気に入り
                  </Text>
                  <Text size="xs" c="dimmed">
                    保存したお店
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card className={classes.quickActionCard} shadow="md" radius="md">
                <Stack align="center" gap="xs">
                  <div className={classes.quickActionIconGreen}>
                    <IconToolsKitchen2 size={20} />
                  </div>
                  <Text fw={500} size="sm" c="dark">
                    履歴
                  </Text>
                  <Text size="xs" c="dimmed">
                    過去の選択
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Recent Activity */}
          <Card className={classes.activityCard} shadow="md" radius="md">
            <Text fw={600} c="dark" mb="md">
              最近の活動
            </Text>
            <Stack gap="sm">
              <Group gap="sm">
                <div className={classes.activityDotGreen}></div>
                <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                  「イタリアン・ビストロ」を訪問しました
                </Text>
                <Text size="xs" c="dimmed">
                  2時間前
                </Text>
              </Group>
              <Group gap="sm">
                <div className={classes.activityDotBlue}></div>
                <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                  友達とルーム「今夜の夕食」を作成
                </Text>
                <Text size="xs" c="dimmed">
                  1日前
                </Text>
              </Group>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
