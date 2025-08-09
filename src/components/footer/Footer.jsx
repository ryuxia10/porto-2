// src/components/footer/Footer.jsx

import React from 'react';
import './Footer.css';
import { FaInstagram, FaDiscord, FaGithub } from 'react-icons/fa';
import SplitLink from './SplitLink'; // <-- IMPORT KOMPONEN BARU

const Footer = ({ scrollToHero, scrollToShowcase, scrollToContact }) => {
  // ... (logika bubbles tidak berubah) ...
  const bubbles = Array.from({ length: 128 }).map((_, i) => {
    const size = `${2 + Math.random() * 4}rem`;
    const distance = `${6 + Math.random() * 4}rem`;
    const position = `${-5 + Math.random() * 110}%`;
    const time = `${2 + Math.random() * 2}s`;
    const delay = `${-1 * (2 + Math.random() * 2)}s`;
    return (
      <div key={i} className="bubble" style={{ '--size': size, '--distance': distance, '--position': position, '--time': time, '--delay': delay, }} />
    );
  });

  const handleLinkClick = (e, scrollFunction) => {
    e.preventDefault();
    scrollFunction();
  };

  return (
    <footer className="footer">
      <div className="bubbles">{bubbles}</div>
      <div className="content">
        <div className="footer-links">
          <div>
            <b>Mantra & Sihir</b>
            {/* GANTI SEMUA <a> DENGAN <SplitLink> */}
            <SplitLink href="#hero" onClick={(e) => handleLinkClick(e, scrollToHero)}>Hero Section</SplitLink>
            <SplitLink href="#showcase" onClick={(e) => handleLinkClick(e, scrollToShowcase)}>Galeri Alkimia</SplitLink>
            <SplitLink href="#contact" onClick={(e) => handleLinkClick(e, scrollToContact)}>Perkamen Pesan</SplitLink>
          </div>
          <div>
            <b>Jejak Digital</b>
            <SplitLink href="https://www.instagram.com/rezadwikya/" target="_blank" rel="noopener noreferrer">Instagram</SplitLink>
            <SplitLink href="https://discord.com/users/511741863120732189" target="_blank" rel="noopener noreferrer">Discord</SplitLink>
            <SplitLink href="https://github.com/ryuxia10" target="_blank" rel="noopener noreferrer">GitHub</SplitLink>
          </div>
          <div>
            <b>Artefak Favorit</b>
            <SplitLink href="https://cipher-agent.vercel.app/" target="_blank" rel="noopener noreferrer">Cipher Agency</SplitLink>
            <SplitLink href="https://vryxia.vercel.app/" target="_blank" rel="noopener noreferrer">Vryxia AI</SplitLink>
            <SplitLink href="https://aethelgard.vercel.app/" target="_blank" rel="noopener noreferrer">Aethelgard</SplitLink>
          </div>
        </div>
        <div className="footer-socials">
          <div className="social-icons">
            <a href="https://www.instagram.com/rezadwikya/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://discord.com/users/511741863120732189" target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
            <a href="https://github.com/ryuxia10" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
          <p>© {new Date().getFullYear()} Diciptakan dengan Sihir oleh Reza Dwiky Anggara.</p>
        </div>
      </div>
      
      <svg style={{ position: 'fixed', top: '100vh' }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob" />
          </filter>
        </defs>
      </svg>
    </footer>
  );
};

export default Footer;