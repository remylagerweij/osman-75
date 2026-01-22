---
description: Plan and generate a feature or component with a structured workflow
---

Your goal is to scaffold a new application page, ensuring it adheres to SEO best practices, routing standards, and the project's architecture. You must act as a Senior Engineer, verifying the requirements before implementation.

## Interactive Workflow

1. **Context Analysis & Initiation**
   - **Analyze:**
     - Scan `app/pages` for routing consistency (slugs vs IDs).
     - Check `app/router.options.ts` or `nuxt.config.ts` for custom route definitions.
     - Review `server/api` to anticipate data needs.
   - **Ask:** "What is the user goal for this new page?"

2. **Step-by-Step Guidance**
   - **Focus Areas:**
     - **URL Structure:** Is the path SEO-friendly? (e.g., `/motors/honda` vs `/motors?brand=honda`).
     - **Data Strategy:**
       - SSR vs CSR: Does it need SEO indexing? (AsyncData).
       - Error Handling: What happens if data is missing? (showError).
     - **Access Control:** Does it require `definePageMeta({ middleware: 'auth' })`?
     - **SEO & Meta:** Define `<title>`, `description`, and Open Graph tags.
     - **Layout:** Does it differ from the default layout?
   - **Recommendations:** Suggest using Nuxt-specific features like `useHead` or `useAsyncData` keys.

3. **Plan Proposal**
   Present a structure summary:
   - **File:** `app/pages/<Path>.vue`
   - **Route:** `/<proposed-url>`
   - **Meta:** Middleware, Layout, Header tags.
   - **Data Fetching:** Proposed `useAsyncData` call.
   - **Verification:** E2E test plan (e.g., "Visit page -> Check Title -> Verify Auth redirect").

4. **Confirmation**
   - Ask for confirmation.

5. **Execution**
   - **Generate Page:**
     - Scaffold the Vue file with `<script setup lang="ts">`.
     - Implement `definePageMeta` and `useHead`.
     - Add a skeleton template.
   - // turbo
     **Generate E2E Test:**
     - Execute the logic from the `write-test` workflow:
       - Create `cypress/e2e/<Name>.cy.ts`.
       - Write a test ensuring the route loads and standard SEO tags are present.
       - Use best practices (selectors, resilience).
