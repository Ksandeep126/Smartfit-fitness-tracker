// import React from "react";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/axiosClient";

// const Register = () => {
// 	const nav = useNavigate();
// 	const [name, setName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			await api.post("/auth/register", { name, email, password });
// 			alert("Registration successful! Please login.");
// 			nav("/login");
// 		} catch (err) {
// 			alert(err.response?.data?.message || "Register failed");
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
// 					<h2 style={{ color: "#2c3e50", margin: 0 }}>Create Account</h2>
// 				</div>
// 				<form onSubmit={handleSubmit}>
// 					<input
// 						placeholder="Name"
// 						value={name}
// 						onChange={(e) => setName(e.target.value)}
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
// 						Register
// 					</button>
// 				</form>
// 				<p style={{ marginTop: 15, textAlign: "center", color: "#666" }}>
// 					Already have account?{" "}
// 					<Link to="/login" style={{ color: "#27ae60", fontWeight: 500 }}>
// 						Login
// 					</Link>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosClient";

const Register = () => {
	const nav = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/auth/register", { name, email, password });
			alert("Registration successful! Please login.");
			nav("/login");
		} catch (err) {
			alert(err.response?.data?.message || "Register failed");
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
						Create Your Account
					</h2>
					<p style={{ marginTop: 6, fontSize: 14, color: "#9ca3af" }}>
						Start your fitness journey today
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
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
							marginBottom: 24,
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
						Register
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
					Already have an account?{" "}
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

export default Register;