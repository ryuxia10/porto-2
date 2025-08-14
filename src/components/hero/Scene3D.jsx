// src/components/hero/Scene3D.jsx

import { useRef, useEffect } from 'react';
// DIUBAH: Nama library diperbaiki dari '@react-three-fiber' menjadi '@react-three/fiber'
import { Canvas, useFrame } from '@react-three/fiber'; 
import { useGLTF, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import { usePerfBudget } from '@/hooks/usePerfBudget';
import { useGSAP } from '@gsap/react';

const BookModel = () => {
  const { intensity, reduced, scale } = usePerfBudget();
  // Pastikan path ini benar sesuai nama file 3D-mu
  const { scene } = useGLTF('/tongkat_sihir.glb'); 
  const modelRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material.isMeshStandardMaterial) {
        child.material.emissive = child.material.color.clone().multiplyScalar(0.5);
        child.material.emissiveIntensity = 2;
        child.material.toneMapped = false;
      }
    });
  }, [scene]);

  useGSAP(() => {
    if (modelRef.current) {
      gsap.fromTo(modelRef.current.scale, 
        { x: 0, y: 0, z: 0 }, 
        { x: 0.02, y: 0.02, z: 0.02, duration: 2.5, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, { scope: modelRef });

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1;
    }
  });
  
  const rotationX = 6 * (Math.PI / 180);
  const rotationY = -50 * (Math.PI / 180);

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      rotation={[rotationX, rotationY, 0]} 
      position={[0, 0, 0]}
    />
  );
};

export const Scene3D = () => {
  const { intensity, reduced, scale } = usePerfBudget();

  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'low-power' }} shadows={false} frameloop='always' camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[3, 3, 5]} 
        intensity={2.5} 
        color="#FFD700" 
      />
      
      <Sparkles count={Math.max(20, Math.round(150 * (intensity || 0.6)))} scale={8} size={1.2} speed={0.4} color="#FFD700" />
      <BookModel />

      <EffectComposer>
        <Bloom 
          intensity={Math.max(0.05, 1.5 * (intensity || 0.6))}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={500}
        />
      </EffectComposer>
    </Canvas>
  );
};