const axios = require("axios");

const HF_TOKEN = process.env.HF_TOKEN;
const AI_MODEL = process.env.AI_MODEL || "mistralai/Mixtral-8x7B-Instruct-v0.1";
const HF_API_URL =
  process.env.HF_API_URL ||
  "https://router.huggingface.co/v1/chat/completions";

async function generateFitnessReply(userContext, userMessage) {
  if (!HF_TOKEN) {
    throw new Error("HF_TOKEN missing in environment");
  }

const prompt = `
You are SmartFit AI Coach.

User Profile:
Age: ${userContext.age || "NA"}
Weight: ${userContext.weightKg || "NA"} kg
Goal: ${userContext.goal || "NA"}
Daily Calorie Target: ${userContext.dailyCalorieTarget || "NA"} kcal

IMPORTANT BEHAVIOR RULES:

1. If the user sends a greeting like "Hi", "Hello", or short casual message,
   respond briefly and ask how you can help.
   Do NOT generate a full plan.

2. If the user asks a fitness or diet related question,
   then respond using the exact structured format below.

Structured Format (ONLY for fitness questions):

🎯 Your Personalized Plan

One short personalized introduction sentence.

🥗 Diet

Recommendation line 1
Recommendation line 2
Recommendation line 3

🏃 Activity

Recommendation line 1
Recommendation line 2

💧 Hydration

Recommendation line 1

💪 Motivation

One motivational sentence.

Formatting Rules:
- Put blank line after every section title.
- No markdown symbols.
- No paragraph style.
- Clean spacing.
`;

  try {
    const response = await axios.post(
      HF_API_URL,
      {
        model: AI_MODEL,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 500,
        temperature: 0.4
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    );

    const text = response.data.choices?.[0]?.message?.content || "";
    return text.trim();
  } catch (err) {
    console.error(
      "HF error:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
}

module.exports = { generateFitnessReply };


// const axios = require("axios");

// // Use environment variables for secrets and configuration.
// // In production, set HF_TOKEN, AI_MODEL and HF_API_URL in your environment or secrets manager.
// const HF_TOKEN = process.env.HF_TOKEN;
// const AI_MODEL = process.env.AI_MODEL || "meta-llama/Meta-Llama-3-8B-Instruct";
// const HF_API_URL = process.env.HF_API_URL || "https://router.huggingface.co/v1/chat/completions";

// async function generateFitnessReply(userContext, userMessage) {
// 	if (!HF_TOKEN) {
// 		throw new Error('HF_TOKEN missing in environment');
// 	}

// 	// const prompt = `You are FlexiFit, an AI fitness and nutrition assistant.\nUser profile:\nAge: ${userContext.age || "NA"}\nGender: ${userContext.gender || "NA"}\nHeight: ${userContext.heightCm || "NA"} cm\nWeight: ${userContext.weightKg || "NA"} kg\nGoal: ${userContext.goal || "NA"}\nDietary preferences: ${userContext.dietaryPrefs || "NA"}\nDaily calorie target: ${userContext.dailyCalorieTarget || "NA"} kcal\nRecent summary:\nAverage sleep: ${userContext.avgSleep || "NA"} hours\nAverage water intake: ${userContext.avgWater || "NA"} liters\nRecent workouts: ${userContext.recentWorkouts || "none"}\nRecent calories (approx): ${userContext.recentCalories || "NA"}\nReply in friendly, simple English with: 1–2 workout suggestions for today, 1–2 meal ideas, 1 motivational sentence. Avoid medical claims.`;

// 	const prompt = `
// 	You are SmartFit AI Coach.

// 	User details:
// 	Age: ${userContext.age || "NA"}
// 	Weight: ${userContext.weightKg || "NA"} kg
// 	Goal: ${userContext.goal || "NA"}
// 	Daily calorie target: ${userContext.dailyCalorieTarget || "NA"} kcal

// 	Instructions:
// 	- Respond ONLY to the user's question.
// 	- Format the answer clearly using headings and bullet points.
// 	- Keep it concise and structured.
// 	- Do not give overly long paragraphs.
// 	- End with one short motivational line.
// 	- Avoid medical claims.
	
// `	;
	
// 	try {
// 		const response = await axios.post(
// 			HF_API_URL,
// 			{
// 				model: AI_MODEL,
// 				messages: [
// 					{ role: "system", content: prompt },
// 					{ role: "user", content: userMessage }
// 				],
// 				max_tokens: 700,
// 				temperature: 0.6
// 			},
// 			{
// 				headers: {
// 					Authorization: `Bearer ${HF_TOKEN}`,
// 					"Content-Type": "application/json"
// 				},
// 				timeout: 20_000
// 			}
// 		);
// 		const choice = response.data.choices?.[0];
// 		const text = choice?.message?.content || "";
// 		return text.trim();
// 	} catch (err) {
// 		console.error("HF error:", err.response ? err.response.data : err.message);
// 		throw err;
// 	}
// }

// module.exports = { generateFitnessReply };
