<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div class="max-w-7xl mx-auto px-4 py-8">
      
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Quản Lý Gian Hàng
        </h1>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Quản lý đơn hàng -->
        <NuxtLink :to='`/store/${id}/manage/management/order`'
          class="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="text-white/80 text-sm font-medium">Cần xử lý</div>
            </div>
            
            <div class="text-white">
              <div class="text-4xl font-bold mb-1">{{ pendingOrderCount }}</div>
              <div class="text-white/90 font-medium mb-4">Đơn hàng chờ xử lý</div>
              
              <div class="flex items-center text-white/80 text-sm">
                <span>Xem chi tiết</span>
                <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Quản lý sản phẩm -->
        <NuxtLink :to='`/store/${id}/manage/management/product`'
          class="group relative bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <div class="text-white/80 text-sm font-medium">Tổng số</div>
            </div>
            
            <div class="text-white">
              <div class="text-4xl font-bold mb-1">{{ products.length }}</div>
              <div class="text-white/90 font-medium mb-4">Sản phẩm trong gian hàng</div>
              
              <div class="flex items-center text-white/80 text-sm">
                <span>Quản lý sản phẩm</span>
                <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Products Section -->
      <div class="bg-white rounded-3xl p-8 shadow-lg">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Sản Phẩm Của Bạn</h2>
            <p class="text-gray-600">Danh sách các sản phẩm hiện có trong cửa hàng</p>
          </div>
          
          <div class="flex items-center space-x-2 text-sm text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"></path>
            </svg>
            <span>{{ products.length }} sản phẩm</span>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="(product, index) in products" :key="index"
            class="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            
            <!-- Product Image -->
            <div class="relative">
              <div v-for="(image, i) in product.images.filter(img => img.loaiAnh === 'DAIDIEN')" :key="i"
                class="h-52 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <img :src="image.url" alt="Product" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <!-- Overlay on hover -->
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <!-- Stock badge -->
              <div class="absolute top-3 left-3">
                <div class="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  Còn {{ product.soLuong }}
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-6">
              <h3 class="font-semibold text-gray-800 text-lg mb-3 line-clamp-2 h-14 leading-tight">
                {{ product.tenSP }}
              </h3>
              
              <div class="flex items-center text-sm text-gray-500 mb-6">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                {{ product.soLuong }} sản phẩm có sẵn
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button @click="showProductDetails(product)"
                  class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-md">
                  Chi tiết
                </button>
                <button @click="updateProduct(product)"
                  class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="products.length === 0" class="text-center py-16">
          <div class="mb-6">
            <svg class="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-medium text-gray-500 mb-2">Chưa có sản phẩm nào</h3>
          <p class="text-gray-400 mb-8">Hãy thêm sản phẩm đầu tiên của bạn để bắt đầu bán hàng</p>
          <NuxtLink :to='`/store/${id}/manage/management/product/add`'
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Thêm sản phẩm
          </NuxtLink>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center">
        <Pagination 
          class="bg-white rounded-2xl shadow-lg p-2" 
          :currentPage="currentPage" 
          :totalPages="totalPages" 
          @page-change="handlePageChange" 
        />
      </div>
    </div>

    <!-- Product Details Modal -->
    <ProductSellerDetails 
      :is-visible="isProductDetailsVisible" 
      :product="selectedProduct" 
      @close="closeProductModal"
      @add-to-cart="handleAddToCartFromModal" 
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['is-store-owner']
});

const pendingOrderCount = ref(0);
const isProductDetailsVisible = ref(false);
const route = useRoute()
const id = computed(() => route.params.id)
const user = ref({})
const router = useRouter()
const authStore = useAuthStore();
const products = ref([])
const {$api} = useNuxtApp();
const selectedProduct = ref(null);
const currentPage = ref(0);
const totalPages = ref(1);

const fetchPendingOrders = async () => {
  try {
    const response = await $api.get(`subOrders/XacNhanById/${user.value.maGHDT}?page=0&size=1000`);
    pendingOrderCount.value = response.data?.totalElements || 0;
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
  }
};

const getProducts = async () => {
  const response = (
    await $api.get(`students/store/seller/${id.value}`, {
      params: {
        page: currentPage.value,
        size: 8, // Tăng số lượng sản phẩm hiển thị
      },
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    })
  ).data.products;

  if (response) {
    currentPage.value = response.pageable.pageNumber;
    totalPages.value = response.totalPages;
    products.value = response.content;
  }
};

function handlePageChange(page) {
  currentPage.value = page;
  getProducts();
}

const updateProduct = (product) => {
  router.push({
    path: `/store/${id.value}/manage/management/product/update`,
    query: { maSP: product.maSP }
  });
}

const showProductDetails = (product) => {
  selectedProduct.value = product;
  isProductDetailsVisible.value = true;
};

const closeProductModal = () => {
  isProductDetailsVisible.value = false;
};

onMounted(async () => {
  await authStore.loadUser();
  user.value = authStore.user;

  if (user.value) {
    getProducts();
    fetchPendingOrders();
  }
})
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>