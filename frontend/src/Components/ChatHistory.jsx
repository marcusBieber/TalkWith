import React, { useContext } from "react";
import { ColorContext } from './ColorSwitcher';

function ChatHistory() {
  {
    /*Dummy Nachrichten*/
  }
  const messages = [
    { id: 1, user: "Marcus", text: "Hallo!" },
    { id: 2, user: "Kaho", text: "Heey!" },
    { id: 3, user: "Ilona", text: "HuHuu!" },
  ];

  const { darkMode } = useContext(ColorContext);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#242424" : "#EAEAEA",
        height: "650px",
        overflowY: "scroll",
        padding: "10px",
        borderRadius: "20px",
        border: darkMode ? "1px solid #555" : "1px solid #ccc",
        scrollbarWidth: "thin",
        scrollbarColor: darkMode ? "#888 #242424" : "#888 #EAEAEA",
      }}
      className="scrollbar"
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`d-flex mb-2 ${
            msg.isUser ? "justify-content-end" : "justify-content-start"
          }`}
        >
          <div
            className={`p-2 rounded w-100 shadow`}
            style={{
              backgroundColor: msg.isUser
                ? (darkMode ? "#1e90ff" : "#00bfff")
                : (darkMode ? "#444444" : "#EAEAEA"),
              color: darkMode ? "#ffffff" : "#000000",
              maxWidth: "100%",
              wordWrap: "break-word",
              boxShadow: darkMode ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
