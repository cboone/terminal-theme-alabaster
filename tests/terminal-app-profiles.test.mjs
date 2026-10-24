// Checks Terminal.app profile colors against the palette source using AppKit.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { source } from './palette.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const profilePath = (name) => join(root, 'themes/terminal-app', `${name}.terminal`);
const osascript = (script, args) =>
  execFileSync('osascript', ['-l', 'JavaScript', join(root, 'scripts/terminal-app', script), ...args],
    { encoding: 'utf8' });

const skip = process.platform !== 'darwin' && 'needs macOS';
const names = Object.keys(source);
const decoded = skip ? {} : JSON.parse(osascript('decode.js', names.map(profilePath)));

// Archived components are decimal strings, so allow a small fraction of one 8-bit level.
function assertDraws(actual, hex, label) {
  const want = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  assert.ok(actual, `${label}: missing`);
  actual.slice(0, 3).forEach((c, i) => {
    assert.ok(Math.abs(c * 255 - want[i]) < 0.01, `${label}: component ${i} is ${c * 255}, not ${want[i]}`);
  });
  assert.ok(Math.abs(actual[3] - 1) < 1e-6, `${label}: alpha is ${actual[3]}`);
}

test('the palette source names both profiles', () => {
  assert.deepEqual([...names].sort(), ['Alabaster Dark', 'Alabaster Light']);
});

test('each profile holds exactly the palette source colors', { skip }, () => {
  for (const name of names) {
    assert.deepEqual(Object.keys(decoded[profilePath(name)]).sort(), Object.keys(source[name]).sort(), name);
  }
});

function assertSRGB(colors, name) {
  for (const [key, hex] of Object.entries(source[name])) {
    const color = colors[key];
    assert.equal(color?.space, 'sRGB', `${name} ${key}`);
    assertDraws(color.components, hex, `${name} ${key}`);
  }
}

test('every color is stored as sRGB at its palette value', { skip }, () => {
  for (const name of names) assertSRGB(decoded[profilePath(name)], name);
});

test('every NSRGB fallback draws its palette value', { skip }, () => {
  for (const name of names) {
    for (const [key, hex] of Object.entries(source[name])) {
      const color = decoded[profilePath(name)][key];
      assertDraws(color?.fallback?.srgb, hex, `${name} ${key} fallback (${color?.fallback?.space})`);
    }
  }
});

// Runs the generator on edited copies of the committed profiles, then passes their directory to `check`.
function generateCopies(change, check) {
  const dir = mkdtempSync(join(tmpdir(), 'alabaster-terminal-app-'));
  try {
    for (const name of names) {
      const copy = join(dir, `${name}.terminal`);
      copyFileSync(profilePath(name), copy);
      writeFileSync(copy, change(readFileSync(copy, 'utf8'), name));
    }
    osascript('generate.js', [dir]);
    check(dir);
  } finally {
    rmSync(dir, { recursive: true });
  }
}

const plistString = (path, key) => execFileSync('plutil', ['-extract', key, 'raw', path], { encoding: 'utf8' }).trim();

test('the generator reproduces the committed profiles', { skip }, () => {
  generateCopies((xml) => xml, (dir) => {
    for (const name of names) {
      assert.ok(readFileSync(join(dir, `${name}.terminal`)).equals(readFileSync(profilePath(name))),
        `${name}: run scripts/terminal-app/generate.js`);
    }
  });
});

test('the generator replaces stale colors and keeps other settings', { skip }, () => {
  // Swaps two colors' archives and changes a setting in each copy.
  const stale = (xml) => {
    const color = (key) => xml.match(new RegExp(`<key>${key}</key>\\s*<data>[^<]*</data>`))[0];
    const [red, green] = [color('ANSIRedColor'), color('ANSIGreenColor')];
    return xml.replace(red, '\0').replace(green, red.replace('ANSIRedColor', 'ANSIGreenColor'))
      .replace('\0', green.replace('ANSIGreenColor', 'ANSIRedColor'))
      .replace('<string>xterm-256color</string>', '<string>xterm</string>');
  };
  generateCopies(stale, (dir) => {
    const paths = names.map((name) => join(dir, `${name}.terminal`));
    const colors = JSON.parse(osascript('decode.js', paths));
    names.forEach((name, i) => {
      assertSRGB(colors[paths[i]], name);
      assert.equal(plistString(paths[i], 'TerminalType'), 'xterm', `${name}: TerminalType`);
      assert.equal(plistString(paths[i], 'name'), name, `${name}: name`);
    });
  });
});
