"use client";

import { motion } from "framer-motion";
import styles from "./CookingLoader.module.css";

const EMOJIS = ["🍳", "🍜", "🍕", "🍣", "🍔", "🍰", "🍝", "🥙", "🍤", "🥗"];

export function CookingLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.foodFlow}
          /* ▼ 0%→-50% でループさせる（列を２つ並べるので -50% で OK） */
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 15, // 好みで速度調整
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop", // ← 明示すると意図が伝わりやすい
          }}
        >
          {/* 🅰 1列目 */}
          {EMOJIS.map((e, i) => (
            <span key={`a${i}`} className={styles.foodEmoji}>
              {e}
            </span>
          ))}
          {/* 🅱 2列目（複製） */}
          {EMOJIS.map((e, i) => (
            <span key={`b${i}`} className={styles.foodEmoji}>
              {e}
            </span>
          ))}
        </motion.div>

        <motion.div
          className={styles.loadingText}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          美味しいお店を探しています...
        </motion.div>
      </div>
    </div>
  );
}
