const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Workout = require("../models/Workout");
const router = express.Router();

// helper to estimate workout calories if not provided
const estimateCalories = (type, durationMin) => {
	const base = {
		running: 10,
		walking: 4,
		cycling: 8,
		yoga: 3,
		other: 5,
	};
	const key = type?.toLowerCase();
	const factor = base[key] || base.other;
	return factor * (durationMin || 0);
};

router.post("/", protect, async (req, res) => {
	try {
		let { type, durationMin, caloriesBurned, date } = req.body;
		if (!caloriesBurned) {
			caloriesBurned = estimateCalories(type, durationMin);
		}
		const workout = await Workout.create({
			user: req.user._id,
			type,
			durationMin,
			caloriesBurned,
			date: date || new Date(),
		});
		res.json(workout);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// today's workouts (MUST be before GET /)
router.get("/today", protect, async (req, res) => {
	try {
		const start = new Date();
		start.setHours(0, 0, 0, 0);
		const end = new Date();
		end.setHours(23, 59, 59, 999);

		const workouts = await Workout.find({
			user: req.user._id,
			date: { $gte: start, $lte: end },
		});

		const total = workouts.reduce(
			(sum, w) => sum + (w.caloriesBurned || 0),
			0
		);
		res.json({ workouts, totalCaloriesBurned: total });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get all workout history (MUST be before GET /)
router.get("/history/all", protect, async (req, res) => {
	try {
		const workouts = await Workout.find({
			user: req.user._id
		}).sort({ date: -1 });

		// Format for export
		const formatted = workouts.map(w => ({
			date: w.date,
			type: w.type,
			duration: w.durationMin || w.duration || 0,
			caloriesBurned: w.caloriesBurned || 0
		}));

		res.json(formatted);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// get workouts range
router.get("/", protect, async (req, res) => {
	try {
		const { from, to } = req.query;
		const query = { user: req.user._id };
		if (from || to) {
			query.date = {};
			if (from) query.date.$gte = new Date(from);
			if (to) query.date.$lte = new Date(to);
		}
		const workouts = await Workout.find(query).sort({ date: 1 });
		res.json(workouts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Update a workout
router.put("/:id", protect, async (req, res) => {
	try {
		const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });
		if (!workout) return res.status(404).json({ message: "Workout not found" });

		const { type, durationMin, caloriesBurned, date } = req.body;
		if (type !== undefined) workout.type = type;
		if (durationMin !== undefined) workout.durationMin = durationMin;
		if (caloriesBurned !== undefined) workout.caloriesBurned = caloriesBurned;
		if (date !== undefined) workout.date = date;

		await workout.save();
		res.json(workout);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Delete a workout
router.delete("/:id", protect, async (req, res) => {
	try {
		const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user._id });
		if (!workout) return res.status(404).json({ message: "Workout not found" });
		res.json({ message: "Workout deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
