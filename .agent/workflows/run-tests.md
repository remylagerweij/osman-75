---
description: Easy access to testing suites
---

# Run Tests Workflow

This workflow utilizes the **Testing Skill**.

> [!TIP]
> Use the `view_file` tool to read `.agent/skills/testing/SKILL.md` for specific command variations and troubleshooting.

## Steps

1.  **Select Test Suite**
    - Ask the user which suite to run (Component, E2E, or All).

2.  **Run Command**
    - **Component**: Use the command defined in **Testing Skill > Workflows > Run Tests**.
    - **E2E**: Use the command defined in **Testing Skill > Workflows > Run Tests**.
    - **All**: Run both.

3.  **Analyze Results**
    - If tests fail, proceed to the `/fix-test-failures` workflow.
