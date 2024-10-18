import io from "socket.io-client";
import { ColorContext } from "./ColorSwitcher";
import { useEffect, useState, useRef, useContext } from "react";

function TextInput() {
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const { darkMode } = useContext(ColorContext);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connection_error", (err) => {
      console.error(`Verbindungsfehler: ${err.message}`);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("send_message", { message });
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
