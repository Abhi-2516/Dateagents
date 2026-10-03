"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, RotateCcw, Sparkles, ExternalLink, Bot, Swords, Trophy, ShieldCheck, ArrowRight, Video } from "lucide-react";

const PHASES = [
  { id: 1, title: "0:00 - 0:15 | Landing & Concept", start: 0, duration: 15 },
  { id: 2, title: "0:15 - 0:35 | 25 People Grid", start: 15, duration: 20 },
  { id: 3, title: "0:35 - 0:55 | Source Evidence Profile", start: 35, duration: 20 },
  { id: 4, title: "0:55 - 1:45 | Main Event: Agent Date", start: 55, duration: 50 },
  { id: 5, title: "1:45 - 2:05 | Multi-Date Highlight Reel", start: 115, duration: 20 },
  { id: 6, title: "2:05 - 2:40 | Personalised Rankings", start: 135, duration: 35 },
  { id: 7, title: "2:40 - 3:00 | Architecture & CTA", start: 170, duration: 10 }
];

export default function VideoDemoPage() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePhase, setActivePhase] = useState<number>(1);
  const [people, setPeople] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/people")
      .then(res => res.json())
      .then(d => { if (d.success) setPeople(d.data || []); });
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 180) {
            setIsPlaying(false);
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    // Automatically match phase to current seconds
    const current = PHASES.find(p => seconds >= p.start && seconds < p.start + p.duration);
    if (current && current.id !== activePhase) {
      setActivePhase(current.id);
    }
  }, [seconds, activePhase]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const jumpToPhase = (phaseId: number) => {
    const target = PHASES.find(p => p.id === phaseId);
    if (target) {
      setSeconds(target.start);
      setActivePhase(phaseId);
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* RECORDING CONTROL BAR */}
      <div className="sticky top-16 z-40 glass-card p-4 rounded-2xl border border-purple-500/30 bg-slate-950/90 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-mono font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            REC TIMELINE
          </div>
          <span className="text-2xl font-mono font-extrabold text-white">
            {formatTime(seconds)} <span className="text-xs text-gray-400 font-sans font-normal">/ 3:00</span>
          </span>
        </div>

        {/* Phase Buttons */}
        <div className="flex flex-wrap items-center gap-1 overflow-x-auto">
          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => jumpToPhase(p.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activePhase === p.id
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                  : "bg-gray-900/80 text-gray-300 hover:bg-gray-800"
              }`}
            >
              Phase {p.id}
            </button>
          ))}
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-md transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? "Pause" : "Play Reel"}</span>
          </button>

          <button
            onClick={() => { setSeconds(0); setIsPlaying(false); setActivePhase(1); }}
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DYNAMIC PRESENTATION PHASES */}
      <div className="min-h-[550px] flex flex-col justify-center">
        {/* PHASE 1: 0:00 - 0:15 LANDING */}
        {activePhase === 1 && (
          <div className="text-center py-16 space-y-8 glass-card p-10 rounded-3xl border border-pink-500/30 bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-950 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 fill-pink-400" />
              <span>DATEAGENTS DEMO PRESENTATION</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-none">
              25 PEOPLE. <br />
              25 AGENTS. <br />
              <span className="gradient-text">ONE QUESTION:</span>
            </h1>

            <p className="text-2xl sm:text-3xl text-pink-300 font-semibold max-w-2xl mx-auto">
              WHO WOULD THEIR AGENTS CHOOSE?
            </p>

            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              Public LinkedIn + Instagram profiles → AI Profile Intelligence → Dynamic LLM Agent Dates → Deterministic Rankings
            </p>
          </div>
        )}

        {/* PHASE 2: 0:15 - 0:35 25 PEOPLE GRID */}
        {activePhase === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">0:15 - 0:35 | 25 REAL PUBLIC PEOPLE</span>
              <h2 className="text-3xl font-extrabold text-white">Scraped Public Profiles</h2>
              <p className="text-xs text-gray-400">Strictly 2 public sources per person: LinkedIn & Instagram</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {people.slice(0, 25).map((p) => (
                <div key={p.id} className="glass-card p-3 rounded-xl border border-gray-800 space-y-2">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-html-element-suppression */}
                    <img src={p.profileImage} alt={p.name} className="w-9 h-9 rounded-full object-cover border border-pink-500/30 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-xs truncate">{p.name}</h4>
                      <span className="text-[10px] text-gray-400 line-clamp-1">{p.headline}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 pt-1 border-t border-gray-800">
                    <span className="text-blue-400">LinkedIn</span>
                    <span className="text-pink-400">Instagram</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 3: 0:35 - 0:55 SOURCE EVIDENCE PROFILE */}
        {activePhase === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">0:35 - 0:55 | DEEP PROFILE & EVIDENCE PROVENANCE</span>
              <h2 className="text-3xl font-extrabold text-white">Sam Altman — AI Profile Dashboard</h2>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-pink-500/20 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" alt="Sam Altman" className="w-14 h-14 rounded-full border-2 border-pink-500" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Sam Altman</h3>
                    <p className="text-xs text-gray-400">CEO at OpenAI | Former President Y Combinator</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 text-xs font-semibold">LinkedIn Verified</span>
                  <span className="px-3 py-1 rounded-md bg-pink-500/20 text-pink-400 text-xs font-semibold">Instagram Verified</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-pink-400 uppercase tracking-wider">Extracted Interests & Hobbies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Artificial Intelligence", "AGI Safety", "Compute Infrastructure", "Nuclear Energy", "Reading Hard Sci-Fi", "Vintage Restoration"].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-gray-800 text-xs text-gray-200 border border-gray-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-cyan-400 uppercase tracking-wider">Source Evidence Provenance</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                      <span className="font-bold text-white block">Claim: AGI & Compute Infrastructure Leadership</span>
                      <p className="text-gray-400">LinkedIn: &ldquo;Explicitly states CEO at OpenAI and former President of Y Combinator.&rdquo;</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                      <span className="font-bold text-white block">Claim: Outdoor hiking & reflective reading</span>
                      <p className="text-gray-400">Instagram: &ldquo;Posts highlight Northern California nature walks and blog reflections.&rdquo;</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 4: 0:55 - 1:45 MAIN EVENT AGENT DATE */}
        {activePhase === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">0:55 - 1:45 | LIVE AGENT-TO-AGENT DATING ARENA</span>
              <h2 className="text-3xl font-extrabold text-white">Sam Altman&apos;s Agent ↔ Andrej Karpathy&apos;s Agent</h2>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-pink-500/30 space-y-6 bg-slate-950/90">
              <div className="grid md:grid-cols-2 gap-4 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center">A</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Sam Altman&apos;s Agent</h4>
                    <p className="text-xs text-gray-400">Style: Direct, futuristic, concise</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <div className="text-right">
                    <h4 className="font-bold text-white text-sm">Andrej Karpathy&apos;s Agent</h4>
                    <p className="text-xs text-gray-400">Style: Enthusiastic, first-principles educator</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center">B</div>
                </div>
              </div>

              {/* Dynamic Transcript Stream */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-xs space-y-1">
                  <span className="font-semibold text-pink-400">Sam Altman&apos;s Agent:</span>
                  <p className="text-gray-200">&ldquo;Hey Andrej! It&apos;s great to connect. I noticed your strong focus on Neural Networks and AI education. What part of that problem space gets you most excited right now?&rdquo;</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-xs space-y-1 text-right">
                  <span className="font-semibold text-cyan-400">Andrej Karpathy&apos;s Agent:</span>
                  <p className="text-gray-200">&ldquo;Thanks Sam! For me, it&apos;s taking complex deep learning concepts and building micro-grad tutorials from scratch. Taking AI education to first principles!&rdquo;</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                    ✨ Shared interest discovered: First-Principles AI Education
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-xs space-y-1">
                  <span className="font-semibold text-pink-400">Sam Altman&apos;s Agent:</span>
                  <p className="text-gray-200">&ldquo;That resonates deeply! I find that resetting outdoors in California nature gives me fresh clarity for deep compute problems. Do you have a favorite ritual for unwinding?&rdquo;</p>
                </div>
              </div>

              {/* Score Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-300 font-semibold block">Post-Date Evaluation Result</span>
                  <span className="text-xs text-pink-300">Connected over first-principles innovation and outdoor work-life rhythm</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold gradient-text">89%</span>
                  <span className="block text-[10px] text-gray-400 font-mono">COMPATIBILITY</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 5: 1:45 - 2:05 MULTI-DATE HIGHLIGHT REEL */}
        {activePhase === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">1:45 - 2:05 | MULTI-AGENT DATE HIGHLIGHT REEL</span>
              <h2 className="text-3xl font-extrabold text-white">Diverse Agent-to-Agent Sessions</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { pair: "Marques Brownlee ↔ Brian Chesky", score: "88%", topic: "Design Craftsmanship & Minimalist Aesthetics", bg: "from-pink-500/10 to-purple-500/10 border-pink-500/30" },
                { pair: "Alexis Ohanian ↔ Sara Blakely", score: "91%", topic: "Entrepreneurship, Humor & Family First", bg: "from-purple-500/10 to-cyan-500/10 border-purple-500/30" },
                { pair: "Lex Fridman ↔ Vitalik Buterin", score: "86%", topic: "Philosophy, Cryptography & Green Tea", bg: "from-cyan-500/10 to-emerald-500/10 border-cyan-500/30" }
              ].map((item, idx) => (
                <div key={idx} className={`glass-card p-5 rounded-2xl border bg-gradient-to-b ${item.bg} space-y-3`}>
                  <h4 className="font-bold text-white text-sm">{item.pair}</h4>
                  <p className="text-xs text-gray-300">&ldquo;Connected deeply on {item.topic}.&rdquo;</p>
                  <div className="pt-2 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">Dynamic Evaluation</span>
                    <span className="text-xl font-bold text-pink-400">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 6: 2:05 - 2:40 PERSONALISED RANKINGS */}
        {activePhase === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">2:05 - 2:40 | PERSONALISED 25x25 RANKINGS</span>
              <h2 className="text-3xl font-extrabold text-white">Best Matches for Sam Altman</h2>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-pink-500/30 space-y-3">
              {[
                { rank: "#1", name: "Andrej Karpathy", score: "89%", reason: "Strong verified date chemistry over neural architectures, AI education, and first-principles." },
                { rank: "#2", name: "Patrick Collison", score: "86%", reason: "High profile alignment on Progress Studies, systems innovation, and deep reading." },
                { rank: "#3", name: "Alexis Ohanian", score: "84%", reason: "Shared interest in high-agency founder ecosystems and bold long-term venture investments." }
              ].map((match, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-gray-800 hover:border-pink-500/40 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-sm">{match.rank}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{match.name}</h4>
                      <p className="text-xs text-gray-400">{match.reason}</p>
                    </div>
                  </div>
                  <span className="text-xl font-extrabold text-pink-400 shrink-0 ml-4">{match.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 7: 2:40 - 3:00 ARCHITECTURE & CTA */}
        {activePhase === 7 && (
          <div className="text-center py-12 space-y-8 glass-card p-8 rounded-3xl border border-pink-500/30 bg-slate-950 animate-fadeIn">
            <h2 className="text-3xl font-extrabold text-white">End-to-End Architecture</h2>

            <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-mono">
              <span className="px-3 py-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">LINKEDIN + INSTAGRAM</span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <span className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">APIFY SCRAPER</span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <span className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI PROFILE</span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <span className="px-3 py-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">DATING AGENT</span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <span className="px-3 py-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">AGENT DATE</span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <span className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">RANKINGS</span>
            </div>

            <div className="pt-4">
              <Link
                href="/people/add"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-extrabold text-lg shadow-xl shadow-pink-500/30 hover:scale-105 transition-all"
              >
                <span>Bring Your Own LinkedIn + Instagram</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
