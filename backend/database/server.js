import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { addChatMessage, getChatMessages} from "./database.js";

const app = express();
const server = createServer(app);
const port = 3000;

//middleware
 app.use(cors());
 app.use(express.json());

 // Socket.io-Server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
  },
});

// auf "connection-Event" in Socket warten
io.on("connection", (socket) => {
  console.log(`User verbunden: ${socket.id}`);

  // Daten über das "send_message"-Event aus dem Frontend empfangen
  socket.on("send_message", (data) => {
    console.log("Nachricht erhalten:", data);
    // Daten über das "receive_message"-Event ins Frontend senden
    socket.broadcast.emit("receive_message", data);
  });
});

 // Get chat messages from the database
 app.get("/chat", async (req, res) => {
    try {
      const chatMessages = await getChatMessages();
      const onlyTasks = chatMessages.map((message) => message.task); 
      console.log({ onlyTasks });
      res.status(200).send(onlyTasks);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).send("Error fetching chat messages");
    }
  });

  // Post a new chat message
app.post("/chat", async(req, res) => {
   const { userid, text } = req.body;

   await addChatMessage(userid, text);
   res.send({ message: "Message added successfully" })
})

server.listen(Port, () => {
  console.log(`Server läuft auf http://localhost:${Port}`);
});

