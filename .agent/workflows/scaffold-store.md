---
description: Create a new Pinia store consistently
---

# Scaffold Store Workflow

This workflow utilizes the **State Management Skill**.

> [!IMPORTANT]
> **Step 0**: Use `view_file` to read `.agent/skills/state-management/SKILL.md` to load conventions.

## Steps

1.  **Plan Store**
    - **Name**: What is the store's domain? (e.g., `filters`, `auth`)
    - **State**: What data will it hold?
    - **Actions**: What mutations/fetches are needed?

2.  **Scaffold File**
    - Create `app/stores/[name].ts`.

3.  **Implement (Using State Management Skill)**
    - Use **Setup Function Syntax** from the Skill.
    - Define state with `ref()`, getters with `computed()`.
    - Define actions as plain functions.

4.  **Persistence (Optional)**
    - If state needs to persist, configure `pinia-plugin-persistedstate`.

5.  **Verify**
    - Use Vue Devtools to inspect store state.
