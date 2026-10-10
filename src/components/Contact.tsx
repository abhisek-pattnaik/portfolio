"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  Mail, 
  Send, 
  MessageSquare, 
  Check, 
  Copy, 
  Sparkles, 
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full Stack Development Inquiry",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(PERSONAL_INFO.socials.email).catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the email silently in the background using Web3Forms
      const WEB3FORMS_ACCESS_KEY = "db544908-d00e-473c-a019-43bde0582029"; 
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name ? `${formData.name} (Portfolio)` : "Portfolio Inquiry",
          replyto: formData.email,
        }),
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit form");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#06b6d4", "#8b5cf6", "#10b981", "#ffffff"],
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSubmitting(false);
      // Fallback to mailto if the fetch fails or if key is missing
      window.location.href = `mailto:abhisekpattnaik04@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#fbf7f4] border-t border-[#e7d8ce]">
      {/* Ambient warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-200/25 blur-[160px] rounded-full pointer-events-none" />

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
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Let&apos;s Build <span className="font-serif italic font-normal text-rose-800">Something Extraordinary</span>
          </h2>
          <p className="text-stone-600 max-w-2xl text-base sm:text-lg">
            Have a project in mind, need high-throughput APIs, or looking to add a dedicated full stack developer to your team? Let&apos;s talk.
          </p>
        </motion.div>

        {/* Horizontal Direct Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10"
        >
          {/* Card 1: Copy Email Card */}
          <div className="glass-panel rounded-2xl p-5 border border-[#e7d8ce] hover:border-stone-400/60 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-300/40 flex items-center justify-center text-rose-700">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-rose-100/80 text-rose-800 border border-rose-200">
                  PRIMARY
                </span>
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
                  Direct Email
                </div>
                <div 
                  className="font-mono text-xs sm:text-sm font-semibold text-stone-900 truncate mt-0.5"
                  title={PERSONAL_INFO.socials.email}
                >
                  {PERSONAL_INFO.socials.email}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7d8ce] mt-4">
              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-stone-100/90 hover:bg-stone-200/80 text-stone-700 hover:text-stone-950 transition-colors text-xs font-mono font-medium"
              >
                {copiedEmail ? (
                  <>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied to Clipboard!
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-stone-600">Click to copy</span>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: LinkedIn Profile */}
          <motion.a
            whileHover={{ y: -4 }}
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-2xl p-5 border border-[#e7d8ce] hover:border-blue-400/60 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-300/40 flex items-center justify-center text-blue-600">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
                  Professional Network
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5">
                  LinkedIn Profile
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7d8ce] mt-4 flex items-center justify-between text-xs font-mono text-stone-600 group-hover:text-blue-700 transition-colors">
              <span>Connect &amp; Message</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          {/* Card 3: GitHub Codebase */}
          <motion.a
            whileHover={{ y: -4 }}
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-2xl p-5 border border-[#e7d8ce] hover:border-stone-500/60 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-stone-900/10 border border-stone-300/50 flex items-center justify-center text-stone-800">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
                  Source Code &amp; Repos
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5">
                  @abhisek-pattnaik
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7d8ce] mt-4 flex items-center justify-between text-xs font-mono text-stone-600 group-hover:text-stone-950 transition-colors">
              <span>Explore Codebase</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          {/* Card 4: WhatsApp / Instant Chat */}
          <motion.a
            whileHover={{ y: -4 }}
            href={PERSONAL_INFO.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-2xl p-5 border border-[#e7d8ce] hover:border-emerald-400/60 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-300/40 flex items-center justify-center text-emerald-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  AVAILABLE
                </span>
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
                  Direct Messaging
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5">
                  Chat via WhatsApp
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7d8ce] mt-4 flex items-center justify-between text-xs font-mono text-stone-600 group-hover:text-emerald-700 transition-colors">
              <span>Instant Chat</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </motion.div>

        {/* Message Form Card Below */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-sm border border-[#e7d8ce]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#e7d8ce] gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-700 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-950">Send a Detailed Message</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Fill in your requirements and I will get back to you promptly within 24 hours.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-stone-600 bg-white/80 px-3 py-1.5 rounded-xl border border-[#e7d8ce] self-start sm:self-auto shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Encrypted Dispatch</span>
              </div>
            </div>

            {isSuccess ? (
              <div className="p-8 sm:p-12 rounded-2xl bg-white/90 border border-emerald-400 text-center space-y-4 animate-in zoom-in-95 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-stone-950">Message Transmitted!</h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {formData.name || "friend"}. Your message has been received and I will review your requirements right away.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "Full Stack Development Inquiry",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 text-xs font-semibold text-white hover:bg-stone-800 transition-colors shadow-sm"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-700 font-semibold">
                      Your Name <span className="text-rose-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/90 border border-[#e7d8ce] focus:border-stone-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-700 font-semibold">
                      Your Email <span className="text-rose-700">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/90 border border-[#e7d8ce] focus:border-stone-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-stone-700 font-semibold">Subject / Scope</label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-white/90 border border-[#e7d8ce] focus:border-stone-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none transition-colors shadow-sm cursor-pointer"
                  >
                    <option value="Full Stack Development Inquiry">
                      Full Stack Development Project (Web / Mobile / Backend)
                    </option>
                    <option value="Full-time / Contract Role Offer">
                      Full-Time or Contract Role Opportunity
                    </option>
                    <option value="Fintech Architecture Consultation">
                      Fintech / Payment Architecture Consultation
                    </option>
                    <option value="Salon Booking SaaS Platform Inquiry">
                      Salon / Booking SaaS Inquiry
                    </option>
                    <option value="General Collaboration">General Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-stone-700 font-semibold">
                    Message &amp; Project Details <span className="text-rose-700">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your product, timeline, tech requirements, or goals..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white/90 border border-[#e7d8ce] focus:border-stone-800 rounded-xl p-4 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-colors resize-none shadow-sm"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] font-mono text-stone-500 flex items-center gap-1.5 order-2 sm:order-1">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                    <span>Response guaranteed within 24h &bull; No spam</span>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-semibold text-sm text-white bg-stone-900 hover:bg-stone-800 shadow-md shadow-stone-900/10 transition-colors disabled:opacity-50 cursor-pointer order-1 sm:order-2"
                  >
                    {isSubmitting ? (
                      <span>Sending payload...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
