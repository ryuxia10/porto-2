// src/components/hero/HeroSection.jsx

import { useState } from 'react';
import { Scene3D } from './Scene3D';
import { HeroUI } from './HeroUI';
import { Preloader } from '../ui/Preloader';

export const HeroSection = ({ onExploreClick }) => {
  const [appState, setAppState] = useState("preloading");

  const handlePreloaderFinished = () => {
    setAppState("intro");
  };

  return (
    // Ini adalah 'panggung' utama kita dengan latar hitam solid
    <div className="relative w-full h-screen bg-black">
      {appState === "preloading" && (
        <Preloader onLoaded={handlePreloaderFinished} />
      )}
      
      {appState !== "preloading" && (
        <>
          {/* Lapisan Latar: Scene 3D ditempatkan di belakang */}
          <div className="absolute inset-0 z-0">
            <Scene3D />
          </div>
          
          {/* Lapisan Depan: UI ditempatkan di atas Scene 3D */}
          <div className="absolute inset-0 z-10">
            <HeroUI 
              onExploreClick={onExploreClick} 
              appState={appState}
            />
          </div>
        </>
      )}
    </div>
  );
};