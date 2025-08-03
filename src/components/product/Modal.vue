<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Overlay mờ phía sau -->
        <div class="absolute inset-0 bg-black/75 backdrop-blur-sm" @click="closeModal"></div>

        <div class="bg-white rounded-lg w-full max-w-4xl mx-auto flex flex-col shadow-lg relative z-10 h-[85vh]">
            <!-- Header với nút đóng -->
            <div
                class="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0 bg-white z-20">
                <h2 class="text-xl font-bold">Chi tiết sản phẩm</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                    <span class="text-2xl">&times;</span>
                </button>
            </div>

            <!-- Main content với chiều cao cố định -->
            <div class="flex-1 overflow-hidden">
                <div class="flex flex-col md:flex-row h-full">
                    <!-- Image section -->
                    <div class="md:w-2/5 flex-shrink-0">
                        <div class="h-64 md:h-full p-4 flex items-center justify-center overflow-hidden"
                            v-for="(image, index) in productData.images.filter((img) => img.loaiAnh === 'DAIDIEN')"
                            :key="index">
                            <img :src="image?.url || ''" alt="Product" class="w-full h-full object-contain"
                                loading="eager" />
                        </div>
                    </div>

                    <!-- Tab content container -->
                    <div class="md:w-3/5 flex flex-col min-h-0">
                        <!-- Tabs Navigation - cố định -->
                        <div class="flex border-b px-6 bg-white flex-shrink-0 z-10">
                            <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = index" :class="[
                                'px-4 py-2 font-medium transition-colors duration-200',
                                activeTab === index
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-800',
                            ]">
                                {{ tab }}
                            </button>
                        </div>

                        <!-- Tab content với scroll riêng -->
                        <div class="flex-1 overflow-y-auto p-6">
                            <!-- Tab 1: Thông tin sản phẩm -->
                            <div v-show="activeTab === 0" class="h-full">
                                <h3 class="text-2xl font-bold mb-4">
                                    {{ productData?.tenSP || "Đang tải..." }}
                                </h3>

                                <!-- Giá theo tuỳ chọn đã chọn -->
                                <div v-if="currentVariantPrice" class="text-2xl font-bold text-blue-600 mb-4">
                                    {{ formatPrice(currentVariantPrice) }}
                                </div>

                                <div class="flex items-center mb-6">
                                    <h4 class="font-medium mr-2">Người bán:</h4>
                                    <span class="text-blue-600 font-semibold">{{ product.hoTen }}</span>
                                </div>

                                <div class="flex items-center mb-6">
                                    <h4 class="font-medium mr-2">Mã số sinh viên: </h4>

                                    <span class="text-blue-600 font-semibold">{{ product.mssv }}</span>
                                </div>

                                <!-- Số lượng tồn kho theo tuỳ chọn đã chọn -->
                                <div class="flex items-center mb-6">
                                    <h4 class="font-medium mr-2">Còn lại:</h4>
                                    <div v-if="currentVariantStock" class="text-gray-500">
                                        {{ currentVariantStock }} sản phẩm
                                    </div>
                                </div>

                                <div class="mb-6 flex items-center">
                                    <h4 class="font-medium mr-2">Trọng lượng:</h4>
                                    <p class="text-gray-600">
                                        {{
                                            currentVariant?.trongLuong ||
                                            productData?.trongLuong ||
                                            "-"
                                        }}
                                        gram
                                    </p>
                                </div>

                                <div class="mb-6">
                                    <h4 class="font-medium mb-2">Số lượng:</h4>
                                    <div class="flex items-center">
                                        <button @click="decrementQuantity"
                                            class="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-l-md border border-gray-300">
                                            <span class="text-gray-600">-</span>
                                        </button>
                                        <input v-model="quantity" type="number" min="1"
                                            class="w-16 h-10 text-center border-t border-b border-gray-300 focus:outline-none" />
                                        <button @click="incrementQuantity"
                                            class="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-r-md border border-gray-300">
                                            <span class="text-gray-600">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab 2: Mô tả sản phẩm -->
                            <div v-show="activeTab === 1" class="space-y-6">
                                <h3 class="text-2xl font-bold mb-4">Mô tả sản phẩm</h3>

                                <!-- Product description text -->
                                <p class="text-gray-600">
                                    {{ productData?.moTa || "Không có mô tả" }}
                                </p>
                                <!-- Product images gallery -->
                                <div v-if="motaImages.length > 0" class="mt-6">
                                    <h4 class="text-lg font-medium mb-3">Hình ảnh sản phẩm</h4>
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div v-for="(image, index) in motaImages" :key="index"
                                            class="aspect-square overflow-hidden rounded-lg border border-gray-200">
                                            <img :src="image.url"
                                                :alt="`Hình ảnh ${index + 1} của sản phẩm ${productData.tenSP}`"
                                                class="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                                                loading="lazy" @click="openFullImage(image.url)" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab 3: Thông số kỹ thuật -->
                            <div v-show="activeTab === 2">
                                <h3 class="text-2xl font-bold mb-4">Thông số kỹ thuật</h3>

                                <!-- Hiển thị thông số kỹ thuật với tên thuộc tính được load từ API -->
                                <div v-if="productData?.kichThuoc">
                                    <h4 class="font-bold">Kích thước sản phẩm :</h4>
                                    {{ productData.kichThuoc }}
                                </div>

                                <div v-else>
                                    Không có thông số kỹ thuật chi tiết khác
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer cố định -->
            <div class="px-6 py-4 border-t border-gray-200 flex justify-end flex-shrink-0">
                <button @click="addToCart"
                    class="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md px-6 py-3 rounded-md font-medium transition duration-300">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
const { $api } = useNuxtApp();

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
    product: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(["close", "add-to-cart"]);

const productData = ref(null);
const activeTab = ref(0);
const quantity = ref(1);
const selectedOptions = ref({});
const tabs = ref(["Thông tin", "Mô tả", "Thông số"]);

const attributeCache = ref({});
const loadingAttributes = ref(false);

const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

const currentVariant = computed(() => {
    return productData.value.giaSP
});

const currentVariantPrice = computed(() => {
    return productData.value.giaSP || 0;
});

const currentVariantStock = computed(() => {
    return productData.value.soLuong || 0;
});

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const incrementQuantity = () => {
    if (currentVariantStock.value && quantity.value < currentVariantStock.value) {
        quantity.value++;
    }
};

const addToCart = () => {
    if (productData.value && currentVariant.value) {
        emit("add-to-cart", {
            product: productData.value,
            variant: currentVariant.value,
            quantity: quantity.value,
        });
        closeModal();
    }
};

const closeModal = () => {
    emit("close");
};

const selectOption = (categoryIndex, optionIndex) => {
    selectedOptions.value = {
        ...selectedOptions.value,
        [categoryIndex]: optionIndex,
    };
};

const disableBodyScroll = () => {
    document.body.style.overflow = "hidden";
};

const enableBodyScroll = () => {
    document.body.style.overflow = "";
};

const handleKeyDown = (event) => {
    if (event.key === "Escape" && props.isVisible) {
        closeModal();
    }
};

const openFullImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
};

watch(
    () => props.product,
    (newProduct) => {
        if (newProduct) {
            productData.value = {
                ...newProduct,
                tenSP: newProduct.tenSP
                    ? newProduct.tenSP.replace(/"/g, "")
                    : "Sản phẩm không tên",
            };

            selectedOptions.value = {};
        }
    },
    { immediate: true, deep: true }
);

watch(
    () => props.isVisible,
    (newValue) => {
        if (newValue) {
            disableBodyScroll();
            activeTab.value = 0;
            quantity.value = 1;

            if (productData.value?.phanLoai_SP) {
                productData.value.phanLoai_SP.forEach((_, index) => {
                    selectedOptions.value[index] = 0;
                });
            }

        } else {
            enableBodyScroll();
        }
    }
);

onMounted(() => {
    document.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleKeyDown);
    enableBodyScroll();
});

const motaImages = computed(() =>
    productData.value?.images?.filter((img) => img.loaiAnh === 'MOTA') || []
);

</script>