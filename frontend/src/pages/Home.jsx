// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axiosClient";

// const Home = () => {
// 	const { user } = useAuth();
// 	const navigate = useNavigate();
// 	const [quote, setQuote] = useState({ text: "Stop Wishing, Start Doing", type: "motivation" });

// 	const quotes = {
// 		// Motivational quotes for low progress
// 		motivation: [
// 			"Stop wishing, start doing! 💪",
// 			"Every expert was once a beginner. Start today!",
// 			"The only bad workout is the one that didn't happen.",
// 			"Small progress is still progress. Keep going!",
// 			"Your body can do it, you just have to convince your mind.",
// 			"Don't stop when you're tired, stop when you're done!",
// 			"The hardest step is the first one. Take it now!",
// 		],
// 		// Appreciation quotes for good progress
// 		appreciation: [
// 			"Amazing work! You're crushing your goals! 🎉",
// 			"Look at you go! Your consistency is inspiring!",
// 			"Champion in the making! Keep up the great work!",
// 			"You're on fire! Your dedication is paying off! 🔥",
// 			"Incredible progress! You should be proud of yourself!",
// 			"You're a fitness rockstar! Keep shining! ⭐",
// 			"Your hard work is showing! Keep the momentum going!",
// 		],
// 		// Moderate progress quotes
// 		encouragement: [
// 			"Good effort! A little more push and you'll be unstoppable!",
// 			"You're doing well! Stay consistent and the results will follow.",
// 			"Nice work! Keep building those healthy habits!",
// 			"You're on the right track! Don't lose focus now!",
// 			"Solid progress! Every day is a step closer to your goal!",
// 		],
// 	};

// 	useEffect(() => {
// 		const fetchProgress = async () => {
// 			if (!user) return;
// 			try {
// 				const res = await api.get("/analytics/habits");
// 				const consistency = res.data?.overall?.consistency || 0;
// 				let category = "motivation";
// 				if (consistency >= 70) category = "appreciation";
// 				else if (consistency >= 40) category = "encouragement";
				
// 				const categoryQuotes = quotes[category];
// 				const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
// 				setQuote({ text: randomQuote, type: category });
// 			} catch (err) {
// 				// Use default quote
// 				const randomQuote = quotes.motivation[Math.floor(Math.random() * quotes.motivation.length)];
// 				setQuote({ text: randomQuote, type: "motivation" });
// 			}
// 		};
// 		fetchProgress();
// 	}, [user]);

// 	const styles = {
// 		container: {
// 			minHeight: "100vh",
// 			position: "relative",
// 			backgroundImage: "url('/images/image_4.jpeg')",
// 			backgroundSize: "cover",
// 			backgroundPosition: "center",
// 			backgroundRepeat: "no-repeat",
// 		},
// 		content: {
// 			position: "relative",
// 			zIndex: 1,
// 			display: "flex",
// 			flexDirection: "column",
// 			alignItems: "center",
// 			justifyContent: "center",
// 			minHeight: "100vh",
// 			padding: 20,
// 			textAlign: "center",
// 		},
// 		logo: {
// 			fontSize: 60,
// 			marginBottom: 10,
// 		},
// 		title: {
// 			fontSize: 48,
// 			fontWeight: 700,
// 			color: "#F5F7FA",
// 			marginBottom: 10,
// 			textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
// 		},
// 		subtitle: {
// 			fontSize: 20,
// 			color: "#CBD5E1",
// 			marginBottom: 40,
// 			maxWidth: 600,
// 		},
// 		buttonGroup: {
// 			display: "flex",
// 			gap: 20,
// 			marginBottom: 60,
// 		},
// 		primaryBtn: {
// 			padding: "14px 40px",
// 			fontSize: 18,
// 			fontWeight: 600,
// 			color: "#fff",
// 			background: "#27ae60",
// 			border: "none",
// 			borderRadius: 8,
// 			textDecoration: "none",
// 			cursor: "pointer",
// 			transition: "transform 0.2s, box-shadow 0.2s",
// 		},
// 		secondaryBtn: {
// 			padding: "14px 40px",
// 			fontSize: 18,
// 			fontWeight: 600,
// 			color: "#fff",
// 			background: "transparent",
// 			border: "2px solid #fff",
// 			borderRadius: 8,
// 			textDecoration: "none",
// 			cursor: "pointer",
// 		},
// 		featuresGrid: {
// 			display: "grid",
// 			gridTemplateColumns: "repeat(2, 1fr)",
// 			gap: 24,
// 			maxWidth: 700,
// 			width: "100%",
// 			marginTop: 20,
// 		},
// 		featureCard: {
// 			background: "rgba(255, 255, 255, 0.95)",
// 			padding: 24,
// 			borderRadius: 12,
// 			textAlign: "center",
// 		},
// 		featureIcon: {
// 			fontSize: 40,
// 			marginBottom: 12,
// 		},
// 		featureTitle: {
// 			fontSize: 18,
// 			fontWeight: 600,
// 			color: "#2c3e50",
// 			marginBottom: 8,
// 		},
// 		featureDesc: {
// 			fontSize: 14,
// 			color: "#7f8c8d",
// 			lineHeight: 1.5,
// 		},
// 		quote: {
// 			fontSize: 24,
// 			fontStyle: "italic",
// 			color: "#fff",
// 			marginTop: 40,
// 			textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
// 		},
// 	};

// 	const features = [
// 		{
// 			img: "/images/meal coach.jpeg",
// 			title: "Meal Tracking",
// 			desc: "Log your meals and track daily calories with ease",
// 			link: "/meals",
// 		},
// 		{
// 			img: "/images/workoutplans.jpeg",
// 			title: "Workout Plans",
// 			desc: "Record exercises and monitor your fitness progress",
// 			link: "/workouts",
// 		},
// 		{
// 			img: "/images/BMIclaculator.jpeg",
// 			title: "BMI Calculator",
// 			desc: "Calculate BMI, BMR, and get personalized diet plans",
// 			link: "/bmi",
// 		},
// 		{
// 			img: "/images/Aicoach.jpeg",
// 			title: "AI Coach",
// 			desc: "Get personalized advice from your AI fitness coach",
// 			link: "/chat",
// 		},
// 	];

// 	return (
// 		<div style={styles.container}>
// 			<div style={styles.content}>
// 				<h1 style={styles.title}>"Track. Transform. Thrive."</h1>
//                 <p style={{
// 					...styles.quote,
// 					color: quote.type === "appreciation" ? "#2ecc71" : quote.type === "encouragement" ? "#f1c40f" : "#fff"
// 				}}>"{quote.text}"</p>
// 				<p style={styles.subtitle}>
// 					Your personal fitness companion. Track meals, workouts, habits and get
// 					AI-powered recommendations to achieve your health goals.
// 				</p>

// 				<div style={styles.buttonGroup}>
// 					{user ? (
// 						<Link to="/" style={styles.primaryBtn}>
// 							<h2>Hi {user.name}</h2>
// 						</Link>
// 					) : (
// 						<>
// 							<Link to="/login" style={styles.primaryBtn}>
// 								Login
// 							</Link>
// 							<Link to="/register" style={styles.secondaryBtn}>
// 								Get Started
// 							</Link>
// 						</>
// 					)}
// 				</div>

// 				<div style={styles.featuresGrid}>
// 					{features.map((feature, idx) => (
// 						<div
// 							key={idx}
// 							style={{ ...styles.featureCard, cursor: "pointer" }}
// 							onClick={() => {
// 								if (user) {
// 									navigate(feature.link);
// 								} else {
// 									navigate("/login");
// 								}
// 							}}
// 						>
// 							<div style={styles.featureIcon}><img src={feature.img} alt={feature.title} style={{ height: 56, width: 56, borderRadius: 12, objectFit: "cover" }} /></div>
// 							<h3 style={styles.featureTitle}>{feature.title}</h3>
// 							<p style={styles.featureDesc}>{feature.desc}</p>
// 						</div>
// 					))}
// 				</div>

				
// 			</div>
// 		</div>
// 	);
// };

// export default Home;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosClient";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({
    text: "Stop Wishing, Start Doing",
    type: "motivation",
  });

  const quotes = {
    motivation: [
      "Stop wishing, start doing! 💪",
      "Every expert was once a beginner. Start today!",
      "The only bad workout is the one that didn't happen.",
      "Small progress is still progress. Keep going!",
      "Your body can do it, you just have to convince your mind.",
      "Don't stop when you're tired, stop when you're done!",
      "The hardest step is the first one. Take it now!",
    ],
    appreciation: [
      "Amazing work! You're crushing your goals! 🎉",
      "Look at you go! Your consistency is inspiring!",
      "Champion in the making! Keep up the great work!",
      "You're on fire! Your dedication is paying off! 🔥",
      "Incredible progress! You should be proud of yourself!",
      "You're a fitness rockstar! Keep shining! ⭐",
      "Your hard work is showing! Keep the momentum going!",
    ],
    encouragement: [
      "Good effort! A little more push and you'll be unstoppable!",
      "You're doing well! Stay consistent and the results will follow.",
      "Nice work! Keep building those healthy habits!",
      "You're on the right track! Don't lose focus now!",
      "Solid progress! Every day is a step closer to your goal!",
    ],
  };

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      try {
        const res = await api.get("/analytics/habits");
        const consistency = res.data?.overall?.consistency || 0;

        let category = "motivation";
        if (consistency >= 70) category = "appreciation";
        else if (consistency >= 40) category = "encouragement";

        const categoryQuotes = quotes[category];
        const randomQuote =
          categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];

        setQuote({ text: randomQuote, type: category });
      } catch {
        const randomQuote =
          quotes.motivation[Math.floor(Math.random() * quotes.motivation.length)];
        setQuote({ text: randomQuote, type: "motivation" });
      }
    };

    fetchProgress();
  }, [user]);

  const features = [
    {
      img: "/images/meal coach.jpeg",
      title: "Meal Tracking",
      desc: "Log your meals and track daily calories with ease",
      link: "/meals",
    },
    {
      img: "/images/workoutplans.jpeg",
      title: "Workout Plans",
      desc: "Record exercises and monitor your fitness progress",
      link: "/workouts",
    },
    {
      img: "/images/BMIclaculator.jpeg",
      title: "BMI Calculator",
      desc: "Calculate BMI, BMR, and get personalized diet plans",
      link: "/bmi",
    },
    {
      img: "/images/Aicoach.jpeg",
      title: "AI Coach",
      desc: "Get personalized advice from your AI fitness coach",
      link: "/chat",
    },
  ];

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Track. Transform. Thrive.</h1>

          <p
            className={`quote ${quote.type}`}
          >
            {quote.text}
          </p>

          <p className="hero-subtitle">
            Your personal fitness companion. Track meals, workouts, habits
            and get AI-powered recommendations to achieve your health goals.
          </p>

          <div className="cta-group">
            {user ? (
              <button className="btn-primary">
                Hi {user.name}
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn-secondary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card"
              onClick={() => {
                if (user) navigate(feature.link);
                else navigate("/login");
              }}
            >
              <img src={feature.img} alt={feature.title} />
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;