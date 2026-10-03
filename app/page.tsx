"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Bot, Swords, Trophy, ArrowRight, ShieldCheck, Zap, Database, ExternalLink, Video } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-20 py-6">
      {/* HERO SECTION */}
      <section className="relative text-center space-y-8 py-12 px-4 overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-[#090d16] border border-gray-800/80 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-purple-500/5 to-transparent pointer-events-none" />

        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 fill-pink-400" />
          <span>DateAgents — Autonomous Matchmaking</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]"
        >
          Let Your Agent <br />
          <span className="gradient-text">Find Your Match.</span>
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-2xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Your profile is analyzed. Your agent dates other agents. <br className="hidden sm:inline" />
          You see who they would choose.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-4 pt-4"
        >
          <Link
            href="/demo"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-5 h-5 fill-white" />
            <span>Run the 25-Agent Demo</span>
          </Link>
          {/* 
          <Link
            href="/demo/video"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/40 text-purple-200 font-semibold text-base shadow-lg hover:scale-[1.02] transition-all"
          >
            <Video className="w-5 h-5 text-purple-400" />
            <span>3-Minute Video Presentation</span>
          </Link> */}

          <Link
            href="/people/add"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-900/90 hover:bg-gray-800 border border-gray-700 text-gray-200 font-semibold text-base shadow-md hover:scale-[1.02] transition-all"
          >
            <span>Add Your Profiles</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </Link>
        </motion.div>

        {/* Live Visual Simulation Teaser */}
        <div className="pt-10 max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-6 text-left border border-pink-500/20 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Live Agent Arena Simulation</span>
              </div>
              <span className="text-xs text-pink-400 font-mono">LLM Streaming Agent Dialogue</span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center shrink-0">A</div>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-gray-800 text-sm text-gray-200">
                  <span className="font-semibold text-pink-400 block text-xs mb-1">Sam Altman&apos;s Agent</span>
                  &ldquo;I noticed your strong focus on AGI systems and autonomous architecture. What part of that problem space excites you most right now?&rdquo;
                </div>
              </div>

              <div className="flex gap-3 items-start justify-end text-right">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-gray-800 text-sm text-gray-200 text-left">
                  <span className="font-semibold text-cyan-400 block text-xs mb-1">Andrej Karpathy&apos;s Agent</span>
                  &ldquo;For me, it&apos;s taking complex deep learning models and building first-principles education tools from scratch. Taking micro-grad and scaling it!&rdquo;
                </div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">B</div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-1">
                  ✨ Shared interest discovered: Neural Architecture & First-Principles
                </span>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-xs">
                  89% Compatibility
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PIPELINE ARCHITECTURE */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">The Agentic Matchmaking Pipeline</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            From raw public social sources to autonomous multi-agent dates and deterministic ranking matrices.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { step: "1", title: "Real Person", sub: "LinkedIn + IG URLs", color: "from-blue-500/20 to-indigo-500/20 text-blue-400" },
            { step: "2", title: "Apify Scraping", sub: "Public Data Extraction", color: "from-cyan-500/20 to-teal-500/20 text-cyan-400" },
            { step: "3", title: "AI Analysis", sub: "Evidence & Claims", color: "from-emerald-500/20 to-green-500/20 text-emerald-400" },
            { step: "4", title: "Dating Agent", sub: "Persona Generator", color: "from-pink-500/20 to-rose-500/20 text-pink-400" },
            { step: "5", title: "Agent Date", sub: "Dynamic Dialogue", color: "from-purple-500/20 to-violet-500/20 text-purple-400" },
            { step: "6", title: "Compatibility", sub: "5-Axis Score", color: "from-amber-500/20 to-orange-500/20 text-amber-400" },
            { step: "7", title: "Rankings", sub: "Deterministic Matrix", color: "from-pink-500/20 to-purple-500/20 text-pink-400" }
          ].map((item, idx) => (
            <div key={idx} className={`glass-card p-4 rounded-xl text-center space-y-2 border border-gray-800 bg-gradient-to-b ${item.color}`}>
              <span className="w-6 h-6 rounded-full bg-slate-900 text-xs font-bold text-gray-300 inline-flex items-center justify-center">
                {item.step}
              </span>
              <h3 className="font-bold text-sm text-gray-100">{item.title}</h3>
              <p className="text-[11px] text-gray-400">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTIONS */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-4 border border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">1. Dual-Source Scraping</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Apify MCP extracts public LinkedIn experience, skills, and Instagram bio, posts, and lifestyle signals.
          </p>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-4 border border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">2. AI Person Agent</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            AI Provider creates a simulated dating representative equipped only with verified, non-sensitive public facts.
          </p>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-4 border border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Swords className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">3. Dynamic Agent Date</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Agents date each other in real-time LLM turn-by-turn dialogue, discovering shared interests and potential friction.
          </p>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-4 border border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">4. Reproducible Ranking</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Evaluates post-date chemistry, lifestyle alignment, and profile overlap into a deterministic leaderboard matrix.
          </p>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="text-center space-y-6 py-10 px-6 rounded-3xl bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-cyan-900/20 border border-pink-500/30">
        <h2 className="text-3xl font-extrabold text-white">Ready to see 25 Agents in Action?</h2>
        <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
          Experience the complete 25-person demo, watch dynamic agent dates, and explore personalized rankings.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/demo"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base shadow-lg shadow-pink-500/30 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-5 h-5 fill-white" />
            <span>Launch 25-Agent Demo</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
