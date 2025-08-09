// src/components/footer/SplitLink.jsx

import React from 'react';
import './SplitLink.css';

// Komponen ini akan menerima semua props dari link <a> biasa
const SplitLink = ({ children, ...props }) => {
  return (
    <a className="link" {...props}>
      <span className="link--top">{children}</span>
      <span className="link--bottom">{children}</span>
    </a>
  );
};

export default SplitLink;