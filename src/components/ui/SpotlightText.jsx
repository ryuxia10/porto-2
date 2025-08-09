// src/components/ui/SpotlightText.jsx

import './SpotlightText.css';

const SpotlightText = ({ text, className = '' }) => {
  return (
    // Kita gunakan tag h1 di sini agar tetap semantik
    <h1 data-text={text} className={`spotlight-text ${className}`}>
      {text}
    </h1>
  );
};

export default SpotlightText;