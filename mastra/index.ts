import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";

import { tabelogAgent } from "./agents/tabelog-agent";
import { restaurantRecommendationWorkflow } from "./workflows/restaurant-recommendation";

export const mastra = new Mastra({
  agents: { tabelogAgent },
  workflows: { restaurantRecommendationWorkflow },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
