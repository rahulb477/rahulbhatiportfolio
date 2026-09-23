import { useEffect, useRef, useState } from "react";
import { PROFILE_IMAGE } from "../config";

const FULL_NAME = "RAHUL BHATI".split("");

type LoadingScreenProps = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [exiting, setExiting] = useState(false);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = reducedMotion ? 650 : 3050;
    const exitDuration = reducedMotion ? 240 : 560;
    const previousOverflow = document.body.style.overflow;
    let minimumElapsed = false;
    let assetSettled = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    document.body.style.overflow = "hidden";

    const finishWhenReady = () => {
      if (!minimumElapsed || !assetSettled) return;
      setExiting(true);
      exitTimer = setTimeout(() => completeRef.current(), exitDuration);
    };

    const minimumTimer = setTimeout(() => {
      minimumElapsed = true;
      finishWhenReady();
    }, minimumDuration);

    // Preload the critical portrait. Missing/replaced files settle through onerror.
    const image = new Image();
    image.onload = image.onerror = () => {
      assetSettled = true;
      finishWhenReady();
    };
    image.src = PROFILE_IMAGE;

    if (image.complete) {
      assetSettled = true;
      finishWhenReady();
    }

    return () => {
      clearTimeout(minimumTimer);
      if (exitTimer) clearTimeout(exitTimer);
      image.onload = null;
      image.onerror = null;
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Rahul Bhati portfolio"
      className={`loader-overlay ${exiting ? "loader-overlay-exit" : ""}`}
    >
      <div aria-hidden="true" className="loader-radial" />
      <div aria-hidden="true" className="loader-core">
        <span className="loader-core-halo" />
        <span className="loader-core-dot" />
      </div>

      <div aria-hidden="true" className="loader-stage loader-name-stage">
        <div className="loader-word loader-word-name">
          {FULL_NAME.map((letter, index) =>
            letter === " " ? (
              <span key={`space-${index}`} className="loader-space" />
            ) : (
              <span
                key={`${letter}-${index}`}
                className="loader-name-letter"
                style={
                  {
                    "--loader-index": index,
                    "--loader-rise": `${index % 2 === 0 ? 0.42 : -0.42}em`,
                    "--loader-tilt": `${index % 2 === 0 ? -3 : 3}deg`,
                  } as React.CSSProperties
                }
              >
                {letter}
              </span>
            ),
          )}
        </div>
      </div>

      <div aria-hidden="true" className="loader-stage loader-portfolio-stage">
        <span className="loader-word loader-word-portfolio">PORTFOLIO</span>
      </div>
    </div>
  );
}