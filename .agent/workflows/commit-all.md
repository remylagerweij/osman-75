---
description: Inspect changes and commit everything with automated test fixes if needed
---

Inspect the current tree and help me commit everything:

1. Run `git status`/`git diff` to review what changed and highlight any risky or subtle differences.
2. Run the `/fix-type-errors` workflow to automatically identify and fix any TypeScript issues.
3. Stage all tracked files with `git add --all` (include deletions).
4. Create a single descriptive commit noting the key updates.
5. If the commit is failing due to test failures, run the `/fix-test-failures` workflow to diagnose and fix them.
6. Push the new commit to the current branch (after hooks pass and you confirm).

List the inspection findings and the commit summary before pushing so I can verify them.
