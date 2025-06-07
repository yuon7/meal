import { Hono } from "hono";
import { generateTabelogURL } from "@/lib/generateTabelogURL/generateTabelogURL";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.post("/generateTabelogURL", async (c) => {
  const { lat, lng } = await c.req.json();

  if (typeof lat !== "number" || typeof lng !== "number") {
    return c.json(
      { error: "lat, lng, and keyword are required and must be valid types." },
      400
    );
  }

  try {
    const tabelogCitycodeURL: string = await generateTabelogURL(lat, lng);
    return c.json({ tabelogURL: tabelogCitycodeURL });
  } catch (error) {
    console.error("Error generating final Tabelog URL:", error);
    return c.json({ error: "Failed to generate Tabelog URL" }, 500);
  }
});

export const POST = app.fetch;
