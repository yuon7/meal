"use client";

import { ActionCard } from "@/components/Card/Card";
import styles from "./page.module.css";
import { Footer } from "@/components/Footer/Footer";
import React from "react";
import { ProgressBar } from "@/components/Progress/Progress";
import { Inputs } from "@/components/InsideInputs/InsideInputs";
import { ClickButton } from "@/components/Button/Button";

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
        <div className={styles.input}>
          <Inputs />
        </div>
        <div className={styles.button}>
          <ClickButton /> <ClickButton />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
