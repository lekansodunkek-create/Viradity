/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Folder,
  Sliders,
  Gift,
  ChevronUp,
  Plus,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { NavTab, UserProfile } from '../types';
import { ProfileDropdown } from './ProfileDropdown';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenCreateProject: () => void;
  onOpenTopUp: () => void;
  userProfile: UserProfile;
  onUserAction: (action: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenCreateProject,
  onOpenTopUp,
  userProfile,
  onUserAction,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'new_project' as NavTab, label: 'New Project', icon: Plus },
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects' as NavTab, label: 'Projects', icon: Folder },
    { id: 'personalization' as NavTab, label: 'Personalization', icon: Sliders },
  ];

  const creditPercentage = Math.min(
    100,
    Math.round((userProfile.creditsUsed / userProfile.creditsTotal) * 100)
  );

  const renderLogoSvg = (extraClass = "w-9 h-9") => (
    <svg
      viewBox="0 0 120 100"
      className={`${extraClass} flex-shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      title="Viradity Workspace"
    >
      <defs>
        <linearGradient id="viradity-left-leg" x1="15" y1="10" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="viradity-right-play" x1="50" y1="40" x2="100" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="viradity-bars" x1="60" y1="10" x2="90" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Left Slanted Leg (V-left) */}
      <path
        d="M18 16C15.5 16 13 18.5 13 21.5C13 22.5 13.5 23.5 14 24.5L42 79.5C45.5 86.5 54.5 88 59 82.5L61.5 79C64 76 63 71.5 59.5 69.5L25.5 19.5C24.5 18 22.5 16 18 16Z"
        fill="url(#viradity-left-leg)"
      />

      {/* Right Fold / Play Button (V-right/Play) */}
      <path
        d="M52.5 44C51 44 50 45 50 46.5V82.5C50 86 53.5 88 56.5 86L91.5 65.5C94.5 63.5 94.5 59 91.5 57L61.5 45C59 44 55.5 44 52.5 44Z"
        fill="url(#viradity-right-play)"
      />

      {/* Three rounded vertical bars */}
      <rect x="58" y="26" width="7" height="18" rx="3.5" fill="url(#viradity-bars)" />
      <rect x="69" y="18" width="7" height="26" rx="3.5" fill="url(#viradity-bars)" />
      <rect x="80" y="10" width="7" height="34" rx="3.5" fill="url(#viradity-bars)" />
    </svg>
  );

  return (
    <aside
      className={`relative flex flex-col justify-between h-full flex-shrink-0 rounded-[24px] bg-white/75 backdrop-blur-sm border border-[#ECEEF2]/50 shadow-[0_8px_30px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.01)] transition-all duration-300 select-none z-30 ${
        isCollapsed ? 'w-[72px] p-3 items-center' : 'w-[260px] p-5'
      }`}
    >
      {/* Top Header */}
      {!isCollapsed ? (
        <div className="flex items-center justify-between mb-6 gap-2 w-full">
          <div className="flex items-center gap-2.5 min-w-0">
            {renderLogoSvg("w-9 h-9")}
            <span className="text-[18px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-none truncate">
              Viradity
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            title="Collapse sidebar workspace"
            aria-label="Collapse sidebar workspace"
            className="p-1.5 rounded-[10px] text-[#8E9299] hover:text-[#1A1A1A] hover:bg-white border border-transparent hover:border-[#ECEEF2] shadow-none hover:shadow-xs transition-all flex-shrink-0 flex items-center justify-center cursor-pointer group"
          >
            <PanelLeftClose className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-0.5" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-6 w-full">
          {/* Collapsed Logo container: Shows Viradity logo, user hovers over logo to reveal uncollapse button */}
          <button
            onClick={() => setIsCollapsed(false)}
            className="relative group w-11 h-11 flex items-center justify-center rounded-[14px] bg-white/60 hover:bg-white border border-[#ECEEF2]/70 shadow-xs hover:shadow-md transition-all cursor-pointer"
            aria-label="Expand sidebar"
          >
            {/* Viradity Logo - continuous display, softens on hover */}
            <div className="transition-all duration-200 group-hover:opacity-15 group-hover:scale-90">
              {renderLogoSvg("w-7.5 h-7.5")}
            </div>

            {/* Uncollapse action button - appears seamlessly when hovering over logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100 text-[#2563EB]">
              <PanelLeftOpen className="w-5 h-5 text-[#2563EB]" />
            </div>
          </button>
        </div>
      )}

      {/* Main Scrollable Navigation List */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto space-y-1.5 scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200/80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isNewProject = item.id === 'new_project';
          
          if (isCollapsed) {
            return (
              <div key={item.id} className="relative group flex justify-center">
                <button
                  onClick={() => {
                    if (isNewProject) {
                      onOpenCreateProject();
                    } else {
                      onSelectTab(item.id);
                    }
                  }}
                  title={item.label}
                  aria-label={item.label}
                  className={`w-11 h-11 flex items-center justify-center rounded-[12px] transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#2563EB] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#ECEEF2]'
                      : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-white/70 border border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#2563EB]' : 'text-[#666666] group-hover:text-[#1A1A1A]'
                    }`}
                  />
                </button>
                {/* Floating Tooltip in Collapsed State */}
                <div className="absolute left-full ml-3 hidden group-hover:flex items-center px-2.5 py-1.5 rounded-lg bg-[#1A1A1A] text-white text-xs font-medium whitespace-nowrap shadow-xl z-50 pointer-events-none animate-in fade-in slide-in-from-left-1 duration-150">
                  <span>{item.label}</span>
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#1A1A1A]" />
                </div>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                if (isNewProject) {
                  onOpenCreateProject();
                } else {
                  onSelectTab(item.id);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-white text-[#2563EB] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#ECEEF2]/60'
                  : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-white/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 transition-colors flex-shrink-0 ${
                    isActive
                      ? 'text-[#2563EB]'
                      : 'text-[#666666] group-hover:text-[#1A1A1A]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Fixed Area */}
      <div className={`flex-shrink-0 w-full border-t border-[#ECEEF2]/40 ${isCollapsed ? 'pt-4 mt-4 space-y-3 flex flex-col items-center' : 'pt-6 mt-6 space-y-6'}`}>
        {!isCollapsed ? (
          <>
            {/* Account Tools */}
            <div className="space-y-2.5">
              {/* Credits Box */}
              <div className="p-3 rounded-[12px] bg-white/40 border border-[#ECEEF2]/40 shadow-[0_2px_12px_rgba(0,0,0,0.01)] transition-all hover:bg-white/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#8E9299]">
                    Credits
                  </span>
                  <button
                    onClick={onOpenTopUp}
                    className="text-[11px] font-semibold text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Top Up
                  </button>
                </div>
                <div className="w-full h-[5px] bg-[#ECEEF2]/60 rounded-[3px] overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-[3px] transition-all duration-500"
                    style={{ width: `${creditPercentage}%` }}
                  />
                </div>
                <div className="mt-2 text-[11px] font-medium text-[#666666] flex justify-between">
                  <span>{userProfile.creditsUsed.toLocaleString()} used</span>
                  <span className="font-semibold text-[#1A1A1A]">{userProfile.creditsTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Join Affiliate Program */}
              <button
                onClick={() => onUserAction('affiliate')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-[12px] text-sm font-medium text-[#666666] hover:text-[#1A1A1A] hover:bg-white/60 transition-all duration-200 group"
              >
                <Gift className="w-4 h-4 text-[#666666] group-hover:text-[#2563EB] transition-colors flex-shrink-0" />
                <span className="truncate">Join Affiliate Program</span>
              </button>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className={`w-full flex items-center justify-between p-2 rounded-[14px] transition-all duration-200 border border-transparent ${
                  isProfileDropdownOpen ? 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] border-[#ECEEF2]/60' : 'hover:bg-white/60 hover:border-[#ECEEF2]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-9 h-9 rounded-full object-cover bg-[#E2E8F0] border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0 text-left">
                    <span className="text-sm font-semibold text-[#1A1A1A] truncate leading-tight">
                      {userProfile.name}
                    </span>
                  </div>
                </div>
                <ChevronUp
                  className={`w-4 h-4 text-[#8E9299] transition-transform duration-200 flex-shrink-0 ${
                    isProfileDropdownOpen ? 'rotate-180 text-[#1A1A1A]' : ''
                  }`}
                />
              </button>

              <ProfileDropdown
                isOpen={isProfileDropdownOpen}
                onClose={() => setIsProfileDropdownOpen(false)}
                userProfile={userProfile}
                onAction={onUserAction}
              />
            </div>
          </>
        ) : (
          <>
            {/* Collapsed Account Tools */}
            <div className="relative group flex justify-center">
              <button
                onClick={onOpenTopUp}
                title={`Credits: ${userProfile.creditsUsed.toLocaleString()} / ${userProfile.creditsTotal.toLocaleString()} (Click to Top Up)`}
                aria-label="Top Up Credits"
                className="w-11 h-11 flex items-center justify-center rounded-[12px] bg-white/60 hover:bg-white border border-[#ECEEF2] text-[#2563EB] shadow-xs hover:shadow-md transition-all"
              >
                <Zap className="w-5 h-5 fill-[#2563EB]/10" />
              </button>
              <div className="absolute left-full ml-3 hidden group-hover:flex items-center px-2.5 py-1.5 rounded-lg bg-[#1A1A1A] text-white text-xs font-medium whitespace-nowrap shadow-xl z-50 pointer-events-none animate-in fade-in slide-in-from-left-1 duration-150">
                <span>Credits: {userProfile.creditsUsed.toLocaleString()} / {userProfile.creditsTotal.toLocaleString()}</span>
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#1A1A1A]" />
              </div>
            </div>

            <div className="relative group flex justify-center">
              <button
                onClick={() => onUserAction('affiliate')}
                title="Join Affiliate Program"
                aria-label="Join Affiliate Program"
                className="w-11 h-11 flex items-center justify-center rounded-[12px] text-[#666666] hover:text-[#2563EB] hover:bg-white/70 border border-transparent hover:border-[#ECEEF2] transition-all"
              >
                <Gift className="w-5 h-5" />
              </button>
              <div className="absolute left-full ml-3 hidden group-hover:flex items-center px-2.5 py-1.5 rounded-lg bg-[#1A1A1A] text-white text-xs font-medium whitespace-nowrap shadow-xl z-50 pointer-events-none animate-in fade-in slide-in-from-left-1 duration-150">
                <span>Affiliate Program</span>
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#1A1A1A]" />
              </div>
            </div>

            {/* Collapsed User Profile */}
            <div className="relative w-full flex justify-center">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                title={userProfile.name}
                aria-label={userProfile.name}
                className={`w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-200 border border-transparent ${
                  isProfileDropdownOpen ? 'bg-white shadow-md border-[#ECEEF2]' : 'hover:bg-white/60'
                }`}
              >
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-9 h-9 rounded-full object-cover bg-[#E2E8F0] border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] flex-shrink-0"
                />
              </button>

              <ProfileDropdown
                isOpen={isProfileDropdownOpen}
                onClose={() => setIsProfileDropdownOpen(false)}
                userProfile={userProfile}
                onAction={onUserAction}
              />
            </div>
          </>
        )}
      </div>
    </aside>
  );
};


