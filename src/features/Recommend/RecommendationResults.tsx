"use client";

import {
  Accordion,
  Anchor,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { IconCurrencyYen, IconMapPin, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./RecommendationResults.module.css";

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

    const restaurantId = restaurant.url;

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
        console.log("レストランが正常に選択されました:", restaurant.name);

        if (roomId) {
          router.push(`/rooms/${roomId}?restaurant-selected=true`);
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
    <Card className={classes.resultsCard}>
      <Title order={3} mb="md" ta="center">
        推薦レストラン ({results.length}件)
      </Title>

      <Accordion variant="separated" radius="md">
        {results.map((item, index) => (
          <Accordion.Item key={index} value={`restaurant-${index}`}>
            <Accordion.Control>
              <div className={classes.accordionHeader}>
                <div className={classes.restaurantHeaderInfo}>
                  <div className={classes.restaurantNameRow}>
                    <Text fw={600} className={classes.restaurantNameMobile}>
                      {item.restaurant.name}
                    </Text>
                  </div>
                  <div className={classes.restaurantMetaRow}>
                    <Group gap="xs" className={classes.restaurantMeta}>
                      <Text size="md" c="dimmed">
                        {item.restaurant.area}
                      </Text>
                      <Group gap={2}>
                        <IconStar size={14} />
                        <Text size="md">{item.restaurant.rating}</Text>
                      </Group>
                      <Badge
                        size="md"
                        variant="light"
                        color="green"
                        className={classes.genreBadgeMobile}
                      >
                        {item.restaurant.genre}
                      </Badge>
                      <Badge className={classes.compactMatchScore}>
                        マッチ度:{item.matchScore}%
                      </Badge>
                    </Group>
                  </div>
                </div>
              </div>
            </Accordion.Control>

            <Accordion.Panel>
              <Stack gap="sm">
                <div>
                  <Group justify="space-between" mb={6}>
                    <Anchor
                      href={item.restaurant.url}
                      target="_blank"
                      fw={500}
                      c="blue"
                    >
                      食べログで詳細を見る
                    </Anchor>
                    {item.restaurant.isHotRestaurant && (
                      <Badge variant="light" color="red" size="sm">
                        🔥話題のお店
                      </Badge>
                    )}
                  </Group>

                  <Stack gap="xs" className={classes.restaurantDetailsStack}>
                    <Group gap={4}>
                      <IconMapPin size={14} />
                      <Text size="sm">
                        {item.restaurant.station}駅 {item.restaurant.distance}
                      </Text>
                    </Group>
                    <Group gap={4}>
                      <IconStar size={14} />
                      <Text size="sm">
                        {item.restaurant.rating} ({item.restaurant.reviewCount}
                        件)
                      </Text>
                    </Group>
                  </Stack>

                  {(item.restaurant.budgetDinner ||
                    item.restaurant.budgetLunch) && (
                    <div className={classes.budgetInfo}>
                      <Group gap={4}>
                        <IconCurrencyYen size={14} />
                        <div>
                          {item.restaurant.budgetDinner && (
                            <Text size="sm" className={classes.budgetText}>
                              夜: {item.restaurant.budgetDinner}
                            </Text>
                          )}
                          {item.restaurant.budgetLunch && (
                            <Text size="sm" className={classes.budgetText}>
                              昼: {item.restaurant.budgetLunch}
                            </Text>
                          )}
                        </div>
                      </Group>
                    </div>
                  )}
                </div>
                <Divider />

                <Group gap={4}>
                  {item.restaurant.description && (
                    <div>
                      <div>
                        <Text fw={500} mb={4} size="sm">
                          お店の特徴:
                        </Text>
                        <Text size="sm" c="dimmed">
                          {item.restaurant.description}
                        </Text>
                      </div>
                    </div>
                  )}

                  <div>
                    <Divider />
                    <Text fw={500} mb={4} size="sm">
                      推薦理由:
                    </Text>
                    <Text size="sm" c="dimmed">
                      {item.recommendReason}
                    </Text>
                  </div>
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
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
}
