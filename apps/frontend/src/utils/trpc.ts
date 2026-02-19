import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@manifest/api-contracts";

export const trpc = createTRPCReact<AppRouter>();
