import type { AppRouter } from "@repo/api-contracts";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
