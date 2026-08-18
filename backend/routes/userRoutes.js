const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// Get logged-in user
router.get("/me", protect, async (req, res) => {
	res.json(req.user);
});

// Update profile
router.put("/me", protect, async (req, res) => {
	try {
		const allowedFields = ["name", "age", "gender", "heightCm", "weightKg", "goal", "dietaryPrefs", "dailyCalorieTarget"];
		const updates = {};
		for (const key of allowedFields) {
			if (req.body[key] !== undefined) updates[key] = req.body[key];
		}
		const user = await User.findByIdAndUpdate(req.user._id, updates, {
			new: true,
		}).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
