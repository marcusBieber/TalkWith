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

// Liste der angemeldeten Benutzer
let users = [];

// auf "connection"-Event in Socket warten
io.on("connection", (socket) => {
  console.log(`User verbunden: ${socket.id}`);

  // Benutzernamen über das "set_username"-Event aus dem Frontend empfangen
  socket.on("set_username", (username) => {
    socket.username = username;
    // username zur Benutzerliste hinzufügen
    users.push(username);
    console.log(`${username} hat sich angemeldet!`);
    // Benutzerliste über das "update_user"-Event ins Frontend senden
    io.emit("update_user", users);
  });

  // Daten über das "send_message"-Event aus dem Frontend empfangen
  socket.on("send_message", (messageData) => {
    console.log(`Nachricht von ${socket.username}:`, messageData);
    // Daten über das "receive_message"-Event ins Frontend senden
    io.emit("receive_message", messageData);
  });

  // Benutzerliste altualisieren wenn ein Benutzer die Verbindung trennt
  socket.on("disconnect", () => {
    if (socket.username) {
      console.log(`${socket.username} hat sich abgemeldet!`);
      users = users.filter((user) => user !== socket.username);
      io.emit("update_user", users);
    }
  });
});

server.listen(Port, () => {
  console.log(`Server läuft auf http://localhost:${Port}`);
});
