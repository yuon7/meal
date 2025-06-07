import { Button, Group, ButtonProps } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import React from "react";

export function GithubButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
): React.JSX.Element {
  return (
    <Group>
      <Button
        leftSection={<GithubIcon size={18} />}
        variant="default"
        radius="xl"
        {...props}
      >
        GitHub
      </Button>
    </Group>
  );
}
