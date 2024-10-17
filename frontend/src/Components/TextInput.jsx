import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";

function TextInput() {
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

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
          borderRadius: "20px",
          padding: "40px 50px 40px 20px",
          border: "none",
          width: "100%",
        }}
      />
      <button
        onClick={sendMessage}
        className="btn"
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          borderRadius: "20px",
          backgroundColor: "#F5F4F4",
          border: "none",
          color: "#565353",
          padding: "5px 20px",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default TextInput;
