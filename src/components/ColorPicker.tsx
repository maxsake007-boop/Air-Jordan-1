import React from 'react';
import { Colorway } from '../types';
import { sound } from '../utils/audio';

interface ColorPickerProps {
  colorways: Colorway[];
  currentColorway: Colorway;
  onSelectColor: (colorway: Colorway) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colorways,
  currentColorway,
  onSelectColor,
}) => {
  return (
    <div
      id="color-picker-container"
      className="flex flex-col items-center sm:items-start select-none"
    >
      {/* Title */}
      <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 opacity-70 drop-shadow-sm">
        Choose Your Color
      </h3>

      {/* Swatches Row */}
      <div className="flex items-center space-x-3.5 sm:space-x-4">
        {colorways.map((cw) => {
          const isActive = cw.id === currentColorway.id;
          return (
            <button
              key={cw.id}
              id={`color-swatch-${cw.id}`}
              onClick={() => {
                sound.playColorSwitch();
                onSelectColor(cw);
              }}
              title={cw.name}
              className={`relative w-10 h-10 rounded-full transition-all duration-300 transform cursor-pointer border-2 ${
                isActive
                  ? 'border-white ring-4 ring-white/20 scale-110 shadow-lg'
                  : 'border-transparent hover:border-white/80 opacity-80 hover:opacity-100 hover:scale-105'
              }`}
              style={{
                backgroundColor: cw.swatchHex,
                boxShadow: isActive ? `0 0 20px ${cw.glowColor}` : '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              <span className="sr-only">{cw.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
