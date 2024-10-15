import React, { useEffect, useState } from "react"

const dummyUsers = [
  {id: 1, name: "Kaho"},
  {id: 2, name: "Marcus"},
  {id: 3, name: "Ilona"}
]
function UserDisplay() {

  const [users, setUsers] = useState([])

  const fetchUsers = () => {
    setUsers(dummyUsers)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Verbunden Benutzer:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}


export default UserDisplay;
