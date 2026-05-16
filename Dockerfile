# Multi-stage build for the kombi-klima-yedek-parca project.
#
#   Stage 1 (builder)  : install all deps, run `vite build` → /app/dist
#   Stage 2 (runtime)  : install only prod deps, copy /app/dist + server/,
#                        run Express on :5000. Express serves both the
#                        built SPA (from /app/dist) and the /api/* routes.
#
# Final image runs as a non-root user and stores its JSON "database"
# under /app/server/data — mount a named volume there in compose so
# data survives `docker compose up --build`.

# ─────────────── Stage 1: build ───────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching).
COPY package*.json ./
RUN npm ci

# Copy the rest of the source and build the Vite SPA.
COPY . .
RUN npm run build

# ─────────────── Stage 2: runtime ───────────────
FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Production-only dependencies (express, cors, uuid).
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Built SPA bundle (served by Express as static assets).
COPY --from=builder /app/dist ./dist

# Express server + seed db.json.
COPY server ./server

# Drop root.
RUN chown -R node:node /app
USER node

EXPOSE 5000

CMD ["node", "server/index.js"]
