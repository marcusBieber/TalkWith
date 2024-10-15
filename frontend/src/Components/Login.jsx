function Login() {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" name="username" required/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
          <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
