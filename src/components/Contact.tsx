import { navItems, profile } from "../data";
import { PROJECT_INQUIRY_MAILTO } from "../config";

const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  "Hi Rahul, I found your portfolio and would like to connect.",
)}`;
const phoneUrl = `tel:+91${profile.phone}`;

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-gray-500 opacity-0 -translate-x-2 transition-all duration-500 group-hover/row:opacity-100 group-hover/row:translate-x-0 group-hover/row:text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

function ContactRow({
  label,
  value,
  href,
  breakAll,
}: {
  label: string;
  value: string;
  href?: string;
  breakAll?: boolean;
}) {
  const content = (
    <>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-2">
          {label}
        </span>
        <span
          className={`block text-base md:text-lg tracking-wide text-white/85 transition-colors duration-500 group-hover/row:text-white ${
            breakAll ? "break-all" : ""
          }`}
        >
          {value}
        </span>
      </span>
      {href && <ArrowIcon />}
    </>
  );
  const className =
    "group/row flex items-center justify-between gap-4 px-6 md:px-8 py-5 md:py-6 overflow-hidden transition-colors duration-500";

  return href ? (
    <a href={href} className={`${className} hover:bg-white/[0.05]`}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Contact() {
  return (
    <div id="contact" className="relative min-h-screen text-white flex flex-col overflow-hidden bg-[#050505]">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(60,60,60,0.5) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(40,40,40,0.5) 0%, transparent 55%), #050505",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16 md:pt-32 flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row gap-14 lg:gap-24">
          <div className="w-full lg:w-6/12 flex flex-col">
            <div className="mb-7">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md px-3.5 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-gray-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-halo" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Project-based developer
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter drop-shadow-2xl mb-7 leading-[0.95]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 pb-[0.08em]">
                Get in touch
              </span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-md">
              Open to project-based web and app development conversations. WhatsApp gets the fastest reply.
            </p>

            <div className="flex flex-wrap gap-3 mt-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3.5 rounded-full bg-[var(--accent)] text-black text-sm font-medium inline-flex items-center gap-2.5 shadow-lg shadow-black/30 transition-all duration-300 hover:bg-[var(--accent-hover)] hover:shadow-xl"
              >
                Message on WhatsApp
                <WhatsAppIcon />
              </a>
              <a
                href={PROJECT_INQUIRY_MAILTO}
                className="group px-6 py-3.5 rounded-full border border-white/25 text-white text-sm inline-flex items-center gap-2.5 backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
              >
                Send an email
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-6/12 flex lg:items-center">
            <div className="w-full rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl shadow-[0_24px_70px_-20px_rgba(0,0,0,0.7)] overflow-hidden divide-y divide-white/[0.08]">
              <ContactRow label="Email" value={profile.email} href={PROJECT_INQUIRY_MAILTO} breakAll />
              <ContactRow label="Phone" value={profile.phone} href={phoneUrl} />
              <ContactRow label="Based in" value={profile.location} />
              {profile.socials.instagram && (
                <div className="px-6 md:px-8 py-6 md:py-7">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-4">Elsewhere</p>
                  <a
                    href={profile.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rahul Bhati on Instagram"
                    title="Instagram"
                    className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.07] flex items-center justify-center transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pb-9">
        <div className="border-t border-white/10 pt-6 flex flex-col-reverse md:flex-row md:items-center justify-between gap-5 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-300">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}