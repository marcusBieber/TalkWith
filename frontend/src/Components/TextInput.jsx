import io from "socket.io-client";
import { useEffect, useContext } from "react";
import { ColorContext } from "./ColorSwitcher";

function TextInput() {
  const { darkMode } = useContext(ColorContext);
  const socket = io("http://localhost:3000");

  socket.on("connect_error", (err) => {
    console.error(`Verbindungsfehler: ${err.message}`);
  });

  const sendMessage = () => {
    socket.emit("send_message", { message: "Hallo aus dem Frontend" });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        id="input"
        placeholder="schreib' eine Nachricht..."
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
