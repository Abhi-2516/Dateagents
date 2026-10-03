"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bot, Swords, Sparkles } from "lucide-react";

export default function AgentsGalleryPage() {
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/people")
      .then(res => res.json())
      .then(d => { if (d.success) setPeople(d.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Bot className="w-8 h-8 text-pink-400" /> Autonomous Dating Agents
        </h1>
        <p className="text-sm text-gray-400">
          Simulated AI agents representing each person&apos;s publicly expressed interests and conversation style.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-gray-800 animate-pulse h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {people.map((person) => {
            const agent = person.agent || {};
            return (
              <div
                key={person.id}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-gray-800/80 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-html-element-suppression */}
                    <img
                      src={person.profileImage}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/30"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base">{person.name}&apos;s Agent</h3>
                      <span className="text-xs text-pink-400 font-medium">Style: {agent.conversationStyle || "Articulate & Warm"}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-3 bg-slate-900/90 p-3 rounded-xl border border-gray-800 font-mono leading-relaxed">
                    {agent.persona || `Agent representing ${person.name}.`}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {(agent.interests || []).slice(0, 3).map((item: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 text-[10px] border border-purple-500/30">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                  <Link
                    href={`/agents/${person.id}`}
                    className="text-xs text-gray-300 hover:text-white font-medium"
                  >
                    Inspect Persona
                  </Link>

                  <Link
                    href={`/arena?personA=${person.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-400 text-xs font-semibold hover:bg-pink-500/30 transition-all"
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>Launch Date</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
