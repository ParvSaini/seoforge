FROM node:20-bullseye AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-bullseye-slim
WORKDIR /app

RUN apt-get update \
  && apt-get install -y chromium ca-certificates fonts-liberation \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 3000
CMD ["node", "dist/main.js"]
