---
trigger: glob
globs: ["app/composables/**/*.ts"]
description: Composable conventions for Vue 3 composition functions
---

# Composable Conventions

## File Location

All composables live in `app/composables/`.

## Naming

- File: `useXxx.ts` (e.g., `useFilterUrlSync.ts`)
- Export: `useXxx` function (e.g., `export function useFilterUrlSync()`)

## Structure Pattern

```typescript
// composables/useExample.ts
import { ref, computed, watch, onMounted, onUnmounted } from "vue"

export interface UseExampleOptions {
  initialValue?: string
  debounce?: number
}

export interface UseExampleReturn {
  value: Ref<string>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  doSomething: () => Promise<void>
  reset: () => void
}

export function useExample(options: UseExampleOptions = {}): UseExampleReturn {
  const { initialValue = "", debounce = 300 } = options

  // State
  const value = ref(initialValue)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const hasValue = computed(() => value.value.length > 0)

  // Methods
  async function doSomething() {
    isLoading.value = true
    error.value = null
    try {
      // async operation
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unknown error"
    } finally {
      isLoading.value = false
    }
  }

  function reset() {
    value.value = initialValue
    error.value = null
  }

  // Lifecycle
  onMounted(() => {
    // setup
  })

  onUnmounted(() => {
    // cleanup
  })

  // Return public API
  return {
    value,
    isLoading,
    error,
    doSomething,
    reset,
  }
}
```

## Key Composables

| Composable                  | Purpose                         |
| --------------------------- | ------------------------------- |
| `useFilterUrlSync`          | Bidirectional filter ↔ URL sync |
| `usePriceDataAggregation`   | Price chart data processing     |
| `useFeatureFlags`           | Feature flag access             |
| `useFocusTrap`              | Accessibility focus management  |
| `useModalStack`             | Modal z-index management        |
| `useAdvertisements`         | Advertisement data fetching     |
| `useFavoriteAdvertisements` | User favorites                  |

## Best Practices

### Return Typed Objects

```typescript
// ✅ CORRECT: Explicit return type
export function useExample(): UseExampleReturn {
  // ...
  return { value, method }
}

// ❌ WRONG: Inferred return type (less clear for consumers)
export function useExample() {
  return { value, method }
}
```

### Handle Cleanup

```typescript
export function useExample() {
  const intervalId = ref<number | null>(null)

  onMounted(() => {
    intervalId.value = window.setInterval(tick, 1000)
  })

  onUnmounted(() => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
    }
  })
}
```

### Accept Options Object

```typescript
// ✅ CORRECT: Options object (extensible)
export function useExample(options: UseExampleOptions = {}) {}

// ❌ WRONG: Positional args (hard to extend)
export function useExample(value: string, debounce: number) {}
```

### Nuxt Global Fallbacks

For composables used in component tests:

```typescript
export function useExample() {
  // Safe access to Nuxt context
  const nuxtSafe = typeof useNuxtApp === "function" ? useNuxtApp() : {}
  const router = nuxtSafe.$router ?? null
}
```

## Testing Composables

Co-locate tests as `useExample.cy.ts`:

```typescript
import { useExample } from "./useExample"

describe("useExample", () => {
  it("returns expected initial state", () => {
    cy.mount({
      setup() {
        const { value, isLoading } = useExample()
        return { value, isLoading }
      },
      template: "<div>{{ value }} {{ isLoading }}</div>",
    })
    cy.contains("false") // isLoading = false initially
  })
})
```
