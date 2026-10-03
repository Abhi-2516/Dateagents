"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Bot, Swords, Trophy, Database, ShieldCheck, ArrowRight, Server, Cpu } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ people: 25, agents: 25, dates: 13, avgScore: 86 });

  useEffect(() => {
    Promise.all([
      fetch("/api/people").then(r => r.json()),
      fetch("/api/dates").then(r => r.json())
    ]).then(([pData, dData]) => {
      const pCount = pData.data?.length || 25;
      const dCount = dData.data?.length || 13;
      const scores = dData.data?.map((s: any) => s.compatibilityScore) || [86];
      const avg = Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length);
      setStats({ people: pCount, agents: pCount, dates: dCount, avgScore: avg });
    }).catch(console.error);
  }, []);

  return (
    <div className="space-y-10 py-4 max-w-6xl mx-auto">
      {/* DASHBOARD HEADER */}
      <div className="glass-card p-8 rounded-3xl border border-pink-500/20 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-semibold uppercase">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>DateAgents System Dashboard & Tech Specs</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">System Overview & Architecture</h1>
        <p className="text-sm text-gray-300 max-w-2xl">
          Complete metrics, Apify MCP scraping pipeline specification, AI provider abstractions, and database models.
        </p>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase block">People Profiles</span>
          <span className="text-4xl font-extrabold text-white">{stats.people}</span>
          <span className="text-[11px] text-pink-400 block font-mono">LinkedIn + IG Sources</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase block">Autonomous Agents</span>
          <span className="text-4xl font-extrabold text-purple-400">{stats.agents}</span>
          <span className="text-[11px] text-purple-300 block font-mono">Persona Representatives</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase block">Dating Sessions</span>
          <span className="text-4xl font-extrabold text-cyan-400">{stats.dates}</span>
          <span className="text-[11px] text-cyan-300 block font-mono">Dynamic LLM Turn-Taking</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase block">Average Compatibility</span>
          <span className="text-4xl font-extrabold gradient-text">{stats.avgScore}%</span>
          <span className="text-[11px] text-emerald-400 block font-mono">5-Axis Evaluation</span>
        </div>
      </div>

      {/* TECHNICAL EXPLANATION OF SCRAPING ARCHITECTURE */}
      <section className="glass-card p-8 rounded-3xl border border-pink-500/20 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Server className="w-6 h-6 text-pink-400" />
          Technical Explanation of Instagram + LinkedIn Scraping Architecture
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-xs text-gray-300">
          <div className="p-5 rounded-2xl bg-slate-900 border border-gray-800 space-y-3">
            <h3 className="font-bold text-sm text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4" /> LinkedIn Adapter Architecture
            </h3>
            <p className="leading-relaxed">
              Target Actor: <code className="text-blue-300 font-mono">harvestapi/linkedin-profile-search</code> <br />
              Mode: <code className="text-pink-300 font-mono">profileScraperMode = &quot;Full&quot;</code>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Extracts verified full name, headline, summary/about.</li>
              <li>Parses professional experience history, companies, and roles.</li>
              <li>Extracts verified skills, education, and geographic location.</li>
              <li>Ensures no login bypass or CAPTCHA circumvention; public API only.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-gray-800 space-y-3">
            <h3 className="font-bold text-sm text-pink-400 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4" /> Instagram Adapter Architecture
            </h3>
            <p className="leading-relaxed">
              Target Actor: <code className="text-pink-300 font-mono">apify/instagram-profile-scraper</code> <br />
              Mode: <code className="text-cyan-300 font-mono">Public profile URLs / usernames</code>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Extracts bio text, website links, followers count, verification status.</li>
              <li>Parses latest public post captions, timestamps, and engagement metrics.</li>
              <li>Rejects private profiles gracefully without crashing the app.</li>
              <li>Extracts lifestyle signals (hobbies, travel, photography).</li>
            </ul>
          </div>
        </div>

        {/* Pipeline Diagram */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" /> End-to-End Pipeline Data Flow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-[11px] font-mono text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-blue-400">1. Real Person URLs</div>
            <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-cyan-400">2. Apify Scraper</div>
            <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-emerald-400">3. Source Normalizer</div>
            <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-purple-400">4. AI Analysis</div>
            <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-pink-400">5. Dynamic Agent Date</div>
            <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-amber-400">6. Rankings Matrix</div>
          </div>
        </div>
      </section>

      {/* TECH STACK LIST */}
      <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
        <h2 className="text-lg font-bold text-white">Full Technology Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-center font-bold text-gray-200">Next.js 16 (App Router)</div>
          <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-center font-bold text-gray-200">React 19 & TypeScript</div>
          <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-center font-bold text-gray-200">Tailwind CSS v4</div>
          <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-center font-bold text-gray-200">Prisma & SQLite/Postgres</div>
          <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-center font-bold text-gray-200">Apify Client SDK</div>
          <div className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-center font-bold text-gray-200">Gemini / Groq / OpenRouter</div>
        </div>
      </section>
    </div>
  );
}
