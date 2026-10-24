// Checks each theme's colors, read from the structure its terminal reads, against the palette source.
// The parsers check the constructs these files use, not full format conformance.
// Blink and Terminal.app have their own tests.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { NAMES as CAPITALIZED, palette } from './palette.mjs';

const read = (path) => readFileSync(new URL(`../themes/${path}`, import.meta.url), 'utf8');
const NAMES = CAPITALIZED.map((n) => n.toLowerCase());

function hex(value) {
  const m = typeof value === 'string' && value.match(/^(?:#|0x)?([0-9a-fA-F]{6})$/);
  if (!m) throw new Error(`not a hex color: ${value}`);
  return '#' + m[1].toLowerCase();
}

function triple(value) {
  const parts = typeof value === 'string' ? value.split(',') : [];
  if (parts.length !== 3 || !parts.every((p) => /^\d+$/.test(p) && Number(p) <= 255)) {
    throw new Error(`not an r,g,b color: ${value}`);
  }
  return '#' + parts.map((p) => Number(p).toString(16).padStart(2, '0')).join('');
}

const fail = (raw) => {
  throw new Error(`not in the format this test reads: ${JSON.stringify(raw)}`);
};

function set(table, key, value) {
  if (Object.hasOwn(table, key)) throw new Error(`set twice: ${key}`);
  table[key] = value;
}

const content = (text, comment = '#') =>
  text.split('\n').map((l) => l.replace(/\r$/, '')).filter((l) => l.trim() && !l.trimStart().startsWith(comment));

// TOML: `[table]` headers and keys set to a single-quoted string or a one-line array of them.
function toml(text) {
  const root = {};
  const defined = new Set();
  let table = root;
  const string = (s) => s.trim().match(/^'([^']*)'$/)?.[1] ?? fail(s);
  for (const raw of content(text)) {
    const line = raw.trim();
    const header = line.match(/^\[([\w.]+)\]$/);
    const entry = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (header) {
      if (defined.has(header[1])) throw new Error(`table defined twice: ${header[1]}`);
      defined.add(header[1]);
      table = header[1].split('.').reduce((t, key) => (t[key] ??= {}), root);
    } else if (entry) {
      const array = entry[2].match(/^\[(.*)\]$/);
      set(table, entry[1], array ? array[1].split(',').map(string) : string(entry[2]));
    } else {
      fail(raw);
    }
  }
  return root;
}

// YAML: two-space indented mappings whose values are single-quoted strings or plain words.
function yaml(text) {
  const root = {};
  const stack = [{ indent: -2, table: root }];
  let last = { indent: 0, opened: false };
  for (const raw of content(text)) {
    const m = raw.match(/^( *)(\w+):(?: (?:'([^']*)'|(\w+)))?$/);
    if (!m) fail(raw);
    const indent = m[1].length;
    // Each entry sits two spaces under its mapping's key, and no mapping is empty.
    if (last.opened && indent <= last.indent) fail(raw);
    while (indent <= stack.at(-1).indent) stack.pop();
    if (indent !== stack.at(-1).indent + 2) fail(raw);
    const value = m[3] ?? m[4];
    const table = value === undefined ? {} : null;
    set(stack.at(-1).table, m[2], table ?? value);
    if (table) stack.push({ indent, table });
    last = { indent, opened: Boolean(table) };
  }
  if (last.opened) fail('an empty mapping at the end');
  return root;
}

// Key-value files: `key<separator>value` lines, under `[section]` headers when `sections` is set. Keys in
// `repeated` collect every value in order; any other key may appear once per section.
function ini(text, { entry, comment = '#', sections = false, repeated = [] }) {
  const root = {};
  let table = root;
  for (const line of content(text, comment)) {
    const h = sections && line.match(/^\[([^\]]+)\]$/);
    const e = line.match(entry);
    if (h) {
      table = {};
      set(root, h[1], table);
    } else if (e && repeated.includes(e[1])) {
      (table[e[1]] ??= []).push(e[2]);
    } else if (e) {
      set(table, e[1], e[2]);
    } else {
      fail(line);
    }
  }
  return root;
}

// XML property lists: dict, key, string, real, integer, true and false, after the standard header.
function plist(text) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" ' +
    '"http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">';
  if (!text.startsWith(header) || !text.trimEnd().endsWith('</plist>')) fail(text.slice(0, 80));
  const body = text.slice(header.length, text.trimEnd().length - '</plist>'.length);
  const tokens = [...body.matchAll(/\s*(<(\/?)(\w+)\s*(\/?)>([^<]*))/gy)];
  if (tokens.reduce((n, t) => n + t[0].length, 0) !== body.length) fail('unparsed plist content');
  let i = 0;
  // Each token is [match, tag text, '/' when closing, name, '/' when empty, text up to the next tag].
  const next = () => tokens[i++] ?? fail('unexpected end of plist');
  const closing = (name) => {
    const [, raw, close, tag, , text] = next();
    if (!close || tag !== name || text.trim()) fail(raw);
  };
  function value() {
    const [, raw, close, tag, empty, text] = next();
    if (close) fail(raw);
    if (tag === 'true' || tag === 'false') return empty && !text.trim() ? tag === 'true' : fail(raw);
    if (empty) fail(raw);
    if (tag === 'string') {
      closing(tag);
      return text;
    }
    if (tag === 'real' || tag === 'integer') {
      if (!(tag === 'real' ? /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/ : /^-?\d+$/).test(text)) fail(raw);
      closing(tag);
      return Number(text);
    }
    if (tag !== 'dict' || text.trim()) fail(raw);
    const dict = {};
    while (tokens[i]?.[2] !== '/') {
      const [, keyRaw, keyClose, keyTag, keyEmpty, key] = next();
      if (keyClose || keyEmpty || keyTag !== 'key') fail(keyRaw);
      closing('key');
      set(dict, key, value());
    }
    closing('dict');
    return dict;
  }
  const root = value();
  if (i !== tokens.length) fail('content after the root value');
  return root;
}

const colors = (ansi, other) => ({ ansi, ...other });

const ansiFrom = (normal, bright) => [...NAMES.map((n) => normal[n]), ...NAMES.map((n) => bright[n])];

const ansiBy = (key) => [...Array(16).keys()].map((i) => key(i % 8, i >= 8));

const parsers = {
  'alacritty/Alabaster-%.toml': (t) => {
    const { primary, normal, bright } = toml(t).colors;
    return colors(ansiFrom(normal, bright).map(hex), { foreground: hex(primary.foreground), background: hex(primary.background) });
  },
  'contour/Alabaster-%.yml': (t, variant) => {
    const scheme = yaml(t)[`alabaster_${variant.toLowerCase()}`];
    return colors(ansiFrom(scheme.normal, scheme.bright).map(hex), {
      foreground: hex(scheme.default.foreground),
      background: hex(scheme.default.background),
      cursor: hex(scheme.cursor.default),
    });
  },
  'warp/Alabaster-%.yaml': (t) => {
    const theme = yaml(t);
    const { normal, bright } = theme.terminal_colors;
    return colors(ansiFrom(normal, bright).map(hex), { foreground: hex(theme.foreground), background: hex(theme.background) });
  },
  'foot/Alabaster-%.ini': (t) => {
    const c = ini(t, { entry: /^([\w-]+) = (\S+)$/, sections: true }).colors;
    return colors(ansiBy((i, bright) => hex(c[`${bright ? 'bright' : 'regular'}${i}`])),
      { foreground: hex(c.foreground), background: hex(c.background) });
  },
  'ghostty/Alabaster-%': (t) => {
    const c = ini(t, { entry: /^([\w-]+) = (\S+)$/, repeated: ['palette'] });
    const ansi = [];
    for (const entry of c.palette) {
      const [, n, value] = entry.match(/^(\d+)=(\S+)$/) ?? fail(entry);
      if (ansi[n] !== undefined) throw new Error(`palette ${n} set twice`);
      ansi[n] = hex(value);
    }
    return colors(ansi, { foreground: hex(c.foreground), background: hex(c.background), cursor: hex(c['cursor-color']) });
  },
  'kitty/Alabaster-%.conf': (t) => {
    const c = ini(t, { entry: /^(\w+) +(\S+)$/ });
    return colors(ansiBy((i, bright) => hex(c[`color${i + (bright ? 8 : 0)}`])),
      { foreground: hex(c.foreground), background: hex(c.background), cursor: hex(c.cursor) });
  },
  'konsole/Alabaster-%.colorscheme': (t) => {
    const c = ini(t, { entry: /^(\w+)=(.*)$/, sections: true });
    return colors(ansiBy((i, bright) => triple(c[`Color${i}${bright ? 'Intense' : ''}`].Color)),
      { foreground: triple(c.Foreground.Color), background: triple(c.Background.Color) });
  },
  'mintty/Alabaster-%.minttyrc': (t) => {
    const c = ini(t, { entry: /^(\w+)=(\S+)$/ });
    return colors(ansiBy((i, bright) => triple(c[(bright ? 'Bold' : '') + CAPITALIZED[i]])),
      { foreground: triple(c.ForegroundColour), background: triple(c.BackgroundColour), cursor: triple(c.CursorColour) });
  },
  // PuTTY: Colour0, 2 and 5 are the default foreground, background and cursor; 6 to 21 pair each ANSI color with
  // its bright.
  'putty/Alabaster-%.reg': (t, variant) => {
    const [first, ...rest] = t.split('\n');
    if (first.trim() !== 'Windows Registry Editor Version 5.00') fail(first);
    const reg = ini(rest.join('\n'), { entry: /^"(\w+)"="([^"]*)"$/, comment: ';', sections: true });
    const session = reg[`HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\Alabaster%20${variant}`];
    const colour = (n) => triple(session[`Colour${n}`]);
    return colors(ansiBy((i, bright) => colour(6 + i * 2 + (bright ? 1 : 0))),
      { foreground: colour(0), background: colour(2), cursor: colour(5) });
  },
  'tilix/Alabaster-%.json': (t) => {
    const j = JSON.parse(t);
    return colors(j.palette.map(hex), { foreground: hex(j['foreground-color']), background: hex(j['background-color']) });
  },
  'windows-terminal/Alabaster-%.json': (t) => {
    const j = JSON.parse(t);
    const names = CAPITALIZED.map((n) => (n === 'Magenta' ? 'Purple' : n));
    return colors([...names.map((n) => j[n.toLowerCase()]), ...names.map((n) => j[`bright${n}`])].map(hex),
      { foreground: hex(j.foreground), background: hex(j.background) });
  },
  'wezterm/Alabaster-%.toml': (t) => {
    const { ansi, brights, foreground, background, cursor_bg: cursor } = toml(t).colors;
    if (ansi.length !== 8 || brights.length !== 8) throw new Error('ansi and brights need eight colors each');
    return colors([...ansi, ...brights].map(hex), { foreground: hex(foreground), background: hex(background), cursor: hex(cursor) });
  },
  'iterm2/Alabaster %.itermcolors': (t) => {
    const p = plist(t);
    const color = (key) => {
      const c = p[key];
      if (c?.['Color Space'] !== 'sRGB') throw new Error(`${key}: not sRGB`);
      return hex(['Red', 'Green', 'Blue'].map((n) => Math.round(c[`${n} Component`] * 255).toString(16).padStart(2, '0')).join(''));
    };
    return colors(ansiBy((i, bright) => color(`Ansi ${i + (bright ? 8 : 0)} Color`)),
      { foreground: color('Foreground Color'), background: color('Background Color'), cursor: color('Cursor Color') });
  },
};

// Terminals whose themes set a cursor color; Tilix's is turned off.
const WITH_CURSOR = new Set(['contour', 'ghostty', 'iterm2', 'kitty', 'mintty', 'putty', 'wezterm']);

const expected = (terminal, variant) => {
  const { cursor, ...rest } = palette[variant.toLowerCase()];
  return WITH_CURSOR.has(terminal) ? { ...rest, cursor } : rest;
};

for (const [pattern, parse] of Object.entries(parsers)) {
  const terminal = pattern.split('/')[0];
  test(`${terminal} matches the palette`, () => {
    for (const variant of ['Dark', 'Light']) {
      const path = pattern.replace('%', variant);
      assert.deepEqual(parse(read(path), variant), expected(terminal, variant), path);
    }
  });
}
