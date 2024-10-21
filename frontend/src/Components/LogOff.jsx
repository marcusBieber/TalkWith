import React from "react";
import { useSocket } from "./SocketProvider";

// Websocket Verbindung trennen und und Benutzername aus State löschen
// löschen des Benutzernamens bewirkt Neu-Rendern der Login-Komponente
function LogOff({ setUsername }) {
  const socket = useSocket();

  const handleLogOff = () => {
    if (socket) {
      socket.disconnect();
    }
    setUsername("");
  };

  return (
        <button onClick={handleLogOff}>
            Abmelden
        </button>
    );
}

export default LogOff;
