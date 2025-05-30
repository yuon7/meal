"use client";
import {
  Box,
  Burger,
  Center,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { User } from "@supabase/supabase-js";
import { IconChevronDown } from "@tabler/icons-react";
import { UserButton } from "../UserButton/UserButton";
import styles from "./Header.module.css";
import { SearchBox } from "../SearchBox/SearchBox";

export function HeaderMegaMenu({ user }: { user: User | null }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box>
      <header className={styles.header}>
        <Group justify="center" h="100%">
          <SearchBox />
          <Group visibleFrom="sm">
            <UserButton user={user} />
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="ナビゲーション"
        hiddenFrom="sm"
        zIndex={100}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <UnstyledButton className={styles.link}>
            <Center inline>
              <Box component="span" mr={5}>
                sample1
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <UnstyledButton className={styles.link}>
            <Center inline>
              <Box component="span" mr={5}>
                sample2
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <UserButton user={user} closeDrawer={closeDrawer} />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
