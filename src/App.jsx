import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroAndSkills from "./components/HeroAndSkills";
import ProjectManager from "./components/ProjectManager";
import ExperienceAndEdu from "./components/ExperienceAndEdu";
import DevTerminal from "./components/DevTerminal";
import { INITIAL_PROJECTS, PROFILE_DATA } from "./data/initialData";
import { Bug, Sparkles } from "lucide-react";

export default function App() {
  const [isHonestMode, setIsHonestMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [bugsSquashed, setBugsSquashed] = useState(0);

  // Random bug position for the roaming bug-squasher Easter egg
  const [bugPos, setBugPos] = useState({ top: "75%", left: "85%" });

  const handleSquashBug = () => {
    setBugsSquashed((prev) => prev + 1);
    // Move bug to a new random location on screen
    const randomTop = Math.floor(Math.random() * 70) + 15;
    const randomLeft = Math.floor(Math.random() * 85) + 5;
    setBugPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Bar */}
      <Navbar
        isHonestMode={isHonestMode}
        setIsHonestMode={setIsHonestMode}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        bugsSquashed={bugsSquashed}
      />

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 pb-24">
        {/* Hero & Interactive Skill Matrix */}
        <HeroAndSkills
          isHonestMode={isHonestMode}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Projects & Live Deploy Manager */}
        <ProjectManager
          projects={projects}
          setProjects={setProjects}
          isHonestMode={isHonestMode}
          isAdmin={isAdmin}
        />

        {/* Experience, Education & Milestones */}
        <ExperienceAndEdu isHonestMode={isHonestMode} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 text-center text-xs text-slate-500 space-y-2">
        <p>
          Designed & Built with React, Tailwind CSS & Vite by{" "}
          <span className="text-slate-300 font-semibold">{PROFILE_DATA.name}</span>
        </p>
        <p className="flex items-center justify-center gap-1.5 text-slate-600">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          BML Munjal University • Batch of 2027
        </p>
      </footer>

      {/* Interactive Dev Terminal Drawer */}
      <DevTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onBugSquashed={handleSquashBug}
      />

      {/* Roaming Bug Easter Egg */}
      <button
        onClick={handleSquashBug}
        style={{ top: bugPos.top, left: bugPos.left }}
        className="fixed z-30 p-2 rounded-full bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/50 text-rose-400 shadow-lg shadow-rose-500/20 animate-bounce transition-transform cursor-pointer"
        title="Click to squash the bug and earn a point!"
      >
        <Bug className="w-4 h-4" />
      </button>
    </div>
  );
}