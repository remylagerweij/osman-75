---
description: Iteratively fix TypeScript errors by running typecheck and addressing issues
---

1. Run `npm run typecheck` to identify current TypeScript errors.
2. If the command exits successfully (code 0), the workflow is complete.
3. If errors are found, analyze the output to understand the type mismatches, missing properties, or other issues.
4. Apply necessary code changes to fix the identified errors.
5. Repeat from step 1 until `npm run typecheck` passes.
