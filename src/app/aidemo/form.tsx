"use client";

import { useState } from "react";
import { getWeatherInfo } from "./action";

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
  const [result, setResult] = useState<RecommendationResult[] | null>(null);

  async function handleSubmit(formData: FormData) {
    const res = await getWeatherInfo(formData);
    if ('result' in res && Array.isArray(res.result)) {
      setResult(res.result);
    } else {
      console.error('Invalid response format:', res);
      setResult(null);
    }
  }

  return (
    <>
      <form action={handleSubmit}>
        <input name="tabelogURL" placeholder="Enter restaurant URL" required />
        <button type="submit">Get Recommendations</button>
      </form>
      {result && (
        <div>
          {result.map((item, index) => (
            <div key={index}>
              <h3>{item.restaurant.name}</h3>
              <p>推薦理由: {item.recommendReason}</p>
              <p>マッチ度: {item.matchScore}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}