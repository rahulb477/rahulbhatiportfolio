import { useEffect, useState } from "react";
import { profile, navItems } from "../data";
import { LOGO_IMAGE } from "../config";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = navItems
      .map((n) => document.getElementById(n.toLowerCase()))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${
          menuOpen || scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-12 md:py-6">
          <a
            href="#home"
            aria-label={profile.name}
            onClick={() => setMenuOpen(false)}
            className="group relative z-50 inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            <img
              src={LOGO_IMAGE}
              alt=""
              aria-hidden="true"
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <span className="sr-only">{profile.name}</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    className={`relative text-sm tracking-wide transition-colors duration-300 ${
                      active === id ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${
                        active === id ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden relative z-50 w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
        {/* Scroll progress */}
        <div className="absolute bottom-0 left-0 h-px bg-[var(--accent)]" style={{ width: `${progress * 100}%` }} />
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => {
            const id = item.toLowerCase();
            return (
              <li
                key={item}
                className={`transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : "0ms" }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tight text-white/90 hover:text-[var(--accent)] transition-colors"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
