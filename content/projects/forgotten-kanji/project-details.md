---
title: Forgotten Kanji
slug: forgotten-kanji
tagline: A JRPG-styled mobile game where learning Japanese is the gameplay.
category: personal
techStack:
  - Flutter
  - Dart
  - Flame
  - ML Kit
  - FSRS
  - SQLite
featured: true
inDevelopment: true
order: 2
showcase: kanji-drawing.mp4
alt:
  kanji-drawing.mp4: Forgotten Kanji drawing test where a kanji character is traced by hand on a phone screen
  kanji-hit-movement.mp4: Battle effects gallery cycling through damage, healing, and screen shake effects over a glowing kanji
  kanji-battle-screen.webp: Battle screen with two ink beast enemies, their health bars, and the player's HP, MP, and SP gauges
  kanji-home-screen.webp: Title screen for The Forgotten Kanji with elemental kanji symbols and New Game and Continue buttons
  kanji-node-map.webp: World map screen with a winding path of battle and story nodes marked by kanji
  kanji-map-editor.webp: The starting village being built in the Tiled map editor, with layers, tilesets, and the pixel-art town laid out on a grid
  kanji-world-map.webp: Overworld map linking towns and villages, ForestCastle, YellowTown, RedTown, BlueVillage, and RedVillage, along branching dirt paths
---

Forgotten Kanji is my largest project so far: a JRPG-styled mobile game where learning Japanese is the gameplay. Quests, boss fights, and NPC conversations all center on the basics of the language, and the puzzles and battle system run on what you've actually learned.

The learning engine uses FSRS spaced repetition, a proven way to retain knowledge. You draw kanji by hand and the game recognizes your strokes with on-device machine learning, so practice feels like play.

Code is only one piece of the work. The pixel art, map design, and NPC writing are just as big a part of this project, if not bigger.

## Tech stack

- Framework: Flutter (Dart)
- Game engine: Flame
- Tilemaps: flame_tiled with the Tiled editor
- Handwriting recognition: google_mlkit_digital_ink_recognition
- Stroke order display: stroke_order_animator
- Spaced repetition: FSRS
- Local database: Drift (SQLite)
- Audio: flame_audio and flutter_tts (Japanese)
