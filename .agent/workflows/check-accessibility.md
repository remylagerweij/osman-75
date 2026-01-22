---
description: Run accessibility checks on components and pages to identify WCAG compliance issues
---

Your goal is to identify accessibility (a11y) issues in components and pages to ensure WCAG compliance.

## When to Use

- Before releases
- After creating new interactive components
- Periodic accessibility reviews
- As part of `full-health-check`

## Accessibility Categories

| Category           | WCAG Criteria | Priority |
| ------------------ | ------------- | -------- |
| **Keyboard**       | 2.1.1, 2.1.2  | Critical |
| **Focus**          | 2.4.7         | Critical |
| **Color Contrast** | 1.4.3         | High     |
| **Alt Text**       | 1.1.1         | High     |
| **Form Labels**    | 1.3.1, 3.3.2  | High     |
| **ARIA**           | 4.1.2         | Medium   |
| **Headings**       | 1.3.1         | Medium   |
| **Motion**         | 2.3.3         | Medium   |

## Workflow Steps

### 1. Automated Audits

**Using axe-core:**

```bash
# Install axe CLI if needed
npm install -g @axe-core/cli

# Run on dev server
npx axe http://localhost:3000 --exit
npx axe http://localhost:3000/zoeken --exit
npx axe http://localhost:3000/motor/1 --exit
```

**Using Lighthouse:**

```bash
# Run Lighthouse accessibility audit
npx lighthouse http://localhost:3000 --only-categories=accessibility --output=json > a11y-report.json
```

**In Cypress tests:**

```typescript
// Install cypress-axe
// npm install -D cypress-axe

// In test
cy.injectAxe()
cy.checkA11y()
```

### 2. Manual Keyboard Testing

For each interactive page:

| Test          | How         | Expected                  |
| ------------- | ----------- | ------------------------- |
| Tab order     | Press Tab   | Logical order, no traps   |
| Focus visible | Tab through | Clear focus indicator     |
| Activate      | Enter/Space | Buttons/links work        |
| Escape        | Press Esc   | Closes modals/dropdowns   |
| Arrow keys    | In groups   | Navigate within component |

**Components to test:**

- [ ] Navigation menu
- [ ] Dropdown filters
- [ ] Modal dialogs
- [ ] Accordion
- [ ] Button groups
- [ ] Form inputs

### 3. Screen Reader Testing

Test with VoiceOver (macOS) or NVDA (Windows):

| Element     | Announces           | Issue If      |
| ----------- | ------------------- | ------------- |
| Links       | Purpose/destination | Just "link"   |
| Buttons     | Action              | Just "button" |
| Images      | Alt text            | "Image" only  |
| Form fields | Label               | No label      |
| Errors      | Error message       | Silent        |

### 4. Color Contrast Check

```bash
# Check contrast ratios
# Use browser DevTools > Accessibility > Contrast

# Or online tool
# https://webaim.org/resources/contrastchecker/
```

**Requirements:**

- Normal text: 4.5:1 ratio (WCAG AA)
- Large text (18px+): 3:1 ratio
- UI components: 3:1 ratio

### 5. Component-Level Checks

For each interactive component:

**Buttons:**

```vue
<!-- ❌ Missing accessible name -->
<button><Icon iconName="close" /></button>

<!-- ✅ Has accessible name -->
<button aria-label="Close dialog">
  <Icon iconName="close" />
</button>
```

**Forms:**

```vue
<!-- ❌ Input without label -->
<input type="text" placeholder="Search..." />

<!-- ✅ Properly labeled -->
<label for="search">Search</label>
<input id="search" type="text" />
```

**Images:**

```vue
<!-- ❌ Missing alt -->
<img :src="ad.image" />

<!-- ✅ Descriptive alt -->
<img :src="ad.image" :alt="`${ad.manufacturer} ${ad.model}`" />

<!-- ✅ Decorative image -->
<img :src="decorative" alt="" role="presentation" />
```

**Interactive divs:**

```vue
<!-- ❌ No keyboard access -->
<div @click="handleClick">Click me</div>

<!-- ✅ Keyboard accessible -->
<div role="button" tabindex="0" @click="handleClick" @keydown.enter="handleClick" @keydown.space.prevent="handleClick">
  Click me
</div>

<!-- ✅✅ Or just use button -->
<button @click="handleClick">Click me</button>
```

### 6. ARIA Pattern Validation

Check ARIA patterns match expected behavior:

| Pattern          | Required ARIA                     | Keyboard               |
| ---------------- | --------------------------------- | ---------------------- |
| **Modal**        | `role="dialog"`, `aria-modal`     | Esc closes, focus trap |
| **Tab panel**    | `role="tablist/tab/tabpanel"`     | Arrow keys switch      |
| **Accordion**    | `aria-expanded`, `aria-controls`  | Enter/Space toggle     |
| **Dropdown**     | `role="listbox"`, `aria-expanded` | Arrow keys, Esc        |
| **Button group** | `role="radiogroup/radio"`         | Arrow keys select      |

### 7. Motion & Animation

Check for users who prefer reduced motion:

```css
/* Component should respect this */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

```typescript
// Or check in JS
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
```

## Report Template

````markdown
# Accessibility Audit Report

**Date:** [DATE]
**Pages Tested:** [LIST]
**Tools Used:** axe-core, Lighthouse, manual testing

## Summary

| Category | Issues | Critical | High | Medium |
| -------- | ------ | -------- | ---- | ------ |
| Keyboard | X      | Y        | Z    | W      |
| Focus    | X      | Y        | Z    | W      |
| Contrast | X      | Y        | Z    | W      |
| Alt Text | X      | Y        | Z    | W      |
| Forms    | X      | Y        | Z    | W      |
| ARIA     | X      | Y        | Z    | W      |

## Critical Issues

### 1. [Component/Page] - Issue Description

**WCAG:** 2.1.1 Keyboard
**Impact:** Users cannot activate button without mouse
**Location:** `app/components/X.vue:L42`
**Fix:**

```vue
<div @click="x" @keydown.enter="x" tabindex="0" role="button">
```
````

## High Priority Issues

### 1. Missing form labels

...

## Lighthouse Scores

| Page   | Score | Issues |
| ------ | ----- | ------ |
| Home   | 85    | 3      |
| Search | 72    | 8      |
| Detail | 90    | 2      |

## Test Coverage

### Tested with Keyboard

- [x] Navigation
- [x] Filters
- [ ] Modal dialogs
- [ ] Forms

### Tested with Screen Reader

- [x] Page structure
- [ ] Dynamic content
- [ ] Error messages

````

## Cypress A11y Integration

Add to component tests:

```typescript
// cypress/support/component.ts
import 'cypress-axe'

Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe()
  cy.checkA11y(null, {
    rules: {
      // Customize rules
      'color-contrast': { enabled: true },
    },
  })
})

// In tests
it('passes accessibility checks', () => {
  cy.mount(MyComponent)
  cy.checkAccessibility()
})
````

## Common Fixes

### Focus Trap for Modals

```typescript
// composables/useFocusTrap.ts
export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  // Trap focus within container
  // Return focus to trigger on close
}
```

### Skip Link

```vue
<!-- layouts/default.vue -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Announce Dynamic Content

```vue
<div aria-live="polite" aria-atomic="true">
  {{ statusMessage }}
</div>
```

## Checklist

- [ ] Run axe-core on all pages
- [ ] Run Lighthouse accessibility audit
- [ ] Test keyboard navigation on all pages
- [ ] Test focus visibility
- [ ] Test with screen reader
- [ ] Check color contrast
- [ ] Verify all images have alt text
- [ ] Verify all forms have labels
- [ ] Validate ARIA patterns
- [ ] Check motion preferences
- [ ] Generate report
- [ ] Create fix tickets
