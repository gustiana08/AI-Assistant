"""YouTube video downloader and clipper using yt-dlp + ffmpeg."""

import os
import re
import subprocess
import tempfile

import yt_dlp

DOWNLOADS_DIR = os.path.join(os.path.dirname(__file__), "downloads")
os.makedirs(DOWNLOADS_DIR, exist_ok=True)


def parse_timestamp(ts: str) -> int:
    """Parse timestamp string to seconds. Supports HH:MM:SS, MM:SS, or raw seconds."""
    ts = ts.strip()

    match = re.match(r"^(\d+):(\d{1,2}):(\d{1,2})$", ts)
    if match:
        h, m, s = int(match.group(1)), int(match.group(2)), int(match.group(3))
        return h * 3600 + m * 60 + s

    match = re.match(r"^(\d+):(\d{1,2})$", ts)
    if match:
        m, s = int(match.group(1)), int(match.group(2))
        return m * 60 + s

    match = re.match(r"^(\d+)$", ts)
    if match:
        return int(match.group(1))

    raise ValueError(f"Format timestamp tidak valid: '{ts}'. Gunakan MM:SS atau HH:MM:SS")


def format_duration(seconds) -> str:
    """Format seconds to human-readable duration."""
    seconds = int(seconds)
    m, s = divmod(seconds, 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m}:{s:02d}"


def extract_video_info(url: str) -> dict:
    """Extract video metadata without downloading."""
    opts = {
        "quiet": True,
        "no_warnings": True,
        "extract_flat": False,
    }
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(url, download=False)
    return {
        "title": info.get("title", "Unknown"),
        "duration": info.get("duration", 0),
        "uploader": info.get("uploader", "Unknown"),
        "thumbnail": info.get("thumbnail", ""),
        "webpage_url": info.get("webpage_url", url),
        "heatmap": info.get("heatmap"),
    }


def analyze_most_replayed(url: str, top_n: int = 5) -> dict:
    """Analyze a YouTube video to find the most replayed segments.

    Returns video info and a list of top replayed regions with timestamps.
    """
    opts = {
        "quiet": True,
        "no_warnings": True,
        "extract_flat": False,
    }
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(url, download=False)

    heatmap = info.get("heatmap")
    if not heatmap:
        return {
            "title": info.get("title", "Unknown"),
            "duration": info.get("duration", 0),
            "regions": [],
        }

    # Find threshold: segments above average are "hot"
    values = [entry["value"] for entry in heatmap]
    avg_value = sum(values) / len(values)
    threshold = avg_value * 1.5

    # Group adjacent hot segments into regions
    regions = []
    current_region = None
    for entry in heatmap:
        if entry["value"] >= threshold:
            if current_region is None:
                current_region = {
                    "start": entry["start_time"],
                    "end": entry["end_time"],
                    "peak_value": entry["value"],
                    "total_value": entry["value"],
                    "count": 1,
                }
            else:
                current_region["end"] = entry["end_time"]
                current_region["total_value"] += entry["value"]
                current_region["count"] += 1
                if entry["value"] > current_region["peak_value"]:
                    current_region["peak_value"] = entry["value"]
        else:
            if current_region is not None:
                current_region["avg_value"] = current_region["total_value"] / current_region["count"]
                regions.append(current_region)
                current_region = None

    if current_region is not None:
        current_region["avg_value"] = current_region["total_value"] / current_region["count"]
        regions.append(current_region)

    # Sort by peak value descending and take top N
    regions.sort(key=lambda r: r["peak_value"], reverse=True)
    top_regions = regions[:top_n]

    # Round timestamps to whole seconds
    for region in top_regions:
        region["start"] = int(region["start"])
        region["end"] = int(region["end"])

    return {
        "title": info.get("title", "Unknown"),
        "duration": info.get("duration", 0),
        "uploader": info.get("uploader", "Unknown"),
        "regions": top_regions,
    }


def download_and_clip(url: str, start_sec: int, end_sec: int) -> str:
    """Download a YouTube video and clip it to the specified time range.

    Returns the path to the clipped video file.
    """
    if end_sec <= start_sec:
        raise ValueError("Waktu akhir harus lebih besar dari waktu mulai.")

    duration = end_sec - start_sec
    if duration > 600:
        raise ValueError("Durasi clip maksimal 10 menit.")

    clip_id = f"clip_{start_sec}_{end_sec}_{os.getpid()}_{id(object())}"
    output_path = os.path.join(DOWNLOADS_DIR, f"{clip_id}.mp4")

    with tempfile.TemporaryDirectory() as tmpdir:
        temp_video = os.path.join(tmpdir, "source.mp4")

        # Download with yt-dlp, selecting a format that fits Telegram limits
        ydl_opts = {
            "format": "bestvideo[height<=720]+bestaudio/best[height<=720]/best",
            "outtmpl": temp_video,
            "quiet": True,
            "no_warnings": True,
            "merge_output_format": "mp4",
            # Download only the needed section for efficiency
            "download_ranges": yt_dlp.utils.download_range_func(None, [(start_sec, end_sec)]),
            "force_keyframes_at_cuts": True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        # Find the downloaded file (yt-dlp may add extension)
        source = None
        for f in os.listdir(tmpdir):
            if f.startswith("source"):
                source = os.path.join(tmpdir, f)
                break

        if not source or not os.path.exists(source):
            raise RuntimeError("Gagal mendownload video.")

        # Re-encode with ffmpeg for clean cut and Telegram compatibility
        cmd = [
            "ffmpeg", "-y",
            "-i", source,
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "23",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            "-t", str(duration),
            output_path,
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            if os.path.exists(output_path):
                os.remove(output_path)
            raise RuntimeError(f"FFmpeg error: {result.stderr[:500]}")

    if not os.path.exists(output_path):
        raise RuntimeError("Gagal membuat clip.")

    file_size = os.path.getsize(output_path)
    if file_size > 50 * 1024 * 1024:  # Telegram limit 50MB
        os.remove(output_path)
        raise ValueError("Ukuran clip terlalu besar (>50MB). Coba durasi yang lebih pendek.")

    return output_path


def cleanup_file(path: str) -> None:
    """Remove a file after it's been sent."""
    try:
        if os.path.exists(path):
            os.remove(path)
    except OSError:
        pass
