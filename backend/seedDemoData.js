const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Meal = require("./models/Meal");
const Workout = require("./models/Workout");
const Habit = require("./models/Habit");
const WaterIntake = require("./models/WaterIntake");
const WeightLog = require("./models/WeightLog");

mongoose.connect(process.env.MONGO_URI);

const getRandom = (min, max) => Math.random() * (max - min) + min;

const seedData = async () => {
	try {
		console.log("Seeding started...");

		// ⚠️ Clear old data
		await Meal.deleteMany();
		await Workout.deleteMany();
		await Habit.deleteMany();
		await WaterIntake.deleteMany();
		await WeightLog.deleteMany();

		const users = await User.find();

		if (!users.length) {
			console.log("No users found. Create a user first.");
			process.exit();
		}

		const today = new Date();

		for (const user of users) {
			let baseWeight = 70 + Math.random() * 10; // starting weight

			for (let i = 0; i < 60; i++) {
				const date = new Date();
				date.setDate(today.getDate() - i);
				date.setHours(10);

				// -------------------------
				// 🍽️ MEALS (3 per day)
				// -------------------------
				const meals = [
					{ name: "Breakfast", calories: getRandom(300, 500) },
					{ name: "Lunch", calories: getRandom(500, 800) },
					{ name: "Dinner", calories: getRandom(400, 700) },
				];

				for (const m of meals) {
					await Meal.create({
						user: user._id,
						name: m.name,
						calories: Math.round(m.calories),
						protein: Math.round(getRandom(10, 40)),
						carbs: Math.round(getRandom(30, 100)),
						fats: Math.round(getRandom(5, 30)),
						date,
					});
				}

				// -------------------------
				// 🏋️ WORKOUT (not daily)
				// -------------------------
				if (Math.random() > 0.3) {
					await Workout.create({
						user: user._id,
						type: ["Cardio", "Strength", "HIIT"][Math.floor(Math.random() * 3)],
						durationMin: Math.round(getRandom(30, 90)),
						caloriesBurned: Math.round(getRandom(200, 600)),
						date,
					});
				}

				// -------------------------
				// 😴 HABITS
				// -------------------------
				const sleepHours = getRandom(5.5, 8.5);
				const waterLiters = getRandom(1.5, 3.5);
				const steps = Math.round(getRandom(3000, 12000));

				await Habit.create({
					user: user._id,
					date,
					sleepHours: Number(sleepHours.toFixed(1)),
					waterLiters: Number(waterLiters.toFixed(1)),
					steps,
				});

				// -------------------------
				// 💧 WATER INTAKE (multiple entries)
				// -------------------------
				const entries = Math.floor(getRandom(3, 6));
				for (let j = 0; j < entries; j++) {
					await WaterIntake.create({
						user: user._id,
						amount: Math.round(getRandom(200, 500)), // ml
						date,
					});
				}

				// -------------------------
				// ⚖️ WEIGHT TREND (realistic)
				// -------------------------
				baseWeight += getRandom(-0.05, 0.05); // slow fluctuation

				await WeightLog.create({
					user: user._id,
					weight: Number(baseWeight.toFixed(1)),
					date,
				});
			}
		}

		console.log("✅ Seeding completed successfully!");
		process.exit();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

seedData();