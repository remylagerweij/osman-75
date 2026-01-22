<template>
  <div class="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h3 class="text-2xl font-black italic uppercase mb-4">Macro Calculator</h3>
      <p class="text-zinc-400 mb-6 text-sm">Voer je huidige gewicht in om je persoonlijke eiwitbehoefte te zien.</p>
      <div class="space-y-4">
        <div class="relative">
          <input
            v-model="weight"
            type="number"
            placeholder="Gewicht in kg"
            class="w-full bg-surface/50 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-gs-yellow outline-none font-bold text-xl placeholder:text-zinc-600"
          >
          <span class="absolute right-4 top-4 text-zinc-500 font-bold">KG</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gs-red p-4 rounded-2xl text-center shadow-lg shadow-gs-red/20">
            <p class="text-[10px] font-bold uppercase tracking-widest opacity-80 text-white">Eiwit Doel</p>
            <p class="text-3xl font-black text-white">{{ proteinGoal }}g</p>
          </div>
          <div class="bg-surface p-4 rounded-2xl text-center border border-white/5">
            <p class="text-[10px] font-bold uppercase tracking-widest opacity-80 text-zinc-400">Kcal Bereik</p>
            <p class="text-xl font-black">1800-2200</p>
          </div>
        </div>
      </div>
    </div>
    <div class="relative rounded-2xl overflow-hidden h-64 shadow-2xl">
      <img src="/images/meal-prep.png" class="w-full h-full object-cover" alt="Meal Prep">
      <div class="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-6">
        <p class="text-sm font-bold italic">Stick to the basics: Kip, Rijst, Broccoli, Eieren, Kwark.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const weight = ref<number | null>(null)

const proteinGoal = computed(() => {
  if (!weight.value) return '--'
  return Math.round(weight.value * 2)
})
</script>
