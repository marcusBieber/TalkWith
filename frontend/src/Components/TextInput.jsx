import React, { useState, useContext } from "react";
import { ColorContext } from "./ColorSwitcher";
import { useState, useContext } from "react";
import { useSocket } from "./SocketProvider";
import "../App.css"

function TextInput({ username }) {
  const [message, setMessage] = useState("");
  const { darkMode } = useContext(ColorContext);
  const socket = useSocket(); // importieren der Socket-Verbindung

  // Nachrichten-Objekt konstruieren und ins Backend schicken
  const sendMessage = () => {
    if (socket) {
      // konstruieren eines Nachrichten-Objekts 
      // mit "id", "user", "text" und "timestamp"
      const messageData = {
        id: Date.now(),
        user: username,
        text: message,
        timestamp: new Date().toISOString(), // Use ISO format for better compatibility
      };
      // senden des Nachrichten-Objekts über das "send_message"-Event
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <input
        type="text"
        id="input"
        placeholder="schreib' eine Nachricht..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`input-field ${darkMode ? "dark" : ""}`}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Verhindert den Umbruch bei "Enter" ohne Shift
            sendMessage(); // Sendet die Nachricht
          }
        }}
      />
      <button
        onClick={sendMessage}
        className={`btn btn-custom ${darkMode ? "btn-dark" : "btn-light"}`}
      >
        Senden
      </button>
    </div>
  );
}

export default TextInput;