import { useEffect, useState } from "react";
import { PROFILE_IMAGE } from "../config";
import { profile } from "../data";

const wordmarkClass =
  "flex items-baseline whitespace-nowrap text-[13vw] sm:text-[11vw] md:text-[8.5vw] xl:text-[8rem] font-black tracking-tighter drop-shadow-2xl leading-none uppercase";
const gradClass =
  "text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoUnavailable, setPhotoUnavailable] = useState(false);

  useEffect(() => {
    const target = profile.wordmark;
    let index = 0;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    const typingTimer = setInterval(() => {
      index += 1;
      setTyped(target.slice(0, index));
      if (index >= target.length) {
        clearInterval(typingTimer);
        doneTimer = setTimeout(() => setDone(true), 400);
      }
    }, 130);

    return () => {
      clearInterval(typingTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, []);

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 42%, #222222 0%, #000000 76%)" }}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />

      <div className="relative z-10 min-h-[100svh] flex flex-col items-center px-4 pt-28 sm:pt-32 md:pt-36 pb-7">
        <div className="flex flex-col items-center text-center w-full shrink-0">
          <h1 className={`${wordmarkClass} ${gradClass}`}>
            <span>{typed}</span>
            {!done && <span className="type-dot self-center" />}
          </h1>

          <p
            className={`mt-4 md:mt-6 text-white text-base sm:text-lg md:text-2xl lg:text-3xl font-bold drop-shadow-md transition-all duration-700 ${
              done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {profile.role}
          </p>
          <p
            className={`mt-2 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.16em] sm:tracking-[0.28em] text-gray-300 drop-shadow-md text-center transition-all duration-700 delay-100 ${
              done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {profile.secondaryRole}
          </p>

          <div
            className={`mt-7 sm:mt-8 flex items-center gap-3 transition-all duration-700 delay-200 ${
              done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#project"
              className="min-h-11 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors duration-300"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="min-h-11 px-6 py-3 rounded-full border border-white/25 bg-black/20 backdrop-blur-md text-white text-sm hover:bg-white hover:text-black hover:border-white transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>

        {/* The image participates in document flow, so it always sits below the CTAs. */}
        <div className="hero-profile-wrap relative mt-7 sm:mt-8 flex-1 min-h-[16rem] w-full flex items-end justify-center overflow-hidden pointer-events-none select-none">
          {!photoUnavailable && (
            <img
              src={PROFILE_IMAGE}
              alt="Rahul Bhati"
              onLoad={() => setPhotoLoaded(true)}
              onError={() => setPhotoUnavailable(true)}
              className={`hero-profile-image block max-w-full object-contain object-bottom transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                photoLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            />
          )}
          {photoUnavailable && (
            <div aria-hidden="true" className="text-[44vw] sm:text-[17rem] font-black leading-[0.78] tracking-tighter text-white/[0.035]">
              RB
            </div>
          )}
        </div>

        <a href="#about" className="relative z-10 mt-3 flex shrink-0 flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors" aria-label="Scroll to About">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="w-px h-7 bg-gradient-to-b from-current to-transparent" />
        </a>
      </div>
    </section>
  );
}