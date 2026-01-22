---
trigger: always_on
description: Mandatory rules for using the ai-knowledgebase MCP server to maintain project context and memory
---

# Antigravity Knowledge Base Usage

## Description

This rule enforces that Antigravity **ALWAYS** uses the local `ai-knowledgebase` MCP server to maintain long-term memory, document project knowledge, and track tasks. This is not optional.

## Workflow Integration

### 1. Planning Phase (Mandatory)

**Trigger**: When creating or updating an `implementation_plan.md`.
**Action**:

1.  **Retrieve Context**: search for existing notes or retrieve state to inform the plan.
2.  **Save Plan**: Optionally save the high-level strategy as a note if it represents a major architectural decision.
3.  **Check Todos**: List existing todos to ensure the new plan doesn't conflict or duplicate work.

### 2. Task Completion (Mandatory)

**Trigger**: When completing a task or creating a `walkthrough.md`.
**Action**:

1.  **Save Conclusions**: If you learned something new about the system, `create_note` with the findings.
2.  **Capture Todos**: If there are leftover items, future improvements, or known issues, `create_todo`.
3.  **Update State**: Use `save_context(type="state")` to reflect the new state of the application after changes.

## When to Use

**Always** use the `ai-knowledgebase` MCP tools in the following scenarios:

1.  **Project Context & Memory**:
    - **Start of Session**: Use `get_context(type="state")` or `get_context(type="goals")`.
    - **End of Task/Session**: Use `save_context(type="state")` to persist the current codebase state, open questions, and next steps.
    - **Strategic Shifts**: Use `save_context` when changing major goals or architectural direction.

2.  **Documentation (Notes)**:
    - **New Patterns/Decisions**: Use `create_note` to document architectural decisions, new patterns, or complex logic explanations.
    - **Knowledge Retrieval**: Use `search_notes` or `list_notes` before asking the user about previously established conventions or decisions.
    - **Meeting Notes**: If the user provides extensive requirements or feedback, save it as a note.

3.  **Task Management (Todos)**:
    - **Future Work**: Use `create_todo` for tasks that are out of scope for the current session but shouldn't be forgotten.
    - **Tech Debt**: Use `create_todo` to track identified technical debt or refactoring opportunities.

## Tool Usage Guidelines

### Context Management

- **Key Types**: "goals", "state", "architecture", "decisions"
- **Content**: Keep context summaries concise but comprehensive. Use Markdown.

### Note Taking

- **Title**: Descriptive and searchable (e.g., "Authentication System Architecture").
- **Tags**: Always add relevant tags (e.g., ["auth", "architecture", "supabase"]) for better discoverability.
- **Content**: detailed explanations, code snippets, and rationale.

### Todo Tracking

- **Projects**: Use `projectId` to group related tasks if applicable.
- **Status**: Periodically list todos to see what's pending.

## Examples

| Scenario                        | Action                                                             |
| ------------------------------- | ------------------------------------------------------------------ |
| Starting a new feature          | `get_context(type="architecture")` to understand constraints       |
| Finishing a complex refactor    | `save_context(type="state", content="Refactored X, next is Y...")` |
| User explains business logic    | `create_note(title="Business Logic: Pricing", content=...)`        |
| Noticed a bug in unrelated file | `create_todo(task="Fix bug in utils.ts", projectId="maintenance")` |

## Benefits

- **Continuity**: You don't lose context between sessions.
- **Self-Reliance**: You can find answers in existing notes instead of asking the user repeatedly.
- **Organization**: Keeps the project organized without cluttering the chat history.
