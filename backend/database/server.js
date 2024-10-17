import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { addChatMessage, getChatMessages, addUser, getUserByName } from "./database.js";

const app = express();
const server = createServer(app);
const port = 3000;

//middleware
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

  // FIXME This is just a dummy user, we should get the username from the frontend
  const dummyUserPassword = "password";
  addUser(socket.id, dummyUserPassword);

  // Daten über das "send_message"-Event aus dem Frontend empfangen
  socket.on("send_message", async (data) => {
    console.log("Nachricht erhalten:", data);

    try {
      // Use async/await to fetch the user
      const users = await getUserByName(socket.id);

      // Check if the user exists before accessing the id
      if (users.length === 0) {
        console.error("User not found:", socket.id);
        return; // Exit early if user is not found
      }

      const userid = users[0].id;
      const text = data.message;

      // Add the chat message to the database
      await addChatMessage(userid, text);
      console.log("message added to database");

      // Broadcast the message to other clients
      socket.broadcast.emit("receive_message", data);
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

