// src/components/ui/Preloader.jsx

import { useEffect, useState } from 'react';
import './Preloader.css';

export const Preloader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false); // <-- STATE BARU

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Jangan langsung panggil onLoaded. Mulai fade out dulu.
          setIsFadingOut(true); 

          // Panggil onLoaded SETELAH animasi fade out selesai (500ms)
          setTimeout(onLoaded, 500); 
          
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    // Tambahkan kelas 'fading-out' secara dinamis
    <div className={`preloader-container ${isFadingOut ? 'fading-out' : ''}`}>
      <div className="preloader-symbol">✧</div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">{progress}%</div>
    </div>
  );
};