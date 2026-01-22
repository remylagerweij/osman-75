---
description: Generate or update documentation for Vue composables with API reference and usage examples
---

# Generate Composable Docs Workflow

This workflow utilizes the **Documentation Skill**.

> [!TIP]
> Refer to `.agent/skills/documentation/SKILL.md` for standard templates.

## Steps

1.  **Analyze Composable**
    - Read the source file (e.g., `composables/useMyFeature.ts`).
    - Identify the **Return Values**, **Arguments**, and **Side Effects**.

2.  **Generate Documentation**
    - Create or update `docs/[useComposable].md`.
    - Use the **Composable Template** from the Documentation Skill.
    - Include a clear "Usage" section demonstrating how to call the composable.

3.  **Verify**
    - Ensure the documented signature matches the actual TypeScript types.
