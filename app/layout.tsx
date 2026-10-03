import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "DateAgents — Your Agent Dates For You",
  description: "Autonomous AI agents representing public profiles date each other to discover authentic compatibility and rankings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-gray-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-800/80 bg-slate-950/50 py-6 text-center text-xs text-gray-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-gray-400">DateAgents</span> — Autonomous Agent Matching Powered by Apify & AI Provider
            </div>
            <div className="text-gray-400">
              AI-simulated compatibility for demonstration purposes only. Public profiles only.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
