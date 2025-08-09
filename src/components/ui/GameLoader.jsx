// src/components/ui/GameLoader.jsx
import './GameLoader.css';

export const GameLoader = () => {
  // Objek gaya untuk setiap elemen
  const windowStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Tahoma", sans-serif',
    color: '#5c5c5c',
  };

  const logoStyle = {
    width: '250px',
    marginBottom: '20px',
    // DIUBAH: Dari 'center' menjadi 'left'
    textAlign: 'left',
  };

  const pStyle = { margin: 0, padding: 0 };
  
  const topStyle = { fontSize: '16px', fontWeight: 300, lineHeight: '16px', ...pStyle };
  const topSpanStyle = { fontSize: '10px', position: 'relative', top: '-5px', marginLeft: '2px' };

  const midStyle = { fontSize: '46px', fontWeight: 700, lineHeight: '36px', ...pStyle };
  const midSpanStyle = { fontSize: '22px', display: 'inline-block', verticalAlign: 'top', color: '#FF6821', marginTop: '-8px' };

  // DITAMBAHKAN: Properti rata kanan untuk sentuhan akhir
  const bottomStyle = { fontSize: '20px', fontWeight: 300, lineHeight: '30px', textAlign: 'center', ...pStyle };

  return (
    <div style={windowStyle}>
      <div style={logoStyle}>
        <p style={topStyle}>Reza Dwiky Anggara<span style={topSpanStyle}>©</span></p>
        <p style={midStyle}>Alchemist<span style={midSpanStyle}>LAB</span></p>
        <p style={bottomStyle}>Loading Experiment...</p>
      </div>
      <div className="container">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
};