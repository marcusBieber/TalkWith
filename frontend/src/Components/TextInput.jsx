function TextInput() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input 
        type="text" 
        style={{
          backgroundColor: '#EAEAEA',
          borderRadius: '20px',
          padding: '40px 50px 40px 20px',
          border: 'none',
          width: '100%', 
        }} 
      />
      <button 
        className="btn"
        style={{
          position: 'absolute', 
          right: '10px', 
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '20px',
          backgroundColor: '#D9D9D9',
          border: 'none', 
          color: '#565353',
          padding: '2px 20px',
        }}>
        Send
      </button>
    </div>
  );
}

export default TextInput;
