import React, { useState, useEffect } from "react";
import { Radio, Checkbox, Button, Stack } from "@mantine/core";
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
        Array.isArray(selectedValue) ? selectedValue : []
      );
      setInternalSingleSelection(null);
    } else {
      setInternalSingleSelection(
        typeof selectedValue === "string" ? selectedValue : null
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
    setInternalMultiSelections((prevSelections) => {
      if (checked) {
        return [...prevSelections, optionValue];
      } else {
        return prevSelections.filter((item) => item !== optionValue);
      }
    });
  };

  const handleMultipleSelectionComplete = () => {
    if (onOptionChange) {
      onOptionChange(internalMultiSelections);
    }
  };

  if (allowMultiple) {
    return (
      <div className={styles.mantineOptionsContainer}>
        {" "}
        <div className={styles.scrollableOptionsArea}>
          {" "}
          <Stack>
            {" "}
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.optionCard} ${internalMultiSelections.includes(option) ? styles.selected : ""}`}
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
        </div>
        <Button
          onClick={handleMultipleSelectionComplete}
          fullWidth
          mt="md"
        >
          選択完了
        </Button>
      </div>
    );
  }

  return (
    <Radio.Group
      value={internalSingleSelection}
      onChange={handleRadioChange}
      className={styles.mantineOptionsContainer}
    >
      <div className={styles.scrollableOptionsArea}>
        {" "}
        <Stack>
          {" "}
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.optionCard} ${internalSingleSelection === option ? styles.selected : ""}`}
            >
              <Radio
                label={<div className={styles.cardContent}>{option}</div>}
                value={option}
                size="md"
                styles={{
                  root: { width: "100%", padding: "var(--mantine-spacing-sm)" },
                  body: { alignItems: "center", width: "100%" },
                  labelWrapper: { width: "100%" },
                }}
              />
            </div>
          ))}
        </Stack>
      </div>
    </Radio.Group>
  );
};
