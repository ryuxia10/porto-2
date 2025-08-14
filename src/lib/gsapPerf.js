// src/lib/gsapPerf.js
import { gsap } from 'gsap';

// Cap GSAP ticker FPS to reduce CPU usage
gsap.ticker.fps(60);
// Avoid massive jumps after tab is inactive
gsap.ticker.lagSmoothing(1000, 16);

// Pause/resume animations when tab visibility changes
function handleVisibility() {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
}
document.addEventListener('visibilitychange', handleVisibility);