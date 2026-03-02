# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server at http://localhost:3000
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

This project uses **pnpm** as the package manager (see `pnpm-workspace.yaml`).

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css` and PostCSS; no `tailwind.config.js` file
- **ESLint 9** with flat config (`eslint.config.mjs`) using `eslint-config-next` core web vitals + TypeScript rules
- **shadcn/ui** (new-york style, RSC enabled) — components install to `src/shared/ui/`

## Architecture: Feature-Sliced Design (FSD) + Next.js App Router

### Directory Structure

```
woodone-renewal/
├── app/                      # Next.js App Router (routing ONLY — no UI logic)
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home route entry point
│   ├── products/             # Product catalog routes
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── projects/             # 시공 사례 routes
│   ├── about/
│   ├── contact/
│   ├── not-found.tsx
│   └── sitemap.ts
│
└── src/                      # FSD architecture root
    ├── widgets/              # Page-level section components (assemble features + entities)
    ├── features/             # User-facing business capabilities (may include Client Components)
    ├── entities/             # Core domain models, types, and unit UI
    └── shared/               # Domain-agnostic utilities, shadcn components, config
        ├── ui/               # shadcn/ui components (installed here by shadcn CLI)
        ├── api/              # Base fetch client
        ├── config/           # site.ts, env config
        ├── lib/              # utils.ts (cn function)
        └── types/            # Common type definitions
```

### FSD Layer Rules (Non-Negotiable)

Dependency direction: `app → widgets → features → entities → shared`

- **Upper layers may import from lower layers. Lower layers must NEVER import from upper layers.**
- Each slice exposes a public API via `index.ts`. **Never import from internal paths across slice boundaries.**
- Cross-feature imports are prohibited. Features communicate through shared entities or app-level orchestration.

### Server Component Strategy

- **All components default to React Server Components (RSC).**
- `'use client'` is an architectural boundary, not a convenience toggle.
- Client Components are only permitted when: browser APIs are required, React hooks (useState/useEffect) are needed, or real-time interactivity is required.
- Push `'use client'` as far down the component tree as possible (leaf-node strategy).
- Every `'use client'` boundary must have an inline comment explaining why.

### Path Aliases

```json
{
  "@/*": ["./*"],              // project root
  "@/widgets/*": ["./src/widgets/*"],
  "@/features/*": ["./src/features/*"],
  "@/entities/*": ["./src/entities/*"],
  "@/shared/*": ["./src/shared/*"]
}
```

shadcn CLI alias: `@/shared/ui` for components, `@/shared/lib/utils` for cn().

### Key Domain: Product (entities/product)

The central domain entity is `Product` (원목마루 제품). All product-related UI, types, and API calls originate from `src/entities/product/`. The public API is exported from `src/entities/product/index.ts`.

### shadcn/ui Usage

- Components are installed to `src/shared/ui/` via `pnpm dlx shadcn add [component]`
- `components.json` is configured with `rsc: true` and FSD-aligned aliases
- Do NOT install shadcn components to `components/ui/` — this violates FSD structure

### Image Optimization

- `next/image` is mandatory for all product and content images
- Formats: AVIF + WebP (configured in `next.config.ts`)
- `sizes` attribute must be defined per component (not globally)
- CSS background images are prohibited for content images
