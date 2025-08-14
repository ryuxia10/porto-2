// src/components/utils/InView.jsx
import { useEffect, useRef, useState } from 'react';

export default function InView({ children, rootMargin = '100px', once = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      });
    }, { root: null, rootMargin, threshold: 0.01 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, once]);

  return <div ref={ref}>{visible ? children : null}</div>;
}