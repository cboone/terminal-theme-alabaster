# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains terminal color themes for **Alabaster Dark** and **Alabaster Light**, adapted for 15 different terminal emulators. This is a static assets repository with no build system, tests, or runtime code.

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
|    0 | Black          | `#202020` | `#000000` |
|    1 | Red            | `#ff7171` | `#AA3731` |
|    2 | Green          | `#C3E88D` | `#448C27` |
|    3 | Yellow         | `#ffb45e` | `#9A6515` |
|    4 | Blue           | `#5f9dff` | `#325CC0` |
|    5 | Magenta        | `#C792EA` | `#811abc` |
|    6 | Cyan           | `#89DDFF` | `#4078a0` |
|    7 | White          | `#e7e7e7` | `#f5f5f5` |
|    8 | Bright Black   | `#777777` | `#777777` |
|    9 | Bright Red     | `#ff8a8a` | `#c04038` |
|   10 | Bright Green   | `#d5f0a2` | `#5da03a` |
|   11 | Bright Yellow  | `#ffc880` | `#b8860b` |
|   12 | Bright Blue    | `#85b5ff` | `#4a78d0` |
|   13 | Bright Magenta | `#d9b3f0` | `#9932cc` |
|   14 | Bright Cyan    | `#b0e8ff` | `#5090b0` |
|   15 | Bright White   | `#ffffff` | `#ffffff` |
|    — | Background     | `#202020` | `#f5f5f5` |
|    — | Foreground     | `#e7e7e7` | `#000000` |

## Adding a New Terminal

1. Create a new directory under `themes/` named after the terminal (lowercase, hyphenated)
2. Add theme files in the terminal's native format (both Dark and Light variants)
3. Add a `README.md` with installation instructions following the pattern of existing READMEs
4. Update the supported terminals table in the root `README.md`
5. Update the table in `themes/README.md`
