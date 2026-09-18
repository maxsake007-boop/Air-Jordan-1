import React, { useState, useEffect } from 'react';
import { COLORWAYS, SIZES } from './data/colorways';
import { Colorway } from './types';
import { Header } from './components/Header';
import { HeroTypography } from './components/HeroTypography';
import { ShoeStage } from './components/ShoeStage';
import { HeroText } from './components/HeroText';
import { ColorPicker } from './components/ColorPicker';
import { SizeSelector } from './components/SizeSelector';
import { BottomBar } from './components/BottomBar';
import { PlaceOrderModal } from './components/PlaceOrderModal';
import { CatalogModal } from './components/CatalogModal';
import { ContactModal } from './components/ContactModal';
import { sound } from './utils/audio';

export default function App() {
  const [currentColorway, setCurrentColorway] = useState<Colorway>(COLORWAYS[0]);
  const [activeSize, setActiveSize] = useState<number>(43);
  const [activeTab, setActiveTab] = useState<'products' | 'contact'>('products');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals state
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactModalDefaultTab, setContactModalDefaultTab] = useState<'contact' | 'sizes'>('contact');

  // Preload all sneaker images on app mount for instant color switching
  useEffect(() => {
    COLORWAYS.forEach((cw) => {
      const img = new Image();
      img.src = cw.imageSrc;
    });
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) {
      sound.playClick(800);
    }
  };

  const handleSelectColorway = (colorway: Colorway) => {
    setCurrentColorway(colorway);
  };

  const handleOpenSizeGuide = () => {
    setContactModalDefaultTab('sizes');
    setIsContactOpen(true);
  };

  const handleOpenContact = () => {
    setContactModalDefaultTab('contact');
    setIsContactOpen(true);
  };

  // Keyboard accessibility: Left / Right arrows to switch colorways
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const currentIndex = COLORWAYS.findIndex((c) => c.id === currentColorway.id);
        const nextIndex = (currentIndex + 1) % COLORWAYS.length;
        sound.playColorSwitch();
        setCurrentColorway(COLORWAYS[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = COLORWAYS.findIndex((c) => c.id === currentColorway.id);
        const prevIndex = (currentIndex - 1 + COLORWAYS.length) % COLORWAYS.length;
        sound.playColorSwitch();
        setCurrentColorway(COLORWAYS[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentColorway]);

  return (
    <div
      id="planet-landing-root"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 ease-in-out select-none"
      style={{
        background: currentColorway.bgGradient,
        backgroundColor: currentColorway.bgSolid,
      }}
    >
      {/* Background Subtle Grain / Lighting Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenOrder={() => setIsOrderOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onOpenContact={handleOpenContact}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Hero Viewport Area */}
      <main className="relative flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col justify-center my-auto py-4 md:py-6">
        {/* Giant Background Typography: JUMP / BOLD / HEAT / AIR / ICON */}
        <HeroTypography
          word={currentColorway.displayWord}
          colorwayId={currentColorway.id}
        />

        {/* Hero Interactive Grid */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-4 items-center justify-between min-h-[480px] md:min-h-[520px] lg:min-h-[580px]">
          {/* Left Column: Heading & Description */}
          <div className="md:col-span-5 lg:col-span-3 order-2 md:order-1 flex justify-center md:justify-start">
            <HeroText
              colorway={currentColorway}
              onOpenSpecs={() => setIsContactOpen(true)}
            />
          </div>

          {/* Center Column: Air Jordan Sneaker & Ink Splatter + Mobile/Tablet Quick Controls */}
          <div className="md:col-span-7 lg:col-span-6 order-1 md:order-2 flex flex-col items-center justify-center relative">
            <ShoeStage
              currentColorway={currentColorway}
              onPlaceOrder={() => setIsOrderOpen(true)}
              activeSize={activeSize}
            />

            {/* Mobile & Tablet Quick Color Swatch + Size Selector Dock (Positioned right below the sneaker, zero scrolling needed) */}
            <div className="lg:hidden flex flex-col items-center justify-center mt-3 sm:mt-4 z-30 w-full px-2 gap-3">
              {/* Color Swatches */}
              <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-xl border border-white/20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xl max-w-full">
                <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider hidden xs:inline-block pl-1">
                  Color:
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  {COLORWAYS.map((cw) => {
                    const isActive = cw.id === currentColorway.id;
                    return (
                      <button
                        key={`mobile-swatch-${cw.id}`}
                        id={`mobile-color-swatch-${cw.id}`}
                        onClick={() => {
                          sound.playColorSwitch();
                          handleSelectColorway(cw);
                        }}
                        title={cw.name}
                        className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full transition-all duration-300 transform cursor-pointer border-2 touch-manipulation flex items-center justify-center ${
                          isActive
                            ? 'border-white ring-4 ring-white/40 scale-110 shadow-lg'
                            : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105 active:scale-95'
                        }`}
                        style={{
                          backgroundColor: cw.swatchHex,
                          boxShadow: isActive ? `0 0 16px ${cw.glowColor}` : '0 2px 6px rgba(0,0,0,0.3)',
                        }}
                        aria-label={cw.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Quick Size Selectors for Mobile / Tablet */}
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xl border border-white/15 px-3 py-1.5 rounded-full shadow-xl">
                <span className="text-[10px] sm:text-[11px] font-bold text-white/70 uppercase tracking-wider pl-1">
                  Size:
                </span>
                {[43, 45, 46].map((sz) => {
                  const isSelected = activeSize === sz;
                  return (
                    <button
                      key={`mob-size-${sz}`}
                      id={`mob-size-btn-${sz}`}
                      onClick={() => {
                        sound.playClick(800, 0.03);
                        setActiveSize(sz);
                      }}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black shadow-md scale-105'
                          : 'bg-transparent text-white border border-white/25 hover:border-white hover:bg-white/10'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    sound.playClick(600);
                    handleOpenSizeGuide();
                  }}
                  className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:bg-white/10 transition-all cursor-pointer"
                >
                  + More
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop Only): Color Swatches & Size Buttons */}
          <div className="hidden lg:flex lg:col-span-3 order-3 flex-col items-end justify-center">
            <div className="flex flex-col items-start bg-transparent p-0 rounded-2xl">
              <ColorPicker
                colorways={COLORWAYS}
                currentColorway={currentColorway}
                onSelectColor={handleSelectColorway}
              />
              <SizeSelector
                activeSize={activeSize}
                onSelectSize={setActiveSize}
                onOpenSizeGuide={handleOpenSizeGuide}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer Bar */}
      <BottomBar
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onOpenSizeGuide={handleOpenSizeGuide}
      />

      {/* Interactive Modals */}
      <PlaceOrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        colorway={currentColorway}
        size={activeSize}
      />

      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectColorway={handleSelectColorway}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultTab={contactModalDefaultTab}
      />
    </div>
  );
}
