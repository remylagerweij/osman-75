---
description: Generate or update documentation for Vue components with props, events, slots, and usage examples
---

# Generate Component Docs Workflow

This workflow utilizes the **Documentation Skill**.

> [!TIP]
> Refer to `.agent/skills/documentation/SKILL.md` for standard templates and locations.

## Steps

1.  **Identify Component**
    - Locate the target component file (e.g., `app/components/MyComponent.vue`).
    - Check if documentation already exists in `docs/components/`.

2.  **Analyze Source**
    - Extract **Props**: Look for `defineProps` or `withDefaults`.
    - Extract **Events**: Look for `defineEmits`.
    - Extract **Slots**: Look for `<slot>` tags.

3.  **Generate Documentation**
    - Create or update `docs/components/[ComponentName].md`.
    - Use the **Component Template** defined in the Documentation Skill.
    - Ensure all props, events, and slots are documented in tables.

4.  **Validate**
    - Verify that the usage examples provided are valid and match the component's API.
