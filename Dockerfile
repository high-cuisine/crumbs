# syntax=docker/dockerfile:1

# Базовый образ. bookworm-slim + toolchain нужен для сборки нативного better-sqlite3.
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Зависимости (reproducible install по lock-файлу, сборка better-sqlite3 под Linux).
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm config set maxsockets 3
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# Сборка приложения.
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Рантайм.
FROM base AS runner
ENV NODE_ENV=production
ENV DATA_DIR=/app/data
ENV UPLOADS_DIR=/app/public/uploads
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Персистентные каталоги во владении непривилегированного пользователя node.
RUN mkdir -p /app/data /app/public/uploads && chown -R node:node /app/data /app/public/uploads
USER node

EXPOSE 3000
CMD ["npm", "run", "start"]
