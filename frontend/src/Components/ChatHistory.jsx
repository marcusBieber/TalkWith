function ChatHistory() {
  {
    /*Dummy Nachrichten*/
  }
  const messages = [
    { id: 1, user: "Marcus", text: "Hallo!" },
    { id: 2, user: "Kaho", text: "Heey!" },
    { id: 3, user: "Ilona", text: "HuHuu!" },
  ];
  return (
    <div
      style={{
        backgroundColor: '#EAEAEA',
        height: "650px",
        overflowY: "scroll",
        padding: "10px",
        borderRadius: "20px",
        border: "1px solid #ccc",
      }}
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`d-flex mb-2 ${
            msg.isUser ? "justify-content-end" : "justify-content-start"
          }`}
        >
          <div
            className={`p-2 rounded w-100 ${
              msg.isUser ? "bg-primary text-white" : "bg-light text-dark"
            }`}
            style={{
              maxWidth: "100%",
              wordWrap: "break-word",
            }}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
