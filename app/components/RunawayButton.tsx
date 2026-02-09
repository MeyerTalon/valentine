"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const MARGIN = 32;
/** Cursor within this distance triggers the button to move */
const TRIGGER_DISTANCE = 100;
/** Button center stays this far from cursor so cursor is never over the button */
const TARGET_DISTANCE = 130;

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
  const restCenterRef = useRef<{ x: number; y: number } | null>(null);
  const positionRef = useRef(position);
  positionRef.current = position;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (restCenterRef.current === null) {
      restCenterRef.current = {
        x: centerX - positionRef.current.x,
        y: centerY - positionRef.current.y,
      };
    }
    const rest = restCenterRef.current;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < TRIGGER_DISTANCE) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const minCenterX = MARGIN + rect.width / 2;
      const maxCenterX = viewportWidth - MARGIN - rect.width / 2;
      const minCenterY = MARGIN + rect.height / 2;
      const maxCenterY = viewportHeight - MARGIN - rect.height / 2;

      const dirX = -dx / distance;
      const dirY = -dy / distance;
      let targetCenterX = e.clientX + dirX * TARGET_DISTANCE;
      let targetCenterY = e.clientY + dirY * TARGET_DISTANCE;

      targetCenterX = Math.max(minCenterX, Math.min(maxCenterX, targetCenterX));
      targetCenterY = Math.max(minCenterY, Math.min(maxCenterY, targetCenterY));

      const newX = targetCenterX - rest.x;
      const newY = targetCenterY - rest.y;

      setPosition({ x: newX, y: newY });
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
          stiffness: 480,
          damping: 32,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.button>
    </div>
  );
}
