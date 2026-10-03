"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Swords, Heart, CheckCircle2, AlertTriangle } from "lucide-react";

export default function DateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dates")
      .then(res => res.json())
      .then(d => {
        if (d.success) {
          const match = (d.data || []).find((s: any) => s.id === id);
          if (match) setSession(match);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-20 text-center text-gray-400">Loading dating transcript...</div>;
  if (!session) return <div className="py-20 text-center text-gray-400">Dating Session not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <Link href="/arena" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Return to Arena
      </Link>

      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              {session.personA?.name}&apos;s Agent ↔ {session.personB?.name}&apos;s Agent
            </h1>
            <p className="text-xs text-gray-400">Recorded Dating Session</p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold gradient-text">{session.compatibilityScore}%</span>
            <span className="block text-[10px] text-gray-400 font-mono">COMPATIBILITY</span>
          </div>
        </div>

        {/* Transcript */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dialogue Transcript</h3>
          <div className="space-y-3">
            {(session.transcript || []).map((turn: any, idx: number) => (
              <div key={idx} className={`p-4 rounded-2xl text-xs ${turn.sender === "A" ? "bg-slate-900 border border-pink-500/20" : "bg-purple-950/40 border border-cyan-500/20"}`}>
                <span className={`font-bold block mb-1 ${turn.sender === "A" ? "text-pink-400" : "text-cyan-400"}`}>
                  {turn.personName}&apos;s Agent
                </span>
                <p className="text-gray-200">{turn.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
