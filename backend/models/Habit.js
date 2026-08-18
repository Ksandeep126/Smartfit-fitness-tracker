const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		date: { type: Date, default: Date.now },
		sleepHours: Number,
		waterLiters: Number,
		steps: Number
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
