---
description: Scaffold a new API endpoint following established patterns with validation, typing, and caching
---

# Create API Endpoint Workflow

This workflow utilizes the **API Skill**.

> [!IMPORTANT]
> **Step 0**: Use `view_file` to read `.agent/skills/api/SKILL.md` to load conventions.

## Steps

1.  **Plan Endpoint**
    - **Resource**: What resource is this for? (e.g., `advertisements`)
    - **Method**: GET, POST, PUT, DELETE?
    - **Parameters**: Query params or body schema?

2.  **Scaffold File**
    - Create `server/api/[resource]/[method].ts` per **API Skill > File Structure**.

3.  **Implement**
    - **Validation**: Use Zod schema with `parseQuery` or `parseBody`.
    - **Response Type**: Return a typed DTO from `server/types/api.ts`.
    - **Caching**: Use `cache.getOrFetch()` for static/reference data.

4.  **Verify**
    - Test with `curl` or browser dev tools.
    - Check edge cases (validation errors, not found).
