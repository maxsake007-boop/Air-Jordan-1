import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroTypographyProps {
  word: string;
  colorwayId: string;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({ word, colorwayId }) => {
  return (
    <div
      id="hero-background-typography-container"
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${colorwayId}-${word}`}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 0.10, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -15 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex items-center justify-center"
        >
          <span
            className="font-display font-black text-white text-center leading-none tracking-tighter uppercase select-none mix-blend-overlay"
            style={{
              fontSize: 'clamp(8rem, 28vw, 24rem)',
              fontWeight: 900,
            }}
          >
            {word}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
