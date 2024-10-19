import { ColorContext } from "./ColorSwitcher";
import { useState, useContext } from "react";
import { useSocket } from "./SocketProvider";

function TextInput() {
  const [message, setMessage] = useState("");
  const { darkMode } = useContext(ColorContext);
  const socket = useSocket(); // importieren der Socket-Verbindung

  // Nachrichten-Objekt konstruieren und ins Backend schicken
  const sendMessage = () => {
    if (socket) {
      // konstruieren des Nachrichten-Objekts mit "id", "text" und "timestamp"
      const messageData = {
        id: Date.now(),
        text: message,
        timestamp: new Date().toString().slice(0, 21),
      };
      // senden des Nachrichten-Objekts über das "send_message"-Event
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        id="input"
        placeholder="schreib' eine Nachricht..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        style={{
          backgroundColor: darkMode ? "#565656" : "#EAEAEA",
          borderRadius: "20px",
          padding: "40px 50px 40px 20px",
          border: "none",
          width: "100%",
          color: darkMode ? "#ffffff" : "#000000",
          boxShadow: darkMode
            ? "0px 4px 10px rgba(0, 0, 0, 0.5)"
            : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
      <button
        onClick={sendMessage}
        className={`btn btn-custom ${darkMode ? "btn-dark" : "btn-light"}`}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          padding: "5px 20px",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default TextInput;
