/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Type, 
  FileText, 
  Image as ImageIcon, 
  Tag, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  Check, 
  Copy,
  Plus,
  Trash2,
  RefreshCw,
  Video,
  Info,
  Layers,
  TrendingUp,
  BarChart3,
  Search,
  X,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const MagicWandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 4L20 9L9 20L4 15L15 4Z" />
    <path d="M6.5 1.5L7.3 3.7L9.5 4.5L7.3 5.3L6.5 7.5L5.7 5.3L3.5 4.5L5.7 3.7L6.5 1.5Z" fill="currentColor" stroke="none" />
    <path d="M17.5 13.5L18.3 15.7L20.5 16.5L18.3 17.3L17.5 19.5L16.7 17.3L14.5 16.5L16.7 15.7L17.5 13.5Z" fill="currentColor" stroke="none" />
  </svg>
);

interface ProjectWizardProps {
  project?: {
    id: string;
    name: string;
    format: 'video' | 'shorts' | 'series';
    duration?: string;
    thumbnail?: string;
    script?: string;
    description?: string;
    seoTags?: string[];
    videoTitle?: string;
  };
  onAutoSave?: (updatedData: {
    name?: string;
    format?: 'video' | 'shorts' | 'series';
    duration?: string;
    thumbnail?: string;
    script?: string;
    description?: string;
    seoTags?: string[];
    videoTitle?: string;
  }) => void;
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

type WizardStep = 'title' | 'description' | 'script' | 'thumbnail' | 'overview';

export interface TitleResultItem {
  id: string;
  videoId?: string;
  title: string;
  originalVideoTitle?: string;
  channelTitle?: string;
  publishedAt?: string;
  views?: number;
  youtubeUrl?: string;
  opportunityScore?: number;
  opportunityScoreReason?: string;
  keywords?: string[];
  hashtags?: string[];
  whyItWorks?: string;
  whatItCovers?: string;
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({
  project,
  onAutoSave,
  onSuccess,
  onCancel,
  prefillName = '',
}) => {
  // Wizard steps tracking
  const [activeStep, setActiveStep] = useState<WizardStep>('title');
  
  // Document title (Notion / Google Docs style editable project title)
  const [docTitle, setDocTitle] = useState(project?.name || prefillName || 'Untitled');
  const [isEditingDocTitle, setIsEditingDocTitle] = useState(false);
  const [hasManuallyRenamed, setHasManuallyRenamed] = useState(
    !!(project?.name && project?.name !== 'Untitled' && project?.name !== prefillName)
  );
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Project properties
  const [title, setTitle] = useState(project?.videoTitle || (project?.name === 'Untitled' ? '' : (project?.name || prefillName)));
  const [format, setFormat] = useState<'video' | 'shorts' | 'series'>(project?.format || 'video');
  const [script, setScript] = useState(project?.script || '');
  const [description, setDescription] = useState(project?.description || '');
  const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState(project?.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80');
  const [customThumbnailPrompt, setCustomThumbnailPrompt] = useState('');

  // TITLE STEP STATES
  const [nicheInput, setNicheInput] = useState('Tech & AI Software Architecture');
  const [useSavedProfile, setUseSavedProfile] = useState(true);

  const [competitorChannels, setCompetitorChannels] = useState<string[]>([
    'https://youtube.com/@mkbhd',
    'https://youtube.com/@Fireship'
  ]);
  const [useSavedChannels, setUseSavedChannels] = useState(true);

  const [generatedTitles, setGeneratedTitles] = useState<TitleResultItem[]>([
    {
      id: 't-1',
      videoId: 'yt-1',
      title: 'The Hidden Architecture Behind 10x Software Teams in 2026',
      views: 340000,
      youtubeUrl: 'https://www.youtube.com/results?search_query=The+Hidden+Architecture+Behind+10x+Software+Teams',
      opportunityScore: 96,
      opportunityScoreReason: 'Combines high search intent with low creator competition in your niche.',
      keywords: ['Software Architecture', '10x Engineering', 'System Design', 'Scalability'],
      hashtags: ['#SoftwareArchitecture', '#SystemDesign', '#TechTutorial'],
    },
    {
      id: 't-2',
      videoId: 'yt-2',
      title: 'Why Most Engineers Build AI Products Nobody Wants (And How to Fix It)',
      views: 210000,
      youtubeUrl: 'https://www.youtube.com/results?search_query=Why+Most+Engineers+Build+AI+Products',
      opportunityScore: 92,
      opportunityScoreReason: 'Pairs a sharp counter-intuitive warning with an actionable solution blueprint.',
      keywords: ['AI Development', 'SaaS Pitfalls', 'Product Architecture', 'Founder Advice'],
      hashtags: ['#AIDevelopment', '#SaaS', '#TechFounders'],
    },
    {
      id: 't-3',
      videoId: 'yt-3',
      title: 'I Audited 100 Production Codebases — Here is What Separates Top 1%',
      views: 480000,
      youtubeUrl: 'https://www.youtube.com/results?search_query=I+Audited+100+Production+Codebases',
      opportunityScore: 98,
      opportunityScoreReason: 'First-person audit hook creates immediate credibility and high curiosity regarding peer benchmarks.',
      keywords: ['Code Audit', 'Clean Code', 'Engineering Excellence', 'Code Review'],
      hashtags: ['#CodeQuality', '#SoftwareEngineering', '#TechCareer'],
    },
    {
      id: 't-4',
      videoId: 'yt-4',
      title: 'Stop Over-Engineering Microservices: The 2026 Modular Monolith Framework',
      views: 175000,
      youtubeUrl: 'https://www.youtube.com/results?search_query=Stop+Over+Engineering+Microservices',
      opportunityScore: 89,
      opportunityScoreReason: 'Direct command + controversial opinion on trending architectural debate.',
      keywords: ['Microservices', 'Modular Monolith', 'Backend Architecture', 'System Design'],
      hashtags: ['#BackendDev', '#SystemDesign', '#SoftwareEngineering'],
    }
  ]);

  // Single-expanded accordion control (only one title expanded at a time!)
  const [expandedTitleId, setExpandedTitleId] = useState<string | null>(null);

  // On-demand section analysis state ({ [itemId]: { why_it_works?: boolean, what_it_covers?: boolean } })
  const [analyzingState, setAnalyzingState] = useState<{
    [key: string]: { why_it_works?: boolean; what_it_covers?: boolean }
  }>({});

  // Helper function to format view counts cleanly (e.g. 3.2M Views, 340K Views)
  const formatViewCount = (views?: number): string => {
    if (!views) return "340K Views";
    if (views >= 1_000_000) {
      return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, '')}M Views`;
    }
    if (views >= 1_000) {
      return `${Math.round(views / 1_000)}K Views`;
    }
    return `${views} Views`;
  };

  // Helper function to format relative upload date (e.g. 8 months ago, 2 years ago)
  const formatRelativeTime = (publishedAt?: string): string => {
    if (!publishedAt) return "8 months ago";
    const date = new Date(publishedAt);
    if (isNaN(date.getTime())) return "8 months ago";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return "today";
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    if (diffDays < 30) {
      const weeks = Math.max(1, Math.floor(diffDays / 7));
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    const diffYears = Math.max(1, Math.floor(diffMonths / 12));
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
  };

  // Helper to render clean plain text without Markdown symbols (stars, hashes, bolding, etc.)
  const renderCleanPlainText = (text: string) => {
    if (!text) return null;
    const cleaned = text
      .replace(/\*\*/g, '')
      .replace(/###?\s*/g, '')
      .replace(/^[\*\-•]\s*/gm, '')
      .replace(/`/g, '')
      .trim();

    const paragraphs = cleaned.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    if (paragraphs.length === 0) return null;

    return (
      <div className="space-y-2.5 text-xs text-[#333333] leading-relaxed font-normal">
        {paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    );
  };

  // On-demand analysis handler
  const handleAnalyzeSection = async (item: TitleResultItem, section: 'why_it_works' | 'what_it_covers') => {
    const itemId = item.id;
    setAnalyzingState(prev => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), [section]: true }
    }));

    try {
      const currentNiche = nicheInput.trim() || 'Software Engineering & AI';
      const response = await fetch('/api/ideas/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: item.videoId || item.id,
          title: item.title,
          originalVideoTitle: item.originalVideoTitle,
          section,
          niche: currentNiche,
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setGeneratedTitles(prev =>
          prev.map(t => {
            if (t.id === itemId) {
              return {
                ...t,
                [section === 'why_it_works' ? 'whyItWorks' : 'whatItCovers']: data.analysis,
              };
            }
            return t;
          })
        );
      }
    } catch (err) {
      console.error("Error analyzing section:", err);
    } finally {
      setAnalyzingState(prev => ({
        ...prev,
        [itemId]: { ...(prev[itemId] || {}), [section]: false }
      }));
    }
  };

  // Title Variations modal / drawer state
  const [activeVariationsItem, setActiveVariationsItem] = useState<TitleResultItem | null>(null);
  const [variationsList, setVariationsList] = useState<string[]>([]);
  const [copiedVariationIdx, setCopiedVariationIdx] = useState<number | null>(null);
  const [copiedTitleId, setCopiedTitleId] = useState<string | null>(null);

  // Interactive UI Simulation states
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [seoTags, setSeoTags] = useState<string[]>(project?.seoTags || []);
  const [customThumbnailPreview, setCustomThumbnailPreview] = useState<string | null>(null);

  // Re-sync local state when switching active projects
  useEffect(() => {
    if (project) {
      setDocTitle(project.name || 'Untitled');
      setTitle(project.videoTitle || (project.name === 'Untitled' ? '' : project.name));
      setFormat(project.format || 'video');
      setScript(project.script || '');
      setDescription(project.description || '');
      if (project.thumbnail) setSelectedThumbnailUrl(project.thumbnail);
      if (project.seoTags) setSeoTags(project.seoTags);
      setHasManuallyRenamed(!!(project.name && project.name !== 'Untitled'));
    }
  }, [project?.id]);

  // Automatic renaming when project remains Untitled and video title is generated or entered
  useEffect(() => {
    if (!hasManuallyRenamed && (docTitle === 'Untitled' || !docTitle.trim()) && title.trim()) {
      setDocTitle(title.trim());
    }
  }, [title, docTitle, hasManuallyRenamed]);

  // Automatic background saving without user intervention
  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      const formatDurations = {
        video: '06:30',
        shorts: '00:50',
        series: '4 episodes',
      };
      if (onAutoSave) {
        onAutoSave({
          name: docTitle || 'Untitled',
          videoTitle: title,
          format,
          script,
          description,
          thumbnail: selectedThumbnailUrl,
          duration: formatDurations[format],
          seoTags,
        });
      }
      setSaveStatus('saved');
    }, 500);

    return () => clearTimeout(timer);
  }, [docTitle, title, format, script, description, selectedThumbnailUrl, seoTags]);

  // Actions for Competitor Channels
  const handleAddChannel = () => {
    if (competitorChannels.length < 3) {
      setCompetitorChannels([...competitorChannels, '']);
    }
  };

  const handleUpdateChannel = (index: number, value: string) => {
    const updated = [...competitorChannels];
    updated[index] = value;
    setCompetitorChannels(updated);
  };

  const handleRemoveChannel = (index: number) => {
    if (competitorChannels.length > 1) {
      setCompetitorChannels(competitorChannels.filter((_, i) => i !== index));
    } else {
      setCompetitorChannels(['']);
    }
  };

  const handleToggleSavedProfile = (checked: boolean) => {
    setUseSavedProfile(checked);
    if (checked) {
      setNicheInput('Tech & AI Software Architecture');
    }
  };

  const handleToggleSavedChannels = (checked: boolean) => {
    setUseSavedChannels(checked);
    if (checked) {
      setCompetitorChannels([
        'https://youtube.com/@mkbhd',
        'https://youtube.com/@Fireship'
      ]);
    }
  };

  // Generate Titles action powered by YouTube Data API v3 + Gemini 3.5 Flash Lite
  const handleGenerateTitles = async () => {
    setIsGeneratingTitle(true);
    setExpandedTitleId(null);

    const currentNiche = nicheInput.trim() || 'Software Engineering & AI';

    try {
      const response = await fetch('/api/ideas/discover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niche: currentNiche,
          competitorChannels: useSavedChannels ? competitorChannels : competitorChannels.filter(c => c.trim()),
        }),
      });

      const data = await response.json();
      if (data.success && Array.isArray(data.ideas) && data.ideas.length > 0) {
        const formattedItems: TitleResultItem[] = data.ideas.map((item: any, idx: number) => ({
          id: item.id || `t-${Date.now()}-${idx}`,
          videoId: item.videoId || item.id || `yt-${idx+1}`,
          title: item.title,
          originalVideoTitle: item.originalVideoTitle,
          channelTitle: item.channelTitle,
          publishedAt: item.publishedAt,
          views: item.views || 340000 + (idx * 85000),
          youtubeUrl: item.youtubeUrl || (item.id && !item.id.startsWith('yt-') ? `https://www.youtube.com/watch?v=${item.id}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title)}`),
          opportunityScore: item.opportunityScore || (96 - idx * 2),
          opportunityScoreReason: item.opportunityScoreReason || `High search potential with low creator competition in ${currentNiche}.`,
          keywords: item.keywords || [currentNiche, 'Tutorial', 'Best Practices', 'Creator Strategy'],
          hashtags: item.hashtags || [`#${currentNiche.replace(/\s+/g, '')}`, '#YouTubeGrowth', '#CreatorTips'],
        }));
        setGeneratedTitles(formattedItems);
      } else {
        // Fallback title generation if offline
        const fallbackItems: TitleResultItem[] = [
          {
            id: `t-${Date.now()}-1`,
            videoId: `yt-${Date.now()}-1`,
            title: `The 2026 Modular Engine: How Top ${currentNiche.split(' ')[0] || 'Tech'} Creators Scale`,
            views: 380000,
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(currentNiche + ' Modular Engine')}`,
            opportunityScore: 96,
            opportunityScoreReason: `High search volume and strong retention potential in ${currentNiche}.`,
            keywords: [currentNiche, 'Modular Engine', 'Creator Strategy', 'Scalability'],
            hashtags: [`#${currentNiche.replace(/\s+/g, '')}`, '#CreatorEconomy', '#Tech2026'],
          },
          {
            id: `t-${Date.now()}-2`,
            videoId: `yt-${Date.now()}-2`,
            title: `Why 95% of ${currentNiche.split(' ')[0] || 'Developers'} Build Workflows That Break`,
            views: 240000,
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(currentNiche + ' Workflows')}`,
            opportunityScore: 93,
            opportunityScoreReason: 'Counter-intuitive warning hook drives top-of-funnel clicks.',
            keywords: [currentNiche, 'Workflows', 'Best Practices', 'Architecture'],
            hashtags: [`#${currentNiche.replace(/\s+/g, '')}`, '#SoftwareEngineering'],
          },
          {
            id: `t-${Date.now()}-3`,
            videoId: `yt-${Date.now()}-3`,
            title: `Inside My $15,000 ${currentNiche.split(' ')[0] || 'Creator'} Stack: Zero Manual Edits`,
            views: 520000,
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(currentNiche + ' Creator Stack')}`,
            opportunityScore: 98,
            opportunityScoreReason: 'Empirical stack teardown creates peer benchmark curiosity.',
            keywords: [currentNiche, 'Creator Stack', 'Automation', 'Tools'],
            hashtags: [`#${currentNiche.replace(/\s+/g, '')}`, '#Automation', '#TechTools'],
          },
          {
            id: `t-${Date.now()}-4`,
            videoId: `yt-${Date.now()}-4`,
            title: `Stop Copying Legacy Methods: The Modern ${currentNiche.split(' ')[0] || 'AI'} Playbook`,
            views: 190000,
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(currentNiche + ' Playbook')}`,
            opportunityScore: 89,
            opportunityScoreReason: 'Direct command hook on trending architectural shifts.',
            keywords: [currentNiche, 'Modern Playbook', 'AI Tools', 'Framework'],
            hashtags: [`#${currentNiche.replace(/\s+/g, '')}`, '#AITools', '#TechFrameworks'],
          }
        ];
        setGeneratedTitles(fallbackItems);
      }
    } catch (err) {
      console.error("Error discovering ideas:", err);
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  // Open Variations Modal / Panel for a title
  const handleOpenVariations = (item: TitleResultItem) => {
    setActiveVariationsItem(item);
    setCopiedVariationIdx(null);

    // Rule 1: The first variation MUST ALWAYS be the exact original generated title!
    // Rule 2 & 3: Remaining 4 are alternative versions without labels like Curiosity, Emotional, etc.
    const orig = item.title;
    const wordList = orig.split(' ');
    const coreTopic = wordList.length > 4 ? wordList.slice(2).join(' ') : orig;

    const var2 = `How I Mastered ${coreTopic} (And What I Learned)`;
    const var3 = `The Blueprint for ${coreTopic}: Step-by-Step Breakdown`;
    const var4 = `What Nobody Tells You About ${coreTopic}`;
    const var5 = `Building a System Around ${coreTopic} in 2026`;

    setVariationsList([orig, var2, var3, var4, var5]);
  };

  const handleSelectVariation = (selectedTitleText: string) => {
    setTitle(selectedTitleText);
    if (!hasManuallyRenamed && (docTitle === 'Untitled' || !docTitle.trim())) {
      setDocTitle(selectedTitleText);
    }
    setActiveVariationsItem(null);
  };

  const handleCopyText = (text: string, index?: number, mainTitleId?: string) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedVariationIdx(index);
      setTimeout(() => setCopiedVariationIdx(null), 1800);
    } else if (mainTitleId) {
      setCopiedTitleId(mainTitleId);
      setTimeout(() => setCopiedTitleId(null), 1800);
    }
  };

  const handleFinishWizard = () => {
    if (!title.trim() && !docTitle.trim()) {
      setActiveStep('title');
      return;
    }

    const duration = format === 'shorts' ? '00:59' : format === 'series' ? '3 episodes' : '07:45';

    onSuccess({
      name: docTitle || title.trim() || 'Untitled',
      format,
      duration,
      thumbnail: selectedThumbnailUrl,
      script: script || 'Script empty. Start writing your content outline directly.',
      description: description || 'No Description provided. Optimize for search indexing anytime.',
    });
  };

  const stepsList: { id: WizardStep; label: string }[] = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'script', label: 'Script' },
    { id: 'thumbnail', label: 'Thumbnail' },
    { id: 'overview', label: 'Overview' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-6">
      
      {/* Upper Workspace Document Title & Heading */}
      <div className="flex flex-col space-y-3">
        <div>
          <div className="group inline-flex items-center gap-2 -ml-2 px-2 py-1 rounded-[8px] hover:bg-[#F1F3F5]/80 transition-all cursor-pointer">
            {isEditingDocTitle ? (
              <input
                type="text"
                value={docTitle}
                onChange={(e) => {
                  setDocTitle(e.target.value);
                  setHasManuallyRenamed(true);
                }}
                onBlur={() => setIsEditingDocTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingDocTitle(false)}
                autoFocus
                className="text-lg font-bold text-[#1A1A1A] bg-white border border-[#2563EB] rounded-[6px] px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 min-w-[200px]"
                placeholder="Untitled"
              />
            ) : (
              <div
                onClick={() => setIsEditingDocTitle(true)}
                className="flex items-center gap-2 max-w-xl"
                title="Click to rename project workspace"
              >
                <span className="text-lg font-bold text-[#1A1A1A] truncate">
                  {docTitle || 'Untitled'}
                </span>
                <span className="text-[10px] text-[#8E9299] opacity-0 group-hover:opacity-100 font-medium bg-white px-1.5 py-0.5 rounded border border-[#ECEEF2] shadow-2xs transition-opacity">
                  Rename
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium pl-0.5">
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin text-[#2563EB]" />
                <span className="text-[#666666]">Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-[#8E9299]">Saved</span>
              </>
            )}
          </div>
        </div>

        <div className="pt-1">
          <h1 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
            Create a New Project
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Choose where you'd like to start. Every project is a workspace for planning, researching, and creating your next YouTube video.
          </p>
        </div>
      </div>

      {/* Minimal & Clean Steps Navigation */}
      <div className="grid grid-cols-5 gap-2 bg-[#F8F9FB] p-1.5 rounded-[14px] border border-[#ECEEF2]/80">
        {stepsList.map((step) => {
          const isActive = activeStep === step.id;
          
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={`py-2.5 px-3 rounded-[10px] text-xs font-semibold text-center transition-all ${
                isActive 
                  ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#ECEEF2] text-[#1A1A1A]' 
                  : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-white/50 border border-transparent'
              }`}
            >
              {step.label}
            </button>
          );
        })}
      </div>

      {/* Main Form Content Container */}
      <div className="flex-1 min-h-0 bg-white border border-[#ECEEF2]/60 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.01)] p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          
          {/* STEP 1: TITLE (Handcrafted Premium Creator Layout) */}
          {activeStep === 'title' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Form Input Section at Top of Main Content Area */}
              <div className="bg-white border border-[#ECEEF2] rounded-[18px] p-6 shadow-[0_2px_14px_rgba(0,0,0,0.02)] space-y-6">
                
                {/* 1. Your Niche */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1A1A1A] tracking-tight block">
                    Your Niche
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={nicheInput}
                      disabled={useSavedProfile}
                      onChange={(e) => setNicheInput(e.target.value)}
                      placeholder="e.g. I'm in Tech & AI Software Architecture, creating videos on system design..."
                      className={`w-full px-4 py-3 rounded-[12px] text-xs border transition-all font-medium resize-none pb-7 ${
                        nicheInput.length > 100
                          ? 'border-rose-500 bg-rose-50/20 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20'
                          : useSavedProfile 
                            ? 'bg-[#F8F9FB] text-[#666666] cursor-not-allowed border-[#ECEEF2]' 
                            : 'bg-white text-[#1A1A1A] border-[#ECEEF2] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'
                      }`}
                    />
                    <div className="absolute right-3 bottom-2.5 pointer-events-none select-none">
                      <span className={`text-[10px] font-semibold tabular-nums ${
                        nicheInput.length > 100 ? 'text-rose-600 font-bold' : 'text-[#8E9299]'
                      }`}>
                        {100 - nicheInput.length} remaining
                      </span>
                    </div>
                  </div>

                  {nicheInput.length > 100 && (
                    <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1.5 animate-in fade-in duration-150">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Text exceeds the maximum limit of 100 characters.</span>
                    </p>
                  )}

                  <label className="flex items-center gap-2 cursor-pointer pt-0.5 select-none text-xs text-[#666666] hover:text-[#1A1A1A] transition-colors">
                    <input
                      type="checkbox"
                      checked={useSavedProfile}
                      onChange={(e) => handleToggleSavedProfile(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-[#ECEEF2] text-[#2563EB] focus:ring-[#2563EB]/20 accent-[#2563EB]"
                    />
                    <span>Use saved profile</span>
                  </label>
                </div>

                {/* 2. Competitor Channels (Optional) */}
                <div className="space-y-2 pt-2 border-t border-[#ECEEF2]/60">
                  <label className="text-xs font-bold text-[#1A1A1A] tracking-tight block">
                    Competitor Channels <span className="text-[11px] text-[#8E9299] font-normal lowercase ml-1">(optional)</span>
                  </label>

                  <div className="space-y-2 max-w-2xl">
                    {competitorChannels.map((channel, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={channel}
                          disabled={useSavedChannels}
                          onChange={(e) => handleUpdateChannel(idx, e.target.value)}
                          placeholder="YouTube channel name or video URL..."
                          className={`flex-1 px-3.5 py-2.5 rounded-[10px] text-xs border border-[#ECEEF2] transition-all font-medium ${
                            useSavedChannels 
                              ? 'bg-[#F8F9FB] text-[#666666] cursor-not-allowed border-[#ECEEF2]' 
                              : 'bg-white text-[#1A1A1A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'
                          }`}
                        />
                        {!useSavedChannels && competitorChannels.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveChannel(idx)}
                            className="w-9 h-9 rounded-[8px] text-[#8E9299] hover:text-[#1A1A1A] hover:bg-[#F1F3F5] border border-transparent hover:border-[#ECEEF2] flex items-center justify-center transition-all cursor-pointer"
                            title="Remove channel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {!useSavedChannels && competitorChannels.length < 3 && (
                    <button
                      type="button"
                      onClick={handleAddChannel}
                      className="text-[11px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors pt-0.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Channel</span>
                    </button>
                  )}

                  <label className="flex items-center gap-2 cursor-pointer pt-1 select-none text-xs text-[#666666] hover:text-[#1A1A1A] transition-colors">
                    <input
                      type="checkbox"
                      checked={useSavedChannels}
                      onChange={(e) => handleToggleSavedChannels(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-[#ECEEF2] text-[#2563EB] focus:ring-[#2563EB]/20 accent-[#2563EB]"
                    />
                    <span>Use saved channels</span>
                  </label>
                </div>

                {/* 3. Generate Titles Button */}
                <div className="flex justify-end pt-2 border-t border-[#ECEEF2]/60">
                  <button
                    type="button"
                    onClick={handleGenerateTitles}
                    disabled={isGeneratingTitle}
                    className="py-3 px-8 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white text-xs font-semibold tracking-wide shadow-[0_2px_10px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {isGeneratingTitle ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating Titles...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Titles</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Generated Recommendations Section Directly Underneath Form */}
              {generatedTitles.length > 0 && (
                <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                      Generated Recommendations
                    </h3>
                    <span className="text-xs text-[#666666] font-medium">
                      {generatedTitles.length} ideas found
                    </span>
                  </div>

                  {/* Single Clean Card Container for All Generated Titles */}
                  <div className="bg-white border border-[#ECEEF2] rounded-[18px] shadow-[0_2px_14px_rgba(0,0,0,0.02)] divide-y divide-[#ECEEF2]/70 overflow-hidden">
                    {generatedTitles.map((item) => {
                      const isExpanded = expandedTitleId === item.id;

                      return (
                        <div
                          key={item.id}
                          className="hover:bg-[#F8F9FB] transition-colors duration-150"
                        >
                          {/* Title Card Header (Only Title, Views • Upload date • Creator name, Expand Button) */}
                          <div className="p-4 md:px-5 md:py-4 flex items-center justify-between gap-4">
                            
                            <div 
                              onClick={() => {
                                setTitle(item.title);
                                setExpandedTitleId(isExpanded ? null : item.id);
                                if (!hasManuallyRenamed && (docTitle === 'Untitled' || !docTitle.trim())) {
                                  setDocTitle(item.title);
                                }
                              }}
                              className="flex-1 min-w-0 cursor-pointer group space-y-1"
                            >
                              {/* Exact Original YouTube Title */}
                              <p className="text-xs md:text-sm font-semibold text-[#1A1A1A] leading-relaxed transition-colors group-hover:text-[#2563EB]">
                                {item.title}
                              </p>
                              
                              {/* View count • Upload date • Creator name */}
                              <p className="text-[11px] text-[#666666] font-medium">
                                {formatViewCount(item.views)} • {formatRelativeTime(item.publishedAt)} • {item.channelTitle || 'YouTube Creator'}
                              </p>
                            </div>

                            {/* Action Buttons Right Side */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              
                              {/* Variations Wand Button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenVariations(item);
                                }}
                                className="w-8 h-8 rounded-[8px] text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F1F3F5] border border-transparent hover:border-[#ECEEF2] flex items-center justify-center transition-all cursor-pointer group/varBtn"
                                title="Generate title variations"
                              >
                                <MagicWandIcon className="w-4 h-4 text-[#666666] group-hover/varBtn:text-[#1A1A1A] transition-colors" />
                              </button>

                              {/* Disclosure Expand/Collapse Button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedTitleId(isExpanded ? null : item.id);
                                }}
                                className={`w-8 h-8 rounded-[8px] border flex items-center justify-center transition-all cursor-pointer ${
                                  isExpanded 
                                    ? 'bg-[#F1F3F5] text-[#1A1A1A] border-[#ECEEF2]' 
                                    : 'text-[#8E9299] hover:text-[#1A1A1A] hover:bg-[#F1F3F5] border-transparent hover:border-[#ECEEF2]'
                                }`}
                                title={isExpanded ? "Collapse details" : "Expand details"}
                              >
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>

                          </div>

                          {/* Simplified Expanded Dropdown (No repeated view counts, no keywords, no hashtags) */}
                          {isExpanded && (
                            <div className="border-t border-[#ECEEF2]/70 bg-[#F8F9FB]/60 px-5 py-5 space-y-5 animate-in fade-in duration-150">
                              
                              {/* 1. Watch on YouTube */}
                              <div>
                                <a
                                  href={item.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white border border-[#ECEEF2] text-xs text-[#1A1A1A] font-semibold hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-colors shadow-2xs group"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span>Watch on YouTube</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#2563EB] transition-colors" />
                                </a>
                              </div>

                              {/* 2. Why It Works */}
                              <div className="space-y-2 pt-2 border-t border-[#ECEEF2]/60">
                                <h4 className="text-[11px] font-bold text-[#8E9299] uppercase tracking-wider">
                                  Why It Works
                                </h4>
                                {item.whyItWorks ? (
                                  renderCleanPlainText(item.whyItWorks)
                                ) : (
                                  <div>
                                    <button
                                      type="button"
                                      disabled={analyzingState?.[item.id]?.why_it_works}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAnalyzeSection(item, 'why_it_works');
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white border border-[#ECEEF2] hover:bg-[#F1F3F5] text-[#1A1A1A] text-xs font-semibold transition-all cursor-pointer shadow-2xs disabled:opacity-60"
                                    >
                                      {analyzingState?.[item.id]?.why_it_works ? (
                                        <>
                                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2563EB]" />
                                          <span>Analyzing performance hooks...</span>
                                        </>
                                      ) : (
                                        <>
                                          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                                          <span>Analyze</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* 3. What It Covers */}
                              <div className="space-y-2 pt-3 border-t border-[#ECEEF2]/60">
                                <h4 className="text-[11px] font-bold text-[#8E9299] uppercase tracking-wider">
                                  What It Covers
                                </h4>
                                {item.whatItCovers ? (
                                  renderCleanPlainText(item.whatItCovers)
                                ) : (
                                  <div>
                                    <button
                                      type="button"
                                      disabled={analyzingState?.[item.id]?.what_it_covers}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAnalyzeSection(item, 'what_it_covers');
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white border border-[#ECEEF2] hover:bg-[#F1F3F5] text-[#1A1A1A] text-xs font-semibold transition-all cursor-pointer shadow-2xs disabled:opacity-60"
                                    >
                                      {analyzingState?.[item.id]?.what_it_covers ? (
                                        <>
                                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2563EB]" />
                                          <span>Extracting topics & tools...</span>
                                        </>
                                      ) : (
                                        <>
                                          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                                          <span>Analyze</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* 4. Opportunity Score */}
                              <div className="space-y-1.5 pt-3 border-t border-[#ECEEF2]/60">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-[11px] font-bold text-[#8E9299] uppercase tracking-wider">
                                    Opportunity Score
                                  </h4>
                                  <span className="text-xs font-extrabold text-[#2563EB]">
                                    {item.opportunityScore || 94}/100
                                  </span>
                                </div>
                                <p className="text-xs text-[#4B5565] leading-relaxed font-normal">
                                  {item.opportunityScoreReason || `High search potential with low creator competition in ${nicheInput.trim() || 'Software Engineering'}.`}
                                </p>
                              </div>

                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 2: DESCRIPTION */}
          {activeStep === 'description' && (
            <div className="min-h-[220px]"></div>
          )}

          {/* STEP 3: SCRIPT */}
          {activeStep === 'script' && (
            <div className="min-h-[220px]"></div>
          )}

          {/* STEP 4: THUMBNAIL */}
          {activeStep === 'thumbnail' && (
            <div className="min-h-[220px]"></div>
          )}

          {/* STEP 5: OVERVIEW */}
          {activeStep === 'overview' && (
            <div className="min-h-[220px]"></div>
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
            {activeStep !== 'overview' ? (
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
                disabled={!title.trim() && (!docTitle.trim() || docTitle === 'Untitled')}
                className="px-6 py-3 text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white hover:opacity-95 rounded-[10px] transition-all shadow-[0_4px_16px_rgba(37,99,235,0.22)] flex items-center gap-2 disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>Return to Projects Archive</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Title Variations Modal (No labels like Curiosity/Emotional, 1st variation is original) */}
      {activeVariationsItem && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] shadow-2xl border border-[#ECEEF2] max-w-xl w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ECEEF2]/80">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight">Title Variations</h3>
                <p className="text-xs text-[#666666] mt-0.5">Select or copy any of the 5 phrasing variations.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveVariationsItem(null)}
                className="p-1.5 text-[#8E9299] hover:text-[#1A1A1A] hover:bg-[#F1F3F5] rounded-[8px] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 5 Variations List (No Category Labels) */}
            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {variationsList.map((varText, idx) => {
                const isSelected = title === varText;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-[12px] border transition-all flex items-center justify-between gap-3 ${
                      isSelected 
                        ? 'bg-[#2563EB]/5 border-[#2563EB] text-[#2563EB]' 
                        : 'bg-[#F8F9FB]/60 border-[#ECEEF2] hover:border-gray-300 text-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span className="text-xs font-bold text-[#8E9299] mt-0.5 flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <p className="text-xs font-semibold leading-relaxed">
                        {varText}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopyText(varText, idx)}
                        className="px-2.5 py-1.5 rounded-[8px] bg-white border border-[#ECEEF2] text-[#666666] hover:text-[#1A1A1A] text-[11px] font-medium transition-all flex items-center gap-1"
                        title="Copy text"
                      >
                        {copiedVariationIdx === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectVariation(varText)}
                        className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-all ${
                          isSelected 
                            ? 'bg-[#2563EB] text-white shadow-xs' 
                            : 'bg-white border border-[#ECEEF2] text-[#2563EB] hover:bg-[#2563EB] hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#ECEEF2]/80 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveVariationsItem(null)}
                className="px-4 py-2 rounded-[10px] bg-[#F1F3F5] text-[#1A1A1A] hover:bg-[#E5E7EB] text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
