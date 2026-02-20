import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "prisma/config";

// Load .env from apps/backend (source of truth for DB)
const envPath = path.join(__dirname, "../../apps/backend/.env");
dotenv.config({ path: envPath, quiet: true });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
