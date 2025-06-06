// app/page.tsx  (or src/app/page.tsx – adjust to your project structure)

"use client";

import {
  Button,
  Card,
  Container,
  Grid,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconApi,
  IconBolt,
  IconCode,
  IconShieldLock,
} from "@tabler/icons-react";
import Link from "next/link";
import classes from "./page.module.css";

/* ------------------------------------------
 * 1. Feature data – icons, titles, copy
 * ---------------------------------------- */
const features = [
  {
    icon: IconBolt,
    title: "Next.js 14",
    description:
      "App Router と Server Components を活用した最新機能で、高速表示と SEO を両立。",
  },
  {
    icon: IconApi,
    title: "Hono Integration",
    description:
      "軽量・高速な Hono を統合。Edge 環境でも効率的に API をハンドリングできます。",
  },
  {
    icon: IconShieldLock,
    title: "Authentication",
    description:
      "Supabase 認証を標準装備。セキュアなユーザー管理と DB 連携を簡単に実装。",
  },
  {
    icon: IconCode,
    title: "Type Safety",
    description:
      "TypeScript をフルサポート。型安全な開発でバグの少ない堅牢なアプリを実現。",
  },
];

/* ------------------------------------------
 * 2. Home component
 * ---------------------------------------- */
export default function Home() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <Container size="lg" px="lg" py={80}>
      <Card>
        <div className={classes.wrapper}>
          <Grid gutter={80}>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Title className={classes.title} order={2}>
                Next-Hono-Template
              </Title>
              <Text c="dimmed">
                Next.js 14 × Hono × Supabase × Prisma × Mantine フルスタック Web
                アプリを高速に構築。
              </Text>

              <Button
                component={Link}
                href="/todo"
                variant="gradient"
                gradient={{ deg: 133, from: "blue", to: "cyan" }}
                size="lg"
                radius="md"
                mt="xl"
              >
                Get started
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                {items}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </div>
      </Card>
    </Container>
  );
}
