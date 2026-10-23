// Checks the Blink themes' colors against Ghostty and Kitty, and their behavior with stubbed hterm prefs and matchMedia.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

function parse(text, ansiPattern, keyPattern, cursorKey) {
  const ansi = [];
  for (const m of text.matchAll(ansiPattern)) ansi[Number(m[1])] = m[2].toLowerCase();
  const values = {};
  for (const m of text.matchAll(keyPattern)) values[m[1]] = m[2].toLowerCase();
  return { ansi, foreground: values.foreground, background: values.background, cursor: values[cursorKey] };
}

const ghostty = (variant) =>
  parse(read(`themes/ghostty/Alabaster-${variant}`), /^palette = (\d+)=(#\w+)/gm, /^([\w-]+) = (#\w+)/gm,
    'cursor-color');
const kitty = (variant) =>
  parse(read(`themes/kitty/Alabaster-${variant}.conf`), /^color(\d+)\s+(#\w+)/gm, /^(\w+)\s+(#\w+)/gm, 'cursor');

const expected = { dark: ghostty('Dark'), light: ghostty('Light') };

function run(file, media, { listener = true } = {}) {
  const prefs = {};
  const listeners = [];
  const window = {};
  if (media === 'throws') {
    window.matchMedia = () => {
      throw new Error('matchMedia');
    };
  } else if (media !== 'missing') {
    window.matchMedia = (query) => {
      assert.equal(query, '(prefers-color-scheme: dark)');
      const list = { matches: media === 'dark', addListener: () => {} };
      if (listener) {
        list.addEventListener = (type, fn) => {
          assert.equal(type, 'change');
          listeners.push(fn);
        };
      }
      return list;
    };
  }
  const context = vm.createContext({ t: { prefs_: { set: (key, value) => { prefs[key] = value; } } }, window });
  // Blink pastes the theme into a function that runs more settings after it.
  vm.runInContext(
    `function applyUserSettings() {\n${read(`themes/blink/${file}`)}\n;settingsAfterTheme = true; }\n` +
      'applyUserSettings();',
    context,
  );
  assert.equal(context.settingsAfterTheme, true, 'settings after the theme still run');
  return { prefs, listeners };
}

function assertPalette(prefs, palette) {
  // Array.from copies the array out of the vm context, whose Array differs.
  assert.deepEqual(Array.from(prefs['color-palette-overrides'], (c) => c.toLowerCase()), palette.ansi);
  assert.equal(prefs['foreground-color'].toLowerCase(), palette.foreground);
  assert.equal(prefs['background-color'].toLowerCase(), palette.background);
  assert.equal(prefs['cursor-color'].toLowerCase(), palette.cursor);
}

test('Ghostty and Kitty files agree', () => {
  assert.deepEqual(kitty('Dark'), expected.dark);
  assert.deepEqual(kitty('Light'), expected.light);
});

test('Dark and Light themes set their palettes', () => {
  assertPalette(run('Alabaster-Dark.js', 'missing').prefs, expected.dark);
  assertPalette(run('Alabaster-Light.js', 'missing').prefs, expected.light);
});

test('System theme starts dark and follows changes', () => {
  const { prefs, listeners } = run('Alabaster-System.js', 'dark');
  assertPalette(prefs, expected.dark);
  assert.equal(listeners.length, 1);
  listeners[0]({ matches: false });
  assertPalette(prefs, expected.light);
  listeners[0]({ matches: true });
  assertPalette(prefs, expected.dark);
});

test('System theme starts light and follows changes', () => {
  const { prefs, listeners } = run('Alabaster-System.js', 'light');
  assertPalette(prefs, expected.light);
  listeners[0]({ matches: true });
  assertPalette(prefs, expected.dark);
});

test('System theme falls back to Dark without matchMedia', () => {
  assertPalette(run('Alabaster-System.js', 'missing').prefs, expected.dark);
  assertPalette(run('Alabaster-System.js', 'throws').prefs, expected.dark);
});

test('System theme sets its palette without addEventListener', () => {
  const { prefs, listeners } = run('Alabaster-System.js', 'light', { listener: false });
  assertPalette(prefs, expected.light);
  assert.equal(listeners.length, 0);
});
