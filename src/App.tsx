/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CreateProjectModal } from './components/CreateProjectModal';
import { TopUpModal } from './components/TopUpModal';
import { ProModal } from './components/ProModal';
import { SearchModal } from './components/SearchModal';
import { NavTab, UserProfile } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Toast feedback state for interactive shell testing
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Rivera',
    email: 'alex@viradity.ai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    plan: 'Pro',
    creditsUsed: 2450,
    creditsTotal: 3000,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleUserAction = (action: string) => {
    if (action === 'upgrade_pro') {
      setIsProModalOpen(true);
    } else if (action === 'affiliate') {
      showToast('Affiliate referral link copied to clipboard.');
    } else if (action === 'profile') {
      showToast('Profile settings profile view active.');
    } else if (action === 'settings') {
      showToast('Workspace settings configuration opened.');
    } else if (action === 'help') {
      showToast('Opening Viradity Creator Documentation & Guides...');
    } else if (action === 'logout') {
      showToast('Session ended safely. Re-authenticating...');
    }
  };

  const handleProjectCreated = (projectName: string) => {
    showToast(`Workspace initialized: "${projectName}"`);
  };

  const handleCreditsTopUp = (addedCredits: number) => {
    setUserProfile((prev) => ({
      ...prev,
      creditsTotal: prev.creditsTotal + addedCredits,
    }));
    showToast(`Successfully added ${addedCredits.toLocaleString()} compute credits!`);
  };

  const handleUpgradeSuccess = () => {
    setUserProfile((prev) => ({
      ...prev,
      plan: 'Enterprise',
      creditsTotal: prev.creditsTotal + 10000,
    }));
    showToast('Welcome to Viradity Pro! All AI video production engines unlocked.');
  };

  return (
    <div className="h-screen bg-[#F8F9FB] text-[#1A1A1A] flex p-4 md:p-6 gap-6 font-['Inter',sans-serif] selection:bg-[#2563EB]/10 selection:text-[#2563EB] overflow-hidden items-stretch">
      {/* Custom Left Sidebar with Subtle Premium Glassmorphism */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'new_project') {
            setIsCreateModalOpen(true);
          } else {
            setActiveTab(tab);
            showToast(`Navigated to ${tab.charAt(0).toUpperCase() + tab.slice(1)} view.`);
          }
        }}
        onOpenCreateProject={() => setIsCreateModalOpen(true)}
        onOpenTopUp={() => setIsTopUpModalOpen(true)}
        userProfile={userProfile}
        onUserAction={handleUserAction}
      />

      {/* Main Workspace Right Area - Pristine clean white canvas aligned perfectly with sidebar */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* 
          Pristine White Main Workspace.
          INTENTIONALLY BLANK: Only the sidebar is displayed on the left, leaving the entire right
          side as a clean, uninterrupted pure white surface aligned at the exact same height.
        */}
        <main className="flex-1 h-full rounded-[24px] bg-white border border-[#ECEEF2]/50 shadow-[0_8px_30px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.01)] p-8 md:p-12 transition-all duration-300 relative overflow-hidden flex flex-col">
          {/* Clean white empty canvas */}
        </main>
      </div>

      {/* Modals for Shell Interactions */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleProjectCreated}
      />

      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onSelectPack={handleCreditsTopUp}
      />

      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onUpgrade={handleUpgradeSuccess}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectResult={(title) => showToast(`Selected project: "${title}"`)}
      />

      {/* Understated Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[#1A1A1A] text-white text-xs font-medium shadow-[0_12px_36px_rgba(0,0,0,0.22)] border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
