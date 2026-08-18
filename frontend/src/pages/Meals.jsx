// import React from "react";
// import { useEffect, useState } from "react";
// import api from "../api/axiosClient";
// import { useAuth } from "../context/AuthContext";

// const Meals = () => {
// 	const { user } = useAuth();
// 	const [name, setName] = useState("");
// 	const [calories, setCalories] = useState("");
// 	const [protein, setProtein] = useState("");
// 	const [carbs, setCarbs] = useState("");
// 	const [fats, setFats] = useState("");
// 	const [meals, setMeals] = useState([]);
// 	const [total, setTotal] = useState(0);
// 	const [totalMacros, setTotalMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

// 	// Search
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [searchResults, setSearchResults] = useState([]);
// 	const [searching, setSearching] = useState(false);

// 	// Suggestions
// 	const [suggestions, setSuggestions] = useState([]);
// 	const [showSuggestions, setShowSuggestions] = useState(false);

// 	const loadToday = async () => {
// 		const res = await api.get("/meals/today");
// 		setMeals(res.data.meals);
// 		setTotal(res.data.totalCalories);
		
// 		// Calculate total macros
// 		const macros = res.data.meals.reduce((acc, meal) => ({
// 			protein: acc.protein + (meal.protein || 0),
// 			carbs: acc.carbs + (meal.carbs || 0),
// 			fats: acc.fats + (meal.fats || 0)
// 		}), { protein: 0, carbs: 0, fats: 0 });
// 		setTotalMacros(macros);
// 	};

// 	const loadSuggestions = async () => {
// 		try {
// 			const res = await api.get("/nutrition/suggestions");
// 			setSuggestions(res.data.suggestions);
// 		} catch (err) {
// 			console.error("Failed to load suggestions");
// 		}
// 	};

// 	useEffect(() => {
// 		loadToday();
// 		loadSuggestions();
// 	}, []);

// 	const handleSearch = async () => {
// 		if (!searchQuery.trim()) return;
// 		setSearching(true);
// 		try {
// 			const res = await api.get(`/nutrition/search?query=${searchQuery}`);
// 			setSearchResults(res.data);
// 		} catch (err) {
// 			console.error("Search failed");
// 		} finally {
// 			setSearching(false);
// 		}
// 	};

// 	const selectFood = (food) => {
// 		setName(food.name);
// 		setCalories(food.calories);
// 		setProtein(food.protein);
// 		setCarbs(food.carbs);
// 		setFats(food.fats);
// 		setSearchResults([]);
// 		setSearchQuery("");
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			await api.post("/meals", {
// 				name,
// 				calories: Number(calories),
// 				protein: Number(protein) || 0,
// 				carbs: Number(carbs) || 0,
// 				fats: Number(fats) || 0
// 			});
// 			setName("");
// 			setCalories("");
// 			setProtein("");
// 			setCarbs("");
// 			setFats("");
// 			await loadToday();
// 		} catch (err) {
// 			alert("Failed to add meal: " + (err.response?.data?.message || "Please try again"));
// 		}
// 	};

// 	const dailyTarget = user?.dailyCalorieTarget || 2000;
// 	const remaining = dailyTarget - total;
// 	const progressPercent = Math.min((total / dailyTarget) * 100, 100);

// 	const styles = {
// 		container: {
// 			maxWidth: 1000,
// 			margin: "20px auto",
// 			padding: "0 20px",
// 		},
// 		header: {
// 			marginBottom: 24,
// 		},
// 		statsGrid: {
// 			display: "grid",
// 			gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
// 			gap: 16,
// 			marginBottom: 24,
// 		},
// 		statCard: {
// 			background: "#fff",
// 			padding: 16,
// 			borderRadius: 12,
// 			boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
// 			textAlign: "center",
// 		},
// 		statValue: {
// 			fontSize: 28,
// 			fontWeight: 700,
// 			color: "#2c3e50",
// 		},
// 		statLabel: {
// 			fontSize: 12,
// 			color: "#7f8c8d",
// 			marginTop: 4,
// 		},
// 		progressBar: {
// 			height: 12,
// 			background: "#ecf0f1",
// 			borderRadius: 6,
// 			overflow: "hidden",
// 			marginBottom: 8,
// 		},
// 		progressFill: {
// 			height: "100%",
// 			background: progressPercent > 100 ? "#e74c3c" : "#27ae60",
// 			transition: "width 0.3s",
// 		},
// 		card: {
// 			background: "#fff",
// 			padding: 20,
// 			borderRadius: 12,
// 			boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
// 			marginBottom: 20,
// 		},
// 		searchBox: {
// 			display: "flex",
// 			gap: 10,
// 			marginBottom: 16,
// 		},
// 		input: {
// 			flex: 1,
// 			padding: "10px 12px",
// 			border: "1px solid #ddd",
// 			borderRadius: 8,
// 			fontSize: 14,
// 		},
// 		button: {
// 			padding: "10px 20px",
// 			background: "#3498db",
// 			color: "#fff",
// 			border: "none",
// 			borderRadius: 8,
// 			cursor: "pointer",
// 			fontWeight: 500,
// 		},
// 		buttonGreen: {
// 			padding: "10px 20px",
// 			background: "#27ae60",
// 			color: "#fff",
// 			border: "none",
// 			borderRadius: 8,
// 			cursor: "pointer",
// 			fontWeight: 500,
// 		},
// 		searchResults: {
// 			background: "#f8f9fa",
// 			borderRadius: 8,
// 			marginBottom: 16,
// 		},
// 		resultItem: {
// 			padding: 12,
// 			borderBottom: "1px solid #eee",
// 			cursor: "pointer",
// 			display: "flex",
// 			justifyContent: "space-between",
// 			alignItems: "center",
// 		},
// 		formGrid: {
// 			display: "grid",
// 			gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto",
// 			gap: 10,
// 			alignItems: "end",
// 		},
// 		inputGroup: {
// 			display: "flex",
// 			flexDirection: "column",
// 		},
// 		label: {
// 			fontSize: 12,
// 			color: "#666",
// 			marginBottom: 4,
// 		},
// 		mealList: {
// 			listStyle: "none",
// 			padding: 0,
// 			margin: 0,
// 		},
// 		mealItem: {
// 			padding: 12,
// 			borderBottom: "1px solid #eee",
// 			display: "flex",
// 			justifyContent: "space-between",
// 		},
// 		suggestionCard: {
// 			background: "#f8f9fa",
// 			padding: 12,
// 			borderRadius: 8,
// 			marginBottom: 8,
// 			cursor: "pointer",
// 			display: "flex",
// 			justifyContent: "space-between",
// 			alignItems: "center",
// 		},
// 		badge: {
// 			fontSize: 11,
// 			padding: "4px 8px",
// 			borderRadius: 4,
// 			background: "#e8f5e9",
// 			color: "#27ae60",
// 		},
// 	};

// 	return (
// 		<div style={styles.container}>
// 			<div style={styles.header}>
// 				<h2 style={{ color: "#fff", display: "flex", alignItems: "center", gap: 10 }}><img src="/images/meal coach.jpeg" alt="Meal" style={{ height: 36, width: 36, borderRadius: 8 }} /> Meal Tracker</h2>
// 				<p style={{ color: "#b0c4de" }}>Track your daily nutrition intake</p>
// 			</div>

// 			{/* Stats */}
// 			<div style={styles.statsGrid}>
// 				<div style={styles.statCard}>
// 					<div style={{ ...styles.statValue, color: "#27ae60" }}>{total}</div>
// 					<div style={styles.statLabel}>Calories Consumed</div>
// 				</div>
// 				<div style={styles.statCard}>
// 					<div style={{ ...styles.statValue, color: remaining >= 0 ? "#3498db" : "#e74c3c" }}>
// 						{remaining}
// 					</div>
// 					<div style={styles.statLabel}>Remaining</div>
// 				</div>
// 				<div style={styles.statCard}>
// 					<div style={{ ...styles.statValue, color: "#9b59b6" }}>{totalMacros.protein}g</div>
// 					<div style={styles.statLabel}>Protein</div>
// 				</div>
// 				<div style={styles.statCard}>
// 					<div style={{ ...styles.statValue, color: "#f39c12" }}>{totalMacros.carbs}g</div>
// 					<div style={styles.statLabel}>Carbs</div>
// 				</div>
// 				<div style={styles.statCard}>
// 					<div style={{ ...styles.statValue, color: "#e74c3c" }}>{totalMacros.fats}g</div>
// 					<div style={styles.statLabel}>Fats</div>
// 				</div>
// 			</div>

// 			{/* Progress Bar */}
// 			<div style={styles.card}>
// 				<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
// 					<span>Daily Progress</span>
// 					<span>{Math.round(progressPercent)}% of {dailyTarget} kcal</span>
// 				</div>
// 				<div style={styles.progressBar}>
// 					<div style={{ ...styles.progressFill, width: `${progressPercent}%` }}></div>
// 				</div>
// 			</div>

// 			{/* Food Search */}
// 			<div style={styles.card}>
// 				<h3 style={{ marginTop: 0 }}>🔍 Search Food</h3>
// 				<div style={styles.searchBox}>
// 					<input
// 						placeholder="Search for a food (e.g., chicken, rice, apple)..."
// 						value={searchQuery}
// 						onChange={(e) => setSearchQuery(e.target.value)}
// 						onKeyPress={(e) => e.key === "Enter" && handleSearch()}
// 						style={styles.input}
// 					/>
// 					<button onClick={handleSearch} style={styles.button} disabled={searching}>
// 						{searching ? "..." : "Search"}
// 					</button>
// 				</div>

// 				{searchResults.length > 0 && (
// 					<div style={styles.searchResults}>
// 						{searchResults.map((food, idx) => (
// 							<div
// 								key={idx}
// 								style={styles.resultItem}
// 								onClick={() => selectFood(food)}
// 							>
// 								<div>
// 									<strong>{food.name}</strong>
// 									<div style={{ fontSize: 12, color: "#666" }}>per {food.per}</div>
// 								</div>
// 								<div style={{ textAlign: "right", fontSize: 13 }}>
// 									<div><strong>{food.calories}</strong> kcal</div>
// 									<div style={{ color: "#666" }}>P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g</div>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				)}

// 				{/* Add Meal Form */}
// 				<h4>Add Meal</h4>
// 				<form onSubmit={handleSubmit}>
// 					<div style={styles.formGrid}>
// 						<div style={styles.inputGroup}>
// 							<label style={styles.label}>Food Name</label>
// 							<input
// 								placeholder="Meal name"
// 								value={name}
// 								onChange={(e) => setName(e.target.value)}
// 								style={styles.input}
// 								required
// 							/>
// 						</div>
// 						<div style={styles.inputGroup}>
// 							<label style={styles.label}>Calories</label>
// 							<input
// 								placeholder="kcal"
// 								type="number"
// 								value={calories}
// 								onChange={(e) => setCalories(e.target.value)}
// 								style={styles.input}
// 								required
// 							/>
// 						</div>
// 						<div style={styles.inputGroup}>
// 							<label style={styles.label}>Protein (g)</label>
// 							<input
// 								placeholder="g"
// 								type="number"
// 								value={protein}
// 								onChange={(e) => setProtein(e.target.value)}
// 								style={styles.input}
// 							/>
// 						</div>
// 						<div style={styles.inputGroup}>
// 							<label style={styles.label}>Carbs (g)</label>
// 							<input
// 								placeholder="g"
// 								type="number"
// 								value={carbs}
// 								onChange={(e) => setCarbs(e.target.value)}
// 								style={styles.input}
// 							/>
// 						</div>
// 						<div style={styles.inputGroup}>
// 							<label style={styles.label}>Fats (g)</label>
// 							<input
// 								placeholder="g"
// 								type="number"
// 								value={fats}
// 								onChange={(e) => setFats(e.target.value)}
// 								style={styles.input}
// 							/>
// 						</div>
// 						<button type="submit" style={styles.buttonGreen}>Add</button>
// 					</div>
// 				</form>
// 			</div>

// 			{/* Today's Meals */}
// 			<div style={styles.card}>
// 				<h3 style={{ marginTop: 0 }}>📋 Today's Meals</h3>
// 				{meals.length === 0 ? (
// 					<p style={{ color: "#999" }}>No meals logged today. Start adding!</p>
// 				) : (
// 					<ul style={styles.mealList}>
// 						{meals.map((m) => (
// 							<li key={m._id} style={styles.mealItem}>
// 								<div>
// 									<strong>{m.name}</strong>
// 									<div style={{ fontSize: 12, color: "#666" }}>
// 										{new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// 									</div>
// 								</div>
// 								<div style={{ textAlign: "right" }}>
// 									<div><strong>{m.calories}</strong> kcal</div>
// 									<div style={{ fontSize: 12, color: "#666" }}>
// 										P: {m.protein || 0}g | C: {m.carbs || 0}g | F: {m.fats || 0}g
// 									</div>
// 								</div>
// 							</li>
// 						))}
// 					</ul>
// 				)}
// 			</div>

// 			{/* Food Suggestions */}
// 			<div style={styles.card}>
// 				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// 					<h3 style={{ margin: 0 }}>💡 Suggested Foods</h3>
// 					<button
// 						onClick={() => setShowSuggestions(!showSuggestions)}
// 						style={{ ...styles.button, background: "#95a5a6", padding: "8px 16px" }}
// 					>
// 						{showSuggestions ? "Hide" : "Show"}
// 					</button>
// 				</div>
// 				<p style={{ color: "#666", fontSize: 14 }}>
// 					Based on your goal: <strong>{user?.goal?.replace("_", " ") || "maintenance"}</strong>
// 				</p>

// 				{showSuggestions && (
// 					<div style={{ marginTop: 16 }}>
// 						{suggestions.map((food, idx) => (
// 							<div
// 								key={idx}
// 								style={styles.suggestionCard}
// 								onClick={() => selectFood(food)}
// 							>
// 								<div>
// 									<strong>{food.name}</strong>
// 									<div style={{ fontSize: 12, color: "#666" }}>{food.reason}</div>
// 								</div>
// 								<div style={{ textAlign: "right" }}>
// 									<div>{food.calories} kcal</div>
// 									<span style={styles.badge}>P: {food.protein}g</span>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Meals;

import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const Meals = () => {
	const { user } = useAuth();

	const [name, setName] = useState("");
	const [calories, setCalories] = useState("");
	const [protein, setProtein] = useState("");
	const [carbs, setCarbs] = useState("");
	const [fats, setFats] = useState("");
	const [meals, setMeals] = useState([]);
	const [total, setTotal] = useState(0);
	const [totalMacros, setTotalMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searching, setSearching] = useState(false);

	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	// ================= LOAD DATA =================

	const loadToday = async () => {
		const res = await api.get("/meals/today");
		setMeals(res.data.meals);
		setTotal(res.data.totalCalories);

		const macros = res.data.meals.reduce(
			(acc, meal) => ({
				protein: acc.protein + (meal.protein || 0),
				carbs: acc.carbs + (meal.carbs || 0),
				fats: acc.fats + (meal.fats || 0),
			}),
			{ protein: 0, carbs: 0, fats: 0 }
		);

		setTotalMacros(macros);
	};

	const loadSuggestions = async () => {
		try {
			const res = await api.get("/nutrition/suggestions");
			setSuggestions(res.data.suggestions);
		} catch (err) {
			console.error("Failed to load suggestions");
		}
	};

	useEffect(() => {
		loadToday();
		loadSuggestions();
	}, []);

	// ================= SEARCH =================

	const handleSearch = async () => {
		if (!searchQuery.trim()) return;
		setSearching(true);
		try {
			const res = await api.get(`/nutrition/search?query=${searchQuery}`);
			setSearchResults(res.data);
		} catch (err) {
			console.error("Search failed");
		} finally {
			setSearching(false);
		}
	};

	const selectFood = (food) => {
		setName(food.name);
		setCalories(food.calories);
		setProtein(food.protein);
		setCarbs(food.carbs);
		setFats(food.fats);
		setSearchResults([]);
		setSearchQuery("");
	};

	// ================= SUBMIT =================

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/meals", {
				name,
				calories: Number(calories),
				protein: Number(protein) || 0,
				carbs: Number(carbs) || 0,
				fats: Number(fats) || 0,
			});
			setName("");
			setCalories("");
			setProtein("");
			setCarbs("");
			setFats("");
			await loadToday();
		} catch (err) {
			alert("Failed to add meal: " + (err.response?.data?.message || "Please try again"));
		}
	};

	// ================= CALCULATIONS =================

	const dailyTarget = user?.dailyCalorieTarget || 2000;
	const remaining = dailyTarget - total;
	const progressPercent = Math.min((total / dailyTarget) * 100, 100);

	// ================= STYLES (Premium UI) =================

	const styles = {
		container: {
			maxWidth: 1250,
			margin: "40px auto",
			padding: "0 24px",
			color: "#E2E8F0",
		},
		card: {
			background: "rgba(15,23,42,0.85)",
			backdropFilter: "blur(16px)",
			padding: 28,
			borderRadius: 20,
			border: "1px solid rgba(255,255,255,0.06)",
			boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
			marginBottom: 30,
		},
		headerTitle: {
			fontSize: 26,
			fontWeight: 700,
			color: "#FFFFFF",
			display: "flex",
			alignItems: "center",
			gap: 12,
		},
		statsGrid: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
			gap: 40,
			marginBottom: 30,
		},
		statCard: {
			background: "rgba(30,41,59,0.8)",
			padding: 22,
			borderRadius: 16,
			textAlign: "center",
		},
		statValue: {
			fontSize: 28,
			fontWeight: 700,
			color: "#fff",
		},
		statLabel: {
			fontSize: 13,
			color: "#94A3B8",
			marginTop: 6,
		},
		progressBar: {
			height: 14,
			background: "rgba(255,255,255,0.08)",
			borderRadius: 999,
			overflow: "hidden",
		},
		progressFill: {
			height: "100%",
			background: "linear-gradient(90deg,#22C55E,#60A5FA)",
			borderRadius: 999,
		},
		input: {
			width: "100%",
			padding: "12px 14px",
			background: "rgba(30,41,59,0.8)",
			border: "1px solid rgba(255,255,255,0.08)",
			borderRadius: 12,
			color: "#fff",
			fontSize: 14,
		},
		button: {
			padding: "12px 20px",
			background: "linear-gradient(90deg,#22C55E,#60A5FA)",
			border: "none",
			borderRadius: 12,
			color: "#fff",
			fontWeight: 600,
			cursor: "pointer",
		},
		fullButton: {
			padding: "12px 20px",
			background: "linear-gradient(90deg,#22C55E,#60A5FA)",
			border: "none",
			borderRadius: 12,
			color: "#fff",
			fontWeight: 600,
			cursor: "pointer",
			width: "100%",
			marginTop: 16,
		},
		label: {
			fontSize: 12,
			color: "#94A3B8",
			marginBottom: 6,
		},
		twoColGrid: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			columnGap: 40,
			rowGap: 20,
		},
		mealList: {
			listStyle: "none",
			padding: 0,
			margin: 0,
		},
		mealItem: {
			padding: 16,
			borderBottom: "1px solid rgba(255,255,255,0.05)",
			display: "flex",
			justifyContent: "space-between",
		},
		searchResultItem: {
			padding: 14,
			borderBottom: "1px solid rgba(255,255,255,0.05)",
			cursor: "pointer",
			display: "flex",
			justifyContent: "space-between",
		},
		suggestionCard: {
			background: "rgba(30,41,59,0.8)",
			padding: 16,
			borderRadius: 14,
			marginBottom: 10,
			cursor: "pointer",
			display: "flex",
			justifyContent: "space-between",
		},
	};

	// ================= UI =================

	return (
		<div style={styles.container}>
			<h2 style={styles.headerTitle}>
				<img src="/images/meal coach.jpeg" alt="Meal" style={{ height: 36, width: 36, borderRadius: 8 }} />
				SmartFit Meal Tracker
			</h2>

			{/* Stats */}
			<div style={styles.statsGrid}>
				{[
					{ label: "Calories", value: Math.round(total) },
					{ label: "Remaining", value: Math.round(remaining) },
					{ label: "Protein", value: `${Number(totalMacros.protein).toFixed(1)}g` },
					{ label: "Carbs", value: `${Number(totalMacros.carbs).toFixed(1)}g` },
					{ label: "Fats", value: `${Number(totalMacros.fats).toFixed(1)}g` },
				].map((item, i) => {
					return (
						<div key={i} style={styles.statCard}>
							<div style={styles.statValue}>{item.value}</div>
							<div style={styles.statLabel}>{item.label}</div>
						</div>
					);
				})}
			</div>

			{/* Progress */}
			<div style={styles.card}>
				<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
					<span>Daily Progress</span>
					<span>{Math.round(progressPercent)}% of {dailyTarget} kcal</span>
				</div>
				<div style={styles.progressBar}>
					<div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
				</div>
			</div>

			{/* Search + Add */}
			<div style={styles.card}>
				<h3>🔍 Search Food</h3>
				<div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
					<input
						style={styles.input}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleSearch()}
						placeholder="Search food..."
					/>
					<button style={styles.button} onClick={handleSearch}>
						{searching ? "..." : "Search"}
					</button>
				</div>

				{/* Search Results */}
				{searchResults.length > 0 && (
					<div style={{ marginBottom: 20 }}>
						{searchResults.map((food, idx) => (
							<div
								key={idx}
								style={styles.searchResultItem}
								onClick={() => selectFood(food)}
							>
								<div>
									<strong>{food.name}</strong>
									<div style={{ fontSize: 12, color: "#94A3B8" }}>
										per {food.per}
									</div>
								</div>
								<div style={{ textAlign: "right", fontSize: 13 }}>
									<div><strong>{food.calories}</strong> kcal</div>
									<div style={{ color: "#94A3B8" }}>
										P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<h4>Add Meal</h4>

				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: 16 }}>
						<label style={styles.label}>Food Name</label>
						<input
							style={styles.input}
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div style={styles.twoColGrid}>
						<div>
							<label style={styles.label}>Calories</label>
							<input
								type="number"
								style={styles.input}
								value={calories}
								onChange={(e) => setCalories(e.target.value)}
								required
							/>
						</div>

						<div>
							<label style={styles.label}>Protein</label>
							<input
								type="number"
								style={styles.input}
								value={protein}
								onChange={(e) => setProtein(e.target.value)}
							/>
						</div>

						<div>
							<label style={styles.label}>Carbs</label>
							<input
								type="number"
								style={styles.input}
								value={carbs}
								onChange={(e) => setCarbs(e.target.value)}
							/>
						</div>

						<div>
							<label style={styles.label}>Fats</label>
							<input
								type="number"
								style={styles.input}
								value={fats}
								onChange={(e) => setFats(e.target.value)}
							/>
						</div>
					</div>

					<button type="submit" style={styles.fullButton}>
						Add
					</button>
				</form>
			</div>

			{/* Today's Meals */}
			<div style={styles.card}>
				<h3>📋 Today's Meals</h3>
				{meals.length === 0 ? (
					<p style={{ color: "#94A3B8" }}>No meals logged today. Start adding!</p>
				) : (
					<ul style={styles.mealList}>
						{meals.map((m) => (
							<li key={m._id} style={styles.mealItem}>
								<div>
								<strong>{m.name || "Meal"}</strong>
									<div style={{ fontSize: 12, color: "#94A3B8" }}>
										{new Date(m.date).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								</div>
								<div style={{ textAlign: "right" }}>
									<div><strong>{m.calories}</strong> kcal</div>
									<div style={{ fontSize: 12, color: "#94A3B8" }}>
										P: {m.protein || 0}g | C: {m.carbs || 0}g | F: {m.fats || 0}g
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Suggestions */}
			<div style={styles.card}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<h3>💡 Suggested Foods</h3>
					<button style={styles.button} onClick={() => setShowSuggestions(!showSuggestions)}>
						{showSuggestions ? "Hide" : "Show"}
					</button>
				</div>

				<p style={{ color: "#94A3B8", fontSize: 14 }}>
					Based on your goal:{" "}
					<strong>{user?.goal?.replace("_", " ") || "maintenance"}</strong>
				</p>

				{showSuggestions && (
					<div style={{ marginTop: 16 }}>
						{suggestions.map((food, i) => (
							<div key={i} style={styles.suggestionCard} onClick={() => selectFood(food)}>
								<div>
									<strong>{food.name}</strong>
									<div style={{ fontSize: 12, color: "#94A3B8" }}>
										{food.reason}
									</div>
								</div>
								<div>{food.calories} kcal</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Meals;