import React, { useState, useEffect } from "react";
import { Radio, Checkbox, Stack, ScrollArea } from "@mantine/core";
import styles from "./RadioCard.module.css";

interface RadioCardProps {
  options: string[];
  onOptionChange: (selectedValue: string | string[]) => void;
  selectedValue: string | string[] | null;
  allowMultiple?: boolean;
}

export function RadioCard({
  options,
  onOptionChange,
  selectedValue,
  allowMultiple = false,
}: RadioCardProps) {
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
    const newSelections = checked
      ? [...internalMultiSelections, optionValue]
      : internalMultiSelections.filter((item) => item !== optionValue);
    setInternalMultiSelections(newSelections);
    if (onOptionChange) {
      onOptionChange(newSelections);
    }
  };

  const containerSx = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  } as const;

  if (allowMultiple) {
    return (
      <div className={styles.mantineOptionsContainer} style={containerSx}>
        <ScrollArea.Autosize
          type="always"
          className={styles.scrollableOptionsArea}
          scrollbarSize={8}
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
                    root: { width: "100%" },
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

  return (
    <div className={styles.mantineOptionsContainer} style={containerSx}>
      <ScrollArea.Autosize
        type="always"
        className={styles.scrollableOptionsArea}
        scrollbarSize={8}
        style={{ flex: 1, minHeight: 0 }}
      >
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
                    root: { width: "100%" },
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
}
