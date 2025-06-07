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
  const progressPercentage =
    totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBarFill}
        style={{ width: `${progressPercentage}%` }}
      />

      {[...Array(totalSteps - 1)].map((_, i) => {
        const stepIndex = i + 1;
        const left = (stepIndex / totalSteps) * 100;
        return (
          <div
            key={stepIndex}
            className={styles.stepMarker}
            style={{ left: `${left}%` }}
          />
        );
      })}
    </div>
  );
};
