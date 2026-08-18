// import React from "react";
// import { useEffect, useState } from "react";
// import api from "../api/axiosClient";

// const Habits = () => {
// 	const [sleepHours, setSleepHours] = useState("");
// 	const [waterLiters, setWaterLiters] = useState("");
// 	const [steps, setSteps] = useState("");
// 	const [list, setList] = useState([]);

// 	const loadHabits = async () => {
// 		const res = await api.get("/habits");
// 		setList(res.data);
// 	};

// 	useEffect(() => {
// 		loadHabits();
// 	}, []);

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			await api.post("/habits", {
// 				sleepHours: sleepHours ? Number(sleepHours) : undefined,
// 				waterLiters: waterLiters ? Number(waterLiters) : undefined,
// 				steps: steps ? Number(steps) : undefined,
// 			});
// 			setSleepHours("");
// 			setWaterLiters("");
// 			setSteps("");
// 			await loadHabits();
// 		} catch (err) {
// 			alert("Failed to save habits: " + (err.response?.data?.message || "Please try again"));
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
// 				<h2 style={{ color: "#2c3e50", marginTop: 0 }}>Habits</h2>
// 				<form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
// 					<input
// 						placeholder="Sleep (hours)"
// 						value={sleepHours}
// 						onChange={(e) => setSleepHours(e.target.value)}
// 						style={inputStyle}
// 					/>
// 					<input
// 						placeholder="Water (liters)"
// 						value={waterLiters}
// 						onChange={(e) => setWaterLiters(e.target.value)}
// 						style={inputStyle}
// 					/>
// 					<input
// 						placeholder="Steps"
// 						value={steps}
// 						onChange={(e) => setSteps(e.target.value)}
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
// 					}}>Save Today</button>
// 				</form>
// 			</div>

// 			{list.length > 0 && (
// 				<div style={cardStyle}>
// 					<h3 style={{ color: "#2c3e50", marginTop: 0 }}>Habit History</h3>
// 					{list.map((h) => (
// 						<div key={h._id} style={{
// 							padding: "12px 16px",
// 							borderBottom: "1px solid #eee",
// 							display: "flex",
// 							justifyContent: "space-between",
// 							color: "#333",
// 							fontSize: 14,
// 						}}>
// 							<span style={{ fontWeight: 600 }}>{new Date(h.date).toLocaleDateString()}</span>
// 							<span>Sleep: {h.sleepHours || 0}h | Water: {h.waterLiters || 0}L | Steps: {h.steps || 0}</span>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Habits;

import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";

const Habits = () => {
	const [sleepHours, setSleepHours] = useState("");
	const [waterLiters, setWaterLiters] = useState("");
	const [steps, setSteps] = useState("");
	const [list, setList] = useState([]);

	const loadHabits = async () => {
		const res = await api.get("/habits");
		setList(res.data);
	};

	useEffect(() => {
		loadHabits();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/habits", {
				sleepHours: sleepHours ? Number(sleepHours) : undefined,
				waterLiters: waterLiters ? Number(waterLiters) : undefined,
				steps: steps ? Number(steps) : undefined,
			});
			setSleepHours("");
			setWaterLiters("");
			setSteps("");
			await loadHabits();
		} catch (err) {
			alert(
				"Failed to save habits: " +
					(err.response?.data?.message || "Please try again")
			);
		}
	};

	return (
		<div style={styles.container}>
			{/* Form Card */}
			<div style={styles.card}>
				<h2 style={styles.heading}>Daily Habits</h2>

				<form onSubmit={handleSubmit} style={styles.formGrid}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Sleep (Hours)</label>
						<input
							type="number"
							value={sleepHours}
							onChange={(e) => setSleepHours(e.target.value)}
							style={styles.input}
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Water Intake (Liters)</label>
						<input
							type="number"
							value={waterLiters}
							onChange={(e) => setWaterLiters(e.target.value)}
							style={styles.input}
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Steps</label>
						<input
							type="number"
							value={steps}
							onChange={(e) => setSteps(e.target.value)}
							style={styles.input}
						/>
					</div>

					<button type="submit" style={styles.button}>
						Save Today
					</button>
				</form>
			</div>

			{/* History Card */}
			{list.length > 0 && (
				<div style={styles.card}>
					<h3 style={styles.subHeading}>Habit History</h3>

					<div style={styles.historyList}>
						{list.map((h) => (
							<div key={h._id} style={styles.historyItem}>
								<div style={styles.date}>
									{new Date(h.date).toLocaleDateString()}
								</div>

								<div style={styles.metrics}>
									<span style={styles.metricBox}>
										😴 {h.sleepHours || 0}h
									</span>
									<span style={styles.metricBox}>
										💧 {h.waterLiters || 0}L
									</span>
									<span style={styles.metricBox}>
										👣 {h.steps || 0}
									</span>
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

	historyList: {
		display: "flex",
		flexDirection: "column",
		gap: 12,
	},

	historyItem: {
		background: "#111827",
		padding: 15,
		borderRadius: 12,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
	},

	date: {
		color: "#9ca3af",
		fontSize: 14,
		fontWeight: 600,
	},

	metrics: {
		display: "flex",
		gap: 10,
		marginTop: 6,
	},

	metricBox: {
		background: "#0f172a",
		padding: "6px 10px",
		borderRadius: 8,
		color: "#e5e7eb",
		fontSize: 13,
		fontWeight: 500,
	},
};

export default Habits;
