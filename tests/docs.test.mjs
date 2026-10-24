// Checks the palette tables in the docs against the palette source, swatch URLs included.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { NAMES, palette } from './palette.mjs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

function color(variant, row) {
  const p = palette[variant];
  if (/^\d+$/.test(row)) return p.ansi[Number(row)];
  if (row === 'Background') return p.background;
  if (row === 'Foreground') return p.foreground;
  const i = NAMES.indexOf(row);
  if (i < 0) throw new Error(`unknown row: ${row}`);
  return p.ansi[i];
}

const hexes = (cell) => (cell.match(/#?\b[0-9a-fA-F]{6}\b/g) ?? []).map((h) => '#' + h.replace('#', '').toLowerCase());

function assertCell(cell, want, label) {
  const found = hexes(cell);
  assert.ok(found.length > 0, `${label}: no color`);
  for (const h of found) assert.equal(h, want, label);
}

// Rows of `| ANSI | Color | Dark | Light |` tables, where Background and Foreground have `—` for an ANSI number.
for (const path of ['README.md', '.claude/CLAUDE.md']) {
  test(`${path} palette table matches the palette`, () => {
    const rows = read(path).split('\n').map((l) => l.split('|')).filter((c) => c.length === 6 && hexes(c[3]).length);
    assert.equal(rows.length, 18, `${path}: palette rows`);
    for (const c of rows) {
      const row = c[1].trim() === '—' ? c[2].trim() : c[1].trim();
      assertCell(c[3], color('dark', row), `${path} ${row} Dark`);
      assertCell(c[4], color('light', row), `${path} ${row} Light`);
    }
  });
}

// One `| Color | Swatch | Hex | Usage |` table under each `### Alabaster Dark` and `### Alabaster Light`.
test('themes/README.md palette tables match the palette', () => {
  let variant = null;
  let count = 0;
  for (const line of read('themes/README.md').split('\n')) {
    const heading = line.match(/^### Alabaster (Dark|Light)$/);
    if (heading) variant = heading[1].toLowerCase();
    const c = line.split('|');
    if (!variant || c.length !== 6 || !hexes(c[2]).length) continue;
    const row = c[1].trim();
    assertCell(c[2] + c[3], color(variant, row), `themes/README.md ${row} ${variant}`);
    count++;
  }
  assert.equal(count, 20, 'themes/README.md: palette rows');
});
