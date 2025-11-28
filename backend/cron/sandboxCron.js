import cron from "node-cron";
import Card from "../models/Card.js";
import SandboxCardTransaction from "../models/SandboxCardTransaction.js";
import generateTransactions from "../utils/generateTransactions.js";

export default function startSandboxCron() {
  console.log("⏳ Sandbox Cron Started");

  cron.schedule("*/30 * * * *", async () => {
    console.log("⚡ Running Sandbox Cron");

    try {
      // get all cards
      const cards = await Card.find({});

      for (const card of cards) {
        const cleanCard = card.number.replace(/\s/g, "");

        const newTxns = generateTransactions(cleanCard, 10, card.bank);


        await SandboxCardTransaction.findOneAndUpdate(
          { cardId: card._id },
          {
            userId: card.userId,
            cardId: card._id,
            cardNumber: cleanCard,
            $push: { transactions: { $each: newTxns } }
          },
          { upsert: true }
        );

        console.log(`💾 Added transactions for card: ${cleanCard}`);
      }

      console.log("✅ Sandbox Cron Finished");
    } catch (err) {
      console.error("❌ Cron Error:", err);
    }
  });
}
