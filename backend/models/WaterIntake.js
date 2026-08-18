const mongoose = require("mongoose");

const waterIntakeSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		amount: { type: Number, required: true }, // in ml
		date: { type: Date, default: Date.now }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("WaterIntake", waterIntakeSchema);
