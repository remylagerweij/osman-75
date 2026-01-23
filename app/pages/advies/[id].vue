<template>
  <div class="min-h-screen pb-24 pt-24 px-4 max-w-3xl mx-auto">
    <div class="mb-6">
      <NuxtLink to="/advies" class="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-4">
        <span class="material-symbols-outlined text-sm">arrow_back</span> Terug naar overzicht
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-center py-12">
      <span class="loading loading-spinner loading-lg text-gala-red-500"></span>
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-500">
      <p>Er is iets misgegaan bij het laden van dit artikel.</p>
    </div>

    <article v-else class="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-a:text-gala-red-400 glass p-8 rounded-3xl" v-html="renderedContent">
    </article>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const route = useRoute()
const slug = route.params.id as string

const { data: article, pending, error } = await useFetch(`/api/advice/${slug}`)

const renderedContent = computed(() => {
  if (!article.value?.content) return ''
  return marked(article.value.content)
})
</script>

<style>
/* Custom prose overrides if needed */
.prose blockquote {
  border-left-color: #ef4444; /* red-500 */
  background: rgba(239, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
}
</style>
