import express from "express";
import cors from "cors";

const app = express();
const Port = 3000;

app.use(cors());
app.use(express.json());

// Dummy-Daten, die später durch die Datenbank ersetzt werden
let chatMessage = [
    { id: 2, user: "Marcus", message: "Hallo von Marcus!" },
    { id: 3, user: "Kaho", message: "Hallo von Kaho!" },
    { id: 4, user: "Ilona", message: "Hallo von Ilona!" }
];

app.get("/chat", (req, res) => {
    res.json(chatMessage);
});

app.post("/chat", (req, res) => {
    const newMessage = req.body;
    chatMessage.push(newMessage);
    res.status(201).json(newMessage);
});

app.listen(Port, () => {
    console.log(`Server läuft auf http://localhost:${Port}`);
});
