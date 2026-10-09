"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight, 
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filterOptions = ["All", "Fintech", "Mobile & Web", "In Progress"];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === "All") return true;
    if (filter === "Fintech") return proj.category === "Fintech";
    if (filter === "In Progress") return proj.category === "In Progress";
    if (filter === "Mobile & Web") {
      return (
        proj.technologies.some((t) => t.toLowerCase().includes("flutter") || t.toLowerCase().includes("next") || t.toLowerCase().includes("react"))
      );
    }
    return true;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#f5ede7] border-t border-[#e7d8ce]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-rose-200/30 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-200/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-300/50 text-rose-700 text-xs font-mono tracking-wider uppercase">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Featured <span className="font-serif italic font-normal text-rose-800">Work &amp; Platforms</span>
          </h2>
          <p className="text-stone-600 max-w-2xl text-base sm:text-lg">
            Real products built for scale: from high-concurrency fintech platforms to salon booking automation SaaS.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            {filterOptions.map((opt) => {
              const isSelected = filter === opt;
              return (
                <motion.button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isSelected
                      ? "text-white font-bold"
                      : "bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white border border-[#e7d8ce]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeProjectFilter"
                      className="absolute inset-0 bg-stone-900 rounded-xl shadow-md shadow-stone-900/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{opt}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Top Accent Gradient Border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.accentColor}`}
                />

                <div className="space-y-4">
                  {/* Meta Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/80 border border-[#e7d8ce] text-stone-700">
                      {project.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>{project.status}</span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <div>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/title inline-flex items-center gap-2 text-xl sm:text-2xl font-bold text-stone-950 tracking-tight hover:text-rose-800 transition-colors"
                        title={`Open ${project.title}`}
                      >
                        <span>{project.title}</span>
                        <ExternalLink className="w-4 h-4 text-stone-500 opacity-70 group-hover/title:opacity-100 group-hover/title:text-rose-800 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                      </a>
                    ) : (
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight group-hover:text-rose-800 transition-colors">
                        {project.title}
                      </h3>
                    )}
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Metrics Highlight */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {project.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-white/80 border border-[#e7d8ce] text-center shadow-sm"
                      >
                        <div className="text-sm font-bold font-mono text-stone-900">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-stone-500 font-mono truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features Snippet */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                      Core Capabilities:
                    </div>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="text-xs text-stone-700 flex items-start gap-2"
                        >
                          <span className="text-rose-700 font-bold">•</span>
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 5).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono bg-white/80 border border-[#e7d8ce] text-stone-700 px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] font-mono text-stone-500 self-center">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[#e7d8ce] flex items-center justify-between gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 border border-[#e7d8ce] hover:border-stone-400 transition-all shadow-sm"
                  >
                    <Layers className="w-3.5 h-3.5 text-stone-600" />
                    <span>Case Study</span>
                  </motion.button>

                  <div className="flex items-center gap-1.5">
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-100/70 hover:bg-emerald-200/70 border border-emerald-300 px-2.5 py-2 rounded-xl transition-all shadow-sm"
                        title="Open Live Application / Play Store"
                      >
                        <span>Live App</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 hover:text-rose-800 transition-colors p-2"
                      >
                        <span>Full Page</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
