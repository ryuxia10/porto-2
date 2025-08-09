// src/games/react-game/DarthVader.jsx

import React from 'react';
import './DarthVader.css';

const DarthVader = ({ eyeColor, lightsaberColor }) => {
  return (
    <div className="vader">
      <div className="shadow"></div>
      <div className="head">
        <div className="helmet"><span className="left"></span><span className="right"></span></div>
        <div className="eyes">
          <span className="left" style={{ backgroundColor: eyeColor }}></span>
          <span className="right" style={{ backgroundColor: eyeColor }}></span>
        </div>
        <span className="grill"><span className="left"></span><span className="center"></span><span className="right"></span></span>
        <span className="mask"><span className="top"></span><span className="left"></span><span className="center"></span><span className="right"></span></span>
        <span className="line"></span>
      </div>
      <div className="torso">
        <span className="neck"><span className="left"></span><span className="center"></span><span className="right"></span><span className="bottom"></span></span>
        <span className="belt"><span className="center"></span></span>
        <div className="plate"><span className="red_top"></span><span className="red_center"></span><span className="red_bottom"></span><span className="blue"></span><span className="gray"></span></div>
      </div>
      <div className="hand left"><span className="hand"></span></div>
      <div className="hand right animation-right"><span className="hand"></span></div>
      <div className="legs"><span className="left"></span><span className="right"></span></div>
      <div className="boots"><span className="left"></span><span className="right"></span></div>
      <div className="sword animation-left">
        <span className="handle"></span>
        <span className="light" style={{ background: lightsaberColor, backgroundImage: lightsaberColor }}></span>
      </div>
    </div>
  );
};

export default DarthVader;