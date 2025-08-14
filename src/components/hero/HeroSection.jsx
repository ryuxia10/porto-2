// src/components/hero/HeroSection.jsx

import { lazy, Suspense, useEffect, useState } from 'react';
import InView from '@/components/utils/InView';
const GoldenThreadsBackdropLazy = lazy(() => import('./GoldenThreadsBackdrop'));
import { HeroUI } from './HeroUI';
import { Preloader } from '../ui/Preloader';

export const HeroSection = ({ onExploreClick }) => {
  const [mount3D, setMount3D] = useState(false);
  useEffect(() => {
    const schedule = (cb) => (window.requestIdleCallback ? requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 600));
    schedule(() => setMount3D(true));
  }, []);

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
            {mount3D && (
              <InView rootMargin="200px">
                <Suspense fallback={null}>
                  <GoldenThreadsBackdropLazy />
                </Suspense>
              </InView>
            )}
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