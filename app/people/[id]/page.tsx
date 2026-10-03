"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, ShieldCheck, Swords, Bot, Trophy, Sparkles, Heart } from "lucide-react";

export default function PersonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/people/${id}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setPerson(d.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 py-8 max-w-5xl mx-auto animate-pulse">
        <div className="h-44 bg-gray-900 rounded-3xl" />
        <div className="h-64 bg-gray-900 rounded-3xl" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Person Not Found</h2>
        <Link href="/people" className="text-pink-400 hover:underline">
          Return to People Directory
        </Link>
      </div>
    );
  }

  const analysis = person.analysis || {};
  const agent = person.agent || {};
  const evidence = analysis.evidence || [];

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto">
      {/* HEADER CARD */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/20 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Profile Image */}
            {/* eslint-disable-next-html-element-suppression */}
            <img
              src={person.profileImage}
              alt={person.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-pink-500/40 shadow-xl shrink-0"
            />
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {person.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl">
                {person.headline}
              </p>

              {/* Source Provenance Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={person.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold hover:bg-pink-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <Link
              href={`/arena?personA=${person.id}`}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg hover:scale-[1.02] transition-all"
            >
              <Swords className="w-4 h-4" />
              <span>Start Agent Date</span>
            </Link>

            <Link
              href={`/rankings/${person.id}`}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 text-xs font-semibold hover:bg-gray-800 transition-all"
            >
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>View Leaderboard</span>
            </Link>
          </div>
        </div>

        {/* Provenance Banner */}
        <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>SOURCE MATERIAL PROVENANCE: AI profile analysis generated strictly from verified LinkedIn + Instagram public endpoints.</span>
        </div>
      </div>

      {/* WHO THEY ARE (SUMMARY) */}
      <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-3">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider text-pink-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> WHO THEY ARE
        </h2>
        <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
          {analysis.summary || person.bio}
        </p>
      </section>

      {/* INTERESTS & HOBBIES GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
          <h2 className="text-sm font-bold text-pink-400 uppercase tracking-wider">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {(analysis.interests || []).map((item: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-medium">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
          <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Hobbies</h2>
          <div className="flex flex-wrap gap-2">
            {(analysis.hobbies || []).map((item: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* PROFESSIONAL INTERESTS & LIFESTYLE */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Professional Interests</h2>
          <div className="space-y-2">
            {(analysis.professionalInterests || []).map((item: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-xs text-gray-200 font-medium">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
          <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Lifestyle Signals</h2>
          <div className="space-y-2">
            {(analysis.lifestyleSignals || []).map((item: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-xs text-gray-200 font-medium">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CONVERSATION TOPICS & PREFERENCES */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Conversation Topics</h2>
          <div className="space-y-2">
            {(analysis.conversationTopics || []).map((item: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-xs text-gray-200 font-medium">
                💬 {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
          <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Explicit Preferences & Needs</h2>
          <div className="space-y-2">
            {(analysis.explicitPreferences || []).map((item: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-gray-800 text-xs text-gray-200 font-medium">
                ✨ {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* WHAT THEIR AGENT CARES ABOUT */}
      <section className="glass-card p-6 rounded-2xl border border-purple-500/30 bg-purple-950/20 space-y-4">
        <h2 className="text-base font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
          <Bot className="w-5 h-5" /> WHAT THEIR AGENT CARES ABOUT
        </h2>
        <p className="text-xs text-gray-300 leading-relaxed font-mono bg-slate-900 p-4 rounded-xl border border-gray-800">
          {agent.persona || `Agent representing ${person.name}. Focused on authentic interest exploration and mutual growth.`}
        </p>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <div>
            <span className="text-xs font-semibold text-gray-400 block mb-1">Agent Goals</span>
            <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
              {(agent.goals || []).map((g: string, idx: number) => (
                <li key={idx}>{g}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-semibold text-gray-400 block mb-1">Conversation Style</span>
            <span className="text-xs text-purple-300 font-medium">{agent.conversationStyle || "Articulate and inquisitive"}</span>
          </div>
        </div>
      </section>

      {/* SOURCE EVIDENCE PROVENANCE TABLE */}
      <section className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> SOURCE EVIDENCE PROVENANCE
        </h2>
        <p className="text-xs text-gray-400">
          Every item extracted by AI is linked directly to public text in LinkedIn or Instagram.
        </p>

        <div className="space-y-3">
          {evidence.map((item: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{item.claim}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  item.source === "LinkedIn" ? "bg-blue-500/20 text-blue-400" : "bg-pink-500/20 text-pink-400"
                }`}>
                  {item.source}
                </span>
              </div>
              <p className="text-xs text-gray-400 italic font-mono bg-slate-950 p-2.5 rounded-lg border border-gray-800/80">
                &ldquo;{item.evidence}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
