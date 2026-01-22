---
name: Feature Planner
description: Interactive planning skill that orchestrates feature development with approval gates
---

# Feature Planner Skill

This skill orchestrates the entire feature development lifecycle through interactive planning and approval gates.

## Lifecycle

```
DISCOVER → PLAN → REVIEW → EXECUTE
```

## 1. Discovery Phase

### Interactive Questioning

Ask structured questions with A/B/C/D choices and recommendations:

```markdown
**A. [Topic]**:
A) Option 1
B) Option 2 ⭐ Recommended
C) Option 3

Your choice?
```

### Focus Areas

| Area          | Questions to Ask                               |
| ------------- | ---------------------------------------------- |
| Purpose       | What problem does this solve? Who is the user? |
| Functionality | Inputs, outputs, interactions?                 |
| Data          | Where does data come from? API, store, props?  |
| UI/UX         | Loading states, error handling, responsive?    |
| Integration   | How does it fit with existing features?        |

## 2. Planning Phase

### Plan Directory Structure

```
.agent/plans/[feature-name]/
├── requirements.md    # User requirements and decisions
├── architecture.md    # File structure and data flow
├── tasks.md           # Implementation checklist
└── execution-log.md   # Updated during execution
```

### Requirements Template

```markdown
# [Feature Name] Requirements

## Summary

[One-line description]

## User Stories

- As a [user], I want [goal] so that [benefit]

## Decisions Made

| Question | Choice       | Rationale               |
| -------- | ------------ | ----------------------- |
| Storage  | B (Supabase) | Persists across devices |

## Constraints

- [Any limitations]
```

### Architecture Template

```markdown
# [Feature Name] Architecture

## File Structure

- `app/components/[feature]/...`
- `app/composables/use[Feature].ts`
- `server/api/[feature]/...`

## Data Flow

[Diagram or description]

## Dependencies

- [Existing components/stores to use]
```

### Tasks Template

```markdown
# [Feature Name] Tasks

## Phase 1: Setup

- [ ] Create directory structure
- [ ] Define types

## Phase 2: Backend

- [ ] Create API endpoint → `/create-api-endpoint`
- [ ] Add Zod validation

## Phase 3: Frontend

- [ ] Create composable → `/create-composable`
- [ ] Create component → `/create-component`

## Phase 4: Testing

- [ ] Write component tests → `/write-test`

## Phase 5: Documentation

- [ ] Generate docs → `/generate-component-docs`
```

## 3. Review Phase

### Approval Gate

Present the plan summary and wait for explicit approval:

```markdown
## Plan Summary: [Feature Name]

**Files to create**: 5
**Workflows to trigger**: 4
**Estimated complexity**: Medium

[Link to .agent/plans/feature-name/]

**Ready to proceed?** (yes/no/modify)
```

## 4. Execution Phase

### Workflow Orchestration

Only after approval, trigger workflows in order:

1. `/create-api-endpoint` (if backend needed)
2. `/create-composable` (if state logic needed)
3. `/scaffold-store` (if global state needed)
4. `/create-component` (UI components)
5. `/write-test` (testing)
6. `/generate-component-docs` (documentation)

### Execution Log

Update `execution-log.md` as each step completes:

```markdown
# Execution Log

## 2026-01-20 22:30

- [x] Created API endpoint `server/api/favorites/`
- [x] Created composable `useFavorites.ts`
- [ ] Creating component...
```

## Best Practices

1. **Never skip discovery** - Ask questions even if the user seems certain.
2. **Write plans before code** - The `.agent/plans/` folder is your workspace.
3. **Wait for approval** - Never execute without explicit "yes" or "go".
4. **Update execution log** - Track progress for transparency.
5. **Save decisions to MCP** - Use `create_note` to persist architectural decisions.
