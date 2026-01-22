---
name: Composables
description: Helper for creating Vue 3 composables with proper structure and testing
---

# Composables Skill

This skill standardizes composable development in MotoData.

## 1. Conventions

### Naming

- File: `useXxx.ts` (e.g., `useFilterUrlSync.ts`)
- Export: `export function useXxx()`

### Structure Pattern

```typescript
export interface UseExampleOptions { ... }
export interface UseExampleReturn { ... }

export function useExample(options: UseExampleOptions = {}): UseExampleReturn {
  // State
  const value = ref(...)

  // Methods
  function doSomething() { ... }

  // Lifecycle (onMounted, onUnmounted)

  return { value, doSomething }
}
```

### Best Practices

- **Return Typed Objects**: Explicit `UseXxxReturn` interface.
- **Accept Options Object**: Not positional args.
- **Handle Cleanup**: Use `onUnmounted` for intervals/listeners.
- **Nuxt Fallbacks**: `const nuxtSafe = typeof useNuxtApp === 'function' ? useNuxtApp() : {}`

## 2. Workflows

### Create Composable

1.  **Plan**: Define the composable's purpose and return API.
2.  **Scaffold**: Create `app/composables/useXxx.ts`.
3.  **Implement**: Follow the Structure Pattern above.
4.  **Test**: Create co-located `useXxx.cy.ts` using Testing Skill.
