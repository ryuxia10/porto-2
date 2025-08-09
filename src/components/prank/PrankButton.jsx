// src/components/prank/PrankButton.jsx

import React, { useState, useRef, useEffect } from "react";
import "./PrankButton.css";
import { motion, AnimatePresence } from "framer-motion";
import GlitchOverlay from "./GlitchOverlay";
import { Typewriter } from "react-simple-typewriter";

const PrankButton = () => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [isSurrendered, setIsSurrendered] = useState(false);

  const [showPrankWrapper, setShowPrankWrapper] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const [showVideo, setShowVideo] = useState(false);
  const [isPrankCompleted, setIsPrankCompleted] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (isSurrendered || showPrankWrapper) return;
    if (dodgeCount >= 5) {
      setIsSurrendered(true);
      return;
    }
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const newTop = Math.random() * (containerRect.height - 50);
    const newLeft = Math.random() * (containerRect.width - 200);
    setPosition({ top: `${newTop}px`, left: `${newLeft}px` });
    setDodgeCount((prev) => prev + 1);
  };

  const handleClick = () => {
    if (!isSurrendered || isPrankCompleted) return;

    setShowPrankWrapper(true);
    setIsGlitching(true);

    setTimeout(() => {
      setIsGlitching(false);
      setShowTerminal(true);
    }, 5000);
  };

  const handleTypingDone = () => {
    setShowTerminal(false);
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setIsGlitching(true);

    setTimeout(() => {
      setShowPrankWrapper(false);
      setIsPrankCompleted(true);
      setIsGlitching(false);
    }, 2000);
  };

  // Efek untuk menyetel "alarm" kita saat terminal muncul
  useEffect(() => {
    let videoTimeout;
    if (showTerminal) {
      // Setel alarm untuk memanggil video setelah 120 detik (2 menit)
      videoTimeout = setTimeout(() => {
        handleTypingDone();
      }, 140000);
    }
    // Bersihkan alarm jika komponennya hilang
    return () => clearTimeout(videoTimeout);
  }, [showTerminal]);

  // Teks kembali ke versi asli, tidak perlu &lt;
  const terminalSequence = [
    "Booting Alchemist OS v2.0...",
    "Kernel initiated. Magic modules loading...",
    "[ OK ] Loading module: react-three-fiber.dll",
    "[ OK ] Loading module: gsap.sys",
    "[ OK ] Loading module: framer-motion.so",
    "Compiling shaders... SUCCESS.",
    "Checking system integrity...",
    "Warning: Anomaly detected in user_session.js.",
    "> Running diagnostics on portfolio_integrity.jsx...",
    "> Accessing component: <HeroSection>... Found. Emissive intensity: 1.5.",
    "> Accessing component: <SkillCard3D>... Found. Perspective: 2500px.",
    "> Accessing component: <ContactGhost>... Found. Entity status: Floating.",
    "CRITICAL ERROR: Sanity_check.dll NOT FOUND.",
    "Attempting to bypass security protocols...",
    "Firewall breached.",
    "Accessing core memory...",
    "Now, for my final trick.",
    "Executing: video.mp4...",
  ];

  return (
    <div ref={containerRef} className="prank-container">
      {!showPrankWrapper && (
        <button
          className={`prank-button ${isPrankCompleted ? "disabled" : ""}`}
          style={{ top: position.top, left: position.left }}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          disabled={isPrankCompleted}
        >
          {isPrankCompleted
            ? "Hehehe :)"
            : isSurrendered
            ? "Oke, aku menyerah..."
            : "Coba Klik Aku!"}
        </button>
      )}

      <AnimatePresence>
        {showPrankWrapper && (
          <motion.div
            className="prank-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {isGlitching && <GlitchOverlay />}

            {showTerminal && (
              <div className="prank-text">
                <Typewriter
                  words={terminalSequence}
                  loop={1}
                  cursor
                  cursorStyle="█"
                  typeSpeed={50}
                  delaySpeed={1200}
                  // Kita tidak pakai onLoopDone karena tidak stabil
                />
              </div>
            )}

            {showVideo && (
              <motion.div
                className="video-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
              >
                <video
                  ref={videoRef}
                  src="/video.mp4"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                ></video>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrankButton;
