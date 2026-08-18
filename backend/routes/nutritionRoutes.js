const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Food nutrition database (common foods with nutritional info per 100g)
const foodDatabase = {
	// Proteins
	"chicken breast": { calories: 165, protein: 31, carbs: 0, fats: 3.6 },
	"chicken": { calories: 165, protein: 31, carbs: 0, fats: 3.6 },
	"egg": { calories: 155, protein: 13, carbs: 1.1, fats: 11 },
	"eggs": { calories: 155, protein: 13, carbs: 1.1, fats: 11 },
	"salmon": { calories: 208, protein: 20, carbs: 0, fats: 13 },
	"tuna": { calories: 132, protein: 28, carbs: 0, fats: 1 },
	"beef": { calories: 250, protein: 26, carbs: 0, fats: 15 },
	"pork": { calories: 242, protein: 27, carbs: 0, fats: 14 },
	"tofu": { calories: 76, protein: 8, carbs: 1.9, fats: 4.8 },
	"paneer": { calories: 265, protein: 18, carbs: 1.2, fats: 21 },
	"fish": { calories: 136, protein: 20, carbs: 0, fats: 5 },
	"shrimp": { calories: 99, protein: 24, carbs: 0.2, fats: 0.3 },
	"turkey": { calories: 135, protein: 30, carbs: 0, fats: 1 },

	// Dairy
	"milk": { calories: 42, protein: 3.4, carbs: 5, fats: 1 },
	"yogurt": { calories: 59, protein: 10, carbs: 3.6, fats: 0.4 },
	"cheese": { calories: 402, protein: 25, carbs: 1.3, fats: 33 },
	"cottage cheese": { calories: 98, protein: 11, carbs: 3.4, fats: 4.3 },
	"butter": { calories: 717, protein: 0.9, carbs: 0.1, fats: 81 },

	// Grains & Carbs
	"rice": { calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
	"brown rice": { calories: 111, protein: 2.6, carbs: 23, fats: 0.9 },
	"bread": { calories: 265, protein: 9, carbs: 49, fats: 3.2 },
	"pasta": { calories: 131, protein: 5, carbs: 25, fats: 1.1 },
	"oatmeal": { calories: 68, protein: 2.4, carbs: 12, fats: 1.4 },
	"oats": { calories: 389, protein: 17, carbs: 66, fats: 7 },
	"quinoa": { calories: 120, protein: 4.4, carbs: 21, fats: 1.9 },
	"roti": { calories: 297, protein: 9.8, carbs: 50, fats: 7.5 },
	"chapati": { calories: 297, protein: 9.8, carbs: 50, fats: 7.5 },
	"naan": { calories: 262, protein: 9, carbs: 45, fats: 5 },
	"paratha": { calories: 326, protein: 8, carbs: 45, fats: 13 },
	"dosa": { calories: 168, protein: 4, carbs: 28, fats: 4 },
	"idli": { calories: 58, protein: 2, carbs: 12, fats: 0.2 },

	// Vegetables
	"broccoli": { calories: 34, protein: 2.8, carbs: 7, fats: 0.4 },
	"spinach": { calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4 },
	"carrot": { calories: 41, protein: 0.9, carbs: 10, fats: 0.2 },
	"potato": { calories: 77, protein: 2, carbs: 17, fats: 0.1 },
	"sweet potato": { calories: 86, protein: 1.6, carbs: 20, fats: 0.1 },
	"tomato": { calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2 },
	"onion": { calories: 40, protein: 1.1, carbs: 9, fats: 0.1 },
	"cucumber": { calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1 },
	"cabbage": { calories: 25, protein: 1.3, carbs: 6, fats: 0.1 },
	"cauliflower": { calories: 25, protein: 1.9, carbs: 5, fats: 0.3 },
	"beans": { calories: 31, protein: 1.8, carbs: 7, fats: 0.1 },
	"peas": { calories: 81, protein: 5, carbs: 14, fats: 0.4 },
	"corn": { calories: 86, protein: 3.2, carbs: 19, fats: 1.2 },
	"mushroom": { calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3 },

	// Fruits
	"apple": { calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
	"banana": { calories: 89, protein: 1.1, carbs: 23, fats: 0.3 },
	"orange": { calories: 47, protein: 0.9, carbs: 12, fats: 0.1 },
	"mango": { calories: 60, protein: 0.8, carbs: 15, fats: 0.4 },
	"grapes": { calories: 69, protein: 0.7, carbs: 18, fats: 0.2 },
	"watermelon": { calories: 30, protein: 0.6, carbs: 8, fats: 0.2 },
	"papaya": { calories: 43, protein: 0.5, carbs: 11, fats: 0.3 },
	"pineapple": { calories: 50, protein: 0.5, carbs: 13, fats: 0.1 },
	"strawberry": { calories: 32, protein: 0.7, carbs: 8, fats: 0.3 },
	"blueberry": { calories: 57, protein: 0.7, carbs: 14, fats: 0.3 },

	// Legumes & Pulses
	"dal": { calories: 116, protein: 9, carbs: 20, fats: 0.4 },
	"lentils": { calories: 116, protein: 9, carbs: 20, fats: 0.4 },
	"chickpeas": { calories: 164, protein: 9, carbs: 27, fats: 2.6 },
	"kidney beans": { calories: 127, protein: 9, carbs: 23, fats: 0.5 },
	"black beans": { calories: 132, protein: 9, carbs: 24, fats: 0.5 },
	"soybean": { calories: 173, protein: 17, carbs: 10, fats: 9 },

	// Nuts & Seeds
	"almonds": { calories: 579, protein: 21, carbs: 22, fats: 50 },
	"peanuts": { calories: 567, protein: 26, carbs: 16, fats: 49 },
	"walnuts": { calories: 654, protein: 15, carbs: 14, fats: 65 },
	"cashews": { calories: 553, protein: 18, carbs: 30, fats: 44 },
	"chia seeds": { calories: 486, protein: 17, carbs: 42, fats: 31 },
	"flax seeds": { calories: 534, protein: 18, carbs: 29, fats: 42 },

	// Common meals
	"biryani": { calories: 200, protein: 7, carbs: 25, fats: 8 },
	"pizza": { calories: 266, protein: 11, carbs: 33, fats: 10 },
	"burger": { calories: 295, protein: 17, carbs: 24, fats: 14 },
	"sandwich": { calories: 252, protein: 10, carbs: 29, fats: 11 },
	"salad": { calories: 20, protein: 1.5, carbs: 3.5, fats: 0.2 },
	"soup": { calories: 30, protein: 1.5, carbs: 5, fats: 0.5 },
	"fried rice": { calories: 163, protein: 4, carbs: 24, fats: 6 },
	"noodles": { calories: 138, protein: 5, carbs: 25, fats: 2 },
	"samosa": { calories: 262, protein: 4, carbs: 25, fats: 17 },
	"pav bhaji": { calories: 290, protein: 6, carbs: 38, fats: 13 },
	"chole bhature": { calories: 450, protein: 12, carbs: 55, fats: 20 },
	"poha": { calories: 180, protein: 4, carbs: 32, fats: 5 },
	"upma": { calories: 165, protein: 4, carbs: 28, fats: 5 },

	// Beverages
	"coffee": { calories: 2, protein: 0.3, carbs: 0, fats: 0 },
	"tea": { calories: 1, protein: 0, carbs: 0.3, fats: 0 },
	"orange juice": { calories: 45, protein: 0.7, carbs: 10, fats: 0.2 },
	"coconut water": { calories: 19, protein: 0.7, carbs: 4, fats: 0.2 },
	"lassi": { calories: 72, protein: 3.5, carbs: 9, fats: 2.5 },
	"smoothie": { calories: 90, protein: 2, carbs: 18, fats: 1 },
};

// Search food nutrition
router.get("/search", protect, (req, res) => {
	const { query } = req.query;
	
	if (!query) {
		return res.status(400).json({ message: "Search query is required" });
	}

	const searchTerm = query.toLowerCase().trim();
	const results = [];

	for (const [food, nutrition] of Object.entries(foodDatabase)) {
		if (food.includes(searchTerm) || searchTerm.includes(food)) {
			results.push({
				name: food.charAt(0).toUpperCase() + food.slice(1),
				...nutrition,
				per: "100g"
			});
		}
	}

	// If no exact match, do fuzzy search
	if (results.length === 0) {
		for (const [food, nutrition] of Object.entries(foodDatabase)) {
			const words = searchTerm.split(" ");
			for (const word of words) {
				if (food.includes(word) && word.length > 2) {
					results.push({
						name: food.charAt(0).toUpperCase() + food.slice(1),
						...nutrition,
						per: "100g"
					});
					break;
				}
			}
		}
	}

	res.json(results);
});

// Get food suggestions based on user's goal
router.get("/suggestions", protect, async (req, res) => {
	const user = req.user;
	const goal = user.goal || "maintenance";

	let suggestions = [];

	if (goal === "muscle_gain" || goal === "weight_gain") {
		// High protein foods
		suggestions = [
			{ name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, reason: "High protein for muscle building" },
			{ name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fats: 11, reason: "Complete protein source" },
			{ name: "Salmon", calories: 208, protein: 20, carbs: 0, fats: 13, reason: "Omega-3 & protein rich" },
			{ name: "Oats", calories: 389, protein: 17, carbs: 66, fats: 7, reason: "Complex carbs for energy" },
			{ name: "Almonds", calories: 579, protein: 21, carbs: 22, fats: 50, reason: "Healthy fats & protein" },
			{ name: "Paneer", calories: 265, protein: 18, carbs: 1.2, fats: 21, reason: "Vegetarian protein source" },
			{ name: "Chickpeas", calories: 164, protein: 9, carbs: 27, fats: 2.6, reason: "Plant protein & fiber" },
			{ name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23, fats: 0.9, reason: "Clean carbs for bulking" },
		];
	} else if (goal === "weight_loss") {
		// Low calorie, high protein foods
		suggestions = [
			{ name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, reason: "Lean protein, low fat" },
			{ name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fats: 0.4, reason: "Low calorie, high fiber" },
			{ name: "Egg Whites", calories: 52, protein: 11, carbs: 0.7, fats: 0.2, reason: "Pure protein, minimal fat" },
			{ name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, reason: "Nutrient dense, low cal" },
			{ name: "Tuna", calories: 132, protein: 28, carbs: 0, fats: 1, reason: "Very lean protein" },
			{ name: "Cucumber", calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1, reason: "Hydrating, very low cal" },
			{ name: "Yogurt", calories: 59, protein: 10, carbs: 3.6, fats: 0.4, reason: "Protein with probiotics" },
			{ name: "Watermelon", calories: 30, protein: 0.6, carbs: 8, fats: 0.2, reason: "Sweet but low calorie" },
		];
	} else {
		// Balanced foods for maintenance
		suggestions = [
			{ name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, reason: "Balanced protein source" },
			{ name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23, fats: 0.9, reason: "Healthy complex carbs" },
			{ name: "Salmon", calories: 208, protein: 20, carbs: 0, fats: 13, reason: "Good fats & protein" },
			{ name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, reason: "Clean energy source" },
			{ name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fats: 11, reason: "Complete nutrition" },
			{ name: "Lentils", calories: 116, protein: 9, carbs: 20, fats: 0.4, reason: "Fiber & plant protein" },
			{ name: "Banana", calories: 89, protein: 1.1, carbs: 23, fats: 0.3, reason: "Quick energy, potassium" },
			{ name: "Almonds", calories: 579, protein: 21, carbs: 22, fats: 50, reason: "Healthy snacking option" },
		];
	}

	res.json({
		goal: goal,
		dailyTarget: user.dailyCalorieTarget || 2000,
		suggestions: suggestions
	});
});

module.exports = router;
