# Skill Registry — adeema

Generated: 2026-05-06

## Project Context

- **Stack**: React 19, Vite 8, Tailwind CSS v3, PostCSS, ESLint 9
- **Language**: JavaScript/JSX (no TypeScript)
- **Architecture**: Component-based SPA landing page
- **Deploy**: GitHub Actions → GitHub Pages (`build:pages`)

## User Skills

| Skill | Trigger Context |
|-------|----------------|
| `react-shadcn-tailwind` | Writing React/JSX components, hooks, data files, frontend code |
| `issue-creation` | Creating GitHub issues (bugs, features) |
| `branch-pr` | Creating pull requests |
| `judgment-day` | "judgment day", "review adversarial", "dual review", "juzgar" |
| `skill-creator` | Creating new skills or agent instructions |

## Project Standards (auto-resolved)

### react-shadcn-tailwind — Compact Rules (adapted for this project)

> Note: This project uses React 19 + Vite + Tailwind CSS v3 without TypeScript or shadcn/ui. Apply patterns that are applicable.

**Component structure**: Functional components only. Props via destructuring. No class components.

**File naming**: PascalCase for components (`HeroSection.jsx`), camelCase for data files (`brandAssets.js`).

**Data pattern**: Static data lives in `src/data/*.js`. Components receive data as props or import directly.

**Tailwind**: Use utility classes directly. Extend via `tailwind.config.js` for custom colors/animations. Do not add arbitrary values when a config extension suffices.

**No tests currently**: Project has no test runner. If tests are introduced, use Vitest + @testing-library/react.

### issue-creation — Compact Rules

- Search for existing issues before creating a new one
- Use conventional commit style for issue titles
- Classify as `bug` or `feature` and add appropriate labels
- Assign to milestone if relevant

### branch-pr — Compact Rules

- Branch from `main` unless a feature branch exists
- Run `npm run lint` before pushing
- PR title follows conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- Link the related issue in the PR body

## Conventions

- Commits: conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`)
- No `Co-Authored-By` AI attribution in commits
- Never build after changes (user preference)
- Linter: `npm run lint` (ESLint 9)
- Deploy command: `npm run build:pages` (GitHub Pages base path)
