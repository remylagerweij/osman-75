---
description: Analyze production bundle size, identify large dependencies, and find optimization opportunities
---

Your goal is to analyze the production bundle to identify size issues and optimization opportunities.

## When to Use

- Before releases (performance gate)
- When build times increase
- After adding new dependencies
- Quarterly performance reviews
- As part of `pre-release-audit`

## Workflow Steps

### 1. Generate Bundle Analysis

```bash
# Build with bundle analyzer
npm run build -- --analyze

# Or use nuxt analyze command
npx nuxi analyze
```

This generates a visual treemap of your bundle.

### 2. Check Build Output Size

```bash
# Build and check sizes
npm run build

# Check .output directory
du -sh .output/
du -sh .output/public/_nuxt/

# List largest files
find .output/public/_nuxt -type f -name "*.js" -exec du -h {} \; | sort -hr | head -20
```

### 3. Identify Large Dependencies

**Using bundlephobia (online):**

```bash
# Check package size before installing
# Visit: https://bundlephobia.com/package/<package-name>
```

**Using npm pack:**

```bash
# Check installed package sizes
du -sh node_modules/* | sort -hr | head -20
```

**Common large dependencies:**
| Package | Typical Size | Alternative |
|---------|--------------|-------------|
| `moment` | 300KB+ | `dayjs` (2KB) |
| `lodash` | 70KB+ | `lodash-es` + tree-shaking |
| `chart.js` | 200KB+ | `lightweight-charts` |
| `fontawesome` | 1MB+ | Individual icons only |

### 4. Check for Duplicate Dependencies

```bash
# Find duplicate packages (different versions)
npm ls --all 2>&1 | grep -E "deduped|invalid"

# Or use npm-dedupe
npm dedupe
```

### 5. Analyze Code Splitting

Check if routes are properly code-split:

```bash
# In Nuxt, pages should be lazy-loaded
# Check for dynamic imports in pages/

# Look for large shared chunks
ls -lah .output/public/_nuxt/*.js | head -20
```

### 6. Check for Tree-Shaking Issues

**Signs of poor tree-shaking:**

- Barrel imports (`import { x } from './utils'`) including unused code
- CommonJS imports in ESM context
- Side effects in modules

```typescript
// BAD: May import entire barrel
import { oneFunction } from "~/utils"

// GOOD: Direct import
import { oneFunction } from "~/utils/oneFunction"
```

### 7. Image Optimization Check

```bash
# Find large images
find public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) -exec du -h {} \; | sort -hr | head -10

# Check for unoptimized formats
find public -type f -name "*.png" -size +100k
```

## Report Template

```markdown
# Bundle Analysis Report

**Date:** [DATE]
**Build Type:** Production
**Total Bundle Size:** [SIZE]

## Summary

| Metric        | Value | Target | Status |
| ------------- | ----- | ------ | ------ |
| Total JS      | X KB  | <500KB | ✅/❌  |
| Main chunk    | Y KB  | <200KB | ✅/❌  |
| Largest chunk | Z KB  | <300KB | ✅/❌  |
| CSS           | W KB  | <100KB | ✅/❌  |

## Largest Dependencies

| Package   | Size (gzip) | % of Bundle | Action               |
| --------- | ----------- | ----------- | -------------------- |
| `vue`     | 40KB        | 8%          | Required             |
| `big-lib` | 100KB       | 20%         | Consider alternative |

## Code Splitting Analysis

| Route/Chunk | Size  | Lazy? | Issue     |
| ----------- | ----- | ----- | --------- |
| `/`         | 150KB | ✅    | -         |
| `/search`   | 300KB | ❌    | Too large |

## Duplicate Dependencies

| Package  | Versions         | Wasted | Fix            |
| -------- | ---------------- | ------ | -------------- |
| `lodash` | 4.17.20, 4.17.21 | 70KB   | Align versions |

## Recommendations

### Quick Wins (Low Effort, High Impact)

1. Remove unused dependency X (saves 50KB)
2. Switch from moment to dayjs (saves 298KB)

### Medium Effort

1. Implement dynamic imports for heavy components
2. Dedupe lodash versions

### Long Term

1. Evaluate alternative to chart library
2. Implement image optimization pipeline
```

## Optimization Techniques

### 1. Dynamic Imports for Heavy Components

```typescript
// Before: Loaded in main bundle
import HeavyChart from "~/components/HeavyChart.vue"

// After: Lazy loaded
const HeavyChart = defineAsyncComponent(() => import("~/components/HeavyChart.vue"))
```

### 2. Tree-Shakeable Imports

```typescript
// Before: May import full library
import _ from "lodash"
_.debounce(fn, 100)

// After: Only import what's used
import debounce from "lodash/debounce"
debounce(fn, 100)
```

### 3. Font Optimization

```css
/* Load only needed weights/styles */
@font-face {
  font-family: "Poppins";
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/poppins-400.woff2") format("woff2");
}
```

### 4. Image Optimization

```bash
# Convert to WebP
npx sharp-cli resize public/images/*.png --format webp --output public/images/

# Or use Nuxt Image module for automatic optimization
```

### 5. Dependency Alternatives

| Heavy Package | Lighter Alternative       | Savings |
| ------------- | ------------------------- | ------- |
| `moment`      | `dayjs`                   | ~298KB  |
| `lodash`      | `lodash-es` + cherry-pick | ~60KB   |
| `axios`       | `$fetch` (Nuxt)           | ~15KB   |
| `uuid`        | `nanoid`                  | ~3KB    |

## Nuxt-Specific Optimizations

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Enable build optimizations
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Group vendor code
            "chart-vendor": ["chart.js"],
          },
        },
      },
    },
  },

  // Optimize fonts
  experimental: {
    payloadExtraction: true,
  },
})
```

## Automated Script

```bash
#!/bin/bash
# analyze-bundle.sh

echo "=== Bundle Analysis ==="
echo "Building production bundle..."
npm run build 2>&1 | tail -10

echo ""
echo "## Bundle Size Summary"
echo "Total: $(du -sh .output/ | cut -f1)"
echo "JS: $(du -sh .output/public/_nuxt/*.js 2>/dev/null | awk '{sum+=$1} END {print sum}')KB"

echo ""
echo "## Largest JS Files"
find .output/public/_nuxt -name "*.js" -exec du -h {} \; | sort -hr | head -10

echo ""
echo "## Largest Dependencies"
du -sh node_modules/* 2>/dev/null | sort -hr | head -10

echo ""
echo "Run 'npm run build -- --analyze' for visual treemap"
```

## Performance Budgets

Set up performance budgets in CI:

```yaml
# .github/workflows/bundle-check.yml
- name: Check bundle size
  run: |
    npm run build
    size=$(du -sb .output/public/_nuxt | cut -f1)
    max_size=1048576  # 1MB limit
    if [ $size -gt $max_size ]; then
      echo "Bundle too large: $size bytes"
      exit 1
    fi
```

## Checklist

- [ ] Run production build
- [ ] Analyze bundle composition
- [ ] Identify largest dependencies
- [ ] Check for duplicates
- [ ] Verify code splitting
- [ ] Check tree-shaking effectiveness
- [ ] Audit images
- [ ] Generate report
- [ ] Create optimization tasks
- [ ] Set up performance budget
