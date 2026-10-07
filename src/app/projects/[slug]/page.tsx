import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  Lightbulb,
  Sparkles,
  Calendar,
  Cpu
} from "lucide-react";
import { PROJECTS, PERSONAL_INFO } from "@/data/portfolioData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study by ${PERSONAL_INFO.name}`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Full Stack Case Study`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fbf7f4] text-stone-900 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-rose-200/25 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Back Button */}
          <div>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-stone-700 hover:text-stone-950 transition-colors p-2 rounded-xl bg-white/80 border border-[#e7d8ce] hover:bg-white shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Hero Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-rose-500/10 border border-rose-300/60 text-rose-800">
                {project.badge}
              </span>
              <span className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{project.status}</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
                {project.title}
              </h1>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/70 border border-emerald-300 transition-all self-start sm:self-auto flex-shrink-0 shadow-sm"
                >
                  <span>Open Live / Play Store</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal">
              {project.tagline}
            </p>
          </div>

          {/* Impact Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 text-center space-y-1 shadow-sm"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900">
                  {metric.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Problem vs Solution Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200/80 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                <ShieldAlert className="w-5 h-5" />
                <span>The Problem &amp; Architecture Challenge</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <Lightbulb className="w-5 h-5" />
                <span>The Engineered Solution</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architectural Blueprint Breakdown */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-stone-950 font-bold text-lg">
              <Layers className="w-5 h-5 text-rose-700" />
              <span>Full Stack Architectural Blueprint</span>
            </div>
            <div className="space-y-3">
              {project.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/80 border border-[#e7d8ce] text-sm text-stone-700 flex items-start gap-3 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-700 mt-2 flex-shrink-0" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features & Production Capabilities */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-stone-950 font-bold text-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Key Features Implemented</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/80 border border-[#e7d8ce] flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 shadow-sm"
                >
                  <span className="text-rose-700 font-bold">•</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results & Quantitative Impact */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-stone-950 font-bold text-lg">
              <TrendingUp className="w-5 h-5 text-stone-700" />
              <span>Production Results &amp; Quantitative Impact</span>
            </div>
            <ul className="space-y-2.5">
              {project.results.map((res, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-xl bg-white/80 border border-[#e7d8ce] text-sm text-stone-700 flex items-start gap-3 shadow-sm"
                >
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Matrix */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Technology Ecosystem
            </div>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-xl text-xs font-mono font-medium bg-white border border-[#e7d8ce] text-stone-700 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="p-8 rounded-3xl bg-[#f2e8e1] border border-[#e7d8ce] text-center space-y-4 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-950">
              Interested in Building a Similar System?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
              I can assist in architecting end-to-end applications from scratch or scaling your existing backend pipelines.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-stone-900 hover:bg-stone-800 shadow-md shadow-stone-900/10 transition-all"
              >
                <span>Get in Touch with {PERSONAL_INFO.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
