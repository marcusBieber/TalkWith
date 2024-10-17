import {Server} from "socket.io";
import sqlite3 from 'sqlite3';
const { open } = sqlite3;
import {getChatMessages, addChatMessage, deleteChatMessage} from "./database.js";

//set up the Scocket.IO server
const io = new Server(3000, {
    cors: {
        origin: "*",
    },
});

// Function to connect to SQLite database
async function connectToDatabase() {
    const db = await open({
        filename: `./database.db`,
        driver: sqlite3.Database
    });
    return db;
}

// Open database connection
const db = await connectToDatabase();
console.log("Socket.IO server is running on port 3001.");

//set up the chat messages
let chatMessages = [];


// io.on("connection", (socket) => {
//     socket.on("join", (username) => {
//         socket.join(username); //join the room
//         socket.emit("welcome", username); //welcome message
//         socket.broadcast.emit("user joined", username); //Notify all other users that a new user has joined.
//     });
//     socket.on("message", (message) => {
//         chatMessages.push({username: message.username, text: message.text, date: new Date()});
//         socket.broadcast.emit("message", message);
//     });
//     socket.on("disconnect", () => {
//         socket.broadcast.emit("user left", socket.username); //Notify all other users that a user has left.
//     });
// });


// Handle client connections
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

	// Handle getChatMessages event
	socket.on('getChatMessages', async () => { 
		const chatMessages = await getChatMessages(); // Call the getChatMessages function 
		socket.broadcast.emit('chatMessages', chatMessages); // Emit the chatMessages to the client
	});

	//Handle addChatMessage event
	socket.on('addChatMessage', async (message) => { 
		const chatMessage = await addChatMessage(message.username, message.text); // Call the addChatMessage function
		socket.broadcast.emit('chatMessage', chatMessage); // Emit the chatMessage to all clients except the sender
	});

	//Handle deleteChatMessage event
	socket.on('deleteChatMessage', async (chatmessageid) => {
		const chatMessage = await deleteChatMessage(chatmessageid); // Call the deleteChatMessage function
		socket.broadcast.emit('chatMessage', chatMessage); // Emit the chatMessage to all clients
	})
	socket.on('disconnect', () => {
		console.log(`Client disconnected: ${socket.id}`);
	});
});

