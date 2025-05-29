"use client";

import { ActionCard } from "@/components/Card/Card";
import styles from "./page.module.css";
import { Footer } from "@/components/Footer/Footer";
import React from "react";
import { ProgressBar } from "@/components/Progress/Progress";
import { StackArea } from "@/components/StackArea/StackArea";

const page = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.progress}>
          <ProgressBar />
        </div>
        <div className={styles.card}>
          <ActionCard />
        </div>
        <div className={styles.areaColor}>
          <div className={styles.area}>
            <StackArea />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
