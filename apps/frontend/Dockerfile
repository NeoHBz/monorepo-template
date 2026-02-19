FROM oven/bun:1.3.9 AS base

FROM base AS builder
WORKDIR /app
COPY . .
RUN bun install

# Build the frontend with environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN bun run build --filter=frontend

FROM nginx:alpine AS runner
# Copy built assets from builder
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Add nginx config for SPA routing
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
