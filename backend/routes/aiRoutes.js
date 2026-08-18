const express = require("express");
const rateLimit = require("express-rate-limit");
const { protect } = require("../middleware/authMiddleware");
const { generateFitnessReply } = require("../utils/aiClient");
const Meal = require("../models/Meal");
const Workout = require("../models/Workout");
const Habit = require("../models/Habit");
const router = express.Router();

// Basic rate limiter for AI endpoint to prevent abuse; adjust limits as needed.
const aiLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 30,
	standardHeaders: true,
	legacyHeaders: false,
});

router.post("/chat", aiLimiter, protect, async (req, res) => {
		const { message } = req.body;
		const user = req.user;
		if (!message || !message.trim()) {
			return res.status(400).json({ message: "Message is required" });
		}
		console.log("[AI ROUTE] Incoming message from user", user._id);

		const from = new Date();
		from.setDate(from.getDate() - 7);

		const meals = await Meal.find({ user: user._id, date: { $gte: from } });
		const workouts = await Workout.find({
			user: user._id,
			date: { $gte: from },
		});
		const habits = await Habit.find({ user: user._id, date: { $gte: from } });

		const recentCalories = meals.reduce((s, m) => s + (m.calories || 0), 0);
		const recentWorkouts = workouts
			.map((w) => `${w.type} ${w.durationMin}min`)
			.join(", ");

		let avgSleep = null,
			avgWater = null;
		if (habits.length) {
			avgSleep =
				habits.reduce((s, h) => s + (h.sleepHours || 0), 0) / habits.length;
			avgWater =
				habits.reduce((s, h) => s + (h.waterLiters || 0), 0) / habits.length;
		}

		const userContext = {
			age: user.age,
			gender: user.gender,
			heightCm: user.heightCm,
			weightKg: user.weightKg,
			goal: user.goal,
			dietaryPrefs: user.dietaryPrefs,
			dailyCalorieTarget: user.dailyCalorieTarget,
			recentCalories,
			recentWorkouts,
			avgSleep,
			avgWater,
		};

		try {
			const reply = await generateFitnessReply(userContext, message);
			res.json({ reply });
		} catch (err) {
			console.error('[AI ROUTE] Error:', err.message || err);
			res.status(500).json({ message: 'AI error', error: err.message || err });
		}
});

module.exports = router;
