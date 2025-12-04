const express = require("express");
const { Queue } = require("bullmq");
const Redis = require("ioredis");

const app = express();
app.use(express.json());

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const connection = new Redis(REDIS_URL);

// create a queue named "crawl"
const crawlQueue = new Queue("crawl", { connection });

app.get("/api/v1/healthz", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/v1/ping", (req, res) => {
  res.json({ pong: true });
});

// Enqueue a sample crawl job (POST or GET for simplicity)
app.post("/api/v1/enqueue", async (req, res) => {
  const { url } = req.body || {};
  if (!url) {
    return res.status(400).json({ error: "missing url in body" });
  }
  const job = await crawlQueue.add("crawl-page", { url }, { removeOnComplete: true, removeOnFail: true });
  res.json({ added: true, jobId: job.id });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
