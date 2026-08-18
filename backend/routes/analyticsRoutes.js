const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Meal = require("../models/Meal");
const Workout = require("../models/Workout");
const WaterIntake = require("../models/WaterIntake");
const WeightLog = require("../models/WeightLog");
const Habit = require("../models/Habit");
const router = express.Router();

// Get calories consumed vs burned for last 7 days
router.get("/calories", protect, async (req, res) => {
	try {
		const today = new Date();
		const sevenDaysAgo = new Date(today);
		sevenDaysAgo.setDate(today.getDate() - 6);
		sevenDaysAgo.setHours(0, 0, 0, 0);

		const data = [];

		for (let i = 0; i < 7; i++) {
			const date = new Date(sevenDaysAgo);
			date.setDate(sevenDaysAgo.getDate() + i);
			const nextDate = new Date(date);
			nextDate.setDate(date.getDate() + 1);

			// Get meals for this day
			const meals = await Meal.find({
				user: req.user._id,
				date: { $gte: date, $lt: nextDate }
			});
			const consumed = meals.reduce((sum, m) => sum + m.calories, 0);

			// Get workouts for this day
			const workouts = await Workout.find({
				user: req.user._id,
				date: { $gte: date, $lt: nextDate }
			});
			const burned = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

			data.push({
				date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
				consumed,
				burned
			});
		}

		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get today's water total (must be before /water to avoid route collision)
router.get("/water/today", protect, async (req, res) => {
	try {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);

		const intakes = await WaterIntake.find({
			user: req.user._id,
			date: { $gte: today, $lt: tomorrow }
		});
		const total = intakes.reduce((sum, w) => sum + w.amount, 0);

		res.json({ total, goal: 2500, intakes });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get water intake for last 7 days
router.get("/water", protect, async (req, res) => {
	try {
		const today = new Date();
		const sevenDaysAgo = new Date(today);
		sevenDaysAgo.setDate(today.getDate() - 6);
		sevenDaysAgo.setHours(0, 0, 0, 0);

		const data = [];

		for (let i = 0; i < 7; i++) {
			const date = new Date(sevenDaysAgo);
			date.setDate(sevenDaysAgo.getDate() + i);
			const nextDate = new Date(date);
			nextDate.setDate(date.getDate() + 1);

			const intakes = await WaterIntake.find({
				user: req.user._id,
				date: { $gte: date, $lt: nextDate }
			});
			const total = intakes.reduce((sum, w) => sum + w.amount, 0);

			data.push({
				date: date.toLocaleDateString("en-US", { weekday: "short" }),
				amount: total,
				goal: 2500 // 2.5L daily goal
			});
		}

		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Add water intake
router.post("/water", protect, async (req, res) => {
	try {
		const { amount } = req.body;
		const intake = await WaterIntake.create({
			user: req.user._id,
			amount
		});
		res.json(intake);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get weight trend for last 30 days
router.get("/weight", protect, async (req, res) => {
	try {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const logs = await WeightLog.find({
			user: req.user._id,
			date: { $gte: thirtyDaysAgo }
		}).sort({ date: 1 });

		const data = logs.map(log => ({
			date: log.date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
			weight: log.weight
		}));

		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Add weight log
router.post("/weight", protect, async (req, res) => {
	try {
		const { weight } = req.body;
		
		// Check if already logged today
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);

		let log = await WeightLog.findOne({
			user: req.user._id,
			date: { $gte: today, $lt: tomorrow }
		});

		if (log) {
			log.weight = weight;
			await log.save();
		} else {
			log = await WeightLog.create({
				user: req.user._id,
				weight
			});
		}

		res.json(log);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get habit analysis
router.get("/habits", protect, async (req, res) => {
	try {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const habits = await Habit.find({
			user: req.user._id,
			date: { $gte: thirtyDaysAgo }
		});

		const totalDays = habits.length;

		// Analyze each tracked habit type based on actual schema fields
		const sleepGoal = 7; // hours
		const waterGoal = 2.5; // liters
		const stepsGoal = 8000;

		const sleepDays = habits.filter(h => h.sleepHours && h.sleepHours >= sleepGoal).length;
		const waterDays = habits.filter(h => h.waterLiters && h.waterLiters >= waterGoal).length;
		const stepsDays = habits.filter(h => h.steps && h.steps >= stepsGoal).length;

		const getSuggestion = (consistency) => {
			if (consistency < 30) return "Try setting reminders and start with smaller goals";
			if (consistency < 60) return "You're building momentum! Try pairing this habit with an existing routine";
			if (consistency < 80) return "Great progress! Consider increasing difficulty or frequency";
			return "Excellent consistency! This habit is becoming automatic";
		};

		const analysis = [];

		if (totalDays > 0) {
			const sleepConsistency = Math.round((sleepDays / totalDays) * 100);
			analysis.push({
				name: "Sleep",
				total: totalDays,
				completed: sleepDays,
				missed: totalDays - sleepDays,
				consistency: sleepConsistency,
				suggestion: getSuggestion(sleepConsistency)
			});

			const waterConsistency = Math.round((waterDays / totalDays) * 100);
			analysis.push({
				name: "Water Intake",
				total: totalDays,
				completed: waterDays,
				missed: totalDays - waterDays,
				consistency: waterConsistency,
				suggestion: getSuggestion(waterConsistency)
			});

			const stepsConsistency = Math.round((stepsDays / totalDays) * 100);
			analysis.push({
				name: "Steps",
				total: totalDays,
				completed: stepsDays,
				missed: totalDays - stepsDays,
				consistency: stepsConsistency,
				suggestion: getSuggestion(stepsConsistency)
			});
		}

		// Overall consistency = average of all three
		const totalGoalsMet = sleepDays + waterDays + stepsDays;
		const totalPossible = totalDays * 3;
		const overallConsistency = totalPossible > 0 ? Math.round((totalGoalsMet / totalPossible) * 100) : 0;

		res.json({
			overall: {
				total: totalDays,
				completed: totalGoalsMet,
				consistency: overallConsistency
			},
			habits: analysis
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Compare this month vs last month
router.get("/compare-months", protect, async (req, res) => {
	try {
		const now = new Date();
		
		// This month range
		const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
		const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
		
		// Last month range
		const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

		// This month data
		const thisMonthMeals = await Meal.find({
			user: req.user._id,
			date: { $gte: thisMonthStart, $lte: thisMonthEnd }
		});
		const thisMonthWorkouts = await Workout.find({
			user: req.user._id,
			date: { $gte: thisMonthStart, $lte: thisMonthEnd }
		});

		// Last month data
		const lastMonthMeals = await Meal.find({
			user: req.user._id,
			date: { $gte: lastMonthStart, $lte: lastMonthEnd }
		});
		const lastMonthWorkouts = await Workout.find({
			user: req.user._id,
			date: { $gte: lastMonthStart, $lte: lastMonthEnd }
		});

		res.json({
			thisMonth: {
				caloriesConsumed: thisMonthMeals.reduce((sum, m) => sum + (m.calories || 0), 0),
				caloriesBurned: thisMonthWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
				meals: thisMonthMeals.length,
				workouts: thisMonthWorkouts.length
			},
			lastMonth: {
				caloriesConsumed: lastMonthMeals.reduce((sum, m) => sum + (m.calories || 0), 0),
				caloriesBurned: lastMonthWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
				meals: lastMonthMeals.length,
				workouts: lastMonthWorkouts.length
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
