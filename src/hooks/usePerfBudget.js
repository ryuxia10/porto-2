// src/hooks/usePerfBudget.js
import { useMemo } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function usePerfBudget() {
  const reduced = usePrefersReducedMotion();
  const isSmallScreen = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false;
  const isTouch = typeof window !== 'undefined' ? window.matchMedia('(any-hover: none)').matches : false;

  // intensity: 1 (full), 0.6 (default), 0.35 (mobile/touch), 0 (reduced motion)
  const intensity = reduced ? 0 : (isSmallScreen || isTouch) ? 0.35 : 0.6;

  return useMemo(() => ({
    reduced,
    intensity,
    // helper to scale numeric values safely
    scale: (value) => Math.max(0, value * intensity),
  }), [reduced, intensity]);
}