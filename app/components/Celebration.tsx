"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONFETTI_COLORS = ["#FFB6C1", "#E63946", "#FFE4E9", "#F4A3A8", "#E8A0B5"];
const HEART_EMOJIS = ["💕", "💗", "💖", "❤️", "💝"];

function ConfettiPiece({
  delay,
  left,
  color,
  rotation,
  duration,
}: {
  delay: number;
  left: number;
  color: string;
  rotation: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-sm"
      style={{
        left: `${left}%`,
        top: -20,
        backgroundColor: color,
        rotate: rotation,
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: "100vh", opacity: 0, rotate: rotation + 720 }}
      transition={{
        duration,
        delay,
        ease: "easeIn",
      }}
    />
  );
}

export default function Celebration() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiPiece
              key={i}
              delay={i * 0.02}
              left={Math.random() * 100}
              color={CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]}
              rotation={Math.random() * 360}
              duration={2.5 + Math.random() * 1.5}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.span
              key={`h-${i}`}
              className="absolute text-4xl md:text-6xl"
              style={{
                left: `${10 + (i * 6)}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1],
                y: [0, -30],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
            >
              {HEART_EMOJIS[i % HEART_EMOJIS.length]}
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
