<template>
  <div
    class="min-h-screen w-full bg-cover bg-center"
    :style="backgroundStyle"
  >
  <div class="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <slot />

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import bgImage from '@/assets/images/bg.jpg'

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${bgImage})`
}))
</script>