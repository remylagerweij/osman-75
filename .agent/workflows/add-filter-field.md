---
description: Add a new filterable field to the advertisements API with all required updates
---

Your goal is to add a new filter field to the advertisements listing API. This requires updates to multiple files to maintain consistency.

## When to Use

- Adding a new filter option to `/api/advertisements`
- Extending the search/filter functionality
- Adding URL-synced filter parameters

## Files That Need Updates

| File                                     | What to Add                         |
| ---------------------------------------- | ----------------------------------- |
| `server/utils/validation/schemas.ts`     | Zod schema field                    |
| `server/utils/queryBuilders.ts`          | Filter params type + query builders |
| `server/api/advertisements/index.get.ts` | (Usually no changes needed)         |
| `app/stores/filters.ts`                  | Pinia store state (if UI needed)    |
| `app/composables/useFilterUrlSync.ts`    | URL sync key (if UI needed)         |
| `app/components/filters/`                | UI component (if needed)            |

## Workflow Steps

### 1. Understand the Filter

Gather requirements:

- **Field name**: What should the filter be called? (e.g., `condition`, `color`)
- **Data type**: Number, string, boolean, array?
- **Source field**: What Prisma/MongoDB field does it filter?
- **Comparison**: Equals, range (min/max), contains, in array?

### 2. Add Zod Schema Field

In `server/utils/validation/schemas.ts`, add to `AdvertisementFiltersSchema`:

```typescript
export const AdvertisementFiltersSchema = z.object({
  // Existing filters...

  // For single value:
  newField: positiveInt, // or z.string().optional()

  // For range (min/max):
  minNewField: positiveInt,
  maxNewField: positiveInt,

  // For array of values:
  newFieldIds: numberArray,
})
```

**Transformer reference:**

```typescript
positiveInt // String → positive integer | undefined
numberArray // String/Array → number[] | undefined
booleanFromString // "true"/"false" → boolean
z.string().optional() // Plain optional string
z.enum(["a", "b"]).optional() // Specific values
```

### 3. Update Filter Params Type

In `server/utils/queryBuilders.ts`, add to `AdvertisementFilterParams`:

```typescript
export interface AdvertisementFilterParams {
  // Existing...
  newField?: number
  // OR for range:
  minNewField?: number
  maxNewField?: number
  // OR for array:
  newFieldIds?: number[]
}
```

### 4. Update normalizeFilterParams

In `server/utils/queryBuilders.ts`, add to `normalizeFilterParams()`:

```typescript
export function normalizeFilterParams(query: AdvertisementQueryInput): AdvertisementFilterParams {
  // Existing logic...

  return {
    // Existing...
    newField: query.newField,
    // OR
    minNewField: query.minNewField,
    maxNewField: query.maxNewField,
  }
}
```

### 5. Update Prisma Where Builder

In `server/utils/queryBuilders.ts`, add to `buildPrismaWhere()`:

```typescript
export function buildPrismaWhere(filters: AdvertisementFilterParams): Record<string, unknown> {
  const where: Record<string, unknown> = { isActive: true }

  // Existing filters...

  // For direct field:
  if (filters.newField !== undefined) {
    where.newField = filters.newField
  }

  // For range on direct field:
  if (filters.minNewField !== undefined || filters.maxNewField !== undefined) {
    where.newField = {}
    if (filters.minNewField !== undefined) {
      where.newField.gte = filters.minNewField
    }
    if (filters.maxNewField !== undefined) {
      where.newField.lte = filters.maxNewField
    }
  }

  // For nested field (in rawAdvertisementInfo):
  if (filters.newField !== undefined) {
    where.rawAdvertisementInfo = {
      is: { NewField: filters.newField },
    }
  }

  return where
}
```

### 6. Update MongoDB Match Builder

In `server/utils/queryBuilders.ts`, add to `buildMongoMatchFilter()`:

```typescript
export function buildMongoMatchFilter(filters: AdvertisementFilterParams): MongoMatchFilter {
  const match: MongoMatchFilter = { isActive: true }

  // Existing filters...

  // For direct field:
  if (filters.newField !== undefined) {
    match.newField = filters.newField
  }

  // For range:
  if (filters.minNewField !== undefined || filters.maxNewField !== undefined) {
    match.newField = {}
    if (filters.minNewField !== undefined) {
      match.newField.$gte = filters.minNewField
    }
    if (filters.maxNewField !== undefined) {
      match.newField.$lte = filters.maxNewField
    }
  }

  // For nested field:
  if (filters.newField !== undefined) {
    match["rawAdvertisementInfo.NewField"] = filters.newField
  }

  return match
}
```

### 7. Add UI (Optional)

If the filter needs a frontend UI:

**a) Add to Pinia store** (`app/stores/filters.ts`):

```typescript
export const useFiltersStore = defineStore("filters", {
  state: () => ({
    // Existing...
    newField: null as number | null,
  }),
})
```

**b) Add to URL sync** (`app/composables/useFilterUrlSync.ts`):

```typescript
const FILTER_KEYS = [
  // Existing...
  "newField",
] as const
```

**c) Create filter component** (`app/components/filters/NewFieldFilter.vue`):

```vue
<script setup lang="ts">
const filtersStore = useFiltersStore()
// Component logic
</script>
```

### 8. Test the Filter

```bash
# Test API directly
curl "http://localhost:3000/api/advertisements?newField=123"

# Run type check
npm run typecheck

# Run tests
npm run test:component
npm run test:e2e
```

## Common Filter Patterns

### Range Filter (min/max)

```typescript
// Schema
minYear: positiveInt,
maxYear: positiveInt,

// Prisma where
if (filters.minYear || filters.maxYear) {
  where["rawAdvertisementInfo.Bouwjaar"] = {}
  if (filters.minYear) where["rawAdvertisementInfo.Bouwjaar"].gte = filters.minYear
  if (filters.maxYear) where["rawAdvertisementInfo.Bouwjaar"].lte = filters.maxYear
}
```

### Array Filter (multiple IDs)

```typescript
// Schema
manufacturerIds: numberArray,

// Prisma where
if (filters.manufacturerIds?.length) {
  where.manufacturer = { is: { manufacturerId: { in: filters.manufacturerIds } } }
}

// MongoDB match
if (filters.manufacturerIds?.length) {
  match["manufacturer.manufacturerId"] = { $in: filters.manufacturerIds }
}
```

### Boolean Filter

```typescript
// Schema
hasMedia: booleanFromString,

// Prisma where
if (filters.hasMedia) {
  where.images = { isEmpty: false }
}
```

### Nested Field Filter

```typescript
// For fields inside rawAdvertisementInfo
// Schema
condition: z.string().optional(),

// Prisma where
if (filters.condition) {
  where.rawAdvertisementInfo = { is: { Conditie: filters.condition } }
}

// MongoDB match
if (filters.condition) {
  match["rawAdvertisementInfo.Conditie"] = filters.condition
}
```

## Checklist

- [ ] Add Zod schema field in `schemas.ts`
- [ ] Add to `AdvertisementFilterParams` interface
- [ ] Update `normalizeFilterParams()` function
- [ ] Update `buildPrismaWhere()` function
- [ ] Update `buildMongoMatchFilter()` function
- [ ] (Optional) Add to Pinia filters store
- [ ] (Optional) Add to URL sync keys
- [ ] (Optional) Create filter UI component
- [ ] Run `npm run typecheck`
- [ ] Test filter via API call
- [ ] Run tests
