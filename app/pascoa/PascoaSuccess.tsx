"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PascoaSuccess({
  qrId,
  base,
  preview = false,
}: {
  qrId?: number;
  base?: string;
  preview?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.5;

    const attemptPlay = () => {
      video.play().catch(err => console.log("Erro ao dar play:", err));
    };
    attemptPlay();

    const handleTimeUpdate = () => {
      if (video.currentTime >= 5.90 && !showContent) {
        setShowContent(true);
      }
    };

    const handleEnded = () => {
      video.pause();
      video.currentTime = video.duration - 0.1;
    };

    const safetyTimer = setTimeout(() => {
      if (!showContent) {
        setShowContent(true);
      }
    }, 6000);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      clearTimeout(safetyTimer); // Limpa o timer se o componente desmontar
    };
  }, [showContent]);

  return (
    <main style={{
      position: 'fixed', // Fixed garante que ignore paddings de layouts pais
      top: 0,
      left: 0,
      width: '100vw',
      height: '100dvh',
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>

      <div style={{
        position: 'fixed',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
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

      <video
        ref={videoRef}
        src="/video/pascoa.mp4"
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />

      {/* CONTEÚDO ANIMADO */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '20px',
        pointerEvents: 'none' // Permite clicar no vídeo se necessário até o texto aparecer
      }}>


        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }} // Começa invisível, abaixo e menor
              animate={{ opacity: 1, y: 0, scale: 1 }}    // Anima para posição final
              transition={{
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              style={{ pointerEvents: 'auto' }} // Reativa cliques no card
              className="bg-pascoa-creme text-pascoa-chocolate backdrop-blur-lg p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center text-center max-w-sm border border-white/20"
            >

              <h1 className="text-4xl mb-4">✨</h1>
              <h2 className="text-3xl font-black text-amber-900 leading-tight">
                PARABÉNS!
              </h2>

              <p className="mt-4 leading-relaxed font-medium text-lg">
                Você desbloqueou um Ovo de Páscoa e ele será doado à uma instituição. 🍫
              </p>

              <div className="mt-8 flex gap-4 text-xs font-mono text-amber-800/70">
                <span>#{qrId}</span>
                <span>•</span>
                <span>BASE {base}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}