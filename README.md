# Alabaster Color Themes for Terminals

Terminal color themes for Alabaster Dark and Alabaster Light, available for 15 different terminal emulators.

## Background

These terminal themes are inspired by [the Alabaster color scheme](https://github.com/tonsky/sublime-scheme-alabaster) created by [Nikita Prokopov (aka Tonsky)](https://github.com/tonsky) and the philosophy outlined in his blog post ["A case against syntax highlighting"](https://tonsky.me/blog/syntax-highlighting/).

In the original IDE themes, Alabaster highlights only four syntax classes: strings, constants, comments, and global definitions. Terminal themes are limited to 16 ANSI colors, but the same principle applies: use color sparingly and intentionally.

## Screenshot

![Alabaster Light + Dark themes for Terminal.app combined screenshot](screenshots/alabaster-composite-terminal-theme.png)

## Supported Terminals

| Terminal                                                             | Directory                                              | Format         |
| -------------------------------------------------------------------- | ------------------------------------------------------ | -------------- |
| [Alacritty](https://alacritty.org/)                                  | [`themes/alacritty/`](themes/alacritty/)               | `.toml`        |
| [Blink Shell](https://blink.sh/)                                     | [`themes/blink/`](themes/blink/)                       | `.js`          |
| [Contour](https://contour-terminal.org/)                             | [`themes/contour/`](themes/contour/)                   | `.yml`         |
| [foot](https://codeberg.org/dnkl/foot)                               | [`themes/foot/`](themes/foot/)                         | `.ini`         |
| [Ghostty](https://ghostty.org/)                                      | [`themes/ghostty/`](themes/ghostty/)                   | (no extension) |
| [iTerm2](https://iterm2.com/)                                        | [`themes/iterm2/`](themes/iterm2/)                     | `.itermcolors` |
| [Kitty](https://sw.kovidgoyal.net/kitty/)                            | [`themes/kitty/`](themes/kitty/)                       | `.conf`        |
| [Konsole](https://konsole.kde.org/)                                  | [`themes/konsole/`](themes/konsole/)                   | `.colorscheme` |
| [mintty](https://mintty.github.io/)                                  | [`themes/mintty/`](themes/mintty/)                     | `.minttyrc`    |
| [PuTTY](https://www.putty.org/)                                      | [`themes/putty/`](themes/putty/)                       | `.reg`         |
| [Terminal.app](https://support.apple.com/guide/terminal/welcome/mac) | [`themes/terminal-app/`](themes/terminal-app/)         | `.terminal`    |
| [Tilix](https://gnunn1.github.io/tilix-web/)                         | [`themes/tilix/`](themes/tilix/)                       | `.json`        |
| [Warp](https://www.warp.dev/)                                        | [`themes/warp/`](themes/warp/)                         | `.yaml`        |
| [WezTerm](https://wezterm.org/)                                      | [`themes/wezterm/`](themes/wezterm/)                   | `.toml`        |
| [Windows Terminal](https://github.com/microsoft/terminal)            | [`themes/windows-terminal/`](themes/windows-terminal/) | `.json`        |

See the README in each subdirectory for terminal-specific installation instructions.

The tests in `tests/` check every theme's colors and file structure, and the palette tables in these docs, against `scripts/terminal-app/palette.json`. They also decode the Terminal.app profiles with AppKit. They need Node.js. The Terminal.app checks also need macOS. From the repository root:

```bash
node --test
```

## Color Palette

| ANSI | Color          | Dark                                                                        | Light                                                                       |
| ---: | -------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
|    0 | Black          | ![#2b2b2b](https://placehold.co/20x20/2b2b2b/2b2b2b.png) `#2b2b2b`          | ![#000000](https://placehold.co/20x20/000000/000000.png) `#000000`          |
|    1 | Red            | ![#ff8884](https://placehold.co/20x20/ff8884/ff8884.png) `#ff8884`          | ![#ba4b40](https://placehold.co/20x20/ba4b40/ba4b40.png) `#ba4b40`          |
|    2 | Green          | ![#cdea9e](https://placehold.co/20x20/cdea9e/cdea9e.png) `#cdea9e`          | ![#539a33](https://placehold.co/20x20/539a33/539a33.png) `#539a33`          |
|    3 | Yellow         | ![#ffc171](https://placehold.co/20x20/ffc171/ffc171.png) `#ffc171`          | ![#ab781a](https://placehold.co/20x20/ab781a/ab781a.png) `#ab781a`          |
|    4 | Blue           | ![#71b0ff](https://placehold.co/20x20/71b0ff/71b0ff.png) `#71b0ff`          | ![#4073cc](https://placehold.co/20x20/4073cc/4073cc.png) `#4073cc`          |
|    5 | Magenta        | ![#d2a7ee](https://placehold.co/20x20/d2a7ee/d2a7ee.png) `#d2a7ee`          | ![#9538c8](https://placehold.co/20x20/9538c8/9538c8.png) `#9538c8`          |
|    6 | Cyan           | ![#98e3ff](https://placehold.co/20x20/98e3ff/98e3ff.png) `#98e3ff`          | ![#4f8bb0](https://placehold.co/20x20/4f8bb0/4f8bb0.png) `#4f8bb0`          |
|    7 | White          | ![#ececec](https://placehold.co/20x20/ececec/ececec.png) `#ececec`          | ![#f7f7f7](https://placehold.co/20x20/f7f7f7/f7f7f7.png) `#f7f7f7`          |
|    8 | Bright Black   | ![#777777](https://placehold.co/20x20/777777/777777.png) `#777777`          | ![#8a8a8a](https://placehold.co/20x20/8a8a8a/8a8a8a.png) `#8a8a8a`          |
|    9 | Bright Red     | ![#ff8a8a](https://placehold.co/20x20/ff8a8a/ff8a8a.png) `#ff8a8a`          | ![#cd5648](https://placehold.co/20x20/cd5648/cd5648.png) `#cd5648`          |
|   10 | Bright Green   | ![#d5f0a2](https://placehold.co/20x20/d5f0a2/d5f0a2.png) `#d5f0a2`          | ![#6eac4a](https://placehold.co/20x20/6eac4a/6eac4a.png) `#6eac4a`          |
|   11 | Bright Yellow  | ![#ffc880](https://placehold.co/20x20/ffc880/ffc880.png) `#ffc880`          | ![#c59707](https://placehold.co/20x20/c59707/c59707.png) `#c59707`          |
|   12 | Bright Blue    | ![#85b5ff](https://placehold.co/20x20/85b5ff/85b5ff.png) `#85b5ff`          | ![#5b8ed9](https://placehold.co/20x20/5b8ed9/5b8ed9.png) `#5b8ed9`          |
|   13 | Bright Magenta | ![#d9b3f0](https://placehold.co/20x20/d9b3f0/d9b3f0.png) `#d9b3f0`          | ![#ab50d6](https://placehold.co/20x20/ab50d6/ab50d6.png) `#ab50d6`          |
|   14 | Bright Cyan    | ![#b0e8ff](https://placehold.co/20x20/b0e8ff/b0e8ff.png) `#b0e8ff`          | ![#61a1be](https://placehold.co/20x20/61a1be/61a1be.png) `#61a1be`          |
|   15 | Bright White   | ![#ffffff](https://placehold.co/20x20/ffffff/ffffff.png) `#ffffff`          | ![#ffffff](https://placehold.co/20x20/ffffff/ffffff.png) `#ffffff`          |
|    — | Background     | ![#2b2b2b](https://placehold.co/20x20/2b2b2b/2b2b2b.png) `#2b2b2b`          | ![#f7f7f7](https://placehold.co/20x20/f7f7f7/f7f7f7.png) `#f7f7f7`          |
|    — | Foreground     | ![#ececec](https://placehold.co/20x20/ececec/ececec.png) `#ececec`          | ![#000000](https://placehold.co/20x20/000000/000000.png) `#000000`          |

## Related Themes

At this point, the Alabaster family of themes is available for many editors and tools. Here is an attempt at a comprehensive list:

### Original

| Theme                                                                            | Author | Description                                           |
| -------------------------------------------------------------------------------- | ------ | ----------------------------------------------------- |
| [alabaster-lighttable-skin](https://github.com/tonsky/alabaster-lighttable-skin) | Tonsky | The original LightTable skin where the concept began. |
| [sublime-scheme-alabaster](https://github.com/tonsky/sublime-scheme-alabaster)   | Tonsky | The original Alabaster theme for Sublime Text 3.      |

The original Sublime Text package includes five variants:

| Variant             | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| Alabaster           | Light theme with minimal highlighting using text colors.                    |
| Alabaster BG        | Light theme using background colors instead of text colors for highlights.  |
| Alabaster Dark      | Dark version following the same minimalist principles.                      |
| Alabaster Dark Mono | Dark monochromatic variant with only cursor and error/search highlighting.  |
| Alabaster Mono      | Light monochromatic variant with only cursor and error/search highlighting. |

### Emacs

| Theme                                                          | Author | Description                                 |
| -------------------------------------------------------------- | ------ | ------------------------------------------- |
| [alabaster-emacs](https://github.com/uzhne/alabaster-emacs)    | uzhne  | Emacs port.                                 |
| [alabaster-themes](https://github.com/vedang/alabaster-themes) | vedang | Emacs package with light and dark variants. |

### IDEs

| Theme                                                                                    | Author         | Description                                                                                                                      |
| ---------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [alabaster-android](https://github.com/chrisetheridge/alabaster-android)                 | chrisetheridge | Port for Android Studio.                                                                                                         |
| [alabaster-themes](https://github.com/nabato/alabaster-themes)                           | nabato         | Light and dark themes for JetBrains IDEs as a plugin.                                                                            |
| CudaText                                                                                 | (bundled)      | [Bundled theme](https://sourceforge.net/projects/cudatext/files/addons/themes/theme.Alabaster.zip/download) for CudaText editor. |
| [intellij-alabaster](https://github.com/tonsky/intellij-alabaster)                       | Tonsky         | Original port for JetBrains IDEs.                                                                                                |
| [Travertine](https://github.com/freetonik/Travertine)                                    | freetonik      | Alternative minimal theme for Sublime Text 2 and TextMate.                                                                       |
| [vscode-rubber-theme](https://github.com/apust/vscode-rubber-theme)                      | apust          | Dark VS Code variant using colors from the Plastic theme.                                                                        |
| [vscode-theme-alabaster](https://github.com/tonsky/vscode-theme-alabaster)               | Tonsky         | Original VS Code port with light theme.                                                                                          |
| [vscode-theme-alabaster-dark](https://github.com/gargakshit/vscode-theme-alabaster-dark) | gargakshit     | Dark variant for VS Code based on the Sublime version.                                                                           |
| [zed-theme-alabaster](https://github.com/tsimoshka/zed-theme-alabaster)                  | tsimoshka      | Port for the Zed editor.                                                                                                         |

### Terminal Emulators

| Theme                                                                          | Author         | Description                                                            |
| ------------------------------------------------------------------------------ | -------------- | ---------------------------------------------------------------------- |
| [alabaster.nvim gists](https://gist.github.com/p00f)                           | p00f           | Config snippets for Alacritty, fzf, Kitty, WezTerm, wofi, and zathura. |
| [iterm2-theme-alabaster](https://github.com/mkaschenko/iterm2-theme-alabaster) | mkaschenko     | iTerm2 theme.                                                          |
| [kitty-alabaster](https://github.com/anmolmathias/kitty-alabaster)             | anmolmathias   | Kitty theme.                                                           |
| [warp-alabaster-theme](https://github.com/arsenydubrovin/warp-alabaster-theme) | arsenydubrovin | Warp terminal theme.                                                   |

### Vim and Neovim

| Theme                                                                    | Author   | Description                                                                               |
| ------------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------- |
| [alabaster.nvim](https://github.com/p00f/alabaster.nvim)                 | p00f     | Neovim port with Treesitter support.                                                      |
| [alabaster.vim](https://github.com/sderev/alabaster.vim)                 | sderev   | Vim colorschemes with five variants: light, dark, background-highlighted, and monochrome. |
| [vim-colors-alabaster](https://github.com/agudulin/vim-colors-alabaster) | agudulin | Vim port of the original theme.                                                           |

## See also

### [Fira Code](https://github.com/tonsky/FiraCode/)

Tonsky's beautiful update of [Fira Mono](https://github.com/mozilla/Fira) for coding, with monospaced ligatures. Pairs very well with Alabaster.

### ["A case against syntax highlighting"](https://tonsky.me/blog/syntax-highlighting/)

Tonsky's blog post explaining the philosophy behind minimal highlighting.

### [sublime-scheme-alabaster](https://github.com/tonsky/sublime-scheme-alabaster)

The original Alabaster theme repository with design rationale.

### [Writer color theme](https://github.com/tonsky/sublime-scheme-writer)

Tonsky's color theme for focused long-form writing, inspired by [iA Writer](https://ia.net/writer), in its original Sublime Text form.

Also available as [a VSCode color theme](https://github.com/cboone/writer-theme-vscode), ported by [me](https://cboone.github.io).

## Credits

Original theme by [Nikita Prokopov (aka Tonsky)](https://github.com/tonsky/).

Terminal emulator by [Christopher Boone](https://cboone.github.io).

## License

[MIT license.](LICENSE)
