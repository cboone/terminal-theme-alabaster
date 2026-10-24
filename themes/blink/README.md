# Alabaster Themes for Blink Shell

## Installation

Blink Shell loads a theme from a URL:

1. Open **Settings** > **Appearance**
2. Tap **New Theme**
3. Paste one of the raw URLs below, download it, and tap **Save**
4. Select the new theme

Alabaster Dark:

<https://raw.githubusercontent.com/cboone/terminal-theme-alabaster/main/themes/blink/Alabaster-Dark.js>

Alabaster Light:

<https://raw.githubusercontent.com/cboone/terminal-theme-alabaster/main/themes/blink/Alabaster-Light.js>

Alabaster System:

<https://raw.githubusercontent.com/cboone/terminal-theme-alabaster/main/themes/blink/Alabaster-System.js>

A new or changed theme applies only to tabs opened after it is selected.

## Files

- `Alabaster-Dark.js` - Dark theme
- `Alabaster-Light.js` - Light theme
- `Alabaster-System.js` - Dark or Light, following the device appearance

## Alabaster System

Blink applies one theme to every tab, with no light or dark variant. `Alabaster-System.js` selects Dark when the web view's `prefers-color-scheme` query matches dark, otherwise Light. It re-applies the palette when the query changes, so an open tab follows appearance changes. If the query can't be read, it selects Dark.

This theme was tested on an iPhone in Blink Shell, and open tabs follow the device's light or dark appearance as it changes.

## Checking

`tests/blink-themes.test.mjs` checks these files' colors against the Ghostty and Kitty themes. It also runs each theme against stubbed terminal settings, and `Alabaster-System.js` against each appearance and a missing `matchMedia`. It needs only Node.js. From the repository root:

```bash
node --test tests/blink-themes.test.mjs
```

## Links

- [Blink Shell Fonts and Themes](https://docs.blink.sh/advanced/creating-fonts-and-themes)
- [Blink Shell Themes Gallery](https://github.com/blinksh/themes)
