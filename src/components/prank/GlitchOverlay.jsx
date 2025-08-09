// src/components/prank/GlitchOverlay.jsx

import React from "react";
import "./GlitchOverlay.css";

const GlitchOverlay = () => {
  return (
    // 'wrapper' sekarang menjadi kontainer utama overlay kita
    <div className="glitch-wrapper">
      <div className="triangle-wrap">
        <div className="triangle triangle--main"></div>
        {/* Warna merah dan biru akan kita sesuaikan di CSS */}
        <div className="triangle triangle--red"></div>
        <div className="triangle triangle--blue"></div>
        <div className="triangle__text">MEMPROSES SIHIR...</div>
      </div>
    </div>
  );
};

export default GlitchOverlay;
