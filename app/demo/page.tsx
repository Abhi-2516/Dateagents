"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Play, CheckCircle2, Bot, Swords, Trophy, ExternalLink, RefreshCw, Video } from "lucide-react";

export default function DemoPage() {
  const [people, setPeople] = useState<any[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [stepProgress, setStepProgress] = useState<number>(0); // 0 = idle, 25 = ready
  const [statusMessage, setStatusMessage] = useState<string>("Ready to execute demo pipeline.");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, rRes, dRes] = await Promise.all([
        fetch("/api/people"),
        fetch("/api/rankings"),
        fetch("/api/dates")
      ]);

      const pData = await pRes.json();
      const rData = await rRes.json();
      const dData = await dRes.json();

      if (pData.success) setPeople(pData.data || []);
      if (rData.success) setRankings(rData.data || []);
      if (dData.success) setDates(dData.data || []);
    } catch (e) {
      console.error("Failed to fetch demo data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStartSimulation = async () => {
    setSimulating(true);
    setStepProgress(1);

    // Simulate batch progress steps 1..25
    for (let i = 1; i <= 25; i++) {
      setStepProgress(i);
      setStatusMessage(`Analyzing public profile ${i}/25 from LinkedIn & Instagram...`);
      await new Promise(r => setTimeout(r, 60));
    }

    setStatusMessage("Creating 25 autonomous AI dating agents...");
    await new Promise(r => setTimeout(r, 800));

    setStatusMessage("Agents entering the Dating Arena...");
    await new Promise(r => setTimeout(r, 800));

    setStatusMessage("Conducting candidate dating sessions...");
    await new Promise(r => setTimeout(r, 800));

    setStatusMessage("Generating 25x25 reproducible rankings matrix...");
    await new Promise(r => setTimeout(r, 600));

    setStatusMessage("✅ Demo pipeline complete!");
    setSimulating(false);
    fetchData();
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/20 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-pink-400" />
            <span>25-Person Pre-Seeded & Live Demo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            25 People. 25 Agents. <span className="gradient-text">One Arena.</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl">
            Watch 25 real public figures&apos; AI agents date each other and evaluate mutual compatibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleStartSimulation}
            disabled={simulating}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-base shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] disabled:opacity-50 transition-all"
          >
            {simulating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Running Pipeline ({stepProgress}/25)...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>START 25-AGENT DATING</span>
              </>
            )}
          </button>

          <Link
            href="/demo/video"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-sm font-semibold shadow-md transition-all"
          >
            {/* <Video className="w-4 h-4 text-purple-400" />
            <span>3-Min Video Mode</span> */}
          </Link>
        </div>
      </div>

      {/* Progress & Cached Results Badge */}
      {simulating && (
        <div className="glass-card p-6 rounded-2xl border border-pink-500/40 bg-pink-500/5 space-y-3">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-pink-300 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              {statusMessage}
            </span>
            <span className="text-gray-400 font-mono">{Math.round((stepProgress / 25) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 h-full transition-all duration-300"
              style={{ width: `${(stepProgress / 25) * 100}%` }}
            />
          </div>
        </div>
      )}

      {people.length > 0 && !simulating && (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Cached demo results loaded instantly from database ({people.length} People, {dates.length} Agent Dates, {rankings.length} Matrix Rankings)</span>
          </div>
          <button onClick={fetchData} className="hover:underline flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
      )}

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/arena"
          className="glass-card glass-card-hover p-5 rounded-2xl border border-gray-800 flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Swords className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Enter Dating Arena</h3>
            <p className="text-xs text-gray-400">Watch live turn-by-turn agent dates</p>
          </div>
        </Link>

        <Link
          href="/rankings"
          className="glass-card glass-card-hover p-5 rounded-2xl border border-gray-800 flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">View 25x25 Rankings</h3>
            <p className="text-xs text-gray-400">Explore global compatibility leaderboard</p>
          </div>
        </Link>

        <Link
          href="/people"
          className="glass-card glass-card-hover p-5 rounded-2xl border border-gray-800 flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Inspect 25 Profiles</h3>
            <p className="text-xs text-gray-400">View source evidence & AI analysis</p>
          </div>
        </Link>
      </div>

      {/* 25 REAL PEOPLE GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>25 Real People & AI Agents</span>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-800 text-xs text-pink-400 font-mono">
              {people.length}/25 Ready
            </span>
          </h2>
          <span className="text-xs text-gray-400">Sources: LinkedIn + Instagram</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-card p-5 rounded-2xl border border-gray-800 animate-pulse h-48" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {people.map((person) => (
              <div
                key={person.id}
                className="glass-card glass-card-hover p-4 rounded-2xl border border-gray-800/80 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    {/* eslint-disable-next-html-element-suppression */}
                    <img
                      src={person.profileImage}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/30 shrink-0"
                    />
                    <div className="min-w-0">
                      <Link href={`/people/${person.id}`} className="font-bold text-white text-sm hover:text-pink-400 truncate block">
                        {person.name}
                      </Link>
                      <span className="text-[11px] text-gray-400 line-clamp-1">
                        {person.headline}
                      </span>
                    </div>
                  </div>

                  {/* Interests Chips */}
                  <div className="flex flex-wrap gap-1">
                    {(person.analysis?.interests || []).slice(0, 3).map((interest: string, idx: number) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-gray-800/80 text-[10px] text-gray-300 border border-gray-700/60">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Source Links */}
                <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between text-[11px]">
                  <a
                    href={person.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-0.5"
                  >
                    LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href={person.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 hover:underline flex items-center gap-0.5"
                  >
                    Instagram <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
