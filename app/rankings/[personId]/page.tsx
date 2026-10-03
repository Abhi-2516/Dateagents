"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Swords, Sparkles } from "lucide-react";

export default function PersonRankingsPage({ params }: { params: Promise<{ personId: string }> }) {
  const { personId } = use(params);
  const [person, setPerson] = useState<any>(null);
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/people/${personId}`).then(r => r.json()),
      fetch(`/api/rankings?personId=${personId}`).then(r => r.json())
    ]).then(([pData, rData]) => {
      if (pData.success) setPerson(pData.data);
      if (rData.success) setRankings(rData.data || []);
    }).catch(console.error)
    .finally(() => setLoading(false));
  }, [personId]);

  if (loading) return <div className="py-20 text-center text-gray-400">Loading rankings...</div>;
  if (!person) return <div className="py-20 text-center text-gray-400">Person not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <Link href="/rankings" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Return to 25x25 Rankings Matrix
      </Link>

      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
          {/* eslint-disable-next-html-element-suppression */}
          <img src={person.profileImage} alt={person.name} className="w-16 h-16 rounded-full border-2 border-pink-500 object-cover" />
          <div>
            <h1 className="text-2xl font-extrabold text-white">Best Matches for {person.name}</h1>
            <p className="text-xs text-gray-400">{person.headline}</p>
          </div>
        </div>

        <div className="space-y-4">
          {rankings.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-slate-900 border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-pink-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 font-extrabold text-base flex items-center justify-center shrink-0">
                  #{r.rank}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-html-element-suppression */}
                    <img src={r.matchedPerson?.profileImage} alt={r.matchedPerson?.name} className="w-6 h-6 rounded-full object-cover" />
                    <Link href={`/people/${r.matchedPersonId}`} className="font-bold text-white text-base hover:text-pink-400">
                      {r.matchedPerson?.name}
                    </Link>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-xl">{r.reasoning}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                <span className="text-2xl font-extrabold gradient-text">{r.score}%</span>
                <Link
                  href={`/arena?personA=${person.id}&personB=${r.matchedPersonId}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-400 text-xs font-semibold hover:bg-pink-500/30 transition-all"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>Start Date</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
