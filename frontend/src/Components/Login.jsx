function Login() {
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
              border: "1px solid #ccc",
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
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-light"
            style={{
              borderRadius: "20px",
              backgroundColor: "#EAEAEA",
              border: "none",
              color: "#565353",
              padding: "2px 20px",
              marginLeft: "75px",
              cursor: "pointer",
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
