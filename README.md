# YouTube Clip Bot — Telegram AI Agent

Bot Telegram untuk memotong (clip) video YouTube secara otomatis. Kirim link YouTube + timestamp, bot akan download, potong, dan kirim hasilnya langsung ke chat Telegram.

## Fitur

- **Clip Video YouTube** — potong video berdasarkan timestamp mulai & akhir
- **Auto-detect Link** — kirim link YouTube dan bot otomatis tampilkan info video
- **Format Fleksibel** — support format waktu `MM:SS`, `HH:MM:SS`, atau detik
- **Optimasi Telegram** — video di-encode ulang agar ringan dan support streaming
- **Bahasa Indonesia** — semua pesan bot dalam bahasa Indonesia

## Tech Stack

- **Python 3.12+**
- **python-telegram-bot** — library Telegram Bot API
- **yt-dlp** — download video YouTube
- **ffmpeg** — potong dan encode video

## Getting Started

### Prerequisites

- Python 3.12+
- ffmpeg (`sudo apt install ffmpeg`)
- Telegram Bot Token dari [@BotFather](https://t.me/BotFather)

### Install

```bash
# Clone repo
git clone https://github.com/gustiana08/AI-Assistant.git
cd AI-Assistant

# Install dependencies
pip install -r requirements.txt

# Set bot token
export TELEGRAM_BOT_TOKEN='your-token-here'

# Jalankan bot
python bot.py
```

## Cara Pakai

1. Buka bot di Telegram
2. Kirim `/start` untuk memulai
3. Clip video dengan format:
   ```
   /clip <URL_YOUTUBE> <mulai> <akhir>
   ```
4. Contoh:
   ```
   /clip https://youtu.be/dQw4w9WgXcQ 0:30 1:00
   /clip https://youtube.com/watch?v=abc123 1:20 2:45
   ```

### Format Waktu

| Format    | Contoh   | Artinya       |
| --------- | -------- | ------------- |
| `MM:SS`   | `1:30`   | 1 menit 30 detik |
| `HH:MM:SS`| `1:05:30`| 1 jam 5 menit 30 detik |
| Detik     | `90`     | 90 detik      |

### Batasan

- Durasi clip maksimal: **10 menit**
- Ukuran file maksimal: **50 MB** (limit Telegram)
- Resolusi: otomatis dipilih max **720p**

## Struktur Project

```
├── bot.py              # Main Telegram bot
├── clipper.py           # YouTube download & clip engine
├── requirements.txt     # Python dependencies
└── README.md
```

## License

MIT
