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

## Color Palette

| ANSI | Color          | Dark                                                                        | Light                                                                       |
| ---: | -------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
|    0 | Black          | ![#202020](https://placehold.co/20x20/202020/202020.png) `#202020`          | ![#000000](https://placehold.co/20x20/000000/000000.png) `#000000`          |
|    1 | Red            | ![#ff7171](https://placehold.co/20x20/ff7171/ff7171.png) `#ff7171`          | ![#AA3731](https://placehold.co/20x20/AA3731/AA3731.png) `#AA3731`          |
|    2 | Green          | ![#C3E88D](https://placehold.co/20x20/C3E88D/C3E88D.png) `#C3E88D`          | ![#448C27](https://placehold.co/20x20/448C27/448C27.png) `#448C27`          |
|    3 | Yellow         | ![#ffb45e](https://placehold.co/20x20/ffb45e/ffb45e.png) `#ffb45e`          | ![#9A6515](https://placehold.co/20x20/9A6515/9A6515.png) `#9A6515`          |
|    4 | Blue           | ![#5f9dff](https://placehold.co/20x20/5f9dff/5f9dff.png) `#5f9dff`          | ![#325CC0](https://placehold.co/20x20/325CC0/325CC0.png) `#325CC0`          |
|    5 | Magenta        | ![#C792EA](https://placehold.co/20x20/C792EA/C792EA.png) `#C792EA`          | ![#811abc](https://placehold.co/20x20/811abc/811abc.png) `#811abc`          |
|    6 | Cyan           | ![#89DDFF](https://placehold.co/20x20/89DDFF/89DDFF.png) `#89DDFF`          | ![#4078a0](https://placehold.co/20x20/4078a0/4078a0.png) `#4078a0`          |
|    7 | White          | ![#e7e7e7](https://placehold.co/20x20/e7e7e7/e7e7e7.png) `#e7e7e7`          | ![#f5f5f5](https://placehold.co/20x20/f5f5f5/f5f5f5.png) `#f5f5f5`          |
|    8 | Bright Black   | ![#777777](https://placehold.co/20x20/777777/777777.png) `#777777`          | ![#777777](https://placehold.co/20x20/777777/777777.png) `#777777`          |
|    9 | Bright Red     | ![#ff8a8a](https://placehold.co/20x20/ff8a8a/ff8a8a.png) `#ff8a8a`          | ![#c04038](https://placehold.co/20x20/c04038/c04038.png) `#c04038`          |
|   10 | Bright Green   | ![#d5f0a2](https://placehold.co/20x20/d5f0a2/d5f0a2.png) `#d5f0a2`          | ![#5da03a](https://placehold.co/20x20/5da03a/5da03a.png) `#5da03a`          |
|   11 | Bright Yellow  | ![#ffc880](https://placehold.co/20x20/ffc880/ffc880.png) `#ffc880`          | ![#b8860b](https://placehold.co/20x20/b8860b/b8860b.png) `#b8860b`          |
|   12 | Bright Blue    | ![#85b5ff](https://placehold.co/20x20/85b5ff/85b5ff.png) `#85b5ff`          | ![#4a78d0](https://placehold.co/20x20/4a78d0/4a78d0.png) `#4a78d0`          |
|   13 | Bright Magenta | ![#d9b3f0](https://placehold.co/20x20/d9b3f0/d9b3f0.png) `#d9b3f0`          | ![#9932cc](https://placehold.co/20x20/9932cc/9932cc.png) `#9932cc`          |
|   14 | Bright Cyan    | ![#b0e8ff](https://placehold.co/20x20/b0e8ff/b0e8ff.png) `#b0e8ff`          | ![#5090b0](https://placehold.co/20x20/5090b0/5090b0.png) `#5090b0`          |
|   15 | Bright White   | ![#ffffff](https://placehold.co/20x20/ffffff/ffffff.png) `#ffffff`          | ![#ffffff](https://placehold.co/20x20/ffffff/ffffff.png) `#ffffff`          |
|    — | Background     | ![#202020](https://placehold.co/20x20/202020/202020.png) `#202020`          | ![#f5f5f5](https://placehold.co/20x20/f5f5f5/f5f5f5.png) `#f5f5f5`          |
|    — | Foreground     | ![#e7e7e7](https://placehold.co/20x20/e7e7e7/e7e7e7.png) `#e7e7e7`          | ![#000000](https://placehold.co/20x20/000000/000000.png) `#000000`          |

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
