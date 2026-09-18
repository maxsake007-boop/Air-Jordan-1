import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { Colorway, OrderFormData } from '../types';
import { sound } from '../utils/audio';

interface PlaceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  colorway: Colorway;
  size: number;
}

export const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({
  isOpen,
  onClose,
  colorway,
  size,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: 'Alex Johnson',
    email: 'alex.jordan@example.com',
    phone: '+1 (555) 382-9901',
    address: '742 Evergreen Terrace',
    city: 'Los Angeles',
    country: 'United States',
    size: size,
    colorwayId: colorway.id,
    quantity: 1,
    paymentMethod: 'apple-pay',
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `PLNT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    sound.playSuccess();
    setStep('success');
  };

  const handleClose = () => {
    sound.playClick(500);
    setStep('details');
    onClose();
  };

  return (
    <div
      id="place-order-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="place-order-modal-box"
        className="relative w-full max-w-xl bg-zinc-900 border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
      >
        {/* Top Accent Gradient Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: colorway.accentColor }}
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <span className="text-xs uppercase font-extrabold tracking-widest text-white/50">
                [ Planet Checkout ]
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display mb-2">
              RESERVE YOUR PAIR
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Instant priority dispatch with Nike authenticity certificate.
            </p>

            {/* Product Summary Mini Card */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-zinc-800/80 border border-white/10 mb-6">
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center p-2 relative overflow-hidden shrink-0"
                style={{ backgroundColor: colorway.accentColor + '25' }}
              >
                <img
                  src={colorway.imageSrc}
                  alt={colorway.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain filter drop-shadow-md"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-white">{colorway.name}</h4>
                  <span className="font-extrabold text-lg text-emerald-400">${colorway.price}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Air Jordan 1 Retro High OG</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/15 text-white">
                    EU Size {size}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" /> In Stock
                  </span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick(600);
                      setFormData({ ...formData, paymentMethod: 'apple-pay' });
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      formData.paymentMethod === 'apple-pay'
                        ? 'border-white bg-white text-zinc-950 font-bold'
                        : 'border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    <span> Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick(600);
                      setFormData({ ...formData, paymentMethod: 'card' });
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-white bg-white text-zinc-950 font-bold'
                        : 'border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick(600);
                      setFormData({ ...formData, paymentMethod: 'crypto' });
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      formData.paymentMethod === 'crypto'
                        ? 'border-white bg-white text-zinc-950 font-bold'
                        : 'border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    <span>Crypto / USDC</span>
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Buyer Protection</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Free 2-Day Air Shipping</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-extrabold text-sm tracking-wide shadow-lg shadow-black/40 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Confirm Order • ${colorway.price}.00</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmation View */
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: colorway.accentColor }}
            >
              <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Order Confirmed</span>
            <h2 className="text-3xl font-extrabold font-display mt-1 mb-2 text-white">
              YOU’RE SET FOR GREATNESS
            </h2>
            <p className="text-sm text-zinc-300 max-w-md mx-auto mb-6">
              Thank you, {formData.fullName}. Your pair of{' '}
              <span className="font-semibold text-white">{colorway.name}</span> (Size EU {size}) is reserved
              and preparing for dispatch.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-800/80 border border-white/10 max-w-sm mx-auto text-left mb-6 space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">Order Number:</span>
                <span className="font-mono font-bold text-white">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Delivery:</span>
                <span className="font-medium text-emerald-400">2-3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Delivery Address:</span>
                <span className="font-medium text-white truncate max-w-[180px]">{formData.address}, {formData.city}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-white text-zinc-950 font-extrabold text-sm hover:bg-zinc-200 cursor-pointer"
            >
              Back to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
