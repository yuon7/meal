import { createTool } from "@mastra/core/tools";
import * as cheerio from "cheerio";
import { z } from "zod";

interface RestaurantInfo {
  name: string;
  genre: string;
  area: string;
  rating: number;
  reviewCount: number;
  savedCount: number;
  budgetDinner: string;
  budgetLunch: string;
  description: string;
  address?: string;
  phoneNumber?: string;
  businessHours?: string;
  closedDays?: string;
  seats?: string;
  images: string[];
}

export const tabelogSearchResultsTool = createTool({
  id: "parse-tabelog-search-results",
  description:
    "Parse multiple restaurant information from Tabelog search results page",
  inputSchema: z.object({
    url: z.string().url().describe("Tabelog search results URL"),
  }),
  outputSchema: z.object({
    totalCount: z.number().describe("Total number of restaurants found"),
    restaurants: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        genre: z.string(),
        area: z.string(),
        station: z.string(),
        distance: z.string(),
        rating: z.number(),
        reviewCount: z.number(),
        savedCount: z.number(),
        budgetDinner: z.string(),
        budgetLunch: z.string(),
        description: z.string(),
        hasVpoint: z.boolean().describe("Vpoint availability"),
        isHotRestaurant: z.boolean().describe("Hot restaurant award status"),
        thumbnailImages: z.array(z.string()).describe("Thumbnail image URLs"),
      })
    ),
  }),
  execute: async ({ context }) => {
    return await scrapeSearchResults(context.url);
  },
});

const scrapeSearchResults = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "ja,en;q=0.9",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const restaurants: any[] = [];

    $(".list-rst").each((i, element) => {
      const $el = $(element);

      // Basic information
      const name = $el.find(".list-rst__rst-name-target").text().trim();
      const url = $el.find(".list-rst__rst-name-target").attr("href") || "";

      // Area and genre parsing
      const areaGenreText = $el.find(".list-rst__area-genre").text().trim();
      const areaGenreParts = areaGenreText
        .split("/")
        .map((part) => part.trim());
      const stationInfo = areaGenreParts[0] || "";
      const [station, distance] = stationInfo.split(/\s+/);
      const genre = areaGenreParts.slice(1).join(", ");

      // Ratings and counts
      const ratingText = $el.find(".list-rst__rating-val").text().trim();
      const rating = parseFloat(ratingText) || 0;

      const reviewCountText = $el
        .find(".list-rst__rvw-count-num")
        .text()
        .trim();
      const reviewCount = parseInt(reviewCountText.replace(/,/g, "")) || 0;

      const savedCountText = $el
        .find(".list-rst__save-count-num")
        .text()
        .trim();
      const savedCount = parseInt(savedCountText.replace(/,/g, "")) || 0;

      // Budget information
      const budgetDinner =
        $el
          .find(".c-rating-v3__time--dinner")
          .next(".c-rating-v3__val")
          .text()
          .trim() || "-";
      const budgetLunch =
        $el
          .find(".c-rating-v3__time--lunch")
          .next(".c-rating-v3__val")
          .text()
          .trim() || "-";

      // Description
      const description = $el.find(".list-rst__pr-title").text().trim();

      // Special badges
      const hasVpoint = $el.find(".c-badge-tpoint").length > 0;
      const isHotRestaurant = $el.find(".c-badge-hot-restaurant").length > 0;

      // Thumbnail images
      const thumbnailImages: string[] = [];
      $el
        .find(
          ".js-cassette-img[data-original], .js-switch-thumbnail-img[data-lazy]"
        )
        .each((j, img) => {
          const src =
            $(img).attr("data-original") ||
            $(img).attr("data-lazy") ||
            $(img).attr("src");
          if (src && !src.includes("blank.gif") && !src.includes("loading")) {
            thumbnailImages.push(src);
          }
        });

      if (name && url) {
        restaurants.push({
          name,
          url,
          genre,
          area: areaGenreText,
          station: station || "",
          distance: distance || "",
          rating,
          reviewCount,
          savedCount,
          budgetDinner,
          budgetLunch,
          description,
          hasVpoint,
          isHotRestaurant,
          thumbnailImages: thumbnailImages.slice(0, 3), // Limit to 3 thumbnails
        });
      }
    });

    // Extract total count if available
    const totalCountText = $(".c-page-count__num").text().trim();
    const totalCount =
      parseInt(totalCountText.replace(/[^0-9]/g, "")) || restaurants.length;

    return {
      totalCount,
      restaurants,
    };
  } catch (error) {
    throw new Error(
      `Failed to scrape search results: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
