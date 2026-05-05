import { Link, NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Beranda" },
  { to: "/chat", label: "Chat" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-bg-line">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 ring-1 ring-accent/40">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="11" r="1.5" fill="currentColor" />
              <circle cx="15" cy="11" r="1.5" fill="currentColor" />
              <path d="M9 16c1.2 1 3.8 1 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 4V2M16 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            AI <span className="text-gradient">Assistant</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 ml-6">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-lg transition ${
                  isActive
                    ? "text-ink bg-accent/10"
                    : "text-ink-mute hover:text-ink hover:bg-white/5"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs text-success border border-success/20">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Online
          </span>
        </div>
      </div>
    </header>
  );
}
