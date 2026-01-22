---
name: Documentation
description: Helper for generating and maintaining project documentation
---

# Documentation Skill

This skill consolidates all documentation-related knowledge and workflows. Use this to generate docs for components, composables, stores, and API endpoints.

## 1. Conventions

### Documentation-First Development

- **Before Code**: Check `docs/`, read `implementation_plan.md`.
- **During Code**: Update `task.md`, add inline comments.
- **After Code**: Create/Update docs in `docs/`.

### Doc Locations

- `docs/components/`: Component docs
- `docs/`: Composables and patterns
- `docs/api/`: API references

## 2. Workflows

### Generate Component Docs

**Target**: `docs/components/[ComponentName].md`

1.  **Analyze**: Extract Props, Events, Slots from source.
2.  **Generate**: Use the standard template (Description, Usage, Props table).
3.  **Validate**: Ensure markdown is valid and accurate.

### Generate Composable Docs

**Target**: `docs/[useComposable].md`

1.  **Analyze**: Extract return values, arguments, and side effects.
2.  **Generate**: Document the signature and provide a usage example.

### Generate Store Docs

**Target**: `docs/stores/[storeName].md`

1.  **Analyze**: Extract State, Getters, Actions.
2.  **Generate**: Document the purpose and API of the Pinia store.
