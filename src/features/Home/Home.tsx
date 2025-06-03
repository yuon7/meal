"use client";

import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Container,
  Stack,
  Title,
  Text,
  Group,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { IconUser, IconUsers, IconChefHat } from "@tabler/icons-react";
import styles from "./Home.module.css";
import MenuCard from "../../components/MenuCard/MenuCard";
import CreateRoomModal from "../../components/CreateRoomModal/CreateRoomModal";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

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
      //TODO - mealに進行？？
    } else {
      open();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Container size="sm" className={styles.content}>
          <Stack align="center" gap="lg" className={styles.header}>
            <Group justify="center" className={styles.headerIconGroup}>
              <ThemeIcon
                size={50}
                radius="xl"
                className={styles.logoIcon}
                gradient={{ from: "#ffd93d", to: "#ff8f3d", deg: 135 }}
                variant="gradient"
              >
                <IconChefHat size={28} color="white" />
              </ThemeIcon>
            </Group>
            <Title order={1} className={styles.title}>
              AppName
            </Title>
            <Text className={styles.subtitle}>
              今日のお店を一緒に決めよう！
            </Text>
          </Stack>

          <SimpleGrid cols={1} spacing="md" className={styles.menuGrid}>
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
        </Container>
      </div>
      <CreateRoomModal opened={opened} close={close} />
    </div>
  );
}
