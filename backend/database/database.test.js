const database = require('./database');
const { addChatMessage, getChatMessages, resetDatabase } = database;

// This will run before each test
beforeEach(async () => {
    await resetDatabase();
});

// Test if we can add a chat message
test('addChatMessage', async () => {
    const userid = 1;
    const text = "test message";
    
    await addChatMessage(userid, text); // Wait for the chat message to be added
    const chatMessages = await getChatMessages(); // Wait for chat messages to be fetched
    
    expect(chatMessages.length).toBe(1);
    expect(chatMessages[0].userid).toBe(userid);
    expect(chatMessages[0].text).toBe(text);
});

// Test if we can add a new user
test('addUser', async () => {
    const username = "testuser";
    
    await database.addUser(username); // Wait for the user to be added
    const users = await database.getUserByName(username); // Wait for users to be fetched
    
    expect(users.length).toBe(1);
    expect(users[0].username).toBe(username);
});

// Test if we can delete a user
test('deleteUser', async () => {
    const username = "testuser";
    await database.addUser(username); // Wait for the user to be added
    
    let users = await database.getUserByName(username); // Wait for users to be fetched
    const userid = users[0].id;
    
    await database.deleteUser(userid); // Wait for the user to be deleted
    users = await database.getUserByName(userid); // Wait for users to be fetched
    
    expect(users.length).toBe(0);
})

// Test if we can rename a user
test('renameUser', async () => {
    const username = "testuser";
    await database.addUser(username); // Wait for the user to be added
    
    let users = await database.getUserByName(username); // Wait for users to be fetched
    const userid = users[0].id;
    
    await database.renameUser(userid, "newusername"); // Wait for the user to be renamed
    users = await database.getUserByName("newusername"); // Wait for users to be fetched
    
    expect(users.length).toBe(1);
    expect(users[0].username).toBe("newusername");
})

// Test if we can delete a single chat message
test('deleteChatMessage', async () => {
    const userid = 1;
    const text = "test message";
    await database.addChatMessage(userid, text); // Wait for the chat message to be added
    
    let chatMessages = await database.getChatMessages(); // Wait for chat messages to be fetched
    const chatmessageid = chatMessages[0].id;
    
    await database.deleteChatMessage(chatmessageid); // Wait for the chat message to be deleted
    chatMessages = await database.getChatMessages(); // Wait for chat messages to be fetched
    
    expect(chatMessages.length).toBe(0);
})