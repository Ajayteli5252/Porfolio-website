import React, { useState } from "react";
import {
  FolderGit2,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  X,
  RotateCcw,
  Sparkles,
  Briefcase,
  Zap,
  Layers
} from "lucide-react";
import { INITIAL_PROJECTS } from "../data/initialData";

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export default function ProjectManager({
  projects,
  setProjects,
  isHonestMode,
  isAdmin,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    year: "2026",
    badge: "",
    techString: "",
    recruiterDesc: "",
    honestDesc: "",
    liveUrl: "",
    githubUrl: "",
    metrics: "",
  });

  // Open modal for creating a new project
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      year: new Date().getFullYear().toString(),
      badge: "Production Ready",
      techString: "",
      recruiterDesc: "",
      honestDesc: "",
      liveUrl: "",
      githubUrl: "https://github.com/ajayteli5252",
      metrics: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing project
  const handleOpenEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      year: project.year || "2026",
      badge: project.badge || "",
      techString: project.tech.join(", "),
      recruiterDesc: project.recruiterDesc,
      honestDesc: project.honestDesc || project.recruiterDesc,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "https://github.com/ajayteli5252",
      metrics: project.metrics || "",
    });
    setIsModalOpen(true);
  };

  // Save new or updated project & persist to localStorage
  const handleSaveProject = (e) => {
    e.preventDefault();
    const techArray = formData.techString
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const newProjectObj = {
      id: editingId || `proj-${Date.now()}`,
      title: formData.title.trim(),
      year: formData.year.trim() || "2026",
      badge: formData.badge.trim() || "Engineered Work",
      tech: techArray.length > 0 ? techArray : ["React.js", "JavaScript"],
      recruiterDesc: formData.recruiterDesc.trim(),
      honestDesc: formData.honestDesc.trim() || formData.recruiterDesc.trim(),
      liveUrl: formData.liveUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      metrics: formData.metrics.trim(),
    };

    let updated;
    if (editingId) {
      updated = projects.map((p) => (p.id === editingId ? newProjectObj : p));
    } else {
      updated = [newProjectObj, ...projects];
    }

    setProjects(updated);
    try {
      localStorage.setItem("ajay_portfolio_projects_v2", JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save to localStorage", err);
    }

    setIsModalOpen(false);
  };

  // Delete a project
  const handleDeleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem("ajay_portfolio_projects_v2", JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save to localStorage", err);
    }
  };

  // Restore default resume projects
  const handleResetDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.setItem("ajay_portfolio_projects_v2", JSON.stringify(INITIAL_PROJECTS));
    } catch (err) {
      console.warn("Could not save to localStorage", err);
    }
  };

  return (
    <section id="projects" className="py-12 space-y-8 scroll-mt-20">
      {/* Section Header & Admin Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Software</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Projects & Production Deployments
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            End-to-end architectures spanning conversational RAG pipelines, sub-second AI nutrition, and offline PWAs.
          </p>
        </div>

        {/* Admin Controls (Only visible when unlocked) */}
        {isAdmin && (
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
            <button
              onClick={handleResetDefaults}
              title="Reset to default resume projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Reset Defaults
            </button>
          </div>
        )}
      </div>

      {/* 3D Perspective Tilt Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 p-6 flex flex-col justify-between gap-6 shadow-xl tilt-card"
          >
            <div className="space-y-4">
              {/* Top Row: Year Badge & Highlights & Admin Controls */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {project.year}
                  </span>
                  {project.badge && (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      ⚡ {project.badge}
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition cursor-pointer"
                      title="Edit Project"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
                {project.title}
              </h3>

              {/* Mode-Aware Description */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
                  {isHonestMode ? (
                    <span className="text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Behind The Scenes
                    </span>
                  ) : (
                    <span className="text-indigo-400 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> Recruiter Overview
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isHonestMode ? project.honestDesc : project.recruiterDesc}
                </p>
              </div>

              {/* Highlight Metric */}
              {project.metrics && (
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                  📊 {project.metrics}
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Preview
                </a>
              ) : (
                <span className="flex-1 text-center py-2 text-xs text-slate-500 font-mono">
                  CLI / Local Pipeline
                </span>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-400" />
                <span>{editingId ? "Edit Project" : "Add New Project"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1">
                  <label className="text-slate-300 font-medium">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. AI Workflow Platform"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    placeholder="2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Badge Highlight</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    placeholder="e.g. 90% Accuracy"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Performance Metrics</label>
                  <input
                    type="text"
                    value={formData.metrics}
                    onChange={(e) =>
                      setFormData({ ...formData, metrics: e.target.value })
                    }
                    placeholder="e.g. Sub-450ms latency"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.techString}
                  onChange={(e) =>
                    setFormData({ ...formData, techString: e.target.value })
                  }
                  placeholder="React, Node.js, Supabase, Tailwind CSS"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">
                  Recruiter Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.recruiterDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, recruiterDesc: e.target.value })
                  }
                  placeholder="Formal metric-driven summary..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">
                  Honest Developer Note
                </label>
                <textarea
                  rows={2}
                  value={formData.honestDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, honestDesc: e.target.value })
                  }
                  placeholder="The real engineering story..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
                >
                  {editingId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
