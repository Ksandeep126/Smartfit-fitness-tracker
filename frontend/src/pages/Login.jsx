// import React from "react";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
// 	const { login, user } = useAuth();
// 	const nav = useNavigate();
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const userData = await login(email, password);
// 			// Check if profile is complete
// 			if (!userData.age || !userData.heightCm || !userData.weightKg) {
// 				nav("/profile");
// 			} else {
// 				nav("/");
// 			}
// 		} catch (err) {
// 			alert("Login failed");
// 		}
// 	};

// 	return (
// 		<div
// 			style={{
// 				minHeight: "100vh",
				
// 				backgroundSize: "cover",
// 				backgroundPosition: "center",
// 				backgroundRepeat: "no-repeat",
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
// 				<div style={{ textAlign: "center", marginBottom: 20 }}>
// 					<img src="/images/LOGOO.jpg" alt="SmartFit" style={{ height: 80, borderRadius: 12, marginBottom: 12 }} />
// 					<h2 style={{ color: "#2c3e50", margin: 0 }}>Welcome to SmartFit</h2>
// 				</div>
// 				<form onSubmit={handleSubmit}>
// 					<input
// 						placeholder="Email"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
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
// 						placeholder="Password"
// 						type="password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
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
// 							background: "#27ae60",
// 							color: "#fff",
// 							border: "none",
// 							borderRadius: 8,
// 							fontSize: 16,
// 							fontWeight: 600,
// 							cursor: "pointer",
// 						}}
// 					>
// 						Login
// 					</button>
// 				</form>
// 				<p style={{ marginTop: 15, textAlign: "center", color: "#666" }}>
// 					No account? <Link to="/register" style={{ color: "#27ae60", fontWeight: 500 }}>Register</Link>
// 				</p>
// 				<p style={{ marginTop: 10, textAlign: "center" }}>
// 					<Link to="/reset-password" style={{ color: "#e74c3c", fontWeight: 500 }}>Forgot Password?</Link>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const { login } = useAuth();
	const nav = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await login(email, password);

			if (!userData.age || !userData.heightCm || !userData.weightKg) {
				nav("/profile");
			} else {
				nav("/");
			}
		} catch (err) {
			alert("Login failed");
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
					maxWidth: 420,
					width: "100%",
					background: "#1f2937",
					padding: "40px 35px",
					borderRadius: 20,
					boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
					color: "#fff",
				}}
			>
				<div style={{ textAlign: "center", marginBottom: 30 }}>
					<img
						src="/images/LOGOO.jpg"
						alt="SmartFit"
						style={{
							height: 75,
							borderRadius: 14,
							marginBottom: 15,
						}}
					/>
					<h2 style={{ margin: 0, fontWeight: 600 }}>
						Welcome Back
					</h2>
					<p style={{ marginTop: 6, fontSize: 14, color: "#9ca3af" }}>
						Login to continue your fitness journey
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={{
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
						}}
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						style={{
							display: "block",
							marginBottom: 22,
							width: "100%",
							padding: "14px",
							border: "1px solid #374151",
							borderRadius: 12,
							fontSize: 15,
							background: "#111827",
							color: "#fff",
							outline: "none",
						}}
					/>

					<button
						type="submit"
						style={{
							width: "100%",
							padding: "14px",
							background: "#22c55e",
							color: "#fff",
							border: "none",
							borderRadius: 12,
							fontSize: 16,
							fontWeight: 600,
							cursor: "pointer",
							transition: "0.3s",
						}}
						onMouseOver={(e) =>
							(e.target.style.background = "#16a34a")
						}
						onMouseOut={(e) =>
							(e.target.style.background = "#22c55e")
						}
					>
						Login
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
					Don’t have an account?{" "}
					<Link
						to="/register"
						style={{
							color: "#22c55e",
							fontWeight: 600,
							textDecoration: "none",
						}}
					>
						Register
					</Link>
				</p>

				<p style={{ marginTop: 10, textAlign: "center" }}>
					<Link
						to="/reset-password"
						style={{
							color: "#ef4444",
							fontWeight: 500,
							fontSize: 14,
							textDecoration: "none",
						}}
					>
						Forgot Password?
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;