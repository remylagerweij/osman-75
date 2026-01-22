---
description: Pre-release checklist combining security, quality, and testing audits before deployment
---

Your goal is to ensure the codebase is ready for production release.

## When to Use

- Before any production deployment
- Before major version releases
- After significant feature additions

## Pre-Release Gates

| Gate     | Workflow              | Must Pass           |
| -------- | --------------------- | ------------------- |
| Security | `audit-dependencies`  | ✅ No critical/high |
| Types    | TypeScript check      | ✅ No errors        |
| Lint     | ESLint                | ✅ No errors        |
| Tests    | Cypress               | ✅ All pass         |
| Bundle   | `analyze-bundle-size` | ✅ Under budget     |
| A11y     | `check-accessibility` | ✅ No critical      |

## Workflow Steps

### Phase 1: Security Gate (5 min)

**1.1 Dependency Security**

```bash
npm audit
```

- ❌ **Block** if: Critical or High vulnerabilities
- ⚠️ **Warn** if: Moderate vulnerabilities
- ✅ **Pass** if: Low or no vulnerabilities

**1.2 Secrets Check**

```bash
# Ensure no secrets in code
grep -rn "api_key\|secret\|password" app/ server/ --include="*.ts" --include="*.vue" | grep -v ".example\|test"
```

### Phase 2: Code Quality Gate (10 min)

**2.1 TypeScript Check**

```bash
npm run typecheck
```

- ❌ **Block** if: Any errors
- ✅ **Pass** if: No errors

**2.2 Lint Check**

```bash
npx eslint app/ server/ --max-warnings 0
```

- ❌ **Block** if: Any errors
- ⚠️ **Warn** if: Warnings exceed threshold
- ✅ **Pass** if: Clean

**2.3 Format Check**

```bash
npx prettier --check "app/**/*.{ts,vue}" "server/**/*.ts"
```

- ⚠️ **Warn** if: Unformatted files
- ✅ **Pass** if: All formatted

### Phase 3: Test Gate (15 min)

**3.1 Component Tests**

```bash
npm run test:component
```

- ❌ **Block** if: Any failures
- ✅ **Pass** if: All pass

**3.2 E2E Tests**

```bash
npm run test:e2e
```

- ❌ **Block** if: Any failures
- ✅ **Pass** if: All pass

**3.3 Coverage Check**

```bash
# Verify critical paths are tested
# Check that coverage hasn't decreased
```

### Phase 4: Performance Gate (5 min)

**4.1 Build Check**

```bash
npm run build
```

- ❌ **Block** if: Build fails
- ✅ **Pass** if: Build succeeds

**4.2 Bundle Size**

```bash
# Check bundle is under budget
du -sh .output/public/_nuxt/
```

- ❌ **Block** if: Over budget by >20%
- ⚠️ **Warn** if: Over budget by <20%
- ✅ **Pass** if: Under budget

### Phase 5: Accessibility Gate (10 min)

**5.1 Automated A11y Check**

```bash
# Run on key pages
npx axe http://localhost:3000 --exit
npx axe http://localhost:3000/zoeken --exit
```

- ❌ **Block** if: Critical issues
- ⚠️ **Warn** if: Serious issues
- ✅ **Pass** if: Minor or no issues

### Phase 6: Documentation Gate (5 min)

**6.1 Changelog Updated**

- [ ] CHANGELOG.md has entry for this release
- [ ] Version bumped in package.json

**6.2 API Documentation**

- [ ] Breaking changes documented
- [ ] New endpoints documented

### Phase 7: Final Verification (5 min)

**7.1 Clean Branch**

```bash
git status
# Should be clean, all changes committed
```

**7.2 Up-to-date with Main**

```bash
git fetch origin main
git log HEAD..origin/main --oneline
# Should be empty or merged
```

**7.3 No Merge Conflicts**

```bash
git merge --no-commit --no-ff origin/main
git merge --abort
```

## Release Report Template

```markdown
# Pre-Release Audit Report

**Release Version:** [VERSION]
**Date:** [DATE]
**Auditor:** [NAME/AGENT]

## Gate Summary

| Gate            | Status | Notes      |
| --------------- | ------ | ---------- |
| Security        | ✅/❌  | [notes]    |
| TypeScript      | ✅/❌  | [notes]    |
| Lint            | ✅/❌  | [notes]    |
| Component Tests | ✅/❌  | X/Y passed |
| E2E Tests       | ✅/❌  | X/Y passed |
| Bundle Size     | ✅/❌  | XXX KB     |
| Accessibility   | ✅/❌  | [notes]    |
| Documentation   | ✅/❌  | [notes]    |

## Overall Status: ✅ READY / ❌ NOT READY

---

## Security Details

**npm audit output:**
```

X vulnerabilities (X critical, X high, X moderate, X low)

````

**Action Required:** [None / List items]

---

## Test Results

**Component Tests:**
- Total: X
- Passed: X
- Failed: X
- Skipped: X

**E2E Tests:**
- Total: X
- Passed: X
- Failed: X

**Failed Tests:** [List if any]

---

## Performance Details

**Bundle Size:**
- Total: XXX KB (Budget: YYY KB)
- Main chunk: XXX KB
- Status: ✅ Under budget / ❌ Over budget

---

## Accessibility Details

**Lighthouse Score:** XX/100

**Issues Found:**
- Critical: X
- Serious: X
- Moderate: X
- Minor: X

---

## Changelog Entry

```markdown
## [VERSION] - YYYY-MM-DD

### Added
- Feature X

### Changed
- Updated Y

### Fixed
- Bug Z
````

---

## Sign-off

- [ ] All gates pass
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Ready for deployment

**Approved by:** [NAME]
**Date:** [DATE]

````

## Automated Script

```bash
#!/bin/bash
# pre-release-audit.sh

set -e  # Exit on any failure

echo "=========================================="
echo "PRE-RELEASE AUDIT"
echo "Date: $(date)"
echo "=========================================="

PASS=0
FAIL=0

gate_check() {
  local name=$1
  local cmd=$2
  echo ""
  echo "Gate: $name"
  echo "Command: $cmd"
  if eval "$cmd"; then
    echo "✅ PASS: $name"
    ((PASS++))
  else
    echo "❌ FAIL: $name"
    ((FAIL++))
  fi
}

# Security
gate_check "Security Audit" "npm audit --audit-level=high"

# TypeScript
gate_check "TypeScript" "npm run typecheck"

# Lint (if available)
# gate_check "Lint" "npx eslint app/ server/"

# Tests
gate_check "Component Tests" "npm run test:component"
gate_check "E2E Tests" "npm run test:e2e"

# Build
gate_check "Build" "npm run build"

echo ""
echo "=========================================="
echo "AUDIT COMPLETE"
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo "=========================================="

if [ $FAIL -gt 0 ]; then
  echo "❌ NOT READY FOR RELEASE"
  exit 1
else
  echo "✅ READY FOR RELEASE"
  exit 0
fi
````

## Checklist

- [ ] **Security**
  - [ ] `npm audit` - no critical/high
  - [ ] No secrets in code

- [ ] **Code Quality**
  - [ ] TypeScript passes
  - [ ] ESLint passes
  - [ ] Code formatted

- [ ] **Testing**
  - [ ] Component tests pass
  - [ ] E2E tests pass
  - [ ] Coverage acceptable

- [ ] **Performance**
  - [ ] Build succeeds
  - [ ] Bundle under budget

- [ ] **Accessibility**
  - [ ] Automated checks pass
  - [ ] No critical issues

- [ ] **Documentation**
  - [ ] Changelog updated
  - [ ] Version bumped
  - [ ] Breaking changes documented

- [ ] **Git**
  - [ ] Branch clean
  - [ ] Up-to-date with main
  - [ ] No conflicts

- [ ] **Final Approval**
  - [ ] Generate audit report
  - [ ] Get sign-off
