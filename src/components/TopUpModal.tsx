/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Zap, Check, ShieldCheck, CreditCard } from 'lucide-react';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPack: (credits: number) => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose, onSelectPack }) => {
  if (!isOpen) return null;

  const creditPacks = [
    { credits: 1000, price: '$15', popular: false, desc: 'Ideal for 5 standard video renders' },
    { credits: 3000, price: '$39', popular: true, desc: 'Ideal for consistent weekly uploads' },
    { credits: 10000, price: '$99', popular: false, desc: 'Enterprise volume with AI voice cloning' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1A1A1A]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-[20px] bg-white border border-[#ECEEF2] p-6 shadow-[0_20px_60px_-10px_rgba(16,24,40,0.12),0_8px_24px_-4px_rgba(16,24,40,0.04)] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#ECEEF2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1A1A1A]">Top Up Workspace Credits</h3>
              <p className="text-xs text-[#666666]">Add compute credits for AI scripting, rendering & voiceovers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[10px] text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F8F9FB] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3.5">
          {creditPacks.map((pack) => (
            <div
              key={pack.credits}
              className={`relative flex flex-col justify-between p-4 rounded-[16px] border transition-all ${
                pack.popular
                  ? 'border-[#2563EB] bg-[#2563EB]/[0.02] shadow-[0_4px_20px_rgba(37,99,235,0.08)]'
                  : 'border-[#ECEEF2] hover:border-[#D1D8E5] bg-white'
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#2563EB] text-[10px] font-semibold text-white tracking-wide uppercase shadow-[0_2px_8px_rgba(37,99,235,0.25)]">
                  Most Popular
                </span>
              )}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-bold text-[#1A1A1A]">
                    {pack.credits.toLocaleString()} CR
                  </span>
                  <span className="text-xs font-semibold text-[#2563EB]">{pack.price}</span>
                </div>
                <p className="text-[11px] text-[#666666] leading-relaxed mt-1">{pack.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectPack(pack.credits);
                  onClose();
                }}
                className={`mt-4 w-full py-2 px-3 rounded-[10px] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  pack.popular
                    ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_2px_8px_rgba(37,99,235,0.2)]'
                    : 'bg-[#F8F9FB] hover:bg-[#ECEEF2] text-[#1A1A1A]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Select Pack</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-[#ECEEF2] flex items-center justify-between text-xs text-[#666666]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <span>Instant allocation • No recurring subscription required</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-[#4B5565] hover:text-[#1A1A1A] underline underline-offset-2"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
