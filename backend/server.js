import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const Port = 3000;

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
  socket.on("send_message", (data) => {
    console.log("Nachricht erhalten:", data);
    // Daten über das "receive_message"-Event ins Frontend senden
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(Port, () => {
  console.log(`Server läuft auf http://localhost:${Port}`);
});
