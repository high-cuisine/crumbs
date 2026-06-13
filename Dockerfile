# syntax=docker/dockerfile:1

# ───────────── base ─────────────
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ───────────── deps (toolchain для нативного better-sqlite3) ─────────────
FROM base AS deps
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm config set maxsockets 3
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# ───────────── builder (output: standalone) ─────────────
FROM deps AS builder
COPY . .
RUN --mount=type=cache,target=/app/.next/cache npm run build

# ───────────── runner (минимальный, без dev-зависимостей и компиляторов) ─────────────
FROM base AS runner
ENV NODE_ENV=production
ENV DATA_DIR=/app/data
ENV UPLOADS_DIR=/app/public/uploads
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# .next/standalone содержит server.js и трассированный node_modules.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Нативный better-sqlite3 трассировка standalone не подхватывает —
# докладываем модуль и его рантайм-зависимости, чтобы работал SQLite (не JSON-фолбэк).
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3
COPY --from=builder /app/node_modules/bindings ./node_modules/bindings
COPY --from=builder /app/node_modules/file-uri-to-path ./node_modules/file-uri-to-path

# Персистентные каталоги во владении непривилегированного пользователя node.
RUN mkdir -p /app/data /app/public/uploads && chown -R node:node /app/data /app/public/uploads
USER node

EXPOSE 3000
CMD ["node", "server.js"]
