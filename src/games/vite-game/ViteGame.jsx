// src/games/vite-game/ViteGame.jsx

import React, { useState } from 'react';
import './ViteGame.css';

const ViteGame = () => {
  const [boxColor, setBoxColor] = useState('#FFD700');
  const [boxText, setBoxText] = useState('Alkimia!');

  const codeLine1 = `const Eksperimen = () => {`;
  const codeLine2 = `  return (`;
  const codeLine3 = `    <div style={{`;
  const codeLine4 = `      backgroundColor: '`;
  const codeLine5 = `',`;
  const codeLine6 = `      /* ... gaya lain ... */`;
  const codeLine7 = `    }}>`;
  const codeLine8 = `      <span>`;
  const codeLine9 = `</span>`;
  const codeLine10 = `    </div>`;
  const codeLine11 = `  );`;
  const codeLine12 = `};`;


  return (
    <div className="vite-game-container">
      {/* Panel Kiri: Hasil Eksperimen Real-time */}
      <div className="preview-panel">
        <p className="area-title-vite">Hasil Eksperimen</p>
        <div className="preview-box" style={{ backgroundColor: boxColor }}>
          <span className="preview-text">{boxText}</span>
        </div>
        <p className="vite-notice">
          <strong>Perhatikan!</strong> Perubahan terjadi instan tanpa refresh halaman. 
          Inilah keajaiban HMR dari Vite!
        </p>
      </div>

      {/* Panel Kanan: Formula Mantra (Editor Kode Palsu) */}
      <div className="editor-panel">
        <h3 className="panel-title-vite">Formula Mantra</h3>
        <div className="code-editor-vite">
          <pre>
            <code>
              {codeLine1}{'\n'}
              {codeLine2}{'\n'}
              {codeLine3}{'\n'}
              {codeLine4}
              <input
                type="text"
                className="code-input code-string"
                value={boxColor}
                onChange={(e) => setBoxColor(e.target.value)}
              />
              {codeLine5}{'\n'}
              {codeLine6}{'\n'}
              {codeLine7}{'\n'}
              {'        '}
              <input
                type="text"
                className="code-input code-text"
                value={boxText}
                onChange={(e) => setBoxText(e.target.value)}
              />{'\n'}
              {'      '}
              {codeLine9}{'\n'}
              {codeLine10}{'\n'}
              {codeLine11}{'\n'}
              {codeLine12}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ViteGame;