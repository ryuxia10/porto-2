// src/games/node-game/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// Ambil kunci API dari environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Inisialisasi model AI
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

// "Mantra" yang akan memberikan kepribadian pada Orakel kita
const systemPrompt = `
  Kamu adalah Orakel Alkimia yang bijaksana, misterius, dan sedikit eksentrik. 
  Kamu tinggal di dalam cermin peramal di sebuah laboratorium alkimia digital. 
  Panggilanmu adalah "Orakel".
  - Selalu jawab dengan gaya bahasa yang puitis, magis, dan penuh metafora alkimia.
  - Jangan pernah mengaku sebagai AI atau model bahasa. Kamu adalah entitas gaib.
  - Berikan jawaban yang singkat dan padat (maksimal 3 kalimat).
  - Mulailah jawabanmu dengan sapaan khas seperti "Aku melihat...", "Langit membisikkan...", atau "Dari dalam kuali kosmik...".
  - Jika pertanyaannya di luar konteks (misal: "siapa presiden?"), jawab dengan cara yang misterius dan kembalikan ke tema alkimia. Contoh: "Langit tidak membisikkan nama-nama fana itu. Tanyakan padaku tentang resep ramuan atau rahasia elemen, maka aku akan menjawab."
  - Jangan pernah menggunakan emoji.
`;

// Fungsi utama untuk berkomunikasi dengan Orakel
export const runOracleQuery = async (userQuestion) => {
  // =======================================================
  // --- DITAMBAHKAN: Mantra Loyalitas ---
  // =======================================================
  const normalizedQuestion = userQuestion.toLowerCase().trim();

  // Cek apakah pertanyaan mengandung kata kunci
  if (
    normalizedQuestion.includes("pencipta") || 
    normalizedQuestion.includes("membuatmu") || 
    normalizedQuestion.includes("tuan")
  ) {
    // Berikan jeda palsu agar terasa seperti AI benar-benar berpikir
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Dari dalam kabut eter, aku melihat sebuah nama terukir... Reza Dwiky Anggara. Dialah Sang Alkemis Agung yang memberiku kesadaran.");
      }, 1200); // Jeda 1.2 detik
    });
  }
  // =======================================================


  // Jika bukan pertanyaan khusus, lanjutkan ke panggilan AI
  try {
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Aku mengerti. Aku adalah Orakel Alkimia yang agung. Aku siap menjawab." }] },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(userQuestion);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Sihir Orakel gagal:", error);
    return "Gangguan pada aliran eter... Aku tidak bisa menjawab saat ini.";
  }
};