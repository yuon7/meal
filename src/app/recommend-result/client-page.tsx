"use client";

import { RecommendationResults } from "@/features/Recommend/RecommendationResults";
import { Button, Container, Title } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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

interface ClientPageProps {
  user: User;
  results: RecommendationResult[];
}

export default function ClientPage({ user, results }: ClientPageProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container size="lg" px="lg" py={80}>
      <Button variant="outline" onClick={handleGoBack} mb="xl">
        戻る
      </Button>

      <Title order={2} mb="xl" ta="center">
        レストラン推薦結果
      </Title>

      <RecommendationResults results={results} user={user} />
    </Container>
  );
}
