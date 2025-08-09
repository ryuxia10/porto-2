// src/games/gsap-game/GsapGame.jsx

import React, { useState, useRef } from 'react';
import './GsapGame.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import BrewButton from '../BrewButton';

const GsapGame = () => {
  const [duration, setDuration] = useState(1);
  const [yPosition, setYPosition] = useState(-150);
  const [easing, setEasing] = useState('power2.out');
  const [isShaking, setIsShaking] = useState(true);
  
  // Kita akan beri ref untuk setiap bagian yang dianimasikan
  const ballRef = useRef(null);
  const shadowRef = useRef(null);
  
  const { contextSafe } = useGSAP();

  const playAnimation = contextSafe(() => {
    setIsShaking(false);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsShaking(true);
      },
      yoyo: true,
      repeat: 1,
    });
    
    // Animasi untuk bola (div .pokeball): terbang ke atas
    tl.to(ballRef.current, {
      y: yPosition,
      duration: duration,
      ease: easing,
    });

    // Animasi untuk bayangan (div .pokeball-shadow): menyusut
    tl.to(shadowRef.current, {
      scale: 0.3,
      opacity: 0.4,
      duration: duration,
      ease: easing,
    }, "<"); // "<" berarti mulai bersamaan dengan animasi sebelumnya
  });

  return (
    <div className="gsap-game-container">
      <div className="arena-energi">
        {/* Ini adalah wrapper utama yang posisinya statis di tengah */}
        <div className="pokeball-wrapper">
          {/* Bayangan sekarang elemen terpisah, kita beri ref */}
          <div className="pokeball-shadow" ref={shadowRef}></div>
          {/* Bola sekarang elemen terpisah, kita beri ref */}
          <div className={`pokeball ${isShaking ? 'shaking' : ''}`} ref={ballRef}>
            <div className="pokeball-visual"></div>
            <div className="pokeball-glow"></div>
          </div>
        </div>
      </div>

      <div className="panel-kontrol-animasi">
        {/* ... (Panel kontrol tidak ada perubahan) ... */}
        <div className="kontrol-grup">
          <label htmlFor="duration">Durasi: {duration} detik</label>
          <input id="duration" type="range" min="0.1" max="5" step="0.1" value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} />
        </div>
        <div className="kontrol-grup">
          <label htmlFor="y-pos">Posisi Y: {yPosition}px</label>
          <input id="y-pos" type="range" min="-200" max="0" step="1" value={yPosition} onChange={(e) => setYPosition(parseInt(e.target.value))} />
        </div>
        <div className="kontrol-grup">
          <label htmlFor="easing">Tipe Easing:</label>
          <select id="easing" className="easing-select" value={easing} onChange={(e) => setEasing(e.target.value)}>
            <option value="power2.out">power2.out</option>
            <option value="power4.inOut">power4.inOut</option>
            <option value="elastic.out(1, 0.5)">elastic.out</option>
            <option value="bounce.out">bounce.out</option>
            <option value="back.inOut(1.7)">back.inOut</option>
            <option value="none">none (linear)</option>
          </select>
        </div>
        <BrewButton onClick={playAnimation} defaultText="LEMPAR" sentText="KEMBALI" />
      </div>
    </div>
  );
};

export default GsapGame;