---
name: Components
description: Helper for creating and refactoring Vue components
---

# Components Skill

This skill manages Vue component creation, refactoring, and validation.

## 1. Conventions

### Structure

- **Script Setup**: Use `<script setup lang="ts">`.
- **Props/Emits**: Use `defineProps` and `defineEmits`.
- **Naming**: PascalCase for component filenames and usage.

### Best Practices

- **Co-located Tests**: Always create a `.cy.ts` test file next to the component.
- **No Barrel Files**: Do not use `index.ts` for export; rely on Nuxt auto-imports.

## 2. Workflows

### Create Component

**Goal**: Scaffold a new Vue component.

1.  **Draft**: Create `app/components/Path/To/Component.vue`.
2.  **Test**: Create `app/components/Path/To/Component.cy.ts`.
3.  **Implement**: Write the component logic and template.
4.  **Verify**: Run the component test to ensure it renders.

### Refactor Component

**Goal**: Extract logic into reusable components.

1.  **Identify**: Find repeated logic or large templates.
2.  **Extract**: Move code to a new component.
3.  **Replace**: Use the new component in the original location.
4.  **Verify**: Ensure no functionality is lost.
