import sqlite3 from "sqlite3";

const dbFile = "./database.db";

function initializeDatabase() {
    const db = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            console.error("Error opening database:", err.message);
        } else {
            console.log("Connected to the database.");

			// Enable foreign key support
            db.run(`PRAGMA foreign_keys = ON;`, (err) => {
                if (err) {
                    console.error("Error enabling foreign keys:", err.message);
                }
            });

            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE
            )`, (err) => {
                if (err) {
                    console.error("Error creating table:", err.message);
                } else {
                    console.log("Table `users` created or already exists.");
                }
            });
            db.run(`CREATE TABLE IF NOT EXISTS chatmessages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT,
                date TEXT,
                userid INTEGER,
                FOREIGN KEY (userid) REFERENCES users(id)
            )`, (err) => {
                if (err) {
                    console.error("Error creating table:", err.message);
                } else {
                    console.log("Table `chatmessages` created or already exists.");
                }
            });
        }
    });

    return db;
}

const db = initializeDatabase();

// Add a new chat message
export function addChatMessage(userid, text) {
    return new Promise((resolve, reject) => {
        if (!userid || !text) {
            return reject("User ID and text are required.");
        }
        db.run(`INSERT INTO chatmessages (userid, text, date) VALUES (?, ?, ?)`, 
               [userid, text, new Date().toISOString()], (err) => {
            if (err) {
                return reject(`Error inserting data: ${err.message}`);
            }
            resolve("Data inserted successfully.");
        });
    });
}

// Get chat messages (last 100 by default)
export function getChatMessages(number=100) {
    return new Promise((resolve, reject) => {
		// TODO Reject if number is not a number or negative
        db.all(`SELECT * FROM chatmessages ORDER BY date LIMIT ${number}`, (err, rows) => {
            if (err) {
                return reject(`Error fetching data: ${err.message}`);
            } else {
                resolve(rows);
            }
        });
    });
}

// Add a new user
export function addUser(username) {
    return new Promise((resolve, reject) => {
        if (!username) {
            return reject("Username is required.");
        }
        db.run(`INSERT INTO users (username) VALUES (?)`, [username], (err) => {
            if (err) {
                return reject(`Error inserting data: ${err.message}`);
            }
            resolve("User added successfully.");
        });
    });
}

// Get a single user
// Get user by username
export function getUserByName(username) {
    return new Promise((resolve, reject) => {
		// TODO Reject if username is empty
        db.all(`SELECT * FROM users WHERE username = ?`, [username], (err, rows) => {
            if (err) {
                return reject(`Error fetching users: ${err.message}`);
            }
            resolve(rows); // Resolve with the array of users
        });
    });
}

// Delete a user
export function deleteUser(userid) {
    return new Promise((resolve, reject) => {
		// TODO Reject if userid is not a number or negative
        db.run(`DELETE FROM users WHERE id = ?`, [userid], (err) => {
            if (err) {
                reject(`Error deleting data: ${err.message}`);
            } else {
                resolve("Data deleted successfully.");
            }
        });
    });
}

// Rename user
export function renameUser(userid, newUsername) {
    return new Promise((resolve, reject) => {
		// TODO Reject if newUsername is empty
		// TODO Reject if userid is not a number or negative
        db.get(`SELECT 1 FROM users WHERE username = ?`, [newUsername], (err, row) => {
            if (err) {
                return reject(`Error checking username: ${err.message}`);
            }
            if (row) {
                reject("Username already taken.");
            } else {
                db.run(`UPDATE users SET username = ? WHERE id = ?`, [newUsername, userid], (err) => {
                    if (err) {
                        reject(`Error renaming user: ${err.message}`);
                    } else {
                        resolve("User renamed successfully.");
                    }
                });
            }
        });
    });
}

// Delete chat message
export function deleteChatMessage(chatmessageid) {
    return new Promise((resolve, reject) => {
		// TODO Reject if chatmessageid is not a number or negative
        db.run(`DELETE FROM chatmessages WHERE id = ?`, [chatmessageid], (err) => {
            if (err) {
                reject(`Error deleting data: ${err.message}`);
            } else {
                resolve("Data deleted successfully.");
            }
        });
    });
}

// Reset the database contents
export function resetDatabase() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`, (err) => {
                if (err) {
                    return reject(`Error starting transaction: ${err.message}`);
                }

                db.run(`DELETE FROM chatmessages`, (err) => {
                    if (err) {
                        return db.run(`ROLLBACK`, () => {
                            reject(`Error deleting chat messages: ${err.message}`);
                        });
                    }

                    db.run(`DELETE FROM users`, (err) => {
                        if (err) {
                            return db.run(`ROLLBACK`, () => {
                                reject(`Error deleting users: ${err.message}`);
                            });
                        }

                        db.run(`COMMIT`, (err) => {
                            if (err) {
                                return reject(`Error committing database reset: ${err.message}`);
                            }
                            resolve("Database reset successfully.");
                        });
                    });
                });
            });
        });
    });
}
