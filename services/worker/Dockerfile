# Worker Dockerfile - builder + production
FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build || true

FROM node:20-bullseye-slim
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm ci --omit=dev

CMD ["node", "dist/worker.js"]
