<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="day in days"
      :key="day.day"
      @click="$emit('open-day', day)"
      class="glass p-5 rounded-3xl cursor-pointer border border-slate-700/50 card-glow transition-all animate-pop"
    >
      <div class="flex justify-between items-start mb-4">
        <span class="text-[10px] font-black uppercase text-blue-500 tracking-widest">{{ day.day }}</span>
        <span class="material-symbols-outlined text-slate-600">open_in_full</span>
      </div>
      <h4 class="font-bold text-lg leading-tight mb-2">{{ day.type }}</h4>
      <div class="flex items-center gap-2 text-xs text-slate-400">
        <span class="material-symbols-outlined text-sm">schedule</span> 90m Totaal
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface WorkoutDay {
  day: string
  type: string
  details?: string[]
}

defineProps<{
  days: WorkoutDay[]
}>()

defineEmits<{
  (e: 'open-day', day: WorkoutDay): void
}>()
</script>
