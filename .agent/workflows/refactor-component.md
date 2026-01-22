---
description: Refactor existing code into reusable components with a structured workflow
---

# Refactor Component Workflow

This workflow utilizes the **Components Skill**.

> [!IMPORTANT]
> **Step 0**: Use `view_file` to read `.agent/skills/components/SKILL.md` to load the latest templates and conventions into your context.

## Steps

1.  **Analyze Scope**
    - Identify the code block (template/logic) to extract.
    - Determine dependencies (Props needed, Events to emit).
    - _Ask_: "What should the new component be named?"

2.  **Extract (Using Components Skill)**
    - Follow the **Create Component** steps to scaffold the new file.
    - Move the identified logic into the new component.
    - Ensure explicitly defined props/emits match the extracted logic.

3.  **Integrate**
    - Replace the original code with the new component usage.
    - Pass all necessary props and handle emitted events.

4.  **Verify & Test**
    - Run existing tests for the parent component to ensure no regression.
    - Run the new component's test to ensure isolation.
