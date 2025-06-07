"use client";

import { ReactNode } from "react";
import styles from "./TabNavigation.module.css";

export type TabType = "chat" | "restaurants" | "participants";

interface Tab {
  id: TabType;
  label: string;
  icon: string;
}

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  children: ReactNode;
}

const tabs: Tab[] = [
  { id: "chat", label: "チャット", icon: "💬" },
  { id: "restaurants", label: "お店", icon: "🍽️" },
  { id: "participants", label: "参加者", icon: "👥" },
];

export default function TabNavigation({
  activeTab,
  onTabChange,
  children,
}: TabNavigationProps) {
  return (
    <>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.tabContainer}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.active : ""
              }`}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>
      </footer>
    </>
  );
}