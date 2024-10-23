import React from "react";
import { useSocket } from "./SocketProvider";
import CustomButton from "./CustomButton";

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
        <CustomButton onClick={handleLogOff}>
            Abmelden
        </CustomButton>
    );
}

export default LogOff;
