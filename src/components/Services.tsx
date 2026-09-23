import { useState } from "react";
import { services } from "../data";

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section
      id="service"
      className="bg-[#050505] text-white pt-16 md:pt-24 pb-0 px-6 md:px-16 flex flex-col relative overflow-hidden"
    >
      <div className="flex justify-end w-full pb-12">
        <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl leading-[1.1] md:leading-[0.9] text-right">
          {["WHAT I", "CAN DO"].map((line) => (
            <span
              key={line}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800"
            >
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="z-10 relative -mx-6 md:-mx-16 border-t border-white/20">
        {services.map((svc, idx) => {
          const isOpen = open === idx;
          const isLit = isOpen || hover === idx;
          return (
            <div
              key={svc.id}
              onClick={() => setOpen(isOpen ? null : idx)}
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
              className={`relative border-b border-white/10 py-5 md:py-7 px-6 md:px-16 cursor-pointer transition-colors duration-500 ease-out ${
                isLit ? "bg-[var(--surface-lit)] text-[var(--surface-lit-ink)]" : ""
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-12">
                <div className="flex items-start gap-4 md:gap-8 flex-1">
                  <span
                    className={`text-xs md:text-sm font-mono pt-1 tabular-nums ${
                      isLit ? "text-[var(--surface-lit-ink-soft)]" : "text-gray-500"
                    }`}
                  >
                    {svc.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[1.05]">
                      {svc.title}
                    </h3>
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`text-sm md:text-base leading-relaxed max-w-2xl mb-5 ${
                            isLit ? "text-[var(--surface-lit-ink-soft)]" : "text-gray-400"
                          }`}
                        >
                          {svc.description}
                        </p>
                        <ul className="flex flex-wrap gap-2 mb-2">
                          {svc.capabilities.map((cap) => (
                            <li
                              key={cap}
                              className={`text-xs md:text-sm px-3 py-1.5 rounded-full border ${
                                isLit
                                  ? "border-black/20 bg-black/[0.04] text-[var(--surface-lit-ink)]"
                                  : "border-white/10 bg-white/[0.03] text-gray-300"
                              }`}
                            >
                              {cap}
                            </li>
                          ))}
                        </ul>
                        {svc.buttonText && (
                          <a
                            href="#project"
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-2 mt-4 text-xs md:text-sm tracking-[0.2em] uppercase font-medium border rounded-full px-5 py-2.5 transition-colors ${
                              isLit
                                ? "border-black/30 hover:bg-black hover:text-[var(--surface-lit)]"
                                : "border-white/30 hover:bg-white hover:text-black"
                            }`}
                          >
                            {svc.buttonText}
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={`shrink-0 mt-1 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
