---
name: Testing
description: Helper for running, writing, and debugging Cypress component and E2E tests
---

# Testing Skill

This skill consolidates all testing-related knowledge and workflows for the MotoData project. Use this skill whenever you need to run, write, or fix tests.

## 1. Conventions (From Rules)

### File Location

- **Co-locate tests** beside components: `ComponentName.cy.ts` next to `ComponentName.vue`
- E2E tests go in `cypress/e2e/`

### Mounting Strategy

- **ALWAYS use render functions (`h()`)** over template strings.
- Use kebab-case for v-model events: `h(Component, { "onUpdate:modelValue": spy })`

### Selectors

- **Prefer ARIA attributes**: `[role="button"]`, `[aria-expanded="true"]`
- **Avoid CSS classes**: `.bg-blue-500` (brittle)

### Anti-Patterns

- ❌ `cy.get("...").click({ force: true })` (hides real issues)
- ❌ `cy.wait(1000)` (arbitrary waits)

## 2. Workflows

### Run Tests

**Goal**: Run the test suite.

1.  **Component Tests**: `npm run test:component`
2.  **E2E Tests**: `npm run test:e2e`
3.  **All Tests**: `npm run test:component && npm run test:e2e`

### Write Tests

**Goal**: Write robust, non-flaky Cypress tests.

1.  **Analyze**: component vs E2E? Nuxt injections needed?
2.  **Draft**:
    - Imports: `import MyComponent from './MyComponent.vue'`
    - Setup: Spy on events, mock props.
    - Nuxt Fallback: `const nuxtSafe = typeof useNuxtApp === "function" ? useNuxtApp() : {}`
3.  **Verify**: Run the spec locally to ensure it passes.

### Fix Failures

**Goal**: debug and resolve test failures.

1.  **Reproduce**: `npx cypress run --component --spec "<path>" --browser electron`
2.  **Debug**:
    - **Injection Errors**: Add `useNuxtApp` fallbacks.
    - **Timing/Flakiness**: Disable transitions, use robust selectors.
    - **Debug Mode**: Use `it.only` or `console.log` (temporarily).
3.  **Verify**: Ensure the specific spec passes before running the full suite.
