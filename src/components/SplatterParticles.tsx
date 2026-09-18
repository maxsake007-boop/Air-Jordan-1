import React, { useMemo } from 'react';

interface SplatterParticlesProps {
  colorwayId: string;
  mouseX?: number;
  mouseY?: number;
}

export const SplatterParticles: React.FC<SplatterParticlesProps> = ({
  mouseX = 0,
  mouseY = 0,
}) => {
  // Generate random deterministic ink splatter points around center
  const splatters = useMemo(() => {
    const items = [];
    const baseSeeds = [
      { x: -140, y: -60, r: 6, opacity: 0.8 },
      { x: -110, y: -90, r: 3.5, opacity: 0.7 },
      { x: -80, y: -130, r: 4, opacity: 0.65 },
      { x: -50, y: -170, r: 2.5, opacity: 0.5 },
      { x: 30, y: -160, r: 4.5, opacity: 0.75 },
      { x: 70, y: -120, r: 3, opacity: 0.6 },
      { x: 120, y: -80, r: 5, opacity: 0.85 },
      { x: 150, y: -30, r: 3, opacity: 0.7 },
      { x: 170, y: 30, r: 4.2, opacity: 0.8 },
      { x: 130, y: 90, r: 6.5, opacity: 0.9 },
      { x: 90, y: 140, r: 3.5, opacity: 0.7 },
      { x: 40, y: 170, r: 5, opacity: 0.8 },
      { x: -20, y: 180, r: 3, opacity: 0.6 },
      { x: -80, y: 150, r: 4.5, opacity: 0.75 },
      { x: -140, y: 110, r: 7, opacity: 0.85 },
      { x: -180, y: 40, r: 4, opacity: 0.65 },
      { x: -170, y: -20, r: 3, opacity: 0.55 },
      // Fine droplets
      { x: -210, y: 80, r: 1.8, opacity: 0.5 },
      { x: -190, y: 130, r: 2.2, opacity: 0.6 },
      { x: 190, y: -60, r: 2.0, opacity: 0.55 },
      { x: 160, y: -140, r: 1.5, opacity: 0.45 },
      { x: 210, y: 40, r: 2.4, opacity: 0.6 },
      { x: 100, y: 200, r: 2.1, opacity: 0.5 },
      { x: -120, y: 210, r: 1.9, opacity: 0.5 },
      { x: -60, y: -210, r: 2.0, opacity: 0.4 },
      { x: 60, y: -220, r: 2.5, opacity: 0.5 },
    ];

    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const dist = 90 + ((i * 37) % 150);
      const x = Math.cos(angle) * dist + (((i * 17) % 30) - 15);
      const y = Math.sin(angle) * dist + (((i * 23) % 30) - 15);
      const r = 0.8 + ((i * 11) % 4) * 0.9;
      const opacity = 0.25 + ((i * 7) % 6) * 0.1;
      items.push({ x, y, r, opacity });
    }

    return [...baseSeeds, ...items];
  }, []);

  const parallaxX = mouseX * 8;
  const parallaxY = mouseY * 8;

  return (
    <div
      id="splatter-particles-container"
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-10"
      style={{
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
      }}
    >
      <svg
        viewBox="-300 -300 600 600"
        className="w-[120%] h-[120%] max-w-[900px] max-h-[900px] opacity-75 mix-blend-multiply transition-opacity duration-500"
      >
        <defs>
          <radialGradient id="splatterFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Dynamic ink splotches */}
        <g filter="url(#noiseFilter)">
          {splatters.map((s, idx) => (
            <circle
              key={idx}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#080808"
              opacity={s.opacity}
              className="transition-all duration-300"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
