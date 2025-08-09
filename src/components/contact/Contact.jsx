// src/components/contact/Contact.jsx

import React from "react";
import "./Contact.css";
import AnimatedTitle from "../ui/AnimatedTitle";
import BrewButton from "../../games/BrewButton";
import ThemedInput from "../ui/ThemedInput";
import { FaUserAlt, FaEnvelope, FaFeatherAlt } from "react-icons/fa";
import ContactGhost from "./ContactGhost";
import { Typewriter } from "react-simple-typewriter"; // <-- IMPORT SIHIR BARU

const Contact = () => {
  return (
    <section className="contact-section relative">
      <div className="w-full max-w-[1000px]">
        <AnimatedTitle text="Hubungi Sang Alkemis" />
      </div>

      {/* DI SINI PERUBAHAN UTAMANYA */}
      <p className="contact-intro">
        <Typewriter
          words={[
            "Punya ide untuk diracik bersama?",
            "Sebuah pertanyaan tentang sihir digital?",
            "Atau hanya ingin menyapa?",
            "Kirimkan pesan melalui perkamen di bawah ini.",
          ]}
          loop={0} // 0 berarti loop tak terbatas
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000} // Jeda 2 detik setelah selesai mengetik
        />
      </p>

      <form
        className="contact-form"
        action="https://formspree.io/f/movlpyrl" // <-- Jangan lupa ganti ini dengan URL-mu
        method="POST"
      >
        {/* ... sisa form tidak berubah ... */}
        <div className="form-group">
          <label htmlFor="name">Nama Anda</label>
          <ThemedInput
            type="text"
            id="name"
            name="name"
            placeholder="Ketik namamu..."
            icon={<FaUserAlt />}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Alamat Eter (Email)</label>
          <ThemedInput
            type="email"
            id="email"
            name="_replyto"
            placeholder="Alamat email untuk balasan..."
            icon={<FaEnvelope />}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Pesan Gaib Anda</label>
          <ThemedInput
            as="textarea"
            id="message"
            name="message"
            placeholder="Tulis pesan ajaibmu di sini..."
            icon={<FaFeatherAlt />}
            rows="6"
            required
          />
        </div>
        <div className="form-submit">
          <BrewButton defaultText="KIRIM PESAN" sentText="TERKIRIM" />
        </div>
      </form>
      <ContactGhost />
    </section>
  );
};

export default Contact;
