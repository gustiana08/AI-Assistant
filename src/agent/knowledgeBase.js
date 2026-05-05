// Knowledge base for the AI assistant — general-purpose topics

export const KNOWLEDGE = [
  {
    id: "greeting",
    topic: "greeting",
    keywords: ["halo", "hai", "hi", "hello", "hey", "selamat", "pagi", "siang", "sore", "malam", "yo", "sup"],
    responses: [
      "Halo! Aku **AI Assistant**, siap membantumu. Ada yang bisa aku bantu hari ini?",
      "Hai! Selamat datang! Aku bisa bantu menjawab pertanyaan, memberikan rekomendasi, menerjemahkan, dan banyak lagi. Mau mulai dari mana?",
      "Hey! Aku AI Assistant-mu. Tanyakan apa saja dan aku akan berusaha membantu!",
    ],
  },
  {
    id: "help",
    topic: "capabilities",
    keywords: ["bisa", "apa", "help", "bantu", "fitur", "feature", "kemampuan", "fungsi", "menu", "cara"],
    responses: [
      "Ini yang bisa aku lakukan:\n\n" +
        "- **Tanya Jawab** — tanya apapun dan aku coba jawab\n" +
        "- **Terjemahan** — terjemahkan teks antar bahasa\n" +
        "- **Coding Help** — bantu debugging, jelaskan konsep programming\n" +
        "- **Matematika** — hitung dan jelaskan rumus\n" +
        "- **Penulisan** — bantu menulis email, essay, atau konten\n" +
        "- **Tips & Saran** — rekomendasi, tips produktivitas, dll\n\n" +
        "Coba ketik pertanyaanmu!",
    ],
  },
  {
    id: "thanks",
    topic: "thanks",
    keywords: ["terima kasih", "makasih", "thanks", "thank you", "thx", "ty", "trims"],
    responses: [
      "Sama-sama! Senang bisa membantu!",
      "No problem! Kalau ada pertanyaan lain, tanya aja!",
      "You're welcome! Aku selalu siap membantu.",
    ],
  },
  {
    id: "bye",
    topic: "farewell",
    keywords: ["bye", "dadah", "sampai jumpa", "see you", "dah", "selamat tinggal"],
    responses: [
      "Sampai jumpa! Semoga harimu menyenangkan!",
      "Bye! Jangan ragu untuk kembali kalau butuh bantuan!",
      "Dadah! Senang bisa mengobrol denganmu!",
    ],
  },
  {
    id: "name",
    topic: "identity",
    keywords: ["nama", "siapa", "name", "who", "kamu siapa", "namamu"],
    responses: [
      "Aku **AI Assistant**, asisten cerdas yang siap membantumu kapan saja! Aku dibuat untuk menjadi temanmu dalam menjawab pertanyaan dan menyelesaikan tugas.",
    ],
  },
  {
    id: "joke",
    topic: "humor",
    keywords: ["joke", "lelucon", "lucu", "humor", "lawak", "ketawa", "funny", "guyonan"],
    responses: [
      "Kenapa programmer selalu bingung antara Halloween dan Christmas?\nKarena **31 OCT = 25 DEC** (Octal 31 = Decimal 25)!",
      "Apa bedanya bug dan fitur?\nBug itu ketika program melakukan sesuatu yang tidak kamu mau.\nFitur itu ketika program melakukan sesuatu yang tidak kamu mau... tapi kamu bilang itu disengaja.",
      "Kenapa AI tidak pernah kesepian?\nKarena selalu ada **array** teman-teman di sekitarnya!",
      "Seorang programmer masuk ke bar dan memesan 1.0000000001 bir.\nBartender: \"Aku bulatkan jadi 1 ya?\"\nProgrammer: \"Terima kasih, itu floating point error.\"",
    ],
  },
  {
    id: "weather",
    topic: "weather",
    keywords: ["cuaca", "weather", "hujan", "panas", "cerah", "mendung", "hari ini"],
    responses: [
      "Maaf, aku belum bisa mengakses data cuaca real-time. Tapi aku sarankan cek **BMKG** atau aplikasi cuaca di HP-mu untuk info terkini!",
    ],
  },
  {
    id: "time",
    topic: "time",
    keywords: ["jam", "waktu", "time", "tanggal", "hari", "date"],
    responses: [
      `Sekarang adalah **${new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}**, pukul **${new Date().toLocaleTimeString("id-ID")}**.`,
    ],
  },
  {
    id: "translate",
    topic: "translation",
    keywords: ["terjemah", "translate", "bahasa", "artinya", "artikan", "arti"],
    responses: [
      "Aku bisa membantu terjemahan! Berikan kalimat yang ingin diterjemahkan beserta bahasa tujuannya. Contoh:\n\n\"Terjemahkan 'selamat pagi' ke bahasa Inggris\"\n\nNote: Kemampuan terjemahanku terbatas pada pengetahuan dasar beberapa bahasa.",
    ],
  },
  {
    id: "coding",
    topic: "programming",
    keywords: ["code", "coding", "program", "javascript", "python", "html", "css", "react", "bug", "error", "debug"],
    responses: [
      "Aku bisa bantu soal programming! Beritahu aku:\n\n- **Bahasa/framework** yang kamu gunakan\n- **Masalah spesifik** yang kamu hadapi\n- **Code snippet** jika ada\n\nAku akan berusaha memberikan solusi atau penjelasan yang mudah dipahami!",
    ],
  },
  {
    id: "math",
    topic: "mathematics",
    keywords: ["hitung", "kalkulator", "math", "matematika", "rumus", "berapa", "hasil", "jumlah", "tambah", "kurang", "kali", "bagi"],
    responses: [
      "Aku bisa bantu perhitungan! Coba berikan soal matematikanya. Contoh:\n- \"Berapa 15% dari 200?\"\n- \"Jelaskan rumus luas lingkaran\"\n- \"Berapa 123 x 456?\"\n\nAku akan hitung dan jelaskan langkahnya!",
    ],
  },
  {
    id: "motivation",
    topic: "motivation",
    keywords: ["motivasi", "semangat", "inspire", "inspirasi", "quotes", "kata bijak", "down", "sedih", "galau"],
    responses: [
      "\"Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan.\" — Albert Schweitzer\n\nSemangat! Setiap langkah kecil yang kamu ambil hari ini membawamu lebih dekat ke tujuanmu.",
      "\"Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan.\" — Steve Jobs\n\nKamu sedang di jalur yang benar. Terus maju!",
      "\"Jatuh itu biasa. Bangkit kembali itu luar biasa.\"\n\nApapun yang sedang kamu hadapi, ingat bahwa kamu lebih kuat dari yang kamu kira. Aku percaya padamu!",
    ],
  },
  {
    id: "productivity",
    topic: "productivity",
    keywords: ["produktif", "fokus", "tips", "efisien", "manajemen waktu", "procrastinate", "malas"],
    responses: [
      "Tips produktivitas:\n\n" +
        "1. **Pomodoro Technique** — kerja 25 menit, istirahat 5 menit\n" +
        "2. **Eat the Frog** — kerjakan tugas tersulit di pagi hari\n" +
        "3. **Two-Minute Rule** — kalau bisa selesai dalam 2 menit, langsung kerjakan\n" +
        "4. **Time Blocking** — alokasikan waktu spesifik untuk setiap tugas\n" +
        "5. **Digital Detox** — matikan notifikasi saat fokus\n\n" +
        "Mau tips lebih detail tentang salah satunya?",
    ],
  },
];

export const SMART_RESPONSES = {
  calculation: {
    pattern: /berapa\s+(\d+)\s*([+\-*/x×÷]|tambah|kurang|kali|bagi|plus|minus|times|divided)\s*(\d+)/i,
    handler: (match) => {
      const a = parseFloat(match[1]);
      const b = parseFloat(match[3]);
      const opRaw = match[2].toLowerCase();
      const ops = {
        "+": "+", tambah: "+", plus: "+",
        "-": "-", kurang: "-", minus: "-",
        "*": "x", x: "x", "×": "x", kali: "x", times: "x",
        "/": "÷", "÷": "÷", bagi: "÷", divided: "÷",
      };
      const op = ops[opRaw] || opRaw;
      let result;
      switch (op) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "x": result = a * b; break;
        case "÷": result = b !== 0 ? a / b : "Error (bagi nol!)"; break;
        default: return null;
      }
      return {
        text: `**${a} ${op} ${b} = ${result}**`,
        cards: [],
      };
    },
  },
  percentage: {
    pattern: /berapa\s+(\d+)%?\s*(dari|of)\s+(\d+)/i,
    handler: (match) => {
      const pct = parseFloat(match[1]);
      const total = parseFloat(match[3]);
      const result = (pct / 100) * total;
      return {
        text: `**${pct}% dari ${total} = ${result}**`,
        cards: [],
      };
    },
  },
  translate_simple: {
    pattern: /terjemah(kan)?\s+['"]?(.+?)['"]?\s+(ke|to)\s+(inggris|english|indonesia|indonesian)/i,
    handler: (match) => {
      const phrase = match[2].trim();
      const target = match[4].toLowerCase();
      const dict = {
        "selamat pagi": "good morning",
        "selamat siang": "good afternoon",
        "selamat sore": "good evening",
        "selamat malam": "good night",
        "terima kasih": "thank you",
        "apa kabar": "how are you",
        "good morning": "selamat pagi",
        "good afternoon": "selamat siang",
        "good evening": "selamat sore",
        "good night": "selamat malam",
        "thank you": "terima kasih",
        "how are you": "apa kabar",
        "hello": "halo",
        "halo": "hello",
      };
      const key = phrase.toLowerCase();
      if (dict[key]) {
        const langLabel = target.includes("inggris") || target.includes("english") ? "Inggris" : "Indonesia";
        return {
          text: `**"${phrase}"** dalam bahasa ${langLabel}:\n\n**"${dict[key]}"**`,
          cards: [],
        };
      }
      return {
        text: `Maaf, aku belum bisa menerjemahkan "${phrase}". Coba frasa yang lebih umum atau gunakan Google Translate untuk hasil yang lebih akurat.`,
        cards: [],
      };
    },
  },
};
