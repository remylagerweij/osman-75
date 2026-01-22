---
description: Add authentication protection to a route with middleware and RLS
---

# Add Protected Route Workflow

This workflow utilizes the **Authentication Skill**.

> [!IMPORTANT]
> **Step 0**: Use `view_file` to read `.agent/skills/authentication/SKILL.md` to load conventions.

## Steps

1.  **Identify Route**
    - Which page needs protection? (e.g., `pages/dashboard.vue`)

2.  **Apply Middleware**
    - Add `definePageMeta({ middleware: 'auth' })` to the page.

3.  **Verify Middleware Exists**
    - Ensure `middleware/auth.ts` exists and awaits session hydration.
    - If missing, create it using **Auth Skill** patterns.

4.  **Check Backend RLS**
    - If the page fetches user data, ensure the API endpoint and database have RLS policies.
    - RLS should use `auth.uid() = user_id`.

5.  **Test**
    - Visit the route while logged out → should redirect to `/login`.
    - Visit while logged in → should render correctly.
