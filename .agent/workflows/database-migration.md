---
description: Complete workflow for database schema changes including migrations, types, and API updates
---

# Database Migration Workflow

This workflow utilizes the **Database Skill**.

> [!IMPORTANT]
> Strict adherence to **Idempotency** is required. Refer to `.agent/skills/database/SKILL.md` for code patterns (e.g., `IF NOT EXISTS`).

## Steps

1.  **Planning**
    - Document the schema changes in code comments or a plan.

2.  **Create Migration**
    - Create a new SQL file in `db/` with the next available prefix number.
    - Write **Idempotent SQL** as defined in the Database Skill.
    - Include **RLS Policies** if creating a new table with user data.

3.  **Sync Prisma**
    - Run `npx prisma db pull` to introspect the changes.
    - Run `npx prisma generate` to update the client.

4.  **Update Types**
    - Run `npx prisma generate`.
    - Manually update `server/types/api.ts` to match the new Prisma types (see **Sync Types** in Database Skill).

5.  **Verify**
    - Test the migration locally: `psql $DATABASE_URL -f db/XX_migration.sql`
    - Verify idempotency by running it twice.
