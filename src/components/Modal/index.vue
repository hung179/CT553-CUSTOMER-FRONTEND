<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div class="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative text-center space-y-4">
        
        <!-- Icon động theo loại -->
        <div>
          <component :is="iconComponent" class="mx-auto w-12 h-12" :class="iconColor" />
        </div>

        <!-- Tiêu đề -->
        <h2 class="text-xl font-semibold">{{ title }}</h2>

        <!-- Nội dung -->
        <p class="text-gray-600 text-sm">{{ message }}</p>

        <!-- Hành động -->
        <div class="flex justify-center gap-3 pt-2">
          <button
            v-if="type === 'confirm'"
            @click="$emit('cancel')"
            class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            @click="$emit('confirm')"
            class="px-4 py-2 rounded-lg text-white"
            :class="buttonColor"
          >
            {{ confirmText }}
          </button>
        </div>

        <!-- Nút đóng (X) -->
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          @click="$emit('close')"
        >
          &times;
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { CheckCircleIcon, AlertTriangleIcon, AlertCircleIcon } from 'lucide-vue-next';

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    default: 'success', // success | warning | confirm
  },
  title: String,
  message: String,
  confirmText: {
    type: String,
    default: 'OK'
  }
});

// Icon động theo type
const iconComponent = computed(() => {
  switch (props.type) {
    case 'success': return CheckCircleIcon;
    case 'warning': return AlertTriangleIcon;
    case 'confirm': return AlertCircleIcon;
    case 'danger': return AlertCircleIcon;
    default: return CheckCircleIcon;
  }
});

const iconColor = computed(() => {
  switch (props.type) {
    case 'success': return 'text-green-500';
    case 'warning': return 'text-yellow-500';
    case 'confirm': return 'text-blue-500';
    case 'danger': return 'text-red-500';
    default: return '';
  }
});

const buttonColor = computed(() => {
  switch (props.type) {
    case 'success': return 'bg-green-500 hover:bg-green-600';
    case 'warning': return 'bg-yellow-500 hover:bg-yellow-600';
    case 'confirm': return 'bg-blue-500 hover:bg-blue-600';
    case 'danger': return 'bg-red-500 hover:bg-red-600';
    default: return 'bg-gray-500';
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
