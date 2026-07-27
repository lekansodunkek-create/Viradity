/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Crown, Check, Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  const features = [
    'Unlimited 4K Video Exports & Rendering',
    'Advanced AI Script to Video with 50+ Custom Voices',
    'Real-time YouTube Thumbnail AB Testing Engine',
    'Competitor Channel Analytics & Viral Hook Detection',
    'Dedicated GPU Priority Queue & 10,000 Monthly Credits',
    '24/7 Priority Creator Support & Workspace Team Seats',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1A1A]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-[20px] bg-white border border-[#ECEEF2] p-6 shadow-[0_20px_60px_-10px_rgba(16,24,40,0.15),0_8px_24px_-4px_rgba(16,24,40,0.05)] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#ECEEF2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1A1A1A]">Viradity Pro Creator Plan</h3>
              <p className="text-xs text-[#666666]">Unlock the complete AI video production suite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[10px] text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F8F9FB] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 bg-[#F8F9FB] rounded-[16px] p-4 border border-[#ECEEF2] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#666666] uppercase tracking-wider block mb-0.5">
              Creator Pro Plan
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1A1A1A]">$49</span>
              <span className="text-xs font-medium text-[#666666]">/ month (billed annually)</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-[11px] font-semibold">
              Save 20% Today
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          <p className="text-xs font-semibold text-[#1A1A1A] mb-3">Included with Viradity Pro:</p>
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4B5565]">
              <div className="w-4 h-4 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] flex-shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#ECEEF2] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-[12px] text-xs font-medium text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F8F9FB] transition-colors"
          >
            Maybe Later
          </button>
          <button
            type="button"
            onClick={() => {
              onUpgrade();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition-all active:scale-[0.98]"
          >
            <span>Upgrade Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
