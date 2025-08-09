// src/games/tailwind-game/TailwindGame.jsx

import React, { useState, useEffect } from 'react';
import './TailwindGame.css';

const availableClasses = [
  'p-4', 'rounded-lg', 'text-white', 'font-bold',
  'bg-gradient-to-r', 'from-amber-500', 'to-yellow-300',
  'shadow-lg', 'shadow-yellow-500/50', 'hover:scale-105', 'transition-transform'
];

const solutionClasses = new Set([
  'p-4', 'rounded-lg', 'text-white', 'font-bold',
  'bg-gradient-to-r', 'from-amber-500', 'to-yellow-300',
  'shadow-lg', 'shadow-yellow-500/50'
]);

const TailwindGame = () => {
  const [appliedClasses, setAppliedClasses] = useState(new Set());
  const [isSolved, setIsSolved] = useState(false);

  const handleClassClick = (className) => {
    const newClasses = new Set(appliedClasses);
    if (newClasses.has(className)) {
      newClasses.delete(className);
    } else {
      newClasses.add(className);
    }
    setAppliedClasses(newClasses);
  };

  useEffect(() => {
    if (appliedClasses.size !== solutionClasses.size) {
      setIsSolved(false);
      return;
    }

    let allMatch = true;
    for (const cls of solutionClasses) {
      if (!appliedClasses.has(cls)) {
        allMatch = false;
        break;
      }
    }
    setIsSolved(allMatch);
  }, [appliedClasses]);

  const dynamicClassName = Array.from(appliedClasses).join(' ');

  return (
    <div className="tailwind-game-container">
      {/* Panel Kiri: Arena Visual */}
      <div className="visual-panel-tailwind">
        <div className="target-display">
          <p className="area-title-tailwind">Jubah Bertuah (Target)</p>
          <button 
            className="p-4 rounded-lg text-white font-bold bg-gradient-to-r from-amber-500 to-yellow-300 shadow-lg shadow-yellow-500/50 hover:scale-105 transition-transform"
          >
            Jubah Selesai
          </button>
        </div>
        <div className="game-display">
          <p className="area-title-tailwind">Jubah Polos Anda</p>
          {/* Tombol ini kembali ke versi aslinya yang simpel */}
          <button className={dynamicClassName}>
            Jubah Polos
          </button>
        </div>
      </div>

      {/* Panel Kanan: Gulungan Benang Mantra */}
      <div className="spellbook-panel">
        <h3 className="panel-title-tailwind">Gulungan Benang Mantra</h3>
        <p className="instructions-tailwind">
          Klik "benang" (kelas) di bawah ini untuk menenun Jubah Polos Anda agar sama persis seperti Jubah Bertuah.
        </p>
        <div className="class-list">
          {availableClasses.map((className, index) => (
            <button 
              key={index} 
              className={`class-chip ${appliedClasses.has(className) ? 'active' : ''}`}
              onClick={() => handleClassClick(className)}
            >
              {className}
            </button>
          ))}
        </div>
        <div className="applied-classes">
          <p><strong>Kelas yang Diterapkan:</strong></p>
          <div className="applied-class-list">
            {dynamicClassName}
          </div>
        </div>
        {isSolved && (
          <p className="success-message-tailwind">
            ✨ Tenunan Sempurna! Anda adalah Master Penenun Mantra Tailwind! ✨
          </p>
        )}
      </div>
    </div>
  );
};

export default TailwindGame;