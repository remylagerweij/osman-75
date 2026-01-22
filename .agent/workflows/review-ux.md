---
description: Review components and pages for UX improvements and design polish
---

# Review UX Workflow

This workflow utilizes the **UX Design Skill** to audit and improve UI/UX.

> [!TIP]
> Use `view_file` to read `.agent/skills/ux-design/SKILL.md` for the full audit checklist.

---

## Phase 1: Scope

1.  **Identify Target**
    - What are we reviewing? (Component, page, flow)
    - _Ask_: "What would you like me to review for UX improvements?"

2.  **Understand Context**
    - View the component/page code.
    - If possible, ask user to share a screenshot or describe current state.

---

## Phase 2: Audit

Review against the **UX Design Skill** dimensions:

### Visual Design

- [ ] Consistent with design system?
- [ ] Clear visual hierarchy?
- [ ] Adequate whitespace?
- [ ] Sufficient contrast?

### Interaction Design

- [ ] Loading states present?
- [ ] Hover/focus feedback?
- [ ] Smooth transitions?
- [ ] Touch-friendly targets?

### User Flow

- [ ] Purpose immediately clear?
- [ ] Minimal friction?
- [ ] Error states handled gracefully?
- [ ] Empty states designed?

---

## Phase 3: Report

Present findings as prioritized improvements:

```markdown
## UX Review: [Component/Page Name]

### 🔴 Critical (Must Fix)

- No loading state — users see blank screen

### 🟡 Important (Should Fix)

- Empty state just shows "No data" — not helpful
- Buttons lack hover feedback

### 🟢 Nice to Have

- Could add subtle card hover animation
- Consider skeleton loaders instead of spinner

### Quick Wins (5 min each)

1. Add `transition: all 0.2s` to buttons
2. Add empty state illustration
```

---

## Phase 4: Implement (Optional)

If user approves, implement improvements:

1.  **Prioritize**: Start with Critical, then Important.
2.  **Small PRs**: One improvement at a time.
3.  **Test**: Verify visually in browser.

---

## Example Flow

```
User: "/review-ux"

Agent: "What would you like me to review?"

User: "The favorites page"

Agent: [Reads app/pages/favorites.vue]

"## UX Review: Favorites Page

### 🔴 Critical
- No loading state while fetching favorites

### 🟡 Important
- Empty state just says 'No favorites' — add a CTA to explore

### 🟢 Nice to Have
- Heart icon could animate when clicked

Want me to implement these improvements?"
```
