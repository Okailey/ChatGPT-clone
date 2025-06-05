import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

//my route
import chatBot from "./routes/chat.js";

dotenv.config(); // Load the .env file

const app = express();
const port = 5001;

// use middleware to parse json request bodies
app.use(bodyParser.json());

app.use("/chat", chatBot);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

