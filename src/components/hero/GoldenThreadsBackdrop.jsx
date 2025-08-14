// src/components/hero/GoldenThreadsBackdrop.jsx
import { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Lightweight golden "programmer threads" background using Canvas 2D.
// - Particle threads with subtle connections and glow
// - Respects prefers-reduced-motion
// - Pauses when tab hidden
export default function GoldenThreadsBackdrop() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    let width = 0, height = 0, dpr = 1;
    let t = 0, stopped = false;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.clientWidth | 0;
      height = canvas.clientHeight | 0;
      canvas.width = Math.max(1, (width * dpr) | 0);
      canvas.height = Math.max(1, (height * dpr) | 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Node/particle setup
    const BASE_COUNT = reduced ? 18 : (width < 720 ? 46 : 82);
    const nodes = new Array(BASE_COUNT).fill(0).map((_, i) => {
      const seed = Math.random();
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x, y, px: x, py: y,
        vx: (Math.random()-0.5)*0.6,
        vy: (Math.random()-0.5)*0.6,
        s: 0.6 + Math.random()*0.9, // speed scale
        seed,
      };
    });

    const bg = () => {
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
      g.addColorStop(0, '#060606');
      g.addColorStop(1, '#0b0b0b');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // soft vignette
      ctx.globalCompositeOperation = 'multiply';
      const vg = ctx.createRadialGradient(
        canvas.width*0.5, canvas.height*0.45, Math.min(canvas.width, canvas.height) * 0.2,
        canvas.width*0.5, canvas.height*0.55, Math.max(canvas.width, canvas.height) * 0.8
      );
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    };

    const step = () => {
      // background
      bg();

      // compute & draw trails
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // particle trails (threads)
      nodes.forEach((p, idx) => {
        const noiseX = Math.sin((p.y * 0.004 + t*0.004) + p.seed * 6.283) * 0.6;
        const noiseY = Math.cos((p.x * 0.004 + t*0.003) + p.seed * 6.283) * 0.6;
        p.vx = (p.vx + noiseX) * 0.98;
        p.vy = (p.vy + noiseY) * 0.98;

        const speed = reduced ? 0.35 : 0.7;
        p.x += p.vx * p.s * speed;
        p.y += p.vy * p.s * speed;

        // wrap
        if (p.x < -10) { p.x = width+10; p.px = p.x; }
        if (p.x > width+10) { p.x = -10; p.px = p.x; }
        if (p.y < -10) { p.y = height+10; p.py = p.y; }
        if (p.y > height+10) { p.y = -10; p.py = p.y; }

        // trail as thread
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.06)';
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.moveTo(p.px * dpr, p.py * dpr);
        ctx.lineTo(p.x * dpr, p.y * dpr);
        ctx.stroke();

        p.px = p.x;
        p.py = p.y;
      });

      // connections (network)
      ctx.globalCompositeOperation = 'lighter';
      for (let i=0; i<nodes.length; i++) {
        const p = nodes[i];
        for (let j=i+1; j<Math.min(nodes.length, i+10); j++) { // check next 9 nodes only
          const q = nodes[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const dist = Math.hypot(dx, dy);
          const MAX = Math.min(width, height) * 0.2 + 80;
          if (dist < MAX) {
            const a = (1 - dist / MAX) * (reduced ? 0.25 : 0.5);
            if (a > 0.02) {
              const grad = ctx.createLinearGradient(p.x*dpr, p.y*dpr, q.x*dpr, q.y*dpr);
              grad.addColorStop(0, `rgba(255,215,0,${a*0.9})`);
              grad.addColorStop(1, `rgba(255,215,0,${a*0.55})`);
              ctx.strokeStyle = grad;
              ctx.lineWidth = Math.max(0.6, a*1.6) * dpr;
              ctx.beginPath();
              ctx.moveTo(p.x*dpr, p.y*dpr);
              ctx.lineTo(q.x*dpr, q.y*dpr);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    let raf;
    const tick = () => {
      if (stopped) return;
      t += 1;
      step();
      // gentle 32~35fps
      raf = setTimeout(() => requestAnimationFrame(tick), 1000/32);
    };
    tick();

    const onVis = () => {
      if (document.hidden) { stopped = true; clearTimeout(raf); }
      else { if (stopped) { stopped = false; tick(); } }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stopped = true;
      clearTimeout(raf);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ background: '#000' }}
      aria-hidden="true"
    />
  );
}