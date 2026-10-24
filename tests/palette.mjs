import { readFileSync } from 'node:fs';

export const source = JSON.parse(
  readFileSync(new URL('../scripts/terminal-app/palette.json', import.meta.url), 'utf8'));

export const NAMES = ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'];

const variant = (colors) => ({
  ansi: [...NAMES.map((n) => colors[`ANSI${n}Color`]), ...NAMES.map((n) => colors[`ANSIBright${n}Color`])],
  foreground: colors.TextColor,
  background: colors.BackgroundColor,
  cursor: colors.CursorColor,
});

export const palette = { dark: variant(source['Alabaster Dark']), light: variant(source['Alabaster Light']) };
