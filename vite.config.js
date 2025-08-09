// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <-- Import 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // TAMBAHKAN BLOK INI UNTUK MEMBUAT ALIAS '@'
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
