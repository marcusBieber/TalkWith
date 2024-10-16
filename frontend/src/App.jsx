import ChatHistory from './Components/ChatHistory'
import Login from './Components/Login'
import TextInput from './Components/TextInput'
import UserDisplay from './Components/UserDisplay'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  
  return (
    <div className="container-fluid d-flex flex-column vh-100 bg-light">
    {/* Überschrift/Login Bereich */}
    <div className="w-100 mb-3" style={{
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#D9D9D9',
      padding: '15px 15px'
    }}>
      <div className="d-flex align-items-center justify-content-between">
        <Login style={{ marginRight: '10px', flexShrink: 0 }} />
        <h1 className="text-center mb-0 flex-grow-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 100 }}>Talk With</h1>
      </div>
    </div>

    <div className="d-flex flex-grow-1">
      {/* Sidebar für die Benutzerliste */}
      <div className="sidebar" style={{
        width: '250px',
        border: 'none',
        borderRadius: '5px',
        color: '#565353',
        backgroundColor: '#D9D9D9',
        padding: '15px',
        marginRight: '15px',
      }}>
        <div className="d-flex align-items-start justify-content-start">
          <UserDisplay />
        </div>
      </div>

      {/* Chat-Historie */}
<div className="flex-grow-1 d-flex flex-column">
  <div className="chat-history flex-grow-1" style={{
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#D9D9D9',
    padding: '10px',
    overflowY: 'auto' // Ermöglicht das Scrollen bei langen Chatverläufen
  }}>
    <ChatHistory />
    {/* Texteingabe */}
    <div >
    <TextInput />
    </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default App
