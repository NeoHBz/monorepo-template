# Architecture Procedure: Creating & Consuming APIs

This guide details the step-by-step workflow for creating a new API endpoint in the `backend` and consuming it in the `frontend` application using tRPC.

## Prerequisites

- **Stack**: tRPC (v11), Prisma, React, Express, TypeScript, Bun.
- **Context**: You are working in a Monorepo. Types are shared via `@<scope>/api-contracts`.
- **Dependencies**: Uses standard `package.json` dependencies.

---

## Step 1: Create the tRPC Router

Create a new procedure to an existing router file. Use `publicProcedure` for open endpoints.
For larger features, you can split into separate router files and merge them.

**File**: `apps/backend/src/router.ts`

```typescript
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { getPrismaClient } from "@<scope>/prisma";

const t = initTRPC.create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;

const prisma = getPrismaClient(process.env.DATABASE_URL || "");

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return { message: "Hello from backend!" };
  }),

  // [NEW] query with logic
  getRandomUser: publicProcedure.query(async () => {
    const count = await prisma.user.count();
    if (count === 0) return null;
    const skip = Math.floor(Math.random() * count);
    return prisma.user.findFirst({ skip });
  }),
});

export type AppRouter = typeof appRouter;
```

---

## Step 2: Expose Types via API Contracts

The client apps (e.g. `frontend`) do not import `backend` code directly. Instead, they import **Types** from `@<scope>/api-contracts`.

**File**: `packages/api-contracts/src/routers/app.ts`

Ensure this file exports the inferred type from your service.

```typescript
// Export the full appRouter from backend
export type { AppRouter } from "@apps/backend/src/router";
```

**File**: `packages/api-contracts/src/index.ts`

Ensure the `AppRouter` is exported and available for clients.

```typescript
import type { AppRouter } from "./routers/app";
export type { AppRouter } from "./routers/app";

export type AppRouterContract = {
  app: AppRouter;
};

// Client factory
export * from "./client";
```

---

## Step 3: Consume in Frontend (Client App)

Any frontend application configured with `@trpc/react-query` can consume the API.

**File**: `apps/frontend/src/App.tsx` (Example)

```typescript
import { trpc } from "@apps/frontend/src/utils/trpc";

function App() {
  // Use Query
  // Type-safety: 'getRandomUser' is autocompleted
  const randomUser = trpc.getRandomUser.useQuery();

  if (randomUser.isLoading) return <span>Loading...</span>; // Use generic UI elements

  return (
    <div>
      <div>{randomUser.data?.name}</div>
      <button onClick={() => randomUser.refetch()}>Pick Random User</button>
    </div>
  );
}
export default App;
```

---

## Troubleshooting

- **Types not updating?**
    - Restart the TypeScript server in VS Code (`Cmd+Shift+P` -> `TypeScript: Restart TS Server`).
- **Runtime Error "Procedure not found"?**
    - Did you add the procedure to `appRouter` in Step 1?
    - Did you restart the `backend` server? (bun dev usually hot-reloads).
