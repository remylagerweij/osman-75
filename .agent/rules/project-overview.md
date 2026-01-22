---
trigger: always_on
description: Core project context and technology stack
---

# MotoData Project Overview

**MotoData** is a Nuxt 4 (Vue 3) SPA for motorcycle analytics.

## Technology Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Framework | Nuxt 4 (Vue 3)                   |
| State     | Pinia                            |
| Styling   | Tailwind CSS v4                  |
| Database  | MongoDB via Prisma ORM           |
| Auth      | Supabase Auth                    |
| Testing   | Cypress (component + E2E)        |
| Icons     | FontAwesome via `<Icon>` wrapper |
| Font      | Poppins                          |

## SSR Mode

**SSR is disabled** (`ssr: false` in nuxt.config.ts). This is a client-side SPA.

## Key Architecture Decisions

### Data Flow

- **Server APIs** in `server/api/` use Prisma + MongoDB
- **Client State** in Pinia stores (`stores/`)
- **URL Sync** for filters via `useFilterUrlSync.ts`

### Component Patterns

- Variant Pattern for multi-mode components
- Auto-import (no manual component imports)
- Co-located tests (`*.cy.ts` beside `*.vue`)

### Database

- Prisma ORM with MongoDB
- Supabase for auth tables (PostgreSQL)
- RLS on all user tables

## Quick Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run test:e2e     # Cypress E2E
npm run test:component  # Cypress component tests
npm run typecheck    # TypeScript check
```

## Key Files

| File                              | Purpose               |
| --------------------------------- | --------------------- |
| `nuxt.config.ts`                  | Nuxt configuration    |
| `prisma/schema.prisma`            | Database schema       |
| `stores/auth.ts`                  | Auth state management |
| `composables/useFilterUrlSync.ts` | Filter ↔ URL sync     |

## Feature Flags

```typescript
const { priceChart, ownerHistory, mileageHistory } = useFeatureFlags()
```

Controlled via `NUXT_PUBLIC_FEATURE_*` env vars.

## Reference Rules

For specific areas, see:

- @.agent/rules/vue-component-conventions.md
- @.agent/rules/cypress-testing.md
- @.agent/rules/server-api-prisma.md
- @.agent/rules/authentication-supabase.md
- @.agent/rules/database-migrations.md
- @.agent/rules/filters-url-sync.md
- @.agent/rules/pinia-stores.md
