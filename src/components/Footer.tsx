"use client";

import React from "react";
import { ArrowUp, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f2e8e1] border-t border-[#e7d8ce] py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#e7d8ce]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center font-mono font-bold text-white shadow-sm">
                A
              </div>
              <span className="font-bold text-stone-950 text-lg tracking-tight">
                {PERSONAL_INFO.fullName}
                <span className="text-rose-800 font-serif italic text-sm ml-1">portfolio</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed">
              Full Stack Developer specializing in high-performance web applications, fluid cross-platform mobile apps, and robust backend architectures.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
              <span>Available for high-impact roles &amp; consulting</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-900 font-semibold">
                Explore
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                <li>
                  <a href="#about" className="hover:text-stone-950 transition-colors">
                    About Journey
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-stone-950 transition-colors">
                    Skills Matrix
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-stone-950 transition-colors">
                    Work Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-stone-950 transition-colors">
                    Featured Work
                  </a>
                </li>
                <li>
                  <a href="#terminal" className="hover:text-stone-950 transition-colors">
                    CLI Terminal
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-900 font-semibold">
                Credentials
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                <li>
                  <a href="#education" className="hover:text-stone-950 transition-colors">
                    MCA (Ongoing)
                  </a>
                </li>
                <li>
                  <a href="#education" className="hover:text-stone-950 transition-colors">
                    BCA (75% Score)
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-stone-950 transition-colors">
                    Get in Touch
                  </a>
                </li>
                <li>
                  <a
                    href={PERSONAL_INFO.socials.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-rose-800 hover:text-rose-950 font-medium transition-colors group"
                  >
                    <span>Resume (PDF)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-900 font-semibold">
              Connect Channels
            </div>
            <div className="flex items-center gap-2.5">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/80 border border-[#e7d8ce] flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-white transition-colors shadow-sm"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/80 border border-[#e7d8ce] flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-white transition-colors shadow-sm"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${PERSONAL_INFO.socials.email}`}
                className="w-9 h-9 rounded-xl bg-white/80 border border-[#e7d8ce] flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-white transition-colors shadow-sm"
                title="Email Me"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>

            <p className="text-[11px] text-stone-500 font-mono">
              Designed with Next.js 16, Three.js 3D WebGL, TypeScript &amp; Tailwind CSS.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.
          </div>

          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950 border border-[#e7d8ce] transition-colors font-mono text-[11px] shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-stone-900" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
