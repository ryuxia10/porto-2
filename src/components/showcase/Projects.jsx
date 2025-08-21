// src/components/showcase/Projects.jsx

import React, { useState } from "react";
import AnimatedTitle from "../ui/AnimatedTitle";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import "./Projects.css";
import SvgPagination from "../ui/SvgPagination"; 

const projectData = [
  {
    title: "Zyngra POS",
    tags: ["dashboard", "typescript", "pos", "backend"],
    bgImage: "/projects/zy01.png",
    charImage: "/projects/zy01-1.png",
    link: "https://zyngra.vercel.app/",
  },
  {
    title: "Portofolio 1.0",
    tags: ["react.js", "javascript", "motion-framer", "anime"],
    bgImage: "/projects/bg-1.png",
    charImage: "/projects/c-1.png",
    link: "https://rezadwiky.vercel.app/",
  },
  {
    title: "Cipher Agency",
    tags: ["react.js", "3d", "motion-framer", "agent"],
    bgImage: "/projects/bg-2.png",
    charImage: "/projects/c-2.png",
    link: "https://cipher-agent.vercel.app/",
  },
  {
    title: "Aethelgard",
    tags: ["react.js", "game-model", "javascript"],
    bgImage: "/projects/bg-3.png",
    charImage: "/projects/c-3.png",
    link: "https://aethelgard.vercel.app/",
  },
  {
    title: "Minibar 1.0",
    tags: ["javascript", "css", "cafe", "frontend"],
    bgImage: "/projects/bg-4.png",
    charImage: "/projects/c-4.png",
    link: "https://menu-minibar-react.vercel.app/",
  },
  {
    title: "Vryxia AI",
    tags: ["react.js", "AI", "3d", "chat AI"],
    bgImage: "/projects/bg-5.png",
    charImage: "/projects/c-5.png",
    link: "https://vryxia.vercel.app/",
  },
  {
    title: "Aplikasi POS",
    tags: ["dashboard", "POS", "backend", "futuristik"],
    bgImage: "/projects/bg-6.png",
    charImage: "/projects/c-6.png",
    link: "https://ryuxia-pos.vercel.app/",
  },
  {
    title: "SQL Learning",
    tags: ["JS", "Database", "SQL", "Learn"],
    bgImage: "/projects/sql.png",
    charImage: "/projects/sqllogo.png",
    link: "https://sql-learning.vercel.app/",
  },
  {
    title: "Minibar 2.0",
    tags: ["3d", "UI/UX", "react.js", "cafe"],
    bgImage: "/projects/bg-7.png",
    charImage: null,
    link: null,
  },
  {
    title: "Gema Bintang",
    tags: ["story-game", "react.js", "visual story"],
    bgImage: "/projects/bg-8.png",
    charImage: null,
    link: null,
  },
  {
    title: "Aplikasi Cuaca",
    tags: ["weather", "frontend", "react.js", "animation"],
    bgImage: "/projects/bg-9.png",
    charImage: null,
    link: null,
  },
  {
    title: "Etheral Flux",
    tags: ["film", "react.js"],
    bgImage: "/projects/bg-10.png",
    charImage: null,
    link: null,
  },
];
const variants = {
  enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({
    zIndex: 0,
    position: "absolute",
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export const Projects = () => {
  const [[currentPage, direction], setPage] = useState([1, 0]);
  const projectsPerPage = 6;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectData.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(projectData.length / projectsPerPage);

  const paginate = (newPage) => {
    const newDirection = newPage > currentPage ? 1 : -1;
    setPage([newPage, newDirection]);
  };

  return (
    <div className="mt-20 px-4">
      <AnimatedTitle text="Artefak Ciptaan" />

      <div className="projects-container">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center py-10"
          >
            {currentProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* GANTI BLOK TOMBOL LAMA DENGAN KOMPONEN BARU */}
      <SvgPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};
