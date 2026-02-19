FROM oven/bun:1.3.9 AS base

FROM base AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build --filter=backend

FROM base AS runner
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

# Set environment
ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "apps/backend/src/index.ts"]
