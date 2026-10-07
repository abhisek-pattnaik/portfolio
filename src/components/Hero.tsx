"use client";

import React from "react";
import { Globe, BarChart2 } from "lucide-react";
import UnseenDreamscapeCanvas from "./UnseenDreamscapeCanvas";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-between items-center overflow-hidden pt-28 pb-10 px-4 sm:px-8 select-none"
    >
      {/* Fullscreen 3D Architectural Water Dreamscape Canvas */}
      <UnseenDreamscapeCanvas />

      {/* Top Spacer for Navigation Bar */}
      <div className="w-full h-6 pointer-events-none relative z-10" />

      {/* Centered Editorial Composition matching Unseen Studio */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto pointer-events-none">
        {/* Top Subtitle */}
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-stone-800/80 font-semibold mb-3 sm:mb-4 drop-shadow-sm">
          A BRAND, DIGITAL &amp; FULL STACK STUDIO
        </p>

        {/* Headline: "Creating the" (Serif Italic) + "unexpected" (Bold Sans) */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[106px] leading-[0.92] tracking-tight text-stone-950 drop-shadow-sm">
          <span className="font-serif italic text-stone-900/95 font-normal block sm:inline pr-2 sm:pr-3">
            Creating the
          </span>
          <span className="font-sans font-black tracking-tighter text-stone-950 block sm:inline">
            unexpected
          </span>
        </h1>

        {/* Centered Floating Pill Button ("View our work ↘") */}
        <div className="mt-8 sm:mt-11 pointer-events-auto">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white/95 hover:bg-white text-stone-950 shadow-xl shadow-stone-950/15 border border-stone-200/80 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-2xl"
          >
            <span className="font-sans">View our work</span>
            <span className="text-base font-mono group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200">
              ↘
            </span>
          </a>
        </div>
      </div>

      {/* Floating Bottom Bar over Water matching Unseen Studio */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between relative z-10 text-xs font-mono text-stone-800 pointer-events-auto px-2">
        {/* Left Bottom Pills */}
        <div className="flex items-center gap-2.5">
          <a
            href="#about"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-md text-stone-900 hover:bg-white transition-all hover:scale-105"
            title="Overview & Architecture"
          >
            <BarChart2 className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-md text-[11px] font-sans font-semibold text-stone-900 hover:bg-white transition-all hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for Projects</span>
          </a>
        </div>

        {/* Center Globe Pill */}
        <a
          href="#terminal"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-md text-stone-900 hover:bg-white transition-all hover:scale-110 hover:shadow-lg"
          title="Launch Interactive Terminal"
        >
          <Globe className="w-4 h-4 text-stone-900" />
        </a>

        {/* Right Copyright */}
        <div className="text-[11px] font-mono font-semibold text-stone-800/90 tracking-wider">
          ©2026
        </div>
      </div>
    </section>
  );
}
