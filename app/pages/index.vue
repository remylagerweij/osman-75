<template>
  <div class="min-h-screen pb-24" style="overflow: auto;">
    <!-- Header Hero -->
    <header class="relative h-64 flex items-center justify-center overflow-hidden border-b border-slate-800">
      <img src="/images/gym-background.png" class="absolute inset-0 w-full h-full object-cover opacity-40 animate-pan" alt="Gym Background">
      <div class="relative z-10 text-center px-4">
        <h1 class="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-2 animate-pop">Osman's 75 Hard</h1>
        <div class="flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest animate-pop" style="animation-delay: 0.1s; animation-fill-mode: backwards;">
          <span class="bg-blue-600 px-3 py-1 rounded">90 Min Activiteit</span>
          <span class="bg-blue-600 px-3 py-1 rounded">3L Water</span>
          <span class="bg-blue-600 px-3 py-1 rounded">Geen Excuses</span>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
      <!-- Top Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <!-- Nutrition Card -->
        <StatCard icon="nutrition" title="Voeding" iconClass="text-blue-400">
          <div class="flex justify-between border-b border-slate-700 pb-1">
            <span class="text-slate-400">Calorieën:</span>
            <span class="font-bold">1800 - 2200 kcal</span>
          </div>
          <div class="flex justify-between border-b border-slate-700 pb-1">
            <span class="text-slate-400">Eiwit:</span>
            <span class="font-bold">2g x kg Lichaamsgewicht</span>
          </div>
          <p class="text-[10px] text-slate-500 italic mt-2">Overige macro's zijn optimalisaties.</p>
        </StatCard>

        <!-- Weight Management Card -->
        <StatCard
          icon="monitor_weight"
          title="Gewichtsverlies"
          iconClass="text-green-400"
          containerClass="border-l-4 border-l-blue-500"
        >
          <div class="flex justify-between">
            <span class="text-slate-400">Doel per week:</span>
            <span class="font-bold">500g - 1kg</span>
          </div>
          <div class="bg-blue-900/30 p-2 rounded text-xs text-blue-200 leading-tight">
            <strong>Protocol:</strong> Val je meer dan 1kg af? Verhoog je inname direct met <strong>+200 kcal</strong>.
          </div>
        </StatCard>

        <!-- Sleep Hygiene Card -->
        <StatCard icon="bedtime" title="Slaap Hygiëne" iconClass="text-indigo-400">
          <ul class="text-sm space-y-2">
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-red-400">timer_off</span> Geen eten 3 uur voor slaap</li>
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-blue-400">water_drop</span> Weinig drinken 2 uur voor slaap</li>
            <li class="text-[10px] text-slate-500 italic ml-6">* Sips toegestaan bij droge mond</li>
          </ul>
        </StatCard>
      </div>

      <!-- Training Schedule -->
      <section class="mb-12">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div>
            <h2 class="text-3xl font-black italic uppercase tracking-tight">Trainingsschema</h2>
            <p class="text-slate-400">Klik op een dag voor het volledige 90-minuten programma.</p>
          </div>
          <div class="flex bg-slate-800 p-1 rounded-2xl">
            <button
              v-for="wk in [1, 2, 3]"
              :key="wk"
              @click="activeWeek = wk"
              class="px-6 py-2 rounded-xl text-sm font-bold transition-all"
              :class="activeWeek === wk ? 'tab-active' : 'text-slate-400 hover:text-white'"
            >
              Week {{ wk }}
            </button>
          </div>
        </div>

        <!-- Weeks Container -->
        <div class="min-h-[300px]">
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in absolute opacity-0"
            leave-to-class="opacity-0 -translate-y-4"
            mode="out-in"
          >
            <WorkoutWeek :key="activeWeek" :days="weeksData[activeWeek]" @open-day="openModal" />
          </transition>
        </div>
      </section>

      <!-- Dynamic Protein Calc -->
      <section class="glass rounded-3xl p-8 mb-12">
        <MacroCalculator />
      </section>

    </main>

    <WorkoutModal
      :is-open="isModalOpen"
      :day="selectedDay"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import type { WorkoutDay } from '~/components/WorkoutWeek.vue'

// Data
const weeksData: Record<number, WorkoutDay[]> = {
  1: [
    { day: 'Maandag', type: 'Benen (Lower Body Focus)', details: ['Squats: 4 sets x 8 reps', 'Leg Press: 3 sets x 12 reps', 'Lunges: 3 sets x 10 reps per been', 'Leg Extensions: 3 sets x 15 reps', 'Calf Raises: 4 sets x 15 reps'] },
    { day: 'Dinsdag', type: 'Push (Borst / Schouders / Triceps)', details: ['Bench Press: 4 sets x 8 reps', 'Overhead Press: 3 sets x 10 reps', 'Incline Dumbbell Press: 3 sets x 10 reps', 'Lateral Raises: 4 sets x 15 reps', 'Tricep Pushdowns: 3 sets x 12 reps'] },
    { day: 'Woensdag', type: 'Pull (Rug / Biceps)', details: ['Deadlift: 3 sets x 5 reps', 'Pull Ups: 3 sets (max reps)', 'Barbell Rows: 4 sets x 10 reps', 'Face Pulls: 3 sets x 15 reps', 'Bicep Curls: 3 sets x 12 reps'] },
    { day: 'Donderdag', type: 'Actief Herstel', details: ['Lange wandeling (60 min)', 'Stretching / Mobility flow', 'Yoga sessie'] },
    { day: 'Vrijdag', type: 'Actief Herstel', details: ['Lichte cardio (fietsen/zwemmen)', 'Foam rolling full body'] },
    { day: 'Zaterdag', type: 'HIIT & Conditie', details: ['Warming up: 10 min joggen', 'Intervals: 30 sec sprint / 30 sec rust (15 min)', 'Burpees: 3 sets x 15', 'Mountain Climbers: 3 sets x 30 sec', 'Cool down: 10 min wandelen'] },
    { day: 'Zondag', type: 'Benen (Lower Body Focus)', details: ['Romanian Deadlifts: 4 sets x 10 reps', 'Goblet Squats: 3 sets x 12 reps', 'Hamstring Curls: 3 sets x 15 reps', 'Bulgarian Split Squats: 3 sets x 10 reps'] },
  ],
  2: [
     { day: 'Maandag', type: 'Upper Power', details: ['Bench Press: 5x5', 'Barbell Row: 5x5', 'Overhead Press: 3x8', 'Pull Ups: 3x8'] },
     // ... Placeholder for diversity
  ],
  3: [
    // ... Placeholder
  ]
}

// Fill weeks 2 and 3 with Week 1 data for full demo if needed, or keeping them separate to show structure.
// For this demo I'll populate them with slight variations to ensure buttons work.
weeksData[2] = weeksData[1].map(d => ({ ...d, type: d.type.includes('Benen') ? 'Benen (Heavy)' : d.type }))
weeksData[3] = weeksData[1].map(d => ({ ...d, type: d.type.includes('HIIT') ? 'HIIT (Extreme)' : d.type }))


// State
const activeWeek = ref(1)
const isModalOpen = ref(false)
const selectedDay = ref<WorkoutDay | null>(null)

// Actions
function openModal(day: WorkoutDay) {
  selectedDay.value = day
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  setTimeout(() => {
    selectedDay.value = null
  }, 300)
}
</script>

<style scoped>
.animate-pan {
    animation: pan 20s infinite alternate linear;
}

@keyframes pan {
    from { object-position: 50% 0%; transform: scale(1); }
    to { object-position: 50% 100%; transform: scale(1.1); }
}
</style>
