import superjson from "superjson";

import { getPrismaClient } from "@repo/prisma";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const prisma = getPrismaClient(process.env.DATABASE_URL || "");

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return { message: "Hello from backend!" };
  }),
  getUsers: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
});

export type AppRouter = typeof appRouter;
