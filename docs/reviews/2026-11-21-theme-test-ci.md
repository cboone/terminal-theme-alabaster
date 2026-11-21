# Theme test CI verification

CI and local verification use the Node.js release in `.nvmrc`.
[cboone/terminal-theme-alabaster#7](https://github.com/cboone/terminal-theme-alabaster/issues/7)

## Reproduce the plant

Run from the repository root on macOS with the Node.js version in `.nvmrc`.
The commands copy the test inputs into a scratch directory and append a line
containing `{` to the Windows Terminal dark theme in that copy.

```bash
bash -euo pipefail <<'BASH'
[[ "$(node --version)" == "v$(cat .nvmrc)" ]]
scratch=$(mktemp -d "${PWD}/.theme-plant.XXXXXX")
trap 'rm -r "${scratch}"' EXIT
mkdir "${scratch}/repo" "${scratch}/tmp"
cp -R .claude .nvmrc README.md scripts tests themes "${scratch}/repo/"
export TMPDIR="${scratch}/tmp"
cd "${scratch}/repo"

theme=themes/windows-terminal/Alabaster-Dark.json
cp "${theme}" "${scratch}/original.json"
node --test

printf '\n{\n' >> "${theme}"
status=0
node --test > "${scratch}/planted.log" 2>&1 || status=$?
cat "${scratch}/planted.log"
[[ "${status}" -eq 1 ]]
grep -E '^(✖ |not ok [0-9]+ - )windows-terminal matches the palette' "${scratch}/planted.log"
grep -F 'SyntaxError' "${scratch}/planted.log"

cp "${scratch}/original.json" "${theme}"
cmp "${scratch}/original.json" "${theme}"
node --test
BASH
```

## Results

The macOS run used Node.js v24.13.0.

| Case      | Exit code | Result        |
| --------- | --------- | ------------- |
| Baseline  | 0         | Suite passed  |
| Planted   | 1         | `SyntaxError` |
| Restored  | 0         | Suite passed  |

The test `windows-terminal matches the palette` reported the syntax error.
`cmp` exited 0 after restoration, and all 27 tests passed with zero skips.
