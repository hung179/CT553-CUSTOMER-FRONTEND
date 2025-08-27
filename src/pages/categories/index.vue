<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Danh Mục Sản Phẩm</h1>
        
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Categories Grid (Only show if no specific category is selected) -->
      <div v-if="!selectedCategory && !route.params.id" class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Tất Cả Danh Mục</h2>
        
        <!-- Categories Loading -->
        <div v-if="categoriesLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div v-for="n in 10" :key="n" class="bg-white rounded-xl p-6 shadow-sm animate-pulse">
            <div class="w-16 h-16 bg-gray-200 rounded-xl mx-auto mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mx-auto w-20"></div>
          </div>
        </div>

        <!-- Categories Grid -->
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div 
            v-for="category in categories" 
            :key="category.maDM"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 group"
            @click="selectCategory(category)"
          >
            
            
            <!-- Category Name -->
            <h3 class="text-center font-semibold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2">
              {{ category.tenDM }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Selected Category Header -->
      <div v-if="selectedCategory" class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <button 
              @click="goBackToCategories"
              class="flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại
            </button>
            
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-html="getCategoryIcon(selectedCategory.tenDM)" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ selectedCategory.tenDM }}</h2>
                <p class="text-gray-600">{{ products.length }} sản phẩm được tìm thấy</p>
              </div>
            </div>
          </div>
          
          <!-- Search in Category -->
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Tìm trong danh mục..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                @keyup.enter="searchInCategory"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <button 
              @click="searchInCategory"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div v-if="selectedCategory">
        <!-- Products Loading -->
        <div v-if="productsLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <div v-else class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2-2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Không có sản phẩm nào</h3>
          <p class="text-gray-500 mb-6">Chưa có sản phẩm nào trong danh mục này.</p>
          <button 
            @click="goBackToCategories"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Xem danh mục khác
          </button>
        </div>

        <!-- Pagination -->
        <Pagination 
          v-if="totalPages > 1" 
          class="my-8" 
          :currentPage="currentPage" 
          :totalPages="totalPages"
          @page-change="handlePageChange" 
        />
      </div>
    </div>

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
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

// Meta and head
useHead({
  title: 'Danh mục sản phẩm - SVienShop',
  meta: [
    {
      name: 'description',
      content: 'Khám phá các danh mục sản phẩm đa dạng được chia sẻ bởi cộng đồng sinh viên'
    }
  ]
})

// Route and API
const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

// Stores
const authStore = useAuthStore()
const cartStore = useCartStore()

// Reactive data
const categories = ref([])
const categoriesLoading = ref(false)
const selectedCategory = ref(null)
const products = ref([])
const productsLoading = ref(false)
const searchQuery = ref('')
const isSearching = ref(false)

// User data
const userId = ref(null)
const cartId = ref(null)

// Pagination
const currentPage = ref(0)
const totalPages = ref(1)

// Product modal
const isProductModalVisible = ref(false)
const selectedProduct = ref(null)

// Modal states
const showModal = ref(false)
const modalType = ref(null)
const titleModal = ref(null)
const message = ref(null)
const confirmText = ref(null)
const handleConfirm = ref()

// Utility functions
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", { 
    style: "currency", 
    currency: "VND" 
  }).format(price)
}

// Icon mapping function
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

// API methods
const fetchCategories = async () => {
  try {
    categoriesLoading.value = true
    const response = await $api.get('/categories/all')
    categories.value = response.data.content || response.data
  } catch (error) {
    console.error('Lỗi khi tải danh mục:', error)
    showModalConfirm({ type: 'error', message: 'Không thể tải danh sách danh mục' })
  } finally {
    categoriesLoading.value = false
  }
}

const fetchProductsByCategory = async (categoryId, page = 0) => {
  try {
    productsLoading.value = true
    const response = await $api.get(`/products/categories/${authStore.user.maGHDT}`, {
      params: {
        maDM: categoryId,
        page: page,
        size: 12
      }
    })
    
    currentPage.value = response.data.number
    totalPages.value = response.data.totalPages
    products.value = response.data.content || []
  } catch (error) {
    console.error('Lỗi khi tải sản phẩm theo danh mục:', error)
    showModalConfirm({ type: 'error', message: 'Không thể tải sản phẩm của danh mục này' })
    products.value = []
  } finally {
    productsLoading.value = false
  }
}

const searchProductsInCategory = async (categoryId, searchTerm, page = 0) => {
  try {
    productsLoading.value = true
    isSearching.value = true
    const response = await $api.get(`/products/categories/search/${authStore.user.maGHDT}`, {
      params: {
        maDM: categoryId,
        tenSP: searchTerm,
        page: page,
        size: 12
      }
    })
    
    currentPage.value = response.data.number
    totalPages.value = response.data.totalPages
    products.value = response.data.content || []
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error)
    showModalConfirm({ type: 'error', message: 'Không thể tìm kiếm sản phẩm' })
    products.value = []
  } finally {
    productsLoading.value = false
  }
}

// Navigation methods
const selectCategory = (category) => {
  selectedCategory.value = category
  searchQuery.value = ''
  isSearching.value = false
  currentPage.value = 0
  
  // Update URL
  router.push(`/categories/${category.maDM}`)
  
  // Fetch products for selected category
  fetchProductsByCategory(category.maDM)
}

const goBackToCategories = () => {
  selectedCategory.value = null
  products.value = []
  searchQuery.value = ''
  isSearching.value = false
  router.push('/categories')
}

const searchInCategory = () => {
  if (!searchQuery.value.trim()) {
    // If search is empty, load all products in category
    isSearching.value = false
    fetchProductsByCategory(selectedCategory.value.maDM, 0)
    return
  }
  
  searchProductsInCategory(selectedCategory.value.maDM, searchQuery.value.trim(), 0)
}

const handlePageChange = (page) => {
  if (isSearching.value && searchQuery.value.trim()) {
    searchProductsInCategory(selectedCategory.value.maDM, searchQuery.value.trim(), page)
  } else {
    fetchProductsByCategory(selectedCategory.value.maDM, page)
  }
}

// User and cart methods
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

// Watch route params for direct access
watch(() => route.params.id, async (newId) => {
  if (newId) {
    // Find category by ID
    if (categories.value.length === 0) {
      await fetchCategories()
    }
    
    const category = categories.value.find(cat => cat.maDM == newId)
    if (category) {
      selectedCategory.value = category
      await fetchProductsByCategory(category.maDM)
    }
  } else {
    selectedCategory.value = null
    products.value = []
  }
}, { immediate: true })

// Lifecycle
onMounted(async () => {
  await getUserId()
  await fetchCategories()
  
  // If there's a category ID in the route, select it
  if (route.params.id) {
    const category = categories.value.find(cat => cat.maDM == route.params.id)
    if (category) {
      selectedCategory.value = category
      await fetchProductsByCategory(category.maDM)
    }
  }
})
</script>

<style scoped>
/* Enhanced animations and transitions */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Loading animation */
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

/* Category card hover effects */
.group:hover .bg-gradient-to-br {
  background: linear-gradient(135deg, rgb(187, 247, 208), rgb(219, 234, 254));
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

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .w-64 {
    width: 100%;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .space-x-4 > :not([hidden]) ~ :not([hidden]) {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>