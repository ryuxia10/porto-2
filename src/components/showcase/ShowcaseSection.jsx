// src/components/showcase/ShowcaseSection.jsx

import { Skills } from './Skills';
import { Projects } from './Projects';
import AnimatedTitle from '../ui/AnimatedTitle'; // <-- IMPORT KOMPONEN BARU

export const ShowcaseSection = ({ onGameClick }) => {
  return (
    <section className="bg-black py-20">
      {/* GANTI H2 LAMA DENGAN KOMPONEN BARU */}
      <AnimatedTitle text="Formula & Elemen" />
      <Skills onGameClick={onGameClick} />
      <Projects />
    </section>
  );
};