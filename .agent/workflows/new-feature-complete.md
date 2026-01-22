---
description: Complete workflow for implementing a new feature with tests and documentation
---

Your goal is to ensure a new feature is complete with code, tests, and documentation.

## When to Use

- When implementing any new feature
- To ensure nothing is forgotten
- As a checklist for PRs

## Workflow Overview

```
1. Planning
   └── Understand requirements
   └── Break down into tasks
   └── Identify affected files

2. Implementation
   └── Create/modify components
   └── Create/modify composables
   └── Create/modify stores
   └── Create/modify API endpoints

3. Testing
   └── Component tests
   └── E2E tests (if applicable)

4. Documentation
   └── Code comments
   └── Component docs
   └── Update conventions if new pattern

5. Review
   └── Type check
   └── Lint check
   └── Self-review
```

## Workflow Steps

### Phase 1: Planning (Before Coding)

**1.1 Understand Requirements**

- [ ] What is the user story/feature request?
- [ ] What is the expected behavior?
- [ ] What are the edge cases?

**1.2 Break Down into Tasks**

```markdown
## Feature: [Feature Name]

### Tasks

- [ ] Task 1: Create component X
- [ ] Task 2: Add composable Y
- [ ] Task 3: Add API endpoint Z
- [ ] Task 4: Write tests
- [ ] Task 5: Write documentation
```

**1.3 Identify Files to Modify**

```markdown
### Files to Create/Modify

**Components:**

- [ ] `app/components/feature/FeatureComponent.vue` (create)

**Composables:**

- [ ] `app/composables/useFeature.ts` (create)

**Stores:**

- [ ] `app/stores/feature.ts` (create or modify)

**API:**

- [ ] `server/api/feature/index.get.ts` (create)

**Types:**

- [ ] `app/types/feature.ts` (create)
```

### Phase 2: Implementation

**2.1 Start with Types**

```typescript
// app/types/feature.ts
export interface FeatureData {
  id: string
  name: string
  // ...
}
```

**2.2 Create Composable (if needed)**

```typescript
// app/composables/useFeature.ts
export function useFeature() {
  // Logic here
}
```

**2.3 Create Store (if needed)**

```typescript
// app/stores/feature.ts
export const useFeatureStore = defineStore("feature", () => {
  // State and actions
})
```

**2.4 Create API Endpoint (if needed)**

```typescript
// server/api/feature/index.get.ts
export default defineEventHandler(async (event) => {
  // Handler logic
})
```

**2.5 Create Component**

```vue
<!-- app/components/feature/FeatureComponent.vue -->
<script setup lang="ts">
defineOptions({ name: "FeatureComponent" })

// Component logic
</script>

<template>
  <!-- Template -->
</template>
```

### Phase 3: Testing

**3.1 Component Tests**

Create co-located test file:

```typescript
// app/components/feature/FeatureComponent.cy.ts
import { h } from "vue"
import FeatureComponent from "./FeatureComponent.vue"

describe("FeatureComponent", () => {
  it("renders correctly", () => {
    cy.mount(FeatureComponent)
    // Assertions
  })

  it("handles user interaction", () => {
    // Test user actions
  })

  it("passes accessibility checks", () => {
    cy.mount(FeatureComponent)
    cy.injectAxe()
    cy.checkA11y()
  })
})
```

**3.2 Run Tests**

```bash
# Run component tests
npm run test:component

# Run specific test
npx cypress run --component --spec "**/FeatureComponent.cy.ts"
```

**3.3 E2E Tests (if needed)**

```typescript
// cypress/e2e/feature.cy.ts
describe("Feature", () => {
  it("works end-to-end", () => {
    cy.visit("/feature")
    // E2E assertions
  })
})
```

### Phase 4: Documentation

**4.1 Code Comments**

- Add JSDoc comments to public APIs
- Explain complex logic inline
- Document props with descriptions

**4.2 Component Documentation**

Create or update `docs/components/FeatureComponent.md`:

```markdown
# FeatureComponent

Description of what this component does.

## Usage

\`\`\`vue
<FeatureComponent :prop="value" />
\`\`\`

## Props

| Prop | Type | Required | Description |
| ---- | ---- | -------- | ----------- |

## Events

| Event | Payload | Description |
| ----- | ------- | ----------- |

## Examples

...
```

**4.3 Update Conventions (if new pattern)**

If you introduced a new pattern, update `docs/conventions.md`.

### Phase 5: Quality Checks

**5.1 Type Check**

```bash
npm run typecheck
```

**5.2 Lint Check**

```bash
npx eslint app/components/feature/ --fix
```

**5.3 Format Check**

```bash
npx prettier --write app/components/feature/
```

**5.4 Test Check**

```bash
npm run test:component
```

### Phase 6: Self-Review Checklist

**Code Quality:**

- [ ] Component uses `<script setup lang="ts">`
- [ ] Component has `defineOptions({ name: 'X' })`
- [ ] Props are properly typed
- [ ] Events use proper emit syntax
- [ ] No `any` types (or documented why)
- [ ] No console.log statements

**Testing:**

- [ ] Component test exists and passes
- [ ] Tests use h() mounting (not template)
- [ ] Tests use ARIA/data selectors (not classes)
- [ ] Tests check accessibility
- [ ] Critical paths are covered

**Documentation:**

- [ ] JSDoc on public functions
- [ ] Component doc file created/updated
- [ ] Complex logic has inline comments
- [ ] README updated if needed

**Accessibility:**

- [ ] Keyboard navigable
- [ ] ARIA attributes correct
- [ ] Color contrast sufficient
- [ ] Focus indicators visible

**Performance:**

- [ ] No unnecessary re-renders
- [ ] Large lists virtualized
- [ ] Images optimized

## Feature Completion Template

```markdown
# Feature Complete: [Feature Name]

## Summary

Brief description of what was implemented.

## Files Created/Modified

### Created

- `app/components/feature/FeatureComponent.vue`
- `app/components/feature/FeatureComponent.cy.ts`
- `app/composables/useFeature.ts`

### Modified

- `app/types/index.ts` - Added new type exports

## Testing

| Test Type | Count | Status  |
| --------- | ----- | ------- |
| Component | 5     | ✅ Pass |
| E2E       | 2     | ✅ Pass |

## Documentation

- [x] Component docs: `docs/components/FeatureComponent.md`
- [x] JSDoc comments added
- [x] Inline comments for complex logic

## Quality Checks

- [x] TypeScript: No errors
- [x] ESLint: No warnings
- [x] Accessibility: Checked

## Known Limitations

- Limitation 1
- Limitation 2

## Future Improvements

- Improvement 1
- Improvement 2
```

## Checklist

- [ ] **Planning**
  - [ ] Requirements understood
  - [ ] Tasks broken down
  - [ ] Files identified

- [ ] **Implementation**
  - [ ] Types created
  - [ ] Composable created (if needed)
  - [ ] Store created/updated (if needed)
  - [ ] API endpoint created (if needed)
  - [ ] Component created

- [ ] **Testing**
  - [ ] Component test created
  - [ ] All tests pass
  - [ ] E2E test (if applicable)

- [ ] **Documentation**
  - [ ] JSDoc comments
  - [ ] Component doc file
  - [ ] Conventions updated (if new pattern)

- [ ] **Quality**
  - [ ] TypeScript passes
  - [ ] ESLint passes
  - [ ] Self-review complete

- [ ] **Finalize**
  - [ ] Feature completion doc created
  - [ ] Ready for PR
