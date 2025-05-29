"use client";

import styles from "./page.module.css";
import { Footer } from "@/components/Footer/Footer";
import React from "react";
import { ProgressBar } from "@/components/Progress/Progress";
import { RadioCard } from "@/components/RadioCard/RadioCard";
import { BlockQuote } from "@/components/Blockquote/BlockQuote";

const page = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.progress}>
          <ProgressBar />
        </div>
        <div className={styles.card}>
          <BlockQuote />
        </div>
        <div className={styles.areaColor}>
          <div className={styles.area}>
            <RadioCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
