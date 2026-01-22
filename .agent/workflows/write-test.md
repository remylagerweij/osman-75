---
description: Write or fix Cypress tests using project best practices
---

# Write/Fix Test Workflow

This workflow utilizes the **Testing Skill**.

> [!IMPORTANT]
> Always read `.agent/skills/testing/SKILL.md` before writing code to ensure you follow the latest conventions (Mounting, Selectors, etc.).

## Steps

1.  **Context Analysis**
    - Determine if a new test file is needed or if modifying an existing one.
    - Check `.agent/skills/testing/SKILL.md` for **File Location** rules.

2.  **Drafting the Test**
    - **Imports**: Import the component and any necessary testing utilities.
    - **Mounting**: Use the **Mounting Strategy** from the Testing Skill (e.g., `h()` render functions).
    - **Selectors**: Use the **Selectors** conventions from the Testing Skill (e.g., `[data-cy]`, ARIA).

3.  **Handling Nuxt Dependencies**
    - If the component uses `useNuxtApp` or specific plugins, apply the **Nuxt Fallback** patterns described in the Testing Skill.

4.  **Verification**
    - Run the specific spec using the **Run Tests** workflow from the Testing Skill to ensure it passes.
