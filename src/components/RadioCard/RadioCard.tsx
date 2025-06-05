// RadioCard.tsx
import React, { useState, useEffect } from "react";
import { Radio, Checkbox, Stack, ScrollArea } from "@mantine/core";
import styles from "./RadioCard.module.css";

interface RadioCardProps {
  options: string[];
  onOptionChange: (selectedValue: string | string[]) => void;
  selectedValue: string | string[] | null;
  allowMultiple?: boolean;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  options,
  onOptionChange,
  selectedValue,
  allowMultiple = false,
}) => {
  const [internalSingleSelection, setInternalSingleSelection] = useState<
    string | null
  >(null);
  const [internalMultiSelections, setInternalMultiSelections] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (allowMultiple) {
      setInternalMultiSelections(
        Array.isArray(selectedValue) ? selectedValue : [],
      );
      setInternalSingleSelection(null);
    } else {
      setInternalSingleSelection(
        typeof selectedValue === "string" ? selectedValue : null,
      );
      setInternalMultiSelections([]);
    }
  }, [selectedValue, allowMultiple]);

  const handleRadioChange = (value: string) => {
    setInternalSingleSelection(value);
    if (onOptionChange) {
      onOptionChange(value); // 単一選択は選択時に即時親へ通知
    }
  };

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const newSelections = checked
      ? [...internalMultiSelections, optionValue]
      : internalMultiSelections.filter((item) => item !== optionValue);
    setInternalMultiSelections(newSelections);
    if (onOptionChange) {
      onOptionChange(newSelections); // 複数選択も変更があるたびに親へ通知
    }
  };

  const scrollAreaMaxHeight = 300;
  const scrollbarThickness = 8;

  if (allowMultiple) {
    return (
      <div className={styles.mantineOptionsContainer}>
        <ScrollArea.Autosize
          mah={scrollAreaMaxHeight}
          type="always"
          className={styles.scrollableOptionsArea}
          scrollbarSize={scrollbarThickness}
        >
          <Stack>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.optionCard} ${
                  internalMultiSelections.includes(option)
                    ? styles.selected
                    : ""
                }`}
              >
                <Checkbox
                  label={<div className={styles.cardContent}>{option}</div>}
                  value={option}
                  checked={internalMultiSelections.includes(option)}
                  onChange={(event) =>
                    handleCheckboxChange(option, event.currentTarget.checked)
                  }
                  size="md"
                  styles={{
                    root: {
                      width: "100%",
                      padding: "var(--mantine-spacing-sm)",
                    },
                    body: { alignItems: "center", width: "100%" },
                    labelWrapper: { width: "100%" },
                  }}
                />
              </div>
            ))}
          </Stack>
        </ScrollArea.Autosize>
        {/* 「選択完了/次へ」ボタンを削除 */}
      </div>
    );
  }

  return (
    <div className={styles.mantineOptionsContainer}>
      <Radio.Group value={internalSingleSelection} onChange={handleRadioChange}>
        <ScrollArea.Autosize
          mah={scrollAreaMaxHeight}
          type="always"
          className={styles.scrollableOptionsArea}
          scrollbarSize={scrollbarThickness}
        >
          <Stack>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.optionCard} ${
                  internalSingleSelection === option ? styles.selected : ""
                }`}
              >
                <Radio
                  label={<div className={styles.cardContent}>{option}</div>}
                  value={option}
                  size="md"
                  styles={{
                    root: {
                      width: "100%",
                      padding: "var(--mantine-spacing-sm)",
                    },
                    body: { alignItems: "center", width: "100%" },
                    labelWrapper: { width: "100%" },
                  }}
                />
              </div>
            ))}
          </Stack>
        </ScrollArea.Autosize>
      </Radio.Group>
      {/* 「選択完了/次へ」ボタンを削除 */}
    </div>
  );
};
