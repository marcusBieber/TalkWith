import React, { useState, useContext } from "react"; // Single import for useState and useContext
import { ColorContext } from "./ColorSwitcher";      // Color context import
import { useSocket } from "./SocketProvider";        // Socket provider import
import "../App.css";                                 // CSS import
import CustomButton from "./CustomButton";           // CustomButton import

function TextInput({ username }) {
  const [message, setMessage] = useState("");        // State to store the message
  const { darkMode } = useContext(ColorContext);     // Access darkMode from context
  const socket = useSocket();                        // Socket instance from SocketProvider

  // Function to construct and send a message to the backend
  const sendMessage = () => {
    if (socket) {
      const messageData = {
        id: Date.now(),                             // Unique ID for the message
        user: username,                             // Username of the sender
        text: message,                              // Message content
        timestamp: new Date().toISOString(),        // Timestamp in ISO format
      };
      socket.emit("send_message", messageData);     // Emit message to the backend
      setMessage("");                               // Clear the input field after sending
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <textarea
        id="input"
        placeholder="schreib' eine Nachricht..."    // Placeholder for the input
        value={message}                            // Bound to the message state
        className={`input-field ${darkMode ? "dark" : ""}`} // Dark mode styling
        onChange={(e) => setMessage(e.target.value)} // Update state on input change
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();                 // Prevent line breaks on Enter
            sendMessage();                          // Send message when Enter is pressed
          }
        }}
        style={{
          width: "100%",    // Full width
          height: "70px",   // Adjust height
          resize: "none",   // Disable resizing of the textarea
        }}
      />
      <div style={{ marginTop: "15px" }}>
        <CustomButton
          onClick={sendMessage}                     // Send message on button click
          className={`btn btn-custom ${darkMode ? "btn-dark" : "btn-light"}`} // Conditional dark mode styling
        >
          Senden                                   {/* Button text */}
        </CustomButton>
      </div>
    </div>
  );
}

export default TextInput;