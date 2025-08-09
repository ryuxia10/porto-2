// src/components/contact/ContactGhost.jsx

import React, { useState } from 'react';
import './ContactGhost.css';

const ContactGhost = () => {
  const [position, setPosition] = useState('right');
  const [isVanished, setIsVanished] = useState(false);

  const handleVanish = () => {
    setIsVanished(true);
    setTimeout(() => {
      setPosition(prevPos => (prevPos === 'right' ? 'left' : 'right'));
      setIsVanished(false);
    }, 500); // Durasi cocok dengan transisi di CSS
  };

  // Nama kelas untuk wadah luar (mengontrol posisi & transisi)
  const containerClassName = `casper-container ${position} ${isVanished ? 'vanished' : ''}`;

  return (
    <div 
      className={containerClassName}
      onMouseEnter={handleVanish}
    >
      {/* Di dalam sini adalah Casper yang bentuknya sudah terkunci */}
      <div className="casper-body">
        <div className="body">
          <div className="eyes"></div>
          <div className="mouth"></div>
          <div className="feet">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
    </div>
  );
};

export default ContactGhost;