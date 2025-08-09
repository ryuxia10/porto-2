// src/components/showcase/SkillCard3D.jsx

import './SkillCard3D.css';
import MySqlGame from '../../games/MySqlGame';
import ReactGame from '../../games/react-game/ReactGame';
import CssGame from '../../games/css-game/CssGame';
import TailwindGame from '../../games/tailwind-game/TailwindGame';
import GsapGame from '../../games/gsap-game/GsapGame';
import FramerGame from '../../games/framer-motion-game/FramerGame';
import ThreeGame from '../../games/three-game/ThreeGame'; 
import HtmlGameWrapper from '../../games/html-game/HtmlGame';
import NodeGame from '../../games/node-game/NodeGame';
import ViteGame from '../../games/vite-game/ViteGame';
import { SiMysql, SiTailwindcss, SiGreensock, SiFramer, SiVite } from 'react-icons/si';
import { FaReact, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import { TbBrandThreejs } from 'react-icons/tb';
import { FaNodeJs } from 'react-icons/fa';

const SkillCard3D = ({ title, description, mainIcon, techs, onGameClick }) => {
  const renderStars = (count) => '⭐'.repeat(count);

  const handleGameClick = (tech) => {
    let gameComponent = <p className="text-center text-lg">Game untuk {tech.name} akan segera hadir!</p>;
    if (tech.icon === SiMysql) {
      gameComponent = <MySqlGame />;
    } else if (tech.icon === FaReact) {
      gameComponent = <ReactGame />;
    } else if (tech.icon === FaCss3Alt) { 
      gameComponent = <CssGame />;
    } else if (tech.icon === SiTailwindcss) { 
      gameComponent = <TailwindGame />;
    } else if (tech.icon === SiGreensock) { 
      gameComponent = <GsapGame />;
    } else if (tech.icon === SiFramer) { 
      gameComponent = <FramerGame />;
    } else if (tech.icon === TbBrandThreejs) { 
      gameComponent = <ThreeGame />;
    } else if (tech.icon === FaHtml5) { 
      gameComponent = <HtmlGameWrapper />;
    } else if (tech.icon === FaNodeJs) { 
      gameComponent = <NodeGame />;
    } else if (tech.icon === SiVite) { 
      gameComponent = <ViteGame />;
    }

    onGameClick({ title: `${tech.name} Experiment`, gameComponent });
  };

  // --- GAYA INLINE YANG DIPERBARUI ---
  const contentStyle = {
    // DIUBAH: Padding atas dikurangi untuk menaikkan posisi teks
    padding: '70px 30px 0px 25px', 
    transform: 'translate3d(0, 0, 26px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle = {
    display: 'block',
    color: '#FFD700',
    fontWeight: '900',
    fontSize: '20px',
    lineHeight: '1',
    fontFamily: 'Cinzel, serif',
  };

  const textStyle = {
    display: 'block',
    color: 'rgba(250, 250, 250, 0.7)',
    fontSize: '12px',
    // DIUBAH: Margin atas dikurangi untuk merapatkan paragraf
    marginBottom: '67px',
    marginTop: '20px', 
    lineHeight: '1',
    fontFamily: 'Cinzel, serif',
    // Bonus: Nonaktifkan huruf kapital agar lebih mudah dibaca
    textTransform: 'none'
  };
  // --- AKHIR GAYA INLINE ---

  return (
    <div className="parent">
      <div className="card">
        <div className="logo">
          <span className="circle circle1"></span>
          <span className="circle circle2"></span>
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <span className="circle circle5">{mainIcon}</span>
        </div>
        <div className="glass"></div>
        
        <div className="content" style={contentStyle}>
          <div className="title" style={titleStyle}>{title}</div>
          <div className="text" style={textStyle}>{description}</div>
        </div>

        <div className="bottom">
          <div className="social-buttons-container">
            {techs && techs.map((tech, index) => (
              <button 
                key={index} 
                className="social-button"
                onClick={() => handleGameClick(tech)}
              >
                <tech.icon />
                <span className="tooltip">{renderStars(tech.stars)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard3D;