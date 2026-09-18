import React from 'react';
import { ArrowRight, ShoppingBag, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  activeTab: 'products' | 'contact';
  onTabChange: (tab: 'products' | 'contact') => void;
  onOpenOrder: () => void;
  onOpenCatalog: () => void;
  onOpenContact: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenOrder,
  onOpenCatalog,
  onOpenContact,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (action: () => void) => {
    sound.playClick(700, 0.05);
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 w-full pt-6 md:pt-10 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
      {/* Brand Logo: planet */}
      <div
        id="planet-brand-logo"
        onClick={() => {
          sound.playClick(500);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="cursor-pointer group flex items-center select-none"
      >
        <div className="flex items-center text-white text-2xl md:text-3xl font-black tracking-tight uppercase font-outfit">
          <span className="text-white/60 font-light mr-1 transition-transform group-hover:-translate-x-1 duration-200">[</span>
          <span className="font-black tracking-wider">planet</span>
          <span className="text-white/60 font-light ml-1 transition-transform group-hover:translate-x-1 duration-200">]</span>
        </div>
      </div>

      {/* Center Top Toggle: Products | Contact */}
      <div
        id="center-pill-toggle"
        className="hidden md:flex items-center bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-sm"
      >
        <button
          id="toggle-products-tab"
          onClick={() => {
            sound.playClick(650);
            onTabChange('products');
            onOpenCatalog();
          }}
          className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === 'products'
              ? 'bg-white text-black shadow-md scale-100 font-bold'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Products
        </button>
        <button
          id="toggle-contact-tab"
          onClick={() => {
            sound.playClick(650);
            onTabChange('contact');
            onOpenContact();
          }}
          className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === 'contact'
              ? 'bg-white text-black shadow-md scale-100 font-bold'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Contact
        </button>
      </div>

      {/* Right Navigation + Place Order Button */}
      <div className="hidden lg:flex items-center gap-8">
        <nav className="flex items-center gap-6 text-sm font-medium text-white/90">
          <button
            id="nav-link-home"
            onClick={() => handleNavClick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
            className="hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Home
          </button>
          <button
            id="nav-link-products"
            onClick={() => handleNavClick(onOpenCatalog)}
            className="hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Products
          </button>
          <button
            id="nav-link-contact"
            onClick={() => handleNavClick(onOpenContact)}
            className="hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Audio Toggle */}
        <button
          id="toggle-sound-btn"
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute micro-sounds' : 'Enable micro-sounds'}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all border border-white/10"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Place order button */}
        <button
          id="header-place-order-btn"
          onClick={() => {
            sound.playSuccess();
            onOpenOrder();
          }}
          className="group bg-white text-black hover:bg-zinc-100 active:scale-95 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 tracking-normal shadow-lg shadow-black/20 transition-all duration-200 cursor-pointer"
        >
          <span>Place order</span>
          <span className="text-lg transition-transform group-hover:translate-x-1 duration-200">→</span>
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex lg:hidden items-center space-x-3">
        <button
          onClick={onToggleSound}
          className="p-2 rounded-full bg-white/10 text-white border border-white/20"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
        <button
          id="mobile-menu-btn"
          onClick={() => {
            sound.playClick(600);
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="p-2.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="lg:hidden absolute top-full left-4 right-4 mt-3 bg-zinc-950/95 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl z-50 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">Navigation</span>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  onTabChange('products');
                  onOpenCatalog();
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                  activeTab === 'products' ? 'bg-white text-black font-bold' : 'bg-white/10 text-white'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => {
                  onTabChange('contact');
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                  activeTab === 'contact' ? 'bg-white text-black font-bold' : 'bg-white/10 text-white'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-3 text-base font-medium text-white/90">
            <button
              onClick={() => handleNavClick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
              className="text-left py-1 hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick(onOpenCatalog)}
              className="text-left py-1 hover:text-white flex items-center justify-between"
            >
              <span>All Sneaker Catalog</span>
              <ShoppingBag className="w-4 h-4 text-white/60" />
            </button>
            <button
              onClick={() => handleNavClick(onOpenContact)}
              className="text-left py-1 hover:text-white"
            >
              Contact & Support
            </button>
          </div>

          <button
            onClick={() => {
              handleNavClick(onOpenOrder);
            }}
            className="w-full py-3.5 bg-white text-black font-bold rounded-full flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Place order</span>
            <span className="text-base">→</span>
          </button>
        </div>
      )}
    </header>
  );
};
