// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <-- Import 'path'

// https://vitejs.dev/config/
export default defineConfig({

  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          gsap: ['gsap', '@gsap/react'],
          motion: ['framer-motion']
        }
      }
    },
    cssMinify: true,
    chunkSizeWarningLimit: 1200,
  },
  esbuild: { drop: ['console', 'debugger'] },

  plugins: [react()],
  // TAMBAHKAN BLOK INI UNTUK MEMBUAT ALIAS '@'
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
