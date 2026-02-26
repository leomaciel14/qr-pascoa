"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function JaUsado() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <main style={{
      position: 'fixed', // Para garantir que ocupe a tela toda
      inset: 0,
      overflow: 'hidden',
      backgroundColor: '#692d18', // Fundo preto para as cortinas
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
      }}>
        <motion.video
          src="/video/coelho.webm"
          autoPlay
          muted
          playsInline
          onEnded={(e) => {
            const v = e.currentTarget;
            v.pause();
            v.currentTime = v.duration - 0.1;
          }}
          // Animação idêntica à da imagem
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 1.6, // Mantendo o seu delay de 1.6s
            ease: [0, 0.71, 0.2, 1.01]
          }}
          style={{
            width: '30rem',
            maxWidth: '80vw',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>

      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 5 }} />


      {/* CORTINAS (animação de entrada) */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundColor: '#8B0000',
          backgroundImage: 'url(/curtain.webp)',
          backgroundSize: 'cover',
          zIndex: 10
        }}
      />
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          backgroundColor: '#8B0000',
          backgroundImage: 'url(/curtain.webp)',
          backgroundSize: 'cover',
          zIndex: 10
        }}
      />


      {/* CONTEÚDO (texto e coelho) */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Começa invisível e um pouco abaixo
          animate={{ opacity: 1, y: 0 }}    // Anima para a posição final
          transition={{ delay: 1.7, duration: 0.8, ease: "easeOut" }} // Aparece depois da cortina sumir
          className="m-8 relative z-20 flex flex-col items-center text-center bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-lg border border-white/20 text-gray-800"
        >
          <h1 className="text-4xl mb-4">🎩🐇</h1> {/* Emoji de cartola e coelho */}
          <h2 className="text-3xl font-black text-amber-800 leading-tight">
            Oops!
          </h2>
          <h3 className="text-xl font-bold text-amber-800 leading-tight p-2 pb-6">
            Já tiraram esse coelho da cartola...
          </h3>
          <p className="text-base text-gray-700 font-medium max-w-sm leading-relaxed">
            A mágica já aconteceu por aqui! Alguém foi mais rápido e já garantiu a surpresa deste QR Code.
          </p>
          <p className="mt-4 text-base text-gray-700 font-medium max-w-sm">
            Infelizmente, um coelho não sai da mesma cartola duas vezes.
          </p>
          <p className="mt-6 text-sm text-gray-500 italic">
            Que tal tentar a sorte em outro QR Code? 😉
          </p>
        </motion.div>
      )}

      <div style={{
        position: 'fixed',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        pointerEvents: 'none',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <img
          src="/logo-sebratel.png"
          alt="Logo Sebratel"
          style={{
            width: '12rem',
            height: 'auto',
          }}
        />
      </div>
    </main>
  );
}