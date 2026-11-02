import React, { useState } from "react";
import {
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Award,
  Terminal,
  Cpu,
} from "lucide-react";
import { PROFILE_DATA, SKILLS_DATA } from "../data/initialData";

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

export default function HeroAndSkills({ isHonestMode, onOpenTerminal }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    <div className="space-y-20 py-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-6">
          {/* Status & University Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Open to Full-Stack & AI Roles
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              {PROFILE_DATA.university} ({PROFILE_DATA.batch})
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              CGPA: {PROFILE_DATA.cgpa}
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
                {PROFILE_DATA.name}
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-indigo-300">
              {PROFILE_DATA.tagline}
            </p>
          </div>

          {/* Dynamic Bio based on Mode */}
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            {isHonestMode
              ? "I turn caffeine and evening street-food snacks into full-stack web apps and RAG pipelines. Whether it's stopping LLMs from making things up or building offline apps that survive flaky Wi-Fi, I love shipping code that actually works."
              : "Final-year B.Tech student specializing in Data Science, AI, and Full-Stack Development. Experienced in building RAG architectures, offline-first Progressive Web Apps, and scalable MERN/Supabase platforms."}
          </p>

          {/* Contact & Quick Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition"
            >
              <Mail className="w-4 h-4" />
              {PROFILE_DATA.email}
            </a>

            <a
              href={`tel:${PROFILE_DATA.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition"
            >
              <Phone className="w-4 h-4 text-indigo-400" />
              {PROFILE_DATA.phone}
            </a>

            <a
              href={PROFILE_DATA.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-sm transition"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>

            <a
              href={PROFILE_DATA.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-sm transition"
            >
              <LinkedinIcon className="w-4 h-4 text-sky-400" />
              LinkedIn
            </a>

            <a
              href={PROFILE_DATA.links.playbook}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-sm transition"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              Engineering Playbook
            </a>

            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                Launch Dev Terminal
              </button>
            )}
          </div>
        </div>
      </section>

      {/* INTERACTIVE SKILL MATRIX */}
      <section id="skills" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Interactive Skill Matrix
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition flex flex-col justify-between gap-2"
            >
              <span className="font-bold text-slate-100 group-hover:text-indigo-300 transition">
                {skill.name}
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
