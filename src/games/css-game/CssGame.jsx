// src/games/css-game/CssGame.jsx

import React, { useState } from 'react';
import './CssGame.css';
import BrewButton from '../BrewButton'; // <-- IMPORT TOMBOL BARU

const CssGame = () => {
  const [justifyContent, setJustifyContent] = useState('');
  const [alignItems, setAlignItems] = useState('');
  const [altarStyles, setAltarStyles] = useState({
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  });
  const [isSolved, setIsSolved] = useState(false);

  const solution = {
    justifyContent: 'center',
    alignItems: 'flex-end',
  };

  const handleCastSpell = () => {
    const newStyles = { justifyContent, alignItems };
    setAltarStyles(newStyles);

    if (justifyContent.trim().toLowerCase() === solution.justifyContent && 
        alignItems.trim().toLowerCase() === solution.alignItems) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  };
  const isButtonDisabled = justifyContent.trim() === '' || alignItems.trim() === '';

  return (
    <div className="css-game-container">
      {/* ... (Panel visual tetap sama) ... */}
       <div className="visual-panel">
        <div className="target-area">
          <p className="area-title">Pola Target</p>
          <div className="altar target">
            <div className="rune target-rune">✦</div>
            <div className="rune target-rune">✧</div>
            <div className="rune target-rune">✴</div>
          </div>
        </div>
        <div className="game-area">
          <p className="area-title">Altar Kosmik Anda</p>
          <div className="altar game" style={altarStyles}>
            <div className="rune">✦</div>
            <div className="rune">✧</div>
            <div className="rune">✴</div>
          </div>
        </div>
      </div>

      <div className="control-panel-css">
        <h3 className="panel-title-css">Buku Mantra Flexbox</h3>
        {/* ... (Instruksi dan code-editor tetap sama) ... */}
        <p className="instructions">
          Gunakan mantra `justify-content` dan `align-items` untuk menyusun Batu Rune di Altar Anda agar sesuai dengan Pola Target.
        </p>
        <div className="code-editor">
          <pre>
            <code>
              .altar {'{\n'}
              {'  '}display: flex;{'\n'}
              {'  '}justify-content: 
              <input 
                type="text" 
                className="css-input" 
                value={justifyContent}
                onChange={(e) => setJustifyContent(e.target.value)}
                placeholder="center"
              />;{'\n'}
              {'  '}align-items: 
              <input 
                type="text" 
                className="css-input"
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
                placeholder="flex-end"
              />;{'\n'}
              {'}'}
            </code>
          </pre>
        </div>

        {isSolved && (
          <p className="success-message">
            ✨ Mantra Berhasil! Anda telah menguasai penataan kosmik! ✨
          </p>
        )}

        {/* GANTI TOMBOL LAMA DENGAN KOMPONEN BARU */}
        <div className="flex justify-center mt-8">
          <BrewButton 
            onClick={handleCastSpell} 
            defaultText="RAPALKAN" 
            sentText="BERHASIL"
            disabled={isButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default CssGame;