import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");
const prisma = new PrismaClient();

app.get("/todos", async (c) => {
  const todos = await prisma.todo.findMany();
  return c.json(todos);
});

app.post("/todos", async (c) => {
  const body = await c.req.json();
  const { title } = body;
  if (!title) {
    return c.json({ error: "Title is required" }, 400);
  }
  const newTodos = await prisma.todo.create({
    data: {
      title,
    },
  });
  return c.json(newTodos, 201);
});

app.put("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  const body = await c.req.json();
  const { done } = body;
  if (typeof done !== "boolean") {
    return c.json({ error: "Done is required" }, 400);
  }
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { done },
  });
  return c.json(updatedTodo);
});

app.delete("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  await prisma.todo.delete({
    where: { id },
  });
  return c.json({ message: "Todo deleted" });
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

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
