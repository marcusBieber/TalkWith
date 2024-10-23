import React, { useEffect, useState, useContext } from "react";
import { ColorContext } from "./ColorSwitcher";
import { useSocket } from "./SocketProvider";

function UserDisplay() {
  const { darkMode } = useContext(ColorContext);
  const [users, setUsers] = useState([]);
  const socket = useSocket(); // importieren der Socket-Verbindung

  // Benutzerliste vom Server empfangen, zum Rendern im State speichern
  // und bei jedem An- und Abmelden aktualisieren
  useEffect(() => {
    if (socket) {
      socket.on("update_user", (users) => {
        setUsers(users);
      });
    }
  }, [socket]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="list-group" style={{ marginTop: "20px", fontFamily: "Inter, sans-serif",

          fontWeight: 600,}}>
        {users.map((user, index) => (
          <div
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: darkMode ? "#565656" : "#EAEAEA",
              color: darkMode ? "#ffffff" : "#000000",
              boxShadow: darkMode ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span className="fw-bold">{user}</span>
            <i
              className="fas fa-user-circle"
              style={{
                padding: "0 50px 0 50px",
                fontSize: "24px",
                color: darkMode ? '#EAEAEA' : '#d9d9d9',
              }}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDisplay;
