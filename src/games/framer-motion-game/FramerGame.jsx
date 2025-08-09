// src/games/framer-motion-game/FramerGame.jsx

import React, { useState, useRef } from 'react';
import './FramerGame.css';
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { motion } from 'framer-motion'; // <-- IMPORT UTAMA FRAMER MOTION

const FramerGame = () => {
  // =======================================================
  // --- TAHAP 8B: State & Ref ---
  // =======================================================
  // State untuk melacak tugas yang sudah selesai
  const [tasksCompleted, setTasksCompleted] = useState({
    hover: false,
    tap: false,
    drag: false,
  });

  // Ref untuk menjadi batas area drag
  const constraintsRef = useRef(null);
  
  // =======================================================

  return (
    <div className="framer-game-container">
      {/* Panel Kiri: Arena untuk Orb */}
      <div className="orb-arena" ref={constraintsRef}>
        {/* Mengubah div biasa menjadi motion.div dan menambahkan 'mantra' animasi */}
        <motion.div 
          className="orb"
          
          // Mantra saat di-hover
          whileHover={{ scale: 1.15, rotate: 15 }}
          
          // Mantra saat di-tap/klik
          whileTap={{ scale: 0.85 }}
          
          // Mantra untuk mengaktifkan fungsi seret (drag)
          drag
          dragConstraints={constraintsRef} // Batasan area seret
          
          // Mantra untuk melacak event dan mengubah state checklist
          onHoverStart={() => setTasksCompleted(prev => ({ ...prev, hover: true }))}
          onTap={() => setTasksCompleted(prev => ({ ...prev, tap: true }))}
          onDragEnd={() => setTasksCompleted(prev => ({ ...prev, drag: true }))}
        />
      </div>

      {/* Panel Kanan: Daftar Perintah Sihir */}
      <div className="spell-list-panel">
        <h3 className="panel-title-framer">Panggil Kekuatan Orb</h3>
        <p className="instructions-framer">
          Lakukan gestur berikut pada Orb Peramal di sebelah kiri dan lihat reaksinya. Ini membuktikan kemampuan Framer Motion dalam animasi berbasis interaksi.
        </p>
        <ul className="task-list">
          {/* Checklist sekarang dinamis */}
          <li className={tasksCompleted.hover ? 'completed' : ''}>
            {tasksCompleted.hover ? <FaCheckSquare /> : <FaRegSquare />}
            Arahkan kursor ke Orb
          </li>
          <li className={tasksCompleted.tap ? 'completed' : ''}>
            {tasksCompleted.tap ? <FaCheckSquare /> : <FaRegSquare />}
            Ketuk (klik) Orb-nya
          </li>
          <li className={tasksCompleted.drag ? 'completed' : ''}>
            {tasksCompleted.drag ? <FaCheckSquare /> : <FaRegSquare />}
            Seret Orb ini di dalam arenanya
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FramerGame;