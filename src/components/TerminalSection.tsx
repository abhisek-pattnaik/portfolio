"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from "@/data/portfolioData";

interface OutputLine {
  id: string;
  type: "command" | "response" | "system" | "success" | "error";
  text: string | React.ReactNode;
}

export default function TerminalSection() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "⚡ Abhisek CLI v2.4 (x86_64-pc-linux-gnu)",
    },
    {
      id: "init-2",
      type: "system",
      text: "Type 'help' to view available commands or try 'cat about', 'skills', 'projects', 'sudo hire'.",
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Prevent scrolling to the terminal on website initial load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Scroll only the terminal's internal log container, never the entire page
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const newOutputs: OutputLine[] = [
      {
        id: Math.random().toString(),
        type: "command",
        text: `abhisek@portfolio:~$ ${cmd}`,
      },
    ];

    switch (trimmed) {
      case "help":
        newOutputs.push({
          id: Math.random().toString(),
          type: "response",
          text: (
            <div className="space-y-1 font-mono text-xs">
              <div className="text-cyan-400 font-bold">AVAILABLE COMMANDS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
                <div><span className="text-emerald-400 font-semibold">about</span> | <span className="text-emerald-400 font-semibold">whoami</span> : Developer background &amp; role</div>
                <div><span className="text-emerald-400 font-semibold">skills</span> : Full-stack technical capabilities</div>
                <div><span className="text-emerald-400 font-semibold">projects</span> : Live fintech &amp; booking applications</div>
                <div><span className="text-emerald-400 font-semibold">education</span> : Academic degrees &amp; institutions</div>
                <div><span className="text-emerald-400 font-semibold">contact</span> : Email, WhatsApp &amp; socials</div>
                <div><span className="text-emerald-400 font-semibold">sudo hire</span> : Initialize instant collaboration</div>
                <div><span className="text-emerald-400 font-semibold">clear</span> : Clear console buffer</div>
              </div>
            </div>
          ),
        });
        break;

      case "whoami":
      case "about":
      case "cat about":
        newOutputs.push({
          id: Math.random().toString(),
          type: "response",
          text: (
            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="text-cyan-300 font-bold">{PERSONAL_INFO.fullName} - {PERSONAL_INFO.title}</div>
              <div>{PERSONAL_INFO.bio}</div>
              <div className="text-slate-400">Location: {PERSONAL_INFO.location} | Status: Ready for High-Impact Projects</div>
            </div>
          ),
        });
        break;

      case "skills":
      case "ls skills":
        newOutputs.push({
          id: Math.random().toString(),
          type: "response",
          text: (
            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="text-cyan-400 font-bold">PRODUCTION STACKS:</div>
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx}>
                  <span className="text-violet-400 font-semibold">[{cat.category}]</span>:{" "}
                  {cat.skills.map((s) => s.name).join(", ")}
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "projects":
      case "ls projects":
        newOutputs.push({
          id: Math.random().toString(),
          type: "response",
          text: (
            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="text-cyan-400 font-bold">PRODUCTION &amp; ACTIVE BUILDS:</div>
              {PROJECTS.map((p, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-emerald-400 font-semibold">
                      {idx + 1}. {p.title} ({p.status})
                    </span>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 underline hover:text-cyan-300 text-[11px]"
                      >
                        [open live]
                      </a>
                    )}
                  </div>
                  <span className="text-slate-400 text-[11px] pl-4">
                    Stack: {p.technologies.slice(0, 4).join(", ")} | {p.tagline}
                  </span>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "education":
        newOutputs.push({
          id: Math.random().toString(),
          type: "response",
          text: (
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <div>🎓 <strong className="text-white">MCA:</strong> Manipal University Jaipur (Ongoing)</div>
              <div>🎓 <strong className="text-white">BCA:</strong> Berhampur University (75% Distinction)</div>
            </div>
          ),
        });
        break;

      case "contact":
        newOutputs.push({
          id: Math.random().toString(),
          type: "response",
          text: (
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <div>📧 <strong className="text-white">Email:</strong> {PERSONAL_INFO.socials.email}</div>
              <div>💬 <strong className="text-white">WhatsApp:</strong> Direct link available in Contact section</div>
              <div>🔗 <strong className="text-white">GitHub:</strong> {PERSONAL_INFO.socials.github}</div>
              <div>💼 <strong className="text-white">LinkedIn:</strong> {PERSONAL_INFO.socials.linkedin}</div>
            </div>
          ),
        });
        break;

      case "sudo hire":
      case "hire":
      case "sudo hire abhisek":
        newOutputs.push({
          id: Math.random().toString(),
          type: "success",
          text: (
            <div className="space-y-1 font-mono text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-950/30 p-3 rounded-xl">
              <div className="font-bold">✓ Permission Granted: Root Level Access Initialized</div>
              <div className="text-slate-300">
                You are about to hire a relentless Full Stack Engineer who writes clean code and never ships broken builds.
              </div>
              <div className="pt-1">
                👉 Scroll down to the <a href="#contact" className="underline font-bold text-cyan-300">Contact Section</a> or email directly: <span className="text-white">{PERSONAL_INFO.socials.email}</span>
              </div>
            </div>
          ),
        });
        break;

      case "clear":
        setOutput([]);
        setInputVal("");
        return;

      default:
        newOutputs.push({
          id: Math.random().toString(),
          type: "error",
          text: `Command not found: "${cmd}". Type 'help' to see valid commands.`,
        });
        break;
    }

    setOutput((prev) => [...prev, ...newOutputs]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal("");
        }
      }
    }
  };

  return (
    <section id="terminal" className="py-20 relative overflow-hidden bg-[#fbf7f4] border-t border-[#e7d8ce]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-300/50 text-rose-700 text-xs font-mono tracking-wider uppercase">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Interactive Terminal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            Developer <span className="font-serif italic font-normal text-rose-800">CLI Shell</span>
          </h2>
          <p className="text-stone-600 max-w-xl text-sm">
            For engineers &amp; clients who prefer the command line: interact directly with my portfolio shell.
          </p>
        </motion.div>

        {/* Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => inputRef.current?.focus()}
          className="rounded-3xl border border-stone-800 bg-[#1c1917] shadow-2xl shadow-stone-900/25 overflow-hidden font-mono text-xs sm:text-sm"
        >
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-3 bg-stone-950/70 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs text-stone-400 ml-2 font-mono">
                abhisek@portfolio: ~ (bash)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-stone-400">
              <span className="hidden sm:inline">UTF-8</span>
              <span className="px-2 py-0.5 rounded bg-stone-800 text-rose-300 font-bold">
                PROD
              </span>
            </div>
          </div>

          {/* Quick command suggestion pills */}
          <div className="px-4 py-2 bg-stone-950/40 border-b border-stone-800/60 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-stone-400 flex-shrink-0">Quick run:</span>
            {["help", "about", "skills", "projects", "education", "sudo hire"].map((cmd) => (
              <motion.button
                key={cmd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(cmd);
                }}
                className="px-2.5 py-1 rounded-md bg-stone-800/90 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors flex-shrink-0 border border-stone-700/60"
              >
                {cmd}
              </motion.button>
            ))}
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalBodyRef}
            className="p-4 sm:p-6 min-h-[300px] max-h-[440px] overflow-y-auto space-y-3 text-stone-200"
          >
            {output.map((line) => (
              <div key={line.id} className="leading-relaxed">
                {line.type === "command" && (
                  <span className="text-rose-300 font-semibold">{line.text}</span>
                )}
                {line.type === "system" && (
                  <span className="text-stone-400 italic">{line.text}</span>
                )}
                {line.type === "response" && (
                  <div className="text-stone-200 mt-1">{line.text}</div>
                )}
                {line.type === "success" && (
                  <div className="text-emerald-400 mt-1">{line.text}</div>
                )}
                {line.type === "error" && (
                  <span className="text-rose-400 font-mono">{line.text}</span>
                )}
              </div>
            ))}

            {/* Live Input Prompt */}
            <div className="flex items-center gap-2 pt-1 text-stone-200">
              <span className="text-rose-300 font-semibold flex-shrink-0">
                abhisek@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help' or command..."
                className="w-full bg-transparent text-white focus:outline-none placeholder-stone-500 font-mono text-xs sm:text-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
