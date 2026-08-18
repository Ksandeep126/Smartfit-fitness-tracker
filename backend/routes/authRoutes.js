const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const existing = await User.findOne({ email });
		if (existing) return res.status(400).json({ message: "User already exists" });

		const user = await User.create({ name, email, password });
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Reset Password (requires current password for verification)
router.post("/reset-password", async (req, res) => {
	try {
		const { email, currentPassword, newPassword } = req.body;

		if (!email || !currentPassword || !newPassword) {
			return res.status(400).json({ message: "Email, current password, and new password are required" });
		}

		if (newPassword.length < 6) {
			return res.status(400).json({ message: "New password must be at least 6 characters" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Verify current password
		const isMatch = await user.matchPassword(currentPassword);
		if (!isMatch) {
			return res.status(401).json({ message: "Current password is incorrect" });
		}

		user.password = newPassword;
		await user.save();

		res.json({ message: "Password reset successfully! Redirecting to login..." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
