import React, { useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Colorway } from '../types';
import { COLORWAYS } from '../data/colorways';

interface ShoeStageProps {
  currentColorway: Colorway;
  onPlaceOrder?: () => void;
  activeSize?: number;
}

export const ShoeStage: React.FC<ShoeStageProps> = ({
  currentColorway,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload and pre-decode all sneaker images into browser memory immediately
  useEffect(() => {
    COLORWAYS.forEach((cw) => {
      const img = new Image();
      img.src = cw.imageSrc;
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  // Smooth 3D tilt tracking with spring physics (Pure physical tilt, NO overlay highlights)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const rotateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);
  const translateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 20]), springConfig);
  
  // Floor contact shadow displacement based on tilt
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      id="shoe-stage-wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center pointer-events-auto z-20 select-none overflow-visible"
      style={{ perspective: 1800 }}
    >
      {/* Hidden pre-rendered cache of all images to ensure 0-lag instant switching */}
      <div className="sr-only pointer-events-none opacity-0 select-none -z-50" aria-hidden="true">
        {COLORWAYS.map((cw) => (
          <img key={`cache-${cw.id}`} src={cw.imageSrc} alt="" loading="eager" decoding="async" />
        ))}
      </div>

      {/* Main Sneaker Presentation Container */}
      <div 
        className="relative z-20 w-full max-w-[340px] sm:max-w-[460px] md:max-w-[580px] lg:max-w-[680px] xl:max-w-[760px] aspect-square flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Soft realistic ground shadow under sneaker */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 w-[70%] h-7 md:h-10 bg-black/45 rounded-[100%] blur-2xl pointer-events-none -z-10"
          style={{
            x: shadowX,
            y: shadowY,
          }}
        />

        {/* 3D Interactive Tilt Container */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            rotateZ,
            z: translateZ,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Gentle Floating Levitation */}
          <div 
            className="relative w-[95%] md:w-[98%] aspect-square flex items-center justify-center animate-float"
            style={{ 
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            {/* 
              Clean 180° Spin Transition (No distortion or squishing):
              - Current shoe shrinks uniformly (scale 1 -> 0.25), spins 180 degrees (rotate: 180deg) and flies up-right (y: -360, x: 90)
              - New shoe flies in from bottom (y: 360, x: -60), scales up from 0.35 to 1.0, and unwinds from -180 degrees (rotate: 0deg) smoothly
            */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentColorway.id}
                initial={{
                  opacity: 0,
                  y: 380,
                  x: -60,
                  scale: 0.35,
                  rotate: -180,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  rotate: 0,
                  transition: {
                    duration: 0.52,
                    ease: [0.16, 1, 0.3, 1], // Smooth organic deceleration and settle
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -380,
                  x: 90,
                  scale: 0.25,
                  rotate: 180,
                  transition: {
                    duration: 0.38,
                    ease: [0.4, 0, 0.8, 0.2], // Clean acceleration upwards
                  },
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                <img
                  id={`main-floating-sneaker-${currentColorway.id}`}
                  src={currentColorway.imageSrc}
                  alt={`Air Jordan 1 Retro High OG ${currentColorway.name}`}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain pointer-events-none select-none"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
