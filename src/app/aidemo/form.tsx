"use client";

import { Button, Card, Stack, Text, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRecommendRestaurantInfo } from "./action";
import classes from "./page.module.css";

type Restaurant = {
  name: string;
  url: string;
  genre: string;
  area: string;
  station: string;
  distance: string;
  rating: number;
  reviewCount: number;
  savedCount: number;
  budgetDinner: string;
  budgetLunch: string;
  description: string;
  hasVpoint: boolean;
  isHotRestaurant: boolean;
  thumbnailImages: string[];
};

type RecommendationResult = {
  restaurant: Restaurant;
  recommendReason: string;
  matchScore: number;
};

export function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const res = await getRecommendRestaurantInfo(formData.get("tabelogURL") as string);
      if ("result" in res && Array.isArray(res.result)) {
        const encodedData = encodeURIComponent(JSON.stringify(res.result));
        router.push(`/recommend-result?data=${encodedData}`);
      } else {
        console.error("Invalid response format:", res);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack gap="xl">
      <Card className={classes.formContainer}>
        <div className={classes.header}>
          <Title className={classes.title} order={2}>
            レストラン推薦システム
          </Title>
          <Text c="dimmed" size="lg" className={classes.description}>
            食べログのレストラン情報から、あなたの好みに合った類似レストランを推薦します。
          </Text>
        </div>
        <form action={handleSubmit}>
          <Stack gap="md">
            <div className={classes.inputGroup}>
              <TextInput
                name="tabelogURL"
                label="食べログURL"
                placeholder="https://tabelog.com/tokyo/..."
                description="推薦の基準となるレストランの食べログURLを入力してください"
                required
                size="md"
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              gradient={{ deg: 133, from: "blue", to: "cyan" }}
              size="lg"
              radius="md"
              className={classes.submitButton}
              loading={loading}
            >
              類似レストランを探す
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}
