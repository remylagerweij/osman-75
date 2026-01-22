---
name: API
description: Helper for creating and maintaining Nuxt server API endpoints with Prisma
---

# API Skill

This skill standardizes API endpoint development in the MotoData project.

## 1. Conventions

### File Structure

```
server/api/[resource]/
├── index.get.ts      # GET list
├── [id].get.ts       # GET single
├── index.post.ts     # POST create
├── [id].put.ts       # PUT update
└── [id].delete.ts    # DELETE
```

### Input Validation (Zod)

**ALWAYS validate query/body with Zod:**

```typescript
import { parseQuery, MySchema } from "../../utils/validation"
const query = parseQuery(event, MySchema)
```

### Response Types

**Always type responses with DTOs:**

```typescript
export default defineEventHandler(async (event): Promise<MyDTO> => { ... })
```

### Error Handling

- **400**: Validation errors (handled by `parseQuery`)
- **404**: Resource not found
- **500**: Internal errors (log details, return generic message)

## 2. Workflows

### Create API Endpoint

1.  **Plan**: Define resource name, methods, and Zod schema.
2.  **Scaffold**: Create files in `server/api/[resource]/`.
3.  **Validate**: Use `parseQuery` or `parseBody` with Zod.
4.  **Type**: Return a DTO from `server/types/api.ts`.
5.  **Cache**: Use `cache.getOrFetch()` for static data.
