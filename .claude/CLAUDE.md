# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains terminal color themes for **Alabaster Dark** and **Alabaster Light**, adapted for 15 different terminal emulators. The theme files are static, and the Terminal.app profiles are generated from `scripts/terminal-app/palette.json` by `scripts/terminal-app/generate.js` on macOS through `osascript`. The `node --test` command runs the tests in `tests/`, which check every theme and profile against the palette; there is no package manifest.

The themes follow the Alabaster philosophy of minimal, intentional syntax highlighting, adapted for the 16 ANSI color constraints of terminal emulators.

## Repository Structure

- `themes/` - Contains subdirectories for each terminal emulator
  - Each subdirectory has theme files in the terminal's native format plus a README with installation instructions
- `screenshots/` - Theme preview images
- `docs/` - Additional documentation

## Color Palette

When modifying or adding themes, use these canonical hex values:

| ANSI | Color          | Dark      | Light     |
| ---: | -------------- | --------- | --------- |
|    0 | Black          | `#2b2b2b` | `#000000` |
|    1 | Red            | `#ff8884` | `#ba4b40` |
|    2 | Green          | `#cdea9e` | `#539a33` |
|    3 | Yellow         | `#ffc171` | `#ab781a` |
|    4 | Blue           | `#71b0ff` | `#4073cc` |
|    5 | Magenta        | `#d2a7ee` | `#9538c8` |
|    6 | Cyan           | `#98e3ff` | `#4f8bb0` |
|    7 | White          | `#ececec` | `#f7f7f7` |
|    8 | Bright Black   | `#777777` | `#8a8a8a` |
|    9 | Bright Red     | `#ff8a8a` | `#cd5648` |
|   10 | Bright Green   | `#d5f0a2` | `#6eac4a` |
|   11 | Bright Yellow  | `#ffc880` | `#c59707` |
|   12 | Bright Blue    | `#85b5ff` | `#5b8ed9` |
|   13 | Bright Magenta | `#d9b3f0` | `#ab50d6` |
|   14 | Bright Cyan    | `#b0e8ff` | `#61a1be` |
|   15 | Bright White   | `#ffffff` | `#ffffff` |
|    — | Background     | `#2b2b2b` | `#f7f7f7` |
|    — | Foreground     | `#ececec` | `#000000` |

## Adding a New Terminal

1. Create a new directory under `themes/` named after the terminal (lowercase, hyphenated)
2. Add theme files in the terminal's native format (both Dark and Light variants)
3. Add a parser for the new terminal's format to the `parsers` object in `tests/themes.test.mjs` so its colors are checked against the palette
4. Add a `README.md` with installation instructions following the pattern of existing READMEs
5. Update the supported terminals table in the root `README.md`
6. Update the table in `themes/README.md`
