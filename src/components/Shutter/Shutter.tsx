import { motion } from "framer-motion";
import { IconBuildingStore } from "@tabler/icons-react";
import styles from "./Shutter.module.css";
import React from "react";

type OpeningShutterProps = {
  onFinish: () => void;
};

export default function OpeningShutter({ onFinish }: OpeningShutterProps) {
  return (
    <div className={styles.shutter}>
      <motion.span
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: [0, 1, 0], y: [60, 0, -20] }}
        transition={{
          duration: 2.5,
          times: [0, 0.6, 1],
          ease: "easeInOut",
        }}
        onAnimationComplete={onFinish}
      >
        <IconBuildingStore
          size={120}
          style={{ color: "white", fill: "white" }}
        />
      </motion.span>
    </div>
  );
}
