// src/games/BrewButton.jsx

import { useState } from 'react';
import './BrewButton.css';
import { FaMortarPestle, FaCheckCircle } from 'react-icons/fa';

// TAMBAHKAN PROPS BARU: defaultText dan sentText
const BrewButton = ({ onClick, defaultText = 'RACIK', sentText = 'DIRACIK', disabled = false }) => {
  const [isSent, setIsSent] = useState(false);

  const handleClick = () => {
    onClick();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 2500);
  };

  const splitText = (text) => 
    text.split('').map((char, i) => (
      <span key={i} style={{ '--i': i }}>{char}</span>
    ));

  // Tombol nonaktif jika 'disabled' dari luar true ATAU jika sedang dalam animasi 'sent'
  const isDisabled = disabled || isSent;

  return (
    <button className={`brew-button-v2 ${isSent ? 'sent' : ''}`} onClick={handleClick} disabled={isDisabled}>
      <div className="outline"></div>
      
      <div className="state state--default">
        <div className="icon">
          <FaMortarPestle />
        </div>
        {/* Gunakan prop defaultText */}
        <p>{splitText(defaultText)}</p>
      </div>
      
      <div className="state state--sent">
        <div className="icon">
          <FaCheckCircle />
        </div>
        {/* Gunakan prop sentText */}
        <p>{splitText(sentText)}</p>
      </div>
    </button>
  );
};

export default BrewButton;