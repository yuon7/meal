"use client";

import styles from "./RestaurantList.module.css";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
  tags: string[];
}

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "和食亭 さくら",
    cuisine: "日本料理",
    location: "渋谷区",
    rating: 4.5,
    priceRange: "¥3,000-5,000",
    tags: ["個室あり", "飲み放題", "接待向け"],
  },
  {
    id: "2",
    name: "Trattoria Bella Vista",
    cuisine: "イタリア料理",
    location: "港区",
    rating: 4.3,
    priceRange: "¥4,000-6,000",
    tags: ["テラス席", "ワイン豊富", "デート向け"],
  },
  {
    id: "3",
    name: "焼肉 炎",
    cuisine: "焼肉",
    location: "新宿区",
    rating: 4.2,
    priceRange: "¥2,500-4,000",
    tags: ["食べ放題", "深夜営業", "団体OK"],
  },
  {
    id: "4",
    name: "寿司処 海",
    cuisine: "寿司",
    location: "中央区",
    rating: 4.7,
    priceRange: "¥8,000-12,000",
    tags: ["カウンター席", "高級", "おまかせ"],
  },
  {
    id: "5",
    name: "中華飯店 龍",
    cuisine: "中華料理",
    location: "台東区",
    rating: 4.1,
    priceRange: "¥2,000-3,500",
    tags: ["円卓", "大皿料理", "宴会向け"],
  },
];

export default function RestaurantList() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>おすすめのお店</h2>
      {mockRestaurants.map((restaurant) => (
        <div key={restaurant.id} className={styles.restaurantCard}>
          <div className={styles.restaurantHeader}>
            <h3 className={styles.restaurantName}>{restaurant.name}</h3>
            <div className={styles.rating}>
              ⭐ {restaurant.rating}
            </div>
          </div>
          <div className={styles.restaurantInfo}>
            <div className={styles.cuisine}>{restaurant.cuisine}</div>
            <div className={styles.location}>📍 {restaurant.location}</div>
            <div className={styles.price}>💰 {restaurant.priceRange}</div>
          </div>
          <div className={styles.tags}>
            {restaurant.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}