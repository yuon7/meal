import { Hono } from "hono";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { generateTabelogURL } from "@/lib/generateTabelogURL/generateTabelogURL";
import shapingTaelogURL from "@/lib/generateTabelogURL/shapingTabelogURL";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.post("/generateTabelogURL", async (c) => {
  const { lat, lng, keyword } = await c.req.json();

  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    typeof keyword !== "string"
  ) {
    return c.json(
      { error: "lat, lng, and keyword are required and must be valid types." },
      400
    );
  }

  try {
    const tabelogCitycodeURL: string = await generateTabelogURL(lng, lat);

    if (keyword.trim() === "") {
      return c.json({ tabelogURL: tabelogCitycodeURL });
    }

    const serchTabelogURL = `${tabelogCitycodeURL}/?sa=${keyword}`;

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
    });

    const page = await browser.newPage();

    // 簡単なリンクで一度サイトを訪れる例:(https://tabelog.com/tokyo/Cxxxxx/rstLst/?sa=keyword)
    await page.goto(serchTabelogURL, { waitUntil: "networkidle2" });

    // keywordが赤羽駅の場合、検索ボタンを押すと詳細条件に赤羽駅が入った状態のURLが生成される
    // 例: https://tabelog.com/tokyo/A1323/A132305/R134/rstLst/?vs=1&sa=%E8%B5%A4%E7%BE%BD%E9%A7%85&sk=&sw=
    const searchBtnSelector = 'button[aria-label="検索"]';
    const hasSearchBtn = await page.$(searchBtnSelector);

    if (hasSearchBtn) {
      await Promise.all([
        page.click(searchBtnSelector),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }
    const scrapeTabelogURL = page.url();
    // クエリ削除
    const tabelogURL = shapingTaelogURL(scrapeTabelogURL);
    await browser.close();
    return c.json({ tabelogURL });
  } catch (error) {
    console.error("Error generating final Tabelog URL:", error);
    return c.json({ error: "Failed to generate Tabelog URL" }, 500);
  }
});

export const POST = app.fetch;
