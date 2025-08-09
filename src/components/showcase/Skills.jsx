// src/components/showcase/Skills.jsx

import SkillCard3D from './SkillCard3D';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs } from 'react-icons/fa';
import { 
  SiVite, 
  SiTailwindcss, 
  SiMysql, 
  SiGreensock,
  SiFramer 
} from 'react-icons/si';
import { TbBrandThreejs } from "react-icons/tb";

const skillsData = [
  {
    // UBAH DI SINI
    title: <>Fondasi &<br />Bahasa</>,
    description: "Elemen dasar yang menjadi inti dari setiap proyek yang saya buat.",
    mainIcon: <FaHtml5 />,
    techs: [
      { name: 'HTML5', icon: FaHtml5, stars: 5 },
      { name: 'CSS3', icon: FaCss3Alt, stars: 4 },
      { name: 'MySQL', icon: SiMysql, stars: 3 }
    ]
  },
  {
    // UBAH DI SINI
    title: <>Framework &<br />Library</>,
    description: "Perkakas canggih untuk membangun aplikasi modern, cepat, dan terstruktur.",
    mainIcon: <FaReact />,
    techs: [
      { name: 'React', icon: FaReact, stars: 5 },
      { name: 'Node.js', icon: FaNodeJs, stars: 4 },
      { name: 'Vite', icon: SiVite, stars: 5 },
      { name: 'TailwindCSS', icon: SiTailwindcss, stars: 5 }
    ]
  },
  {
    // UBAH DI SINI
    title: <>Animasi &<br />3D</>,
    description: "Memberikan kehidupan dan interaksi yang imersif pada setiap antarmuka.",
    mainIcon: <TbBrandThreejs />,
    techs: [
      { name: 'GSAP', icon: SiGreensock, stars: 5 },
      { name: 'Framer Motion', icon: SiFramer, stars: 3 },
      { name: 'Three.js', icon: TbBrandThreejs, stars: 4 }
    ]
  },
];

export const Skills = ({ onGameClick }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-16 py-10 px-4">
      {skillsData.map((skill, index) => (
        <SkillCard3D
          key={index}
          title={skill.title}
          description={skill.description}
          mainIcon={skill.mainIcon}
          techs={skill.techs}
          onGameClick={onGameClick}
        />
      ))}
    </div>
  );
};