//参考:https://gist.github.com/kincaidoneil/bc2516111f0ec8850cd6020b8191b27b?utm_source=chatgpt.com

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { WebSocket } from "ws";

// Example Supabase pooled connection string (must use Supavisor)
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const url = new URL(connectionString);
if (url.hostname === "localhost") {
  // Disable SSL for local connections
  neonConfig.useSecureWebSocket = false;
  // WebSocket proxy is hosted on `4000` locally, so add port. Does not work in production.
  neonConfig.wsProxy = (host, port) => `${host}:${port}/v2`;
}

// Only Neon hosts support this -- non-deterministic errors otherwise
neonConfig.pipelineConnect = false;

// So it can also work in Node.js
neonConfig.webSocketConstructor = WebSocket;

const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({
  adapter,
});
