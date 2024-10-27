import { ColorContext } from "./ColorSwitcher";
import { useState, useContext, useRef, useEffect } from "react";
import { useSocket } from "./SocketProvider";
import "../App.css";
import CustomButton from "./CustomButton";

function TextInput({ username }) {
  const [message, setMessage] = useState("");
  const { darkMode } = useContext(ColorContext);
  const socket = useSocket(); // importieren der Socket-Verbindung
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [message]);

  // Nachrichten-Objekt konstruieren und ins Backend schicken
  function sendMessage() {
    if (socket) {
      // konstruieren eines Nachrichten-Objekts 
      // mit "id", "user", "text" und "timestamp"
      const messageData = {
        id: Date.now(),
        user: username,
        text: message,
        timestamp: new Date().toString().slice(0, 21),
      };
      // senden des Nachrichten-Objekts über das "send_message"-Event
      socket.emit("send_message", messageData);
      setMessage("");
    }
  }

  // States für Hover- und Active-Zustände
  const [isHovered] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <textarea
        type="text"
        id="input"
        ref={inputRef}
        placeholder="schreib' eine Nachricht..."
        value={message}
        className={`input-field ${darkMode ? "dark" : ""}`}
        onChange={(e) => setMessage(e.target.value)} // Hier wird der State aktualisiert
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Verhindert den Umbruch bei "Enter" ohne Shift
            sendMessage();
          }
        }}
        style={{
          width: "100%", // Breite auf 100% setzen
          height: "70px", // Höhe anpassen, damit genug Platz für Text ist
          resize: "none", // Verhindert die Größenänderung des Textareas
          maxWidth: "100%", // Damit das Textfeld nicht zu breit wird
          marginBottom: "10px",
        }}
      />
      <div style={{ marginTop: "1px" }}>
        <CustomButton
          onClick={sendMessage}
          className={`btn btn-custom ${darkMode ? "btn-dark" : "btn-light"}`}
          style={{ width: "100%", maxWidth: "300px" }}
        >
          Senden
        </CustomButton>
      </div>
    </div>
  );
}

export default TextInput;