<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="day in days"
      :key="day.day"
      @click="$emit('open-day', day)"
      class="glass p-5 rounded-3xl cursor-pointer border border-white/5 card-glow transition-all animate-pop group"
    >
      <div class="flex justify-between items-start mb-4">
        <span class="text-[10px] font-black uppercase text-gs-red tracking-widest group-hover:text-gs-yellow transition-colors">{{ day.day }}</span>
        <span class="material-symbols-outlined text-zinc-600 group-hover:text-white transition-colors">open_in_full</span>
      </div>
      <h4 class="font-bold text-lg leading-tight mb-2 group-hover:text-gs-yellow transition-colors">{{ day.type }}</h4>
      <div class="flex items-center gap-2 text-xs text-zinc-500">
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
  image?: string
}

defineProps<{
  days: WorkoutDay[]
}>()

defineEmits<{
  (e: 'open-day', day: WorkoutDay): void
}>()
</script>
