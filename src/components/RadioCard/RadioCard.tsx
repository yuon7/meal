import { useState } from "react";
import { Radio, Group, Text } from "@mantine/core";

export function RadioCard() {
  const [value, setValue] = useState("option1");
  const cardStyle = {
    border: "none",
    borderLeft: "4px solid #228be6", // Mantineの青色例
    borderRadius: "0",
    background: "transparent",
    boxShadow: "none",
    paddingLeft: "16px",
    marginBottom: "8px",
  };

  return (
    <Radio.Group value={value} onChange={setValue}>
      <Group>
        <Radio.Card value="option1" style={cardStyle}>
          <Text>選択肢1</Text>
        </Radio.Card>
        <Radio.Card value="option2" style={cardStyle}>
          <Text>選択肢2</Text>
        </Radio.Card>
        <Radio.Card value="option3" style={cardStyle}>
          <Text>選択肢3</Text>
        </Radio.Card>
      </Group>
    </Radio.Group>
  );
}
