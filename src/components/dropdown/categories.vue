<template>
  <div class="w-full h-fit mt-10">
    <div class="w-full h-fit flex items-center">
      <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
        <span class="text-red-400 mr-1">*</span>
        Ngành hàng
      </div>
      <div class="relative flex-1">
        <!-- Dropdown trigger -->
        <div 
          class="relative cursor-pointer group" 
          @click="toggleDropdown"
        >
          <input 
            type="text" 
            id="p_category" 
            :value="selectedCategoryDisplay"
            placeholder="Chọn ngành hàng" 
            readonly
            class="w-full pointer-events-none cursor-pointer text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 group-hover:border-zinc-400 rounded-md h-10 outline-none pl-3 pr-10 focus:border-zinc-400"
          />
          <div class="absolute right-0 top-0 w-fit h-10 flex items-center justify-center">
            <Icon 
              :name="isDropdownOpen ? 'ic:outline-keyboard-arrow-up' : 'ic:outline-keyboard-arrow-down'" 
              class="text-zinc-400 mx-3 transition-transform duration-200" 
              size="20px" 
            />
          </div>
        </div>

        <!-- Dropdown menu -->
        <div 
          v-if="isDropdownOpen"
          class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          <!-- Category list -->
          <div class="max-h-48 overflow-y-auto">
            <div 
              v-for="category in filteredCategories" 
              :key="category.maDM"
              class="px-3 py-2 hover:bg-zinc-50 cursor-pointer text-sm text-zinc-900 border-b border-zinc-100 last:border-b-0"
              :class="{ 'bg-blue-50 text-blue-600': selectedCategory?.maDM === category.maDM }"
              @click="selectCategory(category)"
            >
              {{ category.tenDM }}
            </div>
            
            <!-- No results -->
            <div 
              v-if="filteredCategories.length === 0" 
              class="px-3 py-4 text-sm text-zinc-500 text-center"
            >
              Không tìm thấy ngành hàng phù hợp
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error message -->
    <p v-if="validationError" class="pl-54 text-xs text-red-500 pt-2">
      {{ validationError }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: [Object, String, Number],
    default: null
  },
  categories: {
    type: Array,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Reactive data
const isDropdownOpen = ref(false)
const searchQuery = ref('')
const selectedCategory = ref(props.modelValue)

// Computed
const selectedCategoryDisplay = computed(() => {
  return selectedCategory.value?.tenDM || ''
})

const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return props.categories
  }
  return props.categories.filter(category => 
    category.tenDM.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const validationError = computed(() => {
  if (!selectedCategory.value) {
    return 'Vui lòng chọn ngành hàng'
  }
  return null
})

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    searchQuery.value = ''
  }
}

const selectCategory = (category) => {
  selectedCategory.value = category
  emit('update:modelValue', category)
  isDropdownOpen.value = false
  searchQuery.value = ''
}

const closeDropdown = (event) => {
  if (!event.target.closest('.relative')) {
    isDropdownOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  selectedCategory.value = newValue
})
</script>