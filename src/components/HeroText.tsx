import React from 'react';
import { motion } from 'motion/react';
import { Colorway } from '../types';
import { ShieldCheck, Flame } from 'lucide-react';

interface HeroTextProps {
  colorway: Colorway;
  onOpenSpecs: () => void;
}

export const HeroText: React.FC<HeroTextProps> = ({ colorway }) => {
  return (
    <div
      id="hero-text-content"
      className="relative z-30 flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-[340px] sm:max-w-[400px] md:max-w-[440px] select-none"
    >
      {/* Mini Edition Badge */}
      <motion.div
        key={colorway.id + '-badge'}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white/90 text-xs font-semibold mb-3 sm:mb-4"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="tracking-wide uppercase">{colorway.name}</span>
      </motion.div>

      {/* Main Massive Heading */}
      <h2
        id="hero-main-title"
        className="text-4xl xs:text-5xl sm:text-6xl md:text-5xl lg:text-7xl font-black italic uppercase leading-[0.92] text-white tracking-tighter drop-shadow-md font-display mb-3 sm:mb-5"
      >
        <span>FIND YOUR</span>
        <br />
        <span>GREATNESS</span>
      </h2>

      {/* Subtitle / Description Paragraph */}
      <p
        id="hero-description-paragraph"
        className="text-xs sm:text-sm leading-relaxed text-white/80 opacity-90 font-medium max-w-[300px] sm:max-w-[360px]"
      >
        Built for speed and confidence, every pair combines premium materials and bold design.
        Engineered for comfort, made for movement.
      </p>

      {/* Micro Spec Features */}
      <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs text-white/80">
        <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span className="font-medium">100% Authentic OG</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
          <Flame className="w-3.5 h-3.5 text-white" />
          <span className="font-medium">${colorway.price} USD</span>
        </div>
      </div>
    </div>
  );
};
