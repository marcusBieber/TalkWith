import React, {  useState } from 'react';

function TextInput() {
    const [texts, setTexts] = useState([]); // store all messages  
    const [input, setInput] = useState(""); // store input
    const [userid, setUserid] = useState(""); // store userid

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleUseridChange = (e) => {
        setUserid(e.target.value);
    };

    const handleTextInput = async () => {
        if (!input.trim()) return; 

        const newMessage = {
            id: Date.now(),
            text: input,
            date: new Date(),
        }
        setInput(""); //clear input
        setUserid(""); //clear userid


    try{
        const response =  await fetch(`http://localhost:3000/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: newMessage.text, userid: newMessage.userid })
        });

        if(!response.ok){
            throw new Error("Unexpected status code: " + response.status);
        }
    
         const data = await response.json();
         console.log("message added:", data);

         setTexts([...texts, newMessage]); //add new message

    }catch(error){
        console.error("Error adding message:", error);
    }

    };
    

    return (
        <div>
            <div className="textInput">
                <input type="text"
                    placeholder='Enter your message here...'
                    value={input}
                    onChange={handleChange}
                    
                />
                <input type="text"
                    placeholder='Enter your userid here...'
                    value={userid}
                    onChange={handleUseridChange}
                />  
                <button onClick={handleTextInput} >send</button>
            </div>

        </div>
);
}

export default TextInput;
