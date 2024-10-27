import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:5000'); // Backend server

  useEffect(() => {
    socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.disconnect();
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessages((prev) => [...prev, message]);
    setMessage('');
  };

  return (
    <div className="chat">
      <h2>Chat</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
