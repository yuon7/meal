import React, { useState, useEffect } from "react";
import { Radio, Checkbox, Stack, ScrollArea } from "@mantine/core";
import styles from "./RadioCard.module.css";

interface RadioCardProps {
  options: string[];
  onOptionChange: (selectedValue: string[]) => void;
  selectedValue: string[] | null;
  allowMultiple?: boolean;
}

export function RadioCard({
  options,
  onOptionChange,
  selectedValue,
  allowMultiple = false,
}: RadioCardProps) {
  const [internalSelections, setInternalSelections] = useState<string[]>([]);

  useEffect(() => {
    setInternalSelections(selectedValue || []);
  }, [selectedValue]);

  const handleRadioChange = (value: string) => {
    const newSelection = [value];
    setInternalSelections(newSelection);
    if (onOptionChange) {
      onOptionChange(newSelection);
    }
  };

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const newSelections = checked
      ? [...internalSelections, optionValue]
      : internalSelections.filter((item) => item !== optionValue);
    setInternalSelections(newSelections);
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
                  internalSelections.includes(option) ? styles.selected : ""
                }`}
              >
                <Checkbox
                  label={<div className={styles.cardContent}>{option}</div>}
                  value={option}
                  checked={internalSelections.includes(option)}
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

  return (
    <div className={styles.mantineOptionsContainer} style={containerSx}>
      <Radio.Group
        value={internalSelections[0] || null}
        onChange={handleRadioChange}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
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
                  internalSelections[0] === option ? styles.selected : ""
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
    </div>
  );
}
