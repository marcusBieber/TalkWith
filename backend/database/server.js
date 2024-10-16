import express from "express";
import cors from "cors";
import { initializeDatabase, addChatMessage, getChatMessages} from "./database.js";

const app = express();
const Port = 3000;

//middleware
app.use(cors());
app.use(express.json());

const db = initializeDatabase();

 // ChatDaten aus der datenbank auslesen
app.get("/chat", async(req, res) => {
    const chatMessage = await getChatMessages(db);
    let onlyTask = [];
    for (let eintrag of chatMessage) {
        onlyTask.push(eintrag.task)
    }
    console.log({ onlyTask })
    res.send(onlyTask)
})

app.post("/chat", async(req, res) => {
   const body = req.body;
   const text = body.text
   await addChatMessage(userid, text);

   res.send("OK")
})

app.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}`);
});





