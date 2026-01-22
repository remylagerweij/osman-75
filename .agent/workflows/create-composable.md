---
description: Create a new Vue 3 composable with proper structure and testing
---

# Create Composable Workflow

This workflow utilizes the **Composables Skill**.

> [!IMPORTANT]
> **Step 0**: Use `view_file` to read `.agent/skills/composables/SKILL.md` to load conventions.

## Steps

1.  **Plan Composable**
    - **Name**: What is the `useXxx` name?
    - **Purpose**: What state/logic does it encapsulate?
    - **Return API**: What refs, computed, and methods will it expose?

2.  **Scaffold Files**
    - Create `app/composables/useXxx.ts`.
    - Create `app/composables/useXxx.cy.ts` for testing.

3.  **Implement (Using Composables Skill)**
    - Define `UseXxxOptions` and `UseXxxReturn` interfaces.
    - Use the **Structure Pattern** from the Skill.
    - Apply **Nuxt Fallbacks** if using `useNuxtApp`.

4.  **Test (Using Testing Skill)**
    - Write a basic test that mounts a wrapper component.
    - Verify initial state and method calls.
