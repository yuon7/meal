import React from "react";
import { Card, Group, Text, Box, ThemeIcon } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import styles from "./MenuCard.module.css";

interface MenuCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  gradient: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export default function MenuCard({
  title,
  subtitle,
  description,
  icon: IconComponent,
  color,
  gradient,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: MenuCardProps) {
  return (
    <Card
      className={`${styles.menuCard} ${isHovered ? styles.menuCardHovered : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      padding="lg"
      radius="lg"
      withBorder={false}
      shadow="sm"
    >
      <div
        className={styles.cardBgGradient}
        style={{ background: gradient }}
      />
      <Group justify="space-between" align="center" className={styles.cardContent}>
        <Group align="center" gap="md" className={styles.cardLeft}>
          <ThemeIcon
            size="lg"
            radius="md"
            className={`${styles.iconWrapper} ${isHovered ? styles.iconWrapperHovered : ""}`}
            style={{ background: gradient }}
          >
            <IconComponent size={28} color="white" />
          </ThemeIcon>
          <Box className={styles.textContent}>
            <Text
              size="lg"
              fw={600}
              className={`${styles.cardTitle} ${isHovered ? styles.textHovered : ""}`}
            >
              {title}
            </Text>
            <Text
              size="sm"
              className={`${styles.cardSubtitle} ${isHovered ? styles.textHovered : ""}`}
            >
              {subtitle}
            </Text>
            <Text
              size="xs"
              className={`${styles.cardDescription} ${isHovered ? styles.textHovered : ""}`}
            >
              {description}
            </Text>
          </Box>
        </Group>
        <ThemeIcon
          size="md"
          radius="md"
          variant="transparent"
          className={`${styles.arrowWrapper} ${isHovered ? styles.arrowWrapperHovered : ""}`}
        >
          <IconArrowRight
            size={20}
            color={color}
            className={`${styles.arrowIcon} ${isHovered ? styles.arrowIconHovered : ""}`}
          />
        </ThemeIcon>
      </Group>
    </Card>
  );
}