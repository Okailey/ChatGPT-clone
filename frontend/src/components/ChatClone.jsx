import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/chatClone.css";

const ChatClone = ({ }) => {
    const [userInput, setUserInput] = useState("");
    // const [aiOutput, setAiOutput] = useState("");
    const [chat, setChat] = useState([]);

    const send = async () => {
        if (!userInput.trim())  //if there is no input
            return;

        const newChat = [...chat, { role: "user", content: userInput }];
        setChat(newChat);
        setUserInput("");

        try {
            const response = await axios.post("http://localhost:5001/chat", { theConvo: newChat });

            const aiResponse = response.data.choices[0].message;
            setChat((prevChat) => [...prevChat, aiResponse]);
        } catch (error) {
            setChat((prevChat) => [
                ...prevChat,
                { role: "assistant", content: "Something is wrong, try again." }
            ]);
        }
    };

    return (
        <div className="response">
            <h1>Chatbot</h1>

            {/* Chat history display */}
            <div className="chatLog">
                {chat
                    .filter((msg) => msg.role !== "developer") // Skip the initial system message
                    .map((msg, index) => (
                        <p key={index}>
                            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
                        </p>
                    ))}
            </div>


            {/*user will type message*/}
            <input
                type="text"
                value={userInput}
                placeholder="Start chatting..."
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") send(); // Send message when user presses Enter
                }}
            />

            {/* Button to send the user message */}
            <button className="buttonClick" onClick={send}>
                Send
            </button>
        </div>
    );
};

export default ChatClone;