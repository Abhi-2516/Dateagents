"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ExternalLink, Bot, PlusCircle } from "lucide-react";

export default function PeopleDirectoryPage() {
  const [people, setPeople] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/people")
      .then(res => res.json())
      .then(d => {
        if (d.success) setPeople(d.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = people.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.headline.toLowerCase().includes(query.toLowerCase()) ||
    (p.analysis?.interests || []).some((i: string) => i.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">25 Real Public Profiles</h1>
          <p className="text-sm text-gray-400">
            Scraped exclusively from public LinkedIn + Instagram profiles via Apify MCP.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search name, topic, skill..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-gray-800 text-sm text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <Link
            href="/people/add"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs shrink-0 shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add URL</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl border border-gray-800 animate-pulse h-44" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((person) => (
            <div
              key={person.id}
              className="glass-card glass-card-hover p-5 rounded-2xl border border-gray-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img
                    src={person.profileImage}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/30 shrink-0"
                  />
                  <div className="min-w-0">
                    <Link href={`/people/${person.id}`} className="font-bold text-white text-base hover:text-pink-400 truncate block">
                      {person.name}
                    </Link>
                    <span className="text-xs text-gray-400 line-clamp-1">{person.headline}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {person.analysis?.summary || person.bio}
                </p>

                <div className="flex flex-wrap gap-1">
                  {(person.analysis?.interests || []).slice(0, 3).map((interest: string, idx: number) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-gray-800/80 text-[10px] text-pink-300 border border-gray-700/60">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                <div className="flex gap-2">
                  <a href={person.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-0.5">
                    LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a href={person.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-400 hover:underline flex items-center gap-0.5">
                    Instagram <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <Link
                  href={`/people/${person.id}`}
                  className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-400 font-semibold hover:bg-pink-500/20 text-[11px]"
                >
                  View Intelligence
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
