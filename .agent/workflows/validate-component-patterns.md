---
description: Audit Vue components for compliance with project conventions and best practices
---

# Validate Component Patterns Workflow

This workflow utilizes the **Components Skill**.

> [!TIP]
> Refer to `.agent/skills/components/SKILL.md` for the full list of conventions.

## Steps

1.  **Scan Components**
    - Listing all `.vue` files in `app/components`.

2.  **Audit Checks**
    - **Script Setup**: Is `lang="ts"` used?
    - **Testing**: Is there a co-located `.cy.ts` file?
    - **Imports**: Are manual imports used where auto-imports suffice? (Check **Components Skill** for details).

3.  **Report**
    - List violations and plan fixes.
    - Use `refactor-component.md` to address complex issues.
