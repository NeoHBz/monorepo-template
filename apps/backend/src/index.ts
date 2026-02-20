import cors from "cors";
import express from "express";

import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { appRouter } from "@apps/backend/src/router";
import { env } from "@apps/backend/src/utils/env";
import { getPrismaClient } from "@packages/prisma";

const app = express();
const port = env.PORT || 3000;
const prisma = getPrismaClient(env.DATABASE_URL);

app.use(cors());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }),
);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
  // check if prisma is connected
  prisma.$queryRaw`SELECT 1`
    .then(() => {
      console.log("Prisma is connected");
    })
    .catch((error: unknown) => {
      console.error("Prisma is not connected", error);
    });
});
