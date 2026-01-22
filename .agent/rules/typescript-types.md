---
trigger: glob
globs: ["app/types/**/*.ts", "server/types/**/*.ts", "**/types.ts", "**/props.ts"]
description: TypeScript type definition conventions
---

# TypeScript Type Conventions

## Type Locations

| Location        | Purpose                           |
| --------------- | --------------------------------- |
| `app/types/`    | Client-side shared types          |
| `server/types/` | API response DTOs                 |
| `**/props.ts`   | Component prop types (co-located) |

## Naming Conventions

```typescript
// Interfaces for objects
interface Advertisement {
  id: string
  title: string
}

// Types for unions/aliases
type SortOrder = "asc" | "desc"
type AdvertisementStatus = "active" | "sold" | "expired"

// DTOs suffix for API responses
interface AdvertisementDTO {
  id: string
  title: string
  createdAt: string // ISO string, not Date
}

// Props suffix for component props
interface ButtonProps {
  variant: "primary" | "secondary"
  disabled?: boolean
}
```

## Component Props

### Co-located Props

For reusable prop types, create `props.ts` beside component:

```typescript
// components/ui/Button.props.ts
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
}

export const buttonPropsDefaults: Partial<ButtonProps> = {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
}
```

```vue
<!-- components/ui/Button.vue -->
<script setup lang="ts">
import type { ButtonProps } from "./Button.props"
import { buttonPropsDefaults } from "./Button.props"

const props = withDefaults(defineProps<ButtonProps>(), buttonPropsDefaults)
</script>
```

### Inline Props

For simple components, inline is fine:

```vue
<script setup lang="ts">
defineProps<{
  title: string
  count?: number
}>()
</script>
```

## API Response Types

All API responses should have typed DTOs:

```typescript
// server/types/api.ts

// Single item
export interface AdvertisementDTO {
  id: string
  manufacturer: string
  model: string
  price: number
  createdAt: string
}

// List response
export interface AdvertisementListResponse {
  data: AdvertisementDTO[]
  total: number
  limit: number
  skip: number
}

// Generic paginated response
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  skip: number
}
```

## Type Exports

Use barrel exports for organization:

```typescript
// app/types/index.ts
export * from "./advertisement"
export * from "./filters"
export * from "./user"

// server/types/index.ts
export * from "./api"
```

## Avoid `any`

```typescript
// ❌ WRONG
const data: any = await fetch("/api/data")

// ✅ CORRECT
interface DataResponse {
  items: Item[]
}
const data: DataResponse = await fetch("/api/data")

// If truly unknown, use `unknown` and narrow
const data: unknown = await externalApi()
if (isDataResponse(data)) {
  // data is now typed
}
```

## Zod Inference

Derive types from Zod schemas:

```typescript
import { z } from "zod"

export const AdvertisementFilterSchema = z.object({
  manufacturer: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
})

// Infer type from schema
export type AdvertisementFilters = z.infer<typeof AdvertisementFilterSchema>
```

## MongoDB ID Handling

MongoDB uses ObjectId, but we expose as string:

```typescript
// In DTOs, always use string for IDs
export interface AdvertisementDTO {
  id: string // Transformed from MongoDB _id
}

// Transform function
export function transformMongoId<T extends { _id: { $oid: string } }>(doc: T): Omit<T, "_id"> & { id: string } {
  const { _id, ...rest } = doc
  return { ...rest, id: _id.$oid }
}
```
