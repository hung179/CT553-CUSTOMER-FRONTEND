<template>
  <!-- Banner Slider -->
  <div 
    class="relative mt-4 bg-gray-100 h-72 max-w-6xl mx-auto rounded-2xl overflow-hidden group banner-slider"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Slides Container -->
    <div class="flex transition-transform duration-700 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(slide, index) in bannerSlides" :key="index" class="min-w-full h-full relative">
        <!-- Hình ảnh banner -->
        <img 
          :src="slide.image" 
          :alt="slide.title" 
          class="w-full h-full object-cover transition-transform duration-700" 
          loading="lazy"
        />
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button 
      @click="previousSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 
             text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100
             backdrop-blur-sm hover:scale-110"
      aria-label="Previous slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button 
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 
             text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100
             backdrop-blur-sm hover:scale-110"
      aria-label="Next slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Slider Indicators -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
      <button 
        v-for="(slide, index) in bannerSlides" 
        :key="index" 
        @click="goToSlide(index)"
        :class="[
          'transition-all duration-300 rounded-full border-2 border-white/50',
          currentSlide === index 
            ? 'w-8 h-3 bg-white' 
            : 'w-3 h-3 bg-white/50 hover:bg-white/80',
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>

    <!-- Progress Bar -->
    <div class="absolute bottom-0 left-0 w-full h-1 bg-white/20">
      <div 
        class="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300"
        :style="{ width: `${slideProgress}%` }"
      ></div>
    </div>
  </div>

  <main class="max-w-screen-lg mx-auto px-4">
    <!-- Danh Mục Sản Phẩm -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-center mb-8 relative pb-3 mt-12">
        Danh Mục Sản Phẩm
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600"></span>
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="(category, index) in categories" :key="index"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <NuxtLink :to="`/categories/${category.maDM}`" class="block">
            <div class="p-6 text-center">
              <h3 class="text-lg font-medium text-gray-800 hover:text-green-600 transition-colors duration-300">
                {{ category.tenDM }}
              </h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Sản Phẩm Nổi Bật -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-center mb-8 relative pb-3">
        Sản Phẩm Nổi Bật
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600"></span>
      </h2>

      <!-- Loading skeleton khi đang tải -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
          <div class="h-52 bg-gray-300"></div>
          <div class="p-4">
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-3 bg-gray-300 rounded mb-1"></div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="(product, index) in products" :key="index"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
          
          <!-- Product Image -->
          <div class="h-52 bg-gray-200 overflow-hidden relative">
            <div v-for="(image, i) in product.images.filter(
              (img) => img.loaiAnh === 'DAIDIEN'
            )" :key="i" class="h-full">
              <img 
                :src="image.url" 
                :alt="product.tenSP" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                loading="lazy"
              />
            </div>
            
            <!-- Quick view button -->
            <button 
              @click="showProductDetails(product)"
              class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span class="bg-white text-gray-800 px-4 py-2 rounded-full font-medium">
                Xem nhanh
              </span>
            </button>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <h3 class="text-lg font-medium mb-2 line-clamp-2 h-14 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
              {{ product.tenSP }}
            </h3>

            <p class="text-lg font-semibold text-gray-800 mb-2">
              Giá: <span class="text-green-600">{{ formatPrice(product.giaSP) }}</span>
            </p>

            <div class="text-sm text-gray-600 font-medium mb-1">
              Người bán: <span class="text-blue-600 font-semibold">{{ product.hoTen }}</span> <br>
              Mã số sinh viên: <span class="text-blue-600 font-semibold">{{ product.mssv }}</span>
            </div>
            
            <div class="text-sm text-gray-500 mb-4 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Còn lại: {{ product.soLuong }} sản phẩm
            </div>

            <!-- Action buttons -->
            <div class="flex space-x-2">
              <button @click="showProductDetails(product)"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md">
                Chi tiết
              </button>
              <button @click="addToCart(product)"
                class="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-md px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                <span class="flex items-center justify-center">
                  Thêm vào giỏ
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && products.length === 0" class="text-center py-12">
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-gray-500 text-lg">Không có sản phẩm nào</p>
      </div>
    </section>
  </main>

  <!-- Pagination -->
  <Pagination 
    v-if="totalPages > 1" 
    class="my-6" 
    :currentPage="currentPage" 
    :totalPages="totalPages"
    @page-change="fetchProducts" 
  />

  <!-- Product Modal -->
  <ProductModal 
    :is-visible="isProductModalVisible" 
    :product="selectedProduct" 
    @close="closeProductModal"
    @add-to-cart="handleAddToCartFromModal" 
  />

  <!-- Notification Modal -->
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
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

// Banner slider states
const currentSlide = ref(0)
const slideInterval = ref(null)
const autoSlideDelay = 6000
const startTime = ref(Date.now())
const isHovered = ref(false)

// Product states
const isProductModalVisible = ref(false)
const selectedProduct = ref(null)
const products = ref([])
const categories = ref([])
const loading = ref(false)

// User & Cart states
const { $api } = useNuxtApp()
const authStore = useAuthStore()
const cartStore = useCartStore()
const userId = ref(null)
const cartId = ref(null)

// Pagination
const currentPage = ref(0)
const totalPages = ref(1)

// Modal states
const showModal = ref(false)
const modalType = ref(null)
const titleModal = ref(null)
const message = ref(null)
const confirmText = ref(null)
const handleConfirm = ref()

import banner1 from '@/assets/images/banner1.png'
import banner2 from '@/assets/images/banner2.png'


// Banner slides data
const bannerSlides = ref([
  {
    image: banner1,
    title: "Sản phẩm mới nhất",
    description: "Khám phá những sản phẩm dành cho sinh viên",
    action: "new-products"
  },
  {
    image: banner2,
    title: "Miễn phí vận chuyển",
    description: "Giao hàng miễn phí trong khuôn viên trường cho tất cả sinh viên",
    action: "shipping-info"
  }
])

// Computed properties
const slideProgress = computed(() => {
  if (!slideInterval.value) return 0
  const elapsed = Date.now() - startTime.value
  return Math.min((elapsed / autoSlideDelay) * 100, 100)
})

// Utility functions
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", { 
    style: "currency", 
    currency: "VND" 
  }).format(price)
}

// Banner slider methods
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bannerSlides.value.length
  resetTimer()
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? bannerSlides.value.length - 1 
    : currentSlide.value - 1
  resetTimer()
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetTimer()
}

const startAutoSlide = () => {
  if (slideInterval.value) clearInterval(slideInterval.value)
  startTime.value = Date.now()
  
  slideInterval.value = setInterval(() => {
    if (!isHovered.value) {
      nextSlide()
    }
  }, autoSlideDelay)
}

const stopAutoSlide = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
    slideInterval.value = null
  }
}

const resetTimer = () => {
  stopAutoSlide()
  startAutoSlide()
}

const handleMouseEnter = () => {
  isHovered.value = true
  stopAutoSlide()
}

const handleMouseLeave = () => {
  isHovered.value = false
  startAutoSlide()
}

const handleSlideAction = (slide) => {
  switch (slide.action) {
    case 'new-products':
      // Navigate to new products
      navigateTo('/products?filter=new')
      break
    case 'shipping-info':
      // Show shipping info modal or navigate
      console.log('Show shipping info')
      break
    case 'deals':
      // Navigate to deals
      navigateTo('/products?filter=deals')
      break
    default:
      break
  }
}

// Data fetching methods
const fetchProducts = async (page = 0) => {
  try {
    loading.value = true
    const response = await $api.get(`/products/all/${authStore.user.maGHDT}`, {
      params: {
        page: page,
        size: 8,
      },
    })
    
    currentPage.value = response.data.number
    totalPages.value = response.data.totalPages
    products.value = response.data.content
  } catch (error) {
    showModalConfirm(error.response?.data || { type: 'error', message: 'Lỗi tải sản phẩm' })
  } finally {
    loading.value = false
  }
}

const getProduct = async () => {
  try {
    loading.value = true
    const response = await $api.get(`/products/all/${authStore.user.maGHDT}`, {
      params: {
        page: 0,
        size: 8,
      },
    })
    const data = response.data
    products.value = data.content
    totalPages.value = data.totalPages
  } catch (error) {
    showModalConfirm(error.response?.data || { type: 'error', message: 'Lỗi tải sản phẩm' })
  } finally {
    loading.value = false
  }
}

const getUserId = async () => {
  await authStore.loadUser()
  userId.value = authStore.user.mssv
  cartId.value = authStore.user.idGioHang
}

// Product interaction methods
const showProductDetails = (product) => {
  selectedProduct.value = product
  isProductModalVisible.value = true
}

const closeProductModal = () => {
  isProductModalVisible.value = false
}

const addToCart = async (product, variant = null, quantity = 1) => {
  try {
    const itemId = {
      idGioHang: cartId.value,
      idSP: product.maSP,
    }

    const isInCart = await $api.post(`/students/cart/byId/${userId.value}`, itemId)

    if (isInCart.data) {
      const data = {
        maSP: product.maSP,
        soLuong: isInCart.data.soLuong + quantity,
      }
      const response = await $api.patch(`/students/cart/updateItem/${userId.value}`, data)
      showModalConfirm(response.data)
    } else {
      const data = {
        maSP: product.maSP,
        soLuong: quantity,
      }
      const response = await $api.post(`/students/cart/addItem/${userId.value}`, data)
      await cartStore.fetchCartCount(userId.value, authStore.accessToken)
      showModalConfirm(response.data)
    }
  } catch (error) {
    showModalConfirm(error.response?.data || { type: 'error', message: 'Lỗi thêm vào giỏ hàng' })
  }
}

const handleAddToCartFromModal = (data) => {
  addToCart(data.product, data.variant, data.quantity)
}

// Modal methods
const showModalConfirm = (element) => {
  switch (element.type) {
    case 'LIMITED':
      handleConfirm.value = () => { showModal.value = false }
      modalType.value = "warning"
      titleModal.value = "Thông báo"
      message.value = element.message
      confirmText.value = 'Xác nhận'
      showModal.value = true
      break
    case 'SUCCESS':
      handleConfirm.value = () => { showModal.value = false }
      modalType.value = "success"
      titleModal.value = "Thành công"
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

const getCategories = async () => {
  try {
    loading.value = true
    const response = await $api.get(`/categories/all`)
    categories.value = response.data.content
  } catch (error) {
    showModalConfirm(error.response?.data || { type: 'error', message: 'Lỗi tải danh mục' })
  } finally {
    loading.value = false
  }
}

// Touch/Swipe support for mobile
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      previousSlide()
    }
  }
}

// Lifecycle
onMounted(async () => {
  await getUserId()
  await startAutoSlide()
  await getProduct()

  await getCategories()
  // Add touch event listeners
  await nextTick()
  const bannerElement = document.querySelector('.banner-slider')
  if (bannerElement) {
    bannerElement.addEventListener('touchstart', handleTouchStart, { passive: true })
    bannerElement.addEventListener('touchend', handleTouchEnd, { passive: true })
  }
})

onUnmounted(() => {
  stopAutoSlide()
  
  // Remove touch event listeners
  const bannerElement = document.querySelector('.banner-slider')
  if (bannerElement) {
    bannerElement.removeEventListener('touchstart', handleTouchStart)
    bannerElement.removeEventListener('touchend', handleTouchEnd)
  }
})
</script>

<style scoped>
.text-shadow-lg {
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5);
}

.text-shadow-md {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner-slider {
  touch-action: pan-y;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .banner-slider .mx-16 {
    margin-left: 2rem;
    margin-right: 2rem;
  }
  
  .banner-slider h2 {
    font-size: 2rem;
  }
  
  .banner-slider p {
    font-size: 1rem;
  }
  
  .banner-slider button {
    padding: 0.75rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .banner-slider .mx-16 {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  
  .banner-slider h2 {
    font-size: 1.75rem;
  }
  
  .banner-slider .text-lg {
    font-size: 0.875rem;
  }
  
  .banner-slider button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #3b82f6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #2563eb);
}
</style>