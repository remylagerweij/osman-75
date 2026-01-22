# Feature Plans Directory

This directory contains planning artifacts created by the `/plan-feature` workflow.

## Structure

Each feature gets its own subdirectory:

```
.agent/plans/
├── README.md (this file)
└── [feature-name]/
    ├── requirements.md
    ├── architecture.md
    ├── tasks.md
    └── execution-log.md
```

## Usage

1. Run `/plan-feature` to start a new feature plan.
2. Answer the discovery questions.
3. Review the generated plan files.
4. Approve to begin execution.

## Cleanup

After a feature is complete, you can:

- Archive the plan to `docs/decisions/`
- Delete the plan directory
- Keep for reference
