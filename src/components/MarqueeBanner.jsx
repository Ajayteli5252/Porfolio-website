import React from "react";
import { MARQUEE_ITEMS } from "../data/initialData";

export default function MarqueeBanner() {
  // Duplicate items for continuous seamless loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900/60 border-b border-slate-800/80 py-2.5 backdrop-blur-sm select-none">
      {/* Left/Right Gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee pause-on-hover items-center gap-6">
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 hover:border-indigo-500/50 hover:text-white transition-colors cursor-default whitespace-nowrap"
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
