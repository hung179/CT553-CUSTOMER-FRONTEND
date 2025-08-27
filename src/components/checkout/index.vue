<!-- Modal thanh toán -->
<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            @click.self="closeModal">
            <div class="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] flex flex-col">
                <!-- Header -->
                <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 flex-shrink-0">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-2xl font-bold">Thanh toán đơn hàng</h3>
                            <p class="text-emerald-100 mt-1">Hoàn tất đơn hàng của bạn</p>
                        </div>
                        <button @click="closeModal"
                            class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto">
                    <!-- Sản phẩm thanh toán -->
                    <div class="p-6 border-b bg-gray-50/50">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Sản phẩm đã chọn
                        </h4>

                        <div class="space-y-4 max-h-80 overflow-y-auto">
                            <div v-for="(item, index) in selectedProducts" :key="index"
                                class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div class="flex items-center gap-4">
                                    <!-- Ảnh sản phẩm -->
                                    <div v-for="image in item.sanPham.images.filter(img => img.loaiAnh === 'DAIDIEN')"
                                        :key="image.idImg"
                                        class="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                        <img :src="image.url" :alt="item.sanPham.tenSP"
                                            class="w-full h-full object-cover" />
                                    </div>

                                    <!-- Thông tin sản phẩm -->
                                    <div class="flex-1 min-w-0">
                                        <h5 class="font-semibold text-gray-800 truncate">{{ item.sanPham.tenSP }}</h5>
                                        <div class="flex items-center gap-4 mt-2">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {{ item.sanPham.trongLuong }}g
                                            </span>
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                SL: {{ item.soLuong }}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Giá -->
                                    <div class="text-right">
                                        <div class="text-xl font-bold text-emerald-600">
                                            {{ formatPrice(item.soLuong * item.sanPham.giaSP) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Thông tin giao hàng và thanh toán -->
                    <div class="p-6 space-y-6">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <!-- Thông tin giao hàng -->
                            <div class="lg:col-span-2">
                                <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Thông tin giao hàng
                                </h4>

                                <!-- Chọn địa chỉ có sẵn -->
                                <div v-if="savedAddresses.length > 0" class="space-y-4">
                                    <div class="flex items-center justify-between">
                                        <label class="text-sm font-medium text-gray-700">Chọn địa chỉ giao hàng</label>
                                        <span class="text-xs text-gray-500">{{ savedAddresses.length }}/5 địa chỉ</span>
                                    </div>

                                    <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
                                        <div v-for="(address, index) in savedAddresses.slice(0, 5)" :key="index"
                                            class="relative group cursor-pointer" @click="selectAddress(index)">
                                            <div class="border-2 rounded-xl p-4 transition-all duration-200 hover:shadow-lg"
                                                :class="{
                                                    'border-emerald-500 bg-emerald-50 shadow-md': selectedAddressIndex === index,
                                                    'border-gray-200 hover:border-emerald-300': selectedAddressIndex !== index,
                                                }">
                                                <div class="flex items-start justify-between">
                                                    <div class="flex-1">
                                                        <div class="font-semibold text-gray-800" :class="{
                                                            'text-emerald-800': selectedAddressIndex === index
                                                        }">
                                                            {{ address.chiTietDC || "Không có chi tiết" }}
                                                        </div>
                                                        <div class="text-sm text-gray-600 mt-1">
                                                            {{ address.xaDC }}, {{ address.huyenDC }}, {{ address.tinhDC
                                                            }}
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center ml-3">
                                                        <div class="relative">
                                                            <input type="radio"
                                                                :checked="selectedAddressIndex === index"
                                                                @change="selectAddress(index)"
                                                                class="h-5 w-5 text-emerald-600 focus:ring-emerald-500 focus:ring-2" />
                                                            <div v-if="selectedAddressIndex === index"
                                                                class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                                <div class="w-2 h-2 bg-white rounded-full"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Selected indicator -->
                                                <div v-if="selectedAddressIndex === index"
                                                    class="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-center pt-4 border-t border-gray-100">
                                        <button @click="useNewAddress"
                                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200">
                                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Thêm địa chỉ mới
                                        </button>
                                    </div>
                                </div>

                                <!-- Trường hợp không có địa chỉ -->
                                <div v-else class="text-center py-8">
                                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <h3 class="text-lg font-medium text-gray-800 mb-2">Chưa có địa chỉ giao hàng</h3>
                                    <p class="text-gray-500 mb-4">Vui lòng thêm địa chỉ giao hàng để tiếp tục</p>
                                    <button @click="useNewAddress"
                                        class="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Thêm địa chỉ mới
                                    </button>
                                </div>
                            </div>

                            <!-- Tóm tắt đơn hàng -->
                            <div class="lg:col-span-1">
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        Tóm tắt đơn hàng
                                    </h4>

                                    <!-- Chi tiết trọng lượng -->
                                    <div class="bg-white rounded-xl p-4 mb-4 shadow-sm">
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600 flex items-center">
                                                <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                                Tổng trọng lượng:
                                            </span>
                                            <span class="font-semibold text-gray-800">{{ totalWeight }}g</span>
                                        </div>
                                    </div>

                                    <!-- Chi tiết giá -->
                                    <div class="space-y-3">
                                        <div class="flex justify-between items-center">
                                            <span class="text-gray-600">Tổng tiền hàng:</span>
                                            <span class="font-semibold">{{ formatPrice(totalPrice) }}</span>
                                        </div>

                                        <div class="border-t border-gray-200 pt-3">
                                            <div class="flex justify-between items-center">
                                                <span class="text-lg font-bold text-gray-800">Tổng thanh toán:</span>
                                                <span class="text-2xl font-bold text-emerald-600">
                                                    {{ formatPrice(totalPrice) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Phương thức thanh toán -->
                                    <div class="mt-6 bg-white rounded-xl p-4 shadow-sm">
                                        <h5 class="font-semibold text-gray-800 mb-3 flex items-center">
                                            <svg class="w-4 h-4 mr-1.5 text-emerald-600" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            Thanh toán
                                        </h5>
                                        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                                            <div class="flex items-center">
                                                <svg class="w-5 h-5 text-emerald-600 mr-2" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <div>
                                                    <div class="font-medium text-emerald-800">Thanh toán trực tuyến
                                                    </div>
                                                    <div class="text-xs text-emerald-600 mt-0.5">Thanh toán an toàn và
                                                        nhanh chóng</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="border-t bg-gray-50 px-6 py-4 flex-shrink-0">
                    <div class="flex flex-col sm:flex-row justify-end gap-3">
                        <button @click="closeModal"
                            class="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 order-2 sm:order-1">
                            Hủy bỏ
                        </button>
                        <button @click="placeOrder" :disabled="isPlacingOrder"
                            class="px-8 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl order-1 sm:order-2">
                            <svg v-if="isPlacingOrder" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span v-if="isPlacingOrder">Đang xử lý...</span>
                            <span v-else>Đặt hàng ngay</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, computed, reactive, watch } from "vue";

const props = defineProps({
    show: Boolean,
    products: Array,
    userId: String,
});

const emit = defineEmits(["close", "order-success", "notification"]);

// State chính
const selectedProducts = ref([]);
const savedAddresses = ref([]);
const selectedAddressIndex = ref(-1);
const router = useRouter();
const shippingInfo = ref(null);
const isPlacingOrder = ref(false);
const { $api } = useNuxtApp();

const authStore = useAuthStore();
const cartStore = useCartStore();

// Thông tin thanh toán
const checkoutInfo = reactive({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    paymentMethod: "cod",
    saveAddress: false,
});

// Computed properties
const totalPrice = computed(() =>
    selectedProducts.value.reduce(
        (total, item) => total + item.soLuong * item.sanPham.giaSP,
        0
    )
);

const totalWeight = computed(() => {
    return selectedProducts.value.reduce(
        (total, item) =>
            total + (item.soLuong * item.sanPham.trongLuong || 0),
        0
    );
});

const excessWeight = computed(() => {
    if (!shippingInfo.value || totalWeight.value <= shippingInfo.value.mucVuot_VC) {
        return 0;
    }
    return totalWeight.value - shippingInfo.value.mucVuot_VC;
});

const excessWeightFee = computed(() => {
    if (!shippingInfo.value || excessWeight.value <= 0) {
        return 0;
    }
    const excessUnits = Math.ceil(excessWeight.value / shippingInfo.value.mucVuot_VC);
    return excessUnits * shippingInfo.value.giaVuotMuc_VC;
});

const shippingFee = computed(() => {
    if (!shippingInfo.value) {
        return 30000;
    }
    return shippingInfo.value.gia_VC + excessWeightFee.value;
});

// Xử lý chọn địa chỉ
function selectAddress(index) {
    selectedAddressIndex.value = index;
    const address = savedAddresses.value[index];
    if (address) {
        checkoutInfo.province = address.tinhDC;
        checkoutInfo.district = address.huyenDC;
        checkoutInfo.ward = address.xaDC;
        checkoutInfo.address = address.chiTietDC || "";
    }
}

// Lấy danh sách địa chỉ đã lưu (giới hạn 5 địa chỉ)
async function fetchSavedAddresses() {
    try {
        const response = await $api.get(`addresses/all/${props.userId}`);
        if (response.data) {
            savedAddresses.value = (response.data.content || []).slice(0, 5);
            if (savedAddresses.value.length > 0) {
                selectAddress(0);
            }
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách địa chỉ:", error);
        emit("notification", {
            type: "LIMITED",
            message: "Không thể tải danh sách địa chỉ. Vui lòng thử lại sau.",
        });
    }
}

// Lấy thông tin vận chuyển
async function fetchShippingInfo(provinceName) {
    try {
        const response = (await $api.get(`shippingInformation/province?tinh=${provinceName}`)).data;
        if (response.success) {
            shippingInfo.value = response.data;
        }
    } catch (error) {
        console.error("Lỗi khi lấy thông tin vận chuyển:", error);
    }
}

const checkSelectedProducts = async () => {
  const invalidProducts = [];

  for (const product of selectedProducts.value) {
    try {
      await $api.post(`products/checkProduct/${product.maSP}`);
    } catch (error) {
      invalidProducts.push({
        ...product,
        errorMessage: error.response?.data?.message || "Sản phẩm không hợp lệ",
      });
    }
  }

  if (invalidProducts.length > 0) {
    closeModal();
    emit("notification", {
      value: {
        type: "DELETE",
        message: "Có một số sản phẩm không hợp lệ.",
      },
      item: invalidProducts,
    });
    return false;
  }

  return true;
};



// Hàm xử lý đặt hàng và thanh toán
async function placeOrder() {
    // Kiểm tra thông tin bắt buộc
    if (selectedAddressIndex.value === -1 && savedAddresses.value.length > 0) {
        closeModal();
        emit("notification", {
            type: "LIMITED",
            message: "Vui lòng chọn địa chỉ giao hàng",
        });
        return;
    }

    if (selectedProducts.value.length === 0) {
        closeModal();
        emit("notification", {
            type: "LIMITED",
            message: "Không có sản phẩm nào để đặt hàng",
        });
        return;
    }

    const isAllProductsValid = await checkSelectedProducts();

    if (!isAllProductsValid) {
        return;
    }

    try {
        isPlacingOrder.value = true;

        // Chuẩn bị dữ liệu cho OrderRequestDto
        const orderData = {
            mssvDH: props.userId,
            tongTienDH: totalPrice.value,
            thanhToan: "DATHANHTOAN",
            subOrder: prepareSubOrderData(),
            addressOrderRequest: prepareAddressOrderData()
        };

        // Gọi API để tạo đơn hàng và thanh toán
        const response = await $api.post("orders/create/pay", orderData);

        if (response.data.success) {
            // XÓA SAN PHẨM KHỎI GIỎ HÀNG SAU KHI THANH TOÁN THÀNH CÔNG
            await removeProductsFromCart();

            // Thông báo thành công
            emit("notification", {
                value: {
                    type: "SUCCESS",
                    message: "Đặt hàng và thanh toán thành công! Cảm ơn bạn đã mua hàng.",
                }
            })

            // Thông báo đặt hàng thành công để component cha cập nhật UI
            emit("order-success", {
                products: selectedProducts.value,
                orderId: response.data.data?.maDH
            });


            // Đóng modal
            closeModal();

        } else {
            closeModal();
            emit("notification", {
                type: "LIMITED",
                message: response.data.message || "Có lỗi xảy ra khi đặt hàng và thanh toán",
            });

        }

    } catch (error) {
        console.error("Lỗi đặt hàng:", error.message);

        let errorMessage = "Có lỗi xảy ra khi đặt hàng";

        if (error.response) {
            if (error.response.status === 400) {
                errorMessage = "Dữ liệu đầu vào không hợp lệ";
            } else if (error.response.status === 500) {
                errorMessage = "Lỗi hệ thống, vui lòng thử lại sau";
            }
            if (error.response.data?.message) {
                errorMessage = error.response.data.message;
            }
        } else if (error.request) {
            errorMessage = "Không thể kết nối đến server";
        }
        closeModal();

        emit("notification", {
            value: {
                type: "DELETE",
                message: errorMessage,
            },
            item: selectedProducts.value,
        });
    } finally {
        isPlacingOrder.value = false;
    }
}

// Hàm chuẩn bị dữ liệu SubOrder
function prepareSubOrderData() {
    // Group products by store/shop (maGianHangDHC)
    const groupedByStore = {};

    selectedProducts.value.forEach(item => {
        const storeId = item.sanPham.maGHSH; // Lấy ID gian hàng, mặc định là 1 nếu không có
        if (!groupedByStore[storeId]) {
            groupedByStore[storeId] = [];
        }
        groupedByStore[storeId].push({
            orderItemId: {
                maDH: null, // Sẽ được set sau khi tạo order
                maSP: item.sanPham.maSP || item.sanPham.id, // ID sản phẩm
            },
            soLuong: item.soLuong, // Số lượng sản phẩm
            giaSP: item.sanPham.giaSP // Giá sản phẩm
        });
    });

    // Convert to SubOrderRequestDto format
    return Object.entries(groupedByStore).map(([storeId, items]) => ({
        maGianHangDHC: parseInt(storeId),
        orderItem: items
    }));
}

// Hàm chuẩn bị dữ liệu địa chỉ
function prepareAddressOrderData() {
    if (selectedAddressIndex.value >= 0 && savedAddresses.value.length > 0) {
        const selectedAddress = savedAddresses.value[selectedAddressIndex.value];
        return {
            tinhDCDH: selectedAddress.tinhDC,
            huyenDCDH: selectedAddress.huyenDC,
            xaDCDH: selectedAddress.xaDC,
            chiTietDCDH: selectedAddress.chiTietDC
        };
    }

    return null;
}

// Hàm xóa sản phẩm khỏi giỏ hàng
async function removeProductsFromCart() {
    try {
        const authStore = useAuthStore();

        for (const item of selectedProducts.value) {
            try {
                const response = await $api.delete(`students/cart/delete/${props.userId}`, {
                    data: {
                        idGioHang: authStore.user.idGioHang,
                        idSP: item.sanPham.maSP,
                    }
                });

            } catch (error) {
                console.error(`Lỗi khi xóa sản phẩm ${item.sanPham.maSP}:`, error);
            }
        }

        const cartStore = useCartStore();
        if (cartStore && cartStore.fetchCartCount) {
            await cartStore.fetchCartCount(props.userId, authStore.accessToken);
        }

    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    }
}

// Hàm tạo đơn hàng không thanh toán (nếu cần)
async function createOrderOnly() {
    try {
        isPlacingOrder.value = true;

        const orderData = {
            mssvDH: props.userId,
            tongTienDH: totalPrice.value,
            thanhToan: "CHUATHANHTOAN", // Chưa thanh toán
            subOrder: prepareSubOrderData(),
            addressOrderRequest: prepareAddressOrderData()
        };

        const response = await $api.post("orders/create/", orderData);

        if (response.data) {
            emit("notification", {
                type: "SUCCESS",
                message: "Tạo đơn hàng thành công! Bạn có thể thanh toán sau.",
            });

            emit("order-success", {
                products: selectedProducts.value,
                orderId: response.data.data?.maDH
            });

            closeModal();
        } else {
            emit("notification", {
                type: "LIMITED",
                message: response.data.message || "Có lỗi xảy ra khi tạo đơn hàng",
            });
        }
    } catch (error) {
        console.error("Lỗi tạo đơn hàng:", error);
        emit("notification", {
            type: "LIMITED",
            message: "Có lỗi xảy ra khi tạo đơn hàng",
        });
    } finally {
        isPlacingOrder.value = false;
    }
}

// Watchers
watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            fetchSavedAddresses();
            shippingInfo.value = null;
        }
    }
);

watch(
    () => props.products,
    (newProducts) => {
        if (newProducts && newProducts.length > 0) {
            selectedProducts.value = [...newProducts];
        } else {
            selectedProducts.value = [];
        }
    },
    { immediate: true }
);

function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

function closeModal() {
    emit("close");
}

const useNewAddress = () => {
    router.push("/address/");
    closeModal();
};
</script>