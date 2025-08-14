// src/components/hero/AuroraBackdrop.jsx
import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Ultra-light animated canvas with aurora waves + subtle particles
export default function AuroraBackdrop() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    let stopped = false;
    let width = 0, height = 0, dpr = 1;
    let t = 0;

    const resize = () => {
      dpr = Math.min(1.75, window.devicePixelRatio || 1);
      width = canvas.clientWidth | 0;
      height = canvas.clientHeight | 0;
      canvas.width = Math.max(1, (width * dpr) | 0);
      canvas.height = Math.max(1, (height * dpr) | 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // particles setup
    const COUNT = reduced ? 0 : (width < 800 ? 12 : 22);
    const particles = new Array(COUNT).fill(0).map(() => ({
      x: Math.random() * 1,
      y: Math.random() * 1,
      r: 0.002 + Math.random() * 0.004,
      s: 0.3 + Math.random() * 0.7,
    }));

    const drawAurora = (time) => {
      // background gradient
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
      g.addColorStop(0, '#050505');
      g.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // soft vignette
      ctx.globalCompositeOperation = 'multiply';
      const vg = ctx.createRadialGradient(
        canvas.width/2, canvas.height*0.45, Math.min(canvas.width, canvas.height) * 0.1,
        canvas.width/2, canvas.height*0.55, Math.max(canvas.width, canvas.height) * 0.7
      );
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      // aurora bands (gold-ish)
      const bands = reduced ? 1 : 2;
      for (let i=0; i<bands; i++) {
        const yBase = canvas.height * (0.4 + i*0.08);
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x=0; x<=canvas.width; x+=8) {
          const n = Math.sin((x * 0.003) + t * (0.8 - i*0.2)) * 18 * (i === 0 ? 1 : 0.7);
          ctx.lineTo(x, yBase + n * dpr);
        }
        const grad = ctx.createLinearGradient(0, yBase-40, 0, yBase+40);
        grad.addColorStop(0, 'rgba(255,215,0,0)');
        grad.addColorStop(0.5, 'rgba(255,215,0,0.22)');
        grad.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = (i === 0 ? 20 : 12) * dpr;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // particles (subtle gold dust)
      if (!reduced) {
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = 'rgba(255,215,0,0.35)';
        particles.forEach(p => {
          const px = p.x * canvas.width;
          const py = p.y * canvas.height * 0.8 + canvas.height * 0.1;
          const r = p.r * Math.min(canvas.width, canvas.height) * 0.6;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI*2);
          ctx.fill();
          // move
          p.x += (Math.sin(t*0.003 + py*0.0004) * 0.001) * p.s;
          p.y += (0.0006 * p.s);
          if (p.y > 1.05) { p.y = -0.05; p.x = Math.random(); }
        });
        ctx.globalCompositeOperation = 'source-over';
      }
    };

    let raf;
    const loop = () => {
      if (stopped) return;
      t += 1;
      drawAurora(t);
      // run at ~30fps to be gentle on CPU
      raf = setTimeout(() => requestAnimationFrame(loop), 1000/30);
    };
    loop();

    const onVis = () => {
      if (document.hidden) { stopped = true; clearTimeout(raf); }
      else { if (stopped) { stopped = false; loop(); } }
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