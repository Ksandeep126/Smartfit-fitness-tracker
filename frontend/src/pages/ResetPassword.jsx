// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/axiosClient";

// const ResetPassword = () => {
// 	const nav = useNavigate();
// 	const [email, setEmail] = useState("");
// 	const [currentPassword, setCurrentPassword] = useState("");
// 	const [newPassword, setNewPassword] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");
// 	const [message, setMessage] = useState("");
// 	const [error, setError] = useState("");

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setMessage("");
// 		setError("");

// 		if (newPassword !== confirmPassword) {
// 			setError("Passwords do not match");
// 			return;
// 		}

// 		if (newPassword.length < 6) {
// 			setError("Password must be at least 6 characters");
// 			return;
// 		}

// 		try {
// 			const res = await api.post("/auth/reset-password", {
// 				email,
// 				currentPassword,
// 				newPassword,
// 			});
// 			setMessage(res.data.message);
// 			setTimeout(() => nav("/login"), 2000);
// 		} catch (err) {
// 			setError(err.response?.data?.message || "Reset failed");
// 		}
// 	};

// 	return (
// 		<div
// 			style={{
// 				minHeight: "100vh",
// 				display: "flex",
// 				alignItems: "center",
// 				justifyContent: "center",
// 				padding: 20,
// 			}}
// 		>
// 			<div
// 				style={{
// 					maxWidth: 400,
// 					width: "100%",
// 					background: "rgba(255, 255, 255, 0.95)",
// 					padding: 30,
// 					borderRadius: 12,
// 					boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
// 				}}
// 			>
// 				<h2 style={{ textAlign: "center", marginBottom: 20, color: "#2c3e50" }}>
// 					Reset Password
// 				</h2>

// 				{message && (
// 					<div
// 						style={{
// 							background: "#d4edda",
// 							color: "#155724",
// 							padding: 12,
// 							borderRadius: 8,
// 							marginBottom: 15,
// 							textAlign: "center",
// 						}}
// 					>
// 						{message}
// 					</div>
// 				)}

// 				{error && (
// 					<div
// 						style={{
// 							background: "#f8d7da",
// 							color: "#721c24",
// 							padding: 12,
// 							borderRadius: 8,
// 							marginBottom: 15,
// 							textAlign: "center",
// 						}}
// 					>
// 						{error}
// 					</div>
// 				)}

// 				<form onSubmit={handleSubmit}>
// 					<input
// 						placeholder="Email"
// 						type="email"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						required
// 						style={{
// 							display: "block",
// 							marginBottom: 15,
// 							width: "100%",
// 							padding: "12px",
// 							border: "1px solid #ddd",
// 							borderRadius: 8,
// 							fontSize: 16,
// 							boxSizing: "border-box",
// 						}}
// 					/>
// 					<input
// 						placeholder="Current Password"
// 						type="password"
// 						value={currentPassword}
// 						onChange={(e) => setCurrentPassword(e.target.value)}
// 						required
// 						style={{
// 							display: "block",
// 							marginBottom: 15,
// 							width: "100%",
// 							padding: "12px",
// 							border: "1px solid #ddd",
// 							borderRadius: 8,
// 							fontSize: 16,
// 							boxSizing: "border-box",
// 						}}
// 					/>
// 					<input
// 						placeholder="New Password"
// 						type="password"
// 						value={newPassword}
// 						onChange={(e) => setNewPassword(e.target.value)}
// 						required
// 						style={{
// 							display: "block",
// 							marginBottom: 15,
// 							width: "100%",
// 							padding: "12px",
// 							border: "1px solid #ddd",
// 							borderRadius: 8,
// 							fontSize: 16,
// 							boxSizing: "border-box",
// 						}}
// 					/>
// 					<input
// 						placeholder="Confirm New Password"
// 						type="password"
// 						value={confirmPassword}
// 						onChange={(e) => setConfirmPassword(e.target.value)}
// 						required
// 						style={{
// 							display: "block",
// 							marginBottom: 20,
// 							width: "100%",
// 							padding: "12px",
// 							border: "1px solid #ddd",
// 							borderRadius: 8,
// 							fontSize: 16,
// 							boxSizing: "border-box",
// 						}}
// 					/>
// 					<button
// 						type="submit"
// 						style={{
// 							width: "100%",
// 							padding: "12px",
// 							background: "#e74c3c",
// 							color: "#fff",
// 							border: "none",
// 							borderRadius: 8,
// 							fontSize: 16,
// 							fontWeight: 600,
// 							cursor: "pointer",
// 						}}
// 					>
// 						Reset Password
// 					</button>
// 				</form>
// 				<p style={{ marginTop: 15, textAlign: "center", color: "#666" }}>
// 					Remember your password?{" "}
// 					<Link to="/login" style={{ color: "#27ae60", fontWeight: 500 }}>
// 						Login
// 					</Link>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default ResetPassword;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosClient";

const ResetPassword = () => {
	const nav = useNavigate();
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");

		if (newPassword !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (newPassword.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}

		try {
			const res = await api.post("/auth/reset-password", {
				email,
				currentPassword,
				newPassword,
			});
			setMessage(res.data.message);
			setTimeout(() => nav("/login"), 2000);
		} catch (err) {
			setError(err.response?.data?.message || "Reset failed");
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "linear-gradient(135deg, #0f172a, #111827)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
			}}
		>
			<div
				style={{
					maxWidth: 430,
					width: "100%",
					background: "#1f2937",
					padding: "40px 35px",
					borderRadius: 20,
					boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
					color: "#fff",
				}}
			>
				<h2
					style={{
						textAlign: "center",
						marginBottom: 10,
						fontWeight: 600,
					}}
				>
					Reset Password
				</h2>

				<p
					style={{
						textAlign: "center",
						marginBottom: 25,
						fontSize: 14,
						color: "#9ca3af",
					}}
				>
					Update your account credentials securely
				</p>

				{message && (
					<div
						style={{
							background: "#064e3b",
							color: "#34d399",
							padding: 12,
							borderRadius: 10,
							marginBottom: 18,
							textAlign: "center",
							fontSize: 14,
						}}
					>
						{message}
					</div>
				)}

				{error && (
					<div
						style={{
							background: "#7f1d1d",
							color: "#f87171",
							padding: 12,
							borderRadius: 10,
							marginBottom: 18,
							textAlign: "center",
							fontSize: 14,
						}}
					>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						style={inputStyle}
					/>

					<input
						type="password"
						placeholder="Current Password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						required
						style={inputStyle}
					/>

					<input
						type="password"
						placeholder="New Password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
						style={inputStyle}
					/>

					<input
						type="password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						style={{
							...inputStyle,
							marginBottom: 25,
						}}
					/>

					<button
						type="submit"
						style={{
							width: "100%",
							padding: "14px",
							background: "#ef4444",
							color: "#fff",
							border: "none",
							borderRadius: 12,
							fontSize: 16,
							fontWeight: 600,
							cursor: "pointer",
							transition: "0.3s",
						}}
						onMouseOver={(e) =>
							(e.target.style.background = "#dc2626")
						}
						onMouseOut={(e) =>
							(e.target.style.background = "#ef4444")
						}
					>
						Reset Password
					</button>
				</form>

				<p
					style={{
						marginTop: 20,
						textAlign: "center",
						fontSize: 14,
						color: "#9ca3af",
					}}
				>
					Remember your password?{" "}
					<Link
						to="/login"
						style={{
							color: "#22c55e",
							fontWeight: 600,
							textDecoration: "none",
						}}
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

const inputStyle = {
	display: "block",
	marginBottom: 18,
	width: "100%",
	padding: "14px",
	border: "1px solid #374151",
	borderRadius: 12,
	fontSize: 15,
	background: "#111827",
	color: "#fff",
	outline: "none",
};

export default ResetPassword;