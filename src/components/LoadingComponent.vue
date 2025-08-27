<!-- components/LoadingOverlay.vue -->
<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50"
  >
    <div class="bg-white p-8 rounded-lg text-center shadow-lg">
      <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-700 text-base">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Đang xử lý...'
  }
});
</script>
