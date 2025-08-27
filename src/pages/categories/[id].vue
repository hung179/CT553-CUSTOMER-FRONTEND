<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Category Header -->
    <div class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div v-if="categoryLoading" class="animate-pulse">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 bg-gray-200 rounded-xl"></div>
            <div>
              <div class="h-8 w-48 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        <div v-else-if="category" class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-center space-x-4 mb-6 lg:mb-0">
            
            <!-- Category Info -->
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ category.tenDM }}</h1>
              <p class="text-gray-600">
                <span class="font-medium">{{ totalProducts }}</span> sản phẩm có sẵn
              </p>
            </div>
          </div>
          
          <!-- Search and Filter -->
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <!-- Search Box -->
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Tìm kiếm trong danh mục..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
                @keyup.enter="performSearch"
                @input="debouncedSearch"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              
              <!-- Clear Search Button -->
              <button 
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Search Results Info -->
        <div v-if="isSearching && searchQuery" class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="text-blue-800">
              Tìm kiếm "<strong>{{ searchQuery }}</strong>" trong {{ category?.tenDM }} - 
              <span class="font-medium">{{ products.length }}</span> kết quả
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Products Loading -->
      <div v-if="productsLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
          <div class="h-52 bg-gray-300"></div>
          <div class="p-4">
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
            <div class="h-3 bg-gray-300 rounded mb-3 w-1/2"></div>
            <div class="flex space-x-2">
              <div class="flex-1 h-8 bg-gray-300 rounded"></div>
              <div class="flex-1 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="(product, index) in products" :key="product.maSP || index"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
          
          <!-- Product Image -->
          <div class="h-52 bg-gray-200 overflow-hidden relative">
            <div v-if="product.images && product.images.length > 0" class="h-full">
              <img 
                :src="product.images.find(img => img.loaiAnh === 'DAIDIEN')?.url || product.images[0]?.url" 
                :alt="product.tenSP" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                loading="lazy"
                @error="handleImageError"
              />
            </div>
            <div v-else class="h-full flex items-center justify-center bg-gray-100">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <!-- Quick view button -->
            <button 
              @click="showProductDetails(product)"
              class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span class="bg-white text-gray-800 px-4 py-2 rounded-full font-medium shadow-lg">
                Xem nhanh
              </span>
            </button>

            <!-- Product Badge (if on sale, new, etc.) -->
            <div v-if="product.isNew" class="absolute top-2 left-2">
              <span class="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">MỚI</span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <h3 class="text-lg font-medium mb-2 line-clamp-2 h-14 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
              {{ product.tenSP }}
            </h3>

            <p class="text-lg font-semibold text-gray-800 mb-2">
              <span class="text-green-600">{{ formatPrice(product.giaSP) }}</span>
            </p>

            <div class="text-sm text-gray-600 font-medium mb-1">
              <span class="text-blue-600 font-semibold">{{ product.hoTen }}</span>
              <br>
              <span class="text-xs text-gray-500">{{ product.mssv }}</span>
            </div>
            
            <div class="text-sm text-gray-500 mb-4 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Còn {{ product.soLuong }} sản phẩm
            </div>

            <!-- Action buttons -->
            <div class="flex space-x-2">
              <button @click="showProductDetails(product)"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md">
                Chi tiết
              </button>
              <button @click="addToCart(product)"
                :disabled="product.soLuong === 0"
                :class="[
                  'flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform',
                  product.soLuong === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg hover:scale-105'
                ]">
                <span class="flex items-center justify-center">
                  {{ product.soLuong === 0 ? 'Hết hàng' : 'Thêm vào giỏ' }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-3">
          {{ isSearching ? 'Không tìm thấy sản phẩm' : 'Chưa có sản phẩm' }}
        </h3>
        <p class="text-gray-500 mb-6 max-w-md mx-auto">
          {{ isSearching 
            ? `Không có sản phẩm nào khớp với từ khóa "${searchQuery}" trong danh mục này.`
            : 'Danh mục này chưa có sản phẩm nào. Hãy quay lại sau để khám phá những sản phẩm mới.'
          }}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            v-if="isSearching"
            @click="clearSearch"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Xem tất cả sản phẩm
          </button>
          <NuxtLink 
            to="/categories"
            class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors inline-block"
          >
            Xem danh mục khác
          </NuxtLink>
        </div>
      </div>

      <!-- Pagination -->
      <Pagination 
        v-if="totalPages > 1" 
        class="mt-12" 
        :currentPage="currentPage" 
        :totalPages="totalPages"
        @page-change="handlePageChange" 
      />
    </div>

    <!-- Related Categories -->
    <div v-if="relatedCategories.length > 0" class="bg-white border-t">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Danh mục liên quan</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <NuxtLink 
            v-for="relatedCategory in relatedCategories" 
            :key="relatedCategory.maDM"
            :to="`/categories/${relatedCategory.maDM}`"
            class="border border-gray-200 shadow-sm flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <span class="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors text-center line-clamp-2">
              {{ relatedCategory.tenDM }}
            </span>
          </NuxtLink>
        </div>
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
import { debounce } from 'lodash'

// Route and API
const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

// Stores
const authStore = useAuthStore()
const cartStore = useCartStore()

// Reactive data
const categoryId = computed(() => route.params.id)
const category = ref(null)
const categoryLoading = ref(false)
const products = ref([])
const productsLoading = ref(false)
const relatedCategories = ref([])

// Search and filter
const searchQuery = ref('')
const sortBy = ref('newest')
const isSearching = ref(false)

// Pagination
const currentPage = ref(0)
const totalPages = ref(1)
const totalProducts = ref(0)

// User data
const userId = ref(null)
const cartId = ref(null)

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

// Meta and head
useHead(() => ({
  title: `${category.value?.tenDM || 'Danh mục'} - SVienShop`,
  meta: [
    {
      name: 'description',
      content: `Khám phá các sản phẩm trong danh mục ${category.value?.tenDM || ''} được chia sẻ bởi cộng đồng sinh viên`
    }
  ]
}))

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
const fetchCategory = async (categoryId) => {
  try {
    categoryLoading.value = true
    // If we don't have a specific category endpoint, get all categories and find the one
    const response = await $api.get('/categories/all')
    const categories = response.data.content || response.data
    category.value = categories.find(cat => cat.maDM == categoryId)
    
    if (!category.value) {
      throw new Error('Category not found')
    }
  } catch (error) {
    console.error('Lỗi khi tải thông tin danh mục:', error)
    showModalConfirm({ type: 'error', message: 'Không thể tải thông tin danh mục' })
  } finally {
    categoryLoading.value = false
  }
}

const fetchProductsByCategory = async (categoryId, page = 0, sortOption = 'newest') => {
  try {
    productsLoading.value = true
    const response = await $api.get(`/products/categories/${authStore.user.maGHDT}`, {
      params: {
        maDM: categoryId,
        page: page,
        size: 12,
        sort: sortOption
      }
    })
    
    currentPage.value = response.data.number
    totalPages.value = response.data.totalPages
    totalProducts.value = response.data.totalElements
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
    totalProducts.value = response.data.totalElements
    products.value = response.data.content || []
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error)
    showModalConfirm({ type: 'error', message: 'Không thể tìm kiếm sản phẩm' })
    products.value = []
  } finally {
    productsLoading.value = false
  }
}

const fetchRelatedCategories = async () => {
  try {
    const response = await $api.get('/categories/all')
    const allCategories = response.data.content || response.data
    // Get random 6 categories excluding current one
    relatedCategories.value = allCategories
      .filter(cat => cat.maDM != categoryId.value)
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
  } catch (error) {
    console.error('Lỗi khi tải danh mục liên quan:', error)
    relatedCategories.value = []
  }
}

// Search and sort methods
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    clearSearch()
    return
  }
  
  searchProductsInCategory(categoryId.value, searchQuery.value.trim(), 0)
}

const debouncedSearch = debounce(() => {
  if (searchQuery.value.trim()) {
    performSearch()
  } else {
    clearSearch()
  }
}, 500)

const clearSearch = () => {
  searchQuery.value = ''
  isSearching.value = false
  fetchProductsByCategory(categoryId.value, 0, sortBy.value)
}

const handleSortChange = () => {
  currentPage.value = 0
  if (isSearching.value && searchQuery.value.trim()) {
    searchProductsInCategory(categoryId.value, searchQuery.value.trim(), 0)
  } else {
    fetchProductsByCategory(categoryId.value, 0, sortBy.value)
  }
}

const handlePageChange = (page) => {
  if (isSearching.value && searchQuery.value.trim()) {
    searchProductsInCategory(categoryId.value, searchQuery.value.trim(), page)
  } else {
    fetchProductsByCategory(categoryId.value, page, sortBy.value)
  }
  
  // Scroll to top of products section
  const productsSection = document.querySelector('.max-w-7xl')
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

// Utility methods
const handleImageError = (event) => {
  event.target.src = '/placeholder-image.jpg' // Fallback image
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

// Watch route changes
watch(() => route.params.id, async (newId, oldId) => {
  if (newId && newId !== oldId) {
    // Reset state
    searchQuery.value = ''
    isSearching.value = false
    currentPage.value = 0
    products.value = []
    
    // Fetch new data
    await fetchCategory(newId)
    await fetchProductsByCategory(newId)
    await fetchRelatedCategories()
  }
}, { immediate: true })

// Lifecycle
onMounted(async () => {
  try {
    await getUserId()
    
    if (categoryId.value) {
      await Promise.all([
        fetchCategory(categoryId.value),
        fetchProductsByCategory(categoryId.value),
        fetchRelatedCategories()
      ])
    }
  } catch (error) {
    console.error('Lỗi khi khởi tạo trang:', error)
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

/* Product card hover effects */
.group:hover .transform {
  transform: translateY(-8px);
}

.group:hover img {
  transform: scale(1.05);
}

/* Custom select styling */
select {
  background-image: none;
}

/* Search input focus effects */
input:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
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
@media (max-width: 768px) {
  .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-4 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 640px) {
  .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-4 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Button disabled styles */
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

button:disabled:hover {
  transform: none;
}
</style>