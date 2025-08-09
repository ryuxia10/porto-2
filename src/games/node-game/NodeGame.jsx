// src/games/node-game/NodeGame.jsx

import React, { useState, useEffect, useRef } from 'react';
import './NodeGame.css';
import { FaPaperPlane } from 'react-icons/fa';
import { runOracleQuery } from './gemini.js'; // <-- IMPORT FUNGSI AI BARU

const NodeGame = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    // Pesan sapaan baru yang lebih terbuka
    { sender: 'oracle', text: "Aku adalah Orakel Alkimia. Tanyakan apapun padaku, wahai sang pencipta..." }
  ]);
  const [isOracleThinking, setIsOracleThinking] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOracleThinking]);

  // Fungsi handleSendMessage sekarang memanggil AI asli
  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isOracleThinking) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    
    setIsOracleThinking(true);

    // Panggil Orakel AI dan tunggu jawabannya
    const responseText = await runOracleQuery(currentInput);

    setIsOracleThinking(false);
    const oracleMessage = { sender: 'oracle', text: responseText };
    setMessages(prev => [...prev, oracleMessage]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="node-game-container">
      <div className="scrying-mirror">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="speaker">{msg.sender === 'oracle' ? 'Orakel Alkimia:' : 'Anda:'}</span>
            <p>{msg.text}</p>
          </div>
        ))}

        {isOracleThinking && (
          <div className="message oracle">
            <span className="speaker">Orakel Alkimia:</span>
            <p className="thinking-dots"><span>.</span><span>.</span><span>.</span></p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="input-area">
        <input 
          type="text" 
          className="question-input"
          placeholder="Tulis pertanyaanmu pada Orakel..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isOracleThinking}
        />
        <button className="send-button" onClick={handleSendMessage} disabled={isOracleThinking}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default NodeGame;