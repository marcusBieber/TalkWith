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

            db.run(`CREATE TABLE IF NOT EXISTS chatmessages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT,
                date TEXT,
                username TEXT
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
export function addChatMessage(username, text,id,timestamp) {
    return new Promise((resolve, reject) => {
        if (!username || !text || !id || !timestamp) {
            return reject("One of the fields was empty.");
        }
        db.run(`INSERT INTO chatmessages (id, text, date, username) VALUES (?, ?, ?, ?)`, 
               [id, text, timestamp, username], (err) => {
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
}
