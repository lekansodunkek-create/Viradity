/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Video, FolderPlus, ArrowRight } from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (projectName: string, format: 'video' | 'shorts' | 'series') => void;
  prefillName?: string;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  prefillName = '',
}) => {
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState<'video' | 'shorts' | 'series'>('video');

  // Sync prefill title when modal is opened
  useEffect(() => {
    if (isOpen) {
      setProjectName(prefillName);
      // Auto-detect format recommendation based on keywords
      if (prefillName.toLowerCase().includes('shorts') || prefillName.toLowerCase().includes('vlog')) {
        setProjectType('shorts');
      } else {
        setProjectType('video');
      }
    }
  }, [isOpen, prefillName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      onSuccess(projectName.trim(), projectType);
      setProjectName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1A1A1A]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-[20px] bg-white border border-[#ECEEF2] p-6 shadow-[0_20px_60px_-10px_rgba(16,24,40,0.12),0_8px_24px_-4px_rgba(16,24,40,0.04)] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#ECEEF2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1A1A1A]">Create New Project</h3>
              <p className="text-xs text-[#666666]">Initialize a workspace for your next video</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[10px] text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F8F9FB] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#4B5565] mb-2">
              Project Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How AI is Transforming Video Creation in 2026"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#ECEEF2] bg-[#F8F9FB]/50 text-[#1A1A1A] text-sm placeholder:text-[#8E9299] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4B5565] mb-2">
              Format & Aspect Ratio
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'video', label: 'Long-form (16:9)', icon: Video, desc: 'YouTube Standard' },
                { id: 'shorts', label: 'Shorts (9:16)', icon: Sparkles, desc: 'Vertical Video' },
                { id: 'series', label: 'Series Bundle', icon: FolderPlus, desc: 'Multi-episode' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = projectType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id as any)}
                    className={`flex flex-col items-start p-3 rounded-[12px] border text-left transition-all ${
                      isSelected
                        ? 'border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB] shadow-[0_2px_8px_rgba(37,99,235,0.08)]'
                        : 'border-[#ECEEF2] hover:border-[#D1D8E5] bg-white text-[#4B5565]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-[#2563EB]' : 'text-[#666666]'}`} />
                    <span className="text-xs font-semibold block">{item.label}</span>
                    <span className="text-[10px] text-[#8E9299] mt-0.5">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#ECEEF2]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[12px] text-sm font-medium text-[#4B5565] hover:text-[#1A1A1A] hover:bg-[#F8F9FB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-[12px] text-sm font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_2px_12px_rgba(37,99,235,0.22)] transition-all active:scale-[0.98]"
            >
              <span>Initialize Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
