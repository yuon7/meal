import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");
const prisma = new PrismaClient();

app.post("/select-restaurant", async (c) => {
  try {
    const roomId = c.req.param("roomId");
    const body = await c.req.json();
    const { restaurantData, recommendReason, matchScore, userId } = body;

    if (!restaurantData || !userId) {
      return c.json({ error: "Restaurant data and userId are required" }, 400);
    }

    // まずRestaurantを作成または取得
    let restaurant = await prisma.restaurant.findFirst({
      where: {
        name: restaurantData.name,
        url: restaurantData.url,
      },
    });

    if (!restaurant) {
      restaurant = await prisma.restaurant.create({
        data: {
          name: restaurantData.name,
          url: restaurantData.url,
          genre: restaurantData.genre,
          area: restaurantData.area,
          station: restaurantData.station,
          distance: restaurantData.distance,
          description: restaurantData.description,
          rating: restaurantData.rating,
          reviewCount: restaurantData.reviewCount,
          savedCount: restaurantData.savedCount,
          budgetDinner: restaurantData.budgetDinner,
          budgetLunch: restaurantData.budgetLunch,
          isHotRestaurant: restaurantData.isHotRestaurant || false,
        },
      });
    }

    const recommendedRestaurant = await prisma.recommendedRestaurant.create({
      data: {
        recommendReason,
        matchScore,
        userId,
        roomId,
        restaurantId: restaurant.id,
        isSelected: true,
      },
      include: {
        restaurant: true,
        room: true,
      },
    });

    return c.json(recommendedRestaurant, 201);
  } catch (error) {
    console.error("Error selecting restaurant:", error);
    return c.json({ error: "Failed to select restaurant" }, 500);
  }
});

// TODO: 仮置き、ルーム参加ができたら消す
app.get("/rooms", async (c) => {
  try {
    const rooms = await prisma.room.findMany({
      where: { isClosed: false },
      orderBy: { createdAt: "desc" },
    });
    return c.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return c.json({ error: "Failed to fetch rooms" }, 500);
  }
});

app.get("/rooms/:roomId/messages", async (c) => {
  try {
    const roomId = c.req.param("roomId");
    const messages = await prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
    });
    return c.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return c.json({ error: "Failed to fetch messages" }, 500);
  }
});

app.post("/rooms/:roomId/messages", async (c) => {
  try {
    const roomId = c.req.param("roomId");
    const body = await c.req.json();
    const { text, userId } = body;

    if (!text || !userId) {
      return c.json({ error: "Text and userId are required" }, 400);
    }

    const newMessage = await prisma.message.create({
      data: {
        text,
        userId,
        roomId,
      },
    });

    return c.json(newMessage, 201);
  } catch (error) {
    console.error("Error creating message:", error);
    return c.json({ error: "Failed to create message" }, 500);
  }
});

app.get("/rooms/:roomId/participants", async (c) => {
  try {
    const roomId = c.req.param("roomId");
    const participants = await prisma.roomParticipant.findMany({
      where: { roomId },
    });
    return c.json(participants);
  } catch (error) {
    console.error("Error fetching participants:", error);
    return c.json({ error: "Failed to fetch participants" }, 500);
  }
});

app.get("/rooms/:roomId/recommended-restaurants", async (c) => {
  try {
    const roomId = c.req.param("roomId");
    const recommendedRestaurants = await prisma.recommendedRestaurant.findMany({
      where: { roomId },
      include: {
        restaurant: true,
      },
      orderBy: { matchScore: "desc" },
    });
    return c.json(recommendedRestaurants);
  } catch (error) {
    console.error("Error fetching recommended restaurants:", error);
    return c.json({ error: "Failed to fetch recommended restaurants" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
