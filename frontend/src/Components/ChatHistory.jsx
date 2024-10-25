import React, { useContext, useEffect, useState } from "react";
import { ColorContext } from "./ColorSwitcher";
import { useSocket } from "./SocketProvider";

function ChatHistory({ username }) {
  const { darkMode } = useContext(ColorContext);
  const [messages, setMessages] = useState([]);
  const socket = useSocket(); // importieren der Socket-Verbindung

  // Nachrichten-Objekt aus dem Backend empfangen,
  // im State speichern und in der Komponente anzeigen
  useEffect(() => {
    // Fetch messages from database via /chat GET request and add to state
    async function getChatMessages() {
      try {
        const response = await fetch("http://localhost:3000/chat");
        const data = await response.json();
        console.log(data);
        // Convert messages into proper format (id, isUser, text, user, timestamp)
        const formattedMessages = data.map((msg) => ({
          id: msg.id,
          user: msg.username,
          text: msg.text,
          timestamp: msg.date,
          isUser: msg.username === username, // // isUser is set to true if the message was sent by the user that is currently logged in
        }));

        // Add messages to state (setMessages(...))
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    getChatMessages();

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
        margin:"3px",
        backgroundColor: darkMode ? "#242424" : "#EAEAEA",
        maxHeight: "calc(100vh - 160px)", 
        overflowY: "auto",
        padding: "10px",
        borderRadius: "20px",
        border: darkMode ? "1px solid #555" : "1px solid #ccc",
        scrollbarWidth: "thin",
        scrollbarColor: darkMode ? "#888 #242424" : "#888 #EAEAEA",
        boxShadow: darkMode
          ? "0px 4px 10px rgba(0, 0, 0, 0.7)" // Dunklerer Schatten im Dunkelmodus
          : "0px 4px 10px rgba(0, 0, 0, 0.1)", // Hellerer Schatten im hellen Modus
      }}
      className="scrollbar"
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`d-flex mb-2 ${
            msg.isUser ? "justify-content-end" : "justify-content-start"
          }`}
          style={{maxWidth: "100%",
            boxShadow: darkMode
              ? "0px 4px 10px rgba(0, 0, 0, 0.7)" // Dunklerer Schatten im Dunkelmodus
              : "0px 4px 10px rgba(0, 0, 0, 0.1)", // Hellerer Schatten im hellen Modus
          }}
        >
          <div
            className={`p-2 rounded w-100 shadow`}
            style={{
              backgroundColor: msg.isUser
                ? darkMode
                  ? "#989898"
                  : "#fefefe"
                : darkMode
                ? "#444444"
                : "#EAEAEA",
              color: darkMode ? "#ffffff" : "#000000",
              maxWidth: "100%",
              wordWrap: "break-word",
            }}
          >
            <p style={{ fontSize: "24px" }}>{msg.text}</p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
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
