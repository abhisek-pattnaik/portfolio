"use client";

import React, { useState, useMemo } from "react";
import { 
  Code, 
  Layout, 
  Smartphone, 
  Server, 
  Database, 
  Sparkles, 
  Search, 
  Check, 
  Cpu 
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.category)];

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map((cat) => {
      const matchesCategory = selectedCategory === "All" || cat.category === selectedCategory;
      if (!matchesCategory) return null;

      const filteredSkills = cat.skills.filter((skill) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          skill.name.toLowerCase().includes(query) ||
          skill.tags.some((t) => t.toLowerCase().includes(query))
        );
      });

      if (filteredSkills.length === 0) return null;

      return {
        ...cat,
        skills: filteredSkills,
      };
    }).filter(Boolean) as typeof SKILL_CATEGORIES;
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return Layout;
      case "Smartphone":
        return Smartphone;
      case "Server":
        return Server;
      case "Database":
        return Database;
      default:
        return Code;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#fbf7f4] border-t border-[#e7d8ce]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-300/50 text-rose-700 text-xs font-mono tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Skills &amp; <span className="font-serif italic font-normal text-rose-800">Tech Matrix</span>
          </h2>
          <p className="text-stone-600 max-w-2xl text-base sm:text-lg">
            A comprehensive overview of the modern languages, frameworks, databases, and architectural tools I use in daily production.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#e7d8ce]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-stone-900 text-white font-bold shadow-md shadow-stone-900/10"
                      : "bg-white/80 text-stone-600 hover:text-stone-900 hover:bg-white border border-[#e7d8ce]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech, skill, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/90 border border-[#e7d8ce] rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-800 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-900"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((catGroup, idx) => {
            const Icon = getCategoryIcon(catGroup.iconName);
            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-300/40 flex items-center justify-center text-rose-700">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-stone-950 tracking-tight">
                          {catGroup.category}
                        </h3>
                        <p className="text-xs text-stone-500">{catGroup.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skill Items */}
                <div className="space-y-4">
                  {catGroup.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl bg-white/70 border border-[#e7d8ce] hover:border-stone-400 transition-colors space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-stone-900">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-300/60 text-rose-700">
                              Core
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-stone-500 font-medium">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-stone-200/80 h-2 rounded-full overflow-hidden p-[1px] border border-[#e7d8ce]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-stone-900 via-stone-700 to-rose-700 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {skill.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono bg-stone-100/90 text-stone-600 px-2 py-0.5 rounded-md border border-[#e7d8ce]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <p className="text-stone-500 text-sm">No skills found matching &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs text-rose-700 underline font-mono"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
