# UPDATES — Remediation log

**Date:** 2026-08-23 · **Scope:** audit findings NSP-001 / NSP-002 / NSP-008 + working-tree drift (see `Project_Audit_Hub/reports/nexus-start-public/`)

## What changed on `main`

| Commit | Finding | Change |
|---|---|---|
| `e675108` | NSP-001 | vite production base is now env-driven with a hard `/nexus-start/` default (`PAGES_BASE` override). The uncommitted `/atrium/` base was NOT committed; a future deploy from `main` can no longer blank https://twasanon.github.io/nexus-start/. |
| `4237ad6` | NSP-002 | Removed the duplicate `vite ^6.2.0` from `devDependencies`; the single `vite ^7` range stays in `dependencies`. |
| `be9be64` | NSP-008 | Added `.github/workflows/ci.yml` (checkout, Node 24, install, `npm run build`) with markdown-only pushes ignored via `paths-ignore`. |
| `607e113` | NSP-008 fix | First CI run failed: `npm ci` requires a `package-lock.json`, but this repo tracks only `pnpm-lock.yaml`. Switched install step to `npm install --no-audit --no-fund`. |

**CI status:** green — run [32664783082](https://github.com/twasanon/nexus-start/actions/runs/32664783082) (Build ✓ on Node 24).

## Deferred / follow-ups

1. **Lockfile regeneration (NSP-002):** deferred until the next local install. `pnpm-lock.yaml` still reflects both vite ranges; once regenerated, consider committing a `package-lock.json` too and switching CI back to `npm ci` for reproducible builds.
2. **CI action versions:** GitHub annotates that `actions/checkout@v4` / `setup-node@v4` target Node 20 (forced to 24). Bump to v5 when convenient.
3. **Atrium vs nexus-start naming:** still undecided. The full rebrand (~193 insertions across 13 files, incl. untracked `prompt.md` theme-system prompt) is preserved untouched on branch **`rebrand-wip`** (`16afda4`) — it is *not* merged and *not* deployed. If the repo is ever renamed to `atrium`, set `PAGES_BASE=/atrium/` at build time instead of editing `vite.config.ts`.

## Pull request #1 (left open)

`#1 "Codex audit (do not merge): 20260101"` — automated Codex-audit **draft** by twasanon, head `codex-audit/20260101`, sole file `code_review/.codex-audit-stub.md`, body says it "should be closed after results are captured". Left open intentionally; merge/close is an owner decision.

## Live-site safety

Production base on `main` resolves to `/nexus-start/` unless someone explicitly sets `PAGES_BASE`, so the next Pages deploy keeps serving assets from the correct path.
