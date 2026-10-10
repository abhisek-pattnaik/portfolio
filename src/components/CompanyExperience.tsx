"use client";

import React from "react";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Building2, 
  Smartphone, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY_EXPERIENCE } from "@/data/portfolioData";

export default function CompanyExperience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#fbf7f4] border-t border-[#e7d8ce]">
      {/* Subtle ambient warm lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-rose-200/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-amber-200/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-300/50 text-rose-700 text-xs font-mono tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Work Experience &amp; <span className="font-serif italic font-normal text-rose-800">Production Impact</span>
          </h2>
          <p className="text-stone-600 max-w-2xl text-base sm:text-lg">
            Engineering scalable fintech solutions, banking SDK integrations, and high-performance mobile systems across full-time production environments.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical timeline spine */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-rose-400 via-stone-300 to-transparent" />

          <div className="space-y-12">
            {COMPANY_EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative md:pl-20 group"
              >
                {/* Timeline Node Badge on spine */}
                <div className="hidden md:flex absolute left-8 -translate-x-1/2 top-8 w-11 h-11 rounded-2xl bg-white border-2 border-stone-800 items-center justify-center shadow-md z-10 group-hover:scale-110 group-hover:border-rose-700 transition-all duration-300">
                  {exp.isCurrent ? (
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600" />
                    </span>
                  ) : (
                    <Briefcase className="w-4 h-4 text-stone-700 group-hover:text-rose-700 transition-colors" />
                  )}
                </div>

                {/* Company Experience Card */}
                <div className="glass-panel rounded-3xl p-6 sm:p-9 border border-[#e7d8ce] hover:border-stone-400/60 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
                  {/* Card Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-6 border-b border-[#e7d8ce]">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-300 shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                            CURRENT POSITION
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-stone-700 font-medium text-sm sm:text-base">
                        <span className="font-bold text-stone-900 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-rose-700" />
                          {exp.company}
                        </span>
                        <span className="text-stone-300">&bull;</span>
                        <span className="text-stone-600 flex items-center gap-1 text-xs sm:text-sm">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          {exp.location}
                        </span>
                        <span className="text-stone-300">&bull;</span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-stone-100 text-stone-700 border border-stone-200">
                          {exp.workMode}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-rose-50 text-rose-800 border border-rose-200">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start lg:self-auto text-xs sm:text-sm font-mono text-stone-700 bg-white/90 px-3.5 py-2 rounded-xl border border-[#e7d8ce] shadow-xs">
                      <Calendar className="w-4 h-4 text-rose-700" />
                      <span className="font-semibold">{exp.period}</span>
                    </div>
                  </div>

                  {/* Deliverables & Key Contributions */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                      <span>Key Responsibilities &amp; Engineering Contributions</span>
                    </div>
                    <ul className="space-y-2.5">
                      {exp.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-rose-700 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Live Apps in Production */}
                  {exp.liveApps && exp.liveApps.length > 0 && (
                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-rose-600/10 text-rose-700 flex items-center justify-center flex-shrink-0">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-rose-900 font-bold">
                            Live Apps in Production
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Engineered and published to Google Play / Enterprise stores
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {exp.liveApps.map((app, aIdx) => (
                          <span
                            key={aIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-300/80 text-xs font-bold text-stone-900 shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technology Tags */}
                  <div className="pt-4 border-t border-[#e7d8ce] flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-stone-500 font-semibold mr-1.5">
                      Tech Ecosystem:
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono bg-white/90 text-stone-700 hover:text-stone-950 border border-[#e7d8ce] px-2.5 py-1 rounded-lg shadow-2xs transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
