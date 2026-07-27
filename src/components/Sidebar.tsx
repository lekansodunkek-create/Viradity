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

  return (
    <aside
      className="relative flex flex-col justify-between h-full w-[260px] flex-shrink-0 rounded-[24px] bg-white/75 backdrop-blur-sm border border-[#ECEEF2]/50 shadow-[0_8px_30px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.01)] p-5 transition-all duration-300 select-none z-30"
    >
      {/* Top Header: Logo */}
      <div className="flex items-center gap-2.5 mb-6">
        <div
          className="w-8 h-8 rounded-[10px] bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_10px_rgba(37,99,235,0.25)] flex-shrink-0"
          title="Viradity Workspace"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
        <span className="text-[18px] font-bold text-[#1A1A1A] tracking-[-0.02em] leading-none">
          Viradity
        </span>
      </div>

      {/* Main Scrollable Navigation List - Only the dynamic items scroll */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-0.5 space-y-1 scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200/80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isNewProject = item.id === 'new_project';
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
                    isActive || isNewProject
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

      {/* Bottom Fixed Area - Stationary, sits entirely outside overflow container so user dropdown is never clipped */}
      <div className="flex-shrink-0 pt-6 mt-6 border-t border-[#ECEEF2]/40 space-y-6">
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
      </div>
    </aside>
  );
};

