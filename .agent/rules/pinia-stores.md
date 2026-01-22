---
trigger: glob
globs: ["app/stores/**/*.ts", "stores/**/*.ts"]
description: Pinia store conventions for state management
---

# Pinia Store Conventions

## Store Location

All stores live in `app/stores/` (or `stores/`).

## Store Structure

Use Composition API (setup syntax):

```typescript
// stores/example.ts
import { defineStore } from "pinia"

export const useExampleStore = defineStore("example", () => {
  // State
  const items = ref<Item[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters (computed)
  const itemCount = computed(() => items.value.length)
  const hasItems = computed(() => items.value.length > 0)

  // Actions
  async function fetchItems() {
    loading.value = true
    error.value = null
    try {
      items.value = await $fetch("/api/items")
    } catch (e) {
      error.value = "Failed to fetch items"
    } finally {
      loading.value = false
    }
  }

  function addItem(item: Item) {
    items.value.push(item)
  }

  function reset() {
    items.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    items,
    loading,
    error,
    // Getters
    itemCount,
    hasItems,
    // Actions
    fetchItems,
    addItem,
    reset,
  }
})
```

## Existing Stores

| Store           | Purpose                             |
| --------------- | ----------------------------------- |
| `auth.ts`       | Authentication state, user, session |
| `filters.ts`    | Search filter state                 |
| `sorting.ts`    | Sort preferences                    |
| `ui.ts`         | UI state (modals, sidebars)         |
| `likes.ts`      | User favorites                      |
| `toast.ts`      | Notification messages               |
| `priceChart.ts` | Chart configuration                 |

## Using Stores in Components

```typescript
// In <script setup>
const exampleStore = useExampleStore()

// Access state
console.log(exampleStore.items)

// Call actions
await exampleStore.fetchItems()

// Destructure with storeToRefs for reactivity
import { storeToRefs } from "pinia"
const { items, loading } = storeToRefs(exampleStore)
```

## Store Naming

- File: `kebab-case.ts` (e.g., `price-chart.ts`)
- Export: `useXxxStore` (e.g., `usePriceChartStore`)
- Pinia ID: `kebab-case` or `camelCase` (e.g., `'priceChart'`)

## Auth Store Special Rules

The `auth.ts` store has special requirements:

- All Supabase auth calls MUST go through this store
- User ID: Use `computed(() => user.value?.id || user.value?.sub)`
- See @.agent/rules/authentication-supabase.md for details

## Filters Store Special Rules

The `filters.ts` store syncs with URL:

- Never manually push to router for filter changes
- Update store, let `useFilterUrlSync` handle URL
- See @.agent/rules/filters-url-sync.md for details
