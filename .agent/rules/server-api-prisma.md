---
trigger: glob
globs: ["server/**/*.ts"]
description: Server API and Prisma conventions for Nuxt API routes
---

# Server API & Prisma Conventions

This project uses **Prisma ORM** with **MongoDB**. Follow this layered architecture.

## File Structure

```
server/
├── api/                      # API route handlers
│   ├── [resource]/
│   │   ├── index.get.ts      # GET /api/[resource] (list)
│   │   ├── [id].get.ts       # GET /api/[resource]/:id (single)
│   │   ├── index.post.ts     # POST /api/[resource] (create)
│   │   ├── [id].put.ts       # PUT /api/[resource]/:id (update)
│   │   └── [id].delete.ts    # DELETE /api/[resource]/:id (delete)
├── types/
│   ├── api.ts                # Response DTOs
│   └── index.ts              # Barrel export
└── utils/
    ├── prisma.ts             # Prisma client singleton
    ├── cache.ts              # In-memory TTL cache
    ├── queryBuilders.ts      # Shared query builders
    └── validation/
        ├── schemas.ts        # Zod validation schemas
        └── index.ts          # parseQuery helper
```

## Input Validation (Zod)

**ALWAYS validate query parameters with Zod:**

```typescript
import { parseQuery, AdvertisementQuerySchema } from "../../utils/validation"

export default defineEventHandler(async (event) => {
  // Throws HTTP 400 with detailed error on validation failure
  const query = parseQuery(event, AdvertisementQuerySchema)
})
```

**Schema patterns:**

- Use `PaginationSchema` for `limit`/`skip` (auto-capped at 100)
- Use `SortingSchema` for `sortBy`/`sortOrder`
- Compose with `.merge()` for endpoint-specific needs

## Query Builders

**NEVER duplicate filter logic.** Use shared builders from `server/utils/queryBuilders.ts`:

```typescript
import {
  normalizeFilterParams,
  buildPrismaWhere,
  buildMongoMatchFilter,
  requiresAggregation,
  buildAdvertisementPipeline,
} from "../../utils/queryBuilders"

const filters = normalizeFilterParams(query)

if (requiresAggregation(sortBy)) {
  // MongoDB aggregation for nested field sorting
  const matchFilter = buildMongoMatchFilter(filters)
  const pipeline = buildAdvertisementPipeline(matchFilter, sortField, sortDirection, skip, limit)
  await prisma.$runCommandRaw({ aggregate: "collection", pipeline, cursor: {} })
} else {
  // Standard Prisma for simple sorting
  const where = buildPrismaWhere(filters)
  await prisma.rawAdvertisements.findMany({ where, orderBy, skip, take: limit })
}
```

## Caching

**Cache static/reference data only:**

```typescript
import { cache, CACHE_KEYS, CACHE_TTL } from '../../utils/cache'

export default defineEventHandler(async () => {
  return cache.getOrFetch(CACHE_KEYS.MANUFACTURERS, CACHE_TTL.STATIC_DATA, async () => {
    return prisma.rawAdvertisements.aggregateRaw({ pipeline: [...] })
  })
})
```

**TTL Guidelines:**

- `STATIC_DATA` (5 min): Manufacturers, categories
- `MODELS` (1 min): Model lists
- **Never cache** user-specific data

## Response Types

**Always type responses with DTOs:**

```typescript
import type { AdvertisementListResponse } from "../../types"

export default defineEventHandler(async (event): Promise<AdvertisementListResponse> => {
  // ...
})
```

Use `PaginatedResponse<T>` for lists: `{ data, total, limit, skip }`

## MongoDB vs Prisma Decision

| Use Case                        | Approach                                |
| ------------------------------- | --------------------------------------- |
| Simple CRUD, non-nested sorting | `prisma.model.findMany()`               |
| Sorting by nested fields        | `prisma.$runCommandRaw()` with pipeline |
| Grouping/distinct               | `prisma.model.aggregateRaw()`           |

## Error Handling

```typescript
try {
  // Database operations
} catch (error) {
  console.error("API Error:", error)
  throw createError({ statusCode: 500, statusMessage: "Internal Server Error" })
}
```

- **400**: Validation errors (handled by `parseQuery`)
- **404**: Resource not found
- **500**: Internal errors (log details, return generic message)

## Parallel Queries

```typescript
const [countResult, dataResult] = await Promise.all([
  prisma.$runCommandRaw({ aggregate: "collection", pipeline: countPipeline, cursor: {} }),
  prisma.$runCommandRaw({ aggregate: "collection", pipeline: dataPipeline, cursor: {} }),
])
```
