import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "@apps/backend/src/router";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }) as any,
);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
