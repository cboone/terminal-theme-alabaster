// Prints, as JSON, how AppKit decodes every color in the given Terminal.app profiles.
// For each color: its color space, its components when that space is sRGB, and the sRGB components of the
// archive's NSRGB fallback, which readers that skip the embedded color space draw instead.
//
// Usage: osascript -l JavaScript scripts/terminal-app/decode.js PROFILE...
ObjC.import('AppKit');

const SRGB = $.NSColorSpace.sRGBColorSpace;

// Maps NSRGB fallback color-space codes to their NSColor constructors.
const FALLBACK_SPACES = {
  1: { space: 'calibrated', make: (r, g, b, a) => $.NSColor.colorWithCalibratedRedGreenBlueAlpha(r, g, b, a) },
  2: { space: 'device', make: (r, g, b, a) => $.NSColor.colorWithDeviceRedGreenBlueAlpha(r, g, b, a) },
};

function components(color) {
  return [color.redComponent, color.greenComponent, color.blueComponent, color.alphaComponent];
}

function fallback(data) {
  const archive = $.NSPropertyListSerialization.propertyListWithDataOptionsFormatError(data, 0, null, null);
  const objects = archive.objectForKey('$objects');
  for (let i = 0; i < objects.count; i++) {
    const object = objects.objectAtIndex(i);
    if (!object.isKindOfClass($.NSDictionary) || object.objectForKey('NSRGB').isNil()) continue;
    const code = object.objectForKey('NSColorSpace').intValue;
    const text = $.NSString.alloc.initWithDataEncoding(object.objectForKey('NSRGB'), $.NSASCIIStringEncoding).js;
    const [r, g, b, a = 1] = text.replace(/\0/g, '').trim().split(/\s+/).map(Number);
    const known = FALLBACK_SPACES[code];
    if (!known) return { space: `NSColorSpace ${code}` };
    return { space: known.space, srgb: components(known.make(r, g, b, a).colorUsingColorSpace(SRGB)) };
  }
  return null;
}

function decode(path) {
  const profile = $.NSDictionary.dictionaryWithContentsOfFile(path);
  if (profile.isNil()) throw new Error(`cannot read ${path}`);
  const colors = {};
  for (const key of ObjC.deepUnwrap(profile.allKeys).sort()) {
    const value = profile.objectForKey(key);
    if (!value.isKindOfClass($.NSData)) continue;
    const color = $.NSKeyedUnarchiver.unarchiveObjectWithData(value);
    if (color.isNil() || !color.isKindOfClass($.NSColor)) continue;
    const srgb = color.colorSpace.isEqual(SRGB);
    colors[key] = {
      space: srgb ? 'sRGB' : color.colorSpaceName.js,
      components: srgb ? components(color) : null,
      fallback: fallback(value),
    };
  }
  return colors;
}

function run(argv) {
  const out = {};
  for (const path of argv) out[path] = decode(path);
  return JSON.stringify(out);
}
