import React from 'react';
import { X, MapPin, Phone, Mail, Clock, Ruler, ShieldCheck } from 'lucide-react';
import { SIZES } from '../data/colorways';
import { sound } from '../utils/audio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'contact' | 'sizes';
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'contact',
}) => {
  const [activeTab, setActiveTab] = React.useState<'contact' | 'sizes'>(defaultTab);

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  if (!isOpen) return null;

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="contact-modal-container"
        className="relative w-full max-w-2xl bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick(500);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switchers */}
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => {
              sound.playClick(600);
              setActiveTab('contact');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'contact'
                ? 'bg-white text-zinc-950'
                : 'bg-white/10 text-white/70 hover:text-white'
            }`}
          >
            [ planet Flagship & Support ]
          </button>
          <button
            onClick={() => {
              sound.playClick(600);
              setActiveTab('sizes');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'sizes'
                ? 'bg-white text-zinc-950'
                : 'bg-white/10 text-white/70 hover:text-white'
            }`}
          >
            Air Jordan Size Conversion Chart
          </button>
        </div>

        {activeTab === 'contact' ? (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight mb-2">
              PLANET SNEAKER CONCIERGE
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Official Jordan Brand authorized premium distributor. Worldwide priority dispatch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <div className="flex items-center space-x-2 text-white font-bold mb-1">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>Flagship Boutiques</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  • 452 Broadway, SoHo, New York, NY<br />
                  • 12 Rue Saint-Honoré, Paris<br />
                  • Shibuya Parco 2F, Tokyo
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <div className="flex items-center space-x-2 text-white font-bold mb-1">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>VIP Client Hours</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Monday – Sunday: 24/7 Digital Concierge<br />
                  Physical Studios: 10:00 AM – 9:00 PM EST
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <div className="flex items-center space-x-2 text-white font-bold mb-1">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>Direct Inquiries</span>
                </div>
                <p className="text-xs text-zinc-400">
                  vip@planet-sneakers.com<br />
                  press@planet-sneakers.com
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <div className="flex items-center space-x-2 text-white font-bold mb-1">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Sneaker Helpline</span>
                </div>
                <p className="text-xs text-zinc-400">
                  +1 (800) 586-7638 (JUMP-NET)<br />
                  Toll-Free Priority Line
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight mb-2">
              OFFICIAL SIZE CHART
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              Air Jordan 1 High fits true to size (TTS). For wider feet, consider going +0.5 size.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-800/80 text-white font-bold border-b border-white/10">
                  <tr>
                    <th className="p-3">EU Size</th>
                    <th className="p-3">US Men</th>
                    <th className="p-3">UK</th>
                    <th className="p-3">Foot Length (CM)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {SIZES.map((sz) => (
                    <tr key={sz.eu} className="hover:bg-white/5">
                      <td className="p-3 font-bold text-white">EU {sz.eu}</td>
                      <td className="p-3">US {sz.us}</td>
                      <td className="p-3">UK {sz.uk}</td>
                      <td className="p-3">{sz.cm} cm</td>
                      <td className="p-3">
                        {sz.inStock ? (
                          <span className="text-emerald-400 font-semibold">Available</span>
                        ) : (
                          <span className="text-zinc-500">Waitlist</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              sound.playClick(500);
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
