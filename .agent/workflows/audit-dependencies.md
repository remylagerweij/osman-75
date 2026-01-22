---
description: Check for outdated, deprecated, or vulnerable npm dependencies
---

Your goal is to audit npm dependencies for security vulnerabilities, outdated versions, and deprecation warnings.

## When to Use

- Weekly maintenance checks
- Before releases
- After security advisories
- As part of `pre-release-audit` or `weekly-maintenance`

## Workflow Steps

### 1. Security Audit

```bash
# Run npm's built-in security audit
npm audit

# Get JSON output for parsing
npm audit --json > /tmp/audit.json

# Check severity summary
npm audit 2>&1 | grep -E "vulnerabilities|packages"
```

**Severity levels:**

- **Critical:** Actively exploited, fix immediately
- **High:** Serious vulnerability, fix this week
- **Moderate:** Should fix soon
- **Low:** Fix when convenient

### 2. Check for Outdated Packages

```bash
# List all outdated packages
npm outdated

# Get detailed JSON
npm outdated --json > /tmp/outdated.json
```

**Output columns:**

- **Current:** What you have installed
- **Wanted:** Latest that satisfies semver in package.json
- **Latest:** Absolute latest version

### 3. Check for Deprecated Packages

```bash
# Find deprecated packages (shows warnings during install)
npm install 2>&1 | grep -i "deprecated\|WARN deprecated"

# Or check individual packages
npm view <package-name> deprecated
```

### 4. Categorize Updates

| Category                  | Risk       | Action                |
| ------------------------- | ---------- | --------------------- |
| **Patch** (1.0.0 → 1.0.1) | Low        | Auto-update           |
| **Minor** (1.0.0 → 1.1.0) | Low-Medium | Review changelog      |
| **Major** (1.0.0 → 2.0.0) | High       | Full testing required |
| **Deprecated**            | Medium     | Find replacement      |
| **Vulnerable**            | Critical   | Immediate action      |

### 5. Safe Update Process

**Patch updates (safe):**

```bash
npm update  # Updates all to latest matching semver
npm run typecheck
npm run test:component
npm run test:e2e
```

**Minor updates:**

```bash
# Update specific package
npm install <package>@latest --save

# Test thoroughly
npm run typecheck && npm run test:component && npm run test:e2e
```

**Major updates:**

```bash
# Create branch for update
git checkout -b deps/update-<package>

# Install new version
npm install <package>@latest --save

# Read migration guide
open https://github.com/<package>/blob/main/CHANGELOG.md

# Update code for breaking changes
# Test everything
npm run typecheck && npm run test:component && npm run test:e2e
```

### 6. Lock File Maintenance

```bash
# Regenerate lock file from scratch (if issues)
rm -rf node_modules package-lock.json
npm install

# Verify no changes to functionality
npm run test:component && npm run test:e2e
```

### 7. License Audit (Optional)

```bash
# Check license compatibility
npx license-checker --summary
npx license-checker --onlyAllow "MIT;ISC;Apache-2.0;BSD-2-Clause;BSD-3-Clause"
```

## Report Template

```markdown
# Dependency Audit Report

**Date:** [DATE]
**Node Version:** [VERSION]
**npm Version:** [VERSION]

## Security Summary

| Severity | Count | Action Required |
| -------- | ----- | --------------- |
| Critical | X     | Immediate       |
| High     | Y     | This week       |
| Moderate | Z     | This month      |
| Low      | W     | Backlog         |

## Vulnerable Packages

### Critical

| Package     | Vulnerability | Fix Version | Notes           |
| ----------- | ------------- | ----------- | --------------- |
| `pkg@1.0.0` | CVE-2024-XXX  | `1.0.1`     | [Advisory](url) |

## Outdated Packages

### Major Updates Available

| Package | Current | Latest | Breaking Changes |
| ------- | ------- | ------ | ---------------- |
| `vue`   | 3.3.0   | 3.4.0  | [Changelog](url) |

### Minor/Patch Updates

| Package | Current | Latest | Auto-update? |
| ------- | ------- | ------ | ------------ |
| `pkg`   | 1.0.0   | 1.1.2  | ✅ Yes       |

## Deprecated Packages

| Package   | Replacement | Migration Effort |
| --------- | ----------- | ---------------- |
| `old-pkg` | `new-pkg`   | Low              |

## Recommendations

### Immediate (Security)

1. Update `vulnerable-pkg` to fix CVE-XXX

### This Sprint

1. Update major version of X (breaking changes minimal)
2. Replace deprecated Y with Z

### Backlog

1. Consider alternative to unmaintained A
```

## Automated Script

```bash
#!/bin/bash
# audit-dependencies.sh

echo "=== Dependency Audit ==="
echo "Date: $(date)"
echo "Node: $(node -v)"
echo "npm: $(npm -v)"
echo ""

echo "## Security Audit"
npm audit 2>&1 | tail -20
echo ""

echo "## Outdated Packages"
npm outdated
echo ""

echo "## Deprecated Warnings"
npm ls 2>&1 | grep -i deprecated || echo "None found"
echo ""

echo "## Recommendations"
echo "Run 'npm audit fix' for safe security fixes"
echo "Run 'npm update' for semver-compatible updates"
```

## Key Packages to Monitor

For this project, pay special attention to:

| Package          | Why            | Check Frequency   |
| ---------------- | -------------- | ----------------- |
| `vue`            | Core framework | Monthly           |
| `nuxt`           | Meta-framework | Monthly           |
| `@prisma/client` | Database       | Weekly (security) |
| `zod`            | Validation     | Monthly           |
| `tailwindcss`    | Styling        | Monthly           |
| `cypress`        | Testing        | Monthly           |
| `typescript`     | Compiler       | Quarterly         |

## Auto-fix Options

**Safe auto-fixes:**

```bash
# Fix vulnerabilities that don't require breaking changes
npm audit fix

# Update all packages within semver range
npm update

# Use Dependabot/Renovate for automated PRs
```

**Risky fixes (need testing):**

```bash
# Force fix even with breaking changes
npm audit fix --force  # ⚠️ May break things

# Update beyond semver
npm update --latest  # ⚠️ Includes major versions
```

## Checklist

- [ ] Run `npm audit` for security issues
- [ ] Run `npm outdated` for version check
- [ ] Check for deprecated packages
- [ ] Categorize updates by risk
- [ ] Fix critical vulnerabilities immediately
- [ ] Plan major updates with testing
- [ ] Update lock file if needed
- [ ] Run full test suite after updates
- [ ] Generate report
- [ ] Create PRs for updates
