import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in environment variables");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
