---
trigger: glob
globs: ["db/**/*.sql"]
description: SQL migration conventions for idempotent database changes
---

# Database Migration Conventions

> [!IMPORTANT]
> This rule delegates to the **Database Skill**.
> Please refer to `Use the view_file tool to read .agent/skills/database/SKILL.md` for detailed conventions.

All database logic, including:

- IDEMPOTENCY requirements (strict)
- RLS Policy management
- Migration file naming

... is documented in the **Database Skill**.
