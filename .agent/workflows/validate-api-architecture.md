---
description: Audit all API endpoints to ensure they follow established best practices
---

Your goal is to audit the API layer and report compliance with the project's established patterns for validation, query building, caching, and typing.

## When to Use

- Before major releases
- After onboarding new team members who added endpoints
- Periodic architecture reviews
- When debugging inconsistent API behavior

## Audit Checklist

For each endpoint in `server/api/`, check the following:

### 1. Input Validation

| Check               | Pass Criteria                                              |
| ------------------- | ---------------------------------------------------------- |
| Uses `parseQuery()` | Must use Zod validation, not raw `getQuery()`              |
| Schema exists       | Must have a schema in `server/utils/validation/schemas.ts` |
| Types exported      | Schema input type should be exported                       |

**❌ Bad:**

```typescript
const query = getQuery(event)
const limit = Number(query.limit) || 24
```

**✅ Good:**

```typescript
const query = parseQuery(event, AdvertisementQuerySchema)
```

### 2. Response Typing

| Check                 | Pass Criteria                                  |
| --------------------- | ---------------------------------------------- |
| Return type annotated | Function should have `: Promise<ResponseType>` |
| Type defined          | Type exists in `server/types/api.ts`           |
| Type matches response | Returned data matches the declared type        |

**❌ Bad:**

```typescript
export default defineEventHandler(async (event) => {
  return await prisma.items.findMany()
})
```

**✅ Good:**

```typescript
export default defineEventHandler(async (event): Promise<ItemListResponse> => {
  return await prisma.items.findMany()
})
```

### 3. Query Building

| Check                      | Pass Criteria                                        |
| -------------------------- | ---------------------------------------------------- |
| No duplicated filter logic | Uses shared builders from `queryBuilders.ts`         |
| Correct strategy           | Uses aggregation for nested sorts, Prisma for simple |
| Parallel queries           | Count + data queries run in parallel                 |

**❌ Bad:**

```typescript
// Duplicating filter logic that exists in queryBuilders.ts
const where: any = { isActive: true }
if (query.manufacturerId) {
  where.manufacturer = { is: { manufacturerId: query.manufacturerId } }
}
```

**✅ Good:**

```typescript
const filters = normalizeFilterParams(query)
const where = buildPrismaWhere(filters)
```

### 4. Caching

| Check                | Pass Criteria                               |
| -------------------- | ------------------------------------------- |
| Static data cached   | Manufacturers, categories, models use cache |
| User data NOT cached | User-specific endpoints don't cache         |
| TTL appropriate      | Static = 5min, models = 1min                |

**Endpoints that SHOULD cache:**

- `/api/manufacturers`
- `/api/categories`
- `/api/models`

**Endpoints that SHOULD NOT cache:**

- `/api/advertisements/favorites`
- Any endpoint with user-specific data

### 5. Error Handling

| Check                    | Pass Criteria                               |
| ------------------------ | ------------------------------------------- |
| Try/catch wraps DB calls | Prisma calls are wrapped                    |
| Errors logged            | `console.error()` with context              |
| Generic message returned | Don't expose internal errors                |
| Correct status codes     | 400 validation, 404 not found, 500 internal |

**❌ Bad:**

```typescript
const data = await prisma.items.findMany() // No error handling
```

**✅ Good:**

```typescript
try {
  const data = await prisma.items.findMany()
  return data
} catch (error) {
  console.error("Items API Error:", error)
  throw createError({ statusCode: 500, statusMessage: "Internal Server Error" })
}
```

### 6. File Naming

| Check           | Pass Criteria                                  |
| --------------- | ---------------------------------------------- |
| Correct pattern | `index.get.ts`, `[id].get.ts`, `index.post.ts` |
| Resource folder | Grouped under resource name                    |

## Audit Report Template

After auditing, generate a report:

```markdown
## API Architecture Audit Report

**Date:** [DATE]
**Endpoints Audited:** [COUNT]

### Summary

| Category         | Passing | Failing | Compliance |
| ---------------- | ------- | ------- | ---------- |
| Input Validation | X       | Y       | Z%         |
| Response Typing  | X       | Y       | Z%         |
| Query Building   | X       | Y       | Z%         |
| Caching          | X       | Y       | Z%         |
| Error Handling   | X       | Y       | Z%         |
| File Naming      | X       | Y       | Z%         |

### Issues Found

#### Critical (Must Fix)

- [ ] `endpoint.ts` - Missing input validation
- [ ] `endpoint.ts` - No error handling

#### Warnings (Should Fix)

- [ ] `endpoint.ts` - Missing return type annotation
- [ ] `endpoint.ts` - Duplicated query logic

#### Suggestions

- [ ] `endpoint.ts` - Could benefit from caching

### Endpoints Reviewed

| Endpoint            | Validation | Types | Queries | Cache | Errors | Overall |
| ------------------- | ---------- | ----- | ------- | ----- | ------ | ------- |
| /api/advertisements | ✅         | ✅    | ✅      | N/A   | ✅     | ✅      |
| /api/manufacturers  | ✅         | ✅    | ✅      | ✅    | ✅     | ✅      |
```

## Automated Checks

Run these commands as part of the audit:

```bash
# Type checking
npm run typecheck

# Look for raw getQuery usage (should use parseQuery instead)
grep -r "getQuery(event)" server/api/ --include="*.ts"

# Look for missing error handling
grep -rL "catch" server/api/ --include="*.ts"

# Look for missing return types
grep -r "defineEventHandler(async (event) =>" server/api/ --include="*.ts"
```

## Workflow Execution

1. **List all endpoints**: `find server/api -name "*.ts" -type f`
2. **For each endpoint**:
   - Read the file
   - Check against all criteria
   - Record findings
3. **Generate report** with issues and recommendations
4. **Prioritize fixes** by severity

## Quick Fixes

For common issues, offer to apply fixes:

### Missing Validation

```typescript
// Add at top
import { parseQuery, MySchema } from "../../utils/validation"

// Replace getQuery
const query = parseQuery(event, MySchema)
```

### Missing Return Type

```typescript
// Add type annotation
export default defineEventHandler(async (event): Promise<MyResponse> => {
```

### Missing Error Handling

```typescript
// Wrap in try/catch
try {
  // existing code
} catch (error) {
  console.error("API Error:", error)
  throw createError({ statusCode: 500, statusMessage: "Internal Server Error" })
}
```
