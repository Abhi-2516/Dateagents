"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Swords, Sparkles, Filter, ShieldCheck } from "lucide-react";

export default function RankingsPage() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/rankings").then(r => r.json()),
      fetch("/api/people").then(r => r.json())
    ]).then(([rData, pData]) => {
      if (rData.success) setRankings(rData.data || []);
      if (pData.success) setPeople(pData.data || []);
    }).catch(console.error)
    .finally(() => setLoading(false));
  }, []);

  const filtered = selectedPersonId === "all"
    ? rankings
    : rankings.filter(r => r.personId === selectedPersonId);

  // Group by target person for tabular leaderboard display
  const grouped: Record<string, any[]> = {};
  filtered.forEach(r => {
    if (!grouped[r.personId]) grouped[r.personId] = [];
    grouped[r.personId].push(r);
  });

  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Trophy className="w-8 h-8 text-amber-400" />
            <span>25x25 Rankings Matrix</span>
          </h1>
          <p className="text-sm text-gray-400">
            AI-simulated compatibility matrices. Distinguishes live agent dating chemistry from baseline profile compatibility.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={selectedPersonId}
            onChange={(e) => setSelectedPersonId(e.target.value)}
            className="bg-slate-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500 w-full sm:w-64"
          >
            <option value="all">All 25 Leaderboards</option>
            {people.map(p => (
              <option key={p.id} value={p.id}>Best Matches for {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Methodology Disclaimer Banner */}
      <div className="px-4 py-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-xs text-pink-300 flex items-center gap-2 font-medium">
        <ShieldCheck className="w-4 h-4 text-pink-400 shrink-0" />
        <span>
          METHODOLOGY: AI-simulated compatibility matrix. Formula incorporates 40% Profile Jaccard similarity, 30% shared interests, 20% conversation chemistry, and 10% explicit preferences. Pairs with live agent dating sessions incorporate verified turn-by-turn dialogue evaluations.
        </span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-gray-800 animate-pulse h-40" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([personId, itemRankings]) => {
            const person = people.find(p => p.id === personId);
            const sortedRankings = [...itemRankings].sort((a, b) => a.rank - b.rank);

            return (
              <div key={personId} className="glass-card p-6 rounded-3xl border border-gray-800/80 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-html-element-suppression */}
                    <img
                      src={person?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                      alt={person?.name || personId}
                      className="w-10 h-10 rounded-full border border-pink-500 object-cover"
                    />
                    <div>
                      <Link href={`/people/${personId}`} className="font-bold text-white text-base hover:text-pink-400">
                        Best Matches for {person?.name || personId}
                      </Link>
                      <span className="text-xs text-gray-400 block">{person?.headline}</span>
                    </div>
                  </div>

                  <Link
                    href={`/rankings/${personId}`}
                    className="text-xs text-pink-400 font-semibold hover:underline"
                  >
                    View Full Leaderboard →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sortedRankings.slice(0, 3).map((r: any) => {
                    const isVerifiedDate = r.reasoning?.includes("VERIFIED AGENT DATE");
                    return (
                      <div
                        key={r.id}
                        className="p-4 rounded-2xl bg-slate-900 border border-gray-800 space-y-2 flex flex-col justify-between hover:border-pink-500/40 transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-md bg-pink-500/20 text-pink-300 font-bold text-xs">
                              #{r.rank}
                            </span>
                            <span className="text-xl font-extrabold gradient-text">
                              {r.score}%
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2">
                              {/* eslint-disable-next-html-element-suppression */}
                              <img
                                src={r.matchedPerson?.profileImage}
                                alt={r.matchedPerson?.name}
                                className="w-8 h-8 rounded-full border border-gray-700 object-cover shrink-0"
                              />
                              <Link href={`/people/${r.matchedPersonId}`} className="font-bold text-sm text-white hover:text-pink-400 truncate">
                                {r.matchedPerson?.name}
                              </Link>
                            </div>
                          </div>

                          {/* Date vs Profile Match Tag */}
                          <div>
                            <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                              isVerifiedDate ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            }`}>
                              {isVerifiedDate ? "✨ VERIFIED AGENT DATE" : "📊 PROFILE COMPATIBILITY"}
                            </span>
                          </div>

                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {r.reasoning}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between text-[11px]">
                          <Link
                            href={`/arena?personA=${r.personId}&personB=${r.matchedPersonId}`}
                            className="text-pink-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Swords className="w-3 h-3" /> Date in Arena
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
