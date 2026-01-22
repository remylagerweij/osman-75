---
description: Sync TypeScript types in server/types/api.ts with Prisma schema definitions
---

# Sync Schema Types Workflow

This workflow utilizes the **Database Skill**.

## Steps

1.  **Generate Client**
    - Run `npx prisma generate` to ensure the Prisma Client types are up to date with `schema.prisma`.

2.  **Update API Types**
    - Open `server/types/api.ts`.
    - Import the generated types from `@prisma/client` if needed, or mirror the structure.
    - Ensure all DTOs (Data Transfer Objects) reflect the latest schema fields.

3.  **Check Consumers**
    - Run `npm run typecheck` (or similar) to find any code usage that breaks due to type changes.
