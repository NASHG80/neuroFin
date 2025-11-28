import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  id: String,
  timestamp: Date,
  merchant: String,
  amount: Number,
  currency: String,
  status: String,
  type: String,
  bank: String,
  description: String,
});

const SandboxCardTransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },

    // store clean card number
    cardNumber: { type: String, required: true },

    transactions: { type: [TransactionSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("SandboxCardTransaction", SandboxCardTransactionSchema);
