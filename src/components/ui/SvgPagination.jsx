// src/components/ui/SvgPagination.jsx

import React, { useRef, useLayoutEffect } from "react";
import "./SvgPagination.css";
import { gsap } from "gsap";

const SvgPagination = ({ totalPages, currentPage, onPageChange }) => {
  const circleRadius = 15;
  const circleStrokeWidth = 2;
  const gap = 15;
  const lineStrokeWidth = 10;
  const svgHeight = 150;
  const svgWidth = 800;

  const lineRef = useRef(null);
  const circlesRef = useRef([]);
  const previousCircleIndex = useRef(currentPage - 1); 
  const isInitialRender = useRef(true); 

  const circleDiameter = circleRadius * 2;
  const groupWidth = totalPages * circleDiameter + (totalPages - 1) * gap;
  const startX = (svgWidth - groupWidth) / 2;

  const getCircleCx = (index) =>
    startX + circleRadius + index * (circleDiameter + gap);

  // Efek ini berjalan setiap kali currentPage berubah
  useLayoutEffect(() => {
    if (!lineRef.current || circlesRef.current.length === 0) return;

    const targetCx = getCircleCx(currentPage - 1);

    // Jika ini adalah render pertama, langsung atur posisi tanpa animasi
    if (isInitialRender.current) {
      gsap.set(lineRef.current, {
        attr: { x1: targetCx, x2: targetCx },
        strokeWidth: lineStrokeWidth,
      });
      isInitialRender.current = false; // Tandai bahwa render pertama sudah selesai
    } else {
      // Jika bukan render pertama, jalankan animasi "meleleh"
      const startCx = getCircleCx(previousCircleIndex.current);

      const tl = gsap.timeline();
      tl.to(lineRef.current, {
        duration: 0.3,
        attr: { x2: targetCx },
        strokeWidth: 0,
        ease: "power2.in",
      })
        .to(lineRef.current, {
          duration: 1,
          attr: { x1: targetCx },
          ease: "elastic.out(1, 0.76)",
        })
        .to(
          lineRef.current,
          {
            duration: 2,
            strokeWidth: lineStrokeWidth,
            ease: "elastic.out(1, 0.8)",
          },
          "-=1"
        );
    }

    // Selalu simpan posisi saat ini untuk referensi klik berikutnya
    previousCircleIndex.current = currentPage - 1;
  }, [currentPage, totalPages]);

  const circles = Array.from({ length: totalPages }, (_, i) => (
    <circle
      key={i}
      ref={(el) => (circlesRef.current[i] = el)}
      cx={getCircleCx(i)}
      cy={svgHeight / 2}
      r={circleRadius}
      onClick={() => onPageChange(i + 1)}
    />
  ));

  return (
    <div className="svg-pagination-container">
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        <defs>
          <mask id="radioMask">
            <g fill="white" stroke="#555" strokeWidth={circleStrokeWidth}>
              {circles}
            </g>
          </mask>
        </defs>
        <g id="mainGroup" mask="url(#radioMask)">
          <line
            ref={lineRef}
            id="joinLine"
            fill="none"
            strokeWidth={lineStrokeWidth}
            strokeLinecap="round"
            y1={svgHeight / 2}
            y2={svgHeight / 2}
          />
          <g
            id="circleGroup"
            fill="transparent"
            strokeWidth={circleStrokeWidth}
          >
            {circles}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default SvgPagination;
