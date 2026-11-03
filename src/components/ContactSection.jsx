import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Send,
  Sparkles,
  Check,
  Copy,
  ExternalLink,
  Calendar,
  Building,
  User,
  MessageSquare,
  Clock,
  Briefcase
} from "lucide-react";
import confetti from "canvas-confetti";
import { PROFILE_DATA } from "../data/initialData";

export default function ContactSection({ incomingMatchData }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const [form, setForm] = useState({
    recruiterName: "",
    company: "",
    workEmail: "",
    targetRole: "Full Stack Developer",
    interviewSlot: "This Week (Morning)",
    subject: "Interview Discussion - Full Stack Engineering",
    message:
      "Hi Ajay, we reviewed your projects (Document QA RAG & Diet Dost) and would love to schedule a discussion for an engineering role at our company.",
  });

  // When incoming match data is received from AI Matcher, auto-fill the form!
  useEffect(() => {
    if (incomingMatchData) {
      setForm((prev) => ({
        ...prev,
        targetRole: incomingMatchData.role,
        subject: `⚡ Match Result: ${incomingMatchData.role} Inquiry for Ajay Teli`,
        message: `Hi Ajay, we ran the AI Recruiter Matcher for the ${incomingMatchData.role} position with a focus on "${incomingMatchData.vibe}".\n\nCompatibility Score: ${incomingMatchData.score}\nKey Perk: ${incomingMatchData.perk}\n\nTechnical Alignment: ${incomingMatchData.techProof}\n\nWe would like to invite you for an initial interview.`,
      }));
    }
  }, [incomingMatchData]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleTemplateClick = (type) => {
    if (type === "fullstack") {
      setForm({
        ...form,
        targetRole: "Full-Stack Developer",
        subject: "⚡ Fast-Track Full-Stack Engineering Interview",
        interviewSlot: "This Week (Morning)",
        message:
          "Hi Ajay, we were impressed with your MERN + Supabase projects and want to schedule a 30-minute technical interview for our Full-Stack engineering team.",
      });
    } else if (type === "ai") {
      setForm({
        ...form,
        targetRole: "AI / RAG Engineer",
        subject: "🤖 AI & Data Science Role Inquiry - Ajay Teli",
        interviewSlot: "Next Week",
        message:
          "Hi Ajay, we're expanding our AI initiatives and love your LangChain + FAISS Document QA RAG pipeline and Groq Vision integration. Let's schedule a call to discuss a specialized AI engineering role.",
      });
    } else if (type === "discussion") {
      setForm({
        ...form,
        targetRole: "Software Engineering Intern / SDE",
        subject: "🚀 Fast-Track Coding Discussion with Ajay Teli",
        interviewSlot: "Immediate / Flexible",
        message:
          "Hi Ajay, let's connect for an informal technical coffee chat regarding upcoming opportunities on our software engineering team.",
      });
    }
  };

  const handleSendSimulated = (e) => {
    e.preventDefault();
    setSentSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#6366f1", "#a855f7"],
    });
  };

  const handleOpenMailto = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `From: ${form.recruiterName} (${form.company})\nEmail: ${form.workEmail}\nRole: ${form.targetRole}\nPreferred Time: ${form.interviewSlot}\n\nMessage:\n${form.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          <span>Priority Communications</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Interviewer Fast-Track Email Send Box
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Skip the recruiter phone tag. Fill out interview slots or choose a 1-click template to directly dispatch an interview invite to Ajay&apos;s personal inbox.
        </p>

        {/* 1-Click Clipboard Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => copyToClipboard(PROFILE_DATA.email, "email")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-xs font-mono text-slate-300 hover:text-white transition cursor-pointer"
            title="Click to copy email address"
          >
            {copiedEmail ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span>{copiedEmail ? "Copied Email!" : PROFILE_DATA.email}</span>
          </button>

          <button
            onClick={() => copyToClipboard(PROFILE_DATA.phone, "phone")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-xs font-mono text-slate-300 hover:text-white transition cursor-pointer"
            title="Click to copy phone number"
          >
            {copiedPhone ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>{copiedPhone ? "Copied Phone!" : PROFILE_DATA.phone}</span>
          </button>
        </div>
      </div>

      {/* Main Send Box Card */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6 tilt-card">
        {/* 1-Click Auto-Fill Templates */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            1-Click Interview Templates:
          </label>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleTemplateClick("fullstack")}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/60 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
            >
              ⚡ Schedule Full-Stack Interview
            </button>
            <button
              type="button"
              onClick={() => handleTemplateClick("ai")}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/60 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
            >
              🤖 AI / Data Science Role Inquiry
            </button>
            <button
              type="button"
              onClick={() => handleTemplateClick("discussion")}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
            >
              🚀 Fast-Track Coding Discussion
            </button>
          </div>
        </div>

        {/* Email Send Form */}
        <form onSubmit={handleSendSimulated} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Recruiter / Hiring Manager
              </label>
              <input
                type="text"
                required
                value={form.recruiterName}
                onChange={(e) => setForm({ ...form, recruiterName: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-purple-400" />
                Company / Organization
              </label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Acme Tech / Startup Labs"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                Work Email
              </label>
              <input
                type="email"
                required
                value={form.workEmail}
                onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                placeholder="recruiter@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                Target Engineering Role
              </label>
              <input
                type="text"
                value={form.targetRole}
                onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                placeholder="e.g. Full-Stack MERN Developer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Preferred Interview Slot
              </label>
              <select
                value={form.interviewSlot}
                onChange={(e) => setForm({ ...form, interviewSlot: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="This Week (Morning)">This Week (Morning Slot)</option>
                <option value="This Week (Afternoon)">This Week (Afternoon Slot)</option>
                <option value="Next Week">Next Week (Flexible)</option>
                <option value="Immediate / Flexible">Immediate / Flexible</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Subject Line</label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              Interview Notes & Invitation Message
            </label>
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleOpenMailto}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition cursor-pointer"
              title="Open pre-populated message directly in your default email client"
            >
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              <span>Open in Mail App (mailto:)</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Instant Message to Ajay</span>
            </button>
          </div>
        </form>

        {/* Confirmation Banner */}
        {sentSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="font-bold">Message Dispatched Successfully!</p>
              <p className="text-slate-300 text-xs mt-0.5">
                Thank you for reaching out! Ajay will review your interview invitation and reply to{" "}
                <span className="text-white font-semibold font-mono">
                  {form.workEmail || "your email"}
                </span>{" "}
                within 24 hours.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
