import express from "express";
import { OpenAI } from "openai/client.js";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const openAIConnection = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/send-message", async (req, res) => {
    const model = req.body.model;
    const messages = req.body.messages;
    try {
        const response = await openAIConnection.chat.completions.create({
            messages: messages,
            model: model,
        });

        res.status(200).json(response.choices[0].message);
    } catch (error) {
        console.error("Error fetching from openai API:", error);
    }
});

export default router;