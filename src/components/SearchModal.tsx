/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, X, FolderKanban, Sparkles, ArrowUpRight, Video } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: (title: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // controlled externally usually, but handle escape here
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: '10 AI Script Templates for Tech Reviews', type: 'Script', icon: Video, time: '2 hrs ago' },
    { title: 'Cyberpunk Neon Aesthetic & Voice Settings', type: 'Style Brand', icon: Sparkles, time: 'Yesterday' },
    { title: 'Q3 Channel Growth Strategy & Thumbnail AB Tests', type: 'Project', icon: FolderKanban, time: '3 days ago' },
  ];

  const filteredLinks = query.trim()
    ? quickLinks.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    : quickLinks;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1A1A]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Box */}
      <div className="relative w-full max-w-xl rounded-[20px] bg-white border border-[#ECEEF2] shadow-[0_20px_60px_-10px_rgba(16,24,40,0.15),0_8px_24px_-4px_rgba(16,24,40,0.05)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-[#ECEEF2]">
          <Search className="w-4 h-4 text-[#8E9299] mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search projects, AI voice styles, scripts, or commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#8E9299] focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-[8px] text-[#8E9299] hover:text-[#1A1A1A] hover:bg-[#F8F9FB] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 max-h-[340px] overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8E9299] uppercase tracking-wider">
            {query.trim() ? 'Search Results' : 'Recent Workspaces'}
          </div>

          <div className="space-y-1 mt-1">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onSelectResult) onSelectResult(item.title);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-[12px] hover:bg-[#F8F9FB] transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-[10px] bg-[#F0F3F8] flex items-center justify-center text-[#666666] group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#1A1A1A] truncate group-hover:text-[#2563EB] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[#666666] mt-0.5">
                          {item.type} • Last modified {item.time}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8E9299] opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 mr-1" />
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-[#666666]">
                No projects or scripts found matching "{query}".
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-2 bg-[#F8F9FB] border-t border-[#ECEEF2] flex items-center justify-between text-[11px] text-[#666666]">
          <span>Press <kbd className="font-semibold text-[#1A1A1A]">ESC</kbd> to close</span>
          <span>Viradity Search Engine</span>
        </div>
      </div>
    </div>
  );
};
