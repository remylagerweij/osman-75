---
name: Database
description: Helper for Prisma/MongoDB migrations and schema management
---

# Database Skill

This skill handles all database-related operations, including schema changes, migrations, and type syncing.

## 1. Conventions

### Idempotency

- **All SQL migrations MUST be idempotent.**
- Use `IF NOT EXISTS` for tables/columns.
- Use `DO $$ ... END $$` blocks for constraints/indexes.

### RLS Policies

- **Enable RLS** on all temporary tables with user data.
- Drop existing policies before creating new ones.

## 2. Workflows

### Database Migration

**Goal**: Safely modify the database schema.

1.  **Plan**: Document changes and impact.
2.  **Migrate**: Create `db/XX_migration.sql` (idempotent).
3.  **Sync**: Run `npx prisma db pull` and `npx prisma generate`.
4.  **Types**: Update TypeScript types (`server/types/api.ts`).
5.  **Verify**: Test locally and verify rollback scripts.

### Sync Types

**Goal**: Keep TypeScript types in sync with Prisma schema.

1.  **Generate**: `npx prisma generate`
2.  **Update**: Manually update `server/types/api.ts` to reflect the new Prisma client types.
