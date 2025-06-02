import {
  Button,
  Container,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import classes from "./ResetPassword.module.css";
import { resetPassword } from "@/app/auth/password/reset/action";

type Props = {
  readonly searchParams: { error?: string };
  readonly onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

type CombinedProps = PaperProps & Props;

export function ResetPassword({
  searchParams,
  onSubmit,
  ...props
}: CombinedProps) {
  const [type] = useToggle(["register"]);
  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      newPassword: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
      confirmPassword: (val, values) =>
        val !== values.newPassword ? "Passwords do not match" : null,
    },
  });

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Reset your password
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to reset password
      </Text>

      <form action={resetPassword} onSubmit={onSubmit} method="post">
        <Paper radius="md" p="lg" withBorder {...props} mt="xl">
          <Stack>
            <PasswordInput
              required
              name="newPassword"
              label="New Password"
              placeholder="Your password"
              value={form.values.newPassword}
              onChange={(event) =>
                form.setFieldValue("newPassword", event.currentTarget.value)
              }
              radius="md"
            />

            <PasswordInput
              required
              name="confirmPassword"
              label="Confirmed Password"
              placeholder="Your password"
              value={form.values.confirmPassword}
              onChange={(event) =>
                form.setFieldValue("confirmPassword", event.currentTarget.value)
              }
              radius="md"
            />
          </Stack>

          {searchParams.error && (
            <Text color="red" size="xs" ta="center">
              {searchParams.error}
            </Text>
          )}

          <Button type="submit" radius="xl" fullWidth mt="md">
            {upperFirst(type)}
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
