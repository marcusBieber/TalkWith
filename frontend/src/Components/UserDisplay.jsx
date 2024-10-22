import React, { useEffect, useState, useContext } from "react";
import { ColorContext } from "./ColorSwitcher";

const dummyUsers = [
  { id: 1, name: "Kaho" },
  { id: 2, name: "Marcus" },
  { id: 3, name: "Ilona" },
];
function UserDisplay() {
  const { darkMode } = useContext(ColorContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    setUsers(dummyUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <h3
        style={{
          margin: "20px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          backgroundcolor: darkMode ? "#ffffff" : "#000000",
          color: darkMode ? "#ffffff" : "#000000",

        }}
      >
        User
      </h3>
      <div className="list-group" style={{fontFamily: "Inter, sans-serif",
          fontWeight: 600,}}>
        {users.map((user) => (
          <div
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: darkMode ? "#565656" : "#EAEAEA",
              color: darkMode ? "#ffffff" : "#000000",
              boxShadow: darkMode ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span className="fw-bold">{user.name}</span>
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
