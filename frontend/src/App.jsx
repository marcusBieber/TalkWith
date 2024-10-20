import ChatHistory from "./Components/ChatHistory";
import Login from "./Components/Login";
import TextInput from "./Components/TextInput";
import UserDisplay from "./Components/UserDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ColorSwitcher,
  ColorProvider,
  ColorContext,
} from "./Components/ColorSwitcher";
import "./App.css";
import { useContext } from "react";
import { SocketProvider } from "./Components/SocketProvider";

function App() {
  return (
    <ColorProvider>
      <SocketProvider>
        <MainComponent />
      </SocketProvider>
    </ColorProvider>
  );
}
const MainComponent = () => {
  const { darkMode } = useContext(ColorContext);

  return (
    <div
      className={`container-fluid d-flex flex-column vh-100 ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
      style={{
        backgroundColor: darkMode ? "#151515" : "#ffffff",
        color: darkMode ? "#ffffff" : "#151515",
      }}
    >
      {/* Überschrift/Login Bereich */}
      <div
        className={`header-bar w-100 mb-3 ${darkMode ? "shadow" : "shadow-sm"}`}
        style={{
          borderRadius: "5px",
          backgroundColor: darkMode ? "#242424" : "#D9D9D9",
          color: darkMode ? "#ffffff" : "#000000",
          padding: "15px",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <Login style={{ marginRight: "10px", flexShrink: 0 }} />
          <i
            className="bi bi-chat-left-text"
            style={{ fontSize: "24px", marginRight: "10px" }}
          ></i>
          <h1
            className="text-center mb-0 flex-grow-1"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 100 }}
          >
            Talk With
          </h1>

          <ColorSwitcher />
        </div>
      </div>

      <div className="d-flex flex-grow-1">
        {/* Sidebar für die Benutzerliste */}
        <div
          className={`sidebar d-flex flex-column align-items-center justify-content-start ${
            darkMode ? "shadow" : "shadow-sm"
          }`}
          style={{
            width: "250px",
            border: "none",
            borderRadius: "5px",
            color: "#565353",
            backgroundColor: darkMode ? "#242424" : "#D9D9D9",
            padding: "15px",
            marginRight: "15px",
          }}
        >
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
            borderRadius: "5px",
            backgroundColor: darkMode ? "#242424" : "#D9D9D9",
            padding: "10px",
            boxShadow: darkMode
              ? "0px 4px 10px rgba(0, 0, 0, 0.5)"
              : "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ChatHistory darkMode={darkMode} />
          {/* Texteingabe */}

          <div
            className={`flex-grow-1 d-flex flex-column ${
              darkMode ? "shadow" : "shadow-sm"
            }`}
            style={{
              border: "none",
              borderRadius: "5px",
              backgroundColor: darkMode ? "#242424" : "#D9D9D9",
              padding: "10px",
            }}
          >
            <TextInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
