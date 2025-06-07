import { useState } from "react";
import { TextInput, ActionIcon, Center } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React from "react";

export function SearchBox() {
  const [value, setValue] = useState("");

  return (
    <Center>
      <TextInput
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="検索"
        radius="xl"
        size="md"
        leftSection={<IconSearch size={18} color="#bdbdbd" />}
        rightSection={
          value && (
            <ActionIcon
              size="sm"
              variant="subtle"
              onClick={() => setValue("")}
              style={{ marginRight: 4 }}
            >
              <IconX size={18} color="#bdbdbd" />
            </ActionIcon>
          )
        }
        styles={{
          input: {
            background: "#f6f6f6",
            border: "none",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            width: "280px",
          },
        }}
      />
    </Center>
  );
}
