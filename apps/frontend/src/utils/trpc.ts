import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@repo/api-contracts";

export const trpc = createTRPCReact<AppRouter>();
