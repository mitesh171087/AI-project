# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build (must pass before pushing)
npm run lint     # ESLint via eslint-config-next
npm run start    # serve the production build
```

There are no tests. `npm run build` is the primary correctness gate — run it after every significant change.

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Radix UI, Recharts, Lucide React.  
**Path alias:** `@/*` → `src/*`

### Routing

All user-facing pages live under `src/app/(app)/` using a route group so they share a single sidebar/header layout (`src/app/(app)/layout.tsx`). The root `src/app/page.tsx` immediately redirects to `/dashboard`.

### Data layer

All SAMA ITGF control data is static TypeScript — one file per control in `src/data/controls/` (35 controls total). `src/data/index.ts` is the single import point; it exports `allControls`, `domains`, helper lookups (`getControlById`, `getControlByNumber`, `getControlsByDomain`), derived collections (`allEvidenceItems`, `uniqueOwners`, `uniqueDomains`), and query helpers used by every page.

**Adding a control:** create `src/data/controls/<id>-<slug>.ts`, export a `Control` object, import it in `src/data/index.ts` and add it to `allControls` and the relevant `Domain.subdomains[].controls` array. The control then appears automatically across all pages.

### User state / persistence

All assessment data (maturity scores, evidence status, gaps, roadmap completions, criticality flags) is held in a single localStorage key `"sama-control-overrides"` as `AllOverrides = Record<controlId, ControlOverride>`.

- **`src/hooks/useControlOverrides.ts`** — the sole read/write hook. Exposes `overrides`, `updateControl(id, partialOverride)`, `resetControl(id)`, `persist(AllOverrides)` (used for bulk import/restore), `getOverride(id)`, `isModified(id)`, plus `storageError`/`dismissError` for quota/corruption errors.
- **`src/context/ControlOverridesContext.tsx`** — wraps the hook in a React context so any component can call `useOverrides()`.
- **`src/app/(app)/layout.tsx`** — mounts `ControlOverridesProvider` and renders a `StorageErrorBanner` component for user-visible storage errors.

**Pattern for reading assessed values:** always prefer `override?.field ?? control.field` (effective value). Never display raw seed-data values when an assessed override exists.

### Utilities (`src/lib/utils.ts`)

Key exports:
- `cn()` — Tailwind class merge (`clsx` + `tailwind-merge`)
- `CRITICALITY_STYLES` — single source of truth for criticality badge colours; import here, don't redefine locally
- `MATURITY_LABELS`, `MATURITY_COLORS`, `MATURITY_BG`, `STATUS_COLORS`, `EVIDENCE_COLORS`, `PRIORITY_COLORS`
- `filterControls(controls, filters, overrides?)` — filters using effective (assessed) values, not seed data
- `getComplianceScore(controls, overrides)` — % of controls at or above target maturity
- `getMaturityGapControls(controls, overrides)` — controls where target > current
- `exportToCSV(data, filename)` — browser-side CSV download

### Styling

Tailwind CSS v4 configured via CSS (`@import "tailwindcss"` in `globals.css`) — no `tailwind.config.*` file. Brand colours are CSS custom properties in `:root`:
- `--primary: #006B3F` (SAMA green) — use this for primary interactive elements
- `--sidebar-bg: #003d24` — sidebar background
- `--secondary: #86BC25` — accent green

`@media print` CSS block in `globals.css` hides nav/sidebar and formats for A4 landscape.

### Component conventions

- `src/components/ui/` — shadcn-style Radix UI primitives (Button, Card, Tabs, Badge, etc.)
- `src/components/layout/` — `AppSidebar`, `AppHeader` (used by every app page)
- Page-level components are colocated in their route directory; shared display components live in `src/components/`
- `SearchBar` has a built-in 200ms debounce — pass `debounceMs={0}` to disable
- `EvidenceTable` supports `editMode` + `onUrlChange` props for inline URL editing

### Types (`src/types/index.ts`)

All domain types live here. Key interfaces: `Control`, `ControlOverride`, `AllOverrides`, `EvidenceItem`, `RoadmapItem`, `AuditQuestion`, `Capability`, `Action`, `RaciItem`, `MaturityGuidance`. Scalar types: `MaturityLevel` (1–5), `Priority` (P1–P3), `Criticality`, `ImplementationStatus`, `EvidenceStatus`.
