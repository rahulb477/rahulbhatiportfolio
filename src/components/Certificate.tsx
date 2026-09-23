import { useEffect, useState } from "react";
import { CERTIFICATE_IMAGE } from "../config";
import { useReveal } from "../hooks/useReveal";

export default function Certificate() {
  const sectionRef = useReveal<HTMLDivElement>();
  const [loaded, setLoaded] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!previewOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [previewOpen]);

  return (
    <section id="certificate" className="bg-[#050505] text-white px-6 md:px-16 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mb-12 md:mb-16">
          <div>
            <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-4">
              Certificate
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700">
              Project-Based Achievement
            </h2>
          </div>
          <p className="max-w-sm text-sm md:text-base leading-relaxed text-gray-400 lg:text-right">
            A replaceable visual record of Rahul's developer achievement.
          </p>
        </div>

        <div ref={sectionRef} className="reveal">
          <button
            type="button"
            disabled={!loaded}
            onClick={() => loaded && setPreviewOpen(true)}
            aria-label={loaded ? "Open Rahul Bhati certificate preview" : undefined}
            className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080808] p-2 sm:p-3 transition-colors duration-500 hover:border-white/25 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <img
              src={CERTIFICATE_IMAGE}
              alt="Rahul Bhati Certificate of Achievement"
              onLoad={() => setLoaded(true)}
              onError={() => setUnavailable(true)}
              className={`w-full h-auto max-h-[80vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.008] ${
                loaded ? "block" : "hidden"
              }`}
            />
            {unavailable && (
              <span className="flex aspect-[16/10] w-full flex-col items-center justify-center px-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">
                  Certificate asset ready
                </span>
                <span className="max-w-md text-sm sm:text-base text-gray-400 leading-relaxed">
                  Place the supplied certificate at public/images/rahul-certificate.png. It will appear here automatically.
                </span>
              </span>
            )}
            {loaded && (
              <span className="absolute bottom-5 right-5 hidden sm:inline-flex px-3 py-2 rounded-full bg-black/70 border border-white/10 text-[9px] uppercase tracking-[0.24em] text-gray-300 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                View larger
              </span>
            )}
          </button>
        </div>
      </div>

      {previewOpen && loaded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Rahul Bhati certificate preview"
          className="fixed inset-0 z-[100] bg-black/95 px-4 py-8 sm:p-10 flex items-center justify-center"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) setPreviewOpen(false);
          }}
        >
          <img
            src={CERTIFICATE_IMAGE}
            alt="Rahul Bhati Certificate of Achievement"
            className="max-w-full max-h-full object-contain"
          />
          <button
            type="button"
            autoFocus
            onClick={() => setPreviewOpen(false)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 bg-black/70 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close certificate preview"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}