import cron from "node-cron";
import { sandboxCronTick } from "./sandboxCron.js";

console.log("⏰ Sandbox Cron Ready!");

cron.schedule("*/30 * * * *", async () => {
  await sandboxCronTick();
});
