/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Type, 
  FileText, 
  Image as ImageIcon, 
  Tag, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Play, 
  RefreshCw,
  AlertCircle,
  Video,
  Upload,
  Info,
  BadgeAlert,
  Flame,
  ArrowRight
} from 'lucide-react';

interface ProjectWizardProps {
  onSuccess: (projectData: {
    name: string;
    format: 'video' | 'shorts' | 'series';
    duration: string;
    thumbnail: string;
    script: string;
    description: string;
  }) => void;
  onCancel: () => void;
  prefillName?: string;
}

type WizardStep = 'title' | 'script' | 'thumbnail' | 'description';

export const ProjectWizard: React.FC<ProjectWizardProps> = ({
  onSuccess,
  onCancel,
  prefillName = '',
}) => {
  // Wizard steps tracking
  const [activeStep, setActiveStep] = useState<WizardStep>('title');
  
  // Project properties
  const [title, setTitle] = useState(prefillName);
  const [format, setFormat] = useState<'video' | 'shorts' | 'series'>('video');
  const [script, setScript] = useState('');
  const [description, setDescription] = useState('');
  const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80');
  const [customThumbnailPrompt, setCustomThumbnailPrompt] = useState('');

  // Interactive UI Simulation states
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [seoTags, setSeoTags] = useState<string[]>([]);
  const [customThumbnailPreview, setCustomThumbnailPreview] = useState<string | null>(null);

  // Suggested titles database based on format
  const titleSuggestions = {
    video: [
      "The Hidden Mechanics of Smart AI Agents",
      "Why 99% of Video Editors Fail Retention Audits",
      "Building a Seven-Figure Micro-SaaS Solo in 2026",
      "Inside the $10,000 Workspace: My Modular Setup"
    ],
    shorts: [
      "This micro-habit is a productivity CHEAT CODE 🤫",
      "Stop editing your vlogs like this... ❌",
      "How billionaires structure their first 3 hours",
      "The 3-second hook that triples your retention"
    ],
    series: [
      "The Full-Stack Video Creator Playbook: Complete Course",
      "Quantum Physics Explained to Five-Year-Olds",
      "Sprinting to $10k/mo: Step-by-Step Series",
      "Building Viradity: Zero to Series A"
    ]
  };

  const sampleScripts = {
    video: `[00:00 - Cinematic Opener]\n(Visual: Fast panning shot over dark modern desk setup. Neon glowing lights rise as camera dollies forward.)\n\nNARRATOR: "You've probably heard that AI is replacing creators. But the truth? It's actually supercharging the ones who know how to build workflow engines..."\n\n[00:15 - Core Problem]\n(Visual: Text overlay animations showing '99% of creators stagnate'. Contrast goes high.)\n\nNARRATOR: "Most editors spend 14 hours manual-cutting sequences. By the end of this video, you'll know how to automate 90% of it without losing your unique voice..."`,
    
    shorts: `[00:00 - The Hook]\n(Visual: Split screen with extreme macro of clicking keyboard and neon countdown graphics.)\n\nNARRATOR: "Stop wasting 10 hours editing Shorts. If you aren't using this modular framework, your retention is sinking..."\n\n[00:15 - Practical Steps]\n(Visual: Green checkmark over a timeline showing clean spacing and typography.)\n\nNARRATOR: "Step 1: Frame-cut every silent gap. Step 2: Set tracking typography with zero margins. Try it on your next draft!"`,
    
    series: `[Episode 1: The Blueprint]\n(Visual: Studio background with clean white editorial grids.)\n\nNARRATOR: "Welcome to Part 1 of the Creator Engine Blueprint. Over the next four episodes, we are dismantling every system holding your workspace back..."`
  };

  const sampleDescriptions = {
    video: "Learn the exact step-by-step modular editing blueprint used to scale high-retention video channels in 2026. We break down the cognitive design of viewer retention, typography frameworks, and automatic audio mastering tools.\n\nTimestamps:\n0:00 - The Retention Myth\n2:15 - Setting Up Your Asset Rails\n5:40 - The Typography Standard\n7:12 - Automated Render Workflows",
    shorts: "Ditch the tedious cutting. Here is the modular frame blueprint designed to skyrocket vertical video retention instantly. Subscribe for daily growth tips and advanced creator workflows. #videoediting #editingtricks #creatorgrowth #viradity",
    series: "Episode Series: The Full-Stack Video Creator Playbook. We break down production pipelines, design languages, distribution mechanics, and retention math. Subscribe to access the entire multi-part curriculum."
  };

  // Preset thumbnails database
  const presetThumbnails = [
    { name: 'Abstract Cyber', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80' },
    { name: 'Ultimate Setup', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80' },
    { name: 'Minimalist Workspace', url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&auto=format&fit=crop&q=80' },
    { name: 'Aesthetic Coastal', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80' },
    { name: 'Analytical Charts', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80' }
  ];

  // Actions
  const handleGenerateTitles = () => {
    setIsGeneratingTitle(true);
    setSuggestedTitles([]);
    setTimeout(() => {
      setSuggestedTitles(titleSuggestions[format]);
      setIsGeneratingTitle(false);
    }, 1200);
  };

  const handleGenerateScript = () => {
    if (!title) {
      alert("Please specify a project title first before generating the screenplay.");
      return;
    }
    setIsGeneratingScript(true);
    setScript('');
    setTimeout(() => {
      const generated = `[Project Title: ${title}]\n[Format: ${format.toUpperCase()}]\n\n` + sampleScripts[format];
      setScript(generated);
      setIsGeneratingScript(false);
    }, 1500);
  };

  const handleGenerateThumbnail = () => {
    if (!customThumbnailPrompt.trim()) {
      alert("Please describe the thumbnail composition you want to generate.");
      return;
    }
    setIsGeneratingThumbnail(true);
    setTimeout(() => {
      // Pick a random beautiful image based on keyword searches, or use fallback
      const keywords = customThumbnailPrompt.toLowerCase();
      let selectedUrl = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80'; // tech fallback
      if (keywords.includes('nature') || keywords.includes('beach') || keywords.includes('sea')) {
        selectedUrl = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80';
      } else if (keywords.includes('setup') || keywords.includes('room') || keywords.includes('desk')) {
        selectedUrl = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
      } else if (keywords.includes('money') || keywords.includes('crypto') || keywords.includes('chart')) {
        selectedUrl = 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80';
      } else if (keywords.includes('abstract') || keywords.includes('art') || keywords.includes('color')) {
        selectedUrl = 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80';
      }
      setCustomThumbnailPreview(selectedUrl);
      setSelectedThumbnailUrl(selectedUrl);
      setIsGeneratingThumbnail(false);
    }, 1800);
  };

  const handleGenerateDescription = () => {
    setIsGeneratingDesc(true);
    setDescription('');
    setTimeout(() => {
      setDescription(sampleDescriptions[format]);
      setSeoTags(['#contentcreator', '#viralvideo', '#editingblueprint', '#viradity', '#production', format]);
      setIsGeneratingDesc(false);
    }, 1200);
  };

  const handleFinishWizard = () => {
    if (!title.trim()) {
      setActiveStep('title');
      return;
    }

    const duration = format === 'shorts' ? '00:59' : format === 'series' ? '3 episodes' : '07:45';

    onSuccess({
      name: title.trim(),
      format,
      duration,
      thumbnail: selectedThumbnailUrl,
      script: script || 'Script empty. Start writing your content outline directly.',
      description: description || 'No Description provided. Optimize for search indexing anytime.',
    });
  };

  // Step validators/helpers
  const getStepStatus = (step: WizardStep) => {
    if (step === 'title') return title.trim() ? 'complete' : 'pending';
    if (step === 'script') return script.trim() ? 'complete' : 'optional';
    if (step === 'thumbnail') return selectedThumbnailUrl ? 'complete' : 'pending';
    if (step === 'description') return description.trim() ? 'complete' : 'optional';
    return 'pending';
  };

  const stepsList: { id: WizardStep; label: string; icon: typeof Type; description: string }[] = [
    { id: 'title', label: '1. Title & Format', icon: Type, description: 'Format and Title' },
    { id: 'script', label: '2. Scriptwriting', icon: FileText, description: 'Write or generate' },
    { id: 'thumbnail', label: '3. Thumbnail Studio', icon: ImageIcon, description: 'Cover design' },
    { id: 'description', label: '4. Metadata & SEO', icon: Tag, description: 'Descriptions & Tags' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-6">
      
      {/* Upper Title Row */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#2563EB]" />
              Production Suite
            </span>
            <span className="text-[11px] font-medium text-[#8E9299]">Wizard Engine v1.2</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#1A1A1A] mt-1">
            New Project Creation Wizard
          </h1>
          <p className="text-xs text-[#666666]">
            Design your entire video lifecycle in one workspace. Fill details out sequentially or select specific assets.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-xs font-semibold text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F1F3F5] rounded-[10px] transition-all border border-[#ECEEF2]"
        >
          Cancel Draft
        </button>
      </div>

      {/* Modern Horizontal Steps Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#F8F9FB] p-1.5 rounded-[16px] border border-[#ECEEF2]/60">
        {stepsList.map((step) => {
          const Icon = step.icon;
          const status = getStepStatus(step.id);
          const isActive = activeStep === step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center gap-3 p-3 rounded-[12px] text-left transition-all ${
                isActive 
                  ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#ECEEF2] text-[#2563EB]' 
                  : 'hover:bg-white/40 border border-transparent text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors ${
                isActive 
                  ? 'bg-[#2563EB] text-white' 
                  : status === 'complete' 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                  : 'bg-[#ECEEF2]/70 text-[#666666]'
              }`}>
                {status === 'complete' && !isActive ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold leading-none block truncate">
                  {step.label}
                </span>
                <span className="text-[10px] text-[#8E9299] font-medium leading-none block mt-1 truncate">
                  {status === 'complete' ? 'Completed' : status === 'optional' ? 'Draft empty' : 'Awaiting input'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Form Content Container */}
      <div className="flex-1 min-h-0 bg-white border border-[#ECEEF2]/60 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.01)] p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          
          {/* STEP 1: TITLE & FORMAT */}
          {activeStep === 'title' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-start gap-4 p-4 rounded-[12px] bg-[#2563EB]/5 border border-[#2563EB]/10">
                <Video className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Project Configuration</h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Choose the aspect ratio and frame size that matches your target distribution platform. Viradity will calibrate subtitle weights, export specs, and font templates accordingly.
                  </p>
                </div>
              </div>

              {/* Format Selector Cards */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-[#8E9299] uppercase tracking-wider">Video Output Format</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'video', name: '16:9 Landscape', desc: 'Optimal for YouTube, Vimeo, and cinematic presentations.', icon: Play },
                    { id: 'shorts', name: '9:16 Portrait', desc: 'Tailored for YouTube Shorts, Instagram Reels, and TikTok.', icon: Flame },
                    { id: 'series', name: 'Bundle Series', desc: 'Ideal for multi-episode tutorials, playlists, and docu-series.', icon: Video }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormat(item.id as any)}
                      className={`flex flex-col items-start p-4 rounded-[14px] border text-left transition-all ${
                        format === item.id 
                          ? 'border-[#2563EB] bg-[#2563EB]/5 shadow-[0_4px_16px_rgba(37,99,235,0.04)] text-[#2563EB]' 
                          : 'border-[#ECEEF2] hover:border-gray-300 bg-white text-[#4B5565]'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 mb-3 ${format === item.id ? 'text-[#2563EB]' : 'text-[#8E9299]'}`} />
                      <span className="text-xs font-bold text-[#1A1A1A] block">{item.name}</span>
                      <span className="text-[11px] text-[#666666] leading-normal block mt-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title input */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="wizard-title" className="text-xs font-semibold text-[#8E9299] uppercase tracking-wider">
                    Project Draft Title
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateTitles}
                    disabled={isGeneratingTitle}
                    className="text-[11px] font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-all disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingTitle ? 'Generating Ideas...' : 'AI Title Generator'}</span>
                  </button>
                </div>
                
                <input
                  id="wizard-title"
                  type="text"
                  placeholder="Enter a descriptive name for your video workspace..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-[#ECEEF2] rounded-[12px] text-xs focus:outline-none focus:border-[#2563EB] bg-[#F8F9FB]/30 placeholder:text-[#8E9299] font-medium"
                />

                {/* AI Title Suggestions Grid */}
                {suggestedTitles.length > 0 && (
                  <div className="p-4 rounded-[12px] bg-[#F8F9FB] border border-[#ECEEF2]/80 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                    <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block">High-Retention Title Concepts</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {suggestedTitles.map((sug, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setTitle(sug)}
                          className="p-2.5 rounded-[8px] bg-white border border-[#ECEEF2] hover:border-[#2563EB] text-left text-[11px] font-semibold text-[#1A1A1A] hover:bg-[#2563EB]/5 transition-all truncate"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: SCRIPTWRITING */}
          {activeStep === 'script' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight">Audio Screenplay & Narrator Script</h3>
                  <p className="text-xs text-[#666666]">Write a high-retention narration blueprint or use the generative engine</p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateScript}
                  disabled={isGeneratingScript}
                  className="px-3 py-1.5 rounded-[8px] bg-[#2563EB]/10 hover:bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isGeneratingScript ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Writing Draft Script...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Script generator</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Write your dialogue blocks, camera scenes, and audio instructions here... Or click 'AI Script Generator' above to outline instantly."
                className="w-full h-[240px] px-4 py-3 border border-[#ECEEF2] rounded-[12px] text-xs focus:outline-none focus:border-[#2563EB] bg-[#F8F9FB]/30 placeholder:text-[#8E9299] font-mono leading-relaxed resize-none"
              />

              <div className="flex items-center justify-between text-[11px] text-[#8E9299]">
                <span className="flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-[#8E9299]" />
                  Script is fully synced with text-to-speech voice engines in the workspace
                </span>
                <span className="font-semibold font-mono">{script.length} characters</span>
              </div>
            </div>
          )}

          {/* STEP 3: THUMBNAIL STUDIO */}
          {activeStep === 'thumbnail' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight">Cover & Thumbnail Studio</h3>
                <p className="text-xs text-[#666666]">Select a high-resolution canvas preset or prompt the generative AI mockup engine</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left Side options */}
                <div className="md:col-span-7 space-y-5">
                  
                  {/* Preset Library */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-semibold text-[#8E9299] uppercase tracking-wider block">Visual Presets</label>
                    <div className="grid grid-cols-5 gap-2">
                      {presetThumbnails.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedThumbnailUrl(preset.url);
                            setCustomThumbnailPreview(null);
                          }}
                          className={`group relative aspect-video rounded-[8px] overflow-hidden border-2 transition-all ${
                            selectedThumbnailUrl === preset.url && !customThumbnailPreview
                              ? 'border-[#2563EB] scale-95 shadow-sm' 
                              : 'border-transparent hover:scale-102'
                          }`}
                          title={preset.name}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-[8px] text-white font-bold text-center leading-tight">{preset.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt box */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-semibold text-[#8E9299] uppercase tracking-wider block">Describe Your Custom Thumbnail</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Cinematic futuristic setup with blue and teal glowing workspace grids..."
                        value={customThumbnailPrompt}
                        onChange={(e) => setCustomThumbnailPrompt(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 border border-[#ECEEF2] rounded-[10px] text-xs focus:outline-none focus:border-[#2563EB] bg-[#F8F9FB]/30 placeholder:text-[#8E9299] font-medium"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateThumbnail}
                        disabled={isGeneratingThumbnail}
                        className="px-4 py-2.5 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0"
                      >
                        {isGeneratingThumbnail ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Rendering...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>AI Design</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Drag-n-drop file select dummy */}
                  <div className="border border-dashed border-[#ECEEF2] bg-[#F8F9FB]/30 rounded-[12px] p-5 text-center transition-colors hover:bg-[#F8F9FB]/60 cursor-pointer">
                    <Upload className="w-5 h-5 text-[#8E9299] mx-auto mb-2" />
                    <span className="text-[11px] font-bold text-[#1A1A1A] block">Upload custom cover graphic</span>
                    <span className="text-[10px] text-[#8E9299] block mt-0.5">Supports PNG, JPG, WebP (Max 12MB)</span>
                  </div>
                </div>

                {/* Right Side Live preview card */}
                <div className="md:col-span-5 space-y-2">
                  <label className="text-xs font-semibold text-[#8E9299] uppercase tracking-wider block">Active Cover Preview</label>
                  <div className="relative aspect-video rounded-[14px] overflow-hidden border border-[#ECEEF2] bg-gray-100 shadow-sm group">
                    <img
                      src={selectedThumbnailUrl}
                      alt="Thumbnail Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Mock typography overlay */}
                    <div className="absolute inset-x-3 bottom-3 p-2.5 rounded-[8px] bg-black/50 backdrop-blur-xs border border-white/5 space-y-1">
                      <span className="text-[8px] font-bold text-orange-400 uppercase tracking-wider">LIVE MOCKUP</span>
                      <h4 className="text-[10px] font-bold text-white tracking-tight leading-tight line-clamp-1">
                        {title || 'Your Video Title Appears Here'}
                      </h4>
                    </div>

                    {customThumbnailPreview && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-[6px] bg-emerald-500 text-white text-[9px] font-bold flex items-center gap-0.5 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        AI Generated
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 4: METADATA & SEO */}
          {activeStep === 'description' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight">SEO description & Keywords</h3>
                  <p className="text-xs text-[#666666]">Structure searchable taglists and index parameters for algorithmic boost</p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGeneratingDesc}
                  className="px-3 py-1.5 rounded-[8px] bg-[#2563EB]/10 hover:bg-[#2563EB]/15 text-[#2563EB] text-[11px] font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isGeneratingDesc ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Writing Copy...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Generate Description</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Draft optimal index parameters, channel timestamps, references, and platform metadata here..."
                className="w-full h-[180px] px-4 py-3 border border-[#ECEEF2] rounded-[12px] text-xs focus:outline-none focus:border-[#2563EB] bg-[#F8F9FB]/30 placeholder:text-[#8E9299] leading-relaxed resize-none font-medium"
              />

              {/* Tag recommendations */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-[#8E9299] uppercase tracking-wider block">Recommended Topic Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {seoTags.length > 0 ? (
                    seoTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-[#2563EB] text-[10px] font-bold flex items-center gap-1"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => setSeoTags(prev => prev.filter((_, i) => i !== idx))}
                          className="hover:text-rose-600 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#8E9299] italic">Generate description above to automatically construct high-performing hashtags</span>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t border-[#ECEEF2]/60">
          <div>
            {activeStep !== 'title' && (
              <button
                type="button"
                onClick={() => {
                  const currentIdx = stepsList.findIndex(s => s.id === activeStep);
                  if (currentIdx > 0) setActiveStep(stepsList[currentIdx - 1].id);
                }}
                className="px-4 py-2 text-xs font-bold text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F1F3F5] rounded-[10px] transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {activeStep !== 'description' ? (
              <button
                type="button"
                onClick={() => {
                  const currentIdx = stepsList.findIndex(s => s.id === activeStep);
                  if (currentIdx < stepsList.length - 1) setActiveStep(stepsList[currentIdx + 1].id);
                }}
                className="px-5 py-2.5 text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px] transition-all shadow-[0_2px_8px_rgba(37,99,235,0.12)] flex items-center gap-1"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishWizard}
                disabled={!title.trim()}
                className="px-6 py-3 text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white hover:opacity-95 rounded-[10px] transition-all shadow-[0_4px_16px_rgba(37,99,235,0.22)] flex items-center gap-2 disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>Publish Project Workspace</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
