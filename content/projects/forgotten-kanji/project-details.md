---
title: Forgotten Kanji
slug: forgotten-kanji
tagline: A JRPG-styled mobile game where learning Japanese is the gameplay.
category: personal
status: in-development
dates: Jul 2026 – Present
techStack:
  - Flutter
  - Dart
  - Flame
  - Google ML Kit
  - FSRS
  - SQLite (Drift)
featured: false
order: 3
showcase: kanji-drawing.mp4
alt:
  kanji-drawing.mp4: Forgotten Kanji drawing test where a kanji character is traced by hand on a phone screen
  kanji-hit-movement.mp4: Battle effects gallery cycling through damage, healing, and screen shake effects over a glowing kanji
  kanji-overworld-walk.mp4: The player character walking through a flower-dotted grass field on the overworld map, next to a dirt path
  kanji-battle-screen.webp: Battle screen with two ink beast enemies, their health bars, and the player's HP, MP, and SP gauges
  kanji-home-screen.webp: Title screen for The Forgotten Kanji with elemental kanji symbols and New Game and Continue buttons
  kanji-node-map.webp: World map screen with a winding path of battle and story nodes marked by kanji
  kanji-map-editor.webp: The starting village being built in the Tiled map editor, with layers, tilesets, and the pixel-art town laid out on a grid
  kanji-world-map.webp: Overworld map linking towns and villages, ForestCastle, YellowTown, RedTown, BlueVillage, and RedVillage, along branching dirt paths
---

Forgotten Kanji is my largest project so far: a JRPG-styled mobile game built in Flutter and Flame where learning Japanese is the gameplay. Players cast spells by drawing kanji. Quests, boss fights, and NPC conversations all center on the basics of the language, and the puzzles and battle system run on what you've actually learned.

## Drawing kanji

You draw each kanji by hand. I wrote a pure-Dart stroke grader that scores shape, order, and direction against 23,356 KanjiVG paths covering 2,230 kanji, so drawing works offline on Android, web, and PC without ML Kit. Google ML Kit's digital ink recognition is in the stack as well.

The learning engine uses FSRS, a proven spaced-repetition algorithm, so practice feels like play while the game still tracks what you've retained.

## Engineering

1,400+ unit and widget tests run in GitHub Actions CI. Riverpod handles state and Drift handles saves.

Code is only one piece of the work. The pixel art, map design, and NPC writing are just as big a part of this project, if not bigger.

## Tech stack

- Framework: Flutter (Dart)
- Game engine: Flame
- State: Riverpod
- Tilemaps: flame_tiled with the Tiled editor
- Stroke grading: pure-Dart grader against KanjiVG paths
- Handwriting recognition: google_mlkit_digital_ink_recognition
- Stroke order display: stroke_order_animator
- Spaced repetition: FSRS
- Local database: Drift (SQLite)
- Audio: flame_audio and flutter_tts (Japanese)
- Testing: 1,400+ unit and widget tests in GitHub Actions CI
