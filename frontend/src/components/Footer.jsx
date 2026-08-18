import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	const styles = {
		footer: {
			background: "#000000",
			color: "#ecf0f1",
			padding: "40px 20px 20px",
			marginTop: "auto",
		},
		container: {
			maxWidth: 1200,
			margin: "0 auto",
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
			gap: 30,
		},
		section: {
			marginBottom: 20,
		},
		title: {
			fontSize: 18,
			fontWeight: 600,
			marginBottom: 16,
			color: "#fff",
		},
		link: {
			display: "block",
			color: "#bdc3c7",
			textDecoration: "none",
			marginBottom: 10,
			fontSize: 14,
			transition: "color 0.2s",
		},
		text: {
			color: "#bdc3c7",
			fontSize: 14,
			lineHeight: 1.6,
		},
		socialLinks: {
			display: "flex",
			gap: 12,
			marginTop: 12,
		},
		socialIcon: {
			width: 36,
			height: 36,
			borderRadius: "50%",
			background: "#1a1a1a",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "#fff",
			textDecoration: "none",
			fontSize: 16,
			transition: "background 0.2s",
		},
		bottom: {
			borderTop: "1px solid #333",
			marginTop: 30,
			paddingTop: 20,
			textAlign: "center",
			color: "#7f8c8d",
			fontSize: 13,
		},
		logo: {
			fontSize: 24,
			fontWeight: 700,
			color: "#27ae60",
			marginBottom: 12,
		},
	};

	return (
		<footer style={styles.footer}>
			<div style={styles.container}>
				{/* Brand Section */}
				<div style={styles.section}>
					<div style={styles.logo}>🏋️ SmartFit</div>
					<p style={styles.text}>
						Your personal fitness companion. Track meals, workouts, habits and achieve your health goals with AI-powered recommendations.
					</p>
					<div style={styles.socialLinks}>
						<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
							📘
						</a>
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
							🐦
						</a>
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
							📷
						</a>
						<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
							▶️
						</a>
					</div>
				</div>

				{/* Quick Links */}
				<div style={styles.section}>
					<h4 style={styles.title}>Quick Links</h4>
					<Link to="/" style={styles.link}>Home</Link>
					<Link to="/meals" style={styles.link}>Meal Tracking</Link>
					<Link to="/workouts" style={styles.link}>Workouts</Link>
					<Link to="/habits" style={styles.link}>Habits</Link>
					<Link to="/analytics" style={styles.link}>Analytics</Link>
				</div>

				{/* Features */}
				<div style={styles.section}>
					<h4 style={styles.title}>Features</h4>
					<Link to="/bmi" style={styles.link}>BMI Calculator</Link>
					<Link to="/chat" style={styles.link}>AI Coach</Link>
					<Link to="/history/meals" style={styles.link}>Meal History</Link>
					<Link to="/history/workouts" style={styles.link}>Workout History</Link>
					<Link to="/history/compare" style={styles.link}>Monthly Comparison</Link>
				</div>

				{/* Contact */}
				<div style={styles.section}>
					<h4 style={styles.title}>Contact Us</h4>
					<p style={styles.text}>📧 support@smartfit.com</p>
					<p style={styles.text}>📞 +1 (555) 123-4567</p>
					<p style={styles.text}>📍 123 Fitness Street, Health City</p>
				</div>
			</div>

			<div style={styles.bottom}>
				<p>© {new Date().getFullYear()} SmartFit. All rights reserved.</p>
				<p style={{ marginTop: 8 }}>
					Made with ❤️ for your fitness journey
				</p>
			</div>
		</footer>
	);
};

export default Footer;
