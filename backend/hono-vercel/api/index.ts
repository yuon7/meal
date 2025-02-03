import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");
const prisma = new PrismaClient();

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get("users", async (c) => {
  try {
    const users = await prisma.user.findMany();
    return c.json(users);
  } catch (error) {
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

export default handle(app);
