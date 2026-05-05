import { useState, useRef, useEffect, useCallback } from "react";
import { processMessage, getWelcomeMessage } from "../agent/aiAgent";

// ── Markdown-lite renderer (bold + italic) ───────────────────────────

function renderText(text) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((seg, j) =>
        seg.startsWith("**") && seg.endsWith("**") ? (
          <strong key={j} className="font-semibold text-ink">
            {seg.slice(2, -2)}
          </strong>
        ) : seg.startsWith("*") && seg.endsWith("*") && !seg.startsWith("**") ? (
          <em key={j} className="italic text-ink-mute">
            {seg.slice(1, -1)}
          </em>
        ) : (
          <span key={j}>{seg}</span>
        )
      )}
    </span>
  ));
}

// ── Typing indicator ─────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 rounded-full bg-accent/60"
          style={{ animation: `bounce 1s ease-in-out ${delay}ms infinite` }}
        />
      ))}
    </div>
  );
}

// ── Timestamp formatter ──────────────────────────────────────────────

function formatTime(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Bot avatar ───────────────────────────────────────────────────────

function BotAvatar() {
  return (
    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/30">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="11" r="1.5" fill="currentColor" />
        <circle cx="15" cy="11" r="1.5" fill="currentColor" />
        <path d="M9 16c1.2 1 3.8 1 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 4V2M16 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ── Main Chat Panel ──────────────────────────────────────────────────

export default function ChatPanel() {
  const [messages, setMessages] = useState([getWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;

    const userMsg = { text, isBot: false, cards: [], timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 500 + Math.random() * 800;
    setTimeout(() => {
      const response = processMessage(text);
      setMessages((prev) => [
        ...prev,
        { ...response, isBot: true, timestamp: Date.now() },
      ]);
      setTyping(false);
    }, delay);
  };

  const clearChat = () => {
    setMessages([getWelcomeMessage()]);
  };

  const quickActions = [
    { label: "Kemampuan AI", msg: "Apa saja yang bisa kamu lakukan?" },
    { label: "Tips Coding", msg: "Bantu aku soal coding" },
    { label: "Hitung", msg: "Berapa 15% dari 200" },
    { label: "Motivasi", msg: "Kasih aku motivasi" },
    { label: "Lelucon", msg: "Ceritakan lelucon" },
    { label: "Produktivitas", msg: "Tips produktivitas" },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-bg-line px-5 py-4 shrink-0">
        <div className="relative">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 ring-1 ring-accent/30">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="11" r="1.5" fill="currentColor" />
              <circle cx="15" cy="11" r="1.5" fill="currentColor" />
              <path d="M9 16c1.2 1 3.8 1 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 4V2M16 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success ring-2 ring-bg" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-ink">AI Assistant</h2>
          <p className="text-xs text-success">Online &middot; Siap membantu</p>
        </div>
        <button
          type="button"
          onClick={clearChat}
          className="rounded-lg p-2 text-ink-dim hover:text-ink hover:bg-bg-card transition-colors"
          title="Reset percakapan"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M3 12a9 9 0 1 1 3.25-6.92"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 3v4h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 no-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.isBot ? "justify-start" : "justify-end"}`}
          >
            {msg.isBot && <BotAvatar />}
            <div className="max-w-[80%] space-y-1">
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.isBot
                    ? "bg-bg-card border border-bg-line text-ink-mute rounded-tl-md"
                    : "bg-accent/15 border border-accent/20 text-ink rounded-tr-md"
                }`}
              >
                {renderText(msg.text)}
              </div>
              <p
                className={`text-[10px] text-ink-dim px-1 ${
                  msg.isBot ? "text-left" : "text-right"
                }`}
              >
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2 justify-start">
            <BotAvatar />
            <div className="rounded-2xl bg-bg-card border border-bg-line rounded-tl-md">
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick actions */}
      {messages.length <= 1 && (
        <div className="flex gap-2 px-5 pb-3 flex-wrap shrink-0">
          {quickActions.map((q) => (
            <button
              key={q.label}
              type="button"
              onClick={() => {
                setInput(q.msg);
                setTimeout(() => {
                  inputRef.current?.form?.requestSubmit();
                }, 50);
              }}
              className="rounded-full border border-bg-line bg-bg-card/60 px-3 py-1.5 text-xs text-ink-mute hover:text-ink hover:border-accent/40 transition-all"
            >
              {q.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={send}
        className="flex items-center gap-3 border-t border-bg-line px-5 py-4 shrink-0"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 rounded-xl bg-bg-card border border-bg-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-dim outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white transition-all hover:bg-accent-light disabled:opacity-30 disabled:cursor-not-allowed glow-accent"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
