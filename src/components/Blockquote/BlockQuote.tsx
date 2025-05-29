import { Blockquote } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export function BlockQuote() {
  const icon = <IconInfoCircle />;
  return (
    <Blockquote color="blue" cite="– Forrest Gump" icon={icon} mt="xl">
      Life is like an npm install – you never know what you are going to get.
    </Blockquote>
  );
}
