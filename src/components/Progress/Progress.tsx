// src/components/Progress/ProgressBar.tsx (または Progress.tsx)
import React from "react";
import styles from "./Progress.module.css"; // ProgressBar用のCSSモジュールを別途作成

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBarFill}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};