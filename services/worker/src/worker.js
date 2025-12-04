const { Worker } = require("bullmq");
const Redis = require("ioredis");

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const connection = new Redis(REDIS_URL);

// Worker processes "crawl" queue
const worker = new Worker(
  "crawl",
  async job => {
    console.log("Processing job:", job.id, job.name, job.data);
    // Simulate a crawl: pretend to fetch and return a short result
    const url = job.data.url || "unknown";
    // (In production, you would use puppeteer/fetch here.)
    const result = { url, status: 200, fetchedAt: new Date().toISOString() };
    console.log("Crawl result:", result);
    return result;
  },
  { connection }
);

worker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});
worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err?.message);
});

console.log("Worker started and listening to 'crawl' queue");
