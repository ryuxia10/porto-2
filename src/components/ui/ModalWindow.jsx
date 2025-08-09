// src/components/ui/ModalWindow.jsx

import './ModalWindow.css';
import { GameLoader } from './GameLoader'; // Loader yang akan kita buat
import { useState, useEffect } from 'react';

const ModalWindow = ({ title, children, onClose, onMaximize, onMinimize, modalState }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi loading game saat jendela pertama kali muncul
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Durasi loading 2.5 detik

    return () => clearTimeout(timer);
  }, []);

  const windowClasses = `modal-card ${modalState === 'maximized' ? 'maximized' : ''}`;

  return (
    <div className="modal-overlay">
      <div className={windowClasses}>
        {/* Title Bar */}
        <div className="title-bar">
          <span className="title-text">{title}</span>
          <div className="title-bar-buttons">
            <button onClick={onMinimize} className="control-button minimize">—</button>
            <button onClick={onMaximize} className="control-button maximize">▣</button>
            <button onClick={onClose} className="control-button close">×</button>
          </div>
        </div>
        
        {/* Konten Jendela */}
        <div className="modal-content">
          {isLoading ? <GameLoader /> : children}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;