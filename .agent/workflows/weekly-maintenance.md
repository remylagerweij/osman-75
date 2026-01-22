---
description: Regular maintenance workflow for weekly/periodic health checks and cleanup
---

Your goal is to perform routine maintenance to keep the project healthy.

## When to Use

- Weekly scheduled maintenance
- After quiet periods
- Before starting new sprints

## Workflow Overview

This is a lighter version of `full-health-check`, focused on routine tasks.

```
Weekly Maintenance Cycle:

Monday:
  └── Dependency check
  └── Security scan

Wednesday:
  └── Tech debt review
  └── Dead code scan

Friday:
  └── Test suite health
  └── Documentation sync
```

## Workflow Steps

### 1. Dependency Health (10 min)

**1.1 Security Check**

```bash
npm audit
```

- [ ] No critical vulnerabilities
- [ ] No high vulnerabilities older than 1 week

**1.2 Outdated Packages**

```bash
npm outdated
```

- [ ] Note packages with security updates
- [ ] Plan major updates for next sprint

**1.3 Quick Update (if safe)**

```bash
# Update patch versions only
npm update

# Run quick test
npm run typecheck
npm run test:component -- --spec "**/*.cy.ts" --headless
```

### 2. Tech Debt Review (10 min)

**2.1 Scan for New Debt**

```bash
# Count current debt
grep -rn "TODO\|FIXME\|HACK" app/ server/ --include="*.ts" --include="*.vue" | wc -l
```

**2.2 Check Oldest Items**

```bash
# Find oldest TODOs (by git blame)
grep -rn "TODO" app/ --include="*.ts" -l | head -5 | xargs -I {} git log -1 --format="%ai %s" -- {}
```

**2.3 Update Debt Tracker**

- [ ] Note any new items
- [ ] Check if any were resolved
- [ ] Update tracking doc/issues

### 3. Code Quality Check (10 min)

**3.1 Type Errors**

```bash
npm run typecheck 2>&1 | tail -20
```

- [ ] No new type errors

**3.2 Lint Check**

```bash
npx eslint app/ server/ --max-warnings 10 2>&1 | tail -20
```

- [ ] No new lint errors

**3.3 Unused Code Quick Scan**

```bash
# Check for unused imports
npm run typecheck 2>&1 | grep "never read" | wc -l
```

### 4. Test Suite Health (10 min)

**4.1 Run Test Suite**

```bash
npm run test:component
```

- [ ] All tests pass
- [ ] No new skipped tests

**4.2 Check for Flaky Tests**

```bash
# Run twice, compare results
npm run test:component 2>&1 | grep -E "passing|failing"
```

**4.3 Test Count Trend**

```bash
# Count tests
find app -name "*.cy.ts" | wc -l
```

- [ ] Test count not decreasing

### 5. Documentation Sync (10 min)

**5.1 Check for Stale Docs**

- [ ] Review recent code changes
- [ ] Identify affected docs

**5.2 Quick Doc Updates**

- [ ] Update any obviously stale sections
- [ ] Add notes for major updates needed

**5.3 Check Instructions File**

```bash
# Verify instructions are current
head -50 .github/copilot-instructions.md
```

### 6. Git Hygiene (5 min)

**6.1 Clean Merged Branches**

```bash
# List merged branches
git branch --merged main | grep -v main

# Clean up local
git branch --merged main | grep -v main | xargs git branch -d
```

**6.2 Check for Large Files**

```bash
# Find large files added recently
git log --since="1 week ago" --name-only --pretty=format: | sort | uniq | xargs du -h 2>/dev/null | sort -hr | head -10
```

**6.3 Review Open PRs**

- [ ] Check for stale PRs
- [ ] Check for merge conflicts

## Weekly Report Template

```markdown
# Weekly Maintenance Report

**Week:** [YYYY-WW]
**Date:** [DATE]

## Summary

| Area         | Status   | Action Needed |
| ------------ | -------- | ------------- |
| Security     | ✅/⚠️/❌ | [action]      |
| Dependencies | ✅/⚠️/❌ | [action]      |
| Tests        | ✅/⚠️/❌ | [action]      |
| Tech Debt    | ✅/⚠️/❌ | [action]      |
| Docs         | ✅/⚠️/❌ | [action]      |

## Security

- Vulnerabilities: X critical, Y high
- Action: [None / Update X]

## Dependencies

- Outdated: X packages
- Updated: [list]
- Planned: [list for next week]

## Tests

- Total: X tests
- Passing: Y
- Skipped: Z
- New this week: W

## Tech Debt

- Total items: X
- New this week: Y
- Resolved: Z
- Oldest item age: W days

## Documentation

- Updated: [list]
- Needs update: [list]

## Git

- Branches cleaned: X
- Open PRs: Y

## Action Items for Next Week

1. [ ] Item 1
2. [ ] Item 2
3. [ ] Item 3
```

## Automated Script

```bash
#!/bin/bash
# weekly-maintenance.sh

echo "=========================================="
echo "WEEKLY MAINTENANCE"
echo "Week: $(date +%Y-%W)"
echo "Date: $(date)"
echo "=========================================="

echo ""
echo "1. Dependency Health"
echo "--------------------"
npm audit 2>&1 | tail -5
npm outdated 2>&1 | head -10

echo ""
echo "2. Tech Debt"
echo "------------"
echo "TODO: $(grep -rn "TODO" app/ server/ --include="*.ts" --include="*.vue" 2>/dev/null | wc -l | tr -d ' ')"
echo "FIXME: $(grep -rn "FIXME" app/ server/ --include="*.ts" --include="*.vue" 2>/dev/null | wc -l | tr -d ' ')"
echo "HACK: $(grep -rn "HACK" app/ server/ --include="*.ts" --include="*.vue" 2>/dev/null | wc -l | tr -d ' ')"

echo ""
echo "3. Code Quality"
echo "---------------"
npm run typecheck 2>&1 | tail -3

echo ""
echo "4. Test Suite"
echo "-------------"
echo "Test files: $(find app -name "*.cy.ts" | wc -l | tr -d ' ')"
npm run test:component 2>&1 | tail -5

echo ""
echo "5. Git Status"
echo "-------------"
echo "Merged branches: $(git branch --merged main | grep -v main | wc -l | tr -d ' ')"

echo ""
echo "=========================================="
echo "MAINTENANCE COMPLETE"
echo "=========================================="
```

## Quick Fix Commands

**Fix unused imports:**

```bash
npm run typecheck 2>&1 | grep "never read" | head -10
# Then manually fix each file
```

**Update safe dependencies:**

```bash
npm update
npm run typecheck && npm run test:component
```

**Clean up branches:**

```bash
git branch --merged main | grep -v main | xargs git branch -d
```

## Checklist

- [ ] **Dependencies**
  - [ ] Run security audit
  - [ ] Check outdated packages
  - [ ] Apply safe updates

- [ ] **Tech Debt**
  - [ ] Scan for TODO/FIXME
  - [ ] Check for new debt
  - [ ] Update tracker

- [ ] **Code Quality**
  - [ ] TypeScript check
  - [ ] Lint check
  - [ ] Unused code scan

- [ ] **Testing**
  - [ ] Run test suite
  - [ ] Check for flaky tests
  - [ ] Verify test count

- [ ] **Documentation**
  - [ ] Check for stale docs
  - [ ] Quick updates

- [ ] **Git**
  - [ ] Clean merged branches
  - [ ] Check for large files
  - [ ] Review open PRs

- [ ] **Report**
  - [ ] Generate weekly report
  - [ ] Create action items
  - [ ] Schedule follow-ups
