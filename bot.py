"""Telegram Bot — AI Agent for clipping YouTube videos."""

import logging
import os
import re

from telegram import Update
from telegram.error import Conflict
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from clipper import (
    cleanup_file,
    download_and_clip,
    extract_video_info,
    format_duration,
    parse_timestamp,
)

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

YOUTUBE_RE = re.compile(
    r"(?:https?://)?(?:www\.|m\.)?(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/shorts/)([\w-]{11})"
)

HELP_TEXT = (
    "🎬 *YouTube Clip Bot*\n\n"
    "Aku bisa memotong video YouTube jadi clip pendek dan mengirimnya langsung ke sini\\!\n\n"
    "*Cara pakai:*\n"
    "1\\. Kirim perintah `/clip` dengan format:\n"
    "   `/clip <URL> <mulai> <akhir>`\n\n"
    "*Contoh:*\n"
    "`/clip https://youtu.be/dQw4w9WgXcQ 0:30 1:00`\n"
    "`/clip https://youtube.com/watch?v=dQw4w9WgXcQ 1:20 2:45`\n\n"
    "*Format waktu:*\n"
    "• `MM:SS` \\— contoh: `1:30`\n"
    "• `HH:MM:SS` \\— contoh: `1:05:30`\n"
    "• Detik \\— contoh: `90`\n\n"
    "*Batasan:*\n"
    "• Maksimal durasi clip: 10 menit\n"
    "• Maksimal ukuran file: 50MB\n\n"
    "Atau cukup kirim link YouTube dan aku akan tanya detail clip\\-nya\\!"
)


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /start command."""
    await update.message.reply_text(
        "👋 Halo\\! Aku *YouTube Clip Bot*\\.\n\n"
        "Kirim `/clip <URL> <mulai> <akhir>` untuk memotong video YouTube\\.\n"
        "Atau kirim `/help` untuk info lebih lanjut\\.",
        parse_mode="MarkdownV2",
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /help command."""
    await update.message.reply_text(HELP_TEXT, parse_mode="MarkdownV2")


async def clip_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle /clip command — download and clip a YouTube video."""
    if not context.args or len(context.args) < 3:
        await update.message.reply_text(
            "⚠️ Format: `/clip <URL> <mulai> <akhir>`\n"
            "Contoh: `/clip https://youtu.be/dQw4w9WgXcQ 0:30 1:00`",
            parse_mode="Markdown",
        )
        return

    url = context.args[0]
    start_str = context.args[1]
    end_str = context.args[2]

    # Validate URL
    if not YOUTUBE_RE.search(url):
        await update.message.reply_text("❌ URL YouTube tidak valid. Cek lagi link-nya.")
        return

    # Parse timestamps
    try:
        start_sec = parse_timestamp(start_str)
        end_sec = parse_timestamp(end_str)
    except ValueError as e:
        await update.message.reply_text(f"❌ {e}")
        return

    if end_sec <= start_sec:
        await update.message.reply_text("❌ Waktu akhir harus lebih besar dari waktu mulai.")
        return

    clip_duration = end_sec - start_sec
    if clip_duration > 600:
        await update.message.reply_text("❌ Durasi clip maksimal 10 menit.")
        return

    # Get video info first
    status_msg = await update.message.reply_text("🔍 Mengambil info video...")

    try:
        info = extract_video_info(url)
    except Exception as e:
        logger.error("Failed to extract video info: %s", e)
        await status_msg.edit_text("❌ Gagal mengambil info video. Pastikan URL valid dan video tersedia.")
        return

    video_duration = info["duration"]
    if video_duration and end_sec > video_duration:
        await status_msg.edit_text(
            f"❌ Waktu akhir ({format_duration(end_sec)}) melebihi durasi video ({format_duration(video_duration)})."
        )
        return

    await status_msg.edit_text(
        f"📹 *{_escape_md(info['title'])}*\n"
        f"⏱ Clip: {_escape_md(format_duration(start_sec))} → {_escape_md(format_duration(end_sec))} "
        f"\\({_escape_md(format_duration(clip_duration))}\\)\n\n"
        f"⬇️ Mendownload dan memotong video\\.\\.\\.",
        parse_mode="MarkdownV2",
    )

    # Download and clip
    clip_path = None
    try:
        clip_path = download_and_clip(url, start_sec, end_sec)
    except ValueError as e:
        await status_msg.edit_text(f"❌ {e}")
        return
    except Exception as e:
        logger.error("Clip failed: %s", e)
        await status_msg.edit_text("❌ Gagal membuat clip. Coba lagi nanti.")
        return

    # Send clip
    await status_msg.edit_text("📤 Mengirim clip...")

    try:
        file_size_mb = os.path.getsize(clip_path) / (1024 * 1024)
        caption = (
            f"🎬 {info['title']}\n"
            f"⏱ {format_duration(start_sec)} → {format_duration(end_sec)} "
            f"({format_duration(clip_duration)})\n"
            f"📦 {file_size_mb:.1f} MB"
        )
        with open(clip_path, "rb") as video_file:
            await update.message.reply_video(
                video=video_file,
                caption=caption,
                supports_streaming=True,
                read_timeout=120,
                write_timeout=120,
            )
        await status_msg.delete()
    except Exception as e:
        logger.error("Failed to send clip: %s", e)
        await status_msg.edit_text("❌ Gagal mengirim clip. File mungkin terlalu besar.")
    finally:
        if clip_path:
            cleanup_file(clip_path)


async def handle_youtube_link(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle messages that contain a YouTube link (without /clip command)."""
    text = update.message.text or ""
    match = YOUTUBE_RE.search(text)
    if not match:
        return

    url = match.group(0)
    if not url.startswith("http"):
        url = "https://" + url

    try:
        info = extract_video_info(url)
        duration_str = format_duration(info["duration"]) if info["duration"] else "Unknown"
        await update.message.reply_text(
            f"📹 *{_escape_md(info['title'])}*\n"
            f"👤 {_escape_md(info['uploader'])}\n"
            f"⏱ Durasi: {_escape_md(duration_str)}\n\n"
            f"Mau clip video ini? Gunakan:\n"
            f"`/clip {url} <mulai> <akhir>`\n\n"
            f"Contoh: `/clip {url} 0:30 1:00`",
            parse_mode="MarkdownV2",
        )
    except Exception as e:
        logger.error("Failed to get info for auto-detected link: %s", e)


def _escape_md(text: str) -> str:
    """Escape special characters for MarkdownV2."""
    special = r"_*[]()~`>#+-=|{}.!"
    return "".join(f"\\{c}" if c in special else c for c in str(text))


def main() -> None:
    """Start the bot."""
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not token:
        raise RuntimeError(
            "TELEGRAM_BOT_TOKEN belum di-set. "
            "Jalankan: export TELEGRAM_BOT_TOKEN='your-token-here'"
        )

    app = Application.builder().token(token).build()

    app.add_handler(CommandHandler("start", start_command))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("clip", clip_command))
    app.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND, handle_youtube_link)
    )

    async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
        """Handle errors in the bot."""
        if isinstance(context.error, Conflict):
            logger.error(
                "Conflict: bot instance lain sedang berjalan. "
                "Pastikan hanya satu instance yang aktif."
            )
            return
        logger.error("Update %s caused error: %s", update, context.error)

    app.add_error_handler(error_handler)

    logger.info("Bot started! Waiting for messages...")
    app.run_polling(allowed_updates=Update.ALL_TYPES, drop_pending_updates=True)


if __name__ == "__main__":
    main()
