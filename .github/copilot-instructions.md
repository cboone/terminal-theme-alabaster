# GitHub Copilot Instructions

## PR Review Checklist (CRITICAL)

<!-- KEEP THIS SECTION UNDER 4000 CHARS - Copilot only reads first ~4000 -->

### Documentation Context

- **Planning documents use documented canonical values**: When reviewing planning documents (e.g., UPDATE_PLAN.md), the "Current" column refers to the documented canonical palette from README.md and CLAUDE.md, not raw values from individual theme files. Theme files may have inconsistencies with the documented spec; this is intentional context for planning.

### Repository Structure

- This is a static assets repository with no build system, tests, or runtime code
- Theme files exist in `themes/` subdirectories in each terminal's native format
- The canonical color palette is defined in README.md and `.claude/CLAUDE.md`

## Code Style

- Follow existing patterns in theme files for each terminal format
- Maintain alphabetical ordering of properties where applicable
