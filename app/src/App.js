import React, { useState, useEffect } from "react";
import './App.css';
import io from 'socket.io-client';

let socket;
const CONNECTION = 'localhost:4000';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION, { transports: ['websocket'] });
  }, [])

  useEffect(() => {
    socket.on('message', (msg) => {
      console.log(msg);
      setMessages([...messages, msg]);
    });
  })

  

  const onSubmitHandler = (e) => {
    e.preventDefault();
    socket.emit('message', inputText);
    setInputText('');
  };

   

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="App">
      <ul id="messages">
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
      <form id="form">
        <input id="input"  value={inputText} onChange={inputTextHandler}/>
        <button onClick={onSubmitHandler}>Send</button>
      </form>
    </div>
  );
}

export default App;
