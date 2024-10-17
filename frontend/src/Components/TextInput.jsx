import io from "socket.io-client";
import { useEffect } from "react";

function TextInput() {
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
          backgroundColor: '#EAEAEA',
          borderRadius: '20px',
          padding: '40px 50px 40px 20px',
          border: 'none',
          width: '100%', 
        }} 
      />
      <button
        onClick={sendMessage}
        className="btn"
        style={{
          position: 'absolute', 
          right: '10px', 
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '20px',
          backgroundColor: '#D9D9D9',
          border: 'none', 
          color: '#565353',
          padding: '2px 20px',
        }}>

        Send
      </button>
    </div>
  );
}

export default TextInput;