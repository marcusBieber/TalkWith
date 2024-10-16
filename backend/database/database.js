import sqlite3 from "sqlite3";

//Path to the database file
const dbFile = "./database.db";

export function initializeDatabase(){
	const db = new sqlite3.Database(dbFile, (err) => {
		if (err) {
			console.error("Error opening database:", err.message);
		}else{
			console.log("Connected to the database.");
			db.run(`CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				username TEXT
			)`,(err) => {
				if (err){
					console.log("Error creating table:", err.message);
				}else{
					console.log("Table `users` created or already exsits.");
				}
			});
			db.run(`CREATE TABLE IF NOT EXISTS chatmessages (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				text TEXT,
				date TEXT,
				userid INTEGER FOREIGN KEY REFERENCES users(id)
			)`,(err) => {
				if (err){
					console.log("Error creating table:", err.message);
				}else{
					console.log("Table `chatmessages` created or already exsits.");
				}
			});
		};
	});

	return db;
}
const db = initializeDatabase();

// Add a new chat message
export function addChatMessage(userid, text){
	db.run(`INSERT INTO chatmessages (userid, text, date) VALUES (?, ?, ?)`, [userid, text, new Date()], (err) => {
		if (err){
			console.log("Error inserting data:", err.message);
		}else{
			console.log("Data inserted successfully.");
		}
	});
}

// Add a new user
// Returns the id of the user
export function addUser(username){
	db.run(`INSERT INTO users (username)VALUES(?)`,[username], (err) => {
		if(err){
			console.log("Error inserting data:", err.message);
		}else{
			console.log("Data inserted successfully.");
		}
	})
}

// Get all chat messages
// Returns an array of chat messages
export function getChatMessages(){
	db.run(`INCERT INTO chatmessages(text, date)VALUES(?, ?)`, [text, new Date()], (err) => {
		if(err){
			console.log("Error inserting data:", err.message);
		}else{
			console.log("Data inserted successfully.");
		}
		})
}

// Delete a user
export function deleteUser(userid){
	db.run(`DELETE FROM users WHERE id = ?`,[userid],(err) => {
		if(err){
			console.log("Error deleting data:", err.message);
		}else{
			console.log("Data deleted successfully.");
		}
	})
}

// Rename user
// Returns the new username
// Special case: Returns the old username if the new username is already taken
export function renameUser(userid, newUsername){
	db.get(`SELECT 1 FROM users WHERE username = ?`, [newUsername], (err, row) => {
		if (err) {
			console.log("Error checking username:", err.message);
			return;
		}
		if (row) {
			console.log("Username already taken.");
		} else {
			db.run(`UPDATE users SET username = ? WHERE id = ?`, [newUsername, userid], (err) => {
				if (err) {
					console.log("Error renaming user:", err.message);
				} else {
					console.log("User renamed successfully.");
				}
			});
		}
	});
			
}

// Delete chat message
export function deleteChatMessage(chatmessageid){
	db.run(`DELETE FROM chatmessages WHERE id = ?`,[chatmessageid],(err) => {
		if(err){
			console.log("Error deleting data:", err.message);
		}else{
			console.log("Data deleted successfully.");
		}
	})
}




