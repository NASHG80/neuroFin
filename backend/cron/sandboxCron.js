import cron from "node-cron";
import Card from "../models/Card.js";
import SandboxTransaction from "../models/SandboxTransaction.js";
import generateTransactions from "../utils/generateTransactions.js";

async function runSandboxCronTick() {
  console.log("⚡ Sandbox Tick Running");

  try {
    const cards = await Card.find({});
    console.log("Cards found:", cards.length);

    for (const c of cards) {
      const cardNumber = c.number.replace(/\s+/g, "");
      const bank = c.bank;
      const cardId = c._id;

      // Check any existing transactions for this card
      const existing = await SandboxTransaction.findOne({ cardNumber });

      // FIRST TIME → 200 (spread over year)
      // AFTER THAT → 10 (near now)
      const txnCount = existing ? 10 : 200;

      const generated = generateTransactions(
        cardNumber,
        txnCount,
        bank,
        existing
          ? { anchorNow: true }
          : { spreadOverYear: true }
      );

      for (const { monthKey, transaction } of generated) {
        await SandboxTransaction.create({
          ...transaction,
          card: cardId,
          bank,
          cardNumber,
          month: monthKey
        });
      }

      console.log(`💾 Inserted ${txnCount} separate txns → ${cardNumber}`);
    }

    console.log("✅ Tick Complete");
  } catch (err) {
    console.error("❌ Cron Tick Error:", err);
  }
}

export default function startSandboxCron() {
  console.log("⏳ Sandbox Cron Enabled");

  runSandboxCronTick();                    // run immediately
  cron.schedule("*/30 * * * *", runSandboxCronTick); // run every 30 min
}
