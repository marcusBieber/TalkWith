import ChatHistory from "./Components/ChatHistory";
import TextInput from "./Components/TextInput";
import UserDisplay from "./Components/UserDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ColorSwitcher,
  ColorProvider,
  ColorContext,
} from "./Components/ColorSwitcher";
import "./App.css";
import { useContext,useEffect, useRef, useState } from "react";
import { SocketProvider } from "./Components/SocketProvider";
import Login from "./Components/Login";
import LogOff from "./Components/LogOff";

function App() {
  const [username, setUsername] = useState("");

  return (
    <ColorProvider>
      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <SocketProvider username={username}>
          <MainComponent username={username} setUsername={setUsername} />
        </SocketProvider>
      )}
      ;
    </ColorProvider>
  );
}
const MainComponent = ({ username, setUsername }) => {
  const { darkMode } = useContext(ColorContext);

  return (
    <div
      className={`container-fluid d-flex flex-column vh-100 ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
      style={{
        backgroundColor: darkMode ? "#151515" : "#ffffff",
        color: darkMode ? "#ffffff" : "#151515",
        padding: "15px",
        marginTop: "20px"
      }}
    >
      {/* Überschrift/Login Bereich */}
      <div
        className={`header-bar mb-3  ${darkMode ? "shadow" : "shadow-sm"}`}
        style={{
          borderRadius: "5px",
          backgroundColor: darkMode ? "#242424" : "#D9D9D9",
          color: darkMode ? "#ffffff" : "#000000",
          padding: "10px",
          margin: "3px", // Vereinheitlichung der Margen
          width: "calc(100% - 6px)",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <LogOff setUsername={setUsername} />
          <div className="d-flex flex-grow-1 justify-content-center align-items-end">
            <h1
              style={{
                textShadow: darkMode
                  ? "2px 2px 4px rgba(255, 255, 255, 0.7)"
                  : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 100,
              }}
            >
              ChatWith
            </h1>
            <p
              style={{
                textShadow: darkMode
                ? "2px 2px 4px rgba(255, 255, 255, 0.7)"
                : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                margin: "0",
                paddingLeft: "10px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 100,
                lineHeight: "2.7",
              }}
            >
              Hallo {username}!
            </p>
          </div>
          <ColorSwitcher />
        </div>
      </div>

      <div className="d-flex flex-grow-1 " style={{ gap: "15px", marginBottom: "15px", }}>
        {/* Sidebar für die Benutzerliste */}
        <div
          className={`sidebar d-flex flex-column align-items-center ${
            darkMode ? "shadow" : "shadow-sm"
          }`}
          style={{
            border: "none",
            borderRadius: "5px",
            color: "#565353",
            backgroundColor: darkMode ? "#242424" : "#D9D9D9",
            marginBottom: "1px",
            margin: "3px",
            maxHeight: "calc(100vh - 125px)", 
            flex: "0 0 250px", 
            minWidth: "0",
            

          }}
        >
          <div className="d-flex align-items-start justify-content-start">
            <UserDisplay />
          </div>
        </div>

        {/* Chat-Historie */}
        <div
          className={`chat-history flex-grow-1 ${
            darkMode ? "shadow" : "shadow-sm"
          }`}
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: darkMode ? "#242424" : "#D9D9D9",
            padding: "15px",
            margin: "3px",
            marginBottom: "15px", // Abstand zum unteren Ende der Website
            maxHeight: "calc(100vh - 125px)",
            display: "flex",
            flexDirection: "column",
            flex: "1", // Flexgrow für die Chatbox
            minWidth: "0",
          }}
        >
          <ChatHistory username={username} darkMode={darkMode} />
          {/* Texteingabe */}
          <div className="mt-3" >
            <TextInput username={username} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
