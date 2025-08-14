// src/components/showcase/ProjectCard.jsx

import React, { useState, useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [isShaking, setIsShaking] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else {
      // Tampilkan notifikasi dan getarkan kartu
      showNotification("Artefak ini masih dalam tahap peracikan...");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Durasi animasi getar
    }
  };

  return (
    <div 
      className={`project-card ${isShaking ? 'shake' : ''}`}
      onClick={handleClick}
    >
      <div className="wrapper">
        <img src={project.bgImage} className="cover-image" alt={`Background for ${project.title}`} />
      </div>
      <div className="title-container">
        <h3 className="project-title">{project.title}</h3>
        <div className="tags-container">
          {project.tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)}
        </div>
      </div>
      {/* Tampilkan karakter hanya jika ada link (sudah deploy) */}
      {project.link && (
        <img src={project.charImage} className="character" alt={`Character for ${project.title}`} loading="lazy" decoding="async" fetchPriority="low" />
      )}
    </div>
  );
};

export default ProjectCard;