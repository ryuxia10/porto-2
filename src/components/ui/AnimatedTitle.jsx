// src/components/ui/AnimatedTitle.jsx

import './AnimatedTitle.css';

// Tambahkan 'className' sebagai prop
const AnimatedTitle = ({ text, className }) => {
  return (
    // Gabungkan className dasar dengan className tambahan yang diberikan
    <div className={`animated-title-container ${className || ''}`}>
      <svg viewBox="0 0 1000 120" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="50%" 
          y="50%" 
          dy=".35em" 
          textAnchor="middle"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default AnimatedTitle;