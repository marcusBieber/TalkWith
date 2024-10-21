import React, { useContext, useEffect, useState } from "react";
import { ColorContext } from "./ColorSwitcher";
import { useSocket } from "./SocketProvider";

function ChatHistory() {
  const { darkMode } = useContext(ColorContext);
  const [messages, setMessages] = useState([]);
  const socket = useSocket(); // importieren der Socket-Verbindung

  // Nachrichten-Objekt aus dem Backend empfangen,
  // im State speichern und in der Komponente anzeigen
  useEffect(() => {
    if (socket) {
      // Nachrichten-Objekt über das "receive_message"-Event aus dem Backend empfangen
      socket.on("receive_message", (message) => {
        // Nachrichten-Objekte speichern
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    return () => {
      if (socket) {
        // "receive_message"-Event beenden
        socket.off("receive_message");
      }
    };
  }, [socket]);

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
                ? darkMode
                  ? "#1e90ff"
                  : "#00bfff"
                : darkMode
                ? "#444444"
                : "#EAEAEA",
              color: darkMode ? "#ffffff" : "#000000",
              maxWidth: "100%",
              wordWrap: "break-word",
              boxShadow: darkMode
                ? "0px 4px 10px rgba(0, 0, 0, 0.5)"
                : "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontSize: "24px" }}>{msg.text}</p>
            <p style={{ fontSize: "16px" }}>
              {msg.user}
              <span style={{ fontSize: "8px" }}> {msg.timestamp}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
