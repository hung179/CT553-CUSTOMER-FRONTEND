<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <div class="max-w-screen-xl mx-auto px-4 py-8">
      <!-- Header với animation -->
      <div class="mb-8">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2 animate-fade-in"
        >
          Giỏ hàng của bạn
        </h1>
      </div>

      <!-- Giỏ hàng trống -->
      <div
        v-if="cartItems.length === 0"
        class="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl text-center border border-white/50"
      >
        <div class="mb-6">
          <p class="text-xl font-medium text-gray-700 mb-2">
            Giỏ hàng của bạn đang trống
          </p>
          <p class="text-gray-500">
            Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
          </p>
        </div>
        <button
          @click="goShopping"
          class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <i class="fas fa-shopping-bag mr-2"></i>
          Tiếp tục mua sắm
        </button>
      </div>

      <!-- Giỏ hàng có sản phẩm -->
      <div v-else class="flex flex-col xl:flex-row gap-8">
        <!-- Danh sách sản phẩm -->
        <div class="xl:w-2/3">
          <div
            class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden"
          >
            <!-- Header section -->
            <div
              class="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <input
                      type="checkbox"
                      :checked="areAllSelected"
                      @change="toggleSelectAll"
                      class="h-5 w-5 text-blue-600 rounded border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                    />
                    <div
                      v-if="areAllSelected"
                      class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <i class="fas fa-check text-xs text-white"></i>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="font-semibold text-gray-800">Chọn tất cả</span>
                    <span
                      class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {{ cartItems.length }} sản phẩm
                    </span>
                  </div>
                </div>

                <button
                  @click="showDeleteSelectedModal"
                  :disabled="!hasSelectedItems"
                  :class="`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    hasSelectedItems
                      ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                      : 'text-gray-300 cursor-not-allowed'
                  }`"
                >
                  <i class="fas fa-trash-alt"></i>
                  <span>Xóa đã chọn</span>
                </button>
              </div>
            </div>

            <!-- Danh sách sản phẩm -->
            <div class="divide-y divide-gray-100">
              <div
                v-for="(item, index) in cartItems"
                :key="index"
                class="group hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25 transition-all duration-300"
              >
                <div class="p-6 flex flex-col lg:flex-row items-start gap-6">
                  <!-- Checkbox và ảnh sản phẩm -->
                  <div class="flex items-center space-x-4">
                    <div class="relative">
                      <input
                        type="checkbox"
                        v-model="item.selected"
                        class="h-5 w-5 text-blue-600 rounded border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                      />
                    </div>

                    <!-- Ảnh sản phẩm với hiệu ứng hover -->
                    <div
                      v-for="image in item.sanPham.images.filter(
                        (img) => img.loaiAnh === 'DAIDIEN'
                      )"
                      :key="image.idImg"
                      class="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        :src="image.url"
                        :alt="item.sanPham.tenSP"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                    </div>
                  </div>

                  <!-- Thông tin sản phẩm -->
                  <div class="flex-grow lg:px-4">
                    <h3
                      class="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-200"
                    >
                      {{ item.sanPham.tenSP }}
                    </h3>
                    <div
                      class="flex items-center space-x-2 text-sm text-gray-500"
                    >
                      <i class="fas fa-weight text-xs"></i>
                      <span>Trọng lượng: {{ item.sanPham.trongLuong }}g</span>
                    </div>
                  </div>

                  <!-- Giá và điều khiển -->
                  <div class="flex flex-col items-end space-y-4">
                    <!-- Giá tiền -->
                    <div class="text-right">
                      <span
                        class="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent"
                      >
                        {{ formatPrice(item.sanPham.giaSP) }}
                      </span>
                    </div>

                    <!-- Điều chỉnh số lượng -->
                    <div
                      class="flex items-center bg-gray-50 rounded-full overflow-hidden shadow-sm"
                    >
                      <!-- Nút giảm -->
                      <button
                        @click="decreaseQuantity(item)"
                        class="w-10 h-10 flex items-center justify-center bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200 border-r border-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>

                      <!-- Ô nhập số lượng -->
                      <input
                        v-model.number="item.soLuong"
                        @change="updateQuantity(item)"
                        type="number"
                        min="1"
                        class="w-14 h-10 text-center border-0 bg-transparent font-semibold text-gray-800 focus:outline-none focus:ring-0"
                      />

                      <!-- Nút tăng -->
                      <button
                        @click="increaseQuantity(item)"
                        class="w-10 h-10 flex items-center justify-center bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200 border-l border-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>

                    <!-- Nút xóa -->
                    <button
                      @click="showDeleteModal(item)"
                      class="flex items-center space-x-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-full transition-all duration-200"
                    >
                      <i class="fas fa-trash-alt text-sm"></i>
                      <span class="text-sm">Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tổng thanh toán -->
        <div class="xl:w-1/3">
          <div
            class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 sticky top-8 border border-white/50"
          >
            <!-- Header -->
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-800">Tổng thanh toán</h2>
            </div>

            <!-- Chi tiết thanh toán -->
            <div class="space-y-4 mb-8">
              <div
                class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl"
              >
                <div class="flex items-center space-x-2">
                  <i class="fas fa-box text-gray-500"></i>
                  <span class="text-gray-600">Tổng sản phẩm:</span>
                </div>
                <span
                  class="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                >
                  {{ selectedItemsTotalQuantity }}
                </span>
              </div>

              <div
                class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl"
              >
                <div class="flex items-center space-x-2">
                  <i class="fas fa-calculator text-gray-500"></i>
                  <span class="text-gray-600">Tạm tính:</span>
                </div>
                <span class="font-bold text-gray-800">{{
                  formatPrice(selectedItemsTotalPrice)
                }}</span>
              </div>
            </div>

            <!-- Tổng tiền -->
            <div
              class="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl mb-6 border border-emerald-100"
            >
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-700"
                  >Thành tiền:</span
                >
                <span
                  class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
                >
                  {{ formatPrice(selectedItemsTotalPrice) }}
                </span>
              </div>
            </div>

            <!-- Nút thanh toán -->
            <button
              @click="checkout"
              :disabled="!hasSelectedItems"
              class="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:transform-none disabled:hover:shadow-none disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white shadow-lg"
            >
              <div class="flex items-center justify-center space-x-2">
                <i class="fas fa-credit-card"></i>
                <span>Thanh toán ngay</span>
              </div>
            </button>

            <!-- Thông tin bảo mật -->
            <div class="mt-6 text-center">
              <div
                class="flex items-center justify-center space-x-2 text-sm text-gray-500"
              >
                <i class="fas fa-shield-alt text-green-500"></i>
                <span>Giao dịch được bảo mật 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal xác nhận xóa sản phẩm -->
      <Teleport to="body">
        <div
          v-if="deleteModal.show"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in"
          >
            <!-- Icon cảnh báo -->
            <div class="text-center mb-6">
              <div
                class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center"
              >
                <i
                  class="fas fa-exclamation-triangle text-2xl text-red-500"
                ></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Xác nhận xóa</h3>
              <p class="text-gray-600">
                Bạn có chắc chắn muốn xóa
                <span class="font-semibold text-red-600">
                  {{
                    deleteModal.multiple
                      ? "các sản phẩm đã chọn"
                      : "sản phẩm này"
                  }}
                </span>
                khỏi giỏ hàng?
              </p>
            </div>

            <div class="flex space-x-3">
              <button
                @click="deleteModal.show = false"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Hủy bỏ
              </button>
              <button
                @click="confirmDelete"
                class="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>

    <!-- Components khác -->
    <Checkout
      :show="isCheckoutModalVisible"
      :products="cartItems.filter((item) => item.selected)"
      :userId="userId"
      @close="isCheckoutModalVisible = false"
      @order-success="handleOrderSuccess"
      @notification="handleNotification"
    />
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

const notification = ref({
  show: false,
  type: "",
  message: "",
});

const showModal = ref(false);
const modalType = ref(null);
const titleModal = ref(null);
const message = ref(null);
const confirmText = ref(null);
const handleConfirm = ref();

const showModalConfirm = (element, item) => {
  switch (element.type) {
    case "LIMITED": {
      handleConfirm.value = () => {
        showModal.value = false;
      };
      modalType.value = "warning";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = "Xác nhận";
      showModal.value = true;
      break;
    }
    case "SUCCESS": {
      handleConfirm.value = () => {
        showModal.value = false;
      };
      modalType.value = "success";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = "Xác nhận";
      showModal.value = true;
      break;
    }
    case "DELETE": {
      handleConfirm.value = async () => {
        if (item.length > 0) {
          // Xóa các sản phẩm trong item khỏi cartItems
          const idsToRemove = item.map((i) => i.sanPham.maSP);
          cartItems.value = cartItems.value.filter(
            (itemCart) => !idsToRemove.includes(itemCart.maSP)
          );

          // Gọi API xóa từng sản phẩm trong item
          for (const i of item) {
            await $api.delete(`students/cart/delete/${userId.value}`, {
              data: {
                idGioHang: authStore.user.idGioHang,
                idSP: i.sanPham.maSP,
              },
            });
          }
          await cartStore.fetchCartCount(userId.value, authStore.accessToken);
        }

        showModal.value = false;
      };

      modalType.value = "warning";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = "Xác nhận";
      showModal.value = true;
      break;
    }
    case "HIDED": {
      handleConfirm.value = async () => {
        if (item.sanPham) {
          cartItems.value = cartItems.value.filter(
            (itemCart) => !(itemCart.maSP === item.sanPham.maSP)
          );
        }
        const response = await $api.delete(
          `students/cart/delete/${userId.value}`,
          {
            data: {
              idGioHang: authStore.user.idGioHang,
              idSP: item.sanPham.maSP,
            },
          }
        );

        showModal.value = false;
      };
      modalType.value = "warning";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = "Xác nhận";
      showModal.value = true;
      break;
    }
  }
};

const goShopping = () => {
  router.push("/");
};

// Computed properties
const hasSelectedItems = computed(() =>
  cartItems.value.some((item) => item.selected)
);

const areAllSelected = computed(
  () =>
    cartItems.value.length > 0 && cartItems.value.every((item) => item.selected)
);

const selectedItemsTotalQuantity = computed(() =>
  cartItems.value
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.soLuong, 0)
);

const selectedItemsTotalPrice = computed(() => {
  const totalPrice = cartItems.value
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.soLuong * item.sanPham.giaSP, 0);
  return totalPrice;
});

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
    showModalConfirm(error.response.data, item);
    item.soLuong = item.sanPham.soLuong;
  }
}

// Hiển thị modal xác nhận xóa 1 sản phẩm
const showDeleteModal = (item) => {
  deleteModal.itemToDelete = item;
  deleteModal.multiple = false;
  deleteModal.show = true;
};

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
            (item.maSP === deleteModal.itemToDelete.sanPham.maSP)
            // &&
            // item.soLuong === deleteModal.itemToDelete.soLuong
          )
      );
    }

    // Gọi API để xóa sản phẩm
    if (products.length > 0) {
      for (const item of products) {
        try {
          const response = await $api.patch(
            `students/cart/updateItem/${userId.value}`,
            item
          );
          await cartStore.fetchCartCount(userId.value, authStore.accessToken);
          showModalConfirm(response.data);
        } catch (error) {
          showModalConfirm(error.response?.data, {
            sanPham: { maSP: item.maSP },
          });
        }
      }
    }
  } catch (error) {
    showModalConfirm(error.response.data);
  } finally {
    deleteModal.show = false;
  }
}

// Tiến hành thanh toán
const checkout = () => {
  if (!hasSelectedItems.value) return;

  // Hiển thị modal thanh toán
  isCheckoutModalVisible.value = true;
};

// Thêm state quản lý hiển thị modal checkout
const isCheckoutModalVisible = ref(false);

// Xử lý khi đặt hàng thành công
const handleOrderSuccess = (orderData) => {
  // Cập nhật UI - loại bỏ sản phẩm đã đặt hàng khỏi giỏ hàng
  cartItems.value = cartItems.value.filter((item) => !item.selected);

  if (orderData.orderId) {
    navigateTo(`/orders/${orderData.orderId}`);
  }
};

// Xử lý hiển thị thông báo
const handleNotification = (notificationData) => {
  notification.value.type = notificationData.value.type;
  notification.value.message = notificationData.value.message;
  notification.value.show = true;
  if (notification.value.type === "DELETE")
    showModalConfirm(notification.value, notificationData.item);
  else showModalConfirm(notification.value);
};

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
      cartItems.value = items.map((item) => ({
        ...item,
        selected: false,
      }));
    } else {
      cartItems.value = [];
    }
  } catch (error) {
    showModalConfirm(error.response.data);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Animation keyframes */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

/* Custom input styles */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Custom checkbox styles */
input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-8.354 8.354-3.854-3.854a.5.5 0 1 0-.707.707l4.207 4.207a.5.5 0 0 0 .707 0l8.707-8.707a.5.5 0 0 0-.707-.707z'/%3e%3c/svg%3e");
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Custom gradient colors */
.from-blue-25 {
  --tw-gradient-from: rgba(239, 246, 255, 0.5);
}

.to-purple-25 {
  --tw-gradient-to: rgba(250, 245, 255, 0.5);
}
</style>