// src/games/three-game/ThreeGame.jsx

import React, { useState, Suspense } from 'react';
import './ThreeGame.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Clone } from '@react-three/drei'; // <-- Tambahkan Clone

// =======================================================
// --- Komponen Model 3D yang Sudah Diperbaiki Total ---
// =======================================================
function BrainrotModel({ url, ...props }) {
  const { scene } = useGLTF(url);
  // Gunakan <Clone> untuk membuat salinan yang patuh
  // Ia akan meneruskan semua props lain seperti 'scale' dan 'position'
  return <Clone object={scene} {...props} />;
}

// Preload aset
useGLTF.preload('/models/001.glb');
useGLTF.preload('/models/002.glb');
useGLTF.preload('/models/003.glb');

// Daftar posisi spawn yang tetap dan tidak akan bertabrakan
const spawnPoints = [
  [0, -0.5, 0],      // Tengah
  [-2, -0.5, -2],    // Kiri atas
  [2, -0.5, -2],     // Kanan atas
  [-2, -0.5, 0],     // Kiri tengah
  [2, -0.5, 0],      // Kanan tengah
  [-2, -0.5, 2],     // Kiri bawah
  [0, -0.5, 2],      // Tengah bawah
  [2, -0.5, 2],      // Kanan bawah
  [0, -0.5, -4],     // Cadangan di atas
];


const ThreeGame = () => {
  const [characters, setCharacters] = useState([]);
  const [availableSpawns, setAvailableSpawns] = useState(spawnPoints);

  const addCharacter = (modelUrl, scale = 1) => {
    if (availableSpawns.length === 0) return; 

    const spawnIndex = Math.floor(Math.random() * availableSpawns.length);
    const newPosition = availableSpawns[spawnIndex];

    const newCharacter = {
      id: Date.now(),
      url: modelUrl,
      position: newPosition,
      scale: scale,
    };

    const updatedSpawns = availableSpawns.filter((_, index) => index !== spawnIndex);
    setAvailableSpawns(updatedSpawns);
    setCharacters(prev => [...prev, newCharacter]);
  };

  const removeLastCharacter = () => {
    if (characters.length === 0) return;
    const lastCharacter = characters[characters.length - 1];
    const lastPosition = lastCharacter.position;
    setAvailableSpawns(prevSpawns => [...prevSpawns, lastPosition]);
    setCharacters(prev => prev.slice(0, -1));
  };

  const resetScene = () => {
    setCharacters([]);
    setAvailableSpawns(spawnPoints);
  };

  return (
    <div className="three-game-container">
      <div className="canvas-panel">
        <Canvas camera={{ position: [5, 5, 5], fov: 50, near: 0.01 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <OrbitControls />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color="#333" />
            </mesh>

            {/* DIUBAH: Kita panggil BrainrotModel secara langsung, tanpa <group> */}
            {characters.map(char => (
              <BrainrotModel 
                key={char.id} 
                url={char.url} 
                position={char.position} 
                scale={char.scale} 
              />
            ))}
          </Suspense>
        </Canvas>
      </div>

      <div className="control-panel-three">
        <h3 className="panel-title-three">Panggil Para Brainrot</h3>
        <p className="instructions-three">
          Pilih karakter di bawah untuk memanggil mereka ke meja kerja. Gunakan mouse untuk melihat lebih dekat.
        </p>
        <div className="button-group">
          <button className="shape-button" onClick={() => addCharacter('/models/001.glb', 0.1)}>Tralalero</button>
          <button className="shape-button" onClick={() => addCharacter('/models/002.glb', 0.8)}>Tungtungtung</button>
          <button className="shape-button" onClick={() => addCharacter('/models/003.glb', 0.6)}>Capuccino</button>
        </div>
        <div className="button-group">
          <button className="utility-button" onClick={removeLastCharacter}>Hilangkan yang Terakhir</button>
          <button className="utility-button reset" onClick={resetScene}>Kosongkan Meja</button>
        </div>
      </div>
    </div>
  );
};

export default ThreeGame;