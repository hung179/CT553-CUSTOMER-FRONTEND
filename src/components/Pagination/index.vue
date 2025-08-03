<template>
  <div class="flex items-center justify-center space-x-2 mt-6">
    <button
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      :disabled="currentPage === 0"
      @click="$emit('page-change', currentPage - 1)"
    >
      &laquo;
    </button>

    <button
      v-for="page in pagesToShow"
      :key="page"
      class="px-3 py-1 rounded"
      :class="{
        'bg-blue-500 text-white': page === currentPage,
        'bg-gray-200 hover:bg-gray-300': page !== currentPage
      }"
      @click="$emit('page-change', page)"
    >
      {{ page + 1 }}
    </button>

    <button
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      :disabled="currentPage === totalPages - 1"
      @click="$emit('page-change', currentPage + 1)"
    >
      &raquo;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
})

const pagesToShow = computed(() => {
  const pages = []
  for (let i = 0; i < props.totalPages; i++) {
    pages.push(i)
  }
  return pages
})
</script>

