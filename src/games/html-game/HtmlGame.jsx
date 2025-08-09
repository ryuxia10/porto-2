// src/games/html-game/HtmlGame.jsx

import React, { useState, useEffect } from 'react';
import './HtmlGame.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  STAMP: 'stamp',
};

const RuneStamp = ({ tag, isPlaced }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.STAMP,
    item: { tag },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag} 
      className={`rune-stamp ${isDragging ? 'dragging' : ''} ${isPlaced ? 'placed' : ''}`}
    >
      {tag}
    </div>
  );
};

// =======================================================
// --- DI SINI PERBAIKANNYA ---
// =======================================================
const DropZone = ({ acceptedTag, onDrop, placedTag, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.STAMP,
    drop: (item) => onDrop(item.tag),
    canDrop: (item) => item.tag === acceptedTag && !placedTag,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  // Logika baru: DropZone tidak lagi menghilangkan 'children'-nya.
  // Ia hanya akan mengubah penampilannya berdasarkan kelas CSS.
  return (
    <div 
      ref={drop} 
      className={`drop-zone ${isOver && canDrop ? 'hovered' : ''} ${placedTag ? 'filled' : ''}`} 
      data-placed-tag={placedTag} // Tampilkan tag yang sudah ditempatkan
      data-accepted-tag={acceptedTag} // Tampilkan placeholder jika kosong
    >
      {children}
    </div>
  );
};
// =======================================================


const HtmlGame = () => {
  const runeStamps = ['<header>', '<section>', '<p>', '<footer>'];

  const [placedStamps, setPlacedStamps] = useState({
    header: null,
    section: null,
    p: null,
    footer: null,
  });

  const [isSolved, setIsSolved] = useState(false);

  const handleDrop = (zone, tag) => {
    setPlacedStamps(prev => ({ ...prev, [zone]: tag }));
  };
  
  useEffect(() => {
    if (placedStamps.header === '<header>' &&
        placedStamps.section === '<section>' &&
        placedStamps.p === '<p>' &&
        placedStamps.footer === '<footer>') {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  }, [placedStamps]);

  // Sisa dari komponen ini tidak ada yang berubah
  return (
    <div className="html-game-container">
      <div className="parchment-panel">
        <DropZone acceptedTag="<header>" onDrop={(tag) => handleDrop('header', tag)} placedTag={placedStamps.header} />
        <div className="parchment-body">
          <h2 className="parchment-title">Transmutasi Digital</h2>
          <DropZone acceptedTag="<section>" onDrop={(tag) => handleDrop('section', tag)} placedTag={placedStamps.section}>
            <DropZone acceptedTag="<p>" onDrop={(tag) => handleDrop('p', tag)} placedTag={placedStamps.p}>
              <p className="parchment-text">
                Dalam alkimia digital, setiap baris kode adalah bahan mentah. Struktur adalah wadahnya. Tanpa struktur yang tepat (`semantic`), sebuah karya akan rapuh dan tak bermakna, bagai golem tanpa jiwa. Beri aku struktur, wahai sang Alkemis!
              </p>
            </DropZone>
          </DropZone>
        </div>
        <DropZone acceptedTag="<footer>" onDrop={(tag) => handleDrop('footer', tag)} placedTag={placedStamps.footer} />
      </div>

      <div className="stamps-panel">
        <h3 className="panel-title-html">Kotak Stempel Rune</h3>
        <p className="instructions-html">
          Seret "Stempel Rune" dari sini dan letakkan di area yang tepat pada "Perkamen Kuno" untuk memberinya struktur dan jiwa.
        </p>
        <div className="stamps-container">
          {runeStamps.map((tag, index) => (
            <RuneStamp 
              key={index} 
              tag={tag} 
              isPlaced={Object.values(placedStamps).includes(tag)}
            />
          ))}
        </div>
        {isSolved && (
          <p className="success-message-html">
            ✨ Jiwa Telah Diberikan! Perkamen ini hidup berkat struktur yang sempurna! ✨
          </p>
        )}
      </div>
    </div>
  );
};

const HtmlGameWrapper = () => (
  <DndProvider backend={HTML5Backend}>
    <HtmlGame />
  </DndProvider>
);

export default HtmlGameWrapper;