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
import { Dashboard, Project } from './components/Dashboard';
import { ProjectWizard } from './components/ProjectWizard';
import { NavTab, UserProfile } from './types';
import { 
  CheckCircle2, 
  Trash2, 
  Search, 
  Filter, 
  Video, 
  Sparkles, 
  Layers, 
  FolderOpen, 
  Sliders, 
  Volume2, 
  ShieldCheck, 
  Palette,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [activeProjectId, setActiveProjectId] = useState<string | null>('project-1');
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [prefillName, setPrefillName] = useState('');

  // Toast feedback state for interactive shell testing
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Rivera',
    email: 'alex@viradity.ai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    plan: 'Pro',
    creditsUsed: 2450,
    creditsTotal: 3000,
  });

  // Projects State - Prefilled with authentic, high-fidelity mockups
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'project-1',
      name: '10 Quantum Computing Breakthroughs in 2026',
      format: 'video',
      progress: 82,
      lastEdited: 'Edited 2 hours ago',
      duration: '08:42',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'project-2',
      name: 'Unboxing the Ultimate $10,000 Studio Setup',
      format: 'series',
      progress: 15,
      lastEdited: 'Edited Yesterday',
      duration: '3 episodes',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'project-3',
      name: 'How to Build Aesthetic High-Retention Shorts',
      format: 'shorts',
      progress: 45,
      lastEdited: 'Edited 3 days ago',
      duration: '00:58',
      thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&auto=format&fit=crop&q=80',
    },
  ]);

  // Project management views & filters
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectFilterFormat, setProjectFilterFormat] = useState<'all' | 'video' | 'shorts' | 'series'>('all');

  // Personalization settings state
  const [selectedVoice, setSelectedVoice] = useState('sophia');
  const [selectedTone, setSelectedTone] = useState('cinematic');
  const [autoCaptions, setAutoCaptions] = useState(true);
  const [brandingColor, setBrandingColor] = useState('blue');

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

  const handleOpenCreateProject = (prefilled?: string) => {
    const newName = prefilled && prefilled.trim() ? prefilled.trim() : 'Untitled';
    const newProj: Project = {
      id: `project-${Date.now()}`,
      name: newName,
      format: 'video',
      progress: 5,
      lastEdited: 'Edited just now',
      duration: '06:30',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      script: '',
      description: '',
      seoTags: [],
      videoTitle: prefilled || '',
    };
    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(newProj.id);
    setPrefillName(prefilled || '');
    setActiveTab('new_project');
  };

  const handleProjectCreated = (projectName: string, format: 'video' | 'shorts' | 'series') => {
    const formatDurations = {
      video: '06:30',
      shorts: '00:50',
      series: '4 episodes',
    };
    const formatImages = {
      video: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      shorts: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      series: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    };

    const newProj: Project = {
      id: `project-${Date.now()}`,
      name: projectName,
      format,
      progress: 8, // Initial baseline initialization progress
      lastEdited: 'Just initialized',
      duration: formatDurations[format],
      thumbnail: formatImages[format],
    };

    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(newProj.id);
    setActiveTab('dashboard');
    showToast(`Successfully initialized "${projectName}" under draft!`);
  };

  const handleProjectAutoSave = (updatedData: Partial<Project>) => {
    if (!activeProjectId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...p, ...updatedData, lastEdited: 'Edited just now' }
          : p
      )
    );
  };

  const handleProjectWizardSuccess = (data: {
    name: string;
    format: 'video' | 'shorts' | 'series';
    duration: string;
    thumbnail: string;
    script: string;
    description: string;
  }) => {
    if (activeProjectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                name: data.name || p.name,
                format: data.format,
                duration: data.duration,
                thumbnail: data.thumbnail,
                script: data.script,
                description: data.description,
                progress: Math.min(100, (p.progress || 10) + 30),
                lastEdited: 'Edited just now',
              }
            : p
        )
      );
    }
    setActiveTab('projects');
    showToast(`Project workspace "${data.name}" saved to archive!`);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeProjectId === id) {
      setActiveProjectId(null);
    }
    showToast('Project draft removed successfully.');
  };

  const handleResumeProject = (project: Project) => {
    setActiveProjectId(project.id);
    setActiveTab('new_project');
    showToast(`Opened workspace for "${project.name}"`);
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

  // Filter project drafts list
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(projectSearchQuery.toLowerCase());
    const matchesFilter = projectFilterFormat === 'all' || p.format === projectFilterFormat;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-screen bg-[#F8F9FB] text-[#1A1A1A] flex p-4 md:p-6 gap-6 font-['Inter',sans-serif] selection:bg-[#2563EB]/10 selection:text-[#2563EB] overflow-hidden items-stretch">
      {/* Custom Left Sidebar with Dynamic Active State tracking */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'new_project') {
            handleOpenCreateProject();
          } else {
            setActiveTab(tab);
            showToast(`Navigated to ${tab.charAt(0).toUpperCase() + tab.slice(1)}.`);
          }
        }}
        onOpenCreateProject={() => handleOpenCreateProject()}
        onOpenTopUp={() => setIsTopUpModalOpen(true)}
        userProfile={userProfile}
        onUserAction={handleUserAction}
      />

      {/* Main Workspace Right Area - Perfect clean container bounding individual modules */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <main className="flex-1 h-full rounded-[24px] bg-white border border-[#ECEEF2]/50 shadow-[0_8px_30px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.01)] p-6 md:p-9 transition-all duration-300 relative overflow-hidden flex flex-col">
          
          {/* Conditional page render based on active navigation tab */}
          {activeTab === 'dashboard' && (
            <Dashboard
              projects={projects}
              onContinueProject={handleResumeProject}
              onSelectTab={setActiveTab}
              onOpenCreateProject={handleOpenCreateProject}
              userName={userProfile.name}
            />
          )}

          {activeTab === 'projects' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-[#1A1A1A]">Project Archive</h1>
                  <p className="text-xs text-[#666666]">Access, filter, and organize all active rendering project timelines</p>
                </div>
                <button
                  onClick={() => handleOpenCreateProject()}
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-[10px] transition-all flex items-center gap-1.5 self-start sm:self-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Workspace</span>
                </button>
              </div>

              {/* Filters / Search Row */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9299]" />
                  <input
                    type="text"
                    placeholder="Search by workspace title..."
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    className="w-full pl-9.5 pr-4 py-2 border border-[#ECEEF2] rounded-[10px] text-xs placeholder:text-[#8E9299] focus:outline-none focus:border-[#2563EB] bg-[#F8F9FB]/40 transition-colors"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-[#F8F9FB] p-1 rounded-[10px] border border-[#ECEEF2]/40 self-start">
                  {(['all', 'video', 'shorts', 'series'] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => setProjectFilterFormat(format)}
                      className={`px-3 py-1.5 rounded-[7px] text-[11px] font-bold capitalize transition-all ${
                        projectFilterFormat === format
                          ? 'bg-white text-[#2563EB] shadow-xs'
                          : 'text-[#666666] hover:text-[#1A1A1A]'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid content */}
              <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                {filteredProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-[#F8F9FB]/30 border border-dashed border-[#ECEEF2] rounded-[16px]">
                    <FolderOpen className="w-9 h-9 text-[#8E9299] mb-3" />
                    <span className="text-sm font-semibold text-[#1A1A1A]">No matches found</span>
                    <p className="text-xs text-[#666666] mt-1">Adjust search filter criteria or initialize a new canvas</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredProjects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleResumeProject(p)}
                        className="group relative flex flex-col bg-white border border-[#ECEEF2] hover:border-[#2563EB]/40 rounded-[14px] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        {/* Aspect Ratio Box */}
                        <div className="aspect-video w-full relative bg-[#F8F9FB] overflow-hidden">
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wider">
                            {p.format}
                          </span>
                        </div>

                        {/* Text */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h3 className="font-bold text-xs text-[#1A1A1A] line-clamp-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                              {p.name}
                            </h3>
                            <span className="text-[10px] text-[#8E9299] font-semibold mt-1 block">
                              Duration: {p.duration}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#ECEEF2]/40">
                            <span className="text-[10px] text-[#666666] font-medium">{p.lastEdited}</span>
                            <button
                              onClick={(e) => handleDeleteProject(p.id, e)}
                              className="p-1.5 text-[#8E9299] hover:text-rose-600 hover:bg-rose-50 rounded-[7px] transition-all"
                              title="Delete Draft"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'personalization' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-7 overflow-y-auto pr-1">
              {/* Header */}
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#1A1A1A]">AI Brand Personalization</h1>
                <p className="text-xs text-[#666666]">Configure default creator aesthetics, narrator voice profiles, and automatic tone models</p>
              </div>

              {/* Card Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Palette */}
                <div className="bg-[#F8F9FB]/50 border border-[#ECEEF2] rounded-[16px] p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#2563EB]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Brand Theme & Colors</h3>
                  </div>
                  <p className="text-xs text-[#666666]">Set the default visual primary color to be applied across subtitle cards and video canvas</p>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[
                      { id: 'blue', color: 'bg-blue-600', label: 'Indigo Blue' },
                      { id: 'orange', color: 'bg-orange-600', label: 'Sunset Orange' },
                      { id: 'teal', color: 'bg-teal-600', label: 'Cyber Teal' },
                      { id: 'violet', color: 'bg-violet-600', label: 'Deep Violet' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setBrandingColor(item.id);
                          showToast(`Branding palette changed to ${item.label}`);
                        }}
                        className={`flex flex-col items-center p-3 rounded-[10px] border transition-all ${
                          brandingColor === item.id
                            ? 'border-[#2563EB] bg-white text-[#2563EB] font-semibold'
                            : 'border-[#ECEEF2] bg-white text-[#4B5565] hover:border-gray-300'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full ${item.color} mb-1.5`} />
                        <span className="text-[10px] text-center tracking-tight leading-none">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audio Voices */}
                <div className="bg-[#F8F9FB]/50 border border-[#ECEEF2] rounded-[16px] p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#2563EB]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">AI Narrator Voice</h3>
                  </div>
                  <p className="text-xs text-[#666666]">Select the primary voice identity for text-to-speech generation</p>
                  <div className="space-y-2">
                    {[
                      { id: 'sophia', name: 'Sophia (Cinematic Narrator)', desc: 'Warm, highly expressive, slow cadence ideal for travel and vlogs.' },
                      { id: 'alex', name: 'Alex (Confident Editorial)', desc: 'Clear, concise, professional tempo ideal for technical explainers.' },
                      { id: 'marcus', name: 'Marcus (High Energy Host)', desc: 'Bold, punchy, hyper-engaging style tuned for short-form retention.' },
                    ].map((voice) => (
                      <button
                        key={voice.id}
                        onClick={() => {
                          setSelectedVoice(voice.id);
                          showToast(`Default voice selected: ${voice.name}`);
                        }}
                        className={`w-full flex items-start gap-3 p-3 rounded-[10px] border text-left transition-all ${
                          selectedVoice === voice.id
                            ? 'border-[#2563EB] bg-white text-[#2563EB] shadow-xs'
                            : 'border-[#ECEEF2] bg-white text-[#4B5565] hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-4 flex-shrink-0 mt-0.5 ${
                          selectedVoice === voice.id ? 'border-[#2563EB]' : 'border-gray-300'
                        }`} />
                        <div>
                          <span className="text-xs font-bold block text-[#1A1A1A]">{voice.name}</span>
                          <span className="text-[10px] text-[#666666] leading-normal block mt-0.5">{voice.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Narrative Tone Styles */}
                <div className="bg-[#F8F9FB]/50 border border-[#ECEEF2] rounded-[16px] p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#2563EB]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Narrative Script Tone</h3>
                  </div>
                  <p className="text-xs text-[#666666]">Customize the automatic scripting tone model when converting prompts to screenplays</p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'educational', label: 'Informative' },
                      { id: 'cinematic', label: 'Cinematic' },
                      { id: 'hype', label: 'Viral Hype' },
                    ].map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => {
                          setSelectedTone(tone.id);
                          showToast(`Script tone changed to ${tone.label}`);
                        }}
                        className={`py-2 rounded-[10px] border text-center text-xs font-semibold transition-all ${
                          selectedTone === tone.id
                            ? 'border-[#2563EB] bg-white text-[#2563EB]'
                            : 'border-[#ECEEF2] bg-white text-[#4B5565] hover:border-gray-300'
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Automation Rules */}
                <div className="bg-[#F8F9FB]/50 border border-[#ECEEF2] rounded-[16px] p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Generation Settings</h3>
                  </div>
                  <p className="text-xs text-[#666666]">Enable automatic systems and visual overlays during generation</p>
                  <div className="space-y-3.5">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-xs font-bold text-[#1A1A1A] block">Auto-Generate Captions</span>
                        <span className="text-[10px] text-[#666666]">Burn stylized subtitles into the video output</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoCaptions}
                        onChange={(e) => {
                          setAutoCaptions(e.target.checked);
                          showToast(e.target.checked ? 'Automatic subtitles enabled.' : 'Subtitles disabled.');
                        }}
                        className="w-4 h-4 rounded text-[#2563EB] border-[#ECEEF2] focus:ring-[#2563EB]/10 cursor-pointer"
                      />
                    </label>

                    <div className="pt-2 border-t border-[#ECEEF2]/60 flex items-center justify-between text-[11px] text-[#666666]">
                      <span>Model Weighting Preset</span>
                      <span className="font-semibold text-[#1A1A1A] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">Viradity AI-v2.6 Ultra</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'new_project' && (
            <ProjectWizard
              project={projects.find((p) => p.id === activeProjectId)}
              onAutoSave={handleProjectAutoSave}
              onSuccess={handleProjectWizardSuccess}
              onCancel={() => {
                setActiveTab('dashboard');
                showToast('Returned to dashboard.');
              }}
              prefillName={prefillName}
            />
          )}

        </main>
      </div>

      {/* Modals for Shell Interactions */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleProjectCreated}
        prefillName={prefillName}
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
