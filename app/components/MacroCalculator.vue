<template>
  <div class="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h3 class="text-2xl font-black italic uppercase mb-4">Macro Calculator</h3>
      <p class="text-neutral-400 mb-6 text-sm">Voer je huidige gewicht in om je persoonlijke eiwitbehoefte te zien.</p>
      <div class="space-y-4">
        <div class="relative">
          <input
            v-model="weight"
            type="number"
            placeholder="Gewicht in kg"
            class="w-full bg-neutral-900/50 border border-neutral-700 p-4 rounded-2xl focus:ring-2 focus:ring-gala-red-500 outline-none font-bold text-xl"
          >
          <span class="absolute right-4 top-4 text-neutral-500 font-bold">KG</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gala-red-600 p-4 rounded-2xl text-center">
            <p class="text-[10px] font-bold uppercase tracking-widest opacity-80">Eiwit Doel</p>
            <p class="text-3xl font-black">{{ proteinGoal }}g</p>
          </div>
          <div class="bg-neutral-800 p-4 rounded-2xl text-center">
            <p class="text-[10px] font-bold uppercase tracking-widest opacity-80">Kcal Bereik</p>
            <p class="text-xl font-black">1800-2200</p>
          </div>
        </div>
      </div>
    </div>
    <div class="relative rounded-2xl overflow-hidden h-64 shadow-2xl">
      <img src="/images/meal-prep.png" class="w-full h-full object-cover" alt="Meal Prep">
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent flex items-end p-6">
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
