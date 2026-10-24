// Alabaster Dark or Light, following the device appearance; Dark when it can't be read.
// Keep names local: Blink pastes this file into its settings function.
(function () {
  var term = t;
  var palettes = {
    dark: {
      ansi: [
        '#202020', '#ff7171', '#C3E88D', '#ffb45e',
        '#5f9dff', '#C792EA', '#89DDFF', '#e7e7e7',
        '#474747', '#FF5370', '#C3E88D', '#FFCB6B',
        '#82AAFF', '#C792EA', '#89DDFF', '#ffffff'
      ],
      foreground: '#e7e7e7',
      background: '#202020',
      cursor: '#e7e7e7'
    },
    light: {
      ansi: [
        '#000000', '#AA3731', '#448C27', '#9A6515',
        '#325CC0', '#811abc', '#4078a0', '#f5f5f5',
        '#777777', '#c04038', '#5da03a', '#b8860b',
        '#4a78d0', '#9932cc', '#5090b0', '#ffffff'
      ],
      foreground: '#000000',
      background: '#f5f5f5',
      cursor: '#000000'
    }
  };

  function apply(palette) {
    term.prefs_.set('color-palette-overrides', palette.ansi);
    term.prefs_.set('foreground-color', palette.foreground);
    term.prefs_.set('background-color', palette.background);
    term.prefs_.set('cursor-color', palette.cursor);
  }

  var query = null;
  try {
    query = window.matchMedia('(prefers-color-scheme: dark)');
  } catch (e) {}
  apply(!query || query.matches ? palettes.dark : palettes.light);

  // Listener registration must not throw: Blink runs more settings after this theme.
  if (query && query.addEventListener) {
    query.addEventListener('change', function (event) {
      apply(event.matches ? palettes.dark : palettes.light);
    });
  }
})();
