---
trigger: glob
globs: ["app/composables/useFeatureFlags.ts", ".env", ".env.example"]
description: Conventions for using and adding feature flags
---

# Feature Flags

## Usage

Access feature flags via the `useFeatureFlags` composable:

```typescript
const { priceChart, ownerHistory, mileageHistory } = useFeatureFlags()

// Use in templates
<template>
  <PriceChart v-if="priceChart" :data="chartData" />
</template>

// Use in script
if (priceChart.value) {
  await fetchPriceHistory()
}
```

## Configuration

Feature flags are controlled via environment variables:

```bash
# .env
NUXT_PUBLIC_FEATURE_PRICE_CHART=true
NUXT_PUBLIC_FEATURE_OWNER_HISTORY=false
NUXT_PUBLIC_FEATURE_MILEAGE_HISTORY=false
```

## Adding a New Feature Flag

1. **Add environment variable** in `.env`:

   ```bash
   NUXT_PUBLIC_FEATURE_NEW_FEATURE=false
   ```

2. **Update composable** in `composables/useFeatureFlags.ts`:

   ```typescript
   export function useFeatureFlags() {
     const config = useRuntimeConfig()

     return {
       priceChart: computed(() => config.public.featurePriceChart === "true"),
       ownerHistory: computed(() => config.public.featureOwnerHistory === "true"),
       newFeature: computed(() => config.public.featureNewFeature === "true"),
     }
   }
   ```

3. **Use in components**:

   ```vue
   <script setup>
   const { newFeature } = useFeatureFlags()
   </script>

   <template>
     <NewFeatureComponent v-if="newFeature" />
   </template>
   ```

## Best Practices

### Always Use Computed

Feature flags should be reactive:

```typescript
// ✅ CORRECT: Reactive
const { priceChart } = useFeatureFlags()
// priceChart is a ComputedRef<boolean>

// ❌ WRONG: Not reactive
const priceChart = useRuntimeConfig().public.featurePriceChart === "true"
```

### Provide Fallback UI

When hiding features, consider the user experience:

```vue
<template>
  <div v-if="priceChart">
    <PriceChart :data="chartData" />
  </div>
  <div v-else class="text-muted">Price chart coming soon</div>
</template>
```

### Clean Up After Launch

Once a feature is permanently enabled:

1. Remove the flag check from components
2. Remove from `useFeatureFlags`
3. Remove environment variable
