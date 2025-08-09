// src/components/ui/ThemedInput.jsx

import React from 'react';
import './ThemedInput.css';

// Komponen ini akan menerima semua props dari input HTML biasa
// dan beberapa props tambahan seperti 'icon'
const ThemedInput = ({ as: Component = 'input', icon, ...props }) => {
  return (
    <div className="themed-input-wrapper">
      <div className="input-container">
        <span className="underline-effect"></span>
        <span className="ripple-circle"></span>
        <span className="bg-fade"></span>
        <span className="floating-dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        
        <Component className="themed-input" {...props} />
        
        <span className="icon-container">
          {icon}
        </span>
      </div>
    </div>
  );
};

export default ThemedInput;