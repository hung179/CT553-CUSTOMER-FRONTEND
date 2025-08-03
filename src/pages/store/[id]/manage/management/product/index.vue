<template>
  <section class="p-6 bg-white rounded-2xl shadow-md space-y-6">
    <h2 class="text-center text-2xl font-semibold text-gray-800">Quản lý sản phẩm</h2>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <!-- Thanh tìm kiếm -->
      <div class="w-full sm:w-2/3">
        <input v-model="searchQuery" type="text" placeholder="Tìm kiếm sản phẩm của cửa hàng"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>

      <!-- Nút thêm mới sản phẩm -->
      <div class="w-full sm:w-auto">
        <NuxtLink to="/store/B2110099/manage/management/product/add"
          class="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md px-6 py-3 rounded-md font-medium transition duration-300">
          + Thêm sản phẩm
        </NuxtLink>
      </div>
    </div>
  </section>
  <!-- Phần hiển thị sản phẩm -->

  <section class="my-4 p-6 bg-gray-100 rounded-2xl shadow-md">

    <div v-for="(product, index) in products" :key="index"
      class="my-4 flex items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300">
      <!-- Ảnh sản phẩm -->
      <div v-for="(image, i) in product.images.filter(img => img.loaiAnh === 'DAIDIEN')" :key="i">

        <img :src="image.url" alt="#" class="w-24 h-24 object-cover rounded-xl border" />
      </div>

      <!-- Nội dung sản phẩm -->
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-800">{{ product.tenSP }}</h3>
        <p class="text-sm text-gray-500 line-clamp-2 truncate w-full">{{ product.moTa.length > 50 ?
          product.moTa.slice(0, 50) + '...' : product.moTa }}</p>
      </div>

      <!-- Các nút chức năng -->
      <div class="flex gap-2">
        <button class="px-3 py-1 text-sm text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50"
          @click="updateProduct(product)">
          Sửa
        </button>
        <button v-if="product.daAn"
          class="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
          @click="showModalConfirm('show', product)">
          Hiện
        </button>
        <button class="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
          @click="(product.daAn ? showModalConfirm('delete', product) : showModalConfirm('hide', product))">
          {{ product.daAn ? "Xóa" : "Ẩn" }}
        </button>
      </div>
    </div>
    <Pagination v-if="totalPages > 1" class="my-6" :currentPage="currentPage" :totalPages="totalPages"
      @page-change="handlePageChange" />
  </section>

  <Modal :show="showModal" :type="modalType" :title="titleModal" :message="message" :confirmText="confirmText"
    @confirm="handleConfirm()" @cancel="showModal = false" @close="showModal = false" />


</template>

<script setup>
definePageMeta({
  middleware: ['is-store-owner']
});

const user = ref({})
const authStore = useAuthStore();
const currentPage = ref(0);
const totalPages = ref(1);
const products = ref([])
const { $api } = useNuxtApp();
const route = useRoute()
const id = computed(() => route.params.id)
const searchQuery = ref(null);
// Hiển thị modal thông báo
const showModal = ref(false);
const modalType = ref(null);
const titleModal = ref(null);
const message = ref(null);
const confirmText = ref(null);
const handleConfirm = ref();
const router = useRouter();

const showModalConfirm = (element, product) => {
  switch (element) {
    case 'hide': {
      handleConfirm.value = () => hideProduct(product);
      modalType.value = "warning";
      titleModal.value = "Ẩn sản phẩm";
      message.value = 'Bạn có chắc chắn muốn ẩn sản phẩm này ?';
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'delete': {
      handleConfirm.value = () => deleteProduct(product);
      modalType.value = "danger";
      titleModal.value = "Xóa sản phẩm";
      message.value = 'Bạn có chắc chắn muốn xóa sản phẩm này ?';
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'show': {
      handleConfirm.value = () => hideProduct(product);
      modalType.value = "confirm";
      titleModal.value = "Hiện sản phẩm";
      message.value = 'Bạn có chắc chắn muốn hiện sản phẩm này ?';
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
  }
}

function handlePageChange(page) {
  currentPage.value = page;
  getProducts();
}

const hideProduct = async (product) => {
  await authStore.loadUser();

  const response = (await $api.post(`products/disappear/${product.maSP}`, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  })
  )
  showModal.value = false;
  window.location.reload();
};

const updateProduct = (product) => {

  console.log(id.value)
  router.push({
  path: `/store/${id.value}/manage/management/product/update`,
  query: { maSP: product.maSP }
});
}

const deleteProduct = async (product) => {
  await authStore.loadUser();

  const response = (await $api.delete(`products/delete/${product.maSP}`, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  })
  )
  showModal.value = false;
  window.location.reload();
}

const getProducts = async () => {
  const response = (
    await $api.get(`students/store/seller/${id.value}`, {
      params: {
        page: currentPage.value,
        size: 8,
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

watch(searchQuery, async (newQuery) => {
  await fetchProducts(currentPage.value);
})

const fetchProducts = async (page) => {
  try {
    if (!searchQuery.value || searchQuery.value.trim() === '') {
      await getProducts();
    }
    else{
    const response = await $api.get(`/products/search/seller/${authStore.user.maGHDT}`, {
      params: {
        tenSP: searchQuery.value,
        page: page,
        size: 8
      }
    });
    if (response) {
      currentPage.value = response.data.number;
      totalPages.value = response.data.totalPages;
      products.value = response.data.content;
    }
  }
  } catch (error) {
    showModalConfirm(error.response.data)
  }
};

onMounted(async () => {
  await authStore.loadUser();

  user.value = authStore.user;

  if (user) {
    await getProducts();
  }
})

</script>

<style></style>