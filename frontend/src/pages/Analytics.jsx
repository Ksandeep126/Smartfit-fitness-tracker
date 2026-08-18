// import React, { useEffect, useState } from "react";
// import {
// 	BarChart,
// 	Bar,
// 	LineChart,
// 	Line,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	Legend,
// 	ResponsiveContainer,
// 	AreaChart,
// 	Area,
// } from "recharts";
// import api from "../api/axiosClient";
// import { useAuth } from "../context/AuthContext";

// const Analytics = () => {
// 	const { user } = useAuth();
// 	const [caloriesData, setCaloriesData] = useState([]);
// 	const [waterData, setWaterData] = useState([]);
// 	const [weightData, setWeightData] = useState([]);
// 	const [habitAnalysis, setHabitAnalysis] = useState(null);
// 	const [todayWater, setTodayWater] = useState({ total: 0, goal: 2500 });
// 	const [newWeight, setNewWeight] = useState("");
// 	const [loading, setLoading] = useState(true);

// 	const loadData = async () => {
// 		try {
// 			const [calories, water, weight, habits, waterToday] = await Promise.all([
// 				api.get("/analytics/calories"),
// 				api.get("/analytics/water"),
// 				api.get("/analytics/weight"),
// 				api.get("/analytics/habits"),
// 				api.get("/analytics/water/today"),
// 			]);
// 			setCaloriesData(calories.data);
// 			setWaterData(water.data);
// 			setWeightData(weight.data);
// 			setHabitAnalysis(habits.data);
// 			setTodayWater(waterToday.data);
// 		} catch (err) {
// 			console.error("Failed to load analytics");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		loadData();
// 	}, []);

// 	const addWater = async (amount) => {
// 		try {
// 			await api.post("/analytics/water", { amount });
// 			const res = await api.get("/analytics/water/today");
// 			setTodayWater(res.data);
// 			loadData();
// 		} catch (err) {
// 			console.error("Failed to add water");
// 		}
// 	};

// 	const logWeight = async () => {
// 		if (!newWeight) return;
// 		try {
// 			await api.post("/analytics/weight", { weight: Number(newWeight) });
// 			setNewWeight("");
// 			loadData();
// 		} catch (err) {
// 			console.error("Failed to log weight");
// 		}
// 	};

// 	const waterPercent = Math.min((todayWater.total / todayWater.goal) * 100, 100);

// 	const styles = {
// 		container: {
// 			maxWidth: 1200,
// 			margin: "20px auto",
// 			padding: "0 20px",
// 		},
// 		header: {
// 			marginBottom: 24,
// 		},
// 		grid: {
// 			display: "grid",
// 			gridTemplateColumns: "repeat(2, 1fr)",
// 			gap: 20,
// 		},
// 		card: {
// 			background: "#fff",
// 			padding: 20,
// 			borderRadius: 12,
// 			boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
// 		},
// 		cardTitle: {
// 			fontSize: 18,
// 			fontWeight: 600,
// 			marginBottom: 16,
// 			color: "#2c3e50",
// 		},
// 		waterButtons: {
// 			display: "flex",
// 			gap: 10,
// 			marginTop: 16,
// 			flexWrap: "wrap",
// 		},
// 		waterBtn: {
// 			padding: "8px 16px",
// 			border: "none",
// 			borderRadius: 6,
// 			cursor: "pointer",
// 			fontWeight: 500,
// 		},
// 		progressBar: {
// 			height: 20,
// 			background: "#ecf0f1",
// 			borderRadius: 10,
// 			overflow: "hidden",
// 			marginTop: 12,
// 		},
// 		progressFill: {
// 			height: "100%",
// 			background: "linear-gradient(90deg, #3498db, #2980b9)",
// 			transition: "width 0.3s",
// 		},
// 		weightInput: {
// 			display: "flex",
// 			gap: 10,
// 			marginTop: 16,
// 		},
// 		input: {
// 			flex: 1,
// 			padding: "10px",
// 			border: "1px solid #ddd",
// 			borderRadius: 6,
// 		},
// 		button: {
// 			padding: "10px 20px",
// 			background: "#27ae60",
// 			color: "#fff",
// 			border: "none",
// 			borderRadius: 6,
// 			cursor: "pointer",
// 		},
// 		habitCard: {
// 			background: "#f8f9fa",
// 			padding: 16,
// 			borderRadius: 8,
// 			marginBottom: 12,
// 		},
// 		habitHeader: {
// 			display: "flex",
// 			justifyContent: "space-between",
// 			alignItems: "center",
// 			marginBottom: 8,
// 		},
// 		badge: {
// 			padding: "4px 12px",
// 			borderRadius: 12,
// 			fontSize: 12,
// 			fontWeight: 600,
// 		},
// 		statsRow: {
// 			display: "flex",
// 			gap: 20,
// 			marginBottom: 8,
// 			fontSize: 14,
// 			color: "#666",
// 		},
// 		suggestion: {
// 			fontSize: 13,
// 			color: "#7f8c8d",
// 			fontStyle: "italic",
// 			marginTop: 8,
// 		},
// 	};

// 	if (loading) {
// 		return (
// 			<div style={styles.container}>
// 				<p style={{ color: "#fff" }}>Loading analytics...</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div style={styles.container}>
// 			<div style={styles.header}>
// 				<h2 style={{ color: "#fff" }}>📊 Analytics Dashboard</h2>
// 				<p style={{ color: "#b0c4de" }}>Track your progress and insights</p>
// 			</div>

// 			<div style={styles.grid}>
// 				{/* Calories Chart */}
// 				<div style={styles.card}>
// 					<h3 style={styles.cardTitle}>🔥 Calories: Consumed vs Burned</h3>
// 					<ResponsiveContainer width="100%" height={250}>
// 						<BarChart data={caloriesData}>
// 							<CartesianGrid strokeDasharray="3 3" />
// 							<XAxis dataKey="date" fontSize={12} />
// 							<YAxis fontSize={12} />
// 							<Tooltip />
// 							<Legend />
// 							<Bar dataKey="consumed" fill="#e74c3c" name="Consumed" />
// 							<Bar dataKey="burned" fill="#27ae60" name="Burned" />
// 						</BarChart>
// 					</ResponsiveContainer>
// 				</div>

// 				{/* Water Intake */}
// 				<div style={styles.card}>
// 					<h3 style={styles.cardTitle}>💧 Water Intake</h3>
// 					<div style={{ textAlign: "center", marginBottom: 16 }}>
// 						<div style={{ fontSize: 36, fontWeight: 700, color: "#3498db" }}>
// 							{todayWater.total} ml
// 						</div>
// 						<div style={{ color: "#666" }}>of {todayWater.goal} ml goal</div>
// 					</div>
// 					<div style={styles.progressBar}>
// 						<div style={{ ...styles.progressFill, width: `${waterPercent}%` }}></div>
// 					</div>
// 					<div style={styles.waterButtons}>
// 						{[250, 500, 750, 1000].map((amount) => (
// 							<button
// 								key={amount}
// 								onClick={() => addWater(amount)}
// 								style={{
// 									...styles.waterBtn,
// 									background: "#e3f2fd",
// 									color: "#1976d2",
// 								}}
// 							>
// 								+{amount}ml
// 							</button>
// 						))}
// 					</div>
// 					<ResponsiveContainer width="100%" height={150} style={{ marginTop: 20 }}>
// 						<AreaChart data={waterData}>
// 							<CartesianGrid strokeDasharray="3 3" />
// 							<XAxis dataKey="date" fontSize={11} />
// 							<YAxis fontSize={11} />
// 							<Tooltip />
// 							<Area
// 								type="monotone"
// 								dataKey="amount"
// 								stroke="#3498db"
// 								fill="#e3f2fd"
// 								name="Water (ml)"
// 							/>
// 						</AreaChart>
// 					</ResponsiveContainer>
// 				</div>

// 				{/* Weight Trend */}
// 				<div style={styles.card}>
// 					<h3 style={styles.cardTitle}>⚖️ Weight Trend</h3>
// 					{weightData.length > 0 ? (
// 						<ResponsiveContainer width="100%" height={200}>
// 							<LineChart data={weightData}>
// 								<CartesianGrid strokeDasharray="3 3" />
// 								<XAxis dataKey="date" fontSize={11} />
// 								<YAxis fontSize={11} domain={["dataMin - 2", "dataMax + 2"]} />
// 								<Tooltip />
// 								<Line
// 									type="monotone"
// 									dataKey="weight"
// 									stroke="#9b59b6"
// 									strokeWidth={2}
// 									dot={{ fill: "#9b59b6" }}
// 									name="Weight (kg)"
// 								/>
// 							</LineChart>
// 						</ResponsiveContainer>
// 					) : (
// 						<p style={{ color: "#999", textAlign: "center" }}>
// 							No weight data yet. Log your first entry below!
// 						</p>
// 					)}
// 					<div style={styles.weightInput}>
// 						<input
// 							type="number"
// 							placeholder="Enter weight (kg)"
// 							value={newWeight}
// 							onChange={(e) => setNewWeight(e.target.value)}
// 							style={styles.input}
// 						/>
// 						<button onClick={logWeight} style={styles.button}>
// 							Log Weight
// 						</button>
// 					</div>
// 				</div>

// 				{/* Habit Analysis */}
// 				<div style={styles.card}>
// 					<h3 style={styles.cardTitle}>📈 Habit Analysis</h3>
// 					{habitAnalysis && (
// 						<>
// 							<div
// 								style={{
// 									background: "#f8f9fa",
// 									padding: 16,
// 									borderRadius: 8,
// 									marginBottom: 16,
// 									textAlign: "center",
// 								}}
// 							>
// 								<div style={{ fontSize: 32, fontWeight: 700, color: "#27ae60" }}>
// 									{habitAnalysis.overall.consistency}%
// 								</div>
// 								<div style={{ color: "#666" }}>Overall Consistency</div>
// 								<div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>
// 									{habitAnalysis.overall.completed} of {habitAnalysis.overall.total} habits completed
// 								</div>
// 							</div>

// 							{habitAnalysis.habits.length === 0 ? (
// 								<p style={{ color: "#999", textAlign: "center" }}>
// 									No habits tracked yet. Add habits to see analysis!
// 								</p>
// 							) : (
// 								habitAnalysis.habits.map((habit, idx) => (
// 									<div key={idx} style={styles.habitCard}>
// 										<div style={styles.habitHeader}>
// 											<strong>{habit.name}</strong>
// 											<span
// 												style={{
// 													...styles.badge,
// 													background:
// 														habit.consistency >= 80
// 															? "#d4edda"
// 															: habit.consistency >= 50
// 															? "#fff3cd"
// 															: "#f8d7da",
// 													color:
// 														habit.consistency >= 80
// 															? "#155724"
// 															: habit.consistency >= 50
// 															? "#856404"
// 															: "#721c24",
// 												}}
// 											>
// 												{habit.consistency}%
// 											</span>
// 										</div>
// 										<div style={styles.statsRow}>
// 											<span>✅ Completed: {habit.completed}</span>
// 											<span>❌ Missed: {habit.missed}</span>
// 										</div>
// 										<div style={styles.suggestion}>💡 {habit.suggestion}</div>
// 									</div>
// 								))
// 							)}
// 						</>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Analytics;

import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	AreaChart,
	Area,
} from "recharts";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const Analytics = () => {
	const { user } = useAuth();
	const [caloriesData, setCaloriesData] = useState([]);
	const [waterData, setWaterData] = useState([]);
	const [weightData, setWeightData] = useState([]);
	const [habitAnalysis, setHabitAnalysis] = useState(null);
	const [todayWater, setTodayWater] = useState({ total: 0, goal: 2500 });
	const [newWeight, setNewWeight] = useState("");
	const [loading, setLoading] = useState(true);

	const loadData = async () => {
		try {
			const [calories, water, weight, habits, waterToday] =
				await Promise.all([
					api.get("/analytics/calories"),
					api.get("/analytics/water"),
					api.get("/analytics/weight"),
					api.get("/analytics/habits"),
					api.get("/analytics/water/today"),
				]);

			setCaloriesData(calories.data);
			setWaterData(water.data);
			setWeightData(weight.data);
			setHabitAnalysis(habits.data);
			setTodayWater(waterToday.data);
		} catch (err) {
			console.error("Failed to load analytics");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const addWater = async (amount) => {
		try {
			await api.post("/analytics/water", { amount });
			const res = await api.get("/analytics/water/today");
			setTodayWater(res.data);
			loadData();
		} catch (err) {
			console.error("Failed to add water");
		}
	};

	const logWeight = async () => {
		if (!newWeight) return;
		try {
			await api.post("/analytics/weight", { weight: Number(newWeight) });
			setNewWeight("");
			loadData();
		} catch (err) {
			console.error("Failed to log weight");
		}
	};

	const waterPercent = Math.min(
		(todayWater.total / todayWater.goal) * 100,
		100
	);

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
			marginBottom: 25,
			color: "#fff",
		},
		grid: {
			display: "grid",
			gridTemplateColumns: "repeat(2, 1fr)",
			columnGap: 35,
			rowGap: 25,
		},
		subTitle: {
			fontSize: 18,
			marginBottom: 15,
		},
		input: {
			width: "100%",
			padding: 10,
			borderRadius: 10,
			border: "1px solid #374151",
			background: "#111827",
			color: "#fff",
		},
		button: {
			background: "#22c55e",
			border: "none",
			padding: "10px 20px",
			borderRadius: 12,
			color: "#fff",
			cursor: "pointer",
			fontWeight: 600,
		},
		progressBar: {
			height: 18,
			background: "#111827",
			borderRadius: 10,
			overflow: "hidden",
			marginTop: 10,
		},
		progressFill: {
			height: "100%",
			background: "#22c55e",
			transition: "width 0.3s ease",
		},
		waterButtons: {
			display: "flex",
			gap: 10,
			marginTop: 15,
			flexWrap: "wrap",
		},
	};

	if (loading) {
		return (
			<div style={styles.container}>
				<div style={styles.card}>
					<p>Loading analytics...</p>
				</div>
			</div>
		);
	}

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>📊 SmartFit Analytics Dashboard</h1>

			<div style={styles.grid}>
				{/* Calories */}
				<div style={styles.card}>
					<h3 style={styles.subTitle}>
						🔥 Calories: Consumed vs Burned
					</h3>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={caloriesData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis dataKey="date" stroke="#fff" />
							<YAxis stroke="#fff" />
							<Tooltip />
							<Legend />
							<Bar dataKey="consumed" fill="#ef4444" />
							<Bar dataKey="burned" fill="#22c55e" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Water */}
				<div style={styles.card}>
					<h3 style={styles.subTitle}>💧 Water Intake</h3>

					<h2>
						{todayWater.total} ml / {todayWater.goal} ml
					</h2>

					<div style={styles.progressBar}>
						<div
							style={{
								...styles.progressFill,
								width: `${waterPercent}%`,
							}}
						></div>
					</div>

					<div style={styles.waterButtons}>
						{[250, 500, 750, 1000].map((amount) => (
							<button
								key={amount}
								onClick={() => addWater(amount)}
								style={styles.button}
							>
								+{amount}ml
							</button>
						))}
					</div>

					<ResponsiveContainer width="100%" height={150}>
						<AreaChart data={waterData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis dataKey="date" stroke="#fff" />
							<YAxis stroke="#fff" />
							<Tooltip />
							<Area
								type="monotone"
								dataKey="amount"
								stroke="#22c55e"
								fill="#065f46"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>

				{/* Weight */}
				<div style={styles.card}>
					<h3 style={styles.subTitle}>⚖️ Weight Trend</h3>

					{weightData.length > 0 ? (
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={weightData}>
								<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
								<XAxis dataKey="date" stroke="#fff" />
								<YAxis stroke="#fff" />
								<Tooltip />
								<Line
									type="monotone"
									dataKey="weight"
									stroke="#22c55e"
									strokeWidth={2}
								/>
							</LineChart>
						</ResponsiveContainer>
					) : (
						<p>No weight data yet.</p>
					)}

					<div style={{ display: "flex", gap: 10, marginTop: 15 }}>
						<input
							type="number"
							placeholder="Enter weight (kg)"
							value={newWeight}
							onChange={(e) =>
								setNewWeight(e.target.value)
							}
							style={styles.input}
						/>
						<button
							onClick={logWeight}
							style={styles.button}
						>
							Log
						</button>
					</div>
				</div>

				{/* Habits */}
				<div style={styles.card}>
					<h3 style={styles.subTitle}>📈 Habit Analysis</h3>

					{habitAnalysis && (
						<>
							<h2>
								Overall Consistency:{" "}
								{habitAnalysis.overall.consistency}%
							</h2>

							{habitAnalysis.habits.map((habit, idx) => (
								<div
									key={idx}
									style={{
										background: "#111827",
										padding: 15,
										borderRadius: 12,
										marginTop: 15,
									}}
								>
									<strong>{habit.name}</strong>
									<p>
										✅ {habit.completed} | ❌{" "}
										{habit.missed}
									</p>
									<p>
										Consistency:{" "}
										{habit.consistency}%
									</p>
									<p>💡 {habit.suggestion}</p>
								</div>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Analytics;