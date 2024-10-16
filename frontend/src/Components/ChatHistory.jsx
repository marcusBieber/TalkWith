function ChatHistory() {
  {/*Dummy Nachrichten*/}
  const messages = [
    {id: 1, user: 'Marcus', text: 'Hallo!'},
    {id: 2, user: 'Kaho', text: 'Heey!'},
    {id: 3, user: 'Ilona', text: 'HuHuu!'}
  ]
  return (
    <div style={{
      height: '700px',
      overflowY: 'scroll',
      padding: '10px',
      backgroundColor: '#F5F5F5',
      borderRadius: '20px',
      border: '1px solid #ccc',
    }}>
      {messages.map((msg) => (
          <div key={msg.id} style={{
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#e0f7fa',
            borderRadius: '10px',
          }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
    </div>
  );
}

export default ChatHistory;
