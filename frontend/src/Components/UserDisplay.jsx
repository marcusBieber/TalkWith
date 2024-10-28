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
    <div className="d-flex flex-column flex-grow-1"
     style={{
      border: "none",
      borderRadius: "5px",
      backgroundColor: darkMode ? "#242424" : "#D9D9D9",
      margin: "3px",
      maxHeight: "calc(100vh - 160px)", // Maximale Höhe entsprechend anpassen
      padding: "15px",

    }}>
      <div className="list-group" style={{fontFamily: "Inter, sans-serif",

          fontWeight: 600,}}>
        {users.map((user, index) => (
          <div
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{

              backgroundColor: darkMode ? "#565656" : "#EAEAEA",
              overflow: "hidden", // Verhindert, dass der Text überläuft
              textOverflow: "ellipsis", // Fügt "..." hinzu, wenn der Text zu lang ist
              whiteSpace: "nowrap", // Verhindert Zeilenumbrüche
              color: darkMode ? "#ffffff" : "#000000",
              boxShadow: darkMode ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span className="fw-bold">{user}</span>
            <i
              className="fas fa-user-circle"
              style={{
                  width:"80px",
                  textAlign:"right",
                  marginLeft: '5px', // Minimale Lücke zwischen Name und Icon
                  fontSize: "24px",
                  color: darkMode ? '#EAEAEA' : '#d9d9d9',
                  padding: 0,
                  margin: 0,
              }}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDisplay;
