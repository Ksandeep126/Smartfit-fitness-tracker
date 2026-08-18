const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Meal = require("../models/Meal");
const router = express.Router();

// Add meal
router.post("/", protect, async (req, res) => {
	try {
		const { name, calories, protein, carbs, fats, date } = req.body;
		const meal = await Meal.create({
			user: req.user._id,
			name,
			calories,
			protein: protein || 0,
			carbs: carbs || 0,
			fats: fats || 0,
			date: date || new Date(),
		});
		res.json(meal);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Today's meals (MUST be before GET /)
router.get("/today", protect, async (req, res) => {
	try {
		const start = new Date();
		start.setHours(0, 0, 0, 0);
		const end = new Date();
		end.setHours(23, 59, 59, 999);

		const meals = await Meal.find({
			user: req.user._id,
			date: { $gte: start, $lte: end },
		});

		const total = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
		res.json({ meals, totalCalories: total });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get meals from last week (MUST be before GET /)
router.get("/history/week", protect, async (req, res) => {
	try {
		const today = new Date();
		today.setHours(23, 59, 59, 999);
		const weekAgo = new Date();
		weekAgo.setDate(weekAgo.getDate() - 7);
		weekAgo.setHours(0, 0, 0, 0);

		const meals = await Meal.find({
			user: req.user._id,
			date: { $gte: weekAgo, $lte: today }
		}).sort({ date: -1 });

		res.json(meals);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get meals in date range
router.get("/", protect, async (req, res) => {
	try {
		const { from, to } = req.query;
		const query = { user: req.user._id };
		if (from || to) {
			query.date = {};
			if (from) query.date.$gte = new Date(from);
			if (to) query.date.$lte = new Date(to);
		}
		const meals = await Meal.find(query).sort({ date: 1 });
		res.json(meals);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Update a meal
router.put("/:id", protect, async (req, res) => {
	try {
		const meal = await Meal.findOne({ _id: req.params.id, user: req.user._id });
		if (!meal) return res.status(404).json({ message: "Meal not found" });

		const { name, calories, protein, carbs, fats, date } = req.body;
		if (name !== undefined) meal.name = name;
		if (calories !== undefined) meal.calories = calories;
		if (protein !== undefined) meal.protein = protein;
		if (carbs !== undefined) meal.carbs = carbs;
		if (fats !== undefined) meal.fats = fats;
		if (date !== undefined) meal.date = date;

		await meal.save();
		res.json(meal);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Delete a meal
router.delete("/:id", protect, async (req, res) => {
	try {
		const meal = await Meal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
		if (!meal) return res.status(404).json({ message: "Meal not found" });
		res.json({ message: "Meal deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
