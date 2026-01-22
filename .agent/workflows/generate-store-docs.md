---
description: Generate or update documentation for Pinia stores with state, actions, and getters reference
---

# Generate Store Docs Workflow

This workflow utilizes the **Documentation Skill**.

> [!TIP]
> Refer to `.agent/skills/documentation/SKILL.md` for standard templates.

## Steps

1.  **Analyze Store**
    - Read the store file (e.g., `stores/myStore.ts`).
    - Identify **State** properties, **Getters**, and **Actions**.

2.  **Generate Documentation**
    - Create or update `docs/stores/[storeName].md`.
    - Use the **Store Template** from the Documentation Skill.
    - Document the purpose of each action and complex state logic.
