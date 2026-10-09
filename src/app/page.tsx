import React from "react";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import TerminalSection from "@/components/TerminalSection";
import EducationExperience from "@/components/EducationExperience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbf7f4] text-stone-900 flex flex-col selection:bg-rose-200 selection:text-stone-900">
      {/* Global Scroll Progress Bar */}
      <ScrollProgress />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <TerminalSection />
        <EducationExperience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
