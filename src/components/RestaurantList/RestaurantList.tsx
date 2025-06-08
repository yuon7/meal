"use client";

import { User } from "@supabase/supabase-js";
import styles from "./RestaurantList.module.css";

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

interface RestaurantListProps {
  recommendations: RecommendedRestaurant[];
  loading: boolean;
  roomId: string | null;
  user: User | null;
}

export default function RestaurantList({
  recommendations,
  loading,
  roomId,
  user,
}: RestaurantListProps) {
  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>おすすめのお店</h2>
        <div className={styles.loading}>読み込み中...</div>
      </div>
    );
  }

  if (!roomId) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>おすすめのお店</h2>
        <div className={styles.noRoom}>ルームが選択されていません</div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>おすすめのお店</h2>
        <div className={styles.noRecommendations}>
          まだレストランの推薦がありません。
          <br />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>おすすめのお店</h2>
      {recommendations.map((recommendation) => (
        <div key={recommendation.id} className={styles.restaurantCard}>
          <div className={styles.restaurantHeader}>
            <h3 className={styles.restaurantName}>
              <a
                href={recommendation.restaurant.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.restaurantLink}
              >
                {recommendation.restaurant.name}
              </a>
            </h3>
            <div className={styles.rating}>
              ⭐ {recommendation.restaurant.rating}
            </div>
            {recommendation.restaurant.isHotRestaurant && (
              <div className={styles.hotBadge}>🔥 話題</div>
            )}
          </div>

          <div className={styles.restaurantInfo}>
            <div className={styles.genre}>
              {recommendation.restaurant.genre}
            </div>
            <div className={styles.location}>
              📍 {recommendation.restaurant.area} -{" "}
              {recommendation.restaurant.station}
            </div>
            <div className={styles.distance}>
              🚶 {recommendation.restaurant.distance}
            </div>
            <div className={styles.budget}>
              💰 ディナー: {recommendation.restaurant.budgetDinner} | ランチ:{" "}
              {recommendation.restaurant.budgetLunch}
            </div>
          </div>

          <div className={styles.description}>
            {recommendation.restaurant.description}
          </div>

          <div className={styles.recommendationInfo}>
            <div className={styles.matchScore}>
              マッチ度: {recommendation.matchScore}/100
            </div>
            <div className={styles.recommendReason}>
              <strong>推薦理由:</strong> {recommendation.recommendReason}
            </div>
          </div>

          <div className={styles.stats}>
            <span className={styles.stat}>
              👥 {recommendation.restaurant.reviewCount} レビュー
            </span>
            <span className={styles.stat}>
              💾 {recommendation.restaurant.savedCount} 保存
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
