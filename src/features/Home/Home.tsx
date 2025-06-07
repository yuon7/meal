"use client";

import {
  Container,
  Card,
  Avatar,
  Text,
  Group,
  Stack,
  Grid,
  Box,
  SimpleGrid,
} from "@mantine/core";
import {
  IconUser,
  IconUsers,
  IconStar,
  IconToolsKitchen2,
  IconBuildingStore,
} from "@tabler/icons-react";
import classes from "./Home.module.css";
import React, { useState } from "react";
import MenuCard from "@/components/MenuCard/MenuCard";
import CreateRoomModal from "@/components/CreateRoomModal/CreateRoomModal";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export function HomeContent() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const menuOptions = [
    {
      id: "solo",
      title: "ひとりで",
      subtitle: "お店を見つけよう",
      icon: IconUser,
      color: "#FF6B6B",
      gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
      description: "気分に合わせてお店を選択",
    },
    {
      id: "create",
      title: "ルームを作成",
      subtitle: "みんなでお店を決めよう",
      icon: IconUsers,
      color: "#4ECDC4",
      gradient: "linear-gradient(135deg, #4ECDC4 0%, #6ED5CE 100%)",
      description: "友達を招待して一緒にお店選び",
    },
  ];

  const handleCardClick = (optionId: string) => {
    if (optionId === "solo") {
      router.push("/meal3");
    } else {
      open();
    }
  };
  return (
    <div className={classes.container}>
      <Container size={800} className={classes.content}>
        <Stack gap="xl">
          {/* Hero Section */}
          <Box ta="center" className={classes.hero}>
            <div className={classes.heroIcon}>
              <IconBuildingStore size={40} color="white" />
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
          <SimpleGrid cols={1} spacing="md" className={classes.menuGrid}>
            {menuOptions.map((option) => (
              <MenuCard
                key={option.id}
                id={option.id}
                title={option.title}
                subtitle={option.subtitle}
                description={option.description}
                icon={option.icon}
                color={option.color}
                gradient={option.gradient}
                isHovered={hoveredCard === option.id}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(option.id)}
              />
            ))}
          </SimpleGrid>

          {/* Quick Actions */}
          <Grid>
            <Grid.Col span={6}>
              <Card className={classes.quickActionCard} shadow="md" radius="lg">
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
              <Card className={classes.quickActionCard} shadow="md" radius="lg">
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
      <CreateRoomModal opened={opened} close={close} />
    </div>
  );
}
