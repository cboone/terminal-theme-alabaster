# Alabaster Themes for Terminal.app

## Installation

1. Open Terminal.app
2. Go to **Terminal** > **Settings...** (Cmd+,)
3. Select the **Profiles** tab
4. Click the gear icon at the bottom of the profiles list
5. Select **Import...**
6. Choose the `.terminal` file
7. Select the imported profile and click **Default** to make it the default

## Theme Settings

These themes include:

- `TerminalType`: `xterm-256color` for full color support
- `UseBrightBold`: `false` to use distinct bright colors instead of bold

## Colors

Each profile stores its colors as sRGB, so Terminal.app draws the same hex values as the other terminals' themes. A color stored in a calibrated color space, such as Generic RGB with its 1.8 gamma, draws lighter than its hex value.

The colors come from [`scripts/terminal-app/palette.json`](../../scripts/terminal-app/palette.json). After changing it, regenerate both profiles from the repository root:

```bash
osascript -l JavaScript scripts/terminal-app/generate.js
```

The generator changes only the profiles' colors. `tests/terminal-app-profiles.test.mjs` decodes each profile with AppKit and fails if any color differs from the palette source, is stored outside sRGB, or differs from what the generator writes. It runs on macOS:

```bash
node --test tests/terminal-app-profiles.test.mjs
```

## Files

- `Alabaster Dark.terminal` - Dark theme
- `Alabaster Light.terminal` - Light theme

## Links

- [Terminal User Guide](https://support.apple.com/guide/terminal/welcome/mac)
