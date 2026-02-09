"use client";

import { motion } from "framer-motion";

const HEARTS = 12;
const heartEmojis = ["💕", "💗", "💖", "❤️", "💝", "🩷"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: HEARTS }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl md:text-4xl opacity-30"
          style={{
            left: `${randomBetween(0, 100)}%`,
            top: `${randomBetween(0, 100)}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          {heartEmojis[i % heartEmojis.length]}
        </motion.span>
      ))}
    </div>
  );
}
