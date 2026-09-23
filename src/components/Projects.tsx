import { useState } from "react";
import { projects } from "../data";
import type { Project } from "../data";
import { useReveal } from "../hooks/useReveal";

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

function ProjectPreview({ project, index }: { project: Project; index: number }) {
  const [imageReady, setImageReady] = useState(false);
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open live preview of ${project.name}`}
      className="project-preview group/preview relative block aspect-[16/10] overflow-hidden bg-[#080808] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
    >
      {!imageUnavailable && (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          onLoad={() => setImageReady(true)}
          onError={() => setImageUnavailable(true)}
          className={`project-preview-media absolute inset-0 w-full h-full object-cover ${imageReady ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {(!imageReady || imageUnavailable) && (
        <div className="project-preview-fallback absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-gray-600">
            <span>Live website</span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-gray-500 mb-3">
              {project.category}
            </span>
            <span className="block max-w-3xl text-[10vw] sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.84] text-white/[0.10]">
              {project.name}
            </span>
          </div>
        </div>
      )}

      <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/preview:opacity-100" />
      <span className="absolute right-5 bottom-5 sm:right-7 sm:bottom-7 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-white opacity-0 translate-y-2 transition-all duration-500 group-hover/preview:opacity-100 group-hover/preview:translate-y-0">
        View project <ArrowIcon />
      </span>
    </a>
  );
}

function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  const revealRef = useReveal<HTMLElement>();
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={revealRef}
      className="reveal project-case-study group border-t border-white/10 pt-6 sm:pt-8"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="flex items-center justify-between gap-4 mb-6 text-[10px] uppercase tracking-[0.28em] text-gray-500">
        <span className="project-number transition-transform duration-500 ease-out group-hover:translate-x-1">
          {number} / 03
        </span>
        <span className="text-right">{project.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.16fr_0.84fr] gap-8 lg:gap-16 xl:gap-24 items-center">
        <div className={reversed ? "lg:order-2" : ""}>
          <div className="project-preview-frame border border-white/10 p-1.5 sm:p-2 transition-colors duration-500 group-hover:border-white/25">
            <ProjectPreview project={project} index={index} />
          </div>
        </div>

        <div className={reversed ? "lg:order-1" : ""}>
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black tracking-tighter uppercase leading-[0.9] text-[#e7e4de] mb-5 md:mb-7">
            {project.name}
          </h3>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-6">
            {project.category}
          </p>
          <p className="max-w-xl text-sm md:text-base leading-relaxed text-gray-400 mb-7 md:mb-9">
            {project.description}
          </p>

          <ul aria-label={`${project.name} capabilities`} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8 md:mb-10">
            {project.capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-2 text-[10px] uppercase tracking-[0.16em] leading-relaxed text-gray-500">
                <span aria-hidden="true" className="mt-[0.55em] w-3 h-px bg-white/25 shrink-0" />
                {capability}
              </li>
            ))}
          </ul>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live preview of ${project.name}`}
            className="group/link inline-flex min-h-12 items-center gap-3 border border-white/20 px-5 sm:px-6 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Live Preview
            <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="project" className="bg-[#050505] w-full text-white pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.42fr] gap-8 lg:gap-16 items-end mb-20 md:mb-28 lg:mb-36">
          <div>
            <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-5">
              03 — Selected Work
            </span>
            <h2 className="text-[17vw] sm:text-[6.8rem] lg:text-[8.5rem] xl:text-[10rem] font-black tracking-tighter leading-[0.76] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700">
              <span className="block">Selected</span>
              <span className="block">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base leading-relaxed text-gray-400 lg:pb-2">
            Three real-world websites built through design, development and AI-assisted workflows.
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-36 lg:gap-44">
          {projects.map((project, index) => (
            <ProjectCaseStudy key={project.name} project={project} index={index} />
          ))}
        </div>

        <p className="mt-24 md:mt-36 pt-7 border-t border-white/10 text-xs uppercase tracking-[0.24em] text-gray-600">
          More experiments are on the way.
        </p>
      </div>
    </section>
  );
}