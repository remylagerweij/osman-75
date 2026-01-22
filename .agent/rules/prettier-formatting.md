---
trigger: glob
globs: ["**/*.ts", "**/*.js", "**/*.vue", "**/*.json", "**/*.md", "**/*.css", "**/*.html"]
description: When writing or editing code, ensure Prettier formatting compliance and auto-fix issues
---

# Prettier Formatting Rules

## Core Principle

All code MUST adhere to Prettier formatting standards. After writing or modifying any file, automatically check and fix Prettier issues.

## Required Actions

### After Writing or Editing Code

1. **Run Prettier to format the file(s):**

   ```bash
   npx prettier --write <file-path>
   ```

2. **For multiple files, use glob patterns:**

   ```bash
   npx prettier --write "app/**/*.{ts,vue,js}"
   ```

### Verification Command

To check if files are properly formatted without modifying:

```bash
npx prettier --check <file-path>
```

## Common File Types

| Extension | Description    |
| --------- | -------------- |
| `.ts`     | TypeScript     |
| `.js`     | JavaScript     |
| `.vue`    | Vue components |
| `.json`   | JSON config    |
| `.md`     | Markdown docs  |
| `.css`    | Stylesheets    |
| `.html`   | HTML files     |

## Auto-Fix Workflow

When editing files:

1. Make the necessary code changes
2. Run `npx prettier --write <modified-files>`
3. Continue with the task

## Prettier Configuration

If the project has a `.prettierrc` or `prettier.config.js`, Prettier will use those settings. If not, Prettier defaults apply.

### Common Prettier Options

If creating a config file, consider these settings:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## Integration with Other Tools

- Run Prettier **after** making code changes
- Run Prettier **before** committing code
- Combine with ESLint when available: `npx eslint --fix && npx prettier --write`
