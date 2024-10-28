import { useState, useRef, useEffect } from "react";
import AnimatedHeader from "./AnimatedHeader";
import CustomButton from "./CustomButton";

// Benutzernamen abfragen und im State speichern,
// State wird über onLogin() an den SocketProvider weitergegeben,
// SocketProvider und MainComponent werden erst geladen,
// wenn sich der Nutzer mit einem Benutzernamen angemeldet hat
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <div className="text-center">
        <AnimatedHeader />
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          <div className="mb-2 d-flex align-items-center">
            <input
              className="shadow"
              type="text"
              ref={inputRef}
              placeholder="Wie ist dein Name...?"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onKeyDown={(event) => {if (event.key === "Enter") handleLogin()}}
              autoComplete="on"
              name="username"
              required
              style={{
                borderRadius: "10px",
                padding: "5px 8px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                color: "#000",
                width: "300px",
                margin: "20px 15px",
              }}
            />
          </div>
          <div>
            <CustomButton
              type="submit"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Anmelden
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
