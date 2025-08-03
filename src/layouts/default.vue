<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <div class="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg fixed top-15 z-990 w-full">
      <div v-if="showMobileMenu" class="border-t border-white border-opacity-20 animate-slide-down">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- Thêm các chức năng khác cho mobile menu -->
          <div class="space-y-1">
            <!-- Các chức năng chính -->
            <NuxtLink to="/profile"
              class="block px-3 py-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd" />
                </svg>
                <span>Tài khoản của tôi</span>
              </div>
            </NuxtLink>

            <NuxtLink :to="`/wallet/${userId}`"
              class="block px-3 py-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M2 7a2 2 0 012-2h16a2 2 0 012 2v3h-5a3 3 0 100 6h5v3a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm18 4h-5a1 1 0 000 2h5v-2z" />
                </svg>
                <span>Ví điện tử</span>
              </div>
            </NuxtLink>

            Vẫn còn bị lỗi không đóng được component khhi click vào ngoài

            <NuxtLink to="/orders"
              class="block px-3 py-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd" />
                </svg>
                <span>Đơn hàng</span>
              </div>
            </NuxtLink>

            <NuxtLink :to="`/store/${userId}/manage`"
              class="block px-3 py-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
              <div class="flex items-center space-x-2">
                <!-- Icon Store mới -->
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-1.414 1.414a1 1 0 01-.707.293H5.414a1 1 0 01-.707-.293L3.293 7.293A1 1 0 013 6.586V4zm1 6h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V10zm4 2v6h2v-6H8zm6 0v6h2v-6h-2z" />
                </svg>
                <span>Gian hàng cá nhân</span>
              </div>
            </NuxtLink>

            <NuxtLink to="/address"
              class="block px-3 py-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
                <span>Địa chỉ của tôi</span>
              </div>
            </NuxtLink>


            <NuxtLink to="/notifications"
              class="block px-3 py-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span>Thông báo</span>
                <span v-if="notificationCount > 0" class="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {{ notificationCount }}
                </span>
              </div>
            </NuxtLink>

            <NuxtLink to="/settings"
              class="block px-3 py-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd" />
                </svg>
                <span>Cài đặt</span>
              </div>
            </NuxtLink>
          </div>

          <!-- Nút đăng xuất -->
          <div class="border-t border-white border-opacity-20 pt-2">
            <button @click="handleLogout"
              class="block w-full text-left px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500 hover:bg-opacity-20 rounded-md transition-colors">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd" />
                </svg>
                <span>Đăng xuất</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'backdrop-blur-sm bg-black/30': showMobileMenu }" class="flex-1 flex flex-col">
      <main class="flex-1 h-full">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
const router = useRouter();
const { $api } = useNuxtApp();
const authStore = useAuthStore();
const userId = ref(null);

const route = useRoute();
const showMobileMenu = ref(false);
const toggleMobileMenu = () => (showMobileMenu.value = !showMobileMenu.value);

const getUserId = async () => {
  await authStore.loadUser();
  userId.value = authStore.user.mssv;
};

watch(
  () => route.fullPath,
  () => {
    showMobileMenu.value = false;
  }
);

onMounted(() => {
  getUserId();
});

provide("showMobileMenu", showMobileMenu);
provide("toggleMobileMenu", toggleMobileMenu);

const handleLogout = async () => {
  // Xử lý đăng xuất
  await authStore.logout();
  router.push("/login");
};
</script>

<style>
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}

/* Ensure proper z-index layering */
.relative {
  position: relative;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>