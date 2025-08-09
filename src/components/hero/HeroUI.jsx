// src/components/hero/HeroUI.jsx

import { motion } from 'framer-motion';
import GradientText from '../ui/GradientText';
import AlchemistButton from '../ui/AlchemistButton';
import SpotlightText from '../ui/SpotlightText'; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5, // Kita percepat sedikit delaynya
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export const HeroUI = ({ onExploreClick, appState }) => { 
  const alchemistColors = ["#FF2400", "#FF7800", "#FFD700", "#FF7800", "#FF2400"];

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter"
        variants={itemVariants}
      >
        <SpotlightText 
          text="Reza Dwiky Anggara"
          // GANTI 'font-playfair' MENJADI 'font-cinzel-base'
          className="font-cinzel-base" 
        />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-8">
        <GradientText
          colors={alchemistColors}
          className="font-cinzel text-xl md:text-2xl"
          animationSpeed={10}
        >
          The Digital Alchemist
        </GradientText>
      </motion.div>

      <motion.div variants={itemVariants}>
        <AlchemistButton onClick={onExploreClick}>
          Jelajahi Lab
        </AlchemistButton>
      </motion.div>
    </motion.div>
  );
};