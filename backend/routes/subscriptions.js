import express from "express";
import Subscription from "../models/Subscription.js";
import { protect } from "../middleware/authMiddleware.js"; // Assuming you have this

const router = express.Router();

// @desc    Get all subscriptions
// @route   GET /api/subscriptions
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    // Sort by closest due date
    const subs = await Subscription.find({ user: req.user._id }).sort({ dueDate: 1 });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Add a new subscription
// @route   POST /api/subscriptions
// @access  Private
router.post("/", protect, async (req, res) => {
  const { name, category, amount, dueDate, cycle, icon, theme } = req.body;

  try {
    const subscription = new Subscription({
      user: req.user.id,
      name,
      category,
      amount,
      dueDate,
      cycle,
      icon,
      theme,
    });

    const createdSub = await subscription.save();
    res.status(201).json(createdSub);
  } catch (error) {
    res.status(400).json({ message: "Invalid subscription data" });
  }
});

// @desc    Get Calendar Events (for UI calendars)
// @route   GET /api/subscriptions/calendar
// @access  Private
router.get("/calendar", protect, async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user.id });

    const calendarEvents = subs.map((sub) => ({
      id: sub._id,
      title: `${sub.name} - ₹${sub.amount}`,
      start: sub.dueDate,
      allDay: true,
      backgroundColor:
        sub.theme === "emerald"
          ? "#10b981"
          : sub.theme === "rose"
          ? "#f43f5e"
          : "#3b82f6",
      extendedProps: {
        category: sub.category,
        amount: sub.amount,
      },
    }));

    res.json(calendarEvents);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Delete subscription
// @route   DELETE /api/subscriptions/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);

    if (sub && sub.user.toString() === req.user.id.toString()) {
      await sub.deleteOne();
      return res.json({ message: "Subscription removed" });
    }

    res.status(404).json({ message: "Subscription not found" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
