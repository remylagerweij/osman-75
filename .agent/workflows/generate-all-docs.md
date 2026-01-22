---
description: Regenerate or update all documentation across the project
---

Your goal is to ensure all documentation is current and comprehensive.

## When to Use

- After major refactors
- Before releases
- Monthly maintenance
- As part of `full-health-check`

## Orchestrated Workflows

This workflow combines:

1. `generate-component-docs` - Vue component documentation
2. `generate-composable-docs` - Composable documentation
3. `generate-store-docs` - Pinia store documentation

Plus additional documentation tasks.

## Important: Update vs Create

Per project requirements, documentation workflows should:

1. **Check if documentation exists** before creating
2. **Update existing docs** rather than overwrite
3. **Preserve manual additions** in existing docs
4. **Add new sections** for new code

## Workflow Steps

### Phase 1: Inventory (10 min)

**1.1 Find All Documentable Code**

```bash
# Components
find app/components -name "*.vue" | wc -l

# Composables
find app/composables -name "*.ts" ! -name "*.cy.ts" | wc -l

# Stores
find app/stores -name "*.ts" | wc -l

# Server API
find server/api -name "*.ts" | wc -l
```

**1.2 Find Existing Documentation**

```bash
# Component docs
ls docs/components/

# Store docs
ls docs/stores/

# Other docs
ls docs/
```

**1.3 Identify Gaps**
Compare code files to documentation to find:

- Code with no docs
- Docs for deleted code
- Outdated docs

### Phase 2: Component Documentation (20 min)

```
→ Run: /generate-component-docs workflow
```

With update focus:

- Check `docs/components/` for existing docs
- Update existing, create only if missing
- Mark removed components as deprecated

### Phase 3: Composable Documentation (15 min)

```
→ Run: /generate-composable-docs workflow
```

Key composables to document:

- `useFilterUrlSync.ts` - Filter URL synchronization
- `usePriceDataAggregation.ts` - Price data handling
- `useFeatureFlags.ts` - Feature flag system
- `useFocusTrap.ts` - Accessibility helper
- `useModalStack.ts` - Modal management

### Phase 4: Store Documentation (15 min)

```
→ Run: /generate-store-docs workflow
```

Stores to document:

- `auth.ts` - Authentication state
- `filters.ts` - Search filters
- `sorting.ts` - Sort preferences
- `ui.ts` - UI state
- `likes.ts` - User favorites
- `toast.ts` - Notifications
- `priceChart.ts` - Chart state

### Phase 5: API Documentation (15 min)

Document all server API endpoints:

```bash
# Find all endpoints
find server/api -name "*.ts" -type f
```

Create/update `docs/api-reference.md`:

- Endpoint URL
- Method (GET/POST/etc)
- Request parameters (from Zod schema)
- Response type
- Example usage

### Phase 6: Architecture Documentation (10 min)

Update high-level docs:

- `docs/project_overview.md` - Update if architecture changed
- `docs/conventions.md` - Add new conventions
- `docs/directory_structure.md` - Reflect current structure

### Phase 7: Validation (5 min)

**7.1 Check for Stale Docs**

```bash
# Find docs referencing deleted files
for doc in docs/*.md docs/**/*.md; do
  # Extract file references
  # Check if they exist
done
```

**7.2 Check for Missing Links**

```bash
# Verify internal links work
grep -rn "\]\(.*\.md\)" docs/ | while read line; do
  # Check if target exists
done
```

## Documentation Standards

### Component Doc Template

```markdown
# ComponentName

Brief description.

## Usage

\`\`\`vue
<ComponentName prop="value" />
\`\`\`

## Props

| Prop | Type   | Default | Description |
| ---- | ------ | ------- | ----------- |
| prop | string | -       | Description |

## Events

| Event             | Payload | Description     |
| ----------------- | ------- | --------------- |
| update:modelValue | T       | Emitted when... |

## Slots

| Slot    | Props | Description     |
| ------- | ----- | --------------- |
| default | -     | Default content |

## Examples

### Basic

\`\`\`vue
<ComponentName />
\`\`\`
```

### Composable Doc Template

```markdown
# useComposableName

Brief description.

## Usage

\`\`\`typescript
const { value, method } = useComposableName(options)
\`\`\`

## Parameters

| Param   | Type    | Required | Description   |
| ------- | ------- | -------- | ------------- |
| options | Options | No       | Configuration |

## Returns

| Property | Type     | Description        |
| -------- | -------- | ------------------ |
| value    | Ref<T>   | The reactive value |
| method   | Function | Does something     |

## Examples

\`\`\`typescript
// Basic usage
const { value } = useComposableName()
\`\`\`
```

## Report Template

```markdown
# Documentation Update Report

**Date:** [DATE]
**Updated By:** [AGENT]

## Summary

| Category    | Total | Documented | Updated | Created |
| ----------- | ----- | ---------- | ------- | ------- |
| Components  | X     | Y          | Z       | W       |
| Composables | X     | Y          | Z       | W       |
| Stores      | X     | Y          | Z       | W       |
| API         | X     | Y          | Z       | W       |

## Changes Made

### Updated Docs

- `docs/components/Button.md` - Added new variants
- `docs/stores/auth.md` - Updated API section

### New Docs Created

- `docs/composables/useNewFeature.md`

### Deprecated/Removed

- `docs/components/OldComponent.md` - Component removed

## Gaps Remaining

- [ ] Document `ComponentX` (new)
- [ ] Update `useY` (signature changed)

## Quality Check

- [x] All internal links valid
- [x] No references to deleted code
- [x] Examples are current
- [ ] Screenshots updated (if applicable)
```

## Automated Script

```bash
#!/bin/bash
# generate-all-docs.sh

echo "=========================================="
echo "DOCUMENTATION GENERATION"
echo "Date: $(date)"
echo "=========================================="

echo ""
echo "Phase 1: Inventory"
echo "------------------"

echo "Components: $(find app/components -name "*.vue" | wc -l | tr -d ' ')"
echo "Composables: $(find app/composables -name "*.ts" ! -name "*.cy.ts" | wc -l | tr -d ' ')"
echo "Stores: $(find app/stores -name "*.ts" | wc -l | tr -d ' ')"
echo "API Endpoints: $(find server/api -name "*.ts" | wc -l | tr -d ' ')"

echo ""
echo "Existing Docs:"
echo "- Component docs: $(ls docs/components/ 2>/dev/null | wc -l | tr -d ' ')"
echo "- Store docs: $(ls docs/stores/ 2>/dev/null | wc -l | tr -d ' ')"
echo "- Other docs: $(ls docs/*.md 2>/dev/null | wc -l | tr -d ' ')"

echo ""
echo "Phase 2-5: Run individual doc workflows"
echo "----------------------------------------"
echo "Run these workflows individually:"
echo "  - generate-component-docs"
echo "  - generate-composable-docs"
echo "  - generate-store-docs"
echo "  - (manual) API documentation"

echo ""
echo "Phase 6: Validate"
echo "-----------------"

echo "Checking for broken links..."
grep -rn "\]\([^)]*\.md\)" docs/ 2>/dev/null | head -5

echo ""
echo "=========================================="
echo "DOCUMENTATION UPDATE COMPLETE"
echo "=========================================="
```

## Checklist

- [ ] **Inventory**
  - [ ] Count all documentable code
  - [ ] Find existing documentation
  - [ ] Identify gaps and stale docs

- [ ] **Components**
  - [ ] Run generate-component-docs
  - [ ] Update existing docs
  - [ ] Create missing docs

- [ ] **Composables**
  - [ ] Run generate-composable-docs
  - [ ] Update existing docs
  - [ ] Create missing docs

- [ ] **Stores**
  - [ ] Run generate-store-docs
  - [ ] Update existing docs
  - [ ] Create missing docs

- [ ] **API**
  - [ ] Document all endpoints
  - [ ] Include request/response examples

- [ ] **Architecture**
  - [ ] Update project overview
  - [ ] Update conventions
  - [ ] Update directory structure

- [ ] **Validation**
  - [ ] Check for stale docs
  - [ ] Verify all links work
  - [ ] Remove deprecated docs
