<template>
  <div
    class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-xl border border-white/20"
  >
    <div>
      <!-- Logo và tiêu đề -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          SVienShop
        </h1>
      </div>

      <!-- Form đăng nhập -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email field -->
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <input
            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
            type="text"
            id="text"
            v-model="text"
            required
            placeholder="Nhập mã số sinh viên"
          />
        </div>

        <!-- Password field -->
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <input
            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Nhập mật khẩu"
          />
        </div>
        <!-- Login button -->
        <button
          class="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          type="submit"
        >
          <span class="flex items-center justify-center">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              ></path>
            </svg>
            Đăng nhập
          </span>
        </button>
      </form>
    </div>
  </div>
  <Modal 
      :show="showModal" 
      :type="modalType" 
      :title="titleModal" 
      :message="message" 
      :confirmText="confirmText"
      @confirm="handleConfirm()" 
      @cancel="showModal = false" 
      @close="showModal = false" 
    />
</template>

<script setup>
import { ref } from "vue";
const router = useRouter();

const authStore = useAuthStore();
const { $api } = useNuxtApp();

const text = ref("");
const password = ref("");

const showModal = ref(false)
const modalType = ref(null)
const titleModal = ref(null)
const message = ref(null)
const confirmText = ref(null)
const handleConfirm = ref()

const showModalConfirm = (element) => {
  switch (element.type) {
    case 'ACCOUNTLOCKED':
    case 'UNAUTHENTICATED':
      handleConfirm.value = () => { showModal.value = false }
      modalType.value = "warning"
      titleModal.value = "Thông báo"
      message.value = element.message
      confirmText.value = 'Xác nhận'
      showModal.value = true
      break
    case 'error':
      handleConfirm.value = () => { showModal.value = false }
      modalType.value = "error"
      titleModal.value = "Lỗi"
      message.value = element.message
      confirmText.value = 'Đóng'
      showModal.value = true
      break
  }
}

definePageMeta({ layout: "login" });

const handleLogin = async () => {
  try {
    await authStore.login({ username: text.value, password: password.value });
    router.push("/");
  } catch (error) {
    console.error("Login error:", error);
    showModalConfirm(error.response?.data || {
      type: 'error',
      message: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.'
    });
  }
};
</script>