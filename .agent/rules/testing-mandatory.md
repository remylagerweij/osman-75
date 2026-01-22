---
trigger: glob
globs: ["app/components/**/*.vue", "app/pages/**/*.vue"]
description: Mandatory testing checks and execution when modifying components
---

# Mandatory Testing Rules

When modifying any Vue component or page, you MUST follow these steps to ensure regressions are not introduced and behavior is correctly verified.

## 1. Check for Existing Tests

Before applying any edits, search for a co-located Cypress component test (`*.cy.ts`) or related E2E tests in `cypress/e2e/`.

## 2. Run Relevant Tests

- If a component test exists, run it using `npm run test:component -- --spec <path_to_test>` before making changes to establish a baseline.
- After making changes, run the test again to verify the fix/feature.

## 3. Update Tests

- If you change a component's props, events, or state logic, you MUST update the corresponding test file.
- **Always follow the [.agent/workflows/write-test.md](file:///Users/remymartinlagerweij/projects/md-fe/.agent/workflows/write-test.md) workflow** to ensure best practices (e.g., render functions, property selectors, event spying).
- Ensure that any new edge cases introduced by your changes are covered by a test case.

## 4. No Existing Tests?

- If no test exists for the component you are modifying, you MUST create one using the [.agent/workflows/write-test.md](file:///Users/remymartinlagerweij/projects/md-fe/.agent/workflows/write-test.md) workflow.
- This ensures the component is isolated, stable, and follows project conventions from the start.

## 5. Automated Fixes

- If tests fail after your edits, use the `/fix-test-failures` workflow to automatically identify and address the issues.
