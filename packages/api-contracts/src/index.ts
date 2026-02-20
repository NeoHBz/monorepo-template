// This file will export router types from services

import type { AppRouter } from "./routers/app";

export type { AppRouter };

export type AppRouterContract = {
  app: AppRouter;
};

// Client factory
export * from "./client";
