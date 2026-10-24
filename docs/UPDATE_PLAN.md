# Plan: Update Terminal Themes to Match Canonical Alabaster

## Executive Summary

The current terminal themes use **Material-inspired colors** (brighter, more saturated), particularly in the dark variant. The [comparison analysis](https://github.com/cboone/alabaster-themes-comparison) explicitly notes this as "Material-Inspired Strategy" using `#202020` background with brighter colors like `#C3E88D` green and `#89DDFF` cyan.

To better match the canonical Alabaster themes from Tonsky's original and the official [alacritty-theme repository](https://github.com/alacritty/alacritty-theme), significant color changes are needed.

---

## Color Changes Required

### Dark Theme (Major Changes)

| ANSI | Color          | Current       | Canonical     | Change |
| ---: | -------------- | ------------- | ------------- | ------ |
|    — | Background     | `#202020`     | `#0E1415`     | ✗      |
|    — | Foreground     | `#e7e7e7`     | `#CECECE`     | ✗      |
|    0 | Black          | `#202020`     | `#0E1415`     | ✗      |
|    1 | Red            | `#ff7171`     | `#e25d56`     | ✗      |
|    2 | Green          | `#C3E88D`     | `#73ca50`     | ✗      |
|    3 | Yellow         | `#ffb45e`     | `#e9bf57`     | ✗      |
|    4 | Blue           | `#5f9dff`     | `#4a88e4`     | ✗      |
|    5 | Magenta        | `#C792EA`     | `#915caf`     | ✗      |
|    6 | Cyan           | `#89DDFF`     | `#23acdd`     | ✗      |
|    7 | White          | `#e7e7e7`     | `#f0f0f0`     | ✗      |
|    8 | Bright Black   | `#777777`     | `#777777`     | ✓      |
|    9 | Bright Red     | `#ff8a8a`     | `#f36868`     | ✗      |
|   10 | Bright Green   | `#d5f0a2`     | `#88db3f`     | ✗      |
|   11 | Bright Yellow  | `#ffc880`     | `#f0bf7a`     | ✗      |
|   12 | Bright Blue    | `#85b5ff`     | `#6f8fdb`     | ✗      |
|   13 | Bright Magenta | `#d9b3f0`     | `#e987e9`     | ✗      |
|   14 | Bright Cyan    | `#b0e8ff`     | `#4ac9e2`     | ✗      |
|   15 | Bright White   | `#ffffff`     | `#FFFFFF`     | ✓      |

**Key dark theme changes:**
- Background shifts from neutral gray (`#202020`) to deep teal-black (`#0E1415`)
- All accent colors become more desaturated and earthy
- Green changes significantly from pastel (`#C3E88D`) to forest (`#73ca50`)
- Cyan changes from bright sky (`#89DDFF`) to deeper teal (`#23acdd`)

### Light Theme (Moderate Changes)

| ANSI | Color          | Current       | Canonical     | Change |
| ---: | -------------- | ------------- | ------------- | ------ |
|    — | Background     | `#f5f5f5`     | `#F7F7F7`     | ✗      |
|    — | Foreground     | `#000000`     | `#434343`     | ✗      |
|    0 | Black          | `#000000`     | `#000000`     | ✓      |
|    1 | Red            | `#AA3731`     | `#AA3731`     | ✓      |
|    2 | Green          | `#448C27`     | `#448C27`     | ✓      |
|    3 | Yellow         | `#9A6515`     | `#CB9000`     | ✗      |
|    4 | Blue           | `#325CC0`     | `#325CC0`     | ✓      |
|    5 | Magenta        | `#811abc`     | `#7A3E9D`     | ✗      |
|    6 | Cyan           | `#4078a0`     | `#0083B2`     | ✗      |
|    7 | White          | `#f5f5f5`     | `#BBBBBB`     | ✗      |
|    8 | Bright Black   | `#777777`     | `#777777`     | ✓      |
|    9 | Bright Red     | `#c04038`     | `#F05050`     | ✗      |
|   10 | Bright Green   | `#5da03a`     | `#60CB00`     | ✗      |
|   11 | Bright Yellow  | `#b8860b`     | `#FFBC5D`     | ✗      |
|   12 | Bright Blue    | `#4a78d0`     | `#007ACC`     | ✗      |
|   13 | Bright Magenta | `#9932cc`     | `#E64CE6`     | ✗      |
|   14 | Bright Cyan    | `#5090b0`     | `#00AACB`     | ✗      |
|   15 | Bright White   | `#ffffff`     | `#FFFFFF`     | ✓      |

**Key light theme changes:**
- Foreground becomes dark gray (`#434343`) instead of pure black
- Yellow becomes brighter/more golden (`#CB9000`)
- Cyan becomes more vivid (`#0083B2`)
- White (ANSI 7) becomes medium gray (`#BBBBBB`) - significant change
- Bright colors generally become more saturated/vivid

---

## Implementation Steps

### Phase 1: Documentation Updates
1. Update `README.md` color palette table with new canonical values
2. Update `.claude/CLAUDE.md` color palette reference
3. Update `themes/README.md` if it contains color references

### Phase 2: Theme File Updates (14 terminals × 2 variants = 28 files)

| Terminal | Files to Update | Format Notes |
|----------|-----------------|--------------|
| Alacritty | 2 TOML files | Hex with `#` prefix |
| Contour | 2 YAML files | Hex with `#` or `0x` prefix |
| foot | 2 INI files | Hex **without** `#` prefix |
| Ghostty | 2 files | `palette = N=#RRGGBB` format |
| iTerm2 | 2 XML plist files | RGB components 0.0-1.0 |
| Kitty | 2 CONF files | `colorN #RRGGBB` format |
| Konsole | 2 colorscheme files | RGB decimal `R,G,B` format |
| mintty | 2 minttyrc files | RGB decimal `R,G,B` format |
| PuTTY | 2 registry files | RGB decimal in registry format |
| Terminal.app | 2 XML plist files | Base64-encoded NSColor data |
| Tilix | 2 JSON files | Hex with `#` prefix |
| Warp | 2 YAML files | Hex with `#` prefix |
| WezTerm | 2 TOML files | Hex with `#` prefix in array |
| Windows Terminal | 2 JSON files | Hex with `#` prefix |

### Phase 3: Verification
1. Spot-check 3-4 different terminal formats for consistency
2. Verify all hex values match the canonical palette
3. Update screenshots if desired (optional)

---

## Considerations & Trade-offs

1. **Breaking change for existing users**: Users who have installed these themes will see different colors after updating. Consider:
   - Documenting the change prominently
   - Optionally keeping the current Material-inspired variants as "Alabaster Dark (Material)" alternatives

2. **Dark theme background change is significant**: Moving from `#202020` to `#0E1415` changes the character of the theme from neutral gray to teal-tinted. This is faithful to canonical Alabaster but may not suit all users.

3. **Light theme foreground change**: Moving from pure black (`#000000`) to dark gray (`#434343`) reduces contrast. Some users may prefer the higher contrast of the current theme.

4. **ANSI 7 (White) in light theme**: The canonical value `#BBBBBB` is significantly darker than the current `#f5f5f5`. This affects how "white" text appears on the light background.

---

## Alternative Approach

If the goal is to preserve the current aesthetic while improving alignment, a hybrid approach could:
- Keep the current dark background (`#202020`)
- Adopt canonical accent colors where they improve readability
- Document this as an intentional "terminal-optimized" variant

---

## Sources

- [Alabaster Themes Comparison Repository](https://github.com/cboone/alabaster-themes-comparison)
- [Official Alacritty Theme](https://github.com/alacritty/alacritty-theme/blob/master/themes/alabaster.toml)
- [Original Sublime Alabaster by Tonsky](https://github.com/tonsky/sublime-scheme-alabaster)
