---
name: Authentication
description: Helper for Supabase authentication and RLS patterns
---

# Authentication Skill

This skill centralizes Supabase auth patterns for MotoData.

## 1. Conventions

### Store Centralization

**All auth logic MUST be in `stores/auth.ts`.**

```typescript
// ❌ WRONG: Direct Supabase call
const { data } = await supabase.auth.signInWithPassword(...)

// ✅ CORRECT: Use auth store
await authStore.login(email, password)
```

### User ID Resolution

```typescript
// Handles JWT variations (id vs sub)
const userId = computed(() => user.value?.id || user.value?.sub)
```

### RLS Policies

- RLS MUST be enabled on all tables with user data.
- Use `auth.uid() = user_id` for ownership checks.

## 2. Workflows

### Add Protected Route

1.  Apply `middleware: 'auth'` to the page.
2.  Ensure `middleware/auth.ts` awaits session hydration.
3.  Check backend RLS policies for the data being accessed.
