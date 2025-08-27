<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header with glassmorphism effect -->
    <div class="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-lg">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Đổi Mật Khẩu
              </h1>
              <p class="text-sm text-gray-600 mt-1">Cập nhật mật khẩu bảo mật của bạn</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="relative group">
        <!-- Background blur effect -->
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
        
        <!-- Form container -->
        <div class="relative bg-white/90 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <!-- Form header -->
          <div class="px-8 py-6 bg-gradient-to-r from-gray-50/90 to-blue-50/90 border-b border-gray-200/50">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">Thay Đổi Mật Khẩu</h2>
                <p class="text-sm text-gray-600">Vui lòng nhập thông tin để đổi mật khẩu</p>
              </div>
            </div>
          </div>

          <!-- Form content -->
          <div class="px-8 py-8">
            <form @submit.prevent="handleChangePassword" class="space-y-6">
              <!-- Current Password -->
              <div class="relative group">
                <label for="oldPassword" class="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Mật khẩu hiện tại</span>
                </label>
                <div class="relative">
                  <input
                    id="oldPassword"
                    v-model="form.oldPassword"
                    :type="showOldPassword ? 'text' : 'password'"
                    :class="[
                      'w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl',
                      errors.oldPassword 
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/20 focus:border-red-400' 
                        : 'border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400'
                    ]"
                    placeholder="Nhập mật khẩu hiện tại"
                    required
                  />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    @click="showOldPassword = !showOldPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg v-if="!showOldPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L9.878 9.878m4.242 4.242L14.12 14.12m-4.242-4.242L14.12 14.12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <p v-if="errors.oldPassword" class="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{{ errors.oldPassword }}</span>
                </p>
              </div>

              <!-- New Password -->
              <div class="relative group">
                <label for="newPassword" class="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 12H9v4a2 2 0 01-2 2H5v-4a2 2 0 012-2h.5L9 10.5a6 6 0 017.536-3.072" />
                  </svg>
                  <span>Mật khẩu mới</span>
                </label>
                <div class="relative">
                  <input
                    id="newPassword"
                    v-model="form.newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    :class="[
                      'w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl',
                      errors.newPassword 
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/20 focus:border-red-400' 
                        : 'border-gray-200 focus:ring-4 focus:ring-green-500/20 focus:border-green-400'
                    ]"
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                    required
                    minlength="6"
                  />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 12H9v4a2 2 0 01-2 2H5v-4a2 2 0 012-2h.5L9 10.5a6 6 0 017.536-3.072" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg v-if="!showNewPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L9.878 9.878m4.242 4.242L14.12 14.12m-4.242-4.242L14.12 14.12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <p v-if="errors.newPassword" class="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{{ errors.newPassword }}</span>
                </p>
                <div class="mt-2 text-xs text-gray-500">
                  <p class="flex items-center space-x-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mật khẩu phải có ít nhất 6 ký tự</span>
                  </p>
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="relative group">
                <label for="confirmPassword" class="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Xác nhận mật khẩu mới</span>
                </label>
                <div class="relative">
                  <input
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    :class="[
                      'w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl',
                      errors.confirmPassword 
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/20 focus:border-red-400' 
                        : 'border-gray-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400'
                    ]"
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg v-if="!showConfirmPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L9.878 9.878m4.242 4.242L14.12 14.12m-4.242-4.242L14.12 14.12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{{ errors.confirmPassword }}</span>
                </p>
              </div>

              <!-- Action buttons -->
              <div class="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                >
                  <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div class="relative flex items-center space-x-2">
                    <svg v-if="loading" class="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ loading ? 'Đang xử lý...' : 'Đổi mật khẩu' }}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Component (similar to order page) -->
    <div v-if="showModal" 
         class="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
         @click="showModal = false">
      <div class="relative w-full max-w-md transform transition-all duration-300 ease-out" @click.stop>
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-75"></div>
        <div class="relative backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90">
            <div class="flex items-center space-x-3">
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg',
                modalType === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                modalType === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                'bg-gradient-to-r from-yellow-500 to-orange-600'
              ]">
                <svg v-if="modalType === 'success'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else-if="modalType === 'error'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">{{ titleModal }}</h3>
            </div>
            <button @click="showModal = false" 
                    class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6">
            <p class="text-gray-700 text-center">{{ message }}</p>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end space-x-3 p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90">
            <button @click="showModal = false"
                    class="px-6 py-2 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Composables
const route = useRoute()

// Form data - using reactive for form object
const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// UI state - using ref for individual reactive values
const loading = ref(false)
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Validation errors - using reactive for errors object
const errors = reactive({})

// Modal state - using ref for individual reactive values
const showModal = ref(false)
const modalType = ref('success') // 'success', 'error', 'confirm'
const titleModal = ref('')
const message = ref('')
const confirmText = ref('Xác nhận')

// User info - using ref for individual reactive value
const mssv = ref('SV001') // This should come from your auth store/route params

// Methods
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  // Validate old password
  if (!form.oldPassword) {
    errors.oldPassword = 'Vui lòng nhập mật khẩu hiện tại'
  }
  
  // Validate new password
  if (!form.newPassword) {
    errors.newPassword = 'Vui lòng nhập mật khẩu mới'
  } else if (form.newPassword.length < 6) {
    errors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự'
  } else if (form.newPassword === form.oldPassword) {
    errors.newPassword = 'Mật khẩu mới không được giống mật khẩu cũ'
  }
  
  // Validate confirm password
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới'
  } else if (form.confirmPassword !== form.newPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
  }
  
  return Object.keys(errors).length === 0
}

// Handle form submission
const handleChangePassword = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    // Create FormData for the API call (following the controller pattern)
    const formData = new FormData()
    formData.append('oldPassword', form.oldPassword)
    formData.append('newPassword', form.newPassword)
    
    // API call similar to order page pattern
    // Note: You'll need to inject your API service or use fetch/axios
    const response = await $api.post(`/students/changePassword/${mssv.value}`, formData)
    
    // Simulated API call for demo purposes
    // const response = await simulateApiCall(formData)
    
    // Handle success response
    if (response.data.success) {
      showModalConfirm({
        type: 'SUCCESS',
        message: response.data.message || 'Đổi mật khẩu thành công!'
      })
      resetForm()
    } else {
      showModalConfirm({
        type: 'ERROR',
        message: response.data.message || 'Có lỗi xảy ra khi đổi mật khẩu'
      })
    }
    
  } catch (error) {
    console.error('Error changing password:', error)
    
    // Handle different error types
    let errorMessage = 'Có lỗi xảy ra khi đổi mật khẩu'
    
    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = error.response.data.message || 'Thông tin không hợp lệ'
      } else if (error.response.status === 401) {
        errorMessage = 'Mật khẩu hiện tại không chính xác'
      } else if (error.response.status === 404) {
        errorMessage = 'Không tìm thấy tài khoản'
      } else {
        errorMessage = error.response.data.message || 'Lỗi hệ thống'
      }
    }
    
    showModalConfirm({
      type: 'ERROR',
      message: errorMessage
    })
    
  } finally {
    loading.value = false
  }
}

// Show modal confirmation (similar to order page)
const showModalConfirm = (element) => {
  switch (element.type) {
    case 'ERROR':
      modalType.value = 'error'
      titleModal.value = 'Lỗi'
      message.value = element.message
      confirmText.value = 'Đóng'
      showModal.value = true
      break
      
    case 'SUCCESS':
      modalType.value = 'success'
      titleModal.value = 'Thành công'
      message.value = element.message
      confirmText.value = 'Đóng'
      showModal.value = true
      break
      
    default:
      modalType.value = 'confirm'
      titleModal.value = 'Xác nhận'
      message.value = element.message
      confirmText.value = 'Xác nhận'
      showModal.value = true
  }
}

// Reset form
const resetForm = () => {
  form.oldPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
  
  // Clear errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  showOldPassword.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
}

// Get user info (should integrate with your auth store)
const getUserInfo = () => {
  // This should integrate with your auth store
  // Example with Pinia:
  // const authStore = useAuthStore()
  // mssv.value = authStore.user?.mssv
  
  // For now using route params or default
  if (route.params.mssv) {
    mssv.value = route.params.mssv
  }
}

// Simulated API call for demo purposes
// Replace this with your actual API service
const simulateApiCall = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success response
      resolve({
        data: {
          success: true,
          message: 'Đổi mật khẩu thành công!'
        }
      })
      
      // Uncomment below to simulate error response
      // reject({
      //   response: {
      //     status: 401,
      //     data: {
      //       message: 'Mật khẩu hiện tại không chính xác'
      //     }
      //   }
      // })
    }, 2000)
  })
}

// Lifecycle
</script>

<style scoped>
@keyframes tilt {
  0%, 50%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  75% {
    transform: rotate(-0.5deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}

/* Glass morphism utilities */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Custom focus styles */
input:focus {
  outline: none;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects */
.transform:hover {
  transform: translateY(-2px);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>