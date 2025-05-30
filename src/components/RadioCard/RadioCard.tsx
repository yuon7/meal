import React, { useState, useEffect } from "react";
import styles from "./RadioCard.module.css";

interface RadioCardProps {
  options: string[];
  onOptionChange: (selectedValue: string) => void;
  selectedValue: string | null;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  options,
  onOptionChange,
  selectedValue,
}) => {
  const [internalSelectedValue, setInternalSelectedValue] = useState<
    string | null
  >(selectedValue);

  useEffect(() => {
    setInternalSelectedValue(selectedValue);
  }, [selectedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInternalSelectedValue(value);
    if (onOptionChange) {
      onOptionChange(value);
    }
  };

  return (
    <div className={styles.radioCardContainer}>
      {options.map((option, index) => (
        <label
          key={index}
          className={`${styles.radioCardLabel} ${internalSelectedValue === option ? styles.selected : ""}`}
        >
          <input
            type="radio"
            name="questionOption"
            value={option}
            checked={internalSelectedValue === option}
            onChange={handleChange}
            className={styles.radioInput}
          />
          <div className={styles.cardContent}>{option}</div>
        </label>
      ))}
    </div>
  );
};
