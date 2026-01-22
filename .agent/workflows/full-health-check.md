---
description: Comprehensive project health audit combining all specialist workflows for a complete assessment
---

Your goal is to run a comprehensive health check across all aspects of the project.

## When to Use

- Monthly maintenance
- Before major milestones
- After significant refactors
- New team member onboarding

## Orchestrated Workflows

This workflow combines:

1. **Documentation** → `generate-all-docs`
2. **Code Quality** → `find-dead-code`, `cleanup-imports`, `validate-component-patterns`
3. **Dependencies** → `audit-dependencies`
4. **Performance** → `analyze-bundle-size`
5. **Accessibility** → `check-accessibility`
6. **Testing** → `find-untested-code`, `validate-test-patterns`
7. **Architecture** → `validate-api-architecture`
8. **Technical Debt** → `track-tech-debt`

## Execution Order

Run in this order for best results:

```
1. track-tech-debt        (baseline understanding)
2. audit-dependencies     (security/updates)
3. find-dead-code         (cleanup prep)
4. cleanup-imports        (quick cleanup)
5. validate-component-patterns (architecture)
6. validate-api-architecture   (API health)
7. find-untested-code     (coverage gaps)
8. validate-test-patterns (test quality)
9. analyze-bundle-size    (performance)
10. check-accessibility    (a11y compliance)
11. generate-all-docs      (update docs)
```

## Workflow Steps

### Phase 1: Baseline Assessment (30 min)

**1.1 Technical Debt Scan**

```
→ Run: /track-tech-debt workflow
```

Captures: TODO/FIXME/HACK counts, type bypasses

**1.2 Dependency Audit**

```
→ Run: /audit-dependencies workflow
```

Captures: Security vulnerabilities, outdated packages

### Phase 2: Code Quality (45 min)

**2.1 Dead Code Detection**

```
→ Run: /find-dead-code workflow
```

Captures: Unused exports, components, functions

**2.2 Import Cleanup**

```
→ Run: /cleanup-imports workflow
```

Captures: Unused imports, type violations

**2.3 Component Patterns**

```
→ Run: /validate-component-patterns workflow
```

Captures: Pattern compliance, naming issues

**2.4 API Architecture**

```
→ Run: /validate-api-architecture workflow
```

Captures: Endpoint compliance, missing patterns

### Phase 3: Testing Health (30 min)

**3.1 Coverage Gaps**

```
→ Run: /find-untested-code workflow
```

Captures: Untested components/composables

**3.2 Test Quality**

```
→ Run: /validate-test-patterns workflow
```

Captures: Pattern violations, anti-patterns

### Phase 4: Performance & A11y (30 min)

**4.1 Bundle Analysis**

```
→ Run: /analyze-bundle-size workflow
```

Captures: Bundle size, large dependencies

**4.2 Accessibility Audit**

```
→ Run: /check-accessibility workflow
```

Captures: WCAG violations, keyboard issues

### Phase 5: Documentation (15 min)

**5.1 Update All Docs**

```
→ Run: /generate-all-docs workflow
```

Captures: Stale docs, missing documentation

## Health Report Template

```markdown
# Project Health Report

**Date:** [DATE]
**Version:** [VERSION]
**Auditor:** [NAME/AGENT]

## Executive Summary

| Area          | Score     | Status   | Trend |
| ------------- | --------- | -------- | ----- |
| Security      | A/B/C/D/F | ✅/⚠️/❌ | ↑/→/↓ |
| Code Quality  | A/B/C/D/F | ✅/⚠️/❌ | ↑/→/↓ |
| Testing       | A/B/C/D/F | ✅/⚠️/❌ | ↑/→/↓ |
| Performance   | A/B/C/D/F | ✅/⚠️/❌ | ↑/→/↓ |
| Accessibility | A/B/C/D/F | ✅/⚠️/❌ | ↑/→/↓ |
| Documentation | A/B/C/D/F | ✅/⚠️/❌ | ↑/→/↓ |
| **Overall**   | A/B/C/D/F | ✅/⚠️/❌ | ↑/→/↓ |

## Scoring Criteria

- **A (90-100%)**: Excellent, minor improvements only
- **B (80-89%)**: Good, some issues to address
- **C (70-79%)**: Fair, significant work needed
- **D (60-69%)**: Poor, critical issues present
- **F (<60%)**: Failing, immediate action required

---

## 1. Security Assessment

**Score:** [X]
**Vulnerabilities:** X critical, Y high, Z medium

### Critical Findings

- [Finding 1]
- [Finding 2]

### Action Items

- [ ] Fix CVE-XXX in package Y (Critical)
- [ ] Update deprecated package Z (High)

---

## 2. Code Quality Assessment

**Score:** [X]
**Technical Debt Items:** [COUNT]

### Summary

| Metric             | Value |
| ------------------ | ----- |
| Dead code files    | X     |
| Unused imports     | Y     |
| Pattern violations | Z     |
| TODO/FIXME         | W     |

### Top Issues

1. [Issue 1]
2. [Issue 2]

### Action Items

- [ ] Remove X dead files
- [ ] Fix pattern violations in Y

---

## 3. Testing Assessment

**Score:** [X]
**Coverage:** [X]%

### Summary

| Category    | Tested | Total | Coverage |
| ----------- | ------ | ----- | -------- |
| Components  | X      | Y     | Z%       |
| Composables | X      | Y     | Z%       |

### Action Items

- [ ] Add tests for untested components
- [ ] Fix test anti-patterns

---

## 4. Performance Assessment

**Score:** [X]
**Bundle Size:** [X] KB

### Summary

| Metric        | Value | Target |
| ------------- | ----- | ------ |
| Total JS      | X KB  | <500KB |
| Largest chunk | Y KB  | <200KB |

### Action Items

- [ ] Optimize large dependency X
- [ ] Implement code splitting for Y

---

## 5. Accessibility Assessment

**Score:** [X]
**WCAG Issues:** X critical, Y serious

### Top Issues

1. [Issue 1]
2. [Issue 2]

### Action Items

- [ ] Fix keyboard navigation in X
- [ ] Add aria labels to Y

---

## 6. Documentation Assessment

**Score:** [X]
**Stale Docs:** [COUNT]

### Action Items

- [ ] Update component docs
- [ ] Add missing composable docs

---

## Prioritized Action Plan

### This Week (Critical)

1. [ ] [Action 1]
2. [ ] [Action 2]

### This Sprint (High)

1. [ ] [Action 1]
2. [ ] [Action 2]

### This Quarter (Medium)

1. [ ] [Action 1]
2. [ ] [Action 2]

### Backlog (Low)

1. [ ] [Action 1]

---

## Historical Comparison

| Metric          | Last Check | This Check | Change |
| --------------- | ---------- | ---------- | ------ |
| Security Score  | B          | A          | ↑      |
| Coverage        | 65%        | 72%        | ↑      |
| Bundle Size     | 650KB      | 580KB      | ↓      |
| Tech Debt Items | 45         | 38         | ↓      |

---

## Next Steps

1. Schedule follow-up for critical items
2. Create tickets for action items
3. Schedule next health check: [DATE]
```

## Automated Execution

```bash
#!/bin/bash
# full-health-check.sh

echo "=========================================="
echo "FULL PROJECT HEALTH CHECK"
echo "Date: $(date)"
echo "=========================================="

echo ""
echo "Phase 1: Baseline Assessment"
echo "----------------------------"

echo "1.1 Technical Debt Scan..."
# Run track-tech-debt commands
grep -rn "TODO\|FIXME\|HACK" app/ server/ --include="*.ts" --include="*.vue" | wc -l

echo "1.2 Dependency Audit..."
npm audit 2>&1 | tail -5

echo ""
echo "Phase 2: Code Quality"
echo "--------------------"

echo "2.1 Dead Code Detection..."
# Run find-dead-code commands

echo "2.2 Import Cleanup..."
npm run typecheck 2>&1 | grep "never read" | wc -l

echo ""
echo "Phase 3: Testing"
echo "----------------"

echo "3.1 Coverage Analysis..."
find app/components -name "*.cy.ts" | wc -l
find app/components -name "*.vue" | wc -l

echo ""
echo "Phase 4: Performance & A11y"
echo "---------------------------"

echo "4.1 Bundle Size..."
npm run build 2>&1 | tail -3

echo ""
echo "=========================================="
echo "HEALTH CHECK COMPLETE"
echo "See individual workflow reports for details"
echo "=========================================="
```

## Checklist

- [ ] **Phase 1: Baseline**
  - [ ] Run technical debt scan
  - [ ] Run dependency audit
- [ ] **Phase 2: Code Quality**
  - [ ] Run dead code detection
  - [ ] Run import cleanup
  - [ ] Validate component patterns
  - [ ] Validate API architecture

- [ ] **Phase 3: Testing**
  - [ ] Find untested code
  - [ ] Validate test patterns

- [ ] **Phase 4: Performance & A11y**
  - [ ] Analyze bundle size
  - [ ] Check accessibility

- [ ] **Phase 5: Documentation**
  - [ ] Generate/update all docs

- [ ] **Finalize**
  - [ ] Compile health report
  - [ ] Calculate scores
  - [ ] Create action items
  - [ ] Schedule next check
