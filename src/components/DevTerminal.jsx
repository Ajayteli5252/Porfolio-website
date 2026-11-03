import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Sparkles, Send, Coffee } from "lucide-react";
import confetti from "canvas-confetti";
import { PROFILE_DATA, SKILLS_DATA, INITIAL_PROJECTS } from "../data/initialData";

export default function DevTerminal({ isOpen, onClose, onBugSquashed, onDrinkChai }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "output",
      text: "Welcome to Ajay Teli's Interactive Dev Terminal v2.8.0",
    },
    {
      type: "output",
      text: 'Type "help" to see available commands or "hire-ajay" for priority interview access.',
    },
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Handle Escape key to close terminal drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "input", text: `guest@ajay-dev:~$ ${input}` }];
    setInput("");

    switch (cmd) {
      case "help": {
        newHistory.push({
          type: "output",
          text: `Available commands:\n  • skills       - View core programming stack & databases\n  • projects     - List featured full-stack & AI projects\n  • contact      - Get email, phone & social links\n  • chai         - Brew a cup of Kadak Chai (boost velocity!)\n  • hire-ajay    - Trigger celebratory confetti & VIP interview access\n  • clear        - Clear terminal screen\n  • exit         - Close terminal window`,
        });
        break;
      }

      case "skills": {
        const skillList = SKILLS_DATA.map((s) => `${s.name} (${s.level}%)`).join(", ");
        newHistory.push({
          type: "output",
          text: `Technical Arsenal:\n${skillList}`,
        });
        break;
      }

      case "projects": {
        const projList = INITIAL_PROJECTS.map(
          (p) => `• ${p.title} (${p.year}) - [${p.badge}]\n  Stack: ${p.tech.join(", ")}`
        ).join("\n");
        newHistory.push({
          type: "output",
          text: `Featured Projects:\n${projList}`,
        });
        break;
      }

      case "contact": {
        newHistory.push({
          type: "output",
          text: `Direct Candidate Contact:\n  Email:    ${PROFILE_DATA.email}\n  Phone:    ${PROFILE_DATA.phone}\n  GitHub:   ${PROFILE_DATA.links.github}\n  LinkedIn: ${PROFILE_DATA.links.linkedin}`,
        });
        break;
      }

      case "chai": {
        if (onDrinkChai) onDrinkChai();
        newHistory.push({
          type: "output",
          text: `☕ Kadak Chai consumed! Developer velocity overclocked by +20%. Keep the code shipping!`,
        });
        break;
      }

      case "hire-ajay":
      case "sudo hire-ajay": {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#6366f1", "#a855f7", "#10b981", "#f59e0b"],
        });
        if (onBugSquashed) onBugSquashed();
        newHistory.push({
          type: "output",
          text: `🎉 EXCELLENT CHOICE! Ajay is primed for Full-Stack & AI Engineering roles.\nReach out directly at ${PROFILE_DATA.email} or call ${PROFILE_DATA.phone}.`,
        });
        break;
      }

      case "clear": {
        setHistory([]);
        return;
      }

      case "exit": {
        onClose();
        return;
      }

      default: {
        newHistory.push({
          type: "error",
          text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`,
        });
        break;
      }
    }

    setHistory(newHistory);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[460px]">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400">
              ajay@portfolio-terminal:~
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 text-slate-300">
          {history.map((item, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap leading-relaxed ${
                item.type === "input"
                  ? "text-indigo-400 font-semibold"
                  : item.type === "error"
                  ? "text-rose-400"
                  : "text-slate-200"
              }`}
            >
              {item.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Form */}
        <form
          onSubmit={handleCommandSubmit}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
        >
          <span className="text-emerald-400 font-mono text-xs font-bold">
            guest@dev:~$
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'skills', 'chai', 'hire-ajay'..."
            autoFocus
            className="flex-1 bg-transparent border-none text-white font-mono text-xs focus:outline-none"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
