import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Award,
  Terminal,
  Cpu,
  Sparkles,
  Zap,
  Coffee,
  CheckCircle2,
  ArrowRight,
  Flame,
  Code
} from "lucide-react";
import { PROFILE_DATA, SKILLS_DATA } from "../data/initialData";

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

export default function HeroAndSkills({
  isHonestMode,
  onOpenTerminal,
  chaiCount = 1,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Typewriter effect state
  const roles = PROFILE_DATA.rolesCycling;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    let timer;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  const categories = [
    "All",
    "Programming",
    "Frontend",
    "Backend",
    "Databases",
    "Core & Tools",
  ];

  const filteredSkills =
    selectedCategory === "All"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === selectedCategory);

  return (
    <div className="space-y-20 py-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 p-6 sm:p-12 shadow-2xl tilt-card">
        {/* Background glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            {/* Status & University Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Open to Full-Stack & AI Roles
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                {PROFILE_DATA.university} ({PROFILE_DATA.batch})
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                CGPA: {PROFILE_DATA.cgpa}
              </span>
            </div>

            {/* Headline with Typewriter */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  {PROFILE_DATA.name}
                </span>
              </h1>
              <div className="h-10 flex items-center">
                <p className="text-xl sm:text-2xl font-semibold text-indigo-300 flex items-center font-mono">
                  <span>&gt; {currentText}</span>
                  <span className="w-2.5 h-6 bg-indigo-400 inline-block ml-1 animate-pulse" />
                </p>
              </div>
            </div>

            {/* Dynamic Bio based on Mode */}
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-xl">
              {isHonestMode
                ? "I turn caffeine, evening street-food snacks, and sheer persistence into production full-stack web apps and RAG vector search pipelines. Whether it's stopping LLMs from hallucinating wild claims or engineering offline PWAs that survive flaky Wi-Fi, I build software that just works."
                : "Electronics & Computer Engineering student at BML Munjal University specializing in Data Science, AI, and modern Full-Stack engineering. Passionate about LangChain RAG pipelines, sub-second Groq AI integrations, and responsive React architecture."}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#matcher"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>AI Recruiter Matcher</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-sm transition"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Fast-Track Contact</span>
              </a>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Interactive Shell</span>
                </button>
              )}
            </div>

            {/* Contact Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400 font-mono">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                {PROFILE_DATA.email}
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={`tel:${PROFILE_DATA.phone}`}
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {PROFILE_DATA.phone}
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={PROFILE_DATA.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </div>

          {/* Right Card: Developer Telemetry & Live Kadak Chai Gauge */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl font-mono text-xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 text-[11px] ml-1">telemetry.system.json</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Code stats */}
              <div className="space-y-1.5 text-slate-300">
                <p>
                  <span className="text-purple-400">"candidate"</span>:{" "}
                  <span className="text-emerald-300">"{PROFILE_DATA.name}"</span>,
                </p>
                <p>
                  <span className="text-purple-400">"degree"</span>:{" "}
                  <span className="text-cyan-300">"B.Tech ECE (AI & DS)"</span>,
                </p>
                <p>
                  <span className="text-purple-400">"specialties"</span>: [
                  <span className="text-amber-300">"RAG"</span>,{" "}
                  <span className="text-amber-300">"React"</span>,{" "}
                  <span className="text-amber-300">"Offline PWA"</span>],
                </p>
                <p>
                  <span className="text-purple-400">"grit"</span>:{" "}
                  <span className="text-indigo-400">99.8</span>,
                </p>
                <p>
                  <span className="text-purple-400">"status"</span>:{" "}
                  <span className="text-emerald-400">"Ready for High-Impact Sprints"</span>
                </p>
              </div>

              {/* Live Kadak Chai Fuel Meter */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Coffee className="w-3.5 h-3.5" />
                    Kadak Chai Fuel
                  </span>
                  <span className="text-slate-400 font-mono">
                    {chaiCount} Cups ({Math.min(100, chaiCount * 25)}% Capacity)
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(15, chaiCount * 25))}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  Tip: Click the Chai button in the navbar to overclock developer velocity!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SKILL MATRIX */}
      <section id="skills" className="space-y-8 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Interactive Skill Matrix & Proficiency
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Production competencies evaluated across algorithms, modern UI development, backend micro-services, and local databases.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Perspective Tilt Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/60 transition-all duration-300 tilt-card space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{skill.name}</h3>
                  <p className="text-[11px] text-slate-400">{skill.highlight}</p>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {skill.level}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>{skill.category}</span>
                <span className="text-emerald-400">Verified Competency</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
