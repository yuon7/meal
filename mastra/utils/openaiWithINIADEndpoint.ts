import { createOpenAI } from "@ai-sdk/openai";

export const openaiWithINIADEndpoint = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.openai.iniad.org/api/v1/",
});
