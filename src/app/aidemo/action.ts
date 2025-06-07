"use server";

import { mastra } from "../../../mastra";

export async function getRecommendRestaurantInfo(formData: FormData) {
  const tabelogURL = formData.get("tabelogURL") as string;
  const workflow = mastra.getWorkflow("restaurantRecommendationWorkflow");

  const run = await workflow.createRun();

  const result = await run.start({
    inputData: {
      url: tabelogURL,
    },
  });

  return result;
}
