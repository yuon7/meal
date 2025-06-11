"use client";

import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { IconMapPin, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./RecommendationResults.module.css";
import React from "react";

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

interface RecommendationResultsProps {
  results: RecommendationResult[];
  roomId?: string;
  user?: User;
}

export function RecommendationResults({
  results,
  roomId,
  user,
}: RecommendationResultsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<Set<string>>(new Set());

  const handleSelectRestaurant = async (
    restaurant: Restaurant,
    recommendationItem: RecommendationResult
  ) => {
    if (!user) {
      console.log("ルームIDまたはユーザー情報が不足しています");
      return;
    }

    const restaurantId = restaurant.name;

    // 連打防止：既にローディング中の場合は処理を中断
    if (loading.has(restaurantId)) {
      return;
    }

    setLoading((prev) => new Set([...prev, restaurantId]));

    const restaurantData = {
      name: restaurant.name,
      url: restaurant.url,
      genre: restaurant.genre,
      area: restaurant.area,
      station: restaurant.station,
      distance: restaurant.distance,
      description: restaurant.description,
      rating: restaurant.rating,
      reviewCount: restaurant.reviewCount,
      savedCount: restaurant.savedCount,
      budgetDinner: restaurant.budgetDinner,
      budgetLunch: restaurant.budgetLunch,
      isHotRestaurant: restaurant.isHotRestaurant,
    };

    try {
      const response = await fetch(`/api/select-restaurant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantData,
          recommendReason: recommendationItem.recommendReason,
          matchScore: recommendationItem.matchScore,
          userId: user.id,
          roomId,
        }),
      });

      if (response.ok) {

        if (roomId) {
          router.push(`/chat/${roomId}?restaurant-selected=true`);
        }
      } else {
        const errorData = await response.json();
        console.error("レストラン選択に失敗しました:", errorData.error);
      }
    } catch (error) {
      console.error("レストラン選択エラー:", error);
    } finally {
      setLoading((prev) => {
        const newSet = new Set(prev);
        newSet.delete(restaurantId);
        return newSet;
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Title order={2} className={classes.title}>
          おすすめレストラン
        </Title>
        <Text size="sm" c="#9a3412">
          {results.length}件見つかりました
        </Text>
      </div>

      <Stack gap="md">
        {results.map((item, index) => (
          <Card key={index} className={classes.restaurantCard} p="lg">
            <Group justify="space-between" align="flex-start" mb="md">
              <div className={classes.restaurantInfo}>
                <Text className={classes.restaurantName} mb="xs">
                  {item.restaurant.name}
                </Text>
                <Group gap="md" mb="xs">
                  <Group gap="xs">
                    <IconMapPin size={16} />
                    <Text size="sm" c="dimmed">
                      {item.restaurant.area}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconStar size={16} className={classes.starIcon} />
                    <Text size="sm">{item.restaurant.rating}</Text>
                    <Text size="sm" c="dimmed">
                      ({item.restaurant.reviewCount}件)
                    </Text>
                  </Group>
                </Group>
                <Group gap="xs">
                  <Badge className={classes.genreBadge}>
                    {item.restaurant.genre}
                  </Badge>
                  <Badge className={classes.matchBadge}>
                    マッチ度 {item.matchScore}%
                  </Badge>
                  {item.restaurant.isHotRestaurant && (
                    <Badge className={classes.hotBadge}>話題のお店</Badge>
                  )}
                </Group>

                <Group justify="flex-end" mt="sm">
                  <Button
                    size="sm"
                    variant="filled"
                    color="blue"
                    loading={loading.has(item.restaurant.name)}
                    disabled={loading.has(item.restaurant.name)}
                    onClick={() =>
                      handleSelectRestaurant(item.restaurant, item)
                    }
                  >
                    {loading.has(item.restaurant.name)
                      ? "選択中..."
                      : "このレストランを選択"}
                  </Button>
                </Group>
              </div>
            </Group>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
