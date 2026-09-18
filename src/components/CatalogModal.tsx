import React from 'react';
import { X, Star, ArrowRight, Sparkles } from 'lucide-react';
import { CATALOG_PRODUCTS, COLORWAYS } from '../data/colorways';
import { Colorway } from '../types';
import { sound } from '../utils/audio';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColorway: (colorway: Colorway) => void;
  onOpenOrder: () => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectColorway,
  onOpenOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="catalog-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="catalog-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-white/50">
              [ planet Archive ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight mt-1">
              AIR JORDAN 1 RETRO HIGH OG LINEUP
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick(500);
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto py-6 pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CATALOG_PRODUCTS.map((prod) => {
            const matchedColorway = COLORWAYS.find((cw) => cw.id.includes(prod.id.replace('aj1-high-', ''))) || COLORWAYS[0];

            return (
              <div
                key={prod.id}
                className="group relative bg-zinc-900/90 border border-white/10 hover:border-white/40 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Badge */}
                {prod.badge && (
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-zinc-950 shadow">
                    {prod.badge}
                  </span>
                )}

                {/* Sneaker Image Container */}
                <div
                  className="w-full aspect-square rounded-xl flex items-center justify-center p-3 relative overflow-hidden mb-3"
                  style={{ backgroundColor: prod.accentColor + '20' }}
                >
                  <img
                    src={prod.imageSrc}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 text-xs text-amber-400 mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{prod.rating}</span>
                      <span className="text-zinc-500 font-normal">({prod.reviewsCount})</span>
                    </div>
                    <h3 className="font-bold text-sm text-white line-clamp-1">{prod.name}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{prod.series}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-base font-extrabold text-white">${prod.price}</span>
                    <button
                      onClick={() => {
                        sound.playColorSwitch();
                        onSelectColorway(matchedColorway);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-zinc-950 text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Load in Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 shrink-0">
          <span>All pairs include Nike authenticity NFC tag & box.</span>
          <button
            onClick={() => {
              onClose();
              onOpenOrder();
            }}
            className="text-white hover:underline font-semibold"
          >
            Direct Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};
