import './App.css'
import ChatHistory from './Components/ChatHistory'
import Login from './Components/Login'
import TextInput from './Components/TextInput'
import UserDisplay from './Components/UserDisplay'

function App() {
  
  return (
      <div>
        <h1>TalkWith</h1>
        <ChatHistory />
        <Login />
        <TextInput />
        <UserDisplay />
      </div>
  )
}

export default App
