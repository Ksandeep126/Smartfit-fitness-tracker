// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
// 	const { user, logout } = useAuth();
// 	const navigate = useNavigate();
// 	const [dropdownOpen, setDropdownOpen] = useState(false);

// 	const handleLogout = () => {
// 		logout();
// 		navigate("/login");
// 	};

// 	const styles = {
// 		nav: {
// 			padding: "0 24px",
// 			height: 60,
// 			borderBottom: "1px solid #ddd",
// 			marginBottom: 0,
// 			fontSize: 16,
// 			display: "flex",
// 			alignItems: "center",
// 			justifyContent: "space-between",
// 			background: "#000",
// 		},
// 		leftSection: {
// 			display: "flex",
// 			alignItems: "center",
// 		},
// 		centerLinks: {
// 			display: "flex",
// 			alignItems: "center",
// 			gap: 16,
// 		},
// 		rightSection: {
// 		},
// 		link: {
// 			textDecoration: "none",
// 			color: "#F5F7FA",
// 		},
// 		dropdownContainer: {
// 			position: "relative",
// 			display: "inline-block",
// 		},
// 		dropdownBtn: {
// 			background: "none",
// 			border: "none",
// 			cursor: "pointer",
// 			fontSize: 16,
// 			display: "flex",
// 			alignItems: "center",
// 			gap: 6,
// 			padding: "8px 12px",
// 			borderRadius: 6,
// 			color: "#007bff",
// 		},
// 		dropdownMenu: {
// 			position: "absolute",
// 			top: "100%",
// 			right: 0,
// 			background: "#fff",
// 			border: "1px solid #ddd",
// 			borderRadius: 8,
// 			boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
// 			minWidth: 220,
// 			zIndex: 1000,
// 			padding: "8px 0",
// 		},
// 		dropdownItem: {
// 			display: "block",
// 			padding: "10px 16px",
// 			textDecoration: "none",
// 			color: "#333",
// 			fontSize: 14,
// 			borderBottom: "1px solid #f0f0f0",
// 		},
// 		dropdownHeader: {
// 			padding: "10px 16px",
// 			fontSize: 12,
// 			color: "#999",
// 			textTransform: "uppercase",
// 			fontWeight: 600,
// 		},
// 		logoutBtn: {
// 			width: "100%",
// 			textAlign: "left",
// 			padding: "10px 16px",
// 			background: "none",
// 			border: "none",
// 			cursor: "pointer",
// 			color: "#e74c3c",
// 			fontSize: 14,
// 		},
// 	};

// 	return (
// 		<nav style={styles.nav}>
// 			{/* Left - Logo */}
// 			<div style={styles.leftSection}>
// 				<Link to="/" style={{
// 					fontWeight: 800,
// 					fontSize: 26,
// 					textDecoration: "none",
// 					display: "flex",
// 					alignItems: "center",
// 					gap: 12,
// 				}}>
// 					<img src="/images/LOGOO.jpg" alt="SmartFit" style={{
// 						height: 40,
// 						width: 40,
// 						// borderRadius: "50%",
// 						objectFit: "cover",
// 					}} />
// 					<span style={{
// 						background: "linear-gradient(135deg, #27ae60, #2ecc71)",
// 						WebkitBackgroundClip: "text",
// 						WebkitTextFillColor: "transparent",
// 						letterSpacing: "-0.5px",
// 					}}>SmartFit</span>
// 				</Link>
// 			</div>

// 			{/* Center - Nav links */}
// 			{user && (
// 				<div style={styles.centerLinks}>
// 					<Link to="/meals" style={styles.link}>Meals</Link>
// 					<Link to="/workouts" style={styles.link}>Workouts</Link>
// 					<Link to="/habits" style={styles.link}>Habits</Link>
// 					<Link to="/chat" style={styles.link}>AI Coach</Link>
// 					<Link to="/bmi" style={styles.link}>BMI</Link>
// 					<Link to="/analytics" style={styles.link}>Analytics</Link>
// 				</div>
// 			)}

// 			{/* Right - User dropdown or Login */}
// 			<div style={styles.rightSection}>
// 				{user ? (
// 					<div style={styles.dropdownContainer}>
// 						<button
// 							style={styles.dropdownBtn}
// 							onClick={() => setDropdownOpen(!dropdownOpen)}
// 							onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
// 						>
// 							👤 {user.name || user.email} ▼
// 						</button>
// 						{dropdownOpen && (
// 							<div style={styles.dropdownMenu}>
// 								<div style={styles.dropdownHeader}>Account</div>
// 								<Link to="/profile" style={styles.dropdownItem}>
// 									⚙️ Profile Settings
// 								</Link>

// 								<div style={styles.dropdownHeader}>History & Reports</div>
// 								<Link to="/history/meals" style={styles.dropdownItem}>
// 									🍎 Meals from Last Week
// 								</Link>
// 								<Link to="/history/workouts" style={styles.dropdownItem}>
// 									💪 Export Workout History
// 								</Link>
// 								<Link to="/history/compare" style={styles.dropdownItem}>
// 									📊 Compare Month vs Month
// 								</Link>

// 								<div style={{ borderTop: "1px solid #eee", marginTop: 8 }}>
// 									<button onClick={handleLogout} style={styles.logoutBtn}>
// 										🚪 Logout
// 									</button>
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 				) : (
// 					<>
// 						<Link to="/login" style={{ marginRight: 10, textDecoration: "none", color: "#333" }}>Login</Link>
// 						<Link to="/register" style={{ textDecoration: "none", color: "#27ae60", fontWeight: 600 }}>Register</Link>
// 					</>
// 				)}
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;


// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
// 	const { user, logout } = useAuth();
// 	const navigate = useNavigate();
// 	const [dropdownOpen, setDropdownOpen] = useState(false);
// 	const dropdownRef = useRef(null);

// 	const handleLogout = () => {
// 		logout();
// 		navigate("/login");
// 	};

// 	// ✅ Close dropdown when clicking outside
// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// 				setDropdownOpen(false);
// 			}
// 		};

// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, []);

// 	const styles = {
// 		nav: {
// 			padding: "0 24px",
// 			height: 60,
// 			borderBottom: "1px solid #ddd",
// 			marginBottom: 0,
// 			fontSize: 16,
// 			display: "flex",
// 			alignItems: "center",
// 			justifyContent: "space-between",
// 			background: "#000",
// 		},
// 		leftSection: {
// 			display: "flex",
// 			alignItems: "center",
// 		},
// 		centerLinks: {
// 			display: "flex",
// 			alignItems: "center",
// 			gap: 16,
// 		},
// 		rightSection: {},
// 		link: {
// 			textDecoration: "none",
// 			color: "#F5F7FA",
// 		},
// 		dropdownContainer: {
// 			position: "relative",
// 			display: "inline-block",
// 		},
// 		dropdownBtn: {
// 			background: "none",
// 			border: "none",
// 			cursor: "pointer",
// 			fontSize: 16,
// 			display: "flex",
// 			alignItems: "center",
// 			gap: 6,
// 			padding: "8px 12px",
// 			borderRadius: 6,
// 			color: "#007bff",
// 		},
// 		dropdownMenu: {
// 			position: "absolute",
// 			top: "100%",
// 			right: 0,
// 			background: "#03090cd3",
// 			border: "1px solid #ddd",
// 			borderRadius: 8,
// 			boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
// 			minWidth: 220,
// 			zIndex: 1000,
// 			padding: "8px 0",
// 		},
// 		dropdownItem: {
// 			display: "block",
// 			padding: "10px 16px",
// 			textDecoration: "none",
// 			color: "#FFF",
// 			fontSize: 14,
// 			borderBottom: "1px solid #f0f0f0",
// 		},
// 		dropdownHeader: {
// 			padding: "10px 16px",
// 			fontSize: 12,
// 			color: "#999",
// 			textTransform: "uppercase",
// 			fontWeight: 600,
// 		},
// 		logoutBtn: {
// 			width: "100%",
// 			textAlign: "left",
// 			padding: "10px 16px",
// 			background: "none",
// 			border: "none",
// 			cursor: "pointer",
// 			color: "#e74c3c",
// 			fontSize: 14,
// 		},
// 	};

// 	return (
// 		<nav style={styles.nav}>
// 			{/* Left - Logo */}
// 			<div style={styles.leftSection}>
// 				<Link
// 					to="/"
// 					style={{
// 						fontWeight: 800,
// 						fontSize: 26,
// 						textDecoration: "none",
// 						display: "flex",
// 						alignItems: "center",
// 						gap: 12,
// 					}}
// 				>
// 					<img
// 						src="/images/LOGOO.jpg"
// 						alt="SmartFit"
// 						style={{
// 							height: 40,
// 							width: 40,
// 							objectFit: "cover",
// 						}}
// 					/>
// 					<span
// 						style={{
// 							background: "linear-gradient(135deg, #27ae60, #2ecc71)",
// 							WebkitBackgroundClip: "text",
// 							WebkitTextFillColor: "transparent",
// 							letterSpacing: "-0.5px",
// 						}}
// 					>
// 						SmartFit
// 					</span>
// 				</Link>
// 			</div>

// 			{/* Center - Nav links */}
// 			{user && (
// 				<div style={styles.centerLinks}>
// 					<Link to="/meals" style={styles.link}>Meals</Link>
// 					<Link to="/workouts" style={styles.link}>Workouts</Link>
// 					<Link to="/habits" style={styles.link}>Habits</Link>
// 					<Link to="/chat" style={styles.link}>AI Coach</Link>
// 					<Link to="/bmi" style={styles.link}>BMI</Link>
// 					<Link to="/analytics" style={styles.link}>Analytics</Link>
// 				</div>
// 			)}

// 			{/* Right - User dropdown or Login */}
// 			<div style={styles.rightSection}>
// 				{user ? (
// 					<div ref={dropdownRef} style={styles.dropdownContainer}>
// 						<button
// 							style={styles.dropdownBtn}
// 							onClick={() => setDropdownOpen(!dropdownOpen)}
// 						>
// 							👤 {user.name || user.email} ▼
// 						</button>

// 						{dropdownOpen && (
// 							<div style={styles.dropdownMenu}>
// 								<div style={styles.dropdownHeader}>Account</div>
// 								<Link to="/profile" style={styles.dropdownItem}>
// 									⚙️ Profile Settings
// 								</Link>

// 								<div style={styles.dropdownHeader}>History & Reports</div>
// 								<Link to="/history/meals" style={styles.dropdownItem}>
// 									🍎 Meals from Last Week
// 								</Link>
// 								<Link to="/history/workouts" style={styles.dropdownItem}>
// 									💪 Export Workout History
// 								</Link>
// 								<Link to="/history/compare" style={styles.dropdownItem}>
// 									📊 Compare Month vs Month
// 								</Link>

// 								<div style={{ borderTop: "1px solid #eeeeee80", marginTop: 8 }}>
// 									<button onClick={handleLogout} style={styles.logoutBtn}>
// 										🚪 Logout
// 									</button>
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 				) : (
// 					<>
// 						<Link
// 							to="/login"
// 							style={{ marginRight: 10, textDecoration: "none", color: "#fff" }}
// 						>
// 							Login
// 						</Link>
// 						<Link
// 							to="/register"
// 							style={{ textDecoration: "none", color: "#27ae60", fontWeight: 600 }}
// 						>
// 							Register
// 						</Link>
// 					</>
// 				)}
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const styles = {
		nav: {
			padding: "0 24px",
			height: 60,
			borderBottom: "1px solid #ddd",
			fontSize: 16,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			background: "#000",
		},

		leftSection: {
			display: "flex",
			alignItems: "center",
		},

		centerLinks: {
			display: "flex",
			alignItems: "center",
			gap: 16,
		},

		rightSection: {},

		link: {
			textDecoration: "none",
			color: "#F5F7FA",
		},

		tagline: {
			fontSize: 11,
			color: "#aaa",
			letterSpacing: 1,
			marginTop: -2,
		},

		dropdownContainer: {
			position: "relative",
			display: "inline-block",
		},

		dropdownBtn: {
			background: "none",
			border: "none",
			cursor: "pointer",
			fontSize: 16,
			display: "flex",
			alignItems: "center",
			gap: 6,
			padding: "8px 12px",
			borderRadius: 6,
			color: "#007bff",
		},

		dropdownMenu: {
			position: "absolute",
			top: "100%",
			right: 0,
			background: "#03090cd3",
			border: "1px solid #ddd",
			borderRadius: 8,
			boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
			minWidth: 220,
			zIndex: 1000,
			padding: "8px 0",
		},

		dropdownItem: {
			display: "block",
			padding: "10px 16px",
			textDecoration: "none",
			color: "#FFF",
			fontSize: 14,
			borderBottom: "1px solid #f0f0f0",
		},

		dropdownHeader: {
			padding: "10px 16px",
			fontSize: 12,
			color: "#999",
			textTransform: "uppercase",
			fontWeight: 600,
		},

		logoutBtn: {
			width: "100%",
			textAlign: "left",
			padding: "10px 16px",
			background: "none",
			border: "none",
			cursor: "pointer",
			color: "#e74c3c",
			fontSize: 14,
		},
	};

	return (
		<nav style={styles.nav}>
			{/* Left - Logo */}
			<div style={styles.leftSection}>
				<Link
					to="/"
					style={{
						fontWeight: 800,
						fontSize: 26,
						textDecoration: "none",
						display: "flex",
						alignItems: "center",
						gap: 12,
					}}
				>
					<img
						src="/images/LOGOO.jpg"
						alt="SmartFit"
						style={{
							height: 40,
							width: 40,
							objectFit: "cover",
						}}
					/>

					{/* Logo + Tagline */}
					<div style={{ display: "flex", flexDirection: "column" }}>
						<span
							style={{
								background: "linear-gradient(135deg, #27ae60, #2ecc71)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								letterSpacing: "-0.5px",
							}}
						>
							SmartFit
						</span>

						<span style={styles.tagline}>
							Eat Smart • Grow Strong • Stay Fit
						</span>
					</div>
				</Link>
			</div>

			{/* Center - Nav links */}
			{user && (
				<div style={styles.centerLinks}>
					<Link to="/meals" style={styles.link}>Meals</Link>
					<Link to="/workouts" style={styles.link}>Workouts</Link>
					<Link to="/habits" style={styles.link}>Habits</Link>
					<Link to="/chat" style={styles.link}>AI Coach</Link>
					<Link to="/bmi" style={styles.link}>BMI</Link>
					<Link to="/analytics" style={styles.link}>Analytics</Link>
				</div>
			)}

			{/* Right - User dropdown or Login */}
			<div style={styles.rightSection}>
				{user ? (
					<div ref={dropdownRef} style={styles.dropdownContainer}>
						<button
							style={styles.dropdownBtn}
							onClick={() => setDropdownOpen(!dropdownOpen)}
						>
							👤 {user.name || user.email} ▼
						</button>

						{dropdownOpen && (
							<div style={styles.dropdownMenu}>
								<div style={styles.dropdownHeader}>Account</div>

								<Link to="/profile" style={styles.dropdownItem}>
									⚙️ Profile Settings
								</Link>

								<div style={styles.dropdownHeader}>History & Reports</div>

								<Link to="/history/meals" style={styles.dropdownItem}>
									🍎 Meals from Last Week
								</Link>

								<Link to="/history/workouts" style={styles.dropdownItem}>
									💪 Export Workout History
								</Link>

								<Link to="/history/compare" style={styles.dropdownItem}>
									📊 Compare Month vs Month
								</Link>

								<div style={{ borderTop: "1px solid #eeeeee80", marginTop: 8 }}>
									<button onClick={handleLogout} style={styles.logoutBtn}>
										🚪 Logout
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<>
						<Link
							to="/login"
							style={{ marginRight: 10, textDecoration: "none", color: "#fff" }}
						>
							Login
						</Link>

						<Link
							to="/register"
							style={{ textDecoration: "none", color: "#27ae60", fontWeight: 600 }}
						>
							Register
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;