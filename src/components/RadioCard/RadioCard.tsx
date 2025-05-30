// src/components/RadioCard/RadioCard.tsx
import React, { useState, useEffect } from "react";
import styles from "./RadioCard.module.css";

interface RadioCardProps {
  options: string[];
  onOptionChange: (selectedValue: string) => void;
  selectedValue: string | null; // 現在選択されている値 (外部から渡す)
}

export const RadioCard: React.FC<RadioCardProps> = ({ options, onOptionChange, selectedValue }) => {
  // 内部状態はselectedValueを制御するために使用
  const [internalSelectedValue, setInternalSelectedValue] = useState<string | null>(selectedValue);

  // 外部の selectedValue が変更されたら内部状態を更新
  useEffect(() => {
    setInternalSelectedValue(selectedValue);
  }, [selectedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInternalSelectedValue(value); // 内部状態を更新
    if (onOptionChange) {
      onOptionChange(value); // 親コンポーネントに選択された値を通知
    }
  };

  return (
    <div className={styles.radioCardContainer}>
      {options.map((option, index) => (
        <label key={index} className={styles.radioCardLabel}>
          <input
            type="radio"
            name="questionOption" // 同じname属性でグループ化
            value={option}
            checked={internalSelectedValue === option} // 内部状態を参照
            onChange={handleChange}
            className={styles.radioInput}
            // 既に選択済みで、かつ次の質問に移っていない場合は無効化する
            // (今回の実装では、回答が選択されたらすぐ次の質問に移動するため、基本的に無効化は不要)
            // ただし、前の質問に戻ったときに選択状態を保持し、再度選択できないようにする場合は必要
            // disabled={selectedValue !== null && selectedValue !== option}
          />
          <div className={styles.cardContent}>
            {option}
          </div>
        </label>
      ))}
    </div>
  );
};