// Rewrites the colors of the Terminal.app profiles in DIR from palette.json, each as an sRGB NSColor.
// Every other key in a profile is kept as it is.
//
// Usage: osascript -l JavaScript scripts/terminal-app/generate.js [DIR]
// DIR defaults to themes/terminal-app/, found from this script's location; a relative DIR resolves from the
// current directory.
ObjC.import('AppKit');

const NSPropertyListXMLFormat = 100;

// Out-parameter errors go in an empty $(): a Ref() crashes osascript when the call fails.

function scriptDir() {
  const args = ObjC.deepUnwrap($.NSProcessInfo.processInfo.arguments);
  const self = args.find((a) => /(^|\/)generate\.js$/.test(a));
  const cwd = $.NSFileManager.defaultManager.currentDirectoryPath.js;
  const path = self.startsWith('/') ? self : `${cwd}/${self}`;
  return $(path).stringByStandardizingPath.stringByDeletingLastPathComponent.js;
}

function readJSON(path) {
  const error = $();
  const text = $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, error);
  if (text.isNil()) throw new Error(`cannot read ${path}: ${error.localizedDescription.js}`);
  return JSON.parse(text.js);
}

function srgbColor(hex) {
  if (typeof hex !== 'string' || !/^#[0-9a-f]{6}$/.test(hex)) throw new Error(`not a lowercase #rrggbb color: ${hex}`);
  const c = (i) => parseInt(hex.slice(i, i + 2), 16) / 255;
  return $.NSColor.colorWithSRGBRedGreenBlueAlpha(c(1), c(3), c(5), 1);
}

function isColor(value) {
  if (!value.isKindOfClass($.NSData)) return false;
  const object = $.NSKeyedUnarchiver.unarchiveObjectWithData(value);
  return !object.isNil() && object.isKindOfClass($.NSColor);
}

function run(argv) {
  const dir = scriptDir();
  const profiles = argv[0] || $(`${dir}/../../themes/terminal-app`).stringByStandardizingPath.js;
  const palette = readJSON(`${dir}/palette.json`);

  for (const [name, colors] of Object.entries(palette)) {
    const path = `${profiles}/${name}.terminal`;
    const profile = $.NSMutableDictionary.dictionaryWithContentsOfFile(path);
    if (profile.isNil()) throw new Error(`cannot read ${path}`);

    // A color key missing from the palette would keep its old color space.
    for (const key of ObjC.deepUnwrap(profile.allKeys)) {
      if (isColor(profile.objectForKey(key)) && !(key in colors)) throw new Error(`${name}: ${key} is not in palette.json`);
    }
    for (const [key, hex] of Object.entries(colors)) {
      const data = $.NSKeyedArchiver.archivedDataWithRootObjectRequiringSecureCodingError(srgbColor(hex), false, null);
      if (data.isNil()) throw new Error(`${name}: cannot archive ${key}`);
      profile.setObjectForKey(data, key);
    }

    const error = $();
    const xml = $.NSPropertyListSerialization.dataWithPropertyListFormatOptionsError(
      profile, NSPropertyListXMLFormat, 0, error);
    if (xml.isNil()) throw new Error(`${name}: ${error.localizedDescription.js}`);
    if (!xml.writeToFileOptionsError(path, $.NSDataWritingAtomic, error)) {
      throw new Error(`cannot write ${path}: ${error.localizedDescription.js}`);
    }
  }
}
