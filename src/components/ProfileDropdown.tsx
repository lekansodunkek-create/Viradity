/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { User, Settings, HelpCircle, LogOut, Check, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onAction: (action: string) => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  userProfile,
  onAction,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
  ];

  return (
    <div
      ref={dropdownRef}
      className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-50 w-full rounded-[14px] bg-white border border-[#ECEEF2] p-1.5 shadow-[0_16px_40px_-6px_rgba(16,24,40,0.1),0_4px_12px_-2px_rgba(16,24,40,0.04)] animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Profile summary inside dropdown */}
      <div className="px-2.5 py-2 mb-1 border-b border-[#ECEEF2]">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-[#1A1A1A] truncate">{userProfile.name}</p>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[10px] font-semibold text-[#2563EB]">
            <Sparkles className="w-2.5 h-2.5" />
            {userProfile.plan}
          </span>
        </div>
        <p className="text-[11px] text-[#666666] truncate mt-0.5">{userProfile.email}</p>
      </div>

      {/* Navigation list */}
      <div className="space-y-0.5 py-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onAction(item.id);
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-xs font-medium text-[#4B5565] hover:text-[#1A1A1A] hover:bg-[#F8F9FB] transition-colors text-left"
            >
              <Icon className="w-4 h-4 text-[#8E9299]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-1 border-t border-[#ECEEF2]" />

      {/* Logout button */}
      <button
        onClick={() => {
          onAction('logout');
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-xs font-medium text-[#EF4444] hover:bg-[#FEF2F2] transition-colors text-left"
      >
        <LogOut className="w-4 h-4 text-[#EF4444]" />
        <span>Logout</span>
      </button>
    </div>
  );
};
