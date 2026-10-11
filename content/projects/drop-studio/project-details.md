---
title: Drop Studio
slug: drop-studio
tagline: A Python pipeline that turns a GadgetDrop review into a finished YouTube Short at $0 running cost.
category: personal
status: in-development
dates: Jul 2026 – Present
techStack:
  - Python 3.12
  - Pillow
  - NumPy
  - FFmpeg
  - Kokoro-82M TTS (ONNX)
  - pytest
featured: false
order: 4
showcase: drop-studio-hero.mp4
links:
  github: https://github.com/bryan-mcneil/drop-studio
alt:
  drop-studio-hero.mp4: Silent 16:9 review embed cycling through a price slam, a product card, feature callouts, and a 90-day price chart
  drop-studio-short.mp4: Vertical YouTube Short for a robot vacuum review with a price drop hook, product card, and captioned feature scenes
  drop-studio-hook.webp: Short hook scene reading Stop paying list price for robot vacuums above a Roborock Q7 M5+ product chip
  drop-studio-feature.webp: Short feature scene one of three with a checkmark card reading Self-empties for 7 to 9 weeks and a caption below
  drop-studio-price-verdict.webp: Short price scene with a 90-day price history chart, low, average, and high prices, and a Good Price verdict chip
  drop-studio-hero-chart.webp: 16:9 price scene asking Is the price good right now above a 90-day tracked price chart with a current price of $249.99
---

Drop Studio is the video pipeline behind [GadgetDrop](/projects/gadgetdrop). It takes a published review and turns it into a finished 1080×1920 YouTube Short: a storyboard JSON file becomes per-scene voiceover, Pillow renders each frame and streams it to FFmpeg, and the result is an H.264/AAC file normalized to −14 LUFS. Total running cost is $0.

## How it works

Kokoro-82M text-to-speech runs locally through ONNX, so there's no API bill. Scene durations and caption timing follow the real length of each voiceover line rather than a fixed clock. Two-pass EBU R128 loudness normalization keeps every Short at the same level, and NumPy ducks the music bed under the voice.

Claude writes the hook and voiceover lines. Deterministic Python renders everything else, so the same storyboard always produces the same video.

A second silent 16:9 template produces review-page embeds from the same storyboard schema. The 90-day price chart shows a verdict only when real price data exists; a missing feed shows a tracking panel instead, so the video never claims a deal it can't back up.

## Quality gates

Deterministic QA gates check duration, resolution, frame rate, file size, loudness, and text layout before anything is marked ready to publish. 55 pytest tests cover the pipeline, including golden-frame comparisons that run with no TTS, no network, and no clock.

## Tech stack

- Language: Python 3.12
- Rendering: Pillow for frames, FFmpeg for encoding and the final mux
- Audio: Kokoro-82M TTS via ONNX, NumPy for ducking, two-pass EBU R128 loudness normalization
- Formats: 1080×1920 Short with voiceover, and a silent 1920×1080 review embed
- Testing: pytest with golden-frame comparisons
- Creative input: Claude writes the hook and voiceover lines
