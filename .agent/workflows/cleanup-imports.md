---
description: Find and fix unused imports, organize imports consistently across the codebase
---

Your goal is to identify and clean up unused imports, and optionally organize imports consistently.

## When to Use

- During code cleanup sprints
- After large refactors
- Before releases
- As part of `full-health-check` orchestrator

## Workflow Steps

### 1. Find Unused Imports

**Using TypeScript compiler:**

```bash
# TypeScript will report unused imports with strict settings
npm run typecheck 2>&1 | grep "is declared but its value is never read"
```

**Using ESLint:**

```bash
# Check for unused imports
npx eslint app/ server/ --rule "@typescript-eslint/no-unused-vars: error" 2>&1 | grep "unused"
```

**Manual grep patterns:**

```bash
# Find imports and check usage
grep -rn "^import " app/ --include="*.ts" --include="*.vue" | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  # Extract imported names and verify usage
done
```

### 2. Common Unused Import Patterns

| Pattern                 | Example                | Why It Happens            |
| ----------------------- | ---------------------- | ------------------------- |
| **Removed usage**       | `import { oldHelper }` | Feature was deleted       |
| **Type-only import**    | `import { Type }`      | Should be `import type`   |
| **Barrel import waste** | `import { a, b, c }`   | Only using `a`            |
| **Dev-only import**     | `import debug`         | Only used in removed code |
| **Duplicate import**    | Same module twice      | Merge conflict            |

### 3. Fix Unused Imports

**Remove completely unused:**

```typescript
// Before
import { unused, used } from "./utils"

// After
import { used } from "./utils"
```

**Convert to type import:**

```typescript
// Before
import { MyType, myFunction } from "./module"

// After
import type { MyType } from "./module"
import { myFunction } from "./module"

// Or combined (TypeScript 4.5+)
import { type MyType, myFunction } from "./module"
```

### 4. Organize Import Order

**Recommended order:**

```typescript
// 1. Node/external modules
import { ref, computed } from "vue"
import { storeToRefs } from "pinia"

// 2. Internal aliases (~/...)
import { useFiltersStore } from "~/stores/filters"
import type { Advertisement } from "~/types"

// 3. Relative imports
import MyComponent from "./MyComponent.vue"
import { helper } from "../utils"
```

### 5. Automated Cleanup

**Using ESLint with auto-fix:**

```bash
# Auto-fix unused imports (if eslint rules support it)
npx eslint app/ server/ --fix --rule "@typescript-eslint/no-unused-vars: error"
```

**Using organize-imports-cli:**

```bash
# Sort and organize imports
npx organize-imports-cli app/**/*.ts app/**/*.vue
```

### 6. Vue SFC Specific

In `.vue` files, check both `<script>` sections:

```vue
<script setup lang="ts">
// Unused imports here won't cause runtime errors but bloat bundle
import { unusedHelper } from "./helpers" // Remove if unused
</script>
```

### 7. Barrel Export Cleanup

Check `index.ts` files for unused re-exports:

```typescript
// types/index.ts
export * from "./advertisement" // Are all exports used?
export * from "./deprecated" // Maybe this whole file is unused
```

## Report Template

````markdown
# Import Cleanup Report

**Date:** [DATE]
**Files Analyzed:** [COUNT]

## Summary

| Issue                | Count | Auto-fixable |
| -------------------- | ----- | ------------ |
| Unused imports       | X     | Yes          |
| Type-only violations | Y     | Yes          |
| Duplicate imports    | Z     | Yes          |
| Disorganized imports | W     | Yes          |

## Unused Imports by File

### `app/components/Example.vue`

```diff
- import { unused } from './utils'
  import { used } from './utils'
```
````

### `app/composables/useExample.ts`

```diff
- import type { OldType } from '~/types'
```

## Actions Taken

- [x] Removed X unused imports
- [x] Converted Y imports to type-only
- [x] Fixed Z duplicate imports

````

## Automated Script

```bash
#!/bin/bash
# cleanup-imports.sh

echo "=== Import Cleanup ==="

echo -e "\n1. Finding unused imports..."
npm run typecheck 2>&1 | grep "is declared but" | tee /tmp/unused-imports.txt

echo -e "\n2. Finding type-only violations..."
grep -rn "import {.*Type" app/ --include="*.ts" | grep -v "import type" | head -20

echo -e "\n3. Finding duplicate imports..."
for file in $(find app -name "*.ts" -o -name "*.vue"); do
  imports=$(grep "^import " "$file" | cut -d"'" -f2 | sort)
  dupes=$(echo "$imports" | uniq -d)
  if [ -n "$dupes" ]; then
    echo "Duplicate in $file: $dupes"
  fi
done

echo -e "\nDone. Review /tmp/unused-imports.txt for full list."
````

## Vue-specific Patterns

### Auto-imports (Nuxt)

Nuxt auto-imports don't need explicit imports:

```typescript
// Not needed in Nuxt:
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useMyStore } from "~/stores/myStore"

// These are auto-imported
const count = ref(0)
const router = useRouter()
const store = useMyStore()
```

Check `nuxt.config.ts` for auto-import settings.

### Component Imports

Components are auto-registered in Nuxt:

```vue
<!-- Not needed: -->
<script setup>
import MyComponent from "~/components/MyComponent.vue"
</script>

<!-- Just use directly: -->
<template>
  <MyComponent />
</template>
```

## Checklist

- [ ] Run typecheck to find unused imports
- [ ] Run ESLint for additional checks
- [ ] Convert runtime imports to type-only where applicable
- [ ] Remove completely unused imports
- [ ] Fix duplicate imports
- [ ] Organize import order (optional)
- [ ] Verify no regressions with tests
- [ ] Commit cleanup changes
