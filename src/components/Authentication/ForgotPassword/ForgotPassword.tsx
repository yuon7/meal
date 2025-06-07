import { IconArrowLeft } from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./ForgotPassword.module.css";
import { forgotPassword } from "@/app/auth/password/form/action";
import React from "react";

type Props = {
  readonly searchParams: { error?: string };
};

export function ForgotPassword({ searchParams }: Props) {
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>
      <form action={forgotPassword} method="post">
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            name="email"
            label="Your email"
            placeholder="me@tech.dev"
            required
          />
          {searchParams.error && (
            <Text color="red" size="xs" ta="center">
              {searchParams.error}
            </Text>
          )}
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor
              c="dimmed"
              size="sm"
              href="/auth/login"
              className={classes.control}
            >
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button
              className={classes.control}
              type="submit"
              name="action"
              value="forgot-password"
            >
              Submit
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
