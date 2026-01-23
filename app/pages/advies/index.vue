<template>
  <div class="min-h-screen pb-24 pt-24 px-4 max-w-4xl mx-auto">
    <div class="mb-6">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">arrow_back</span> Terug naar home
      </NuxtLink>
    </div>

    <div class="mb-8">
      <h1 class="text-4xl font-black italic uppercase tracking-tighter mb-2">
        <span class="text-white">Osman's</span> <span class="text-gala-red-500">Handboek</span>
      </h1>
      <p class="text-neutral-400">Jouw persoonlijke gids voor de transformatie. Lees dit als je vastloopt.</p>
    </div>

    <div v-if="pending" class="text-center py-12">
      <span class="loading loading-spinner loading-lg text-gala-red-500"></span>
    </div>

    <div v-else class="grid gap-4">
      <NuxtLink
        v-for="article in adviceList"
        :key="article.slug"
        :to="`/advies/${article.slug}`"
        class="glass p-6 rounded-2xl border border-neutral-700/50 hover:border-gala-red-500/50 transition-all group"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold group-hover:text-gala-red-400 transition-colors">{{ article.title }}</h2>
          <span class="material-symbols-outlined text-neutral-500 group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: adviceList, pending } = await useFetch('/api/advice')
</script>
