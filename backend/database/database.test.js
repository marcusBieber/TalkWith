const database = require('./database');
const { addChatMessage, getChatMessages, resetDatabase } = database;

// This will run before each test
beforeEach(async () => {
    await resetDatabase();
});

// Test if we can add a chat message
test('addChatMessage', async () => {    
    const text = "test message";
    
    await addChatMessage("testuser", text, Date.now(), new Date().toISOString()); // Wait for the chat message to be added
    const chatMessages = await getChatMessages(); // Wait for chat messages to be fetched
    
    expect(chatMessages.length).toBe(1);
    expect(chatMessages[0].username).toBe("testuser");
    expect(chatMessages[0].text).toBe(text);
});

// Test if we can delete a single chat message
test('deleteChatMessage', async () => {
    const text = "test message";
    await database.addChatMessage("testuser", text, Date.now(), new Date().toISOString()); // Wait for the chat message to be added
    
    let chatMessages = await database.getChatMessages(); // Wait for chat messages to be fetched
    const chatmessageid = chatMessages[0].id;
    
    await database.deleteChatMessage(chatmessageid); // Wait for the chat message to be deleted
    chatMessages = await database.getChatMessages(); // Wait for chat messages to be fetched
    
    expect(chatMessages.length).toBe(0);
})