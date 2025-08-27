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

  <!-- Loading indicator -->
  <div v-if="loading" class="flex justify-center items-center p-8">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <span class="ml-2 text-gray-600">Đang tải...</span>
  </div>

  <!-- Phần hiển thị sản phẩm -->
  <section v-else class="my-4 p-6 bg-gray-100 rounded-2xl shadow-md">
    <div v-if="products.length === 0" class="text-center py-8 text-gray-500">
      Không có sản phẩm nào được tìm thấy
    </div>

    <div v-for="(product) in products" :key="product.maSP"
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
          @click="updateProduct(product)"
          :disabled="actionLoading">
          Sửa
        </button>
        <button v-if="product.daAn"
          class="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
          @click="showModalConfirm({type: 'show'}, product)"
          :disabled="actionLoading">
          Hiện
        </button>
        <button class="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
          @click="(product.daAn ? showModalConfirm({type: 'delete'}, product) : showModalConfirm({type: 'hide'}, product))"
          :disabled="actionLoading">
          {{ product.daAn ? "Xóa" : "Ẩn" }}
        </button>
      </div>
    </div>
    
    <Pagination v-if="totalPages > 1" class="my-6" :currentPage="currentPage" :totalPages="totalPages"
      @page-change="handlePageChange" />
  </section>

  <Modal :show="showModal" :type="modalType" :title="titleModal" :message="message" :confirmText="confirmText"
    @confirm="handleConfirm()" @cancel="showModal = false" @close="showModal = false" />

      <LoadingComponent
      :show="isLoading"
      :message="loadingMessage"
    />
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

const isLoading = ref(false);
const loadingMessage = ref('');

// Loading states
const loading = ref(false);
const actionLoading = ref(false);

// Notification system
const notification = ref({
  show: false,
  message: '',
  type: 'success' // 'success' or 'error'
});

// Hiển thị modal thông báo
const showModal = ref(false);
const modalType = ref(null);
const titleModal = ref(null);
const message = ref(null);
const confirmText = ref(null);
const handleConfirm = ref();
const router = useRouter();

// Show notification helper
const showNotification = (message, type = 'success') => {
  notification.value = {
    show: true,
    message,
    type
  };
  
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const showModalConfirm = (element, product) => {
  switch (element.type) {
    case 'hide': {
      handleConfirm.value = async () => {
        showModal.value = false;
        await hideProduct(product);
      };
      modalType.value = "warning";
      titleModal.value = "Ẩn sản phẩm";
      message.value = 'Bạn có chắc chắn muốn ẩn sản phẩm này ?';
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'delete': {
      handleConfirm.value = async () => {
        showModal.value = false;
        await deleteProduct(product);
      };
      modalType.value = "danger";
      titleModal.value = "Xóa sản phẩm";
      message.value = 'Bạn có chắc chắn muốn xóa sản phẩm này ?';
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'show': {
      handleConfirm.value = async () => {
        showModal.value = false;
        await showProduct(product);
      };
      modalType.value = "confirm";
      titleModal.value = "Hiện sản phẩm";
      message.value = 'Bạn có chắc chắn muốn hiện sản phẩm này ?';
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'ERROR': {
      handleConfirm.value = async () => { 
        showModal.value = false; 
        await refreshProducts();
      };
      modalType.value = "warning";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'SUCCESS': {
      handleConfirm.value = async () => {
        showModal.value = false;
        await refreshProducts();
       };
      modalType.value = "success";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
  }
}

function handlePageChange(page) {
  currentPage.value = page;
  fetchProducts(page);
}

// Refresh products list
const refreshProducts = async () => {
  loading.value = true;
  try {
    await fetchProducts(currentPage.value);
  } finally {
    loading.value = false;
  }
};

const hideProduct = async (product) => {
  actionLoading.value = true;
  try {
    await authStore.loadUser();

    await $api.post(`products/disappear/${product.maSP}`, {}, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    
    showModalConfirm({ type: 'SUCCESS', message: 'Sản phẩm đã được ẩn thành công!' });
    
  } catch (error) {
    console.error('Error hiding product:', error);
    showModalConfirm({ type: 'ERROR', message: 'Có lỗi xảy ra khi ẩn sản phẩm!' });
  } finally {
    actionLoading.value = false;
  }
};

const showProduct = async (product) => {
  actionLoading.value = true;
  try {
    await authStore.loadUser();

    await $api.post(`products/disappear/${product.maSP}`, {}, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    
    showModalConfirm({ type: 'SUCCESS', message: 'Sản phẩm đã được hiện thành công!' });
  } catch (error) {
    console.error('Error showing product:', error);
    showModalConfirm({ type: 'ERROR', message: 'Có lỗi xảy ra khi hiện sản phẩm!' });
  } finally {
    actionLoading.value = false;
  }
};

const updateProduct = (product) => {
  router.push({
    path: `/store/${id.value}/manage/management/product/update`,
    query: { maSP: product.maSP }
  });
}

const deleteProduct = async (product) => {
  isLoading.value = true;
  loadingMessage.value = 'Đang xóa sản phẩm...';
  try {
    await authStore.loadUser();

    const response = await $api.delete(`products/delete/${product.maSP}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    if(response){
      isLoading.value = false;
      loadingMessage.value = '';
      showModalConfirm({ type: 'SUCCESS', message: 'Sản phẩm đã được xóa thành công!' });
    
  }
  } catch (error) {
    console.error('Error deleting product:', error);
    showModalConfirm({ type: 'ERROR', message: 'Có lỗi xảy ra khi xóa sản phẩm!' });
  }
};

const getProducts = async () => {
  loading.value = true;
  try {
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
  } catch (error) {
    console.error('Error fetching products:', error);
    showNotification('Có lỗi xảy ra khi tải danh sách sản phẩm!', 'error');
  } finally {
    loading.value = false;
  }
};

// Debounced search function
let searchTimeout;
watch(searchQuery, async (newQuery) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    currentPage.value = 0; // Reset to first page when searching
    await fetchProducts(0);
  }, 500); // 500ms delay
});

const fetchProducts = async (page) => {
  loading.value = true;
  try {
    if (!searchQuery.value || searchQuery.value.trim() === '') {
      const response = (
        await $api.get(`students/store/seller/${id.value}`, {
          params: {
            page: page,
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
    } else {
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
    showModalConfirm({ type: 'ERROR', message: 'Có lỗi xảy ra khi tải danh sách sản phẩm!' });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await authStore.loadUser();
  user.value = authStore.user;

  if (user.value) {
    await fetchProducts(0);
  }
});
</script>

<style></style>