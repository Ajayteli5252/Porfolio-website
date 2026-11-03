import React, { useState } from "react";
import {
  Code2,
  Briefcase,
  Sparkles,
  Lock,
  Unlock,
  Bug,
  KeyRound,
  Coffee,
  Terminal,
  Send,
  Zap,
  Menu,
  X
} from "lucide-react";

export default function Navbar({
  isHonestMode,
  setIsHonestMode,
  isAdmin,
  setIsAdmin,
  bugsSquashed,
  chaiCount,
  onDrinkChai,
  onOpenTerminal,
}) {
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ADMIN_PIN = "2027"; // Default passcode to unlock project CRUD controls

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setShowPinInput(false);
    } else {
      setShowPinInput(!showPinInput);
      setPinError(false);
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin.trim() === ADMIN_PIN) {
      setIsAdmin(true);
      setShowPinInput(false);
      setPin("");
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  const navLinks = [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "AI Matcher ⚡", href: "#matcher", highlight: true },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Fast-Track Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white font-bold text-lg tracking-tight hover:text-indigo-400 transition shrink-0 group"
        >
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600/30 via-indigo-500/20 to-purple-500/30 border border-indigo-500/40 text-indigo-400 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight">
              Ajay<span className="text-indigo-400">.dev</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Batch of '27
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition py-1 px-2 rounded-lg ${
                link.highlight
                  ? "text-indigo-300 bg-indigo-950/60 border border-indigo-500/40 hover:bg-indigo-900/60 hover:text-white"
                  : "hover:text-indigo-400 hover:bg-slate-900/60"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Interactive Controls & Gamified Widgets */}
        <div className="flex items-center gap-2 sm:gap-2.5 relative">
          {/* Bug Squasher Counter Badge */}
          <div
            title="Click roaming bugs on screen to squash them!"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400"
          >
            <Bug className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{bugsSquashed}</span>
          </div>

          {/* Virtual Kadak Chai Button */}
          <button
            onClick={onDrinkChai}
            title="Drink Virtual Kadak Chai to boost developer coding velocity!"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold transition active:scale-95 cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5 animate-bounce" />
            <span>Chai: {chaiCount}</span>
          </button>

          {/* Mode Toggle: Recruiter vs. Honest Dev */}
          <button
            onClick={() => setIsHonestMode(!isHonestMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer active:scale-95 ${
              isHonestMode
                ? "bg-amber-500/15 border-amber-500/50 text-amber-300 hover:bg-amber-500/25"
                : "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/25"
            }`}
            title="Toggle between formal Recruiter Mode and witty Honest Dev Mode"
          >
            {isHonestMode ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Honest Mode</span>
              </>
            ) : (
              <>
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Recruiter Mode</span>
              </>
            )}
          </button>

          {/* Admin Mode Unlock Button */}
          <button
            onClick={handleAdminToggle}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
              isAdmin
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
            title="Unlock Admin Mode to Add/Edit/Delete Projects (PIN: 2027)"
          >
            {isAdmin ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Admin Active</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Admin</span>
              </>
            )}
          </button>

          {/* Terminal Launcher Pill */}
          <button
            onClick={onOpenTerminal}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-mono transition flex items-center gap-1"
            title="Launch interactive developer shell"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Shell</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Admin PIN Popover Modal */}
          {showPinInput && !isAdmin && (
            <form
              onSubmit={handlePinSubmit}
              className="absolute right-0 top-12 w-64 p-3.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col gap-2.5 z-50 animate-in fade-in zoom-in-95"
            >
              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                  Enter Admin PIN (2027)
                </span>
                <button
                  type="button"
                  onClick={() => setShowPinInput(false)}
                  className="text-slate-500 hover:text-slate-300 text-sm"
                >
                  ✕
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN..."
                  autoFocus
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Unlock
                </button>
              </div>
              {pinError && (
                <span className="text-[11px] text-rose-400 font-mono">
                  Incorrect PIN! Try 2027.
                </span>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
