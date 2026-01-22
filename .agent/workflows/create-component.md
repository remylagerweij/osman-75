---
description: Create a new Vue component with a co-located Cypress test
---

# Create Component Workflow

This workflow utilizes the **Components Skill** to ensure all components follow project standards.

> [!IMPORTANT]
> **Step 0**: Use `view_file` to read `.agent/skills/components/SKILL.md` to load the latest templates and conventions into your context.

## Steps

1.  **Gather Requirements**
    - **Context**: Where should the component live? (`app/components/...`)
    - **Name**: What is the PascalCase name? (e.g., `UserProfile`)
    - **Purpose**: What is its responsibility? (Props/Events needed)

2.  **Scaffold Files**
    - **Component**: Create `app/components/Path/To/Component.vue`.
    - **Test**: Create `app/components/Path/To/Component.cy.ts`.

3.  **Implement (Using Components Skill)**
    - Apply the **Script Setup** convention from the Skill.
    - Define props/emits as per the **Best Practices** in the Skill.
    - Write the initial template.

4.  **Test (Using Testing Skill)**
    - Write a basic mounting test using the **Mounting Strategy** from the Testing Skill (render function).
    - Run the test: `npm run test:component -- --spec "app/components/Path/To/Component.cy.ts"`

5.  **Final Verification**
    - Ensure the test passes.
    - Confirm with the user that the component is ready.
