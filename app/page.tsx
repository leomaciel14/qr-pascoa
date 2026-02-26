"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <main style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100dvh',
      overflow: 'hidden',
      backgroundColor: '#f7df41'
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

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '20px',
        pointerEvents: 'none'
      }}>

        <AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
            style={{ pointerEvents: 'auto' }}
            className="bg-pascoa-creme text-pascoa-chocolate backdrop-blur-lg p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center text-center max-w-sm border border-white/20"
          >

            <h1 className="text-4xl mb-4">🍫</h1>
            <h2 className="text-3xl font-black text-amber-900 leading-tight">
              PÁSCOA SEBRATEL!
            </h2>

            <p className="mt-4 leading-relaxed font-medium text-lg">
              Procure por cards de páscoa escondidos na sua base. ✨
            </p>

          </motion.div>

        </AnimatePresence>
      </div>
    </main>
  );
}