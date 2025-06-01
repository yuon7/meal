"use client";

import React, { useState } from "react";
import {
  IconUser,
  IconUsers,
  IconUserPlus,
  IconChefHat,
  IconArrowRight,
} from "@tabler/icons-react";
import styles from "./Home.module.css";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const menuOptions = [
    {
      id: "solo",
      title: "ひとりで",
      subtitle: "あなただけのお店を見つけよう",
      icon: IconUser,
      color: "#FF6B6B",
      gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
      description: "気分に合わせてお店をおまかせで選択",
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
    {
      id: "join",
      title: "ルームに参加",
      subtitle: "既存のルームに参加する",
      icon: IconUserPlus,
      color: "#45B7D1",
      gradient: "linear-gradient(135deg, #45B7D1 0%, #69C5DB 100%)",
      description: "ルームコードを入力して参加",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerIconGroup}>
              <div className={styles.logoIcon}>
                <IconChefHat size={28} color="white" />
              </div>
            </div>
            <h1 className={styles.title}>AppName</h1>
            <p className={styles.subtitle}>今日のお店を一緒に決めよう！</p>
          </div>
          <div className={styles.menuGrid}>
            {menuOptions.map((option) => {
              const IconComponent = option.icon;
              const isHovered = hoveredCard === option.id;

              return (
                <div
                  key={option.id}
                  className={`${styles.menuCard} ${isHovered ? styles.menuCardHovered : ""}`}
                  onMouseEnter={() => setHoveredCard(option.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => console.log(`Selected: ${option.id}`)}
                >
                  <div
                    className={styles.cardBgGradient}
                    style={{ background: option.gradient }}
                  />
                  <div className={styles.cardContent}>
                    <div className={styles.cardLeft}>
                      <div
                        className={`${styles.iconWrapper} ${isHovered ? styles.iconWrapperHovered : ""}`}
                        style={{ background: option.gradient }}
                      >
                        <IconComponent size={28} color="white" />
                      </div>
                      <div className={styles.textContent}>
                        <h3
                          className={`${styles.cardTitle} ${isHovered ? styles.textHovered : ""}`}
                        >
                          {option.title}
                        </h3>
                        <p
                          className={`${styles.cardSubtitle} ${isHovered ? styles.textHovered : ""}`}
                        >
                          {option.subtitle}
                        </p>
                        <p
                          className={`${styles.cardDescription} ${isHovered ? styles.textHovered : ""}`}
                        >
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${styles.arrowWrapper} ${isHovered ? styles.arrowWrapperHovered : ""}`}
                    >
                      <IconArrowRight
                        size={20}
                        color={option.color}
                        className={`${styles.arrowIcon} ${isHovered ? styles.arrowIconHovered : ""}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
