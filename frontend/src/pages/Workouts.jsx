// import React from "react";
// import { useEffect, useState } from "react";
// import api from "../api/axiosClient";

// const Workouts = () => {
// 	const [type, setType] = useState("");
// 	const [durationMin, setDurationMin] = useState("");
// 	const [caloriesBurned, setCaloriesBurned] = useState("");
// 	const [workouts, setWorkouts] = useState([]);
// 	const [total, setTotal] = useState(0);

// 	const loadToday = async () => {
// 		const res = await api.get("/workouts/today");
// 		setWorkouts(res.data.workouts);
// 		setTotal(res.data.totalCaloriesBurned);
// 	};

// 	useEffect(() => {
// 		loadToday();
// 	}, []);

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			await api.post("/workouts", {
// 				type,
// 				durationMin: Number(durationMin),
// 				caloriesBurned: caloriesBurned ? Number(caloriesBurned) : undefined,
// 			});
// 			setType("");
// 			setDurationMin("");
// 			setCaloriesBurned("");
// 			await loadToday();
// 		} catch (err) {
// 			alert("Failed to add workout: " + (err.response?.data?.message || "Please try again"));
// 		}
// 	};

// 	const cardStyle = {
// 		background: "rgba(255, 255, 255, 0.95)",
// 		borderRadius: 12,
// 		padding: 24,
// 		marginBottom: 20,
// 		boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
// 	};

// 	const inputStyle = {
// 		padding: "10px 14px",
// 		border: "1px solid #ddd",
// 		borderRadius: 8,
// 		fontSize: 15,
// 		marginRight: 10,
// 		marginBottom: 10,
// 		boxSizing: "border-box",
// 	};

// 	return (
// 		<div style={{ maxWidth: 800, margin: "20px auto", padding: "0 20px" }}>
// 			<div style={cardStyle}>
// 				<h2 style={{ color: "#2c3e50", marginTop: 0 }}>Workouts</h2>
// 				<p style={{ color: "#666" }}>Today's burned calories: <strong style={{ color: "#e74c3c" }}>{total} kcal</strong></p>
// 				<form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
// 					<input
// 						placeholder="Workout type (Running, Yoga...)"
// 						value={type}
// 						onChange={(e) => setType(e.target.value)}
// 						style={inputStyle}
// 					/>
// 					<input
// 						placeholder="Duration (min)"
// 						value={durationMin}
// 						onChange={(e) => setDurationMin(e.target.value)}
// 						style={inputStyle}
// 					/>
// 					<input
// 						placeholder="Calories burned (optional)"
// 						value={caloriesBurned}
// 						onChange={(e) => setCaloriesBurned(e.target.value)}
// 						style={inputStyle}
// 					/>
// 					<button type="submit" style={{
// 						padding: "10px 20px",
// 						background: "#27ae60",
// 						color: "#fff",
// 						border: "none",
// 						borderRadius: 8,
// 						fontSize: 15,
// 						fontWeight: 600,
// 						cursor: "pointer",
// 						marginBottom: 10,
// 					}}>Add Workout</button>
// 				</form>
// 			</div>

// 			{workouts.length > 0 && (
// 				<div style={cardStyle}>
// 					<h3 style={{ color: "#2c3e50", marginTop: 0 }}>Today's Workouts</h3>
// 					{workouts.map((w) => (
// 						<div key={w._id} style={{
// 							padding: "12px 16px",
// 							borderBottom: "1px solid #eee",
// 							display: "flex",
// 							justifyContent: "space-between",
// 							color: "#333",
// 						}}>
// 							<span><strong>{w.type}</strong> – {w.durationMin} min</span>
// 							<span style={{ color: "#e74c3c", fontWeight: 600 }}>{w.caloriesBurned} kcal</span>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Workouts;

import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";

const Workouts = () => {
	const [type, setType] = useState("");
	const [durationMin, setDurationMin] = useState("");
	const [caloriesBurned, setCaloriesBurned] = useState("");
	const [workouts, setWorkouts] = useState([]);
	const [total, setTotal] = useState(0);

	const loadToday = async () => {
		const res = await api.get("/workouts/today");
		setWorkouts(res.data.workouts);
		setTotal(res.data.totalCaloriesBurned);
	};

	useEffect(() => {
		loadToday();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/workouts", {
				type,
				durationMin: Number(durationMin),
				caloriesBurned: caloriesBurned
					? Number(caloriesBurned)
					: undefined,
			});
			setType("");
			setDurationMin("");
			setCaloriesBurned("");
			await loadToday();
		} catch (err) {
			alert(
				"Failed to add workout: " +
					(err.response?.data?.message || "Please try again")
			);
		}
	};

	return (
		<div style={styles.container}>
			{/* Header Card */}
			<div style={styles.card}>
				<h2 style={styles.heading}>Workouts</h2>

				<div style={styles.totalBox}>
					<span style={styles.totalLabel}>
						Today's Burned Calories
					</span>
					<span style={styles.totalValue}>{total} kcal</span>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} style={styles.formGrid}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Workout Type</label>
						<input
							value={type}
							onChange={(e) => setType(e.target.value)}
							style={styles.input}
							placeholder="Running, Yoga..."
							required
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Duration (Minutes)</label>
						<input
							type="number"
							value={durationMin}
							onChange={(e) =>
								setDurationMin(e.target.value)
							}
							style={styles.input}
							required
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>
							Calories Burned (Optional)
						</label>
						<input
							type="number"
							value={caloriesBurned}
							onChange={(e) =>
								setCaloriesBurned(e.target.value)
							}
							style={styles.input}
						/>
					</div>

					<button type="submit" style={styles.button}>
						Add Workout
					</button>
				</form>
			</div>

			{/* Workout List */}
			{workouts.length > 0 && (
				<div style={styles.card}>
					<h3 style={styles.subHeading}>
						Today's Workouts
					</h3>

					<div style={styles.list}>
						{workouts.map((w) => (
							<div key={w._id} style={styles.listItem}>
								<div>
									<div style={styles.workoutType}>
										{w.type}
									</div>
									<div style={styles.workoutMeta}>
										{w.durationMin} min
									</div>
								</div>

								<div style={styles.calorieTag}>
									{w.caloriesBurned} kcal
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

/* ---------------- STYLES ---------------- */

const styles = {
	container: {
		maxWidth: 900,
		margin: "40px auto",
		padding: "0 20px",
	},

	card: {
		background: "#1f2937",
		padding: 25,
		borderRadius: 18,
		marginBottom: 25,
		boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
	},

	heading: {
		color: "#ffffff",
		marginTop: 0,
		marginBottom: 20,
	},

	subHeading: {
		color: "#ffffff",
		marginTop: 0,
		marginBottom: 15,
	},

	totalBox: {
		background: "#111827",
		padding: 15,
		borderRadius: 12,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},

	totalLabel: {
		color: "#9ca3af",
		fontSize: 14,
	},

	totalValue: {
		color: "#ef4444",
		fontWeight: 700,
		fontSize: 18,
	},

	formGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: 18,
		alignItems: "end",
	},

	inputGroup: {
		display: "flex",
		flexDirection: "column",
	},

	label: {
		fontSize: 13,
		color: "#9ca3af",
		marginBottom: 6,
	},

	input: {
		padding: "11px 12px",
		borderRadius: 10,
		border: "1px solid #374151",
		background: "#111827",
		color: "#ffffff",
		fontSize: 14,
		outline: "none",
	},

	button: {
		padding: "12px",
		borderRadius: 10,
		border: "none",
		background: "#22c55e",
		color: "#fff",
		fontWeight: 600,
		cursor: "pointer",
	},

	list: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},

	listItem: {
		background: "#111827",
		padding: 15,
		borderRadius: 12,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	workoutType: {
		color: "#ffffff",
		fontWeight: 600,
	},

	workoutMeta: {
		color: "#9ca3af",
		fontSize: 13,
		marginTop: 4,
	},

	calorieTag: {
		background: "#7f1d1d",
		color: "#fca5a5",
		padding: "6px 10px",
		borderRadius: 8,
		fontWeight: 600,
		fontSize: 13,
	},
};

export default Workouts;
