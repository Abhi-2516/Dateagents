"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, RefreshCw, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AddPersonPage() {
  const router = useRouter();
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinUrl || !instagramUrl) {
      setError("Both LinkedIn URL and Instagram URL are required.");
      return;
    }

    setLoading(true);
    setError("");
    setStatus("Initiating Apify MCP Profile Scraping...");

    try {
      setStatus("Scraping public LinkedIn profile via Apify...");
      await new Promise(r => setTimeout(r, 600));

      setStatus("Scraping public Instagram profile via Apify...");
      await new Promise(r => setTimeout(r, 600));

      setStatus("Normalizing source text & generating AI profile intelligence...");

      const res = await fetch("/api/people/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkedinUrl,
          instagramUrl,
          name: name.trim() || undefined,
        })
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to analyze profile");
      }

      setStatus("Agent created successfully! Redirecting to profile...");
      await new Promise(r => setTimeout(r, 400));
      router.push(`/people/${data.personId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to ingest public profiles.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-semibold uppercase">
          <Sparkles className="w-3.5 h-3.5 fill-pink-400" />
          <span>Live Apify MCP Profile Ingestion</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Add Custom Person</h1>
        <p className="text-sm text-gray-400">
          Paste any public LinkedIn and Instagram URLs to construct an AI dating agent.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/20 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">
              Person Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Marques Brownlee"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-gray-800 text-sm text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">
              Public LinkedIn Profile URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://www.linkedin.com/in/username/"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-gray-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">
              Public Instagram Profile URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://www.instagram.com/username/"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-gray-800 text-sm text-white focus:outline-none focus:border-pink-500 font-mono text-xs"
            />
          </div>
        </div>

        {loading && (
          <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-3">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
            <span>{status}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Processing Apify Scraper...</span>
          ) : (
            <>
              <span>Analyze Person & Create Agent</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="pt-2 text-[11px] text-gray-500 space-y-1">
          <div className="flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Public Information Only — Privacy & Safety Guardrails Enforced</span>
          </div>
          <p>
            Uses Apify actors: <code className="text-blue-400">harvestapi/linkedin-profile-search</code> & <code className="text-pink-400">apify/instagram-profile-scraper</code>. Sensitive attributes are strictly excluded.
          </p>
        </div>
      </form>
    </div>
  );
}
