<template>
  <div class="max-w-screen-lg mx-auto px-4">
    <h1 class="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
    <!-- Giỏ hàng trống -->
    <div v-if="cartItems.length === 0" class="bg-white p-8 rounded-lg shadow text-center">
      <p class="text-xl mb-4">Giỏ hàng của bạn đang trống</p>
      <button @click="goShopping" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Tiếp tục mua sắm
      </button>
    </div>

    <!-- Giỏ hàng có sản phẩm -->
    <div v-else class="flex flex-col lg:flex-row gap-6">
      <!-- Danh sách sản phẩm -->
      <div class="lg:w-2/3">
        <div class="bg-white rounded-lg shadow mb-4">
          <div class="p-4 border-b flex items-center">
            <input type="checkbox" :checked="areAllSelected" @change="toggleSelectAll" class="mr-3 h-4 w-4" />
            <span class="font-medium">Chọn tất cả ({{ cartItems.length }} sản phẩm)</span>

            <button @click="showDeleteSelectedModal" :disabled="!hasSelectedItems"
              :class="`ml-auto ${hasSelectedItems ? 'text-red-500 hover:text-red-700' : 'text-gray-300 cursor-not-allowed'}`">
              Xóa đã chọn
            </button>
          </div>

          <!-- Từng sản phẩm -->
          <div v-for="(item, index) in cartItems" :key="index" class="border-b last:border-b-0">
            <div class="p-4 flex flex-col sm:flex-row items-start">
              <!-- Checkbox chọn sản phẩm -->
              <div class="flex items-center mb-3 sm:mb-0">
                <input type="checkbox" v-model="item.selected" class="mr-3 h-4 w-4" />

                <!-- Ảnh sản phẩm -->
                <div v-for="image in item.sanPham.images.filter(img => img.loaiAnh === 'DAIDIEN')" :key="image.idImg"
                  class="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  <div class="w-full h-full">
                    <img :src="image.url" :alt="item.sanPham.tenSP" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <!-- Thông tin sản phẩm -->
              <div class="flex-grow px-4">
                <h3 class="font-medium">{{ item.sanPham.tenSP }}</h3>

                <!-- Trọng lượng -->
                <div class="text-sm text-gray-500 mt-1">
                  Trọng lượng: {{ item.sanPham.trongLuong }}g
                </div>
              </div>

              <!-- Giá và số lượng -->
              <div class="flex flex-col items-end mt-3 sm:mt-0">
                <span class="font-medium text-red-600 mb-2">{{
                  formatPrice(item.sanPham.giaSP)
                }}</span>

                <!-- Điều chỉnh số lượng -->
                <div class="flex items-center border border-gray-300 rounded overflow-hidden w-fit">
                  <!-- Nút giảm -->
                  <button @click="decreaseQuantity(item)"
                    class="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg">
                    −
                  </button>

                  <!-- Ô nhập số lượng -->
                  <input v-model.number="item.soLuong" @change="updateQuantity(item)" type="number" min="1"
                    class="w-12 text-center border-x border-gray-300 py-1" />

                  <!-- Nút tăng -->
                  <button @click="increaseQuantity(item)"
                    class="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg">
                    +
                  </button>
                </div>


                <!-- Nút xóa -->
                <button @click="showDeleteModal(item)" class="text-red-500 hover:text-red-700 mt-3">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tổng thanh toán -->
      <!-- <div class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 class="text-lg font-bold mb-4">Tổng thanh toán</h2>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between">
                <span>Tổng sản phẩm:</span>
                <span>{{ selectedItemsTotalQuantity }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tạm tính:</span>
                <span>{{ formatPrice(selectedItemsTotalPrice) }}</span>
              </div>
            </div>

            <div class="border-t pt-3 mt-3">
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold">Thành tiền:</span>
                <span class="text-xl font-bold text-red-600">{{
                  formatPrice(selectedItemsTotalPrice)
                }}</span>
              </div>

              <button @click="checkout" :disabled="!hasSelectedItems"
                :class="`w-full py-3 rounded font-medium ${hasSelectedItems ? 'bg-emerald-400 hover:bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`">
                Thanh toán
              </button>
            </div>
          </div>
        </div> -->
    </div>

    <!-- Modal xác nhận xóa sản phẩm -->
    <Teleport to="body">
      <div v-if="deleteModal.show"
        class="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-medium mb-4">Xác nhận xóa</h3>
          <p>
            Bạn có chắc chắn muốn xóa
            {{ deleteModal.multiple ? "các sản phẩm đã chọn" : "sản phẩm này" }}
            khỏi giỏ hàng?
          </p>
          <div class="mt-6 flex justify-end">
            <button @click="deleteModal.show = false"
              class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md mr-2">
              Hủy
            </button>
            <button @click="confirmDelete" class="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal thông báo số lượng không đủ -->
    <!-- <Teleport to="body">
        <div v-if="quantityModal.show"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 class="text-lg font-medium mb-4">Số lượng không đủ</h3>
            <p>
              Sản phẩm
              <span class="font-medium">{{ quantityModal.productName }}</span> hiện
              chỉ còn {{ quantityModal.availableQuantity }} sản phẩm.
            </p>
            <div class="mt-6 flex justify-end">
              <button @click="adjustQuantity"
                class="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md mr-2">
                Điều chỉnh số lượng
              </button>
              <button @click="quantityModal.show = false"
                class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md">
                Đóng
              </button>
            </div>

          </div>

        </div>
      </Teleport> -->
    <!-- </ClientOnly> -->
  </div>
  <!-- <Checkout :show="isCheckoutModalVisible" :products="cartItems.filter((item) => item.selected)" :userId="userId"
    @close="isCheckoutModalVisible = false" @order-success="handleOrderSuccess" @notification="handleNotification" /> -->
  <Modal :show="showModal" :type="modalType" :title="titleModal" :message="message" :confirmText="confirmText"
    @confirm="handleConfirm()" @cancel="showModal = false" @close="showModal = false" />
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";

// ID của khách hàng hiện tại - lấy từ auth store
const { $api } = useNuxtApp();
const authStore = useAuthStore();
const router = useRouter();
// State của trang giỏ hàng
const cartItems = ref([]);
const isLoading = ref(false);
const cartStore = useCartStore();
const deleteModal = reactive({
  show: false,
  multiple: false,
  itemToDelete: null,
});
const quantityModal = reactive({
  show: false,
  productName: "",
  availableQuantity: 0,
  itemToAdjust: null,
});

const showModal = ref(false);
const modalType = ref(null);
const titleModal = ref(null);
const message = ref(null);
const confirmText = ref(null);
const handleConfirm = ref();

const showModalConfirm = (element, item) => {
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
    case 'HIDED': {
      handleConfirm.value = async () => {
        if(item.sanPham){
          cartItems.value = cartItems.value.filter(
            (itemCart) =>
            !(
              itemCart.maSP === item.sanPham.maSP
            )
          );}
          const response = await ($api.delete(`students/cart/delete/${userId.value}`, {
            data: {
              idGioHang: authStore.user.idGioHang,
              idSP: item.sanPham.maSP,
            }
          }))

          showModal.value = false;

      };
      modalType.value = "warning";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
  }
}


const goShopping = () => {
  router.push("/");
};

// Computed properties
const hasSelectedItems = computed(() => cartItems.value.some((item) => item.selected));

const areAllSelected = computed(
  () => cartItems.value.length > 0 && cartItems.value.every((item) => item.selected)
);


// const selectedItemsTotalQuantity = computed(() =>
//   cartItems.value
//     .filter((item) => item.selected)
//     .reduce((total, item) => total + item.soLuong_GH, 0)
// );

// const selectedItemsTotalPrice = computed(() =>
//   cartItems.value
//     .filter((item) => item.selected)
//     .reduce(
//       (total, item) => total + item.soLuong_GH * item.thongTinSanPham.ttBanHang_SP.giaBan_BH,
//       0
//     )
// );

// Format giá tiền theo định dạng VND
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

// Chọn/bỏ chọn tất cả sản phẩm
function toggleSelectAll() {
  const newValue = !areAllSelected.value;
  cartItems.value.forEach((item) => {
    item.selected = newValue;
  });
}

// // Tăng số lượng sản phẩm
function increaseQuantity(item) {
  item.soLuong++;
  updateQuantity(item);
}

// // Giảm số lượng sản phẩm
function decreaseQuantity(item) {
  item.soLuong--;
  updateQuantity(item);
}

// Cập nhật số lượng và kiểm tra hàng tồn kho
async function updateQuantity(item) {
  // Đảm bảo số lượng ít nhất là 1
  if (item.soLuong <= 0) {
    item.soLuong = 0;
  }

  try {
    // Gọi API để cập nhật số lượng sản phẩm trong giỏ hàng
    await $api.patch(`students/cart/updateItem/${userId.value}`, {
      maSP: item.sanPham.maSP,
      soLuong: item.soLuong,
    });
    window.location.reload();
  } catch (error) {
    showModalConfirm(error.response.data, item)
    item.soLuong = item.sanPham.soLuong
  }
}

// Hiển thị modal xác nhận xóa 1 sản phẩm
const showDeleteModal = (item) => {
  deleteModal.itemToDelete = item;
  deleteModal.multiple = false;
  deleteModal.show = true;
}

// // Hiển thị modal xác nhận xóa nhiều sản phẩm
function showDeleteSelectedModal() {
  if (!hasSelectedItems.value) return;

  deleteModal.multiple = true;
  deleteModal.show = true;
}

// Xác nhận xóa sản phẩm
async function confirmDelete() {
  try {
    let products = [];

    if (deleteModal.multiple) {
      // Xóa nhiều sản phẩm đã chọn
      products = cartItems.value
        .filter((item) => item.selected)
        .map((item) => ({
          maSP: item.sanPham.maSP,
          soLuong: 0,
        }));

      // Cập nhật UI - loại bỏ sản phẩm đã chọn
      cartItems.value = cartItems.value.filter((item) => !item.selected);
    } else if (deleteModal.itemToDelete) {
      // Xóa 1 sản phẩm
      products = [
        {
          maSP: deleteModal.itemToDelete.sanPham.maSP,
          soLuong: 0,
        },
      ];
      // Cập nhật UI - loại bỏ sản phẩm đã xóa
      cartItems.value = cartItems.value.filter(
        (item) =>
          !(
            item.maSP === deleteModal.itemToDelete.sanPham.maSP
            // &&
            // item.soLuong === deleteModal.itemToDelete.soLuong
          )
      );
    }

    // Gọi API để xóa sản phẩm
    if (products.length > 0) {
      for (const item of products) {
        try {
          const response = await $api.patch(`students/cart/updateItem/${userId.value}`, item);
          await cartStore.fetchCartCount(userId.value, authStore.accessToken);
          showModalConfirm(response.data);
        } catch (error) {
          showModalConfirm(error.response?.data,  {sanPham : { maSP: item.maSP } });
        }
      }
    }
  } catch (error) {
    showModalConfirm(error.response.data)
  } finally {
    deleteModal.show = false;
  }
}

// Tiến hành thanh toán
// function checkout() {
//   if (!hasSelectedItems.value) return;

//   // Hiển thị modal thanh toán
//   isCheckoutModalVisible.value = true;
// }

// Thêm state quản lý hiển thị modal checkout
const isCheckoutModalVisible = ref(false);

// Xử lý khi đặt hàng thành công
// function handleOrderSuccess(orderData) {
//   // Cập nhật UI - loại bỏ sản phẩm đã đặt hàng khỏi giỏ hàng
//   cartItems.value = cartItems.value.filter((item) => !item.selected);

//   if (orderData.orderId) {
//     navigateTo(`/orders/${orderData.orderId}`);
//   }
// }

// Xử lý hiển thị thông báo
// function handleNotification(notificationData) {
//   notification.type = notificationData.type;
//   notification.message = notificationData.message;
//   notification.show = true;
// }



const userId = ref(null);

// Khởi tạo dữ liệu khi component được mount
onMounted(async () => {
  await authStore.loadUser();

  userId.value = authStore.user.mssv;

  if (userId.value) {
    await getCartItems();
  }
});

// Lấy giỏ hàng từ API
const getCartItems = async () => {
  try {
    isLoading.value = true;
    const response = await $api.get(`students/cart/all/${userId.value}`, {
      params: {
        page: 0,
        size: 8,
      },
    });

    // Kiểm tra cấu trúc response
    let items = [];

    if (response.data) {
      // Nếu response.data là array
      if (Array.isArray(response.data)) {
        items = response.data;
      }
      // Nếu response.data có thuộc tính items
      else if (response.data.items && Array.isArray(response.data.items)) {
        items = response.data.items;
      }
      // Nếu response.data có thuộc tính content (phân trang)
      else if (response.data.content && Array.isArray(response.data.content)) {
        items = response.data.content;
      }
    }


    if (items.length > 0) {
      cartItems.value = items.map(item => ({
        ...item,
        selected: false
      }));
    } else {
      cartItems.value = [];
    }

  } catch (error) {
    showModalConfirm(error.response.data)
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>