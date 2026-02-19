import { initTRPC } from "@trpc/server";

import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return { message: "Hello from backend!" };
  }),
  getUsers: publicProcedure.query(async () => {
    // Mock data for now, connect to prisma later if needed
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
  }),
});

export type AppRouter = typeof appRouter;
