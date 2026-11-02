import React from "react";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  CheckCircle2,
  Sparkles,
  Calendar,
  Award
} from "lucide-react";
import {
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  ACHIEVEMENTS_DATA,
} from "../data/initialData";

export default function ExperienceAndEdu({ isHonestMode }) {
  return (
    <div className="space-y-20 py-12">
      {/* WORK EXPERIENCE SECTION */}
      <section id="experience" className="space-y-8 scroll-mt-20">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Work Experience
          </h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {exp.role}{" "}
                    <span className="text-indigo-400">@ {exp.company}</span>
                  </h3>
                  <p className="text-sm font-medium text-slate-400 mt-0.5">
                    Key Project: <span className="text-slate-200">{exp.project}</span>
                  </p>
                </div>
                <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {exp.period}
                </span>
              </div>

              {isHonestMode ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{exp.honestNote}</p>
                </div>
              ) : (
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {exp.recruiterPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION & ACHIEVEMENTS GRID */}
      <section
        id="education"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-20"
      >
        {/* Education Column */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Background</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Education
            </h2>
          </div>

          <div className="space-y-4">
            {EDUCATION_DATA.map((edu, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-2.5 shadow-lg hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white text-base">
                    {edu.degree}
                  </h3>
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-indigo-300">
                  {edu.institution}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Award className="w-3.5 h-3.5" />
                  <span>{edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Column */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Honors & Certifications</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Achievements
            </h2>
          </div>

          <div className="space-y-4">
            {ACHIEVEMENTS_DATA.map((achievement, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-lg hover:border-amber-500/40 transition group"
              >
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Trophy className="w-4 h-4" />
                </div>
                <p className="text-sm text-slate-200 font-medium leading-relaxed self-center">
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
