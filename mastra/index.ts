import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";

import { tabelogAgent } from "./agents/tabelog-agent";
import { restaurantRecommendationWorkflow } from "./workflows/restaurant-recommendation";

export const mastra = new Mastra({
  agents: { tabelogAgent },
  workflows: { restaurantRecommendationWorkflow },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
