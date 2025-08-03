<template>
  <!-- Banner -->
  <div class="relative bg-gray-100 h-96 overflow-hidden">
    <div class="flex transition-transform duration-500 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(slide, index) in bannerSlides" :key="index" class="min-w-full h-full relative">
        <!-- Hình ảnh banner -->
        <img :src="slide.image" alt="Banner" class="w-full h-full object-cover" />

        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <div class="absolute bottom-16 left-16 max-w-lg text-white">
          <h2 class="text-3xl font-bold mb-3 text-shadow-lg">
            {{ slide.title }}
          </h2>
          <p class="text-lg mb-5 text-shadow-md">{{ slide.description }}</p>
        </div>
      </div>
    </div>

    <!-- Slider Navigation -->
    <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button v-for="(_, index) in bannerSlides" :key="index" @click="currentSlide = index" :class="[
        'w-3 h-3 rounded-full transition-colors duration-300',
        currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50',
      ]"></button>
    </div>
  </div>

  <main class="max-w-screen-lg mx-auto px-4">
    <!-- Danh Mục Sản Phẩm -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-center mb-8 relative pb-3">
        Danh Mục Sản Phẩm
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-600 to bg-blue-600"></span>
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="(category, index) in categories" :key="index"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
          <NuxtLink to="categories">
            <h3 class="text-lg font-medium text-center py-4">
              {{ category.ten_NH }}
            </h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-center mb-8 relative pb-3">
        Sản Phẩm Nổi Bật
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-600 to bg-blue-600"></span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                class="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md px-4 py-2 rounded-md font-medium transition duration-300">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <Pagination v-if="totalPages > 1" class="my-6" :currentPage="currentPage" :totalPages="totalPages"
    @page-change="fetchProducts" />

  <!-- Modal sản phẩm -->
  <ProductModal :is-visible="isProductModalVisible" :product="selectedProduct" @close="closeProductModal"
    @add-to-cart="handleAddToCartFromModal" />

  <Modal :show="showModal" :type="modalType" :title="titleModal" :message="message" :confirmText="confirmText"
    @confirm="handleConfirm()" @cancel="showModal = false" @close="showModal = false" />
</template>

<script setup>
const currentSlide = ref(0);
const isProductModalVisible = ref(false);
const selectedProduct = ref(null);
const { $api } = useNuxtApp();
const authStore = useAuthStore();
const products = ref([]);

const userId = ref(null);
const router = useRouter();
let slideInterval;
const cartStore = useCartStore();
const cartId = ref(null);

const currentPage = ref(0);
const totalPages = ref(1);

const fetchProducts = async (page) => {
  try {
    const response = await $api.get(`/products/search`, {
      params: {
        tenSP: query,
        page: page,
        size: 8,
      },
    });
    currentPage.value = response.data.number;
    totalPages.value = response.data.totalPages;
    products.value = response.data.content;
  } catch (error) {
    showModalConfirm(error.response.data)
  }
};

const bannerSlides = ref([
  {
    image: "newproduct2.jpg",
    title: "Sản phẩm mới",
    description: "Khám phá những sản phẩm mới",
    buttonText: "Xem ngay",
  },
  {
    image: "shipping.jpg",
    title: "Miễn phí vận chuyển",
    description: "Miễn phí vận chuyển cho đơn hàng cho sinh viên",
    buttonText: "Tìm hiểu thêm",
  },
]);

const getUserId = async () => {
  await authStore.loadUser();
  userId.value = authStore.user.mssv;
  cartId.value = authStore.user.idGioHang;
};

onMounted(async () => {
  await getUserId();
  startAutoSlide();
  getProduct();
  // getCategories();
});

const getProduct = async () => {
  try {
    console.log(authStore.user.maGHDT);
    const response = (
      await $api.get(`/products/all/${authStore.user.maGHDT}`, {
        params: {
          page: 0,
          size: 8,
        },
      })
    ).data;
    console.log(response);
    const data = await response.content;
    products.value = data;
  } catch (error) {
    showModalConfirm(error.response.data)
  }
};

const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % bannerSlides.value.length;
  }, 5000);
};

// Stop auto slide
const stopAutoSlide = () => {
  clearInterval(slideInterval);
};

const handleAddToCartFromModal = (data) => {
  addToCart(data.product, data.variant, data.quantity);
};

const showProductDetails = (product) => {
  selectedProduct.value = product;
  isProductModalVisible.value = true;
};

const addToCart = async (product, variant = null, quantity = 1) => {
  try {
    const itemId = {
      idGioHang: cartId.value,
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

const closeProductModal = () => {
  isProductModalVisible.value = false;
};

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

</script>

<style>
.text-shadow-lg {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5);
}

.text-shadow-md {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}
</style>