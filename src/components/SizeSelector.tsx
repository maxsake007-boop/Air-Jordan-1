import React from 'react';
import { SIZES } from '../data/colorways';
import { sound } from '../utils/audio';

interface SizeSelectorProps {
  activeSize: number;
  onSelectSize: (size: number) => void;
  onOpenSizeGuide?: () => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  activeSize,
  onSelectSize,
}) => {
  const [showAllSizes, setShowAllSizes] = React.useState(false);

  // Default featured sizes from reference: 43, 45, 46
  const featuredSizes = [43, 45, 46];

  const displaySizes = showAllSizes
    ? SIZES.map((s) => s.eu)
    : featuredSizes;

  return (
    <div id="size-selector-container" className="flex flex-col items-center sm:items-start select-none mt-4 sm:mt-5">
      {/* Size Pills */}
      <div className="flex flex-wrap items-center gap-3">
        {displaySizes.map((sz) => {
          const isSelected = activeSize === sz;
          return (
            <button
              key={sz}
              id={`size-btn-${sz}`}
              onClick={() => {
                sound.playClick(800, 0.03);
                onSelectSize(sz);
              }}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'bg-transparent text-white border border-white/20 hover:border-white hover:bg-white hover:text-black hover:scale-105'
              }`}
            >
              {sz}
            </button>
          );
        })}

        {/* Toggle between 3 featured sizes and full range */}
        <button
          onClick={() => {
            sound.playClick(600);
            setShowAllSizes(!showAllSizes);
          }}
          title={showAllSizes ? 'Show standard sizes' : 'Show all sizes (40-47)'}
          className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all cursor-pointer"
        >
          {showAllSizes ? 'Less' : '+ More'}
        </button>
      </div>
    </div>
  );
};
