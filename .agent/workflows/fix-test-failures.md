---
description: Automatically identify and fix component test failures
---

# Fix Test Failures Workflow

This workflow utilizes the **Testing Skill**.

> [!TIP]
> Refer to `.agent/skills/testing/SKILL.md` for common patterns and anti-patterns to avoid during debugging.

## Steps

1.  **Reproduce**
    - Run the failing spec in isolation using the command from **Testing Skill > Workflows > Fix Failures**.
    - Capture stdout/screenshots.

2.  **Debug**
    - **Analyze Error**: Check if it's a Logic Error, Injection Error, or Timeout.
    - **Apply Fixes**:
      - _Injection_: Apply **Nuxt Fallback** patterns from the Testing Skill.
      - _Timing_: Check **Anti-Patterns** in the Testing Skill (e.g., arbitrary waits) and replace with robust guards.
      - _Selectors_: Update fragile CSS selectors to **ARIA/Data Attributes** as per the Testing Skill.

3.  **Verify**
    - Re-run the single spec to confirm the fix.
    - Run the full suite if the change might have regressions.
