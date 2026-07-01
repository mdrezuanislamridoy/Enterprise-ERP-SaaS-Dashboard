FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/remote-analytics/package.json ./apps/remote-analytics/
RUN pnpm install --filter remote-analytics...

COPY apps/remote-analytics ./apps/remote-analytics/
WORKDIR /app/apps/remote-analytics
RUN pnpm run build

FROM nginx:alpine
COPY --from=builder /app/apps/remote-analytics/dist /usr/share/nginx/html
COPY apps/remote-analytics/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
