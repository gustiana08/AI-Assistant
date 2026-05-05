import { KNOWLEDGE, SMART_RESPONSES } from "./knowledgeBase";

function norm(s) {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function matchKeywords(text, keywords) {
  const normalized = norm(text);
  let score = 0;
  for (const kw of keywords) {
    if (normalized.includes(kw)) score++;
  }
  return score;
}

function trySmartResponse(text) {
  for (const key of Object.keys(SMART_RESPONSES)) {
    const { pattern, handler } = SMART_RESPONSES[key];
    const match = text.match(pattern);
    if (match) {
      const result = handler(match);
      if (result) return result;
    }
  }
  return null;
}

function findBestMatch(text) {
  let bestEntry = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    const score = matchKeywords(text, entry.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  return bestScore > 0 ? bestEntry : null;
}

export function processMessage(userMessage) {
  const smartResult = trySmartResponse(userMessage);
  if (smartResult) return smartResult;

  const match = findBestMatch(userMessage);
  if (match) {
    return {
      text: pick(match.responses),
      cards: [],
    };
  }

  const fallbacks = [
    "Hmm, aku kurang paham pertanyaanmu. Bisa coba ulangi dengan cara berbeda?",
    "Maaf, aku belum bisa menjawab itu. Coba tanya tentang coding, matematika, tips produktivitas, atau ketik **\"help\"** untuk lihat kemampuanku!",
    "Aku belum mengerti pertanyaan itu, tapi aku terus belajar! Coba tanya hal lain atau ketik **\"help\"** untuk melihat apa yang bisa aku bantu.",
    "Pertanyaan menarik! Sayangnya aku belum punya jawaban untuk itu. Coba tanya yang lain?",
  ];

  return {
    text: pick(fallbacks),
    cards: [],
  };
}

export function getWelcomeMessage() {
  return {
    text:
      "Halo! Aku **AI Assistant** -- asisten cerdas yang siap membantumu.\n\n" +
      "Beberapa hal yang bisa aku lakukan:\n" +
      "- Menjawab pertanyaan umum\n" +
      "- Membantu perhitungan matematika\n" +
      "- Tips coding & produktivitas\n" +
      "- Terjemahan sederhana\n" +
      "- Dan masih banyak lagi!\n\n" +
      "Coba ketik sesuatu atau pilih topik di bawah!",
    cards: [],
    isBot: true,
    timestamp: Date.now(),
  };
}
