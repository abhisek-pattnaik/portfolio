"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Code2, 
  Menu, 
  X, 
  FileDown, 
  ArrowUpRight, 
  Terminal, 
  Layers, 
  User, 
  Mail, 
  GraduationCap 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["about", "skills", "experience", "projects", "terminal", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "CLI Terminal", href: "#terminal", id: "terminal" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#fbf7f4]/85 backdrop-blur-xl border-b border-[#e7d8ce] shadow-sm py-3 text-stone-900"
          : "bg-transparent py-5 text-stone-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="#"
            className="group flex items-center gap-2.5 transition-transform hover:scale-105 select-none"
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm shadow-sm bg-stone-900 text-white">
              A
            </div>
            <div>
              <div className="font-bold text-base tracking-tight flex items-center gap-1 text-stone-950">
                {PERSONAL_INFO.name}
                <span className="font-serif italic text-xs text-rose-800">.studio</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links with animated sliding pill */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-3 py-1.5 backdrop-blur-md transition-colors bg-white/80 border border-[#e7d8ce] shadow-sm text-stone-800">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-stone-700 hover:text-stone-950 hover:bg-stone-100/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-stone-900 rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="text-xs font-semibold px-4 py-2 rounded-full transition-colors text-stone-700 hover:text-stone-950 hover:bg-white/80"
            >
              Contact
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={PERSONAL_INFO.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full shadow-sm transition-colors bg-stone-900 text-white hover:bg-stone-800"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PERSONAL_INFO.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-stone-800 bg-white border border-[#e7d8ce] rounded-xl shadow-sm"
              title="Resume"
            >
              <FileDown className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:text-stone-950 bg-white border border-[#e7d8ce] rounded-xl focus:outline-none shadow-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#fbf7f4]/95 border-b border-[#e7d8ce] backdrop-blur-2xl px-6 py-6"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium text-stone-700 hover:text-stone-950 hover:bg-white border border-transparent hover:border-[#e7d8ce] transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400" />
                </a>
              ))}
              <div className="pt-4 border-t border-[#e7d8ce] flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-stone-900 text-white font-medium text-sm shadow-md hover:bg-stone-800 transition-colors"
                >
                  Get In Touch
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
