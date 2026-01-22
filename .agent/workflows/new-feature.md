---
description: Plan and generate a feature or component with a structured workflow
---

# New Feature Workflow

This workflow combines **consultant-style discovery** with **persistent planning**. It utilizes the **Feature Planner Skill**.

> [!IMPORTANT]
> **Step 0**: Use `view_file` to read `.agent/skills/feature-planner/SKILL.md` for templates.

---

## Phase 1: Discovery (Consultant Mode)

Act as a consultant. Explore the idea before committing to a plan.

1.  **Understand Context**
    - Scan the workspace to understand existing patterns.
    - Ask: "What do you want to build?" (if not already stated).

2.  **Explore the Idea**
    - Ask open-ended questions to understand the problem space.
    - Discuss trade-offs, alternatives, and edge cases.
    - **Leverage Context**: Don't ask obvious questions (e.g., tech stack).

3.  **Propose Options**
    - Present recommendations as A/B/C/D choices.
    - Explain pros/cons for each.
    - Offer a recommended choice based on project patterns.

---

## Phase 2: Plan (Write to Disk)

Once discovery is complete, formalize the plan.

1.  **Create Plan Directory**
    - Create `.agent/plans/[feature-name]/`

2.  **Write Plan Artifacts**
    - `requirements.md` → User requirements and decisions made.
    - `architecture.md` → File structure, data flow, dependencies.
    - `tasks.md` → Implementation checklist with workflow references.

3.  **Present Summary**
    - Show: files to create, workflows to trigger, estimated complexity.
    - Link to the plan files for review.

---

## Phase 3: Approval Gate

**Never execute without explicit approval.**

1.  **Ask for Confirmation**
    - "Plan is ready at `.agent/plans/[feature]/`. Ready to proceed? (yes/no/modify)"

2.  **Handle Modifications**
    - If user wants changes, update plan files and re-present.

3.  **Wait for "Yes"**
    - Do NOT proceed until you receive explicit approval.

---

## Phase 4: Execution

Only after approval, execute the plan.

1.  **Follow `tasks.md`**
    - Trigger workflows in order:
      - `/create-api-endpoint` (if backend)
      - `/create-composable` (if logic)
      - `/scaffold-store` (if global state)
      - `/create-component` (UI)
      - `/write-test` (testing)

2.  **Update `execution-log.md`**
    - Mark each task complete as you go.

3.  **Save to MCP**
    - Use `create_note` for significant architectural decisions.

---

## Example Flow

```
User: "/new-feature"

Agent: "What are you thinking of building?"

User: "Something to let users save their favorite motorcycles"

Agent: "Interesting! Let me explore this with you:

- Should favorites sync across devices, or is local storage enough?
- Do you envision a dedicated favorites page, or just heart icons on cards?
- Any plans for notifications when favorited items change price?

Let's think through the ideal experience first."

User: [discusses ideas]

Agent: "Based on our discussion, here's what I recommend:

**A. Storage**: Supabase (for cross-device sync) ⭐
**B. UI**: Heart icons + dedicated page
**C. Notifications**: Phase 2 — keep scope small for now

Sound good?"

User: "Yes, let's do it"

Agent: [Writes .agent/plans/favorites-system/requirements.md]
       [Writes .agent/plans/favorites-system/architecture.md]
       [Writes .agent/plans/favorites-system/tasks.md]

"Plan is ready. Review at `.agent/plans/favorites-system/`.
Ready to proceed? (yes/no/modify)"

User: "Yes, go ahead"

Agent: [Executes workflows, updates execution-log.md]
```

---

## Resumability

If the conversation ends mid-planning or mid-execution:

- Plans persist in `.agent/plans/[feature]/`
- Resume by saying: "Continue with the favorites-system plan"
