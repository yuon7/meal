"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

interface Restaurant {
  id: string;
  name: string;
  url: string;
  genre: string;
  area: string;
  station: string;
  distance: string;
  description: string;
  rating: number;
  reviewCount: number;
  savedCount: number;
  budgetDinner: string;
  budgetLunch: string;
  isHotRestaurant: boolean;
}

interface RecommendedRestaurant {
  id: string;
  recommendReason: string;
  matchScore: number;
  userId: string;
  roomId: string | null;
  restaurantId: string;
  isSelected: boolean;
  createdAt: string;
  updatedAt: string;
  restaurant: Restaurant;
}

export function useRoomRecommendations(roomId: string | null, user: User | null) {
  const [recommendations, setRecommendations] = useState<RecommendedRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!roomId) {
      setRecommendations([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/rooms/${roomId}/recommended-restaurants`);
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data: RecommendedRestaurant[] = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching room recommendations:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !user) {
      setRecommendations([]);
      return;
    }

    fetchRecommendations();

    // リアルタイム更新の設定
    const supabase = createClient();
    const channel = supabase
      .channel(`room-recommendations-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "RecommendedRestaurant",
          filter: `roomId=eq.${roomId}`,
        },
        () => {
          fetchRecommendations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, user]);

  return { recommendations, loading, error };
}