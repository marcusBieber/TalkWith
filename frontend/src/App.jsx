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
import { useContext, useState } from "react";
import { SocketProvider } from "./Components/SocketProvider";
import Login1 from "./Components/Login1";

function App() {
  const [username, setUsername] = useState("");

  return (
    <ColorProvider>
      {!username ? (
        <Login1 onLogin={setUsername} />
      ) : (
        <SocketProvider>
          <MainComponent username={username} />
        </SocketProvider>
      )}
      ;
    </ColorProvider>
  );
}
const MainComponent = ({ username }) => {
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
          width:  "calc(100% - 6px)",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <h1
            className="text-center mb-0 flex-grow-1"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 100 }}
          >
            ChatWith
          </h1>
          <ColorSwitcher />
        </div>
      </div>

      <div className="d-flex flex-grow-1" style={{ gap: "10px"}}>
        {/* Sidebar für die Benutzerliste */}
        <div
          className={`sidebar d-flex flex-column align-items-center ${
            darkMode ? "shadow" : "shadow-sm"
          }`}
          style={{
            width: "250px",
            border: "none",
            borderRadius: "5px",
            color: "#565353",
            backgroundColor: darkMode ? "#242424" : "#D9D9D9",
            margin: "3px"
          }}
        >
          <h3 style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600}}>Hallo {username}!</h3>
          <div className="d-flex align-items-start justify-content-start">
            <UserDisplay />
          </div>
        </div>

        {/* Chat-Historie */}
        <div
          className={`chat-history flex-grow-1 overflow-auto ${
            darkMode ? "shadow" : "shadow-sm"
          }`}
          style={{
            border: "none",
            width: "30px",
            height: "820px",
            borderRadius: "5px",
            backgroundColor: darkMode ? "#242424" : "#D9D9D9",
            padding: "15px",
            boxShadow: darkMode
              ? "0px 4px 10px rgba(0, 0, 0, 0.5)"
              : "0px 4px 10px rgba(0, 0, 0, 0.1)",
            margin: "3px"
          }}
        >
          <ChatHistory darkMode={darkMode} />
          {/* Texteingabe */}
          <div className="mt-3">
            <TextInput username={username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
