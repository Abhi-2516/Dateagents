"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Swords, Sparkles, RefreshCw, Bot, Heart, AlertTriangle, CheckCircle2, Trophy } from "lucide-react";

export default function DatingArenaPage({ searchParams }: { searchParams?: Promise<{ personA?: string; personB?: string }> }) {
  const resolvedParams = searchParams ? use(searchParams) : {};
  const [people, setPeople] = useState<any[]>([]);
  const [personAId, setPersonAId] = useState<string>(resolvedParams?.personA || "sam-altman");
  const [personBId, setPersonBId] = useState<string>(resolvedParams?.personB || "andrej-karpathy");
  
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleTurnCount, setVisibleTurnCount] = useState<number>(0);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/people")
      .then(res => res.json())
      .then(d => {
        if (d.success) {
          setPeople(d.data || []);
          if (!resolvedParams?.personA && d.data.length >= 2) {
            setPersonAId(d.data[0].id);
            setPersonBId(d.data[1].id);
          }
        }
      });
  }, [resolvedParams?.personA]);

  const handleStartDate = async () => {
    if (!personAId || !personBId || personAId === personBId) return;

    setLoading(true);
    setSession(null);
    setVisibleTurnCount(0);
    setIsThinking(true);

    try {
      const res = await fetch("/api/dates/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personAId, personBId })
      });

      const data = await res.json();
      if (data.success) {
        setSession(data.data);
        setIsThinking(false);

        // Progressively reveal turns one by one for streaming effect
        const totalTurns = data.data.turns?.length || 0;
        for (let i = 1; i <= totalTurns; i++) {
          await new Promise(r => setTimeout(r, 650));
          setVisibleTurnCount(i);
        }
      }
    } catch (e) {
      console.error("Error conducting date", e);
    } finally {
      setLoading(false);
    }
  };

  const personA = people.find(p => p.id === personAId) || people[0];
  const personB = people.find(p => p.id === personBId) || people[1];

  return (
    <div className="space-y-8 py-4">
      {/* ARENA HEADER & PERSON SELECTORS */}
      <div className="glass-card p-6 rounded-3xl border border-pink-500/20 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-semibold uppercase">
            <Swords className="w-3.5 h-3.5" />
            <span>Autonomous Agent Matchmaking Arena</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Agent-to-Agent Date</h1>
          <p className="text-xs text-gray-400">Select two people to initiate a dynamic turn-by-turn LLM conversation.</p>
        </div>

        {/* SELECTORS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center">
          {/* PERSON A SELECTOR */}
          <div className="md:col-span-2 glass-card p-4 rounded-2xl border border-pink-500/30 space-y-2">
            <label className="block text-[11px] font-bold text-pink-400 uppercase tracking-wider">Person A</label>
            <select
              value={personAId}
              onChange={(e) => setPersonAId(e.target.value)}
              className="w-full bg-slate-900 border border-gray-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
            >
              {people.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.headline?.slice(0, 30)}...)</option>
              ))}
            </select>
          </div>

          {/* LAUNCH BUTTON */}
          <div className="text-center">
            <button
              onClick={handleStartDate}
              disabled={loading || personAId === personBId}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:scale-[1.03] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 fill-white" />
              )}
              <span>{loading ? "Dating..." : "Start Date"}</span>
            </button>
          </div>

          {/* PERSON B SELECTOR */}
          <div className="md:col-span-2 glass-card p-4 rounded-2xl border border-cyan-500/30 space-y-2">
            <label className="block text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Person B</label>
            <select
              value={personBId}
              onChange={(e) => setPersonBId(e.target.value)}
              className="w-full bg-slate-900 border border-gray-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {people.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.headline?.slice(0, 30)}...)</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ARENA LAYOUT: LEFT CARD | CENTER LIVE STREAM | RIGHT CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* PERSON A CARD */}
        {personA && (
          <div className="glass-card p-5 rounded-2xl border border-pink-500/30 space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-html-element-suppression */}
              <img src={personA.profileImage} alt={personA.name} className="w-14 h-14 rounded-full border-2 border-pink-500 object-cover" />
              <div>
                <h3 className="font-bold text-white text-base">{personA.name}</h3>
                <span className="text-[11px] text-pink-400 font-semibold">{personA.name}&apos;s Agent</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-gray-400 uppercase block text-[10px]">Interests</span>
              <div className="flex flex-wrap gap-1">
                {(personA.analysis?.interests || []).slice(0, 4).map((i: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-300">{i}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-gray-400 uppercase block text-[10px]">Hobbies</span>
              <div className="flex flex-wrap gap-1">
                {(personA.analysis?.hobbies || []).slice(0, 3).map((h: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-300">{h}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CENTER LIVE AGENT DATE CHAT */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-gray-800 space-y-6 bg-slate-950/80 min-h-[420px] flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Live Agent Dialogue</span>
            </div>
            {session && (
              <span className="text-xs text-pink-400 font-mono font-bold">
                {visibleTurnCount} / {session.turns?.length || 0} Exchanges
              </span>
            )}
          </div>

          {!session && !loading && (
            <div className="text-center py-16 space-y-3">
              <Bot className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-base font-bold text-gray-300">Ready to Start Date</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Click &ldquo;Start Date&rdquo; above to generate dynamic multi-turn conversation between agents.
              </p>
            </div>
          )}

          {isThinking && (
            <div className="flex items-center justify-center py-12 gap-3 text-pink-400 text-sm font-semibold">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Agents are analyzing profile interests & starting date...</span>
            </div>
          )}

          {session && (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {session.turns.slice(0, visibleTurnCount).map((turn: any, idx: number) => {
                const isA = turn.sender === "A";
                return (
                  <div key={idx} className={`space-y-1.5 ${isA ? "" : "text-right"}`}>
                    {/* Thinking step */}
                    {turn.thinking && (
                      <div className={`text-[10px] text-gray-400 italic font-mono px-3 py-1 rounded-lg bg-slate-900/60 inline-block border border-gray-800 ${isA ? "" : "ml-auto"}`}>
                        💭 {turn.thinking}
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div className={`p-4 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                      isA
                        ? "bg-slate-900 text-gray-200 border border-pink-500/20 rounded-tl-none inline-block text-left"
                        : "bg-purple-950/60 text-gray-200 border border-cyan-500/20 rounded-tr-none inline-block text-left ml-auto"
                    }`}>
                      <span className={`font-bold block mb-1 text-[11px] ${isA ? "text-pink-400" : "text-cyan-400"}`}>
                        {turn.personName}&apos;s Agent
                      </span>
                      {turn.message}
                    </div>

                    {/* Shared Interest Badge */}
                    {turn.sharedInterestDiscovered && (
                      <div className="flex items-center justify-center gap-1.5 py-1">
                        <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                          ✨ Shared interest discovered: {turn.sharedInterestDiscovered}
                        </span>
                      </div>
                    )}

                    {/* Friction Badge */}
                    {turn.potentialFriction && (
                      <div className="flex items-center justify-center gap-1.5 py-1">
                        <span className="px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
                          ⚡ Potential difference: {turn.potentialFriction}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* POST DATE EVALUATION FOOTER */}
          {session && visibleTurnCount >= (session.turns?.length || 0) && (
            <div className="pt-4 border-t border-gray-800 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/30">
                <div>
                  <span className="text-xs font-bold text-white block">Agent Compatibility Evaluation</span>
                  <span className="text-[11px] text-gray-300">Based on profile alignment & live date chemistry</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold gradient-text">
                    {session.evaluation?.compatibilityScore}%
                  </span>
                  <span className="block text-[9px] text-gray-400 font-mono">MATCH SCORE</span>
                </div>
              </div>

              {/* 5-Axis Breakdown Bars */}
              <div className="space-y-2 text-xs">
                {Object.entries(session.evaluation?.compatibilityBreakdown || {}).map(([key, val]: any) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-300 font-medium capitalize">
                      <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-mono text-pink-400">{val}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PERSON B CARD */}
        {personB && (
          <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-html-element-suppression */}
              <img src={personB.profileImage} alt={personB.name} className="w-14 h-14 rounded-full border-2 border-cyan-500 object-cover" />
              <div>
                <h3 className="font-bold text-white text-base">{personB.name}</h3>
                <span className="text-[11px] text-cyan-400 font-semibold">{personB.name}&apos;s Agent</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-gray-400 uppercase block text-[10px]">Interests</span>
              <div className="flex flex-wrap gap-1">
                {(personB.analysis?.interests || []).slice(0, 4).map((i: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-300">{i}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-gray-400 uppercase block text-[10px]">Hobbies</span>
              <div className="flex flex-wrap gap-1">
                {(personB.analysis?.hobbies || []).slice(0, 3).map((h: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-300">{h}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
