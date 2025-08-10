<template>
    <header class="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header chính -->
            <div class="flex items-center justify-between h-15">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <NuxtLink to="/" class="flex items-center space-x-2">
                        <div class="bg-white bg-opacity-20 rounded-full p-2">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                        </div>
                        <span class="text-white text-xl font-bold">SVienShop</span>
                    </NuxtLink>
                </div>

                <!-- Menu danh mục (Desktop) - Horizontal Dropdown -->
                <nav class="hidden lg:flex space-x-8">
                    <div class="relative group">
                        <button
                            class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium flex items-center space-x-1 transition-colors">
                            <span>Danh mục</span>
                            <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <!-- Horizontal dropdown menu -->
                        <div
                            class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                            <div class="flex divide-x divide-gray-200">
                                <div class="px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <NuxtLink to="/category/electronics"
                                        class="flex flex-col items-center text-center space-y-2">
                                        <div
                                            class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                            </svg>
                                        </div>
                                        <span class="text-sm font-medium text-gray-700">Điện tử</span>
                                    </NuxtLink>
                                </div>
                                <div class="px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <NuxtLink to="/category/fashion"
                                        class="flex flex-col items-center text-center space-y-2">
                                        <div
                                            class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                            <svg class="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                                            </svg>
                                        </div>
                                        <span class="text-sm font-medium text-gray-700">Thời trang</span>
                                    </NuxtLink>
                                </div>
                                <div class="px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <NuxtLink to="/category/home"
                                        class="flex flex-col items-center text-center space-y-2">
                                        <div
                                            class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700">Gia dụng</span>
                    </NuxtLink>
                </div>
                <div class="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <NuxtLink to="/category/books"
                        class="flex flex-col items-center text-center space-y-2">
                        <div
                            class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-yellow-600" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700">Sách</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</nav>

<!-- Thanh tìm kiếm -->
<div class="flex-1 max-w-lg mx-4">
    <div class="relative">
        <input v-model="searchQuery" type="text" placeholder="Tìm kiếm sản phẩm..."
            class=" w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            @keyup.enter="handleSearch">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
            </svg>
        </div>
    </div>
</div>

<!-- Giỏ hàng, Thông báo, Tài khoản -->
<div class="flex items-center space-x-2 lg:space-x-4">
    <!-- Thông báo -->
    <div class="relative">
        <button @click="toggleNotifications"
            class="text-white hover:text-gray-200 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span v-if="notificationCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {{ notificationCount }}
            </span>
        </button>

        <!-- Dropdown thông báo -->
        <div v-if="showNotifications"
            class="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
            <div class="py-2">
                <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <h3 class="text-sm font-semibold text-gray-900">Thông báo</h3>
                </div>
                <div class="max-h-64 overflow-y-auto">
                    <div v-for="notification in notifications" :key="notification.id"
                        class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                        <p class="text-sm text-gray-800">{{ notification.message }}</p>
                        <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Giỏ hàng với hover tooltip -->
    <div class="relative group">
        <NuxtLink to="/cart"
            class="text-white hover:text-white p-2 rounded-full hover:bg-gray-300 hover:bg-opacity-10 transition-all duration-200 block">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span v-if="cartStore.cartCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {{ cartStore.cartCount }}
            </span>
        </NuxtLink>
    </div>

    <!-- Mobile menu button -->
    <button @click="onClickMenu" data-mobile-menu-button
        class=" text-white hover:text-gray-200 p-2 rounded-full hover:bg-gray-300 hover:bg-opacity-10 transition-all duration-200">
        <div class="w-6 h-6" v-if="!showMobileMenu">
            <svg v-if="!user.image" xmlns="http://www.w3.org/2000/svg"
                class="rounded-full text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5v1.5c0 .6.4 1.5 1.5 1.5h15c1.1 0 1.5-.9 1.5-1.5V18c0-3-6-4.5-9-4.5z" />
            </svg>
            <img v-else :src="user.image.url" alt="User Avatar"
                class=" rounded-full w-full h-full object-cover">
        </div>
        <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
        </svg>
    </button>
</div>
</div>


</div>
</header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { inject } from 'vue'

// Reactive data
const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)
const notificationCount = ref(3)
const cartCount = ref(0)
const router = useRouter()
const route = useRoute()
const { $api } = useNuxtApp()
const authStore = useAuthStore()
const cartStore = useCartStore()
const user = ref({})

// Inject mobile menu state từ layout
const showMobileMenu = inject('showMobileMenu')
const toggleMobileMenu = inject('toggleMobileMenu')
const closeMobileMenu = inject('closeMobileMenu')

const onClickMenu = (e) => {
    e.stopPropagation()
    toggleMobileMenu()
    showNotifications.value = false
    showUserMenu.value = false
}

// Sample notifications data
const notifications = ref([
    {
        id: 1,
        message: 'Đơn hàng #12345 đã được giao thành công',
        time: '2 giờ trước'
    },
    {
        id: 2,
        message: 'Bạn có 1 coupon mới với giảm giá 20%',
        time: '1 ngày trước'
    },
    {
        id: 3,
        message: 'Sản phẩm trong wishlist đã có khuyến mãi',
        time: '2 ngày trước'
    }
])

// Methods
const handleSearch = () => {
    if (searchQuery.value.trim()) {
        // Thực hiện tìm kiếm hoặc navigate đến trang search
        navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    }
}

const toggleNotifications = (event) => {
    event.stopPropagation()
    showNotifications.value = !showNotifications.value
    showUserMenu.value = false
}

const toggleUserMenu = (event) => {
    event.stopPropagation()
    showUserMenu.value = !showUserMenu.value
    showNotifications.value = false
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
    // Kiểm tra nếu click không phải trên các element dropdown
    const isClickInsideNotifications = event.target.closest('[data-dropdown="notifications"]')
    const isClickInsideUserMenu = event.target.closest('[data-dropdown="user-menu"]')
    const isMobileMenuButton = event.target.closest('[data-mobile-menu-button]')
    const isMobileMenuContent = event.target.closest('[data-dropdown="mobile-menu"]')

    if (!isClickInsideNotifications) {
        showNotifications.value = false
    }

    if (!isClickInsideUserMenu) {
        showUserMenu.value = false
    }

    // Không đóng mobile menu từ đây nữa vì đã xử lý trong layout
}

const userId = ref('')

const getUserId = async () => {
    const token = authStore.accessToken

    if (token) {
        try {
            // Kiểm tra token
            const isActive = (await $api.post(`students/auth/introspect`, { token: token })).data

            if (isActive.valid) {
                userId.value = (await $api.get(`students/myInfo`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })).data.mssv

            } else {
                router.push('/login')
                console.log("User is not active")
            }
        } catch (error) {
            console.error("Error getting user ID:", error)
            router.push('/login')
        }
    } else {
        console.error("Không tìm thấy thông tin người dùng")
        router.push('/login')
    }
}

const countCartItem = async () => {
    try {
        const token = authStore.accessToken
        if (!token) {
            console.error("Không tìm thấy token người dùng")
            return
        }

        await getUserId()

        await cartStore.fetchCartCount(userId.value, token)
        cartCount.value = cartStore.cartCount
    } catch (error) {
        console.error("Lỗi khi lấy số lượng sản phẩm trong giỏ hàng:", error)
    }
}

// Watch route changes để reset mobile menu  
watch(
    () => route.fullPath,
    () => {
        // Reset mobile menu thông qua closeMobileMenu function
        closeMobileMenu()
        showNotifications.value = false
        showUserMenu.value = false
    }
)

onMounted(() => {
    countCartItem()
    document.addEventListener('click', handleClickOutside)

    authStore.loadUser()
    user.value = authStore.user
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom animations */
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
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
</style>