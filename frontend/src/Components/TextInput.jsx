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
        timestamp: new Date().toString().slice(0, 21),
      };
      // senden des Nachrichten-Objekts über das "send_message"-Event
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  // States für Hover- und Active-Zustände
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    borderRadius: '20px',
    transform: `translateY(${isHovered ? '-2px' : '0'})`,
    padding: "5px 20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: isHovered ? "0px 4px 15px rgba(0, 0, 0, 0.2)" : "none",
  };

  const maxLineLength = 45

  const handleChange = (event) => {
    const inputValue = event.target.value;

    // Teilt den Text in Zeilen auf
    const lines = inputValue.split("\n").map(line => {
      // Bei jeder Zeile: Wenn die aktuelle Länge die maximale Länge überschreitet, teile sie in neue Zeilen
      if (line.length > maxLineLength) {
        const newLines = [];
        for (let i = 0; i < line.length; i += maxLineLength) {
          newLines.push(line.slice(i, i + maxLineLength));
        }
        return newLines.join("\n"); // Fügt die neuen Zeilen wieder zusammen
      }
      return line; // Gibt die Zeile unverändert zurück, wenn sie die maximale Länge nicht überschreitet
    });

    // Verbindet alle Zeilen mit einem Zeilenumbruch
    setMessage(lines.join("\n"));
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <input
        type="text"
        id="input"
        placeholder="schreib' eine Nachricht..."
        value={message}
        onChange={handleChange}  // Hier wird die handleChange-Funktion genutzt
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
        style={{...buttonStyle, margin: "10px 0",}}
        onMouseEnter={() => setIsHovered(true)}  // Hover aktivieren
        onMouseLeave={() => setIsHovered(false)} // Hover deaktivieren
        onMouseDown={() => setIsActive(true)}     // Active aktivieren
        onMouseUp={() => setIsActive(false)}      // Active deaktivieren
      >
        Senden
      </button>
    </div>
  );
}

export default TextInput;
