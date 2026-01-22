---
name: State Management
description: Helper for Pinia store creation and best practices
---

# State Management (Pinia) Skill

This skill standardizes Pinia store development.

## 1. Conventions

### File Location

- Stores live in `app/stores/`.
- Name: `storeName.ts` (e.g., `auth.ts`, `filters.ts`).

### Setup Function Syntax

```typescript
export const useMyStore = defineStore('myStore', () => {
  // State
  const items = ref<Item[]>([])

  // Getters
  const count = computed(() => items.value.length)

  // Actions
  async function fetchItems() { ... }

  return { items, count, fetchItems }
})
```

### Best Practices

- **Setup Syntax**: Prefer setup function over options API.
- **Persistence**: Use `pinia-plugin-persistedstate` for localStorage.
- **Devtools**: Named stores for easy debugging.

## 2. Workflows

### Scaffold Store

1.  Create `app/stores/[name].ts`.
2.  Define state, getters, and actions using setup syntax.
3.  Export the `useXxxStore` function.
