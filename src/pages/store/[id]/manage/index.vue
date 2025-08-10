<template>
  <div class="max-w-screen-lg mx-auto px-4">

    <div class="grid grid-cols-[50%_50%]">
      <!-- Quản lý đơn hàng -->
      <NuxtLink :to='`/store/${id}/manage/management/order`'
        class="m-4 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-center border border-gray-200">
        <div class="text-xl font-semibold text-gray-800">Quản lý đơn hàng</div>
        <div class="text-4xl text-blue-600 font-bold mb-2">{{ pendingOrderCount }}</div>
        <div class="text-gray-600 text-sm mb-3">đơn hàng cần xử lý</div>
      </NuxtLink>

      <!-- Quản lý sản phẩm -->
  
      <NuxtLink :to='`/store/${id}/manage/management/product`'
        class="m-4 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-center border border-gray-200">
        <div class="text-xl font-semibold text-gray-800">Quản lý sản phẩm</div>
        <div class="text-4xl text-green-600 font-bold mb-2">{{ products.length }}</div>
        <div class="text-gray-600 text-sm mb-3">sản phẩm trong gian hàng</div>
      </NuxtLink>
    </div>

    <!-- Phần hiển thị các sản phẩm có trong cửa hàng -->

    <div class="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="(product, index) in products" :key="index"
        class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
        <div v-for="(image, i) in product.images.filter(img => img.loaiAnh === 'DAIDIEN')" :key="i"
          class="h-52 bg-gray-200">
          <img :src="image.url" alt="Product" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-medium mb-2 line-clamp-2 h-14">
            {{ product.tenSP }}
          </h3>
          <div class="text-xl font-bold text-blue-600 mb-2"></div>
          <div class="text-sm text-gray-500 mb-4">
            Còn lại: {{ product.soLuong }} sản phẩm
          </div>
          <div class="flex space-x-2">
            <button @click="showProductDetails(product)"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition duration-300">
              Chi tiết
            </button>
            <button @click="updateProduct(product)"
              class="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md px-4 py-2 rounded-md font-medium transition duration-300">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProductSellerDetails :is-visible="isProductDetailsVisible" :product="selectedProduct" @close="closeProductModal"
    @add-to-cart="handleAddToCartFromModal" />

  <Pagination v-if="totalPages > 1" class="my-6" :currentPage="currentPage" :totalPages="totalPages" @page-change="handlePageChange" />
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
        size: 4,
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

  console.log(id.value)
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

<style></style>