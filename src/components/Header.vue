<template>
    <header class="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header chính -->
            <div class="flex items-center justify-between h-15">
                <!-- Logo -->
                <div class="flex-shrink-0">
  <NuxtLink to="/" class="flex items-center space-x-2">
    <div class="bg-white bg-opacity-20 rounded-full p-2">
      <img
        src="~/assets/images/Logo.png"
        alt="Logo"
        class="w-6 h-6 object-contain"
      />
    </div>
    <span class="text-white text-xl font-bold">SVienShop</span>
  </NuxtLink>
</div>


                <!-- Menu danh mục (Desktop) - Enhanced Dropdown -->
                <nav class="hidden lg:flex space-x-8">
                    <div class="relative categories-dropdown group" @mouseenter="handleDropdownEnter" @mouseleave="handleDropdownLeave">
                        <button
                            class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium flex items-center space-x-1 transition-all duration-200 hover:bg-white/10 rounded-lg">
                            <span>Danh mục</span>
                            <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showCategoriesDropdown }" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        
                        <!-- Enhanced dropdown menu -->
                        <div
                            :class="[
                                'absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl transition-all duration-300 ease-out z-50 min-w-max border border-gray-100',
                                showCategoriesDropdown 
                                    ? 'opacity-100 visible translate-y-2 scale-100' 
                                    : 'opacity-0 invisible translate-y-0 scale-95'
                            ]"
                            @mouseenter="handleDropdownContentEnter" 
                            @mouseleave="handleDropdownContentLeave"
                        >
                            <!-- Loading state -->
                            <div v-if="categoriesLoading" class="px-8 py-6">
                                <div class="flex space-x-8" style="min-width: 700px;">
                                    <div v-for="n in 4" :key="n" class="flex flex-col items-center space-y-3 animate-pulse">
                                        <div class="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
                                        <div class="h-4 w-24 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Enhanced Categories grid -->
                            <div v-else-if="categories.length > 0" class="p-8">
                                <div class="grid grid-cols-4 gap-8" style="min-width: 700px; max-width: 900px;">
                                    <div 
                                        v-for="category in categories.slice(0, 8)" 
                                        :key="category.maDM"
                                        class="border border-gray-200 shadow-sm flex flex-col items-center p-4 hover:bg-gradient-to-br hover:from-green-50 hover:to-blue-50 transition-all duration-300 rounded-xl cursor-pointer category-item transform hover:scale-105 hover:shadow-lg"
                                        @click="navigateToCategory(category)"
                                    >
                                        
                                        <!-- Enhanced Category Name -->
                                        <span class="text-sm font-semibold text-gray-800 text-center category-name transition-colors line-clamp-2 leading-tight hover:text-green-600">
                                            {{ category.tenDM }}
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Enhanced View all categories button -->
                                <div class="mt-8 pt-6 border-t border-gray-100">
                                    <NuxtLink 
                                        to="/categories" 
                                        class="group flex items-center justify-center text-sm font-semibold text-green-600 hover:text-green-700 py-3 px-6 hover:bg-green-50 rounded-xl transition-all duration-200 transform hover:scale-105"
                                    >
                                        <span>Xem tất cả danh mục</span>
                                        <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </NuxtLink>
                                </div>
                            </div>

                            <!-- Enhanced Empty state -->
                            <div v-else class="px-8 py-12 text-center">
                                <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2-2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-500 font-medium">Không có danh mục nào</p>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Thanh tìm kiếm -->
                <div class="flex-1 max-w-lg mx-4">
                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="Tìm kiếm sản phẩm..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-sm"
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
                        class="text-white hover:text-gray-200 p-2 rounded-full hover:bg-gray-300 hover:bg-opacity-10 transition-all duration-200">
                        <div class="w-6 h-6" v-if="!showMobileMenu">
                            <svg v-if="!user.image" xmlns="http://www.w3.org/2000/svg" class="rounded-full text-white"
                                fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5v1.5c0 .6.4 1.5 1.5 1.5h15c1.1 0 1.5-.9 1.5-1.5V18c0-3-6-4.5-9-4.5z" />
                            </svg>
                            <img v-else :src="user.image.url" alt="User Avatar"
                                class="rounded-full w-full h-full object-cover">
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

// Categories data
const categories = ref([])
const categoriesLoading = ref(false)
const categoriesFetched = ref(false)
const showCategoriesDropdown = ref(false)
const dropdownTimeout = ref(null)

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

// Categories methods
const fetchCategories = async () => {
    if (categoriesFetched.value) return
    
    try {
        categoriesLoading.value = true
        const response = await $api.get('/categories/all')
        categories.value = response.data.content || response.data
        categoriesFetched.value = true
    } catch (error) {
        console.error('Lỗi khi tải danh mục:', error)
        categories.value = []
    } finally {
        categoriesLoading.value = false
    }
}

const handleDropdownEnter = () => {
    if (dropdownTimeout.value) {
        clearTimeout(dropdownTimeout.value)
        dropdownTimeout.value = null
    }
    
    if (!categoriesFetched.value) {
        fetchCategories()
    }
    
    showCategoriesDropdown.value = true
}

const handleDropdownLeave = () => {
    dropdownTimeout.value = setTimeout(() => {
        showCategoriesDropdown.value = false
    }, 100)
}

const handleDropdownContentEnter = () => {
    if (dropdownTimeout.value) {
        clearTimeout(dropdownTimeout.value)
        dropdownTimeout.value = null
    }
}

const handleDropdownContentLeave = () => {
    showCategoriesDropdown.value = false
}

const navigateToCategory = (category) => {
    showCategoriesDropdown.value = false
    navigateTo(`/categories/${category.maDM}`)
}

// Enhanced icon mapping function
const getCategoryIcon = (categoryName) => {
    const iconMap = {
        'Điện tử': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"',
        'Thời trang': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"',
        'Sách': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"',
        'Thể thao': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"',
        'Ẩm thực': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"',
        'Làm đẹp': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"',
        'Gia dụng': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"',
        'Xe cộ': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"',
        'default': 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"'
    }
    
    for (const [key, icon] of Object.entries(iconMap)) {
        if (categoryName.toLowerCase().includes(key.toLowerCase())) {
            return icon
        }
    }
    
    return iconMap.default
}

// Other methods (rest remain the same)
const handleSearch = () => {
    if (searchQuery.value.trim()) {
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

const handleClickOutside = (event) => {
    const isClickInsideNotifications = event.target.closest('[data-dropdown="notifications"]')
    const isClickInsideUserMenu = event.target.closest('[data-dropdown="user-menu"]')
    const isMobileMenuButton = event.target.closest('[data-mobile-menu-button]')
    const isMobileMenuContent = event.target.closest('[data-dropdown="mobile-menu"]')
    const isClickInsideCategories = event.target.closest('.categories-dropdown')

    if (!isClickInsideNotifications) {
        showNotifications.value = false
    }

    if (!isClickInsideUserMenu) {
        showUserMenu.value = false
    }
    
    if (!isClickInsideCategories) {
        showCategoriesDropdown.value = false
    }
}

const userId = ref('')

const getUserId = async () => {
    const token = authStore.accessToken

    if (token) {
        try {
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

watch(
    () => route.fullPath,
    () => {
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
    
    if (dropdownTimeout.value) {
        clearTimeout(dropdownTimeout.value)
    }
})
</script>

<style scoped>
/* Enhanced animations and transitions */
@keyframes slideDownFadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(8px) scale(1);
    }
}

.categories-dropdown .group:hover div[class*="opacity-0"] {
    animation: slideDownFadeIn 0.3s ease-out forwards;
}

/* Enhanced hover effects */
.category-item {
    position: relative;
    overflow: hidden;
}

.category-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 0.75rem;
}

.category-item:hover::before {
    opacity: 1;
}

.category-icon {
    position: relative;
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-item:hover .category-icon {
    background: linear-gradient(135deg, rgb(187, 247, 208), rgb(219, 234, 254));
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px -5px rgba(34, 197, 94, 0.3);
}

.category-name {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
}

.category-item:hover .category-name {
    color: rgb(34, 197, 94);
    transform: translateY(-1px);
    font-weight: 600;
}

/* Enhanced loading animation */
@keyframes shimmer {
    0% {
        background-position: -468px 0;
    }
    100% {
        background-position: 468px 0;
    }
}

.animate-pulse {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 400% 100%;
    animation: shimmer 1.5s infinite;
}

/* Line clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .grid-cols-4 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    
    div[style*="min-width: 700px"] {
        min-width: 500px !important;
        max-width: 650px !important;
    }
}

@media (max-width: 768px) {
    .grid-cols-4 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    
    div[style*="min-width: 700px"], 
    div[style*="min-width: 500px"] {
        min-width: 350px !important;
        max-width: 450px !important;
    }
    
    .category-icon {
        width: 3rem;
        height: 3rem;
    }
    
    .category-icon svg {
        width: 1.5rem;
        height: 1.5rem;
    }
}
</style>