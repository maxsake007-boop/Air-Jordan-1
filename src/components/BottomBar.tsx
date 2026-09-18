import React from 'react';
import { Instagram, Facebook, Dribbble } from 'lucide-react';
import { sound } from '../utils/audio';

interface BottomBarProps {
  onOpenCatalog: () => void;
  onOpenSizeGuide: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onOpenCatalog,
  onOpenSizeGuide,
}) => {
  return (
    <footer className="relative z-30 w-full pb-6 md:pb-10 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 select-none">
      {/* Social Media Icons (Bottom Left) */}
      <div id="social-links-bar" className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick(600)}
          className="p-1 hover:text-white transition-transform hover:-translate-y-0.5 duration-200"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick(600)}
          className="p-1 hover:text-white transition-transform hover:-translate-y-0.5 duration-200"
          aria-label="Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick(600)}
          className="p-1 hover:text-white transition-transform hover:-translate-y-0.5 duration-200"
          aria-label="Basketball & Dribbble"
        >
          <Dribbble className="w-5 h-5" />
        </a>
        <a
          href="https://behance.net"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick(600)}
          className="p-1 hover:text-white transition-transform hover:-translate-y-0.5 duration-200"
          aria-label="Behance"
        >
          <span className="font-black text-base tracking-tighter">Bē</span>
        </a>
      </div>

      {/* Center: "Choose your size" with flanking horizontal lines */}
      <div
        id="bottom-size-prompt"
        onClick={() => {
          sound.playClick(550);
          onOpenSizeGuide();
        }}
        className="cursor-pointer group flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-200"
      >
        <span className="h-[1px] w-12 bg-white/30 group-hover:bg-white transition-colors" />
        <span className="text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100">
          Choose your size
        </span>
        <span className="h-[1px] w-12 bg-white/30 group-hover:bg-white transition-colors" />
      </div>

      {/* Right Bottom: "See all products →" Button */}
      <div id="bottom-see-all-products">
        <button
          id="see-all-products-btn"
          onClick={() => {
            sound.playClick(750);
            onOpenCatalog();
          }}
          className="group bg-white text-black hover:bg-zinc-100 active:scale-95 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-3 shadow-lg shadow-black/20 transition-all duration-200 cursor-pointer"
        >
          <span>See all products</span>
          <span className="text-lg transition-transform group-hover:translate-x-1 duration-200">→</span>
        </button>
      </div>
    </footer>
  );
};
