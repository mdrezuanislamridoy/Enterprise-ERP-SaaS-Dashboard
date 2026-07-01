FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/host/package.json ./apps/host/
RUN pnpm install --filter host...

COPY apps/host ./apps/host/
WORKDIR /app/apps/host
RUN pnpm run build

FROM nginx:alpine
COPY --from=builder /app/apps/host/dist /usr/share/nginx/html
COPY apps/host/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
