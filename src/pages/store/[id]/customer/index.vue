<template>
  <div class="grid grid-cols-[30%_70%] min-h-screen">
    <!-- Hiển thị thông tin của người dùng này -->
    <div class=" shrink-0 bg-white shadow-md">
      <div class="p-6 m-4 bg-gray-200 rounded-2xl shadow-lg sticky top-20">
        <!-- Avatar + Tên -->
        <div class="flex flex-col items-center space-y-4 ">
          <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow 
         flex items-center justify-center bg-gray-100">
            <svg v-if="!user.image" xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-400"
              fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5v1.5c0 .6.4 1.5 1.5 1.5h15c1.1 0 1.5-.9 1.5-1.5V18c0-3-6-4.5-9-4.5z" />
            </svg>
            <img v-else :src="user.image.url" alt="User Avatar" class="w-full h-full object-cover">

          </div>

          <h2 class="text-xl font-bold text-gray-800">{{ user.hoTen }}</h2>
          <p class="text-sm text-gray-500">MSSV: {{ user.mssv }}</p>
        </div>

        <!-- Thông tin chi tiết -->
        <div class="mt-6 space-y-3 text-sm text-gray-700">
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">Số điện thoại:</span>
            <span>{{ user.sdt }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">Lớp:</span>
            <span>{{ user.lop }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">Khóa:</span>
            <span>K{{ user.khoa }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">Ngày sinh:</span>
            <span>{{ formatNgaySinh(user.ngaySinh) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">Giới tính:</span>
            <span>{{ user.gioiTinh }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">Trạng thái:</span>
            <span>{{ user.trangThai }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hiển thị các sản phẩm và mô tả cửa hàng của người dùng này -->
    <div class=" flex-1 overflow-y-auto p-6 bg-gray-50 m-4">
      <section class="mb-12">
        <div v-if="products.length === 0" class="text-center text-gray-500">
          Không có sản phẩm nào để hiển thị.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="(product, index) in products" :key="index"
            class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
            <div v-for="(image, i) in product.images.filter(
              (img) => img.loaiAnh === 'DAIDIEN'
            )" :key="i" class="h-52 bg-gray-200">
              <img :src="image.url" alt="Product" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="text-lg font-medium mb-2 line-clamp-2 h-14">
                {{ product.tenSP }}
              </h3>
              <div class="text-sm text-gray-600 font-medium mb-1">
                Người bán: <span class="text-blue-600 font-semibold">{{ product.hoTen }}</span> <br>
                Mã số sinh viên: <span class="text-blue-600 font-semibold">{{ product.mssv }}</span>
              </div>
              <div class="text-sm text-gray-500 mb-4">
                Còn lại: {{ product.soLuong }} sản phẩm
              </div>
              <div class="flex space-x-2">
                <button @click="showProductDetails(product)"
                  class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition duration-300">
                  Chi tiết
                </button>
                <button @click="addToCart(product)"
                  class="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md text-white px-4 py-2 rounded-md font-medium transition duration-300">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pagination v-if="totalPages > 1" class="my-6" :currentPage="currentPage" :totalPages="totalPages"
        @page-change="handlePageChange" />
      <ProductModal :is-visible="isProductModalVisible" :product="selectedProduct" @close="closeProductModal"
        @add-to-cart="handleAddToCartFromModal" />
    </div>
  </div>

  <Modal :show="showModal" :type="modalType" :title="titleModal" :message="message" :confirmText="confirmText"
    @confirm="handleConfirm()" @cancel="showModal = false" @close="showModal = false" />
</template>

<script setup>
definePageMeta({
  middleware: ["is-customer"],
});
const { $api } = useNuxtApp();
const route = useRoute();
const id = computed(() => route.params.id);
const authStore = useAuthStore();
const user = ref({});
const products = ref([]);
const currentPage = ref(0);
const totalPages = ref(1);
const isProductModalVisible = ref(false);
const selectedProduct = ref(null);
const userId = ref(null);

const showModal = ref(false);
const modalType = ref(null);
const titleModal = ref(null);
const message = ref(null);
const confirmText = ref(null);
const handleConfirm = ref();


const showModalConfirm = (element) => {
  switch (element.type) {
    case 'LIMITED': {
      handleConfirm.value = () => { showModal.value = false; };
      modalType.value = "warning";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'SUCCESS': {
      handleConfirm.value = () => { showModal.value = false; };
      modalType.value = "success";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
  }
}

const formatNgaySinh = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

const handleAddToCartFromModal = (data) => {
  addToCart(data.product, data.variant, data.quantity);
};

const getProducts = async () => {
  const response = (
    await $api.get(`students/store/customer/${id.value}`, {
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

const closeProductModal = () => {
  isProductModalVisible.value = false;
};

const showProductDetails = (product) => {
  selectedProduct.value = product;
  isProductModalVisible.value = true;
};
function handlePageChange(page) {
  currentPage.value = page;
  getProducts();
}

const addToCart = async (product, quantity = 1) => {
  try {
    userId.value = authStore.user.mssv;
    const itemId = {
      idGioHang: authStore.user.idGioHang,
      idSP: product.maSP,
    };

    const isInCart = (
      await $api.post(`/students/cart/byId/${userId.value}`, itemId)
    ).data;

    if (isInCart) {
      const data = {
        maSP: product.maSP,
        soLuong: isInCart.soLuong + quantity,
      };

      const response = (
        await $api.patch(`/students/cart/updateItem/${userId.value}`, data)
      ).data;
      showModalConfirm(response)
    } else {
      const data = {
        maSP: product.maSP,
        soLuong: quantity,
      };
      const response = (
        await $api.patch(`/students/cart/updateItem/${userId.value}`, data)
      ).data;
      await cartStore.fetchCartCount(userId.value, authStore.accessToken);
      showModalConfirm(response)
    }
  } catch (error) {
    showModalConfirm(error.response.data)
  }
};

onMounted(async () => {
  authStore.loadUser();

  user.value = await getUser(id.value);

  console.log(user.value);

  getProducts();
});
</script>