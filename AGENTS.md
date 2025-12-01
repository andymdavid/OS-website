# Repository Guidelines

## Project Structure & Module Organization
- `app/` holds the App Router entrypoints. Shared UI lives in `app/components`, custom hooks in `app/hooks`, route-specific content (for example, `app/company`) keeps branded sections isolated, and `app/api` is where edge/server routes will land when added.
- Styling pairs each component with a `.css` sibling; keep layout-wide tokens inside `app/globals.css`.
- Static assets (logos, icons, favicon) live in `public/`. Reference them with absolute paths such as `/Logo-Main-Icon.png`.

## Build, Test, and Development Commands
- `npm run dev` — starts the Next.js dev server on `http://localhost:3000` with hot reloading.
- `npm run build` — produces the production bundle (enables type checks and linting).
- `npm run start` — serves the build output locally; run it to verify deployment parity.
- `npm run lint` — runs ESLint with the Next.js Core Web Vitals preset.

## Coding Style & Naming Conventions
- Code is written in TypeScript, 2-space indent, and functional React components. Use PascalCase for components (`Hero.tsx`) and hooks start with `use` inside `app/hooks`.
- Keep props and helper types co-located; extract shared types into `app/types/` if you introduce many reuses.
- Import component-scoped CSS with side-effect imports (`import './Hero.css';`) and keep class names kebab-case.
- Rely on ESLint (configured in `eslint.config.mjs`) for formatting hints; prefer descriptive JSX attributes over utility classes because Tailwind is not currently in use despite being installed.

## Testing Guidelines
- No automated tests exist yet; when adding behavior, cover it with component or integration tests that mount the relevant section (Vitest + Testing Library is recommended because Next.js App Router is supported).
- Follow the `ComponentName.test.tsx` convention under `app/__tests__/` or colocated `__tests__` folders.
- Always run `npm run lint` plus your test command before opening a PR.

## Commit & Pull Request Guidelines
- History shows short, imperative commits (e.g., `Add optimized 32x32 favicon`). Keep summaries ≤50 chars, mention the impacted area (`Hero:` prefix) when useful, and describe rationale in the body.
- Every PR should link the relevant issue (if any), outline the change, note any environment variable impacts (see `.env.example` for Beehiiv keys), and include screenshots for visual updates.
- Confirm you have run `npm run build` locally for UI-affecting work and mention any skipped checks with justification.

## Security & Configuration Tips
- Copy `.env.example` to `.env.local` and populate the Beehiiv `BEEHIIV_PUBLICATION_ID` and `BEEHIIV_API_KEY` secrets; do not commit local env files.
- Validate external links (like YouTube promos) with `rel="noopener noreferrer"` as shown in `app/components/Hero.tsx` to avoid regressions.
