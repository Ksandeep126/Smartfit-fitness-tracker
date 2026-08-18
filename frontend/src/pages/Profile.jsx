// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axiosClient";

// const Profile = () => {
// 	const { user, fetchProfile } = useAuth();
// 	const nav = useNavigate();
	
// 	const [formData, setFormData] = useState({
// 		age: "",
// 		gender: "other",
// 		heightCm: "",
// 		weightKg: "",
// 		goal: "maintenance",
// 		dietaryPrefs: "",
// 	});
// 	const [loading, setLoading] = useState(false);

// 	useEffect(() => {
// 		if (user) {
// 			setFormData({
// 				age: user.age || "",
// 				gender: user.gender || "other",
// 				heightCm: user.heightCm || "",
// 				weightKg: user.weightKg || "",
// 				goal: user.goal || "maintenance",
// 				dietaryPrefs: user.dietaryPrefs || "",
// 			});
// 		}
// 	}, [user]);

// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);

// 		try {
// 			// Calculate daily calorie target based on profile
// 			const bmr = formData.gender === "male"
// 				? 10 * formData.weightKg + 6.25 * formData.heightCm - 5 * formData.age + 5
// 				: 10 * formData.weightKg + 6.25 * formData.heightCm - 5 * formData.age - 161;
			
// 			const tdee = bmr * 1.55; // Moderate activity
// 			let dailyCalorieTarget = Math.round(tdee);
			
// 			if (formData.goal === "weight_loss") dailyCalorieTarget -= 500;
// 			if (formData.goal === "muscle_gain") dailyCalorieTarget += 500;

// 			await api.put("/users/me", {
// 				...formData,
// 				age: Number(formData.age),
// 				heightCm: Number(formData.heightCm),
// 				weightKg: Number(formData.weightKg),
// 				dailyCalorieTarget,
// 			});

// 			await fetchProfile();
// 			nav("/");
// 		} catch (err) {
// 			alert("Failed to save profile");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const isFirstTime = !user?.age || !user?.heightCm || !user?.weightKg;

// 	const styles = {
// 		container: {
// 			minHeight: "100vh",
// 			display: "flex",
// 			alignItems: "center",
// 			justifyContent: "center",
// 			padding: 20,
// 		},
// 		card: {
// 			maxWidth: 500,
// 			width: "100%",
// 			background: "rgba(255, 255, 255, 0.95)",
// 			padding: 32,
// 			borderRadius: 16,
// 			boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
// 		},
// 		title: {
// 			textAlign: "center",
// 			marginBottom: 8,
// 			color: "#2c3e50",
// 			fontSize: 28,
// 		},
// 		subtitle: {
// 			textAlign: "center",
// 			marginBottom: 24,
// 			color: "#7f8c8d",
// 			fontSize: 14,
// 		},
// 		row: {
// 			display: "grid",
// 			gridTemplateColumns: "1fr 1fr",
// 			gap: 16,
// 			marginBottom: 16,
// 		},
// 		inputGroup: {
// 			marginBottom: 16,
// 		},
// 		label: {
// 			display: "block",
// 			marginBottom: 6,
// 			fontWeight: 500,
// 			color: "#34495e",
// 			fontSize: 14,
// 		},
// 		input: {
// 			width: "100%",
// 			padding: "12px",
// 			border: "1px solid #ddd",
// 			borderRadius: 8,
// 			fontSize: 16,
// 			boxSizing: "border-box",
// 		},
// 		select: {
// 			width: "100%",
// 			padding: "12px",
// 			border: "1px solid #ddd",
// 			borderRadius: 8,
// 			fontSize: 16,
// 			background: "#fff",
// 			cursor: "pointer",
// 		},
// 		button: {
// 			width: "100%",
// 			padding: "14px",
// 			background: "#27ae60",
// 			color: "#fff",
// 			border: "none",
// 			borderRadius: 8,
// 			fontSize: 16,
// 			fontWeight: 600,
// 			cursor: "pointer",
// 			marginTop: 8,
// 		},
// 		skipBtn: {
// 			width: "100%",
// 			padding: "12px",
// 			background: "transparent",
// 			color: "#7f8c8d",
// 			border: "1px solid #ddd",
// 			borderRadius: 8,
// 			fontSize: 14,
// 			cursor: "pointer",
// 			marginTop: 12,
// 		},
// 	};

// 	return (
// 		<div style={styles.container}>
// 			<div style={styles.card}>
// 				<h2 style={styles.title}>
// 					{isFirstTime ? "Complete Your Profile" : "Edit Profile"}
// 				</h2>
// 				<p style={styles.subtitle}>
// 					{isFirstTime
// 						? "Tell us about yourself to get personalized recommendations"
// 						: "Update your information to keep your plan accurate"}
// 				</p>

// 				<form onSubmit={handleSubmit}>
// 					<div style={styles.row}>
// 						<div>
// 							<label style={styles.label}>Age</label>
// 							<input
// 								type="number"
// 								name="age"
// 								value={formData.age}
// 								onChange={handleChange}
// 								placeholder="e.g. 25"
// 								style={styles.input}
// 								required
// 							/>
// 						</div>
// 						<div>
// 							<label style={styles.label}>Gender</label>
// 							<select
// 								name="gender"
// 								value={formData.gender}
// 								onChange={handleChange}
// 								style={styles.select}
// 							>
// 								<option value="male">Male</option>
// 								<option value="female">Female</option>
// 								<option value="other">Other</option>
// 							</select>
// 						</div>
// 					</div>

// 					<div style={styles.row}>
// 						<div>
// 							<label style={styles.label}>Height (cm)</label>
// 							<input
// 								type="number"
// 								name="heightCm"
// 								value={formData.heightCm}
// 								onChange={handleChange}
// 								placeholder="e.g. 170"
// 								style={styles.input}
// 								required
// 							/>
// 						</div>
// 						<div>
// 							<label style={styles.label}>Weight (kg)</label>
// 							<input
// 								type="number"
// 								name="weightKg"
// 								value={formData.weightKg}
// 								onChange={handleChange}
// 								placeholder="e.g. 70"
// 								style={styles.input}
// 								required
// 							/>
// 						</div>
// 					</div>

// 					<div style={styles.inputGroup}>
// 						<label style={styles.label}>Fitness Goal</label>
// 						<select
// 							name="goal"
// 							value={formData.goal}
// 							onChange={handleChange}
// 							style={styles.select}
// 						>
// 							<option value="weight_loss">Lose Weight</option>
// 							<option value="maintenance">Maintain Weight</option>
// 							<option value="muscle_gain">Build Muscle</option>
// 						</select>
// 					</div>

// 					<div style={styles.inputGroup}>
// 						<label style={styles.label}>Dietary Preferences (optional)</label>
// 						<input
// 							type="text"
// 							name="dietaryPrefs"
// 							value={formData.dietaryPrefs}
// 							onChange={handleChange}
// 							placeholder="e.g. Vegetarian, No dairy, etc."
// 							style={styles.input}
// 						/>
// 					</div>

// 					<button type="submit" style={styles.button} disabled={loading}>
// 						{loading ? "Saving..." : "Save Profile"}
// 					</button>

// 					{!isFirstTime && (
// 						<button
// 							type="button"
// 							style={styles.skipBtn}
// 							onClick={() => nav("/")}
// 						>
// 							Cancel
// 						</button>
// 					)}
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Profile;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosClient";

const Profile = () => {
	const { user, fetchProfile } = useAuth();
	const nav = useNavigate();

	const [formData, setFormData] = useState({
		age: "",
		gender: "other",
		heightCm: "",
		weightKg: "",
		goal: "maintenance",
		dietaryPrefs: "",
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (user) {
			setFormData({
				age: user.age || "",
				gender: user.gender || "other",
				heightCm: user.heightCm || "",
				weightKg: user.weightKg || "",
				goal: user.goal || "maintenance",
				dietaryPrefs: user.dietaryPrefs || "",
			});
		}
	}, [user]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const bmr =
				formData.gender === "male"
					? 10 * formData.weightKg +
					  6.25 * formData.heightCm -
					  5 * formData.age +
					  5
					: 10 * formData.weightKg +
					  6.25 * formData.heightCm -
					  5 * formData.age -
					  161;

			const tdee = bmr * 1.55;
			let dailyCalorieTarget = Math.round(tdee);

			if (formData.goal === "weight_loss") dailyCalorieTarget -= 500;
			if (formData.goal === "muscle_gain") dailyCalorieTarget += 500;

			await api.put("/users/me", {
				...formData,
				age: Number(formData.age),
				heightCm: Number(formData.heightCm),
				weightKg: Number(formData.weightKg),
				dailyCalorieTarget,
			});

			await fetchProfile();
			nav("/");
		} catch (err) {
			alert("Failed to save profile");
		} finally {
			setLoading(false);
		}
	};

	const isFirstTime = !user?.age || !user?.heightCm || !user?.weightKg;

	const styles = {
		container: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: 20,
			background: "linear-gradient(135deg,#0f172a,#111827,#1f2937)",
			fontFamily: "system-ui, sans-serif",
		},

		card: {
			maxWidth: 550,
			width: "100%",
			background: "rgba(31,41,55,0.95)",
			padding: 35,
			borderRadius: 20,
			boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
			color: "#fff",
			backdropFilter: "blur(10px)",
		},

		title: {
			textAlign: "center",
			marginBottom: 6,
			fontSize: 30,
			fontWeight: 700,
			background: "linear-gradient(to right,#22c55e,#3b82f6)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
		},

		subtitle: {
			textAlign: "center",
			marginBottom: 30,
			color: "#9ca3af",
			fontSize: 14,
		},

		row: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			gap: 20,
			marginBottom: 22,
		},

		field: {
			display: "flex",
			flexDirection: "column",
		},

		inputGroup: {
			marginBottom: 20,
		},

		label: {
			display: "block",
			marginBottom: 8,
			fontWeight: 500,
			fontSize: 14,
			color: "#d1d5db",
		},

		input: {
			width: "100%",
			padding: "12px 16px",
			border: "1px solid #374151",
			borderRadius: 12,
			fontSize: 15,
			background: "#111827",
			color: "#fff",
			outline: "none",
			boxSizing: "border-box",
		},

		select: {
			width: "100%",
			padding: "12px 14px",
			border: "1px solid #374151",
			borderRadius: 12,
			fontSize: 15,
			background: "#111827",
			color: "#fff",
			cursor: "pointer",
			outline: "none",
			boxSizing: "border-box",
		},

		button: {
			width: "100%",
			padding: "14px",
			background: "linear-gradient(to right,#22c55e,#16a34a)",
			color: "#fff",
			border: "none",
			borderRadius: 14,
			fontSize: 16,
			fontWeight: 600,
			cursor: "pointer",
			marginTop: 10,
			transition: "0.3s ease",
		},

		skipBtn: {
			width: "100%",
			padding: "12px",
			background: "transparent",
			color: "#9ca3af",
			border: "1px solid #374151",
			borderRadius: 14,
			fontSize: 14,
			cursor: "pointer",
			marginTop: 14,
			transition: "0.3s ease",
		},
	};

	return (
		<div style={styles.container}>
			<div style={styles.card}>
				<h2 style={styles.title}>
					{isFirstTime ? "Complete Your Profile" : "Edit Profile"}
				</h2>

				<p style={styles.subtitle}>
					{isFirstTime
						? "Tell us about yourself to personalize your meals, workouts & habits"
						: "Update your information to keep your SmartFit plan accurate"}
				</p>

				<form onSubmit={handleSubmit}>
					<div style={styles.row}>
						<div style={styles.field}>
							<label style={styles.label}>Age</label>
							<input
								type="number"
								name="age"
								value={formData.age}
								onChange={handleChange}
								placeholder="e.g. 25"
								style={styles.input}
								required
							/>
						</div>

						<div style={styles.field}>
							<label style={styles.label}>Gender</label>
							<select
								name="gender"
								value={formData.gender}
								onChange={handleChange}
								style={styles.select}
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>
						</div>
					</div>

					<div style={styles.row}>
						<div style={styles.field}>
							<label style={styles.label}>Height (cm)</label>
							<input
								type="number"
								name="heightCm"
								value={formData.heightCm}
								onChange={handleChange}
								placeholder="e.g. 170"
								style={styles.input}
								required
							/>
						</div>

						<div style={styles.field}>
							<label style={styles.label}>Weight (kg)</label>
							<input
								type="number"
								name="weightKg"
								value={formData.weightKg}
								onChange={handleChange}
								placeholder="e.g. 70"
								style={styles.input}
								required
							/>
						</div>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Fitness Goal</label>
						<select
							name="goal"
							value={formData.goal}
							onChange={handleChange}
							style={styles.select}
						>
							<option value="weight_loss">Lose Weight</option>
							<option value="maintenance">Maintain Weight</option>
							<option value="muscle_gain">Build Muscle</option>
						</select>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>
							Dietary Preferences (optional)
						</label>

						<input
							type="text"
							name="dietaryPrefs"
							value={formData.dietaryPrefs}
							onChange={handleChange}
							placeholder="Vegetarian, No dairy, High protein..."
							style={styles.input}
						/>
					</div>

					<button type="submit" style={styles.button} disabled={loading}>
						{loading ? "Saving..." : "Save Profile"}
					</button>

					{!isFirstTime && (
						<button
							type="button"
							style={styles.skipBtn}
							onClick={() => nav("/")}
						>
							Cancel
						</button>
					)}
				</form>
			</div>
		</div>
	);
};

export default Profile;