"use client";

import React from "react";
import { 
  User, 
  MapPin, 
  Briefcase, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Workflow
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function About() {
  const cubicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const philosophies = [
    {
      icon: Cpu,
      title: "End-to-End System Ownership",
      description:
        "I don't just write frontend code or isolated API handlers. I architect the entire journey: from responsive mobile/web screens, across secure authenticated gateways, down to normalized database tables and background queues.",
      color: "text-cyan-600",
      bg: "bg-cyan-50 border-cyan-200",
    },
    {
      icon: ShieldCheck,
      title: "Fintech & Mission-Critical Reliability",
      description:
        "Having built production fintech platforms (Spay India, Prayaspe, Spay MD) handling biometric transactions and retail cash flows, I design with idempotency, cryptographic signatures, and failover resilience in mind.",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200",
    },
    {
      icon: Zap,
      title: "Performance & Low-Latency First",
      description:
        "Every millisecond matters. Whether tuning Next.js SSR hydration, managing 60fps Flutter widget trees, or caching hot queries in Redis with FastAPI, I obsess over snappiness and sub-second response times.",
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-200",
    },
    {
      icon: Workflow,
      title: "Clean APIs & Extensible Architectures",
      description:
        "I treat APIs as contracts. Whether interfacing with third-party payment gateways, bank switches, or IoT soundboxes, I write self-documenting OpenAPI specs and strongly-typed payloads with Pydantic & TypeScript.",
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-200",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: cubicEase,
      },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#fbf7f4] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-800 text-xs font-mono tracking-wider uppercase">
            <User className="w-3.5 h-3.5" />
            <span>Engineering Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            About <span className="font-serif italic text-rose-900/90 font-normal">Me &amp; My Craft</span>
          </h2>
          <p className="text-stone-600 max-w-2xl text-base sm:text-lg">
            Engineering end-to-end digital solutions that bridge polished user experience with bulletproof backend logic.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Bio & Quick Facts Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Developer Identity Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-lg shadow-stone-900/5 transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-stone-900 via-rose-700 to-amber-700 p-[2px] shadow-md flex-shrink-0">
                  <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center font-mono font-bold text-2xl text-rose-100">
                    AB
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-950 flex items-center gap-2">
                    {PERSONAL_INFO.fullName}
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active & Ready" />
                  </h3>
                  <p className="text-sm font-mono text-rose-700 font-medium">{PERSONAL_INFO.title}</p>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{PERSONAL_INFO.location} • Open for Global Remote</span>
                  </p>
                </div>
              </div>

              <div className="text-sm text-stone-700 leading-relaxed space-y-3 pt-2 border-t border-stone-200/90">
                <p>
                  I am a full stack software engineer who takes immense pride in delivering complete, production-grade applications.
                  My background spans across designing responsive, accessible web portals in <strong className="text-stone-950">Next.js &amp; React</strong>, high-performance cross-platform mobile apps in <strong className="text-stone-950">Flutter &amp; Kotlin</strong>, and secure, high-throughput APIs in <strong className="text-stone-950">FastAPI &amp; C# / .NET</strong>.
                </p>
                <p>
                  Currently, I am deep into engineering a full-suite <strong className="text-rose-800">Salon &amp; Spa SaaS platform</strong> featuring real-time appointment locking and automated notifications, while continuously maintaining and improving high-velocity <strong className="text-emerald-800">fintech payment systems</strong>.
                </p>
              </div>

              {/* Quick Details Badges */}
              <div className="pt-4 border-t border-stone-200/90 space-y-2.5">
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-stone-500 font-mono">Current Focus:</span>
                  <span className="text-stone-900 font-semibold">Fintech, SaaS &amp; Mobile Booking</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-stone-500 font-mono">Education:</span>
                  <span className="text-stone-900 font-semibold">MCA (Manipal) • BCA 75%</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-stone-500 font-mono">Availability:</span>
                  <span className="text-emerald-700 font-semibold">Full-time, Contract, Freelance</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide transition-colors shadow-md"
                >
                  <Briefcase className="w-3.5 h-3.5 text-rose-300" />
                  <span>Discuss a Project or Role</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Engineering Philosophies */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {philosophies.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.bg}`}
                    >
                      <IconComponent className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h4 className="text-base font-bold text-stone-950 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-mono text-stone-500">
                    <span>STANDARD 0{idx + 1}</span>
                    <span className="text-stone-700 font-medium">Strict Quality</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
