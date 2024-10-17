import React, { useContext } from "react";
import { ColorContext } from "./ColorSwitcher";

function Login() {
  const { darkMode } = useContext(ColorContext);

  return (
    <div className="d-flex justify-content-center align-items-center vh-10">
      <form style={{ width: "300px" }}>
        <div className="mb-2 d-flex align-items-center">
          <i className="fas fa-user" style={{ marginRight: "10px" }}></i>
          <input
            placeholder="Username"
            type="text"
            autoComplete="on"
            name="username"
            required
            style={{
              borderRadius: "10px",
              padding: "0px 0px 0px 8px",
              border: darkMode ? "1px solid #555" : "1px solid #ccc",
              backgroundColor: darkMode ? "#565656" : "#fff",
              color: darkMode ? "#ffffff" : "#",
            }}
          />
        </div>
        <div className="mb-2 d-flex align-items-center">
          <i className="fas fa-lock" style={{ marginRight: "10px" }}></i>
          <input
            placeholder="Password"
            type="password"
            name="password"
            required
            style={{
              borderRadius: "10px",
              padding: "0px 0px 0px 8px",
              border: darkMode ? "1px solid #555" : "1px solid #ccc",
              backgroundColor: darkMode ? "#565656" : "#fff",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className={`btn btn-custom ${darkMode ? "btn-dark" : "btn-light"}`}
            style={{
              backgroundColor: darkMode ? "#555" : "#EAEAEA",
              color: darkMode ? "#ffffff" : "#565353",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
