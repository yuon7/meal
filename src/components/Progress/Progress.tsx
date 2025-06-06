import React from "react";
import styles from "./Progress.module.css";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBarFill}
        style={{ width: `${progressPercentage}%` }}
      />

      {[...Array(totalSteps + 1)].map((_, index) => {
        const left = (index / totalSteps) * 100;
        return (
          <div
            key={index}
            className={styles.stepMarker}
            style={{ left: `${left}%` }}
          />
        );
      })}
    </div>
  );
};
