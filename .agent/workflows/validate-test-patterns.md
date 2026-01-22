---
description: Audit test files for quality, consistency, and adherence to testing best practices
---

Your goal is to ensure all tests follow project conventions and best practices for reliable, maintainable tests.

## When to Use

- During test refactoring
- Before test infrastructure changes
- When onboarding new team members
- As part of `full-health-check`

## Test Quality Criteria

| Criterion       | What to Check          | Impact          |
| --------------- | ---------------------- | --------------- |
| **Co-location** | Test next to source    | Discoverability |
| **Naming**      | Describes behavior     | Readability     |
| **Mounting**    | Uses h() not templates | Reliability     |
| **Selectors**   | ARIA/data attrs        | Stability       |
| **Assertions**  | Behavior not impl      | Maintainability |
| **Isolation**   | No shared state        | Reliability     |

## Workflow Steps

### 1. Check Co-location Convention

All component tests should be co-located:

```bash
# Find components without co-located tests
for comp in $(find app/components -name "*.vue"); do
  test="${comp%.vue}.cy.ts"
  if [ ! -f "$test" ]; then
    echo "Not co-located: $comp"
  fi
done

# Find orphaned test files
for test in $(find cypress/components -name "*.cy.ts"); do
  echo "Should be co-located: $test"
done
```

### 2. Check Test Naming Patterns

Tests should describe behavior, not implementation:

```typescript
// ❌ BAD: Describes implementation
it("calls handleClick when clicked", () => {})
it("updates the isOpen ref", () => {})

// ✅ GOOD: Describes behavior
it("expands the accordion section when header is clicked", () => {})
it("shows the dropdown menu when button is pressed", () => {})
```

**Scan for patterns:**

```bash
# Find implementation-focused test names
grep -rn "it('.*calls\|it('.*updates.*ref\|it('.*sets.*state" app/ --include="*.cy.ts"
```

### 3. Check Mounting Strategy

Per project conventions, use render functions (`h()`) not template strings:

```typescript
// ❌ BAD: Template string (can have silent failures)
cy.mount(Component, {
  template: '<Component :prop="value" />',
})

// ✅ GOOD: Render function
import { h } from "vue"
cy.mount(() => h(Component, { prop: value }))
```

**Find violations:**

```bash
# Find template-based mounts
grep -rn "template:" app/ --include="*.cy.ts"
```

### 4. Check Selector Patterns

Selectors should use stable attributes:

```typescript
// ❌ BAD: Tailwind classes (brittle)
cy.get(".bg-blue-500.hover\\:bg-blue-600")

// ❌ BAD: Implementation details
cy.get(".accordion-item-3")

// ✅ GOOD: ARIA attributes
cy.get('[role="button"]')
cy.get('[aria-expanded="true"]')

// ✅ GOOD: Data test attributes
cy.get('[data-cy="submit-button"]')

// ✅ GOOD: Semantic selectors
cy.contains("button", "Submit")
```

**Find violations:**

```bash
# Find class-based selectors (may be brittle)
grep -rn "cy.get('\\." app/ --include="*.cy.ts" | head -20
```

### 5. Check Assertion Quality

Assertions should test behavior, not implementation:

```typescript
// ❌ BAD: Testing implementation
expect(wrapper.vm.isOpen).toBe(true)
cy.get(".internal-class").should("exist")

// ✅ GOOD: Testing behavior
cy.get('[aria-expanded="true"]').should("exist")
cy.contains("Dropdown content").should("be.visible")
```

### 6. Check Event Binding

Event bindings in h() should use proper format:

```typescript
// ❌ BAD: Wrong event format
h(Component, { onUpdateModelValue: spy })

// ✅ GOOD: Correct kebab-case
h(Component, { "onUpdate:modelValue": spy })
```

**Find violations:**

```bash
grep -rn "onUpdateModelValue\|onUpdateValue" app/ --include="*.cy.ts"
```

### 7. Check for Anti-patterns

**Force clicks (usually wrong):**

```bash
grep -rn "{ force: true }" app/ --include="*.cy.ts"
```

**Arbitrary waits:**

```bash
grep -rn "cy.wait([0-9]" app/ --include="*.cy.ts"
```

**Console log spam:**

```bash
grep -rn "console.log" app/ --include="*.cy.ts"
```

**Skipped tests:**

```bash
grep -rn "it.skip\|describe.skip\|xit\|xdescribe" app/ --include="*.cy.ts"
```

### 8. Check Test Isolation

Tests should not share state:

```typescript
// ❌ BAD: Shared mutable state
let sharedData = []
beforeEach(() => {
  sharedData.push("item")
})

// ✅ GOOD: Fresh state each test
beforeEach(() => {
  const freshData = []
})
```

### 9. Check defineOptions Usage

Components should have names for debugging:

```bash
# Find components without defineOptions
for f in $(find app/components -name "*.vue"); do
  if ! grep -q "defineOptions" "$f"; then
    echo "Missing defineOptions: $f"
  fi
done
```

### 10. Check Nuxt Global Fallbacks

Per conventions, components using Nuxt globals need fallbacks:

```typescript
// Required for component tests
const nuxtSafe = typeof useNuxtApp === "function" ? useNuxtApp() : {}
const nanoidFn = nuxtSafe.$nanoid ? nuxtSafe.$nanoid : () => Math.random().toString(36).slice(2)
```

**Find potential issues:**

```bash
grep -rn "useNuxtApp()" app/components --include="*.vue" | grep -v nuxtSafe
```

## Report Template

```markdown
# Test Pattern Audit Report

**Date:** [DATE]
**Tests Analyzed:** [COUNT]

## Summary

| Pattern        | Compliant | Violations | %   |
| -------------- | --------- | ---------- | --- |
| Co-location    | 30        | 5          | 86% |
| Naming         | 45        | 10         | 82% |
| Mounting (h()) | 50        | 3          | 94% |
| Selectors      | 40        | 15         | 73% |
| Assertions     | 48        | 7          | 87% |

## Violations by Category

### Co-location Issues

Files that should be moved:

- `cypress/components/OldTest.cy.ts` → `app/components/Old.cy.ts`

### Mounting Issues

Files using template strings:

- `app/components/X.cy.ts:L42`

### Selector Issues

Files using Tailwind classes:

- `app/components/Y.cy.ts:L15` - `.bg-blue-500`

### Anti-patterns Found

- Force clicks: 3 files
- Arbitrary waits: 2 files
- Skipped tests: 5 files

## Recommendations

1. Move 5 tests to co-located positions
2. Refactor template-based mounts to h()
3. Replace class selectors with ARIA attributes
4. Review and un-skip or remove skipped tests
```

## Automated Script

```bash
#!/bin/bash
# validate-test-patterns.sh

echo "=== Test Pattern Audit ==="
echo "Date: $(date)"
echo ""

echo "## Co-location Check"
orphaned=$(find cypress/components -name "*.cy.ts" 2>/dev/null | wc -l | tr -d ' ')
echo "Orphaned tests in cypress/components: $orphaned"

echo ""
echo "## Mounting Violations"
templates=$(grep -rn "template:" app/ --include="*.cy.ts" | wc -l | tr -d ' ')
echo "Template-based mounts: $templates"

echo ""
echo "## Selector Issues"
class_selectors=$(grep -rn "cy.get('\\." app/ --include="*.cy.ts" | wc -l | tr -d ' ')
echo "Class-based selectors: $class_selectors"

echo ""
echo "## Anti-patterns"
echo "Force clicks: $(grep -rn "force: true" app/ --include="*.cy.ts" | wc -l | tr -d ' ')"
echo "Arbitrary waits: $(grep -rn "cy.wait([0-9]" app/ --include="*.cy.ts" | wc -l | tr -d ' ')"
echo "Skipped tests: $(grep -rn "it.skip\|describe.skip" app/ --include="*.cy.ts" | wc -l | tr -d ' ')"

echo ""
echo "## Event Binding Issues"
grep -rn "onUpdateModelValue\|onUpdateValue" app/ --include="*.cy.ts" | head -5

echo ""
echo "## Console Logs (should be removed)"
grep -rn "console.log" app/ --include="*.cy.ts" | head -5
```

## Best Practices Reference

From `copilot-instructions.md`:

1. Co-location: Keep specs beside components as `ComponentName.cy.ts`
2. Mounting: Prefer render-function (`h`) over template strings
3. Events: Use `"onUpdate:modelValue"` (kebab-cased) in render functions
4. Selectors: Prefer ARIA attributes over Tailwind classes
5. Transitions: Disable transitions for keyboard navigation tests
6. Nuxt globals: Add fallbacks for `useNuxtApp()` in components

## Checklist

- [ ] Check test co-location
- [ ] Verify naming describes behavior
- [ ] Check mounting uses h()
- [ ] Verify selectors are stable
- [ ] Check assertions test behavior
- [ ] Check event binding format
- [ ] Find and review anti-patterns
- [ ] Verify test isolation
- [ ] Check defineOptions usage
- [ ] Generate report
- [ ] Create refactoring tasks
