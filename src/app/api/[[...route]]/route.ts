import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");
const prisma = new PrismaClient();

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

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

app.patch("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const body = await c.req.json();
  const { done } = body;

  if (typeof done !== "boolean") {
    return c.json({ error: "Done is required" }, 400);
  }

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { done },
    });
    return c.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return c.json({ error: "Failed to update todo" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
