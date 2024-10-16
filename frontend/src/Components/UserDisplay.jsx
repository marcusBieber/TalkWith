import React, { useEffect, useState } from "react";

const dummyUsers = [
  { id: 1, name: "Kaho" },
  { id: 2, name: "Marcus" },
  { id: 3, name: "Ilona" },
];
function UserDisplay() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    setUsers(dummyUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 style={{ fontFamily: "Inter, sans-serif"}} >Benutzer</h2>
      <div className="list-group">
        {users.map((user) => (
          <div
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center" style={{backgroundColor: '#EAEAEA',}}
          >
            <span className="fw-bold">{user.name}</span>
            <i
              className="fas fa-user-circle"
              style={{
                padding: '0 50px 0 50px',
                fontSize: "24px",
                color: "#007bff",
              }}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDisplay;
