/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Play, 
  Clock, 
  Video, 
  Sparkles, 
  FolderPlus, 
  TrendingUp, 
  Compass, 
  ArrowUpRight, 
  Film, 
  Flame, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { NavTab } from '../types';

export interface Project {
  id: string;
  name: string;
  format: 'video' | 'shorts' | 'series';
  progress: number;
  lastEdited: string;
  duration: string;
  thumbnail: string;
}

export interface TrendingIdea {
  id: string;
  title: string;
  category: string;
  growth: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  duration: string;
  hook: string;
  visualStyle: string;
  thumbnail: string;
}

interface DashboardProps {
  projects: Project[];
  onContinueProject: (project: Project) => void;
  onSelectTab: (tab: NavTab) => void;
  onOpenCreateProject: (prefilledName?: string) => void;
  userName: string;
}

const trendingIdeas: TrendingIdea[] = [
  {
    id: 'idea-1',
    title: 'The AI Agents Explainer: How They Think',
    category: 'AI Video Tech',
    growth: '+420% this week',
    difficulty: 'Medium',
    duration: 'Shorts (9:16)',
    hook: '“You don’t need to code to build your own custom AI agent. Here’s how...”',
    visualStyle: 'Sleek dark mode graphics with smooth vector motion transitions.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'idea-2',
    title: 'Micro-Habits That Feel Like Cheat Codes',
    category: 'Finance & Growth',
    growth: '+280% searches',
    difficulty: 'Easy',
    duration: 'Video (16:9)',
    hook: '“Saving $5 a day isn’t going to make you rich. But automating this one habit will...”',
    visualStyle: 'Warm editorial typography, high-contrast flat lay scenes.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'idea-3',
    title: 'Cinematic Travel Openers: The 3-Second Hook',
    category: 'Aesthetic Travel',
    growth: '+190% viral score',
    difficulty: 'Advanced',
    duration: 'Shorts (9:16)',
    hook: '“Stop starting your vlogs with a generic greeting. Try this split-screen trick instead...”',
    visualStyle: 'High-contrast color grading, fast match-cuts synced to heavy synth-beats.',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
  },
];

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  onContinueProject,
  onSelectTab,
  onOpenCreateProject,
  userName,
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto pr-1 -mr-2 space-y-9 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
      
      {/* 1. Dashboard Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#2563EB]/5 via-[#4F46E5]/3 to-transparent p-6 rounded-[20px] border border-[#2563EB]/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full">
              Creator Dashboard
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] font-medium text-[#8E9299]">Live Production Engine Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] tracking-[-0.03em] leading-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-sm text-[#666666] max-w-[580px]">
            Ready to produce your next viral masterpiece? Continue your editing drafts or jump on these trending high-demand video concepts.
          </p>
        </div>
        <button
          onClick={() => onOpenCreateProject()}
          className="flex-shrink-0 self-start md:self-center flex items-center gap-2 px-5 py-3 rounded-[12px] text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_4px_16px_rgba(37,99,235,0.2)] transition-all duration-200 active:scale-[0.98]"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>New Video Project</span>
        </button>
      </div>

      {/* 2. Section: Continue Your Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
              <Film className="w-3.5 h-3.5 text-[#2563EB]" />
            </div>
            <h2 className="text-lg font-bold text-[#1A1A1A] tracking-[-0.02em]">
              Continue Your Projects
            </h2>
            <span className="text-[11px] font-semibold bg-[#F1F3F5] text-[#4B5565] px-2 py-0.5 rounded-full">
              {projects.length} drafts
            </span>
          </div>
          <button
            onClick={() => onSelectTab('projects')}
            className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline flex items-center gap-0.5"
          >
            <span>All Projects</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-[#F8F9FB]/40 border border-dashed border-[#ECEEF2] rounded-[18px]">
            <FolderPlus className="w-8 h-8 text-[#8E9299] mb-3" />
            <span className="text-sm font-semibold text-[#1A1A1A]">No active drafts found</span>
            <p className="text-xs text-[#666666] mt-1 text-center max-w-sm">
              All your video templates and project timelines appear here. Initialize your first project to begin!
            </p>
            <button
              onClick={() => onOpenCreateProject()}
              className="mt-4 px-4 py-2 rounded-[10px] text-xs font-semibold bg-white border border-[#ECEEF2] hover:bg-[#F8F9FB] transition-all"
            >
              Start Draft
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col rounded-[16px] bg-white border border-[#ECEEF2]/70 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:border-[#2563EB]/20 transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail Preview Area */}
                <div className="relative aspect-video w-full bg-[#ECEEF2]/40 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Aspect Ratio Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-black/60 text-white text-[10px] font-semibold uppercase backdrop-blur-xs tracking-wider">
                    {project.format === 'shorts' ? '9:16 vertical' : project.format === 'series' ? 'bundle' : '16:9 standard'}
                  </span>
                  {/* Play duration preview */}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-[6px] bg-black/70 text-white text-[10px] font-semibold font-mono tracking-tight">
                    {project.duration}
                  </span>
                  
                  {/* Overlay Play Hover Effect */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => onContinueProject(project)}
                      className="w-10 h-10 rounded-full bg-white text-[#2563EB] flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Info details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8E9299] font-medium mb-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.lastEdited}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#1A1A1A] leading-snug tracking-tight line-clamp-2 mb-3 group-hover:text-[#2563EB] transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {/* Progress Bar Container */}
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-[#8E9299] mb-1">
                        <span>Production status</span>
                        <span className="text-[#2563EB] font-mono">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#ECEEF2]/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Resume Button action */}
                    <button
                      onClick={() => onContinueProject(project)}
                      className="w-full py-1.5 mt-1 border border-[#ECEEF2] group-hover:border-[#2563EB]/40 group-hover:bg-[#2563EB]/5 rounded-[8px] text-[11px] font-bold text-[#666666] group-hover:text-[#2563EB] transition-all flex items-center justify-center gap-1"
                    >
                      <span>Resume Workspace</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Section: Trending Creator Ideas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <h2 className="text-lg font-bold text-[#1A1A1A] tracking-[-0.02em]">
              Trending Creator Ideas
            </h2>
            <span className="text-[11px] font-semibold bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" />
              <span>High Viral Score</span>
            </span>
          </div>
          <span className="text-xs text-[#8E9299] font-medium">Updated minutes ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {trendingIdeas.map((idea) => (
            <div
              key={idea.id}
              className="flex flex-col bg-[#F8F9FB]/60 hover:bg-white rounded-[16px] border border-[#ECEEF2]/60 hover:border-orange-500/20 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.04)] transition-all duration-300 p-4 justify-between group"
            >
              <div className="space-y-3">
                {/* Header Tag / Growth Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                    {idea.category}
                  </span>
                  <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <TrendingUp className="w-2.5 h-2.5" />
                    {idea.growth}
                  </span>
                </div>

                {/* Idea Title */}
                <h3 className="font-bold text-sm text-[#1A1A1A] tracking-tight leading-snug group-hover:text-orange-600 transition-colors">
                  {idea.title}
                </h3>

                {/* Suggested Hook */}
                <div className="p-2.5 rounded-[10px] bg-white border border-[#ECEEF2]/40 text-[11px] text-[#4B5565] italic leading-normal relative before:content-['']">
                  {idea.hook}
                </div>

                {/* Metadata details */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#8E9299]">Visual Style:</span>
                    <span className="font-medium text-[#4B5565] max-w-[150px] truncate text-right">
                      {idea.visualStyle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#8E9299]">Difficulty:</span>
                    <span className={`font-semibold ${
                      idea.difficulty === 'Easy' ? 'text-[#10B981]' : idea.difficulty === 'Medium' ? 'text-orange-500' : 'text-rose-500'
                    }`}>
                      {idea.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#8E9299]">Recommended:</span>
                    <span className="font-semibold text-[#1A1A1A]">{idea.duration}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Create Project From Idea */}
              <button
                onClick={() => onOpenCreateProject(idea.title)}
                className="w-full mt-4 py-2 bg-white hover:bg-orange-600 text-[#1A1A1A] hover:text-white border border-[#ECEEF2] hover:border-orange-600 rounded-[10px] text-xs font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all flex items-center justify-center gap-1.5 group-hover:shadow-[0_4px_12px_rgba(249,115,22,0.15)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Use This Concept</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
