<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 modal-blur" @click="$emit('close')"></div>
    <div class="relative glass max-w-2xl w-full rounded-3xl overflow-hidden animate-pop shadow-2xl">
      <div class="p-8">
        <div class="flex justify-between items-start mb-6">
          <div>
            <span class="text-gs-yellow font-bold tracking-widest text-xs uppercase mb-1 block">{{ day?.day || 'Training' }}</span>
            <h2 class="text-3xl font-black italic uppercase">{{ day?.type || 'Training Detail' }}</h2>
          </div>
          <button @click="$emit('close')" class="p-2 hover:bg-white/10 rounded-full transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">

          <div v-if="day?.image" class="aspect-video rounded-xl overflow-hidden shadow-lg mb-4 border border-white/10">
            <img :src="day.image" :alt="day.type" class="w-full h-full object-cover">
          </div>

          <!-- Main Workout Content -->
           <div v-if="day?.details">
               <ul class="space-y-3">
                   <li v-for="(exercise, idx) in day.details" :key="idx" class="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-white/5 hover:border-gs-yellow/20 transition-colors">
                       <span class="text-gs-yellow font-bold">{{ idx + 1 }}.</span>
                       <span class="text-zinc-300">{{ exercise }}</span>
                   </li>
               </ul>
           </div>
           <div v-else>
               <p class="text-zinc-500">Geen details beschikbaar voor deze training.</p>
           </div>

          <!-- Standard Cardio Box -->
          <div class="bg-gs-red/10 border border-gs-red/20 p-4 rounded-xl">
              <h4 class="font-bold text-gs-red mb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined">directions_run</span>
                  Cardio Finish (Verplicht)
              </h4>
              <p class="text-sm text-zinc-300">
                  45 Minuten outdoor wandelen/rennen/fietsen. Moet buiten zijn, ongeacht het weer. #NoExcuses
              </p>
          </div>
        </div>

      </div>
      <div class="bg-surface/90 p-4 text-center border-t border-white/5">
        <button @click="$emit('close')" class="uppercase font-bold text-sm tracking-widest hover:text-gs-yellow transition-colors text-zinc-400">Sluiten</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorkoutDay } from './WorkoutWeek.vue'

defineProps<{
  isOpen: boolean
  day: WorkoutDay | null
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
}
</style>
