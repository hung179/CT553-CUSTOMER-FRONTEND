<template>

   <div class="max-w-screen-lg mx-auto px-4 h-full">

      <!-- Thanh chuyển đổi tìm sản phẩm hoặc người dùng -->
      <div class="flex justify-center w-full">
         <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 my-6 flex space-x-2 shadow-lg">

            <button @click="toggleSearchType"
               class="px-6 py-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none" :class="{
                  'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md': isProductSearch,
                  'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700': !isProductSearch
               }">
               Sản phẩm
            </button>

            <button @click="toggleSearchType"
               class="px-6 py-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none" :class="{
                  'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md': !isProductSearch,
                  'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700': isProductSearch
               }">
               Người dùng
            </button>

         </div>
      </div>

      <!-- isProductSearch === true -->
      <div v-if="isProductSearch">
         <section class="mb-12">
            <h2 class="text-2xl font-bold text-center mb-8 relative pb-3">
               Tìm kiếm sản phẩm
               <span
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-600 to bg-blue-600"></span>
            </h2>
            <div v-if="searchResults.length === 0" class="text-center text-gray-500">
               Không tìm thấy sản phẩm nào.
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               <div v-for="(product, index) in searchResults" :key="index"
                  class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition duration-300">
                  <div v-for="(image, i) in product.images.filter(img => img.loaiAnh === 'DAIDIEN')" :key="i"
                     class="h-52 bg-gray-200">
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

      </div>

      <!-- isProductSearch === false -->
      <div v-else>
         <section class="mb-12">
            <h2 class="text-2xl font-bold text-center mb-8 relative pb-3">
               Tìm kiếm người dùng
               <span
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-600 to bg-blue-600"></span>
            </h2>

            <div v-if="searchResults.length === 0" class="text-center text-gray-500">
               Không tìm thấy người dùng nào.
            </div>

            <div v-for="(user, index) in searchResults" :key="index"
               class=" flex items-center justify-start bg-gray-100 rounded-md shadow-lg p-6 my-4 space-x-6 "
               @click="goToStore(user.mssv)">
               <!-- Ảnh đại diện bên trái -->
               <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg v-if="!user.image" xmlns="http://www.w3.org/2000/svg" class="rounded-full w-16 h-16 text-gray-400"
                     fill="currentColor" viewBox="0 0 24 24">
                     <path
                        d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5v1.5c0 .6.4 1.5 1.5 1.5h15c1.1 0 1.5-.9 1.5-1.5V18c0-3-6-4.5-9-4.5z" />
                  </svg>
                  <img v-else :src="user.image.url" alt="User Avatar" class=" rounded-full w-full h-full object-cover">
               </div>


               <!-- Thông tin người dùng bên phải -->
               <div>
                  <h2 class="text-xl font-semibold">{{ user.hoTen }}</h2>
                  <p class="text-gray-600">Mã số sinh viên: {{ user.mssv }}</p>
                  <p class="text-gray-600">Số điện thoại: {{ user.sdt }}</p>
               </div>
            </div>
         </section>
      </div>

      <Pagination v-if="totalPages > 1" class="my-6" :currentPage="currentPage" :totalPages="totalPages"
         @page-change="handlePageChange" />
   </div>
   <ProductModal :is-visible="isProductModalVisible" :product="selectedProduct" @close="closeProductModal"
      @add-to-cart="handleAddToCartFromModal" />

   <Modal :show="showModal" :type="modalType" :title="titleModal" :message="message" :confirmText="confirmText"
      @confirm="handleConfirm()" @cancel="showModal = false" @close="showModal = false" />
</template>

<script setup>

const route = useRoute();

const isProductSearch = ref(true);

const selectedProduct = ref(null);

const isProductModalVisible = ref(false);
const authStore = useAuthStore();
const userId = ref(null);
const { $api } = useNuxtApp();
const searchResults = ref([]);
const cartStore = useCartStore();
const cartId = ref(null);

const currentPage = ref(0)
const totalPages = ref(1)
const router = useRouter();

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

const goToStore = (mssv) => {

   (mssv === userId.value) ? router.push(`/store/${mssv}/manage`) :
      router.push(`/store/${mssv}/customer`)
}

function handlePageChange(page) {
   currentPage.value = page
   isProductSearch ? fetchProducts(page) : fetchUsers(page)
}


const toggleSearchType = () => {
   isProductSearch.value = !isProductSearch.value;
   if (isProductSearch.value) {
      currentPage.value = 0;
      fetchProducts(currentPage.value);
   } else {
      currentPage.value = 0;
      fetchUsers();
   }
}

const closeProductModal = () => {
   isProductModalVisible.value = false;
};

const showProductDetails = (product) => {
   selectedProduct.value = product;
   isProductModalVisible.value = true;
};

const handleAddToCartFromModal = (data) => {
   addToCart(data.product, data.variant, data.quantity);
};

const fetchProducts = async (page) => {
   try {
      console.log(authStore.user.maGHDT)
      const response = await $api.get(`/products/search/${authStore.user.maGHDT}`, {
         params: {
            tenSP: route.query.q,
            page: page,
            size: 8
         }
      });
      if (response) {
         currentPage.value = response.data.number;
         totalPages.value = response.data.totalPages;
         searchResults.value = response.data.content;
      }
   } catch (error) {
      showModalConfirm(error.response.data)
   }
};

const fetchUsers = async (page) => {
   try {
      const response = await $api.get(`/students/search`, {
         params: {
            tenSV: route.query.q,
            page: page,
            size: 8
         }
      });
      if (response) {
         currentPage.value = response.data.number;
         totalPages.value = response.data.totalPages;
         searchResults.value = response.data.content;
      }
   } catch (error) {
      showModalConfirm(error.response.data)
   }
};

const token = useCookie('access_token').value
const getUserId = async () => {

   authStore.loadUser()
   userId.value = authStore.user.mssv;
   cartId.value = authStore.user.idGioHang;
};

const addToCart = async (product, quantity = 1) => {
   try {
      const itemId = {
         idGioHang: cartId.value,
         idSP: product.maSP,
      };

      const isInCart = (await $api.post(`/students/cart/byId/${userId.value}`, itemId)).data;

      if (isInCart) {

         const data = {
            maSP: product.maSP,
            soLuong: isInCart.soLuong + quantity,

         };

         const response = (await $api.patch(`/students/cart/updateItem/${userId.value}`, data)).data;

      } else {

         const data = {
            maSP: product.maSP,
            soLuong: quantity,
         };
         const response = (await $api.patch(`/students/cart/updateItem/${userId.value}`, data)).data;
         await cartStore.fetchCartCount(userId.value, authStore.accessToken);
      }
   } catch (error) {
      showModalConfirm(error.response.data);
   }
};

onMounted(async () => {
   await getUserId();

   try {
      fetchProducts(currentPage.value);
   } catch (error) {
      showModalConfirm(error.response.data)
   }
}
);

watch(() => route.query.q, async (newQuery) => {
   if (newQuery) {
      if (!isProductSearch.value) {
         await fetchUsers(currentPage.value);
      } else {
         await fetchProducts(currentPage.value);
      }
   }
});

</script>

<style></style>