<template>
  <div class="glass p-6 rounded-3xl" :class="containerClass">
    <div class="flex items-center gap-3 mb-4">
      <span class="material-symbols-outlined" :class="iconClass">{{ icon }}</span>
      <h3 class="font-bold text-lg">{{ title }}</h3>
    </div>
    <div class="space-y-2 text-sm">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  iconClass?: string
  containerClass?: string
}>()
</script>
