// src/App.jsx

import { useState, useRef } from 'react';
import { HeroSection } from './components/hero/HeroSection';
import { ShowcaseSection } from './components/showcase/ShowcaseSection';
import { Scene3D } from './components/hero/Scene3D';
import ModalWindow from './components/ui/ModalWindow'; // <-- IMPORT KOMPONEN BARU
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import PrankButton from "./components/prank/PrankButton";
import Notification from './components/ui/Notification'; // <-- IMPORT
import { NotificationProvider } from './context/NotificationContext'; // <-- IMPORT

function App() {
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);
  const contactRef = useRef(null);

  // --- MANTRA TELEPORTASI (Scroll Handlers) ---
  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Kita gunakan 'scrollTo' untuk hero button agar lebih konsisten
  const handleScrollToShowcase = () => scrollTo(showcaseRef);

  // ===== STATE BARU UNTUK MENGONTROL MODAL =====
  const [modalContent, setModalContent] = useState(null); // null saat tertutup, atau berisi info game
  const [modalState, setModalState] = useState('normal'); // 'normal', 'maximized'
  // ===============================================

  const handleScroll = () => {
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fungsi untuk membuka modal, akan kita kirim ke bawah
  const openModal = (game) => {
    setModalContent(game);
    setModalState('normal'); // Reset ke ukuran normal setiap kali dibuka
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <NotificationProvider>
      <Notification />
      <main className="w-full bg-black">
        <div ref={heroRef}>
          <HeroSection onExploreClick={handleScrollToShowcase} />
        </div>
        <div ref={showcaseRef}>
          <ShowcaseSection onGameClick={openModal} />
        </div>

        {modalContent && (
          <ModalWindow
            title={modalContent.title}
            onClose={closeModal}
            onMaximize={() =>
              setModalState(modalState === "normal" ? "maximized" : "normal")
            }
            onMinimize={closeModal} // Untuk web, minimize paling logis berfungsi seperti close
            modalState={modalState}
          >
            {modalContent.gameComponent}
          </ModalWindow>
        )}
        <div ref={contactRef}>
          <Contact />
        </div>
        <Footer
          scrollToHero={() => scrollTo(heroRef)}
          scrollToShowcase={() => scrollTo(showcaseRef)}
          scrollToContact={() => scrollTo(contactRef)}
        />
        <PrankButton />
      </main>
    </NotificationProvider>
  );
}

export default App;