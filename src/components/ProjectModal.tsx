"use client";

import React, { useEffect } from "react";
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Cpu, 
  ShieldAlert, 
  Lightbulb 
} from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#fbf7f4] border border-[#e7d8ce] rounded-3xl shadow-2xl overflow-y-auto flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#fbf7f4]/95 backdrop-blur-md px-6 py-4 border-b border-[#e7d8ce] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-rose-500/10 border border-rose-300/60 text-rose-800">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-stone-500">
              Status: <span className="text-emerald-700 font-semibold">{project.status}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-950 bg-white hover:bg-stone-100 border border-[#e7d8ce] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Tagline */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title inline-flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight hover:text-rose-800 transition-colors"
                  title={`Open ${project.title}`}
                >
                  <span>{project.title}</span>
                  <ExternalLink className="w-5 h-5 text-stone-500 opacity-70 group-hover/title:opacity-100 group-hover/title:text-rose-800 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                </a>
              ) : (
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                  {project.title}
                </h3>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/70 border border-emerald-300 transition-all shadow-sm"
                >
                  <span>Open Live / Play Store</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <p className="text-base text-stone-600 leading-relaxed font-normal">
              {project.tagline}
            </p>
          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/80 border border-[#e7d8ce] flex flex-col items-center text-center space-y-1 shadow-sm"
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900">
                  {metric.value}
                </div>
                <div className="text-xs text-stone-500 uppercase tracking-wider font-mono">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Problem vs Solution Deep Dive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-800 font-semibold text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>The Challenge / Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architectural Blueprint */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-stone-950 font-bold text-base">
              <Layers className="w-4 h-4 text-rose-700" />
              <span>Architectural Blueprint</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-[#e7d8ce] space-y-2 shadow-sm">
              {project.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <span className="text-rose-700 font-mono mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Features Checklist */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-stone-950 font-bold text-base">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Key Features &amp; Capabilities</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/80 border border-[#e7d8ce] flex items-start gap-2 text-xs sm:text-sm text-stone-700 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-700 mt-2 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results & Impact */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-stone-950 font-bold text-base">
              <TrendingUp className="w-4 h-4 text-stone-700" />
              <span>Production Impact &amp; Results</span>
            </div>
            <ul className="space-y-2">
              {project.results.map((res, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2.5 pt-2 border-t border-[#e7d8ce]">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-white border border-[#e7d8ce] text-stone-700 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#fbf7f4]/95 backdrop-blur-md px-6 py-4 border-t border-[#e7d8ce] flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono hidden sm:inline-block">
            Project Ref: #{project.id}
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/70 border border-emerald-300 transition-all shadow-sm"
              >
                <span>Live App / Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-stone-700 hover:text-stone-950 bg-white hover:bg-stone-100 border border-[#e7d8ce] transition-colors shadow-sm"
            >
              Close Window
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-md shadow-stone-900/10 transition-all"
            >
              Inquire About Similar Build
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
