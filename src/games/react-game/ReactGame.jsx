// src/games/react-game/ReactGame.jsx

import React, { useState } from 'react';
import './ReactGame.css';
import DarthVader from './DarthVader';

const ReactGame = () => {
  // --- STATE UNTUK MENGONTROL VADER ---
  const [vaderName, setVaderName] = useState('Darth Vader');
  const [eyeColor, setEyeColor] = useState('#d81f27'); // Warna mata default merah
  const [powerLevel, setPowerLevel] = useState(20);
  const [runes, setRunes] = useState(['Kyber Crystal']);
  
  const redSaber = 'linear-gradient(to right, rgba(248,80,50,0) 10%, rgba(246,41,12,0.67) 40%, rgba(255,176,166,1) 50%, rgba(246,41,12,0.67) 60%, rgba(231,56,39,0) 90%)';
  const yellowSaber = 'linear-gradient(to right, rgba(255,255,0,0) 10%, rgba(255,255,0,0.67) 40%, rgba(255,255,224,1) 50%, rgba(255,255,0,0.67) 60%, rgba(255,255,0,0) 90%)';
  const [lightsaberColor, setLightsaberColor] = useState(redSaber);

  // --- FUNGSI-FUNGSI KONTROL ---
  const handleNameChange = (event) => setVaderName(event.target.value);
  const handleColorChange = (newColor) => setEyeColor(newColor);
  const handlePowerUp = () => setPowerLevel(prevPower => Math.min(prevPower + 10, 100));
  const handleAddRune = () => {
    const RUNE_NAMES = ['Sith', 'Jedi', 'Force', 'Empire'];
    const randomRune = `Holocron ${RUNE_NAMES[Math.floor(Math.random() * RUNE_NAMES.length)]}`;
    setRunes(prevRunes => [...prevRunes, randomRune]);
    setLightsaberColor(yellowSaber);
  };

  // Kalkulasi kecepatan ayunan berdasarkan powerLevel
  const swingSpeed = 3 - (powerLevel / 100 * 2.5);

  return (
    <div className="react-game-container">
      {/* Panel Kiri: Visualisasi Darth Vader */}
      <div className="golem-panel">
        <h3 className="golem-name">{vaderName || "Unknown Sith"}</h3>
        
        {/* "Panggung" Vader */}
        <div className="vader-container" style={{ '--swing-speed': `${swingSpeed}s` }}>
          <DarthVader 
            eyeColor={eyeColor}
            lightsaberColor={lightsaberColor}
          />
        </div>

        <div className="power-bar-container">
          <div className="power-bar" style={{ width: `${powerLevel}%` }}></div>
        </div>
      </div>

      {/* Panel Kanan: Panel Kontrol */}
      <div className="control-panel">
        <h3 className="panel-title">Panel Kontrol Kekuatan</h3>
        <div className="control-group">
          <label>Sebut Namanya:</label>
          <input type="text" value={vaderName} onChange={handleNameChange} />
        </div>
        <div className="control-group">
          <label>Pilih Energi Inti (Warna Mata):</label>
          <div className="color-swatches">
            <button className="swatch" style={{ backgroundColor: '#d81f27' }} onClick={() => handleColorChange('#d81f27')}></button>
            <button className="swatch" style={{ backgroundColor: '#455caa' }} onClick={() => handleColorChange('#455caa')}></button>
            <button className="swatch" style={{ backgroundColor: '#9f9fa1' }} onClick={() => handleColorChange('#9f9fa1')}></button>
          </div>
        </div>
        <div className="control-group">
          <label>Tingkatkan Amarah (Energi):</label>
          <button className="action-button" onClick={handlePowerUp}>+10 Energi</button>
        </div>
        <div className="control-group">
          <label>Temukan Holocron (Rune):</label>
          <ul className="rune-list">
            {runes.map((rune, index) => <li key={index}>{rune}</li>)}
          </ul>
          <button className="action-button" onClick={handleAddRune}>Tambah Holocron</button>
        </div>
      </div>
    </div>
  );
};

export default ReactGame;