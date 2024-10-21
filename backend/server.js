import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { addChatMessage, getChatMessages, } from "./database/database.js";

const app = express();
const server = createServer(app);
const port = 3000;

app.use(cors());
app.use(express.json());

// Socket.io-Server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// auf "connection-Event" in Socket warten
io.on("connection", (socket) => {
  console.log(`User verbunden: ${socket.id}`);

  // Daten über das "send_message"-Event aus dem Frontend empfangen
  socket.on("send_message", async(messageData) => {
    console.log("Nachricht erhalten:", messageData);
   
    try {
      // Add the chat message to the database
      await addChatMessage(messageData.text, messageData.userid, messageData.timestamp);
      console.log("Message added to database");
      // Broadcast the message to other clients
      socket.broadcast.emit("receive_message", messageData);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });
});
    
// Get chat messages from the database
app.get("/chat", async (req, res) => {
  try {
    const chatMessages = await getChatMessages();
    res.status(200).send(chatMessages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).send("Error fetching chat messages");
  }
});

  // Post a new chat message
app.post("/chat", async(req, res) => {
   const { userid, text } = req.body;
   try {
    await addChatMessage(userid, text);
    res.send({ message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).send("Error adding message");
  }
});



server.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
