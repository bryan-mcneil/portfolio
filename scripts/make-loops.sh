#!/usr/bin/env bash
# Turn a raw screen recording into a GIF-style loop for the site:
# muted H.264 MP4 capped at 1080p and a low bitrate, plus a poster JPEG
# from the first frame (used as the <video> poster attribute).
#
# Usage:
#   ./scripts/make-loops.sh <raw-clip> <output-dir> [output-name]
#
# Example:
#   ./scripts/make-loops.sh project-assets/Helpdesk_summary.mp4 \
#     content/projects/helpdesk/assets helpdesk-summary
#   -> helpdesk-summary.mp4 + helpdesk-summary-poster.jpg
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <raw-clip> <output-dir> [output-name]" >&2
  exit 1
fi

input="$1"
outdir="$2"
name="${3:-$(basename "${input%.*}" | sed -E 's/([a-z0-9])([A-Z])/\1-\2/g; s/[_ ]+/-/g' | tr '[:upper:]' '[:lower:]')}"

# Use the system ffmpeg when available, otherwise the ffmpeg-static npm binary.
if command -v ffmpeg >/dev/null 2>&1; then
  FFMPEG=ffmpeg
else
  FFMPEG="$(node -p "require('ffmpeg-static')")"
fi

mkdir -p "$outdir"

# Cap at 1080p, keep aspect ratio, force even dimensions for H.264.
scale="scale=w=min(1920\,iw):h=min(1080\,ih):force_original_aspect_ratio=decrease:force_divisible_by=2"

"$FFMPEG" -y -i "$input" \
  -an -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
  -vf "$scale" -movflags +faststart \
  "$outdir/$name.mp4"

"$FFMPEG" -y -i "$outdir/$name.mp4" -frames:v 1 -q:v 3 "$outdir/$name-poster.jpg"

echo "Wrote $outdir/$name.mp4 and $outdir/$name-poster.jpg"
