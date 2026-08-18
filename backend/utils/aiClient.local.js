const axios = require("axios");

async function generateFitnessReply(userContext, userMessage) {
  const prompt = `You are FlexiFit, an AI fitness and nutrition assistant.\nUser profile:\nAge: ${userContext.age || "NA"}\nGender: ${userContext.gender || "NA"}\nHeight: ${userContext.heightCm || "NA"} cm\nWeight: ${userContext.weightKg || "NA"} kg\nGoal: ${userContext.goal || "NA"}\nDietary preferences: ${userContext.dietaryPrefs || "NA"}\nDaily calorie target: ${userContext.dailyCalorieTarget || "NA"} kcal\nRecent summary:\nAverage sleep: ${userContext.avgSleep || "NA"} hours\nAverage water intake: ${userContext.avgWater || "NA"} liters\nRecent workouts: ${userContext.recentWorkouts || "none"}\nRecent calories (approx): ${userContext.recentCalories || "NA"}\nReply in friendly, simple English with: 1–2 workout suggestions for today, 1–2 meal ideas, 1 motivational sentence. Avoid medical claims.`;
  try {
    const response = await axios.post(
      "http://localhost:5001/llm",
      { prompt }
    );
    return response.data.reply;
  } catch (err) {
    console.error("Local LLM error:", err.response?.data || err.message);
    throw new Error("Local LLM API Error");
  }
}

module.exports = { generateFitnessReply };
