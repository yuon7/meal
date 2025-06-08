"use server";

import { SearchOptions } from "@/lib/makeTabelogQuery/makeTabelogQuery";
import { mastra } from "../../../mastra";

export async function getRecommendRestaurantInfo(
  tabelogURL: string,
  quizAnswers: SearchOptions
) {
  const workflow = mastra.getWorkflow("restaurantRecommendationWorkflow");

  const run = workflow.createRun();

  const result = await run.start({
    inputData: {
      url: tabelogURL,
      quizAnswers,
    },
  });

  return result;
}
