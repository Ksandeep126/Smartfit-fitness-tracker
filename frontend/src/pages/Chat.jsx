// import React from "react";
// import { useState } from "react";
// import api from "../api/axiosClient";

// const Chat = () => {
// 	const [messages, setMessages] = useState([
// 		{ sender: "ai", text: "Hi! I'm your SmartFit AI coach. How can I help you today?" }
// 	]);
// 	const [input, setInput] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const sendMessage = async (e) => {
// 		e.preventDefault();
// 		if (!input.trim()) return;

// 		const userMsg = { sender: "user", text: input };
// 		setMessages((prev) => [...prev, userMsg]);
// 		setInput("");
// 		setLoading(true);

// 		try {
// 			const res = await api.post("/ai/chat", { message: userMsg.text });
// 			const aiMsg = { sender: "ai", text: res.data.reply };
// 			setMessages((prev) => [...prev, aiMsg]);
// 		} catch (err) {
// 			const aiMsg = { sender: "ai", text: "Sorry, I had an error processing that." };
// 			setMessages((prev) => [...prev, aiMsg]);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div style={{ maxWidth: 800, margin: "20px auto", padding: "0 20px" }}>
// 			<div style={{
// 				background: "rgba(255, 255, 255, 0.95)",
// 				borderRadius: 12,
// 				padding: 24,
// 				boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
// 			}}>
// 				<h2 style={{ color: "#2c3e50", marginTop: 0, display: "flex", alignItems: "center", gap: 10 }}>
// 					<img src="/images/Aicoach.jpeg" alt="AI Coach" style={{ height: 36, width: 36, borderRadius: 8, objectFit: "cover" }} /> AI Coach
// 				</h2>
// 				<div
// 					style={{
// 						border: "1px solid #eee",
// 						borderRadius: 8,
// 						padding: 16,
// 						height: 400,
// 						overflowY: "auto",
// 						marginBottom: 16,
// 						background: "#fafafa",
// 					}}
// 				>
// 					{messages.map((m, idx) => (
// 						<div
// 							key={idx}
// 							style={{
// 								display: "flex",
// 								alignItems: "flex-start",
// 								justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
// 								gap: 8,
// 								marginBottom: 10,
// 							}}
// 						>
// 							{m.sender === "ai" && (
// 								<img src="/images/Aicoach.jpeg" alt="AI" style={{ height: 28, width: 28, borderRadius: "50%", objectFit: "cover", marginTop: 2 }} />
// 							)}
// 							<span
// 							style={{
// 								display: "inline-block",
// 								padding: "10px 14px",
// 								borderRadius: 12,
// 								background: m.sender === "user" ? "#27ae60" : "#e8e8e8",
// 								color: m.sender === "user" ? "#fff" : "#333",
// 								maxWidth: "70%",
// 								lineHeight: 1.5,
// 								fontSize: 14,
// 								whiteSpace: "pre-line",   // 🔥 THIS FIXES EVERYTHING
// 							}}
// 							>
// 							{m.text}
// 							</span>
// 							{/* <span
// 								style={{
// 									display: "inline-block",
// 									padding: "10px 14px",
// 									borderRadius: 12,
// 									background: m.sender === "user" ? "#27ae60" : "#e8e8e8",
// 									color: m.sender === "user" ? "#fff" : "#333",
// 									maxWidth: "70%",
// 									lineHeight: 1.5,
// 									fontSize: 14,
// 								}}
// 							>
// 								{m.text}
// 							</span> */}
// 						</div>
// 					))}
// 					{loading && <p style={{ color: "#999", fontStyle: "italic" }}>AI is thinking...</p>}
// 				</div>

// 				<form onSubmit={sendMessage} style={{ display: "flex", gap: 10 }}>
// 					<input
// 						style={{
// 							flex: 1,
// 							padding: "12px 14px",
// 							border: "1px solid #ddd",
// 							borderRadius: 8,
// 							fontSize: 15,
// 							boxSizing: "border-box",
// 						}}
// 						placeholder="Ask about workouts, diet, progress..."
// 						value={input}
// 						onChange={(e) => setInput(e.target.value)}
// 					/>
// 					<button type="submit" style={{
// 						padding: "12px 24px",
// 						background: "#27ae60",
// 						color: "#fff",
// 						border: "none",
// 						borderRadius: 8,
// 						fontSize: 15,
// 						fontWeight: 600,
// 						cursor: "pointer",
// 					}}>Send</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Chat;

import React, { useState, useRef } from "react";
import api from "../api/axiosClient";

const Chat = () => {
	const [messages, setMessages] = useState([
		{
			sender: "ai",
			text: "Hi! I'm your SmartFit AI coach. How can I help you today?",
		},
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [listening, setListening] = useState(false);

	const recognitionRef = useRef(null);

	// 🎤 Start Voice Recognition
	const startListening = () => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			alert("Speech Recognition not supported in this browser.");
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.lang = "en-US";
		recognition.interimResults = false;

		recognition.onstart = () => setListening(true);
		recognition.onend = () => setListening(false);

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript;
			setInput((prev) => prev + " " + transcript);
		};

		recognition.start();
		recognitionRef.current = recognition;
	};

	const stopListening = () => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
		}
	};

	// 💬 Send Message (Logic unchanged)
	const sendMessage = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;

		const userMsg = { sender: "user", text: input };
		setMessages((prev) => [...prev, userMsg]);
		setInput("");
		setLoading(true);

		try {
			const res = await api.post("/ai/chat", {
				message: userMsg.text,
			});

			const aiMsg = { sender: "ai", text: res.data.reply };
			setMessages((prev) => [...prev, aiMsg]);
		} catch (err) {
			setMessages((prev) => [
				...prev,
				{
					sender: "ai",
					text: "Sorry, I had an error processing that.",
				},
			]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={styles.container}>
			<div style={styles.card}>
				{/* HEADER */}
				<div style={styles.header}>
					<img
						src="/images/Aicoach.jpeg"
						alt="AI Coach"
						style={styles.avatarLarge}
					/>
					<h2 style={styles.heading}>AI Coach</h2>
				</div>

				{/* CHAT BOX */}
				<div style={styles.chatBox}>
					{messages.map((m, idx) => (
						<div
							key={idx}
							style={{
								display: "flex",
								alignItems: "flex-end",
								gap: 8,
								justifyContent:
									m.sender === "user"
										? "flex-end"
										: "flex-start",
							}}
						>
							{/* AI Avatar */}
							{m.sender === "ai" && (
								<img
									src="/images/Aicoach.jpeg"
									alt="AI"
									style={{
										height: 32,
										width: 32,
										borderRadius: "50%",
										objectFit: "cover",
									}}
								/>
							)}

							{/* Message Bubble */}
							<div
								style={{
									padding: "10px 14px",
									borderRadius: 14,
									maxWidth: "70%",
									fontSize: 14,
									lineHeight: 1.5,
									whiteSpace: "pre-line",
									background:
										m.sender === "user"
											? "#22c55e"
											: "#111827",
									color:
										m.sender === "user"
											? "#fff"
											: "#e5e7eb",
								}}
							>
								{m.text}
							</div>
						</div>
					))}

					{loading && (
						<div style={styles.loading}>
							AI is thinking...
						</div>
					)}
				</div>

				{/* INPUT SECTION */}
				<form onSubmit={sendMessage} style={styles.inputRow}>
					<input
						style={styles.input}
						placeholder="Ask about workouts, diet, progress..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>

					{/* 🎤 Voice Button */}
					<button
						type="button"
						onClick={listening ? stopListening : startListening}
						style={{
							...styles.micButton,
							background: listening
								? "#ef4444"
								: "#374151",
						}}
					>
						{listening ? "🎙" : "🎤"}
					</button>

					<button type="submit" style={styles.button}>
						Send
					</button>
				</form>
			</div>
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
		borderRadius: 20,
		padding: 25,
		boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
		display: "flex",
		flexDirection: "column",
		height: "75vh",
	},

	header: {
		display: "flex",
		alignItems: "center",
		gap: 12,
		marginBottom: 20,
	},

	heading: {
		color: "#ffffff",
		margin: 0,
	},

	avatarLarge: {
		height: 42,
		width: 42,
		borderRadius: 12,
		objectFit: "cover",
	},

	chatBox: {
		flex: 1,
		overflowY: "auto",
		padding: 15,
		background: "#0f172a",
		borderRadius: 14,
		marginBottom: 15,
		display: "flex",
		flexDirection: "column",
		gap: 12,
	},

	loading: {
		color: "#9ca3af",
		fontStyle: "italic",
		fontSize: 13,
	},

	inputRow: {
		display: "flex",
		gap: 10,
	},

	input: {
		flex: 1,
		padding: "12px 14px",
		borderRadius: 12,
		border: "1px solid #374151",
		background: "#111827",
		color: "#ffffff",
		fontSize: 14,
		outline: "none",
	},

	button: {
		padding: "12px 22px",
		background: "#22c55e",
		color: "#ffffff",
		border: "none",
		borderRadius: 12,
		fontWeight: 600,
		cursor: "pointer",
	},

	micButton: {
		padding: "12px 14px",
		border: "none",
		borderRadius: 12,
		color: "#fff",
		cursor: "pointer",
		fontSize: 16,
	},
};

export default Chat;
