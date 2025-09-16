import React, { useState } from "react";
import axios from "axios";
import "../styles/chatClone.css";

const ChatClone = () => {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    if (!userInput.trim()) return; // Ignore empty input

    const newChat = [...chat, { role: "user", content: userInput }];
    setChat(newChat);
    setUserInput("");

    try {
      const response = await axios.post("http://localhost:5001/generate", {
        messages: newChat,
      });

      const aiResponse = { role: "assistant", content: response.data.reply };
      setChat((prevChat) => [...prevChat, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChat((prevChat) => [
        ...prevChat,
        { role: "assistant", content: "Something went wrong. Try again!" },
      ]);
    }
  };

  return (
    <div className="response">
      <h1>Chatbot</h1>

      {/* Chat history */}
      <div className="chatLog">
  {chat.map((msg, index) => (
    <p key={index} className={msg.role === "user" ? "userMsg" : "aiMsg"}>
      <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
    </p>
  ))}
</div>

      {/* User input */}
      <input
        type="text"
        value={userInput}
        placeholder="Start chatting..."
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />

      <button className="buttonClick" onClick={send}>
        Send
      </button>
    </div>
  );
};

export default ChatClone;
