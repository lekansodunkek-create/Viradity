/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Bell, Command, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onOpenSearch }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Creator Dashboard';
      case 'projects':
        return 'Active Projects';
      case 'personalization':
        return 'Personalization & AI Voices';
      default:
        return 'Workspace';
    }
  };

  return (
    <header className="flex items-center justify-between h-12 px-1 mb-6 select-none flex-shrink-0">
      {/* Left: Minimalist Breadcrumb / Title */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#8E9299]">Workspace</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#8E9299]" />
        <span className="font-medium text-[#1A1A1A]">{getTitle()}</span>
      </div>

      {/* Right: Search, Status & Notifications */}
      <div className="flex items-center gap-3">
        {/* Search trigger bar */}
        <button
          onClick={onOpenSearch}
          className="flex items-center justify-between gap-6 px-3.5 py-2 rounded-[10px] bg-white border border-[#ECEEF2] text-xs text-[#666666] hover:border-[#D1D8E5] hover:text-[#1A1A1A] shadow-[0_1px_2px_rgba(16,24,40,0.02)] transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#8E9299] group-hover:text-[#2563EB] transition-colors" />
            <span>Search projects or scripts...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-[#F8F9FB] text-[#666666] rounded border border-[#ECEEF2]">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </kbd>
        </button>

        {/* AI Engine Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-white border border-[#ECEEF2] text-[12px] font-medium text-[#4B5565] shadow-[0_1px_2px_rgba(16,24,40,0.02)]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>AI Core Ready</span>
        </div>

        {/* Notifications Button (40x40 per Sleek Interface spec) */}
        <button
          onClick={() => {}}
          className="w-10 h-10 rounded-[10px] bg-white border border-[#ECEEF2] text-[#666666] hover:text-[#1A1A1A] hover:border-[#D1D8E5] flex items-center justify-center relative transition-all shadow-[0_1px_2px_rgba(16,24,40,0.02)]"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#2563EB] ring-2 ring-white" />
        </button>

        {/* Help button (40x40 per Sleek Interface spec) */}
        <button
          onClick={() => {}}
          className="w-10 h-10 rounded-[10px] bg-white border border-[#ECEEF2] text-[#666666] hover:text-[#1A1A1A] hover:border-[#D1D8E5] flex items-center justify-center transition-all shadow-[0_1px_2px_rgba(16,24,40,0.02)]"
          title="Quick Help & Docs"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
