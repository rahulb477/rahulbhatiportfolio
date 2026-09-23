import { useEffect, useRef, useState } from "react";
import { aboutWords, stackRows } from "../data";

function StackMarquee({
  items,
  duration,
  reverse,
}: {
  items: string[];
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items, ...items];
  const track = [...doubled, ...doubled];
  return (
    <div className="marquee-row" aria-hidden="true">
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="mx-1 md:mx-1.5 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 md:px-5 md:py-2.5 text-[13px] md:text-sm text-gray-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const paraRef = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = paraRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when top at 85% viewport, 1 when bottom at 50%
      const start = vh * 0.85;
      const end = vh * 0.5;
      const p = (start - rect.top) / (start - end + rect.height);
      const clamped = Math.max(0, Math.min(1, p));
      setLit(Math.round(clamped * aboutWords.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="about"
      className="bg-[#050505] text-white pt-24 pb-0 px-6 md:px-16 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 lg:gap-24 items-center">
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-4 md:mb-6">
              About me
            </span>
            <h2 className="text-[18vw] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.85]">
              Intro
            </h2>
          </div>

          <div className="relative bg-white/5 backdrop-blur-md px-5 py-7 md:p-10 lg:p-12 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/[0.07] transition-colors duration-300 text-left">
            <p
              ref={paraRef}
              className="text-[15px] sm:text-base md:text-lg lg:text-xl leading-[1.7] md:leading-relaxed font-light"
            >
              {aboutWords.map((w, i) => {
                const isLit = i < lit;
                let cls = "transition-colors duration-300 ";
                if (w.grad) {
                  cls += isLit
                    ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                    : "font-bold text-gray-700";
                } else if (w.strong) {
                  cls += isLit ? "text-white font-medium" : "text-gray-700 font-medium";
                } else {
                  cls += isLit ? "text-gray-200" : "text-gray-700";
                }
                return (
                  <span key={i}>
                    <span className={cls}>{w.text}</span>
                    {i < aboutWords.length - 1 && " "}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>

      {/* The stack */}
      <div className="relative mt-8 -mx-6 md:-mx-16 pt-10 pb-2 bg-[#030303]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="flex items-center gap-4 px-6 md:px-16 mb-6">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 whitespace-nowrap">
            The stack
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <div className="flex flex-col gap-2.5 md:gap-3">
          {stackRows.map((row) => (
            <StackMarquee
              key={row.label}
              items={row.items}
              duration={row.duration}
              reverse={row.reverse}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
