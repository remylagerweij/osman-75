---
description: Detect unused exports, components, functions, and imports across the codebase
---

Your goal is to identify dead code that can be safely removed to reduce maintenance burden and improve build performance.

## When to Use

- During periodic codebase cleanup
- Before major releases
- When refactoring large features
- As part of `full-health-check` orchestrator

## Dead Code Categories

| Category                 | What to Find                            | Impact              |
| ------------------------ | --------------------------------------- | ------------------- |
| **Unused components**    | Vue files never imported/used           | Bundle bloat        |
| **Unused composables**   | Functions never called                  | Maintenance burden  |
| **Unused exports**       | Exported functions/types never imported | Confusion           |
| **Unused imports**       | Imported but never used                 | Minor bundle impact |
| **Unused store state**   | State properties never accessed         | Confusion           |
| **Unused API endpoints** | Endpoints never called                  | Security risk       |

## Workflow Steps

### 1. Find Unused Components

```bash
# List all component files
find app/components -name "*.vue" -type f | while read file; do
  name=$(basename "$file" .vue)
  # Check if component is used anywhere
  if ! grep -r "<$name" app/ --include="*.vue" | grep -v "$file" > /dev/null; then
    if ! grep -r "\"$name\"" app/ --include="*.ts" --include="*.vue" > /dev/null; then
      echo "UNUSED: $file"
    fi
  fi
done
```

**Manual verification needed for:**

- Dynamic components: `<component :is="...">`
- Components used via `resolveComponent()`
- Components only used in tests

### 2. Find Unused Composables

```bash
# For each composable, check usage
for file in app/composables/*.ts; do
  name=$(basename "$file" .ts)
  # Skip test files
  [[ "$name" == *.cy ]] && continue

  # Check if imported anywhere
  if ! grep -r "from.*['\"].*$name['\"]" app/ --include="*.ts" --include="*.vue" | grep -v "$file" > /dev/null; then
    echo "UNUSED: $file"
  fi
done
```

### 3. Find Unused Exports

For each TypeScript file, check exported functions/types:

```typescript
// Pattern to find
export function unusedFunction() {} // Check if imported anywhere
export interface UnusedType {} // Check if referenced
export const UNUSED_CONST = "value" // Check if imported
```

```bash
# Extract exports and check usage
grep -h "^export " app/**/*.ts | while read export; do
  # Parse export name and search for usage
done
```

### 4. Find Unused Imports

```bash
# Look for TypeScript unused import warnings
npm run typecheck 2>&1 | grep "is declared but"

# Or use ESLint
npx eslint app/ --rule "no-unused-vars: error" 2>&1 | grep "unused"
```

### 5. Find Unused Store State

For each store, check if state properties are accessed:

```typescript
// In store
state: () => ({
  unusedProperty: null, // Is this accessed anywhere?
})
```

```bash
# For each store property
grep -r "store\.propertyName" app/ --include="*.ts" --include="*.vue"
```

### 6. Find Unused API Endpoints

```bash
# List all API endpoints
find server/api -name "*.ts" -type f | while read file; do
  # Extract endpoint path from filename
  path=$(echo "$file" | sed 's/server\/api//' | sed 's/\.get\.ts//' | sed 's/\.post\.ts//' | sed 's/index$//')

  # Check if called from frontend
  if ! grep -r "/api$path" app/ --include="*.ts" --include="*.vue" > /dev/null; then
    echo "POSSIBLY UNUSED: $file -> /api$path"
  fi
done
```

## Report Template

Generate a report:

```markdown
# Dead Code Analysis Report

**Date:** [DATE]
**Analyzed:** [FILE_COUNT] files

## Summary

| Category      | Found | Verified Unused | Safe to Remove |
| ------------- | ----- | --------------- | -------------- |
| Components    | X     | Y               | Z              |
| Composables   | X     | Y               | Z              |
| Exports       | X     | Y               | Z              |
| Store State   | X     | Y               | Z              |
| API Endpoints | X     | Y               | Z              |

## Unused Components

| File               | Last Modified | Reason           |
| ------------------ | ------------- | ---------------- |
| `OldComponent.vue` | 2024-01-01    | No imports found |

## Unused Composables

| File               | Exports         | Reason               |
| ------------------ | --------------- | -------------------- |
| `useDeprecated.ts` | `useDeprecated` | No usage in codebase |

## Recommendations

### Safe to Remove (High Confidence)

- [ ] `app/components/old/DeprecatedCard.vue`
- [ ] `app/composables/useLegacyFeature.ts`

### Needs Manual Review

- [ ] `app/components/dynamic/LazyComponent.vue` - May be dynamically loaded
- [ ] `server/api/internal/debug.get.ts` - May be used externally

### Keep (False Positives)

- `Component.vue` - Used via dynamic import in router
```

## False Positive Handling

Watch for these patterns that cause false positives:

| Pattern             | Why It's Missed         | How to Verify       |
| ------------------- | ----------------------- | ------------------- |
| Dynamic imports     | `import()` not detected | Check route config  |
| Provide/inject      | Global providers        | Check app.vue       |
| Plugin registration | Nuxt plugins            | Check plugins/      |
| External usage      | Used by other repos     | Check API consumers |
| Test-only code      | Only in \*.cy.ts        | May be intentional  |

## Automated Checks

```bash
# Use knip for comprehensive dead code detection
npx knip

# Or use ts-prune for unused exports
npx ts-prune

# Check bundle for unused code
npm run build -- --analyze
```

## Removal Process

Before removing code:

1. **Verify unused:** Double-check with multiple search methods
2. **Check git history:** Was it recently added? May be WIP
3. **Check branches:** May be used in feature branches
4. **Deprecate first:** Mark as deprecated, remove in next release
5. **Update imports:** Remove from barrel exports (index.ts)
6. **Run tests:** Ensure nothing breaks

```bash
# Safe removal workflow
git checkout -b cleanup/remove-dead-code
# Remove files
npm run typecheck
npm run test:component
npm run test:e2e
git commit -m "chore: remove unused [component/composable]"
```

## Checklist

- [ ] Scan for unused components
- [ ] Scan for unused composables
- [ ] Scan for unused exports
- [ ] Scan for unused store state
- [ ] Scan for unused API endpoints
- [ ] Generate report
- [ ] Verify false positives
- [ ] Create removal plan
- [ ] Remove with tests
