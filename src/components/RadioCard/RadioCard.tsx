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
      onOptionChange(value);
    }
  };

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const newSelections = checked
      ? [...internalMultiSelections, optionValue]
      : internalMultiSelections.filter((item) => item !== optionValue);
    setInternalMultiSelections(newSelections);
    if (onOptionChange) {
      onOptionChange(newSelections);
    }
  };

  const scrollbarThickness = 8;

  const containerSx = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  } as const;

  if (allowMultiple) {
    // こちらの構造は正しく動作しているので、そのままです
    return (
      <div className={styles.mantineOptionsContainer} style={containerSx}>
        <ScrollArea.Autosize
          type="always"
          className={styles.scrollableOptionsArea}
          scrollbarSize={scrollbarThickness}
          style={{ flex: 1, minHeight: 0 }}
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
      </div>
    );
  }

  // ★★★ ここからが単一選択（ラジオボタン）の修正箇所です ★★★
  return (
    <div className={styles.mantineOptionsContainer} style={containerSx}>
      {/* 最初に ScrollArea.Autosize を配置します */}
      <ScrollArea.Autosize
        type="always"
        className={styles.scrollableOptionsArea}
        scrollbarSize={scrollbarThickness}
        style={{ flex: 1, minHeight: 0 }}
      >
        {/* その内側に Radio.Group を配置します */}
        <Radio.Group
          value={internalSingleSelection}
          onChange={handleRadioChange}
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
        </Radio.Group>
      </ScrollArea.Autosize>
    </div>
  );
};
