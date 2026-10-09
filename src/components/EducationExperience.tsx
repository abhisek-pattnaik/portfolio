"use client";

import React from "react";
import { GraduationCap, Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { EDUCATION_DATA, EXPERIENCE_MILESTONES } from "@/data/portfolioData";

export default function EducationExperience() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#f5ede7] border-t border-[#e7d8ce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-300/50 text-rose-700 text-xs font-mono tracking-wider uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Credentials &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Education &amp; <span className="font-serif italic font-normal text-rose-800">Track Record</span>
          </h2>
          <p className="text-stone-600 max-w-2xl text-base sm:text-lg">
            Academic computer science grounding paired with real-world production system implementations.
          </p>
        </motion.div>

        {/* Two-column layout: Education on left, Experience/Milestones on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Education Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 pb-2 border-b border-[#e7d8ce]"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-300/40 flex items-center justify-center text-rose-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-950">Academic Degrees</h3>
                <p className="text-xs text-stone-500">Formal computer science foundation</p>
              </div>
            </motion.div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-rose-400 before:via-stone-300 before:to-transparent">
              {EDUCATION_DATA.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="relative pl-12 group"
                >
                  {/* Timeline node icon */}
                  <div className="absolute left-3 -translate-x-1/2 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-stone-800 flex items-center justify-center shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-700 animate-pulse" />
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="glass-panel rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/10 text-rose-800 border border-rose-300/60">
                        {edu.scoreOrStatus}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-rose-800 transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-700 font-medium mt-0.5">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{edu.location}</span>
                      </p>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-[#e7d8ce]">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs text-stone-600 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-700 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Practical Track Record / Experience Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 pb-2 border-b border-[#e7d8ce]"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-800">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-950">Engineering Deliveries</h3>
                <p className="text-xs text-stone-500">Real-world production environments</p>
              </div>
            </motion.div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-stone-600 before:via-stone-300 before:to-transparent">
              {EXPERIENCE_MILESTONES.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="relative pl-12 group"
                >
                  {/* Timeline node */}
                  <div className="absolute left-3 -translate-x-1/2 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-stone-800 flex items-center justify-center shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="glass-panel rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-stone-100 text-stone-800 border border-stone-300">
                        {exp.type}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {exp.period}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-rose-800 transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-700 font-medium">
                        {exp.companyOrDomain}
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-[#e7d8ce]">
                      {exp.deliverables.map((d, dIdx) => (
                        <div key={dIdx} className="text-xs text-stone-700 flex items-start gap-2">
                          <span className="text-rose-700 font-bold">•</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono bg-white/90 text-stone-700 border border-[#e7d8ce] px-2 py-0.5 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
