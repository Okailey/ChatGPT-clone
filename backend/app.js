import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from 'cors';

dotenv.config(); // Load the .env file

const app = express();
const port = 5001;

// use middleware to parse json request bodies
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate', async (req, res) => {
    try {
        const { messages } = req.body;

        const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: messages, // an array of messages with roles: system, user, assistant
        });

    res.json({ reply: completion.choices[0].message.content });
  } catch (e) {
    console.error("There was an issue: ", e);
    res.status(500).json({ error: "Something went wrong" });
  }
});

