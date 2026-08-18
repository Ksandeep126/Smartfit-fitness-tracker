// import React, { useState } from "react";

// const BMICalculator = () => {
// 	const [age, setAge] = useState(22);
// 	const [gender, setGender] = useState("male");
// 	const [weight, setWeight] = useState(59);
// 	const [height, setHeight] = useState(170);
// 	const [activityLevel, setActivityLevel] = useState("sedentary");
// 	const [goal, setGoal] = useState("maintain");
// 	const [results, setResults] = useState(null);

// 	const activityMultipliers = {
// 		sedentary: { label: "Sedentary (little or no exercise)", value: 1.2 },
// 		light: { label: "Lightly active (1-3 days/week)", value: 1.375 },
// 		moderate: { label: "Moderately active (3-5 days/week)", value: 1.55 },
// 		active: { label: "Very active (6-7 days/week)", value: 1.725 },
// 		extra: { label: "Extra active (very hard exercise)", value: 1.9 },
// 	};

// 	const goalAdjustments = {
// 		lose: { label: "Lose weight", calories: -500 },
// 		maintain: { label: "Maintain weight", calories: 0 },
// 		gain: { label: "Gain weight", calories: 500 },
// 	};

// 	const getBMICategory = (bmi) => {
// 		if (bmi < 18.5) return { category: "Underweight", color: "#3498db" };
// 		if (bmi < 25) return { category: "Normal Weight", color: "#27ae60" };
// 		if (bmi < 30) return { category: "Overweight", color: "#f39c12" };
// 		return { category: "Obese", color: "#e74c3c" };
// 	};

// 	const calculateBMR = () => {
// 		// Mifflin-St Jeor Equation
// 		if (gender === "male") {
// 			return 10 * weight + 6.25 * height - 5 * age + 5;
// 		} else {
// 			return 10 * weight + 6.25 * height - 5 * age - 161;
// 		}
// 	};

// 	const generateMealPlan = (targetCalories) => {
// 		const protein = Math.round((targetCalories * 0.3) / 4); // 30% protein, 4 cal/g
// 		const carbs = Math.round((targetCalories * 0.45) / 4); // 45% carbs, 4 cal/g
// 		const fats = Math.round((targetCalories * 0.25) / 9); // 25% fats, 9 cal/g

// 		const breakfastCal = Math.round(targetCalories * 0.25);
// 		const lunchCal = Math.round(targetCalories * 0.35);
// 		const dinnerCal = Math.round(targetCalories * 0.3);
// 		const snackCal = Math.round(targetCalories * 0.1);

// 		return {
// 			macros: { protein, carbs, fats },
// 			meals: [
// 				{
// 					name: "Breakfast",
// 					calories: breakfastCal,
// 					suggestions: [
// 						"Oatmeal with fruits and nuts",
// 						"Greek yogurt parfait",
// 						"Whole grain toast with eggs",
// 						"Smoothie bowl with protein",
// 					],
// 				},
// 				{
// 					name: "Lunch",
// 					calories: lunchCal,
// 					suggestions: [
// 						"Grilled chicken salad",
// 						"Quinoa bowl with vegetables",
// 						"Turkey wrap with whole wheat",
// 						"Salmon with brown rice",
// 					],
// 				},
// 				{
// 					name: "Dinner",
// 					calories: dinnerCal,
// 					suggestions: [
// 						"Lean beef stir-fry",
// 						"Baked fish with sweet potato",
// 						"Chicken breast with vegetables",
// 						"Tofu curry with rice",
// 					],
// 				},
// 				{
// 					name: "Snacks",
// 					calories: snackCal,
// 					suggestions: [
// 						"Mixed nuts (handful)",
// 						"Apple with almond butter",
// 						"Protein bar",
// 						"Cottage cheese with berries",
// 					],
// 				},
// 			],
// 		};
// 	};

// 	const handleCalculate = () => {
// 		const bmi = weight / Math.pow(height / 100, 2);
// 		const bmr = calculateBMR();
// 		const tdee = bmr * activityMultipliers[activityLevel].value;
// 		const targetCalories = Math.round(tdee + goalAdjustments[goal].calories);
// 		const mealPlan = generateMealPlan(targetCalories);
// 		const bmiInfo = getBMICategory(bmi);

// 		setResults({
// 			bmi: bmi.toFixed(2),
// 			bmiCategory: bmiInfo.category,
// 			bmiColor: bmiInfo.color,
// 			bmr: Math.round(bmr),
// 			tdee: Math.round(tdee),
// 			targetCalories,
// 			mealPlan,
// 		});
// 	};

// 	const exportAsTxt = () => {
// 		if (!results) return;
// 		const content = `
// SmartFit - BMI Calculator & Diet Planner Results
// ================================================
// Date: ${new Date().toLocaleDateString()}

// Personal Information:
// - Age: ${age} years
// - Gender: ${gender}
// - Weight: ${weight} kg
// - Height: ${height} cm
// - Activity Level: ${activityMultipliers[activityLevel].label}
// - Goal: ${goalAdjustments[goal].label}

// Health Metrics:
// - BMI: ${results.bmi} (${results.bmiCategory})
// - BMR: ${results.bmr} kcal/day
// - TDEE: ${results.tdee} kcal/day
// - Daily Calorie Target: ${results.targetCalories} kcal/day

// Daily Macros:
// - Protein: ${results.mealPlan.macros.protein}g
// - Carbohydrates: ${results.mealPlan.macros.carbs}g
// - Fats: ${results.mealPlan.macros.fats}g

// Sample Meal Plan:
// ${results.mealPlan.meals
// 	.map(
// 		(meal) => `
// ${meal.name} (~${meal.calories} kcal):
// ${meal.suggestions.map((s) => `  - ${s}`).join("\n")}`
// 	)
// 	.join("\n")}
// 		`.trim();

// 		const blob = new Blob([content], { type: "text/plain" });
// 		const url = URL.createObjectURL(blob);
// 		const a = document.createElement("a");
// 		a.href = url;
// 		a.download = "smartfit-diet-plan.txt";
// 		a.click();
// 		URL.revokeObjectURL(url);
// 	};

// 	const exportAsCsv = () => {
// 		if (!results) return;
// 		const rows = [
// 			["Metric", "Value"],
// 			["Age", age],
// 			["Gender", gender],
// 			["Weight (kg)", weight],
// 			["Height (cm)", height],
// 			["Activity Level", activityMultipliers[activityLevel].label],
// 			["Goal", goalAdjustments[goal].label],
// 			["BMI", results.bmi],
// 			["BMI Category", results.bmiCategory],
// 			["BMR (kcal/day)", results.bmr],
// 			["TDEE (kcal/day)", results.tdee],
// 			["Target Calories", results.targetCalories],
// 			["Protein (g)", results.mealPlan.macros.protein],
// 			["Carbohydrates (g)", results.mealPlan.macros.carbs],
// 			["Fats (g)", results.mealPlan.macros.fats],
// 		];

// 		const csvContent = rows.map((row) => row.join(",")).join("\n");
// 		const blob = new Blob([csvContent], { type: "text/csv" });
// 		const url = URL.createObjectURL(blob);
// 		const a = document.createElement("a");
// 		a.href = url;
// 		a.download = "smartfit-diet-plan.csv";
// 		a.click();
// 		URL.revokeObjectURL(url);
// 	};

// 	const styles = {
// 		container: {
// 			maxWidth: 900,
// 			margin: "40px auto",
// 			padding: "0 20px",
// 			fontFamily: "system-ui, -apple-system, sans-serif",
// 		},
// 		header: {
// 			textAlign: "center",
// 			marginBottom: 30,
// 		},
// 		title: {
// 			fontSize: 28,
// 			color: "#fff",
// 			display: "flex",
// 			alignItems: "center",
// 			justifyContent: "center",
// 			gap: 10,
// 		},
// 		subtitle: {
// 			color: "#b0c4de",
// 			marginTop: 8,
// 		},
// 		card: {
// 			background: "#fff",
// 			borderRadius: 12,
// 			padding: 24,
// 			boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
// 			marginBottom: 24,
// 		},
// 		grid: {
// 			display: "grid",
// 			gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
// 			gap: 20,
// 		},
// 		inputGroup: {
// 			marginBottom: 16,
// 		},
// 		label: {
// 			display: "block",
// 			marginBottom: 6,
// 			fontWeight: 500,
// 			color: "#34495e",
// 		},
// 		input: {
// 			width: "100%",
// 			padding: "10px 12px",
// 			border: "1px solid #ddd",
// 			borderRadius: 8,
// 			fontSize: 16,
// 			boxSizing: "border-box",
// 		},
// 		select: {
// 			width: "100%",
// 			padding: "10px 12px",
// 			border: "1px solid #ddd",
// 			borderRadius: 8,
// 			fontSize: 16,
// 			background: "#fff",
// 			cursor: "pointer",
// 		},
// 		slider: {
// 			width: "100%",
// 			marginTop: 8,
// 		},
// 		sliderValue: {
// 			textAlign: "center",
// 			color: "#e74c3c",
// 			fontWeight: 600,
// 			fontSize: 18,
// 		},
// 		button: {
// 			background: "#3498db",
// 			color: "#fff",
// 			border: "none",
// 			padding: "12px 24px",
// 			borderRadius: 8,
// 			fontSize: 16,
// 			cursor: "pointer",
// 			fontWeight: 500,
// 			transition: "background 0.2s",
// 		},
// 		buttonSecondary: {
// 			background: "#95a5a6",
// 			color: "#fff",
// 			border: "none",
// 			padding: "10px 20px",
// 			borderRadius: 6,
// 			fontSize: 14,
// 			cursor: "pointer",
// 			marginRight: 10,
// 		},
// 		resultsGrid: {
// 			display: "grid",
// 			gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// 			gap: 16,
// 			marginBottom: 24,
// 		},
// 		metricCard: {
// 			background: "#f8f9fa",
// 			borderRadius: 10,
// 			padding: 16,
// 			textAlign: "center",
// 		},
// 		metricValue: {
// 			fontSize: 28,
// 			fontWeight: 700,
// 			color: "#2c3e50",
// 		},
// 		metricLabel: {
// 			fontSize: 14,
// 			color: "#7f8c8d",
// 			marginTop: 4,
// 		},
// 		mealCard: {
// 			background: "#f8f9fa",
// 			borderRadius: 10,
// 			padding: 16,
// 			marginBottom: 12,
// 		},
// 		mealHeader: {
// 			display: "flex",
// 			justifyContent: "space-between",
// 			alignItems: "center",
// 			marginBottom: 10,
// 		},
// 		mealName: {
// 			fontWeight: 600,
// 			fontSize: 16,
// 			color: "#2c3e50",
// 		},
// 		mealCalories: {
// 			color: "#e74c3c",
// 			fontWeight: 500,
// 		},
// 		suggestionList: {
// 			listStyle: "none",
// 			padding: 0,
// 			margin: 0,
// 		},
// 		suggestionItem: {
// 			padding: "4px 0",
// 			color: "#555",
// 			fontSize: 14,
// 		},
// 		macroBar: {
// 			display: "flex",
// 			gap: 16,
// 			justifyContent: "center",
// 			marginBottom: 20,
// 		},
// 		macroPill: {
// 			padding: "8px 16px",
// 			borderRadius: 20,
// 			fontSize: 14,
// 			fontWeight: 500,
// 		},
// 		numberInput: {
// 			display: "flex",
// 			alignItems: "center",
// 			gap: 10,
// 		},
// 		numberBtn: {
// 			width: 36,
// 			height: 36,
// 			border: "1px solid #ddd",
// 			borderRadius: 6,
// 			background: "#fff",
// 			fontSize: 18,
// 			cursor: "pointer",
// 		},
// 	};

// 	return (
// 		<div style={styles.container}>
// 			<div style={styles.header}>
// 				<h1 style={styles.title}>
// 					<span style={{ fontSize: 32 }}>🩺</span> BMI Calculator + Diet Planner
// 				</h1>
// 				<p style={styles.subtitle}>
// 					Calculate your BMI, see your category, get a daily calorie target and
// 					a simple sample diet plan.
// 				</p>
// 			</div>

// 			<div style={styles.card}>
// 				<div style={styles.grid}>
// 					<div style={styles.inputGroup}>
// 						<label style={styles.label}>Age (years)</label>
// 						<div style={styles.numberInput}>
// 							<input
// 								type="number"
// 								value={age}
// 								onChange={(e) => setAge(Number(e.target.value))}
// 								style={{ ...styles.input, flex: 1 }}
// 								min="1"
// 								max="120"
// 							/>
// 							<button
// 								style={styles.numberBtn}
// 								onClick={() => setAge(Math.max(1, age - 1))}
// 							>
// 								−
// 							</button>
// 							<button
// 								style={styles.numberBtn}
// 								onClick={() => setAge(Math.min(120, age + 1))}
// 							>
// 								+
// 							</button>
// 						</div>
// 					</div>

// 					<div style={styles.inputGroup}>
// 						<label style={styles.label}>Weight (kg)</label>
// 						<div style={styles.sliderValue}>{weight}</div>
// 						<input
// 							type="range"
// 							min="30"
// 							max="200"
// 							value={weight}
// 							onChange={(e) => setWeight(Number(e.target.value))}
// 							style={styles.slider}
// 						/>
// 						<div
// 							style={{
// 								display: "flex",
// 								justifyContent: "space-between",
// 								fontSize: 12,
// 								color: "#999",
// 							}}
// 						>
// 							<span>30</span>
// 							<span>200</span>
// 						</div>
// 					</div>

// 					<div style={styles.inputGroup}>
// 						<label style={styles.label}>Gender</label>
// 						<select
// 							value={gender}
// 							onChange={(e) => setGender(e.target.value)}
// 							style={styles.select}
// 						>
// 							<option value="male">Male</option>
// 							<option value="female">Female</option>
// 						</select>
// 					</div>

// 					<div style={styles.inputGroup}>
// 						<label style={styles.label}>Activity Level</label>
// 						<select
// 							value={activityLevel}
// 							onChange={(e) => setActivityLevel(e.target.value)}
// 							style={styles.select}
// 						>
// 							{Object.entries(activityMultipliers).map(([key, val]) => (
// 								<option key={key} value={key}>
// 									{val.label}
// 								</option>
// 							))}
// 						</select>
// 					</div>

// 					<div style={styles.inputGroup}>
// 						<label style={styles.label}>Height (cm)</label>
// 						<div style={styles.sliderValue}>{height}</div>
// 						<input
// 							type="range"
// 							min="100"
// 							max="220"
// 							value={height}
// 							onChange={(e) => setHeight(Number(e.target.value))}
// 							style={styles.slider}
// 						/>
// 						<div
// 							style={{
// 								display: "flex",
// 								justifyContent: "space-between",
// 								fontSize: 12,
// 								color: "#999",
// 							}}
// 						>
// 							<span>100</span>
// 							<span>220</span>
// 						</div>
// 					</div>

// 					<div style={styles.inputGroup}>
// 						<label style={styles.label}>Goal</label>
// 						<select
// 							value={goal}
// 							onChange={(e) => setGoal(e.target.value)}
// 							style={styles.select}
// 						>
// 							{Object.entries(goalAdjustments).map(([key, val]) => (
// 								<option key={key} value={key}>
// 									{val.label}
// 								</option>
// 							))}
// 						</select>
// 					</div>
// 				</div>

// 				<div style={{ textAlign: "center", marginTop: 20 }}>
// 					<button style={styles.button} onClick={handleCalculate}>
// 						Calculate BMI & Plan
// 					</button>
// 				</div>
// 			</div>

// 			{results && (
// 				<>
// 					<div style={styles.card}>
// 						<h2 style={{ marginTop: 0, color: "#2c3e50" }}>Your Results</h2>
// 						<div style={styles.resultsGrid}>
// 							<div style={styles.metricCard}>
// 								<div
// 									style={{ ...styles.metricValue, color: results.bmiColor }}
// 								>
// 									{results.bmi}
// 								</div>
// 								<div style={styles.metricLabel}>
// 									BMI - {results.bmiCategory}
// 								</div>
// 							</div>
// 							<div style={styles.metricCard}>
// 								<div style={styles.metricValue}>{results.bmr}</div>
// 								<div style={styles.metricLabel}>BMR (kcal/day)</div>
// 							</div>
// 							<div style={styles.metricCard}>
// 								<div style={styles.metricValue}>{results.tdee}</div>
// 								<div style={styles.metricLabel}>TDEE (kcal/day)</div>
// 							</div>
// 							<div style={styles.metricCard}>
// 								<div style={{ ...styles.metricValue, color: "#e74c3c" }}>
// 									{results.targetCalories}
// 								</div>
// 								<div style={styles.metricLabel}>Daily Calorie Target</div>
// 							</div>
// 						</div>

// 						<h3 style={{ color: "#2c3e50" }}>Daily Macros</h3>
// 						<div style={styles.macroBar}>
// 							<span
// 								style={{
// 									...styles.macroPill,
// 									background: "#e8f5e9",
// 									color: "#27ae60",
// 								}}
// 							>
// 								Protein: {results.mealPlan.macros.protein}g
// 							</span>
// 							<span
// 								style={{
// 									...styles.macroPill,
// 									background: "#fff3e0",
// 									color: "#f39c12",
// 								}}
// 							>
// 								Carbs: {results.mealPlan.macros.carbs}g
// 							</span>
// 							<span
// 								style={{
// 									...styles.macroPill,
// 									background: "#fce4ec",
// 									color: "#e74c3c",
// 								}}
// 							>
// 								Fats: {results.mealPlan.macros.fats}g
// 							</span>
// 						</div>
// 					</div>

// 					<div style={styles.card}>
// 						<h2 style={{ marginTop: 0, color: "#2c3e50" }}>
// 							Sample Daily Meal Plan
// 						</h2>
// 						{results.mealPlan.meals.map((meal, idx) => (
// 							<div key={idx} style={styles.mealCard}>
// 								<div style={styles.mealHeader}>
// 									<span style={styles.mealName}>{meal.name}</span>
// 									<span style={styles.mealCalories}>~{meal.calories} kcal</span>
// 								</div>
// 								<ul style={styles.suggestionList}>
// 									{meal.suggestions.map((suggestion, sIdx) => (
// 										<li key={sIdx} style={styles.suggestionItem}>
// 											• {suggestion}
// 										</li>
// 									))}
// 								</ul>
// 							</div>
// 						))}

// 						<div style={{ marginTop: 20 }}>
// 							<button style={styles.buttonSecondary} onClick={exportAsTxt}>
// 								📄 Export as TXT
// 							</button>
// 							<button style={styles.buttonSecondary} onClick={exportAsCsv}>
// 								📊 Export as CSV
// 							</button>
// 						</div>
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default BMICalculator;

// import React, { useState } from "react";

// const BMICalculator = () => {
// 	const [age, setAge] = useState(22);
// 	const [gender, setGender] = useState("male");
// 	const [weight, setWeight] = useState(59);
// 	const [height, setHeight] = useState(170);
// 	const [activityLevel, setActivityLevel] = useState("sedentary");
// 	const [goal, setGoal] = useState("maintain");
// 	const [results, setResults] = useState(null);

// 	const activityMultipliers = {
// 		sedentary: { label: "Sedentary (little or no exercise)", value: 1.2 },
// 		light: { label: "Lightly active (1-3 days/week)", value: 1.375 },
// 		moderate: { label: "Moderately active (3-5 days/week)", value: 1.55 },
// 		active: { label: "Very active (6-7 days/week)", value: 1.725 },
// 		extra: { label: "Extra active (very hard exercise)", value: 1.9 },
// 	};

// 	const goalAdjustments = {
// 		lose: { label: "Lose weight", calories: -500 },
// 		maintain: { label: "Maintain weight", calories: 0 },
// 		gain: { label: "Gain weight", calories: 500 },
// 	};

// 	const getBMICategory = (bmi) => {
// 		if (bmi < 18.5) return { category: "Underweight", color: "#3b82f6" };
// 		if (bmi < 25) return { category: "Normal", color: "#22c55e" };
// 		if (bmi < 30) return { category: "Overweight", color: "#f59e0b" };
// 		return { category: "Obese", color: "#ef4444" };
// 	};

// 	const calculateBMR = () => {
// 		return gender === "male"
// 			? 10 * weight + 6.25 * height - 5 * age + 5
// 			: 10 * weight + 6.25 * height - 5 * age - 161;
// 	};

// 	const generateMealPlan = (targetCalories) => {
// 		const protein = Math.round((targetCalories * 0.3) / 4);
// 		const carbs = Math.round((targetCalories * 0.45) / 4);
// 		const fats = Math.round((targetCalories * 0.25) / 9);

// 		return {
// 			macros: { protein, carbs, fats },
// 		};
// 	};

// 	const handleCalculate = () => {
// 		const bmi = weight / Math.pow(height / 100, 2);
// 		const bmr = calculateBMR();
// 		const tdee = bmr * activityMultipliers[activityLevel].value;
// 		const targetCalories = Math.round(tdee + goalAdjustments[goal].calories);
// 		const mealPlan = generateMealPlan(targetCalories);
// 		const bmiInfo = getBMICategory(bmi);

// 		setResults({
// 			bmi: bmi.toFixed(2),
// 			bmiCategory: bmiInfo.category,
// 			bmiColor: bmiInfo.color,
// 			bmr: Math.round(bmr),
// 			tdee: Math.round(tdee),
// 			targetCalories,
// 			mealPlan,
// 		});
// 	};

// 	const styles = {
// 		container: {
// 			maxWidth: 1000,
// 			margin: "40px auto",
// 			padding: 20,
// 			fontFamily: "system-ui",
// 		},
// 		card: {
// 			background: "#1f2937",
// 			padding: 25,
// 			borderRadius: 20,
// 			marginBottom: 25,
// 			boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
// 			color: "#fff",
// 		},
// 		title: {
// 			textAlign: "center",
// 			fontSize: 28,
// 			marginBottom: 20,
// 		},
// 		grid: {
// 			display: "grid",
// 			gridTemplateColumns: "repeat(2, 1fr)",
// 			columnGap: 35,
// 			rowGap: 20,
// 		},
// 		label: { marginBottom: 6, display: "block", fontSize: 14 },
// 		input: {
// 			width: "100%",
// 			padding: 10,
// 			borderRadius: 10,
// 			border: "1px solid #374151",
// 			background: "#111827",
// 			color: "#fff",
// 		},
// 		slider: { width: "100%" },
// 		button: {
// 			background: "#22c55e",
// 			border: "none",
// 			padding: "12px 25px",
// 			borderRadius: 12,
// 			color: "#fff",
// 			cursor: "pointer",
// 			fontWeight: 600,
// 		},
// 	};

// 	return (
// 		<div style={styles.container}>
// 			<div style={styles.card}>
// 				<h1 style={styles.title}>🩺 SmartFit BMI + Diet Planner</h1>

// 				<div style={styles.grid}>
// 					<div>
// 						<label style={styles.label}>Activity Level</label>
// 						<select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} style={styles.input}>
// 							{Object.entries(activityMultipliers).map(([key, val]) => (
// 								<option key={key} value={key}>{val.label}</option>
// 							))}
// 						</select>
// 					</div>

// 					<div>
// 						<label style={styles.label}>Goal</label>
// 						<select value={goal} onChange={(e) => setGoal(e.target.value)} style={styles.input}>
// 							{Object.entries(goalAdjustments).map(([key, val]) => (
// 								<option key={key} value={key}>{val.label}</option>
// 							))}
// 						</select>
// 					</div>

// 					<div>
// 						<label style={styles.label}>Age</label>
// 						<input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} style={styles.input} />
// 					</div>

// 					<div>
// 						<label style={styles.label}>Gender</label>
// 						<select value={gender} onChange={(e) => setGender(e.target.value)} style={styles.input}>
// 							<option value="male">Male</option>
// 							<option value="female">Female</option>
// 						</select>
// 					</div>

// 					<div>
// 						<label style={styles.label}>Weight (kg): {weight}</label>
// 						<input type="range" min="30" max="200" value={weight} onChange={(e) => setWeight(Number(e.target.value))} style={styles.slider} />
// 					</div>

// 					<div>
// 						<label style={styles.label}>Height (cm): {height}</label>
// 						<input type="range" min="100" max="220" value={height} onChange={(e) => setHeight(Number(e.target.value))} style={styles.slider} />
// 					</div>
// 				</div>

// 				<div style={{ textAlign: "center", marginTop: 20 }}>
// 					<button style={styles.button} onClick={handleCalculate}>
// 						Calculate
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default BMICalculator;

import React, { useState } from "react";

const BMICalculator = () => {
	const [age, setAge] = useState(22);
	const [gender, setGender] = useState("male");
	const [weight, setWeight] = useState(59);
	const [height, setHeight] = useState(170);
	const [activityLevel, setActivityLevel] = useState("sedentary");
	const [goal, setGoal] = useState("maintain");
	const [results, setResults] = useState(null);

	const activityMultipliers = {
		sedentary: { label: "Sedentary (little or no exercise)", value: 1.2 },
		light: { label: "Lightly active (1-3 days/week)", value: 1.375 },
		moderate: { label: "Moderately active (3-5 days/week)", value: 1.55 },
		active: { label: "Very active (6-7 days/week)", value: 1.725 },
		extra: { label: "Extra active (very hard exercise)", value: 1.9 },
	};

	const goalAdjustments = {
		lose: { label: "Lose weight", calories: -500 },
		maintain: { label: "Maintain weight", calories: 0 },
		gain: { label: "Gain weight", calories: 500 },
	};

	const getBMICategory = (bmi) => {
		if (bmi < 18.5) return { category: "Underweight", color: "#3b82f6" };
		if (bmi < 25) return { category: "Normal", color: "#22c55e" };
		if (bmi < 30) return { category: "Overweight", color: "#f59e0b" };
		return { category: "Obese", color: "#ef4444" };
	};

	const calculateBMR = () => {
		return gender === "male"
			? 10 * weight + 6.25 * height - 5 * age + 5
			: 10 * weight + 6.25 * height - 5 * age - 161;
	};

	const generateMealPlan = (targetCalories) => {
		const protein = Math.round((targetCalories * 0.3) / 4);
		const carbs = Math.round((targetCalories * 0.45) / 4);
		const fats = Math.round((targetCalories * 0.25) / 9);

		return {
			macros: { protein, carbs, fats },
		};
	};

	const handleCalculate = () => {
		const bmi = weight / Math.pow(height / 100, 2);
		const bmr = calculateBMR();
		const tdee = bmr * activityMultipliers[activityLevel].value;
		const targetCalories = Math.round(tdee + goalAdjustments[goal].calories);
		const mealPlan = generateMealPlan(targetCalories);
		const bmiInfo = getBMICategory(bmi);

		setResults({
			bmi: bmi.toFixed(2),
			bmiCategory: bmiInfo.category,
			bmiColor: bmiInfo.color,
			bmr: Math.round(bmr),
			tdee: Math.round(tdee),
			targetCalories,
			mealPlan,
		});
	};

	const styles = {
		container: {
			maxWidth: 1000,
			margin: "40px auto",
			padding: 20,
			fontFamily: "system-ui",
		},
		card: {
			background: "#1f2937",
			padding: 25,
			borderRadius: 20,
			marginBottom: 25,
			boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
			color: "#fff",
		},
		title: {
			textAlign: "center",
			fontSize: 28,
			marginBottom: 20,
		},
		grid: {
			display: "grid",
			gridTemplateColumns: "repeat(2, 1fr)",
			columnGap: 35,
			rowGap: 20,
		},
		label: { marginBottom: 6, display: "block", fontSize: 14 },
		input: {
			width: "100%",
			padding: 10,
			borderRadius: 10,
			border: "1px solid #374151",
			background: "#111827",
			color: "#fff",
		},
		slider: { width: "100%" },
		button: {
			background: "#22c55e",
			border: "none",
			padding: "12px 25px",
			borderRadius: 12,
			color: "#fff",
			cursor: "pointer",
			fontWeight: 600,
		},
		resultBox: {
			background: "#111827",
			padding: 20,
			borderRadius: 15,
			marginTop: 20,
		},
	};

	return (
		<div style={styles.container}>
			<div style={styles.card}>
				<h1 style={styles.title}>🩺 SmartFit BMI + Diet Planner</h1>

				<div style={styles.grid}>
					<div>
						<label style={styles.label}>Activity Level</label>
						<select
							value={activityLevel}
							onChange={(e) => setActivityLevel(e.target.value)}
							style={styles.input}
						>
							{Object.entries(activityMultipliers).map(([key, val]) => (
								<option key={key} value={key}>
									{val.label}
								</option>
							))}
						</select>
					</div>

					<div>
						<label style={styles.label}>Goal</label>
						<select
							value={goal}
							onChange={(e) => setGoal(e.target.value)}
							style={styles.input}
						>
							{Object.entries(goalAdjustments).map(([key, val]) => (
								<option key={key} value={key}>
									{val.label}
								</option>
							))}
						</select>
					</div>

					<div>
						<label style={styles.label}>Age</label>
						<input
							type="number"
							value={age}
							onChange={(e) => setAge(Number(e.target.value))}
							style={styles.input}
						/>
					</div>

					<div>
						<label style={styles.label}>Gender</label>
						<select
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							style={styles.input}
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>

					<div>
						<label style={styles.label}>Weight (kg): {weight}</label>
						<input
							type="range"
							min="30"
							max="200"
							value={weight}
							onChange={(e) => setWeight(Number(e.target.value))}
							style={styles.slider}
						/>
					</div>

					<div>
						<label style={styles.label}>Height (cm): {height}</label>
						<input
							type="range"
							min="100"
							max="220"
							value={height}
							onChange={(e) => setHeight(Number(e.target.value))}
							style={styles.slider}
						/>
					</div>
				</div>

				<div style={{ textAlign: "center", marginTop: 20 }}>
					<button style={styles.button} onClick={handleCalculate}>
						Calculate
					</button>
				</div>

				{results && (
					<div style={styles.resultBox}>
						<h2>BMI: <span style={{color:results.bmiColor}}>{results.bmi}</span></h2>
						<p>Category: {results.bmiCategory}</p>
						<p>BMR: {results.bmr} kcal/day</p>
						<p>TDEE: {results.tdee} kcal/day</p>
						<p>Target Calories: {results.targetCalories} kcal/day</p>

						<h3>Daily Macros</h3>
						<p>Protein: {results.mealPlan.macros.protein} g</p>
						<p>Carbs: {results.mealPlan.macros.carbs} g</p>
						<p>Fats: {results.mealPlan.macros.fats} g</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default BMICalculator;