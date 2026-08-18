// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axiosClient";

// const History = () => {
// 	const { type } = useParams();
// 	const [data, setData] = useState([]);
// 	const [comparison, setComparison] = useState(null);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		loadData();
// 	}, [type]);

// 	const loadData = async () => {
// 		setLoading(true);
// 		try {
// 			if (type === "meals") {
// 				const res = await api.get("/meals/history/week");
// 				setData(res.data);
// 			} else if (type === "workouts") {
// 				const res = await api.get("/workouts/history/all");
// 				setData(res.data);
// 			} else if (type === "compare") {
// 				const res = await api.get("/analytics/compare-months");
// 				setComparison(res.data);
// 			}
// 		} catch (err) {
// 			console.error("Failed to load history", err);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const exportToCSV = (items, filename) => {
// 		if (!items.length) return alert("No data to export");

// 		const headers = Object.keys(items[0]).filter(k => k !== "_id" && k !== "__v" && k !== "user");
// 		const csvContent = [
// 			headers.join(","),
// 			...items.map(item =>
// 				headers.map(h => {
// 					const val = item[h];
// 					if (h === "date") return new Date(val).toLocaleDateString();
// 					return typeof val === "string" && val.includes(",") ? `"${val}"` : val;
// 				}).join(",")
// 			),
// 		].join("\n");

// 		const blob = new Blob([csvContent], { type: "text/csv" });
// 		const url = URL.createObjectURL(blob);
// 		const a = document.createElement("a");
// 		a.href = url;
// 		a.download = `${filename}.csv`;
// 		a.click();
// 		URL.revokeObjectURL(url);
// 	};

// 	const styles = {
// 		container: {
// 			maxWidth: 1000,
// 			margin: "20px auto",
// 			padding: "0 20px",
// 		},
// 		header: {
// 			display: "flex",
// 			justifyContent: "space-between",
// 			alignItems: "center",
// 			marginBottom: 24,
// 		},
// 		exportBtn: {
// 			padding: "10px 20px",
// 			background: "#27ae60",
// 			color: "#fff",
// 			border: "none",
// 			borderRadius: 6,
// 			cursor: "pointer",
// 			fontWeight: 600,
// 		},
// 		card: {
// 			background: "#fff",
// 			padding: 20,
// 			borderRadius: 12,
// 			boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
// 			marginBottom: 16,
// 		},
// 		table: {
// 			width: "100%",
// 			borderCollapse: "collapse",
// 		},
// 		th: {
// 			textAlign: "left",
// 			padding: "12px 8px",
// 			borderBottom: "2px solid #eee",
// 			fontSize: 14,
// 			color: "#666",
// 		},
// 		td: {
// 			padding: "12px 8px",
// 			borderBottom: "1px solid #f0f0f0",
// 		},
// 		compareGrid: {
// 			display: "grid",
// 			gridTemplateColumns: "1fr 1fr",
// 			gap: 24,
// 		},
// 		compareCard: {
// 			background: "#fff",
// 			padding: 24,
// 			borderRadius: 12,
// 			boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
// 			textAlign: "center",
// 		},
// 		statValue: {
// 			fontSize: 36,
// 			fontWeight: 700,
// 			color: "#2c3e50",
// 		},
// 		statLabel: {
// 			fontSize: 14,
// 			color: "#666",
// 			marginTop: 4,
// 		},
// 		changeIndicator: {
// 			display: "inline-block",
// 			padding: "4px 12px",
// 			borderRadius: 20,
// 			fontSize: 14,
// 			fontWeight: 600,
// 			marginTop: 8,
// 		},
// 		tabs: {
// 			display: "flex",
// 			gap: 10,
// 			marginBottom: 24,
// 		},
// 		tab: {
// 			padding: "10px 20px",
// 			border: "none",
// 			borderRadius: 6,
// 			cursor: "pointer",
// 			fontWeight: 500,
// 		},
// 	};

// 	const renderMealsHistory = () => (
// 		<div style={styles.card}>
// 			<table style={styles.table}>
// 				<thead>
// 					<tr>
// 						<th style={styles.th}>Date</th>
// 						<th style={styles.th}>Meal</th>
// 						<th style={styles.th}>Calories</th>
// 						<th style={styles.th}>Protein</th>
// 						<th style={styles.th}>Carbs</th>
// 						<th style={styles.th}>Fats</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{data.map((meal, idx) => (
// 						<tr key={idx}>
// 							<td style={styles.td}>{new Date(meal.date).toLocaleDateString()}</td>
// 							<td style={styles.td}>{meal.name}</td>
// 							<td style={styles.td}>{meal.calories} kcal</td>
// 							<td style={styles.td}>{meal.protein || 0}g</td>
// 							<td style={styles.td}>{meal.carbs || 0}g</td>
// 							<td style={styles.td}>{meal.fats || 0}g</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 			{data.length === 0 && <p style={{ textAlign: "center", color: "#999" }}>No meals logged in the last week</p>}
// 		</div>
// 	);

// 	const renderWorkoutsHistory = () => (
// 		<>
// 			<div style={{ marginBottom: 16 }}>
// 				<button onClick={() => exportToCSV(data, "workout_history")} style={styles.exportBtn}>
// 					📥 Export to CSV
// 				</button>
// 			</div>
// 			<div style={styles.card}>
// 				<table style={styles.table}>
// 					<thead>
// 						<tr>
// 							<th style={styles.th}>Date</th>
// 							<th style={styles.th}>Workout Type</th>
// 							<th style={styles.th}>Duration</th>
// 							<th style={styles.th}>Calories Burned</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{data.map((workout, idx) => (
// 							<tr key={idx}>
// 								<td style={styles.td}>{new Date(workout.date).toLocaleDateString()}</td>
// 								<td style={styles.td}>{workout.type}</td>
// 								<td style={styles.td}>{workout.duration} mins</td>
// 								<td style={styles.td}>{workout.caloriesBurned} kcal</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 				{data.length === 0 && <p style={{ textAlign: "center", color: "#999" }}>No workouts logged yet</p>}
// 			</div>
// 		</>
// 	);

// 	const renderComparison = () => {
// 		if (!comparison) return <p>No comparison data available</p>;

// 		const { thisMonth, lastMonth } = comparison;
// 		const caloriesDiff = thisMonth.caloriesConsumed - lastMonth.caloriesConsumed;
// 		const workoutsDiff = thisMonth.workouts - lastMonth.workouts;
// 		const burnedDiff = thisMonth.caloriesBurned - lastMonth.caloriesBurned;

// 		const getChangeStyle = (diff, inverse = false) => ({
// 			...styles.changeIndicator,
// 			background: (inverse ? diff < 0 : diff > 0) ? "#d4edda" : diff === 0 ? "#f0f0f0" : "#f8d7da",
// 			color: (inverse ? diff < 0 : diff > 0) ? "#155724" : diff === 0 ? "#666" : "#721c24",
// 		});

// 		return (
// 			<div>
// 				<div style={styles.compareGrid}>
// 					<div style={styles.compareCard}>
// 						<h3>📅 This Month</h3>
// 						<div style={{ marginTop: 20 }}>
// 							<div style={styles.statValue}>{thisMonth.caloriesConsumed.toLocaleString()}</div>
// 							<div style={styles.statLabel}>Calories Consumed</div>
// 						</div>
// 						<div style={{ marginTop: 20 }}>
// 							<div style={styles.statValue}>{thisMonth.caloriesBurned.toLocaleString()}</div>
// 							<div style={styles.statLabel}>Calories Burned</div>
// 						</div>
// 						<div style={{ marginTop: 20 }}>
// 							<div style={styles.statValue}>{thisMonth.workouts}</div>
// 							<div style={styles.statLabel}>Workouts</div>
// 						</div>
// 						<div style={{ marginTop: 20 }}>
// 							<div style={styles.statValue}>{thisMonth.meals}</div>
// 							<div style={styles.statLabel}>Meals Logged</div>
// 						</div>
// 					</div>

// 					<div style={styles.compareCard}>
// 						<h3>📆 Last Month</h3>
// 						<div style={{ marginTop: 20 }}>
// 							<div style={styles.statValue}>{lastMonth.caloriesConsumed.toLocaleString()}</div>
// 							<div style={styles.statLabel}>Calories Consumed</div>
// 						</div>
// 						<div style={{ marginTop: 20 }}>
// 							<div style={styles.statValue}>{lastMonth.caloriesBurned.toLocaleString()}</div>
// 							<div style={styles.statLabel}>Calories Burned</div>
// 						</div>
// 						<div style={{ marginTop: 20 }}>
// 							<div style={styles.statValue}>{lastMonth.workouts}</div>
// 							<div style={styles.statLabel}>Workouts</div>
// 						</div>
// 						<div style={{ marginTop: 20 }}>
// 							<div style={styles.statValue}>{lastMonth.meals}</div>
// 							<div style={styles.statLabel}>Meals Logged</div>
// 						</div>
// 					</div>
// 				</div>

// 				<div style={{ ...styles.card, marginTop: 24 }}>
// 					<h3 style={{ marginBottom: 16 }}>📈 Changes Summary</h3>
// 					<div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
// 						<div>
// 							Calories Consumed: 
// 							<span style={getChangeStyle(caloriesDiff, true)}>
// 								{caloriesDiff > 0 ? "+" : ""}{caloriesDiff.toLocaleString()} kcal
// 							</span>
// 						</div>
// 						<div>
// 							Calories Burned: 
// 							<span style={getChangeStyle(burnedDiff)}>
// 								{burnedDiff > 0 ? "+" : ""}{burnedDiff.toLocaleString()} kcal
// 							</span>
// 						</div>
// 						<div>
// 							Workouts: 
// 							<span style={getChangeStyle(workoutsDiff)}>
// 								{workoutsDiff > 0 ? "+" : ""}{workoutsDiff}
// 							</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	};

// 	const titles = {
// 		meals: "🍎 Meals from Last Week",
// 		workouts: "💪 Workout History",
// 		compare: "📊 Compare This Month vs Last Month",
// 	};

// 	if (loading) {
// 		return (
// 			<div style={styles.container}>
// 				<p style={{ color: "#fff" }}>Loading...</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div style={styles.container}>
// 			<div style={styles.header}>
// 				<h2 style={{ color: "#fff" }}>{titles[type] || "History"}</h2>
// 			</div>

// 			{type === "meals" && renderMealsHistory()}
// 			{type === "workouts" && renderWorkoutsHistory()}
// 			{type === "compare" && renderComparison()}
// 		</div>
// 	);
// };

// export default History;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";

const History = () => {
	const { type } = useParams();
	const [data, setData] = useState([]);
	const [comparison, setComparison] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadData();
	}, [type]);

	const loadData = async () => {
		setLoading(true);
		try {
			if (type === "meals") {
				const res = await api.get("/meals/history/week");
				setData(res.data);
			} else if (type === "workouts") {
				const res = await api.get("/workouts/history/all");
				setData(res.data);
			} else if (type === "compare") {
				const res = await api.get("/analytics/compare-months");
				setComparison(res.data);
			}
		} catch (err) {
			console.error("Failed to load history", err);
		} finally {
			setLoading(false);
		}
	};

	const exportToCSV = (items, filename) => {
		if (!items.length) return alert("No data to export");

		const headers = Object.keys(items[0]).filter(k => k !== "_id" && k !== "__v" && k !== "user");
		const csvContent = [
			headers.join(","),
			...items.map(item =>
				headers.map(h => {
					const val = item[h];
					if (h === "date") return new Date(val).toLocaleDateString();
					return typeof val === "string" && val.includes(",") ? `"${val}"` : val;
				}).join(",")
			),
		].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${filename}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const styles = {

		container: {
			minHeight: "100vh",
			padding: "40px 20px",
			background: "linear-gradient(135deg,#0f172a,#111827,#1f2937)",
			color: "#fff",
			fontFamily: "system-ui"
		},

		content: {
			maxWidth: 1100,
			margin: "0 auto"
		},

		header: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 30
		},

		title: {
			fontSize: 28,
			fontWeight: 700
		},

		exportBtn: {
			padding: "10px 20px",
			background: "linear-gradient(to right,#22c55e,#16a34a)",
			border: "none",
			borderRadius: 10,
			color: "#fff",
			cursor: "pointer",
			fontWeight: 600
		},

		card: {
			background: "rgba(31,41,55,0.85)",
			padding: 24,
			borderRadius: 16,
			boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
			backdropFilter: "blur(10px)",
			marginBottom: 20
		},

		table: {
			width: "100%",
			borderCollapse: "collapse"
		},

		th: {
			textAlign: "left",
			padding: "14px 10px",
			fontSize: 13,
			color: "#9ca3af",
			borderBottom: "1px solid #374151"
		},

		td: {
			padding: "14px 10px",
			borderBottom: "1px solid #1f2937",
			fontSize: 14
		},

		rowHover: {
			transition: "0.2s"
		},

		empty: {
			textAlign: "center",
			padding: 30,
			color: "#9ca3af"
		},

		compareGrid: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			gap: 24
		},

		compareCard: {
			background: "rgba(31,41,55,0.85)",
			padding: 26,
			borderRadius: 16,
			boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
			textAlign: "center"
		},

		statValue: {
			fontSize: 36,
			fontWeight: 700,
			marginTop: 10
		},

		statLabel: {
			fontSize: 13,
			color: "#9ca3af"
		},

		changeIndicator: {
			display: "inline-block",
			padding: "6px 14px",
			borderRadius: 20,
			fontSize: 13,
			fontWeight: 600,
			marginLeft: 8
		}
	};

	const renderMealsHistory = () => (
		<div style={styles.card}>
			<table style={styles.table}>
				<thead>
					<tr>
						<th style={styles.th}>Date</th>
						<th style={styles.th}>Meal</th>
						<th style={styles.th}>Calories</th>
						<th style={styles.th}>Protein</th>
						<th style={styles.th}>Carbs</th>
						<th style={styles.th}>Fats</th>
					</tr>
				</thead>

				<tbody>
					{data.map((meal, idx) => (
						<tr key={idx}>
							<td style={styles.td}>{new Date(meal.date).toLocaleDateString()}</td>
							<td style={styles.td}>{meal.name}</td>
							<td style={styles.td}>{meal.calories} kcal</td>
							<td style={styles.td}>{meal.protein || 0}g</td>
							<td style={styles.td}>{meal.carbs || 0}g</td>
							<td style={styles.td}>{meal.fats || 0}g</td>
						</tr>
					))}
				</tbody>
			</table>

			{data.length === 0 && (
				<div style={styles.empty}>No meals logged in the last week</div>
			)}
		</div>
	);

	const renderWorkoutsHistory = () => (
		<>
			<div style={{ marginBottom: 16 }}>
				<button
					onClick={() => exportToCSV(data, "workout_history")}
					style={styles.exportBtn}
				>
					📥 Export to CSV
				</button>
			</div>

			<div style={styles.card}>
				<table style={styles.table}>
					<thead>
						<tr>
							<th style={styles.th}>Date</th>
							<th style={styles.th}>Workout Type</th>
							<th style={styles.th}>Duration</th>
							<th style={styles.th}>Calories Burned</th>
						</tr>
					</thead>

					<tbody>
						{data.map((workout, idx) => (
							<tr key={idx}>
								<td style={styles.td}>{new Date(workout.date).toLocaleDateString()}</td>
								<td style={styles.td}>{workout.type}</td>
								<td style={styles.td}>{workout.duration} mins</td>
								<td style={styles.td}>{workout.caloriesBurned} kcal</td>
							</tr>
						))}
					</tbody>
				</table>

				{data.length === 0 && (
					<div style={styles.empty}>No workouts logged yet</div>
				)}
			</div>
		</>
	);

	const renderComparison = () => {
		if (!comparison) return <p>No comparison data available</p>;

		const { thisMonth, lastMonth } = comparison;

		const caloriesDiff = thisMonth.caloriesConsumed - lastMonth.caloriesConsumed;
		const workoutsDiff = thisMonth.workouts - lastMonth.workouts;
		const burnedDiff = thisMonth.caloriesBurned - lastMonth.caloriesBurned;

		const getChangeStyle = (diff, inverse = false) => ({
			...styles.changeIndicator,
			background: (inverse ? diff < 0 : diff > 0) ? "#16a34a33" : diff === 0 ? "#374151" : "#dc262633",
			color: (inverse ? diff < 0 : diff > 0) ? "#22c55e" : diff === 0 ? "#9ca3af" : "#ef4444"
		});

		return (
			<div>

				<div style={styles.compareGrid}>

					<div style={styles.compareCard}>
						<h3>📅 This Month</h3>

						<div style={styles.statValue}>{thisMonth.caloriesConsumed.toLocaleString()}</div>
						<div style={styles.statLabel}>Calories Consumed</div>

						<div style={styles.statValue}>{thisMonth.caloriesBurned.toLocaleString()}</div>
						<div style={styles.statLabel}>Calories Burned</div>

						<div style={styles.statValue}>{thisMonth.workouts}</div>
						<div style={styles.statLabel}>Workouts</div>

						<div style={styles.statValue}>{thisMonth.meals}</div>
						<div style={styles.statLabel}>Meals Logged</div>
					</div>

					<div style={styles.compareCard}>
						<h3>📆 Last Month</h3>

						<div style={styles.statValue}>{lastMonth.caloriesConsumed.toLocaleString()}</div>
						<div style={styles.statLabel}>Calories Consumed</div>

						<div style={styles.statValue}>{lastMonth.caloriesBurned.toLocaleString()}</div>
						<div style={styles.statLabel}>Calories Burned</div>

						<div style={styles.statValue}>{lastMonth.workouts}</div>
						<div style={styles.statLabel}>Workouts</div>

						<div style={styles.statValue}>{lastMonth.meals}</div>
						<div style={styles.statLabel}>Meals Logged</div>
					</div>

				</div>

				<div style={{ ...styles.card, marginTop: 24 }}>
					<h3 style={{ marginBottom: 16 }}>📈 Changes Summary</h3>

					<div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
						<div>
							Calories Consumed
							<span style={getChangeStyle(caloriesDiff, true)}>
								{caloriesDiff > 0 ? "+" : ""}
								{caloriesDiff.toLocaleString()} kcal
							</span>
						</div>

						<div>
							Calories Burned
							<span style={getChangeStyle(burnedDiff)}>
								{burnedDiff > 0 ? "+" : ""}
								{burnedDiff.toLocaleString()} kcal
							</span>
						</div>

						<div>
							Workouts
							<span style={getChangeStyle(workoutsDiff)}>
								{workoutsDiff > 0 ? "+" : ""}
								{workoutsDiff}
							</span>
						</div>
					</div>
				</div>

			</div>
		);
	};

	const titles = {
		meals: "🍎 Meals from Last Week",
		workouts: "💪 Workout History",
		compare: "📊 Compare This Month vs Last Month"
	};

	if (loading) {
		return (
			<div style={styles.container}>
				<div style={styles.content}>Loading...</div>
			</div>
		);
	}

	return (
		<div style={styles.container}>
			<div style={styles.content}>

				<div style={styles.header}>
					<h2 style={styles.title}>{titles[type] || "History"}</h2>
				</div>

				{type === "meals" && renderMealsHistory()}
				{type === "workouts" && renderWorkoutsHistory()}
				{type === "compare" && renderComparison()}

			</div>
		</div>
	);
};

export default History;