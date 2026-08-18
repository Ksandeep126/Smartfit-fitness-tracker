const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Habit = require("../models/Habit");
const router = express.Router();

// add/update habit for a date
router.post("/", protect, async (req, res) => {
	try {
		const { date, sleepHours, waterLiters, steps } = req.body;
		const d = date ? new Date(date) : new Date();
		d.setHours(0, 0, 0, 0);

		let habit = await Habit.findOne({ user: req.user._id, date: d });
		if (!habit) {
			habit = await Habit.create({
				user: req.user._id,
				date: d,
				sleepHours,
				waterLiters,
				steps,
			});
		} else {
			habit.sleepHours = sleepHours ?? habit.sleepHours;
			habit.waterLiters = waterLiters ?? habit.waterLiters;
			habit.steps = steps ?? habit.steps;
			await habit.save();
		}
		res.json(habit);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// list habits range
router.get("/", protect, async (req, res) => {
	try {
		const { from, to } = req.query;
		const query = { user: req.user._id };
		if (from || to) {
			query.date = {};
			if (from) query.date.$gte = new Date(from);
			if (to) query.date.$lte = new Date(to);
		}
		const habits = await Habit.find(query).sort({ date: 1 });
		res.json(habits);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
