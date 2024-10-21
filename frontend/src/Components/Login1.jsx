import { useState } from "react";

// Benutzernamen abfragen und im State speichern,
// State wird über onLogin() an den SocketProvider weitergegeben,
// SocketProvider und MainComponent werden erst geladen,
// wenn sich der Nutzer mit einem Benutzernamen angemeldet hat
function Login1({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-popup">
      <input
        type="text"
        placeholder="Benutzername..."
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button onClick={handleLogin}>Anmelden</button>
    </div>
  );
}

export default Login1;
