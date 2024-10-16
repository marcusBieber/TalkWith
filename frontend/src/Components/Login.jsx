function Login() {
  return (
    <div >
      <form>
        <div>
          <label style={{ marginBottom: '5px'}}>Username:</label>
          <input type="text" name="username" required style={{
              borderRadius: '10px',
              padding: '0',
              border: '1px solid #ccc',}}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="text" name="password" required style={{
              borderRadius: '10px',
              padding: '0',
              border: '1px solid #ccc',
            }}/>
        </div>
          <button type="submit" className="btn"
        style={{
          borderRadius: '20px',
          backgroundColor: '#F5F4F4',
          border: 'none',
          color: '#565353',
          padding: '2px 20px',
          marginLeft: '10px'
        }}>Login</button>
      </form>
    </div>
  );
}

export default Login;
