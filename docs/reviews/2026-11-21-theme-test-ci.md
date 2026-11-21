# Theme test CI verification

On macOS with Node.js v24.13.0, `node --test` exited 0 on a clean
scratch copy of `ce10b6d`. The plant appended a line containing `{` to
`themes/windows-terminal/Alabaster-Dark.json` in that copy.

| Case      | Exit code | Result        |
| --------- | --------- | ------------- |
| Baseline  | 0         | Suite passed  |
| Planted   | 1         | `SyntaxError` |
| Restored  | 0         | Suite passed  |

The test `windows-terminal matches the palette` reported the syntax error.
After restoring the original file byte-for-byte, all 27 tests passed
with zero skips. CI selects Node.js 26 because the repository declares
no Node.js version.
