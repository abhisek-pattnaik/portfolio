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
  PhoneCall, 
  ExternalLink
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/25 blur-[150px] rounded-full pointer-events-none" />

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct channels & Quick Connect */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-stone-950">Direct Channels</h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Fastest response within 24 hours.
                </p>
              </div>

              {/* Copy Email Card */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#e7d8ce] space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span>EMAIL ADDRESS</span>
                  <span className="text-rose-700 font-semibold">Primary</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-mono text-sm sm:text-base text-stone-900 font-medium truncate">
                    {PERSONAL_INFO.socials.email}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 transition-colors flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
                {copiedEmail && (
                  <p className="text-[11px] font-mono text-emerald-700 animate-in fade-in">
                    ✓ Email copied to clipboard!
                  </p>
                )}
              </div>
              {/* Social Channels */}
              <div className="pt-4 border-t border-[#e7d8ce] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">
                  Connect &amp; Follow
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 hover:bg-stone-100 border border-[#e7d8ce] text-xs font-medium text-stone-700 hover:text-stone-950 transition-colors shadow-sm"
                  >
                    <GithubIcon className="w-4 h-4 text-stone-600" />
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 hover:bg-stone-100 border border-[#e7d8ce] text-xs font-medium text-stone-700 hover:text-stone-950 transition-colors shadow-sm"
                  >
                    <LinkedinIcon className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-stone-950">Send a Message</h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Fill in your requirements and I will get back to you promptly.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-white/90 border border-emerald-400 text-center space-y-4 animate-in zoom-in-95 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-stone-950">Message Transmitted!</h4>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    Thank you for reaching out, {formData.name || "friend"}. I have received your note and will review your requirements right away.
                  </p>
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
                    className="px-6 py-2.5 rounded-xl bg-stone-900 text-xs font-semibold text-white hover:bg-stone-800 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full bg-white/90 border border-[#e7d8ce] focus:border-stone-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none transition-colors shadow-sm"
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

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white bg-stone-900 hover:bg-stone-800 shadow-md shadow-stone-900/10 transition-colors disabled:opacity-50"
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
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
