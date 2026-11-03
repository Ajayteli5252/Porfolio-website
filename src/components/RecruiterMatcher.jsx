import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Send,
  Cpu,
  Coffee,
  Layers,
  ArrowRight,
  Flame,
  Award
} from "lucide-react";
import confetti from "canvas-confetti";
import { MATCHER_DATA, PROFILE_DATA } from "../data/initialData";

export default function RecruiterMatcher({ onSendMatchToContact }) {
  const [selectedRole, setSelectedRole] = useState(MATCHER_DATA.roles[0]);
  const [selectedVibe, setSelectedVibe] = useState(MATCHER_DATA.vibes[0]);
  const [selectedPerk, setSelectedPerk] = useState(MATCHER_DATA.perks[0]);

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepText, setScanStepText] = useState("");
  const [matchResult, setMatchResult] = useState(null);

  const generateProof = (role, vibe, perk) => {
    let techProof = "";
    let honestVerdict = "";

    if (role.includes("AI") || vibe.includes("Vector") || vibe.includes("LLM")) {
      techProof =
        "Direct production alignment demonstrated in Document QA System using RAG (LangChain + FAISS + Llama 3) achieving 90% answer relevance, plus sub-450ms Groq Vision AI integration in Diet Dost.";
      honestVerdict =
        "Ajay will prevent your team's LLM from making stuff up. Give him high-impact sprints and he will optimize vector embeddings before the daily standup.";
    } else if (role.includes("Frontend") || vibe.includes("Tailwind") || vibe.includes("UI")) {
      techProof =
        "Battle-tested React.js & Tailwind CSS architecture with 60 FPS client rendering, responsive layout systems, and custom hooks modeled after production engineering standards.";
      honestVerdict =
        "Pixel-perfection without bloat. He hates unnecessary dependencies as much as you do, and writes clean modular JSX that you won't need to rewrite 3 months later.";
    } else if (vibe.includes("Offline") || vibe.includes("PWA")) {
      techProof =
        "Proven offline-first architecture in the Utsav Rental PWA leveraging IndexedDB client-side data persistence, service workers, and zero-downtime local workflows.";
      honestVerdict =
        "When the internet cuts out, his software keeps running. That means your users never lose state, even during monsoon network drops.";
    } else {
      techProof =
        "Proven full-stack engineering during Uptoskill internship (Node.js, Express, MongoDB, RESTful APIs) and Supabase database optimization.";
      honestVerdict =
        "He ships full-stack features from database migrations to responsive UI components without needing hand-holding.";
    }

    if (perk.includes("Chai")) {
      honestVerdict += ` Bonus: With '${perk}' provided, Ajay's sprint velocity automatically increases by +25%!`;
    } else if (perk.includes("Zero-Bug")) {
      honestVerdict += ` Bonus: He squashes bugs proactively in dev so production stays serene.`;
    } else {
      honestVerdict += ` Bonus: He thrives in '${perk}' and loves turning complex requirements into working demos.`;
    }

    return {
      score: "99.8%",
      role,
      vibe,
      perk,
      techProof,
      honestVerdict,
    };
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(10);
    setScanStepText("Parsing target role requirements & tech vibe...");

    setTimeout(() => {
      setScanProgress(45);
      setScanStepText("Benchmarking git repositories & RAG/Full-Stack code...");
    }, 400);

    setTimeout(() => {
      setScanProgress(80);
      setScanStepText(`Calculating Chai-to-code velocity with "${selectedPerk}"...`);
    }, 850);

    setTimeout(() => {
      setScanProgress(100);
      setScanStepText("Alignment Verified: 99.8% Match Found!");
      setIsScanning(false);

      const result = generateProof(selectedRole, selectedVibe, selectedPerk);
      setMatchResult(result);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#a855f7", "#10b981", "#f59e0b"],
      });
    }, 1300);
  };

  const handleSendToContact = () => {
    if (!matchResult) return;
    if (onSendMatchToContact) {
      onSendMatchToContact(matchResult);
    }
    // Smooth scroll to #contact
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="matcher" className="py-16 space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Interactive AI Compatibility Scanner</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ajay&apos;s AI Recruiter Match & Pitch Simulator
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Configure your team&apos;s open role, desired technical focus, and culture perk to simulate Ajay&apos;s real-time candidate compatibility and generate a tailored interview pitch.
        </p>
      </div>

      {/* 3-Column Interactive Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Target Role */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-xl tilt-card">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm border-b border-slate-800 pb-2">
            <Layers className="w-4 h-4" />
            <span>1. Select Target Role</span>
          </div>
          <div className="space-y-2">
            {MATCHER_DATA.roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                  selectedRole === role
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500"
                    : "bg-slate-950/70 text-slate-300 border border-slate-800/80 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>{role}</span>
                {selectedRole === role && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Tech Vibe */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-xl tilt-card">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-2">
            <Cpu className="w-4 h-4" />
            <span>2. Choose Tech Vibe</span>
          </div>
          <div className="space-y-2">
            {MATCHER_DATA.vibes.map((vibe) => (
              <button
                key={vibe}
                onClick={() => setSelectedVibe(vibe)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                  selectedVibe === vibe
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500"
                    : "bg-slate-950/70 text-slate-300 border border-slate-800/80 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>{vibe}</span>
                {selectedVibe === vibe && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Team Perk */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-xl tilt-card">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-slate-800 pb-2">
            <Coffee className="w-4 h-4" />
            <span>3. Key Team Perk</span>
          </div>
          <div className="space-y-2">
            {MATCHER_DATA.perks.map((perk) => (
              <button
                key={perk}
                onClick={() => setSelectedPerk(perk)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                  selectedPerk === perk
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 border border-amber-500"
                    : "bg-slate-950/70 text-slate-300 border border-slate-800/80 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>{perk}</span>
                {selectedPerk === perk && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scan Action Bar */}
      <div className="text-center pt-2">
        <button
          onClick={handleRunScan}
          disabled={isScanning}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60"
        >
          <Zap className={`w-5 h-5 ${isScanning ? "animate-spin" : "animate-bounce"}`} />
          <span>{isScanning ? "Scanning Fit..." : "Run Compatibility Scan ⚡"}</span>
        </button>
      </div>

      {/* Progress Radar Bar */}
      {isScanning && (
        <div className="max-w-xl mx-auto space-y-2 p-5 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
            <span>{scanStepText}</span>
            <span>{scanProgress}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Generated Match Result Card */}
      {matchResult && !isScanning && (
        <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900/95 to-indigo-950/40 border border-indigo-500/50 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 tilt-card">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Row: Match Score & Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {matchResult.score} Compatibility Match!
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                {matchResult.role}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
              <Flame className="w-4 h-4" />
              <span>High Candidate Velocity</span>
            </div>
          </div>

          {/* Pitches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            {/* Technical Proof */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase tracking-wider text-xs">
                <Award className="w-3.5 h-3.5" />
                <span>Technical Proof Point</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {matchResult.techProof}
              </p>
            </div>

            {/* Honest Dev Verdict */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-xs">
                <Coffee className="w-3.5 h-3.5" />
                <span>Honest Dev Verdict</span>
              </div>
              <p className="text-amber-100 leading-relaxed">
                {matchResult.honestVerdict}
              </p>
            </div>
          </div>

          {/* Send Match CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <p className="text-xs text-slate-400">
              Ready to schedule? Pass these exact match specs directly to Ajay&apos;s interview inbox.
            </p>
            <button
              onClick={handleSendToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Send This Match to Ajay&apos;s Inbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
