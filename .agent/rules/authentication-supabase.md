---
trigger: glob
globs: ["app/stores/auth.ts", "server/api/auth/**/*.ts", "app/middleware/auth.ts", "app/components/auth/**/*.vue"]
description: Conventions for Supabase authentication, user sessions, and RLS
---

# Authentication & Supabase Conventions

## Store Centralization

**All auth state and logic MUST be in `stores/auth.ts`.**

Never call Supabase directly from components:

```typescript
// ❌ WRONG: Direct Supabase call in component
const { data } = await supabase.auth.signInWithPassword(...)

// ✅ CORRECT: Use auth store
const authStore = useAuthStore()
await authStore.login(email, password)
```

## User ID Resolution

**ALWAYS use computed that checks both `id` and `sub`:**

```typescript
// ✅ CORRECT: Handles JWT variations
const userId = computed(() => user.value?.id || user.value?.sub)

// ❌ WRONG: May be undefined with some JWT structures
const userId = computed(() => user.value?.id)
```

## Profile Management

```typescript
// Always check userId before profile operations
if (!userId.value) return

// Use upsert for profile updates (handles missing rows)
await supabase.from("profiles").upsert({
  id: userId.value,
  username: newUsername,
  updated_at: new Date().toISOString(),
})

// Fallback to user_metadata for display if profile missing
const displayName = profile.value?.display_name ?? user.value?.user_metadata?.full_name ?? "User"
```

## Middleware Safety

Auth middleware MUST await session hydration:

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient()

  // MUST await to prevent false redirects on page reload
  await client.auth.getSession()

  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo("/login")
  }
})
```

## Row Level Security (RLS)

- RLS MUST be enabled on all database tables
- Policies use `auth.uid()` to verify ownership:

```sql
CREATE POLICY "Users can view own data"
ON user_data FOR SELECT
USING (auth.uid() = user_id);
```

## Security Definer RPCs

Use for sensitive operations where client RLS is insufficient:

```sql
CREATE OR REPLACE FUNCTION check_username_availability(username TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.username = username);
END;
$$;
```

## Production Safety

Hide debug info in production:

```vue
<template>
  <!-- Only visible in development -->
  <pre v-if="import.meta.dev">{{ user }}</pre>
</template>
```
