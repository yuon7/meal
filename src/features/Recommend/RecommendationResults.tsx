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
import { IconCurrencyYen, IconMapPin, IconStar } from "@tabler/icons-react";
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
}

export function RecommendationResults({ results }: RecommendationResultsProps) {
  const handleSelectRestaurant = (restaurant: Restaurant) => {
    // TODO: 実装予定 - レストラン選択時の処理
    console.log("レストランが選択されました:", restaurant.name);
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
                    onClick={() => handleSelectRestaurant(item.restaurant)}
                  >
                    このレストランを選択する
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
