"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const MARGIN = 32;
const MOVE_DISTANCE = 90;
const TRIGGER_DISTANCE = 100;

type RunawayButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function RunawayButton({
  onClick,
  children,
  className = "",
}: RunawayButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < TRIGGER_DISTANCE) {
      const angle = Math.atan2(dy, dx);
      const moveX = -Math.cos(angle) * MOVE_DISTANCE;
      const moveY = -Math.sin(angle) * MOVE_DISTANCE;

      setPosition((prev) => {
        let newX = prev.x + moveX;
        let newY = prev.y + moveY;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxX = viewportWidth / 2 - rect.width - MARGIN;
        const maxY = viewportHeight / 2 - rect.height - MARGIN;
        const minX = -viewportWidth / 2 + rect.width + MARGIN;
        const minY = -viewportHeight / 2 + rect.height + MARGIN;

        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));

        return { x: newX, y: newY };
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div className="relative w-full min-h-[48px] flex items-center justify-center">
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        className={`relative ${className}`}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.button>
    </div>
  );
}
