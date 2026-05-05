# AI Assistant

Asisten cerdas berbasis web yang dibangun dengan **React + Vite + Tailwind CSS**. Project ini sepenuhnya client-side (tanpa backend) dengan AI agent yang bisa menjawab pertanyaan, menghitung, menerjemahkan, dan memberikan tips.

## Fitur

- **Percakapan Natural** — mendukung bahasa Indonesia dan Inggris
- **Multi-Skill Agent** — coding help, matematika, terjemahan, produktivitas
- **Smart Calculation** — hitung persentase dan operasi matematika di chat
- **Terjemahan** — terjemahkan frasa umum ID/EN
- **Motivasi & Tips** — kata-kata motivasi dan tips produktivitas
- **Dark Mode** — desain modern dengan tema gelap
- **Responsive** — mobile-friendly

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4**
- **React Router 7**
- **ESLint** untuk linting

## Getting Started

```bash
# Install dependencies
npm install

# Jalankan dev server (default: http://localhost:5173)
npm run dev

# Build production
npm run build

# Preview build production
npm run preview

# Lint
npm run lint
```

## Struktur Project

```
src/
├── agent/             # AI agent engine
│   ├── aiAgent.js     # Core processing & response generation
│   └── knowledgeBase.js  # Knowledge base & smart responses
├── components/        # Komponen reusable
│   ├── ChatPanel.jsx  # Panel chat utama
│   ├── Footer.jsx     # Footer
│   └── Navbar.jsx     # Navigation bar
├── pages/             # Halaman
│   ├── Chat.jsx       # /chat — halaman chat
│   └── Home.jsx       # / — landing page
├── App.jsx            # Routing utama
├── index.css          # Tailwind + custom CSS
└── main.jsx           # Entry point
```

## License

MIT
