FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Builder stage
FROM base AS builder
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
RUN pnpm install --filter api...

COPY apps/api ./apps/api/
WORKDIR /app/apps/api
RUN npx prisma generate
RUN pnpm run build

# Production stage
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./node_modules

EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && npx tsx prisma/seed.ts && node dist/main.js"]
