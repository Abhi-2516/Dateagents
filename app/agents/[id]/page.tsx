"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Bot, Swords, Sparkles, ArrowLeft } from "lucide-react";

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/people/${id}`)
      .then(res => res.json())
      .then(d => { if (d.success) setPerson(d.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !person) {
    return <div className="py-20 text-center text-gray-400">Loading Agent details...</div>;
  }

  const agent = person.agent || {};

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      <Link href="/agents" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Agents Directory
      </Link>

      <div className="glass-card p-8 rounded-3xl border border-pink-500/20 space-y-6">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-html-element-suppression */}
          <img src={person.profileImage} alt={person.name} className="w-16 h-16 rounded-full border-2 border-pink-500/40 object-cover" />
          <div>
            <h1 className="text-2xl font-extrabold text-white">{person.name}&apos;s Dating Agent</h1>
            <p className="text-xs text-pink-400 font-medium">Autonomous Agent Representative</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Persona Prompt Instructions</h3>
          <p className="p-4 rounded-xl bg-slate-900 text-xs text-gray-200 font-mono leading-relaxed border border-gray-800">
            {agent.persona || `You are the autonomous dating agent representing ${person.name}.`}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Agent Goals</h3>
          <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
            {(agent.goals || []).map((g: string, idx: number) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-gray-800">
          <span className="text-xs text-gray-400">Conversation Style: <strong className="text-white">{agent.conversationStyle}</strong></span>
          <Link
            href={`/arena?personA=${person.id}`}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg"
          >
            <Swords className="w-4 h-4" />
            <span>Launch Date in Arena</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
