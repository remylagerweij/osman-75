---
description: Identify components, composables, and utilities that lack test coverage
---

Your goal is to find code that is not covered by tests and prioritize what needs testing.

## When to Use

- Before major releases
- During testing sprints
- After adding new features
- As part of `pre-release-audit`

## Coverage Categories

| Category        | Test Type         | Priority |
| --------------- | ----------------- | -------- |
| **Components**  | Cypress Component | High     |
| **Composables** | Cypress/Vitest    | High     |
| **Stores**      | Vitest            | Medium   |
| **Server API**  | Integration       | Medium   |
| **Utils**       | Unit tests        | Low      |

## Workflow Steps

### 1. Inventory All Testable Files

```bash
# Count all Vue components
find app/components -name "*.vue" | wc -l

# Count all composables
find app/composables -name "*.ts" | grep -v ".cy.ts" | wc -l

# Count all stores
find app/stores -name "*.ts" | wc -l

# Count server API endpoints
find server/api -name "*.ts" | wc -l
```

### 2. Inventory Existing Tests

```bash
# Component tests (co-located)
find app/components -name "*.cy.ts" | wc -l

# Composable tests (co-located)
find app/composables -name "*.cy.ts" | wc -l

# Cypress component tests
find cypress/components -name "*.cy.ts" | wc -l

# E2E tests
find cypress/e2e -name "*.cy.ts" | wc -l
```

### 3. Find Files Without Tests

```bash
# Components without tests
for comp in $(find app/components -name "*.vue"); do
  test_file="${comp%.vue}.cy.ts"
  if [ ! -f "$test_file" ]; then
    echo "Missing test: $comp"
  fi
done

# Composables without tests
for comp in $(find app/composables -name "*.ts" | grep -v ".cy.ts"); do
  test_file="${comp%.ts}.cy.ts"
  if [ ! -f "$test_file" ]; then
    echo "Missing test: $comp"
  fi
done
```

### 4. Prioritize by Risk

**High Priority (test first):**

- Authentication components/composables
- Payment/checkout flows
- Form validation
- Data mutations (create/update/delete)
- Complex business logic

**Medium Priority:**

- Filtering/sorting logic
- Navigation components
- Display components with state

**Lower Priority:**

- Pure display components
- Utility functions
- Static pages

### 5. Prioritize by Complexity

Estimate complexity by:

```bash
# Lines of code
wc -l <file>

# Number of functions/methods
grep -c "function\|const.*=.*=>" <file>

# Number of reactive refs
grep -c "ref\|reactive\|computed" <file>

# External dependencies
grep -c "import" <file>
```

### 6. Check Critical Paths

Ensure these are tested:

- [ ] User authentication flow
- [ ] Search/filter functionality
- [ ] Advertisement display
- [ ] Favorites (likes) functionality
- [ ] Form submissions
- [ ] Error handling

### 7. Generate Coverage Report

If using coverage tools:

```bash
# With Vitest coverage
npx vitest run --coverage

# Check coverage report
open coverage/index.html
```

## Report Template

```markdown
# Test Coverage Report

**Date:** [DATE]
**Total Files:** [COUNT]
**Files with Tests:** [COUNT]
**Coverage:** [PERCENTAGE]%

## Summary by Category

| Category      | Total | Tested | Coverage | Gap |
| ------------- | ----- | ------ | -------- | --- |
| Components    | 45    | 20     | 44%      | 25  |
| Composables   | 20    | 8      | 40%      | 12  |
| Stores        | 7     | 3      | 43%      | 4   |
| API Endpoints | 15    | 5      | 33%      | 10  |
| Utils         | 10    | 2      | 20%      | 8   |

## High Priority Untested

### Critical Business Logic

1. `app/composables/usePayment.ts` - Payment processing
2. `app/stores/cart.ts` - Cart management
3. `app/components/checkout/` - Entire directory

### Complex Components

1. `app/components/filters/AdvancedFilters.vue` - Complex state
2. `app/components/advert/AdvertCard.vue` - Many variants

## Tested Files

### Components (20/45)

- [x] `ui/Button.vue`
- [x] `ui/Accordion.vue`
- [ ] `ui/Badge.vue`
      ...

### Composables (8/20)

- [x] `usePriceDataAggregation.ts`
- [ ] `useFilterUrlSync.ts`
      ...

## Recommendations

### Sprint Priority

1. Add tests for authentication flow
2. Add tests for filter composable
3. Add tests for favorites store

### Coverage Goals

- Increase component coverage to 60%
- Increase composable coverage to 80%
- Add integration tests for API
```

## Automated Script

```bash
#!/bin/bash
# find-untested-code.sh

echo "=== Test Coverage Analysis ==="
echo "Date: $(date)"
echo ""

echo "## File Counts"
echo "Components: $(find app/components -name "*.vue" | wc -l | tr -d ' ')"
echo "Composables: $(find app/composables -name "*.ts" ! -name "*.cy.ts" | wc -l | tr -d ' ')"
echo "Stores: $(find app/stores -name "*.ts" | wc -l | tr -d ' ')"
echo "API: $(find server/api -name "*.ts" | wc -l | tr -d ' ')"
echo ""

echo "## Test Counts"
echo "Component tests: $(find app/components -name "*.cy.ts" | wc -l | tr -d ' ')"
echo "Composable tests: $(find app/composables -name "*.cy.ts" | wc -l | tr -d ' ')"
echo "Cypress component: $(find cypress/components -name "*.cy.ts" 2>/dev/null | wc -l | tr -d ' ')"
echo "E2E tests: $(find cypress/e2e -name "*.cy.ts" | wc -l | tr -d ' ')"
echo ""

echo "## Untested Components (sample)"
for f in $(find app/components -name "*.vue" | head -20); do
  test="${f%.vue}.cy.ts"
  if [ ! -f "$test" ]; then
    echo "- $f"
  fi
done

echo ""
echo "## Untested Composables"
for f in $(find app/composables -name "*.ts" ! -name "*.cy.ts"); do
  test="${f%.ts}.cy.ts"
  if [ ! -f "$test" ]; then
    echo "- $f"
  fi
done
```

## Test Creation Templates

### Component Test Template

```typescript
// ComponentName.cy.ts
import { h } from "vue"
import ComponentName from "./ComponentName.vue"

describe("ComponentName", () => {
  it("renders correctly", () => {
    cy.mount(ComponentName, {
      props: {
        // required props
      },
    })
    cy.get('[data-cy="component"]').should("exist")
  })

  it("handles user interaction", () => {
    const onClickSpy = cy.spy().as("clickSpy")
    cy.mount(() => h(ComponentName, { onClick: onClickSpy }))
    cy.get("button").click()
    cy.get("@clickSpy").should("have.been.called")
  })
})
```

### Composable Test Template

```typescript
// useComposable.cy.ts
import { useComposable } from "./useComposable"

describe("useComposable", () => {
  it("returns expected initial state", () => {
    cy.mount({
      setup() {
        const { value, loading } = useComposable()
        return { value, loading }
      },
      template: "<div>{{ value }} {{ loading }}</div>",
    })
    cy.contains("initial value")
  })
})
```

## Checklist

- [ ] Inventory all testable files
- [ ] Inventory existing tests
- [ ] Calculate coverage percentage
- [ ] Identify untested files
- [ ] Prioritize by risk/complexity
- [ ] Check critical paths coverage
- [ ] Generate report
- [ ] Create test backlog
- [ ] Set coverage goals
