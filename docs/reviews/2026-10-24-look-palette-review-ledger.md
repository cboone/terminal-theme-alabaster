# Review ledger: move Alabaster to the look palette

Branch `feat/look-palette`, from `main` at `7352c9e`. Each finding records the reviewer's label, our severity, whether it was taken or recorded, and whether it earned another round.

## Loop 1: review-anti-patterns (Codex `gpt-6.1-sol`, high) with `/simplify` (Opus, high)

### Loop 1, round 1 (Nit)

| Finding                                                                                                                | Reviewer label | Our severity | Call                                                                              | Again |
| ---------------------------------------------------------------------------------------------------------------------- | -------------- | ------------ | --------------------------------------------------------------------------------- | ----- |
| Alacritty `.toml` files hold YAML, which Alacritty cannot import, and the new test accepted them (predates the change) | Important      | Important    | Taken (conductor, option 1): files rewritten as TOML, strict TOML parser in tests | Yes   |
| `/simplify`: three hand-copied docs palette tables are unchecked                                                       | Important      | Nit          | Taken: `tests/docs.test.mjs`                                                      | No    |
| `/simplify`: `palette.json` lives under one terminal's generator                                                       | Nit            | Nit          | Recorded: moving it is a design change with docs churn                            | No    |
| `/simplify`: `.claude/CLAUDE.md` should point at `palette.json`                                                        | Important      | Nit          | Recorded: that file may change only in its palette table                          | No    |
| `/simplify`: eight local simplifications (shared names, single lookups, inline throws, usage comment)                  | Nit            | Nit          | Taken                                                                             | No    |

### Loop 1, round 2 (Important)

No Important findings from either reviewer. Six `/simplify` Nits recorded. **Loop 1: clean at Important.**

## Loop 2: review-pr-with-codex (Codex `gpt-6.1-sol`, xhigh, window 872000; aspects code, errors, tests, comments, types)

### Loop 2, round 1 (Nit)

| Finding                                                                       | Reviewer label | Our severity | Call                                                                             | Again |
| ----------------------------------------------------------------------------- | -------------- | ------------ | -------------------------------------------------------------------------------- | ----- |
| tests: the generator test passes a generator that skips its color replacement | Important      | Important    | Taken: stale-profile test (colors swapped, a setting changed)                    | Yes   |
| tests: Ghostty and Kitty cursor coverage dropped                              | Suggestion     | Nit          | Taken: cursor checked for the seven terminals that set one                       | Yes   |
| errors: write failures lose their cause                                       | Suggestion     | Nit          | Taken; a `Ref()` error pointer crashed osascript on failure, so errors use `$()` | Yes   |
| types: a non-string palette value builds an NSColor with NaN components       | Suggestion     | Nit          | Taken: type check                                                                | Yes   |
| comments: the usage comment misstates how a relative output path resolves     | Suggestion     | Nit          | Taken: the generator takes one DIR, documented                                   | No    |
| comments: the `.claude/CLAUDE.md` overview omits the new tooling              | Suggestion     | Nit          | Recorded: held by the conductor for Chris (agent instructions outside the table) | No    |

### Loop 2, round 2 (Important)

| Finding                                                                             | Reviewer label | Our severity | Call                                                         | Again |
| ----------------------------------------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ | ----- |
| code: `palette.json` replaces the old canonical values                              | Important      | None         | Recorded, no change (conductor): the brief's intended change | No    |
| tests: theme tests read colors by regex and accept structures a terminal cannot use | Important      | Important    | Recurring class, see below; taken (conductor, option a)      | Yes   |

**Recurring defect class: validator gaps in the theme tests.** A test checks color text, not the format its terminal reads (first seen as the Alacritty finding in loop 1). The conductor's structural fix: every parser reads a strict subset of its format into a structure and takes colors from the paths the terminal reads (TOML, YAML, key-value line formats, JSON, the iTerm2 plist), each with planted negative cases. A later round that finds another case of this class is reported again.

### Loop 2, round 3 (Important)

| Finding                                                                                                        | Reviewer label | Our severity | Call                                                                                              | Again |
| -------------------------------------------------------------------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------- | ----- |
| tests: the YAML reader accepts inconsistent sibling indentation (Contour's `normal` and `bright` at one space) | Important      | Important    | Recurring class, reported; taken (conductor): every entry sits two spaces under its mapping's key | Yes   |
| comments: the test header overstates the format checks; the plist reader takes `<real>0b1</real>`              | Suggestion     | Nit          | Taken (conductor): decimal-only `<real>` and `<integer>`, header reworded with the class boundary | Yes   |
| errors: palette.json read failures drop their cause                                                            | Suggestion     | Nit          | Taken: trivial local fix                                                                          | No    |
| tests: no checks on cursor-text and selection colors                                                           | Suggestion     | Nit          | Recorded: outside the palette slots the brief names                                               | No    |
| types: palette.json keys aren't restricted to Terminal.app color keys                                          | Suggestion     | Nit          | Recorded                                                                                          | No    |
| comments: the `.claude/CLAUDE.md` overview omits the new checks                                                | Suggestion     | Nit          | Recorded: held by the conductor for Chris                                                         | No    |

**Class boundary** (conductor, after round 3): the parsers check the constructs these theme files use, not full conformance to each format. From here on, a finding that a strict parser accepts something its terminal's own parser rejects, in a construct no theme file uses, is a Nit by our severity, recorded and not taken. It causes no harm on a path the change makes reachable, and chasing full conformance would keep finding cases. A Critical finding in this class still goes back to the conductor. The test header in `tests/themes.test.mjs` states the same boundary.

### Loop 2, round 4 (Critical)

No Critical findings. **Loop 2: clean at Critical.**

| Finding                                                                                                                                 | Reviewer label | Our severity | Call                                                                                                                                                                                                     | Again         |
| --------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| tests, types: WezTerm's `ansi` and `brights` are joined before the check, so a 7 and 9 split passes, though WezTerm needs eight in each | Important      | Important    | Taken below the Critical threshold as a trivial test-only fix: each array must hold eight colors, planted with a 7 and 9 split. The theme files use this construct, so the class boundary does not apply | No: test only |
| errors: profile read failures drop their cause                                                                                          | Suggestion     | Nit          | Recorded                                                                                                                                                                                                 | No            |
| types: palette.json keys can overwrite non-color settings                                                                               | Suggestion     | Nit          | Recorded                                                                                                                                                                                                 | No            |
| comments: the `.claude/CLAUDE.md` overview omits the new checks                                                                         | Suggestion     | Nit          | Recorded: held by the conductor for Chris                                                                                                                                                                | No            |

## Planted defects

Every plant was run against the committed tree, one at a time, with the unmodified tree passing first. All went red in the test named for them:

- Terminal.app profiles: 11. A color stored as Generic RGB, one level off, alpha 0.5, the palette edited without regenerating, a missing key, an extra calibrated key, a wrong NSRGB fallback, a generator that drops a key, archives calibrated colors (before and after regenerating), uppercase hex.
- Generator: 3. Skips the replacement, resets a setting, takes an array value.
- Theme values: 34. One ANSI slot, background, foreground or cursor per terminal and variant, including swaps and a missing entry.
- Theme structure: 28. TOML, YAML, key-value, JSON and plist negatives: wrong section or scheme names, sections moved, unclosed or mismatched plist tags, color spaces, keys or tables set twice, lines outside the grammar, a missing registry header, trailing commas, one-space YAML siblings, a three-space entry, `0b1` and space-padded reals, a 7 and 9 WezTerm split. The one-space siblings and `0b1` pass the round 2 parser and fail the round 3 one; the three-space entry fails both, through the set-twice rule.
- Docs tables: 4.
- Judge weakenings: 2. A widened tolerance, and a removed color-space assertion; something still failed in each.
