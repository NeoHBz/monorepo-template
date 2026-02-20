/// <reference types="vite/client" />

import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
});

// import.meta.env is special in Vite and needs to be accessed directly or copied
const envVars = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};

const parsedEnv = envSchema.safeParse(envVars);

if (!parsedEnv.success) {
  console.error("Frontend Environment validation failed");
  console.error(parsedEnv.error.flatten().fieldErrors);
  throw new Error("Invalid frontend environment variables");
}

export const env = parsedEnv.data;
