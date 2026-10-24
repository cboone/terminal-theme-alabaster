// Alabaster Dark or Light, following the device appearance; Dark when it can't be read.
// Keep names local: Blink pastes this file into its settings function.
(function () {
  var term = t;
  var palettes = {
    dark: {
      ansi: [
        '#2b2b2b', '#ff8884', '#cdea9e', '#ffc171',
        '#71b0ff', '#d2a7ee', '#98e3ff', '#ececec',
        '#777777', '#ff8a8a', '#d5f0a2', '#ffc880',
        '#85b5ff', '#d9b3f0', '#b0e8ff', '#ffffff'
      ],
      foreground: '#ececec',
      background: '#2b2b2b',
      cursor: '#ececec'
    },
    light: {
      ansi: [
        '#000000', '#ba4b40', '#539a33', '#ab781a',
        '#4073cc', '#9538c8', '#4f8bb0', '#f7f7f7',
        '#8a8a8a', '#cd5648', '#6eac4a', '#c59707',
        '#5b8ed9', '#ab50d6', '#61a1be', '#ffffff'
      ],
      foreground: '#000000',
      background: '#f7f7f7',
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
