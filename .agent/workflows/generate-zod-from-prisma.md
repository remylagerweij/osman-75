---
description: Generate or update Zod validation schemas based on Prisma schema types
---

Your goal is to derive Zod validation schemas from Prisma model definitions to ensure input validation stays in sync with database types.

## When to Use

- After modifying `prisma/schema.prisma`
- When creating new API endpoints that need validation
- When validation errors indicate schema drift
- As part of database migration workflow

## Understanding the Relationship

```
prisma/schema.prisma              → Database model definitions
server/utils/validation/schemas.ts → API input validation (Zod)
```

**Key insight:** Prisma defines what CAN be stored, Zod defines what SHOULD be accepted.

Zod schemas are typically a **subset** of Prisma types because:

- We validate query params (strings that become numbers)
- We validate user input (may have stricter rules)
- We don't expose all database fields to the API

## Workflow Steps

### 1. Identify Prisma Types to Map

Read `prisma/schema.prisma` and identify types that need validation:

**Primary models:**

- `rawAdvertisements` → Query filters for advertisements
- `vehicleRegistrations` → Registration lookup params
- `models` → Model search params
- `organizations` → Organization query params

**Embedded types:**

- `RawAdvertisementsRawAdvertisementInfo` → Year, mileage, etc.
- `RawAdvertisementsManufacturer` → Manufacturer ID
- `RawAdvertisementsModel` → Model ID
- `RawAdvertisementsCategory` → Category ID

### 2. Type Mapping Reference

| Prisma Type               | Zod Transformer                | Use Case                     |
| ------------------------- | ------------------------------ | ---------------------------- |
| `Int`                     | `z.coerce.number()`            | Direct number param          |
| `Int?`                    | `z.coerce.number().optional()` | Optional number              |
| `Int` (from query string) | `positiveInt` helper           | Query params (string→number) |
| `String`                  | `z.string()`                   | Text fields                  |
| `String?`                 | `z.string().optional()`        | Optional text                |
| `Boolean`                 | `z.coerce.boolean()`           | Direct boolean               |
| `Boolean` (from query)    | `booleanFromString`            | Query params ("true"→true)   |
| `DateTime`                | `z.coerce.date()`              | Date params                  |
| `String[]`                | `z.array(z.string())`          | Array of strings             |
| `Int[]`                   | `numberArray` helper           | Array from query string      |
| `enum`                    | `z.enum([...])`                | Specific values              |
| Embedded type             | Nested `z.object()`            | Complex structures           |

### 3. Common Zod Helpers

The project uses reusable transformers in `schemas.ts`:

```typescript
/** String → positive integer | undefined */
const positiveInt = z
  .string()
  .or(z.number())
  .transform((val) => {
    const num = Number(val)
    return isNaN(num) || num < 0 ? undefined : Math.floor(num)
  })
  .optional()

/** String/Array → number[] | undefined */
const numberArray = z
  .union([z.string(), z.array(z.string()), z.number(), z.array(z.number())])
  .transform((val) => {
    if (!val) return undefined
    const arr = Array.isArray(val) ? val : [val]
    const nums = arr.map(Number).filter((n) => !isNaN(n))
    return nums.length > 0 ? nums : undefined
  })
  .optional()

/** "true"/"false" → boolean */
const booleanFromString = z
  .string()
  .or(z.boolean())
  .transform((val) => val === true || val === "true")
  .optional()
```

### 4. Generate Schema from Prisma Model

**Example: Creating a schema for a new filterable field**

Prisma:

```prisma
model rawAdvertisements {
  advertiserType String?  // "dealer" | "private"
  price         Int?
  // ...
}
```

Zod:

```typescript
export const NewFieldSchema = z.object({
  advertiserType: z.enum(["dealer", "private"]).optional(),
  minPrice: positiveInt,
  maxPrice: positiveInt,
})
```

### 5. Composing Schemas

Use `.merge()` and `.extend()` to build complex schemas:

```typescript
// Base schemas
export const PaginationSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(24),
  skip: z.coerce.number().min(0).default(0),
})

export const SortingSchema = z.object({
  sortBy: z.enum(["price", "year", "mileage", "insertDate"]).default("insertDate"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

// Composed schema
export const AdvertisementQuerySchema = PaginationSchema.merge(SortingSchema).merge(AdvertisementFiltersSchema)
```

### 6. Export Types

Always export inferred types for use in query builders:

```typescript
export type AdvertisementQueryInput = z.infer<typeof AdvertisementQuerySchema>
export type PricewatchQueryInput = z.infer<typeof PricewatchQuerySchema>
```

### 7. Re-export from Index

Update `server/utils/validation/index.ts`:

```typescript
export * from "./schemas"
```

## Prisma → Zod Examples

### Filtering by Nested Field

Prisma:

```prisma
type RawAdvertisementsRawAdvertisementInfo {
  Bouwjaar       Int?      // Year
  Kilometerstand Int?      // Mileage
  Kenteken       String?   // License plate
}
```

Zod:

```typescript
export const AdvertisementFiltersSchema = z.object({
  minYear: positiveInt,
  maxYear: positiveInt,
  minMileage: positiveInt,
  maxMileage: positiveInt,
  licensePlate: z.string().optional(),
})
```

### Filtering by Related Model

Prisma:

```prisma
type RawAdvertisementsManufacturer {
  manufacturer    String
  manufacturerId  Int
}
```

Zod:

```typescript
// Support both singular and array for flexibility
manufacturerId: positiveInt,
manufacturerIds: numberArray,
```

### Enum Validation

Prisma:

```prisma
model rawAdvertisements {
  advertiserType String?  // Known to be "dealer" or "private"
}
```

Zod:

```typescript
advertiserType: z.enum(["dealer", "private"]).optional(),
```

### Date Range Validation

Prisma:

```prisma
model rawAdvertisements {
  insertDate DateTime @db.Date
}
```

Zod:

```typescript
fromDate: z.coerce.date().optional(),
toDate: z.coerce.date().optional(),
```

## Validation for Different Contexts

### Query Parameters (GET)

Use string-to-type transformers since query params are always strings:

```typescript
limit: z.string().transform(Number).pipe(z.number().min(1).max(100))
// OR use helper:
limit: positiveInt
```

### Request Body (POST/PUT)

Use direct type coercion:

```typescript
z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  isActive: z.boolean(),
})
```

## Checklist

- [ ] Read relevant Prisma types from `schema.prisma`
- [ ] Identify which fields need validation
- [ ] Choose appropriate Zod transformers
- [ ] Add validation rules (min, max, enum values)
- [ ] Create schema in `schemas.ts`
- [ ] Export inferred TypeScript type
- [ ] Re-export from `index.ts` if needed
- [ ] Use schema with `parseQuery()` in endpoint
- [ ] Test with valid and invalid inputs
- [ ] Run `npm run typecheck`
