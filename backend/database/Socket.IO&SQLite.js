import {Server} from "socket.io";
import sqlite3 from "sqlite3";
import {open} from "sqlite";

//set up the Scocket.IO server
const io = new Server(3001, {
    cors: {
        origin: "*",
    },
});

// Function to connect to SQLite database
async function initializeDatabase() {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });
    return db;
}
 const db = initializeDatabase();
 console.log("Socket.IO server is running on port 3001.");

//set up the chat messages
let chatMessages = [];

io.on("connection", (socket) => {
    socket.on("join", (username) => {
        socket.join(username); //join the room
        socket.emit("welcome", username); //welcome message
        socket.broadcast.emit("user joined", username); //Notify all other users that a new user has joined.
    });
    socket.on("message", (message) => {
        chatMessages.push({username: message.username, text: message.text, date: new Date()});
        socket.broadcast.emit("message", message);
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit("user left", socket.username); //Notify all other users that a user has left.
    });
});

//get the chat messages
export function getChatMessages(){
    return chatMessages;

//add a new chat message
export function addChatMessage(username, text) {
    chatMessages.push({username: username, text: text, date: new Date()});
}


//delete a chat message
export function deleteChatMessage(chatmessageid) {
    chatMessages.splice(chatmessageid, 1);
}

//rename a user
export function renameUser(userid, newUsername) {
    for (let i = 0; i < chatMessages.length; i++) {
        if (chatMessages[i].userid === userid) {
            chatMessages[i].username = newUsername;
        }
    }
}

//delete a user
export function deleteUser(userid) {
    for (let i = 0; i < chatMessages.length; i++) {
        if (chatMessages[i].userid === userid) {
            chatMessages.splice(i, 1);
        }
    }
}

}