"use client";

import React from "react";
import { Globe, BarChart2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import UnseenDreamscapeCanvas from "./UnseenDreamscapeCanvas";

export default function Hero() {
  const cubicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: cubicEase,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicEase,
      },
    },
  };

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto pointer-events-none"
      >
        {/* Top Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.32em] text-stone-800/85 font-semibold mb-3 sm:mb-4 drop-shadow-sm"
        >
          A BRAND, DIGITAL &amp; FULL STACK STUDIO
        </motion.p>

        {/* Headline: "Creating the" (Serif Italic) + "unexpected" (Bold Sans) */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[106px] leading-[0.92] tracking-tight text-stone-950 drop-shadow-sm"
        >
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-stone-900/95 font-normal block sm:inline pr-2 sm:pr-3"
          >
            Creating the
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black tracking-tighter text-stone-950 block sm:inline"
          >
            unexpected
          </motion.span>
        </motion.h1>

        {/* Centered Floating Pill Button ("View our work ↘") */}
        <motion.div
          variants={buttonVariants}
          className="mt-8 sm:mt-11 pointer-events-auto"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white/95 hover:bg-white text-stone-950 shadow-xl shadow-stone-950/15 border border-stone-200/80 backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl"
          >
            <span className="font-sans">View our work</span>
            <span className="text-base font-mono group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200">
              ↘
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Floating Bottom Bar over Water */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto flex items-center justify-between relative z-10 text-xs font-mono text-stone-800 pointer-events-auto px-2"
      >
        {/* Left Bottom Pills */}
        <div className="flex items-center gap-2.5">
          <motion.a
            href="#about"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-md text-stone-900 hover:bg-white transition-colors"
            title="Overview & Architecture"
          >
            <BarChart2 className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-md text-[11px] font-sans font-semibold text-stone-900 hover:bg-white transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for Projects</span>
          </motion.a>
        </div>

        {/* Center Globe Pill */}
        <motion.a
          href="#terminal"
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-md text-stone-900 hover:bg-white transition-shadow shadow-stone-900/10"
          title="Launch Interactive Terminal"
        >
          <Globe className="w-4 h-4 text-stone-900" />
        </motion.a>

        {/* Right Copyright */}
        <div className="text-[11px] font-mono font-semibold text-stone-800/90 tracking-wider">
          ©2026
        </div>
      </motion.div>
    </section>
  );
}

