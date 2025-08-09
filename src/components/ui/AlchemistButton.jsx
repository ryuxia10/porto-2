import './AlchemistButton.css';

const AlchemistButton = ({ children, onClick }) => {
  return (
    <div className="alchemist-button-container">
      <button onClick={onClick} className="alchemist-button">
        {children}
        <div className="cyber-edges"></div>
        <div className="data-pulses">
          <div className="data-pulse"></div>
          <div className="data-pulse"></div>
          <div className="data-pulse"></div>
          <div className="data-pulse"></div>
        </div>
        <div className="terminal-scan">
          <div className="scan-line"></div>
          <div className="scan-line"></div>
        </div>
        <div className="alchemy-symbols">
          <span className="alchemy-symbol">✧</span>
          <span className="alchemy-symbol">✦</span>
          <span className="alchemy-symbol">✴</span>
          <span className="alchemy-symbol">✶</span>
          <span className="alchemy-symbol">Δ</span>
        </div>
        <div className="noise-overlay"></div>
      </button>
    </div>
  );
};

export default AlchemistButton;