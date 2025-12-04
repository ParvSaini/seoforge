# API Dockerfile - builder + production
FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# build step (if you use typescript, adjust accordingly)
RUN npm run build || true

# ---- Production image ----
FROM node:20-bullseye-slim
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/server.js"]
