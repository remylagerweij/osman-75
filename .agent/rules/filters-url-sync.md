---
trigger: glob
globs: ["app/stores/filters.ts", "app/composables/useFilterUrlSync.ts", "app/components/filters/**/*.vue"]
description: Architecture for syncing search filters with URL query parameters
---

# Filters & URL Sync Architecture

## Source of Truth

**URL query parameters are the source of truth** for shareable search state.

## Golden Rule

**NEVER manually push to router to change filters.** Instead:

1. Update the Pinia filters store (`stores/filters.ts`)
2. Let `composables/useFilterUrlSync.ts` handle URL sync automatically

```typescript
// ❌ WRONG: Manual router push
const router = useRouter()
router.push({ query: { manufacturer: "Honda" } })

// ✅ CORRECT: Update store, let sync handle URL
const filtersStore = useFiltersStore()
filtersStore.setManufacturer("Honda")
```

## How It Works

`useFilterUrlSync.ts` provides bidirectional sync:

```
┌─────────────────┐     ┌─────────────────┐
│  Pinia Store    │ ←→  │  URL Query      │
│  filters.ts     │     │  Parameters     │
└─────────────────┘     └─────────────────┘
         ↑                      ↑
         │                      │
    Store Update           URL Change
    (code/UI)              (browser nav)
```

## Adding a New Filter

1. **Update store defaults** in `stores/filters.ts`:

   ```typescript
   const defaultFilters = {
     // ... existing
     newFilter: null as string | null,
   }
   ```

2. **Add to FILTER_KEYS** in `composables/useFilterUrlSync.ts`:

   ```typescript
   const FILTER_KEYS = [
     // ... existing
     "newFilter",
   ] as const
   ```

3. **Create UI** in `components/filters/`:

   ```vue
   <script setup lang="ts">
   const filtersStore = useFiltersStore()

   function handleChange(value: string) {
     filtersStore.setNewFilter(value)
   }
   </script>
   ```

## Filter Reset

To reset filters, update the store:

```typescript
const filtersStore = useFiltersStore()
filtersStore.resetFilters() // URL updates automatically
```

## Deep Linking

URL parameters enable deep linking. When a user visits:

```
/zoeken?manufacturer=Honda&minPrice=5000
```

The sync composable:

1. Reads URL params on mount
2. Updates Pinia store with values
3. UI reflects the filter state

## Related Files

- `stores/filters.ts` - Filter state
- `composables/useFilterUrlSync.ts` - Bidirectional sync
- `components/filters/` - Filter UI components
