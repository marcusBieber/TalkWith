import { ColorContext } from "./ColorSwitcher";
import { useState, useContext } from "react";
import { useSocket } from "./SocketProvider";

function TextInput() {
  const [message, setMessage] = useState("");
  const { darkMode } = useContext(ColorContext);

  /*
  //const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connection_error", (err) => {
      console.error(`Verbindungsfehler: ${err.message}`);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  */
  const socket = useSocket();

  const test = () => {
    console.log(socket);
  };

  const sendMessage = () => {
    if (socket) {
      const messageData = {
        id: Date.now(),
        text: message,
        timestamp: new Date().toString().slice(0, 21),
      };
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
