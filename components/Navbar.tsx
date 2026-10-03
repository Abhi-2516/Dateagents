"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Sparkles, Users, Bot, Swords, Trophy, PlusCircle, Video, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/demo", label: "25-Agent Demo", icon: Sparkles, highlight: true },
    // { href: "/demo/video", label: "3-Min Video Mode", icon: Video, highlight: true },
    { href: "/people", label: "25 People", icon: Users },
    { href: "/agents", label: "Agents", icon: Bot },
    { href: "/arena", label: "Dating Arena", icon: Swords },
    { href: "/rankings", label: "Rankings", icon: Trophy },
    { href: "/people/add", label: "Add Profile", icon: PlusCircle },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              Date<span className="gradient-text">Agents</span>
            </span>
            <span className="block text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-1">
              Your Agent Dates For You
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href) && link.href !== "/demo");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive
                    ? "bg-pink-500/15 text-pink-400 border border-pink-500/30"
                    : link.highlight
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-pink-400" : "text-gray-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <Link
            href="/demo"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Launch Demo</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
