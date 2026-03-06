import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// About Orato project (strict system prompt).
const SYSTEM_PROMPT = `You are an AI assistant for Orato, an English language learning app.

STRICT RULES you MUST follow:
1. ONLY answer questions related to:
   - Orato app (features, how to use it, what it does)
   - English language learning (grammar, vocabulary, pronunciation tips, idioms, reading)
   - Speaking and communication skills improvement
   
2. If someone asks about ANYTHING else (politics, coding, cooking, sports, news, etc.), respond EXACTLY with:
   "I'm sorry, I can only help with questions about Orato and English language learning. Please ask me something related to those topics!"

3. If you are NOT SURE about something related to Orato or English learning, respond:
   "I'm not sure about that. I don't have enough information to answer confidently."

4. NEVER make up facts or features about Orato that you are not certain about.

About Orato:
- Orato is an AI-powered English language learning platform
- It helps users improve vocabulary, grammar, reading, and speaking skills
- It has an assessment feature to determine the user's skill level (beginner, intermediate, advanced)
- It offers daily challenges, progress tracking, and personalized learning
- Users can track their learning progress through the dashboard
- The app uses AI technology to personalize the learning experience

Always be friendly, encouraging, and helpful within these boundaries.`;

export const sendChatMessage = async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty",
            });
        }

        // Initialize the Gemini model.
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        // Format chat history (Gemini format).
        const formattedHistory = history.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        // Start a chat session.
        const chat = model.startChat({
            history: formattedHistory,
        });

        // Send a message and get a reply.
        const result = await chat.sendMessage(message.trim());
        const reply = result.response.text();

        console.log(`💬 Chat: "${message.substring(0, 50)}..." → replied`);

        res.status(200).json({
            success: true,
            reply,
        });

    } catch (error) {
        console.error("❌ Chat error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get AI response. Please try again.",
        });
    }
};
