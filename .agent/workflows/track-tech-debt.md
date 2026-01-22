---
description: Scan for TODO, FIXME, HACK, and other technical debt markers in the codebase
---

Your goal is to find, categorize, and prioritize technical debt by scanning code comments and patterns.

## When to Use

- Sprint planning
- Before major refactors
- Periodic tech debt reviews
- As part of `weekly-maintenance` orchestrator

## Debt Markers to Find

| Marker             | Meaning              | Priority |
| ------------------ | -------------------- | -------- |
| `TODO`             | Planned work         | Medium   |
| `FIXME`            | Known bug/issue      | High     |
| `HACK`             | Temporary workaround | High     |
| `XXX`              | Needs attention      | Medium   |
| `BUG`              | Known defect         | Critical |
| `OPTIMIZE`         | Performance issue    | Low      |
| `REFACTOR`         | Needs cleanup        | Low      |
| `DEPRECATED`       | Should be removed    | Medium   |
| `@ts-ignore`       | Type bypass          | Medium   |
| `@ts-expect-error` | Known type issue     | Low      |
| `eslint-disable`   | Linting bypass       | Low      |
| `any` type usage   | Type safety gap      | Medium   |

## Workflow Steps

### 1. Scan for Comment Markers

```bash
# Find all TODO/FIXME/HACK comments
grep -rn "TODO\|FIXME\|HACK\|XXX\|BUG" app/ server/ --include="*.ts" --include="*.vue" | \
  grep -v node_modules | \
  grep -v ".cy.ts"  # Exclude test files if needed
```

### 2. Scan for Type Bypasses

```bash
# Find @ts-ignore usage
grep -rn "@ts-ignore\|@ts-expect-error" app/ server/ --include="*.ts" --include="*.vue"

# Find 'any' type usage
grep -rn ": any\|as any\|<any>" app/ server/ --include="*.ts" --include="*.vue"
```

### 3. Scan for ESLint Bypasses

```bash
# Find eslint-disable comments
grep -rn "eslint-disable" app/ server/ --include="*.ts" --include="*.vue"
```

### 4. Categorize by Priority

**Critical (Fix immediately):**

- `BUG` comments
- `FIXME` with security implications
- Production error workarounds

**High (This sprint):**

- `FIXME` general
- `HACK` workarounds
- `@ts-ignore` on important code paths

**Medium (This quarter):**

- `TODO` feature work
- `any` type in non-critical paths
- `DEPRECATED` markers

**Low (Backlog):**

- `OPTIMIZE` suggestions
- `REFACTOR` wishes
- Style improvements

### 5. Categorize by Area

Group findings by code area:

- **Components:** UI-related debt
- **API/Server:** Backend debt
- **Stores:** State management debt
- **Composables:** Logic debt
- **Types:** Type system debt
- **Tests:** Test coverage debt

### 6. Extract Context

For each marker, capture:

- File path and line number
- The full comment text
- Surrounding code context
- Age (git blame)
- Author

```bash
# Get author and date for each TODO
git blame -L <line>,<line> <file> | head -1
```

## Report Template

```markdown
# Technical Debt Report

**Date:** [DATE]
**Total Items:** [COUNT]

## Summary by Priority

| Priority | Count | Oldest     | Action       |
| -------- | ----- | ---------- | ------------ |
| Critical | X     | YYYY-MM-DD | Fix now      |
| High     | Y     | YYYY-MM-DD | This sprint  |
| Medium   | Z     | YYYY-MM-DD | This quarter |
| Low      | W     | YYYY-MM-DD | Backlog      |

## Summary by Category

| Category      | Count | Top Issue                |
| ------------- | ----- | ------------------------ |
| TODO          | X     | Feature Y incomplete     |
| FIXME         | Y     | Bug in component Z       |
| HACK          | Z     | Workaround for lib issue |
| Type Bypasses | W     | Missing types for API    |

## Critical Items

### 1. [File:Line] - BUG: Description

**Context:** Brief description
**Added:** YYYY-MM-DD by @author
**Impact:** What breaks if not fixed
**Suggested Fix:** How to resolve

## High Priority Items

### 1. [File:Line] - FIXME: Description

...

## Debt by Component Area

### Components (`app/components/`)

- TODO: 5 items
- FIXME: 2 items

### API (`server/api/`)

- TODO: 3 items
- HACK: 1 item

## Recommendations

1. **Immediate:** Fix critical bug in X
2. **Sprint goal:** Clear all FIXME in Y
3. **Quarterly:** Refactor Z to remove HACKs
```

## Automated Script

```bash
#!/bin/bash
# track-tech-debt.sh

echo "=== Technical Debt Scan ==="
echo "Date: $(date)"
echo ""

echo "## Critical (BUG/SECURITY)"
grep -rn "BUG\|SECURITY" app/ server/ --include="*.ts" --include="*.vue" 2>/dev/null || echo "None found"

echo ""
echo "## High Priority (FIXME/HACK)"
grep -rn "FIXME\|HACK" app/ server/ --include="*.ts" --include="*.vue" | head -20

echo ""
echo "## Medium Priority (TODO)"
grep -rn "TODO" app/ server/ --include="*.ts" --include="*.vue" | head -20

echo ""
echo "## Type Bypasses (@ts-ignore, any)"
grep -rn "@ts-ignore\|: any" app/ server/ --include="*.ts" --include="*.vue" | head -20

echo ""
echo "## Summary"
echo "- BUG/SECURITY: $(grep -rn "BUG\|SECURITY" app/ server/ --include="*.ts" --include="*.vue" 2>/dev/null | wc -l | tr -d ' ')"
echo "- FIXME: $(grep -rn "FIXME" app/ server/ --include="*.ts" --include="*.vue" | wc -l | tr -d ' ')"
echo "- HACK: $(grep -rn "HACK" app/ server/ --include="*.ts" --include="*.vue" | wc -l | tr -d ' ')"
echo "- TODO: $(grep -rn "TODO" app/ server/ --include="*.ts" --include="*.vue" | wc -l | tr -d ' ')"
echo "- @ts-ignore: $(grep -rn "@ts-ignore" app/ server/ --include="*.ts" --include="*.vue" | wc -l | tr -d ' ')"
echo "- any types: $(grep -rn ": any\|as any" app/ server/ --include="*.ts" --include="*.vue" | wc -l | tr -d ' ')"
```

## Best Practices for Markers

When adding debt markers, include context:

```typescript
// BAD - No context
// TODO: fix this

// GOOD - Full context
// TODO(2024-Q2): Add pagination support for large datasets
// See: https://github.com/org/repo/issues/123
// Contact: @developer for context
```

**Marker format:**

```
// MARKER(date/quarter): Description
// Context: Why this exists
// Ticket: Link to issue tracker
```

## Integration with Issue Tracker

Optionally, sync debt with GitHub Issues:

```bash
# Create issues from TODOs (example)
grep -rn "TODO" app/ | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  linenum=$(echo "$line" | cut -d: -f2)
  comment=$(echo "$line" | cut -d: -f3-)

  # Create GitHub issue via CLI
  # gh issue create --title "Tech Debt: $comment" --body "Found in $file:$linenum"
done
```

## Checklist

- [ ] Scan for TODO comments
- [ ] Scan for FIXME/HACK/BUG comments
- [ ] Scan for type bypasses
- [ ] Scan for ESLint disables
- [ ] Categorize by priority
- [ ] Categorize by area
- [ ] Get age/author via git blame
- [ ] Generate report
- [ ] Create action items
- [ ] (Optional) Sync to issue tracker
