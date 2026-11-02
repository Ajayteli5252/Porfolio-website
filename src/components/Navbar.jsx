import React, { useState } from "react";
import { Code2, Briefcase, Sparkles, Lock, Unlock, Bug, KeyRound } from "lucide-react";

export default function Navbar({
  isHonestMode,
  setIsHonestMode,
  isAdmin,
  setIsAdmin,
  bugsSquashed,
}) {
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

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
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      setShowPinInput(false);
      setPin("");
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white font-bold text-lg tracking-tight hover:text-indigo-400 transition"
        >
          <div className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
            <Code2 className="w-5 h-5" />
          </div>
          <span>
            Ajay<span className="text-indigo-400">.dev</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#skills" className="hover:text-indigo-400 transition">
            Skills
          </a>
          <a href="#projects" className="hover:text-indigo-400 transition">
            Projects
          </a>
          <a href="#experience" className="hover:text-indigo-400 transition">
            Experience
          </a>
          <a href="#education" className="hover:text-indigo-400 transition">
            Education
          </a>
        </nav>

        {/* Interactive Controls */}
        <div className="flex items-center gap-3 relative">
          {/* Bug Squasher Counter */}
          <div
            title="Click roaming bugs on the screen to squash them!"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400"
          >
            <Bug className="w-3.5 h-3.5 animate-pulse" />
            <span>Bugs Squashed: {bugsSquashed}</span>
          </div>

          {/* Recruiter vs. Honest Dev Mode Toggle */}
          <button
            onClick={() => setIsHonestMode(!isHonestMode)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${isHonestMode
                ? "bg-amber-500/15 border-amber-500/50 text-amber-300 hover:bg-amber-500/25"
                : "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/25"
              }`}
          >
            {isHonestMode ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Honest Dev Mode</span>
              </>
            ) : (
              <>
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                <span>Recruiter Mode</span>
              </>
            )}
          </button>

          {/* Admin Mode Unlock Button */}
          <button
            onClick={handleAdminToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${isAdmin
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            title="Unlock Admin Mode to Add/Edit/Delete Projects"
          >
            {isAdmin ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Active</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </>
            )}
          </button>

          {/* Admin PIN Popover */}
          {showPinInput && !isAdmin && (
            <form
              onSubmit={handlePinSubmit}
              className="absolute right-0 top-12 w-64 p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col gap-2 z-50"
            >
              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                  Enter Admin PIN (2027)
                </span>
                <button
                  type="button"
                  onClick={() => setShowPinInput(false)}
                  className="text-slate-500 hover:text-slate-300"
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
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Unlock
                </button>
              </div>
              {pinError && (
                <span className="text-[11px] text-rose-400">
                  Incorrect PIN! Try 2027.
                </span>
              )}
            </form>
          )}
        </div>
      </div>
    </header>
  );
}