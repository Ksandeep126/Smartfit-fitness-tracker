const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },

		age: Number,
		gender: { type: String, enum: ["male", "female", "other"], default: "other" },
		heightCm: Number,
		weightKg: Number,
		goal: {
			type: String,
			enum: ["weight_loss", "muscle_gain", "maintenance"],
			default: "maintenance",
		},
		dietaryPrefs: String,
		dailyCalorieTarget: Number
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.matchPassword = function (plain) {
	return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", userSchema);
