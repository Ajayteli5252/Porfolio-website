import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MarqueeBanner from "./components/MarqueeBanner";
import HeroAndSkills from "./components/HeroAndSkills";
import RecruiterMatcher from "./components/RecruiterMatcher";
import ProjectManager from "./components/ProjectManager";
import ExperienceAndEdu from "./components/ExperienceAndEdu";
import ContactSection from "./components/ContactSection";
import DevTerminal from "./components/DevTerminal";
import AdminModal from "./components/AdminModal";
import { INITIAL_PROJECTS, PROFILE_DATA } from "./data/initialData";
import { Bug, Sparkles, Coffee, Terminal, ArrowUp, ShieldCheck, Settings, Lock } from "lucide-react";
import confetti from "canvas-confetti";

export default function App() {
  const [isHonestMode, setIsHonestMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [bugsSquashed, setBugsSquashed] = useState(0);
  const [chaiCount, setChaiCount] = useState(2);
  const [toastMessage, setToastMessage] = useState(null);

  // Incoming match data from RecruiterMatcher to ContactSection
  const [incomingMatchData, setIncomingMatchData] = useState(null);

  // Load projects from localStorage if available
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("ajay_portfolio_projects_v2");
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Top Scroll Progress Bar
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interactive Cursor Spotlight
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Secret Keyboard Shortcut to open Admin Console: Ctrl + Shift + A or Alt + A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") || (e.altKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        setIsAdminModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Random bug position & floating feedback popups
  const [bugPos, setBugPos] = useState({ top: "72%", left: "84%" });
  const [bugPopups, setBugPopups] = useState([]);

  const handleSquashBug = (e) => {
    const newCount = bugsSquashed + 1;
    setBugsSquashed(newCount);

    // Spawn floating +1 popup at click position
    const clickX = e?.clientX || window.innerWidth * 0.8;
    const clickY = e?.clientY || window.innerHeight * 0.7;
    const popupId = Date.now();
    setBugPopups((prev) => [...prev, { id: popupId, x: clickX, y: clickY }]);
    setTimeout(() => {
      setBugPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 1200);

    // Confetti every 5 bugs squashed!
    if (newCount % 5 === 0) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#10b981", "#6366f1", "#f59e0b"],
      });
      showToast(`🏆 Milestone: ${newCount} Bugs Squashed! Production is cleaner!`);
    }

    // Move bug to new random location on screen
    const randomTop = Math.floor(Math.random() * 65) + 18;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setBugPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleDrinkChai = () => {
    setChaiCount((prev) => prev + 1);
    const messages = [
      "☕ Kadak Chai consumed! Developer velocity +15%!",
      "☕ Steaming masala tea down! Vector embedding speed overclocked!",
      "☕ Chai refueled! CSS bug squashed before it even existed!",
      "☕ Fresh cup of chai! Ready to ship features at lightspeed!"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    showToast(randomMsg);
  };

  const handleSendMatchToContact = (matchData) => {
    setIncomingMatchData(matchData);
    showToast(`⚡ Match generated for ${matchData.role}! Contact form auto-filled.`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 origin-left"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`,
        }}
      />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Bar */}
      <Navbar
        isHonestMode={isHonestMode}
        setIsHonestMode={setIsHonestMode}
        bugsSquashed={bugsSquashed}
        chaiCount={chaiCount}
        onDrinkChai={handleDrinkChai}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onTriggerAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Infinite Tech Stack & Achievements Marquee Banner */}
      <MarqueeBanner />

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24 relative z-10">
        {/* Hero & Interactive Skill Matrix */}
        <HeroAndSkills
          isHonestMode={isHonestMode}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          chaiCount={chaiCount}
        />

        {/* Centerpiece: AI Recruiter Match & Pitch Simulator */}
        <RecruiterMatcher onSendMatchToContact={handleSendMatchToContact} />

        {/* Projects & Live Deploy Manager */}
        <ProjectManager
          projects={projects}
          setProjects={setProjects}
          isHonestMode={isHonestMode}
          isAdmin={isAdmin}
        />

        {/* Experience, Education & Milestones */}
        <ExperienceAndEdu isHonestMode={isHonestMode} />

        {/* Interviewer Fast-Track Email Send Box */}
        <ContactSection incomingMatchData={incomingMatchData} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-10 text-center text-xs text-slate-500 space-y-3 relative z-10">
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <a
            href={PROFILE_DATA.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="hover:text-white transition"
          >
            {PROFILE_DATA.email}
          </a>
          <span>•</span>
          <a
            href={`tel:${PROFILE_DATA.phone}`}
            className="hover:text-white transition"
          >
            {PROFILE_DATA.phone}
          </a>
        </div>
        <p>
          Crafted with React, Tailwind CSS & Vite by{" "}
          <span className="text-slate-300 font-semibold">{PROFILE_DATA.name}</span>
        </p>
        <p className="flex items-center justify-center gap-1.5 text-slate-600 text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          BML Munjal University • Batch of 2027 • CGPA: {PROFILE_DATA.cgpa}
        </p>
      </footer>

      {/* Floating Bottom-Left Developer Terminal Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-emerald-400 shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2 text-xs font-mono group"
        title="Launch Developer Terminal (Shell)"
      >
        <Terminal className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-slate-200">Terminal</span>
      </button>

      {/* Floating Bottom-Right Back-to-Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
        title="Back to Top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Roaming Bug Easter Egg */}
      <button
        onClick={handleSquashBug}
        style={{ top: bugPos.top, left: bugPos.left }}
        className="fixed z-40 p-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/50 text-rose-400 shadow-xl shadow-rose-500/20 animate-bug-wiggle transition-all duration-700 cursor-pointer"
        title="Click to squash the bug and clean production!"
      >
        <Bug className="w-4 h-4" />
      </button>

      {/* Floating +1 Popups on Bug Click */}
      {bugPopups.map((popup) => (
        <div
          key={popup.id}
          style={{ top: popup.y - 20, left: popup.x }}
          className="fixed z-50 pointer-events-none font-mono text-xs font-bold text-emerald-400 bg-slate-950/90 px-2 py-1 rounded-md border border-emerald-500/40 shadow-lg animate-in fade-in zoom-in-75 slide-out-to-top duration-700"
        >
          +1 Bug Squashed! 🐛
        </div>
      ))}

      {/* Floating Admin Active Pill (ONLY visible when YOU unlock Admin mode) */}
      {isAdmin && (
        <div className="fixed top-20 right-6 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/95 border border-emerald-500/50 text-emerald-300 text-xs shadow-2xl backdrop-blur-md animate-in fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">Admin Active</span>
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="p-1 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Admin Settings / Change PIN"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setIsAdmin(false);
              showToast("🔒 Admin Mode Locked.");
            }}
            className="p-1 rounded-md hover:bg-rose-500/20 text-rose-400 transition cursor-pointer"
            title="Lock Admin Mode"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Witty Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-indigo-500/50 text-white text-xs font-medium shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Dev Terminal Drawer / Modal */}
      <DevTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onBugSquashed={handleSquashBug}
        onDrinkChai={handleDrinkChai}
        onTriggerAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Secret Developer Admin Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onShowToast={showToast}
      />
    </div>
  );
}
