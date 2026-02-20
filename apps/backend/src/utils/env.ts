import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

const skipDatasource = process.env.PRISMA_SKIP_DATASOURCE_URL === "true";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  PORT: z.coerce.number().min(1000),
  DATABASE_URL: z.string().url(),
});

const parsedEnv = skipDatasource
  ? { success: true, data: {} as any }
  : envSchema.safeParse(process.env);

if (!skipDatasource && !parsedEnv.success) {
  console.error("Environment validation failed");
  console.error((parsedEnv as any).error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;

export const config = {
  skipDatasource,
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === "development",
  isProd: env.NODE_ENV === "production",
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
};

export const isEnvDevelopment = config.isDev;
export const isEnvProd = config.isProd;
