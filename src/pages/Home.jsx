import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path d="M12 3C7 3 3 6.58 3 11c0 2.52 1.36 4.76 3.5 6.2V21l3.14-1.73C10.39 19.42 11.18 19.5 12 19.5c5 0 9-3.58 9-8S17 3 12 3z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Percakapan Natural",
    desc: "Chat dengan AI yang memahami bahasa Indonesia dan Inggris secara alami.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Multi-Skill Agent",
    desc: "Dari coding help, matematika, terjemahan, sampai tips produktivitas.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Respon Instan",
    desc: "Jawaban cepat dan relevan tanpa perlu menunggu loading lama.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Smart Calculation",
    desc: "Hitung persentase, operasi matematika, dan konversi langsung di chat.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 1 0 6 0V5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Terjemahan",
    desc: "Terjemahkan frasa umum antara bahasa Indonesia dan Inggris.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Motivasi & Tips",
    desc: "Dapatkan kata-kata motivasi dan tips produktivitas kapan saja.",
  },
];

const STATS = [
  { value: "10+", label: "Skill Topics" },
  { value: "24/7", label: "Always Online" },
  { value: "<1s", label: "Response Time" },
  { value: "ID/EN", label: "Bilingual" },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 md:px-8 md:pt-32 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs text-accent mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            AI Agent &middot; Powered by Intelligence
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Your Smart
            <br />
            <span className="text-gradient">AI Assistant</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-mute">
            Asisten cerdas yang siap membantu menjawab pertanyaan, menghitung,
            memberikan tips, dan banyak lagi. Langsung di browser-mu.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-light glow-accent"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M12 3C7 3 3 6.58 3 11c0 2.52 1.36 4.76 3.5 6.2V21l3.14-1.73C10.39 19.42 11.18 19.5 12 19.5c5 0 9-3.58 9-8S17 3 12 3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Mulai Chat
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-bg-line bg-bg-card px-6 py-3 text-sm font-semibold text-ink-mute transition-all hover:text-ink hover:border-accent/30"
            >
              Lihat Fitur
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-2xl mx-auto">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-bg-line bg-bg-card/50 px-4 py-3"
              >
                <p className="text-2xl font-bold text-accent">{s.value}</p>
                <p className="text-xs text-ink-dim mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-bg-soft py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Kemampuan <span className="text-gradient">AI Agent</span>
            </h2>
            <p className="mt-3 text-ink-mute max-w-lg mx-auto">
              Didesain untuk membantu berbagai kebutuhan sehari-hari dengan
              respons yang cepat dan akurat.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-bg-line bg-bg-card/50 p-6 transition-all hover:border-accent/30 hover:bg-bg-card"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent mb-4 group-hover:bg-accent/15 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-ink mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-ink-mute leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="relative rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-bg-card to-bg-card p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
            <div className="relative">
              <h2 className="text-2xl font-bold md:text-3xl">
                Siap Mencoba?
              </h2>
              <p className="mt-3 text-ink-mute max-w-md mx-auto">
                Mulai percakapan dengan AI Assistant sekarang. Gratis, tanpa
                registrasi, langsung di browser.
              </p>
              <Link
                to="/chat"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-light glow-accent"
              >
                Mulai Chat Sekarang
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
