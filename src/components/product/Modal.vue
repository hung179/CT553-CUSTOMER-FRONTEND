<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Enhanced overlay with blur -->
        <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/60 backdrop-blur-md transition-all duration-300" @click="closeModal"></div>

        <div class="bg-white rounded-2xl w-full max-w-5xl mx-auto flex flex-col shadow-2xl relative z-10 h-[90vh] transform transition-all duration-300 scale-100 opacity-100">
            <!-- Gradient Header -->
            <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {{ productData?.tenSP || "Đang tải..." }}
                </h2>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-white/50 rounded-full">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- Enhanced main content -->
            <div class="flex-1 overflow-hidden">
                <div class="flex flex-col lg:flex-row h-full">
                    <!-- Image section with gradient background -->
                    <div class="lg:w-2/5 flex-shrink-0 bg-gradient-to-br from-gray-50 to-blue-50">
                        <div class="h-64 lg:h-full p-6 flex items-center justify-center overflow-hidden relative group"
                            v-for="(image, index) in productData.images.filter((img) => img.loaiAnh === 'DAIDIEN')"
                            :key="index">
                            <div class="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            <img :src="image?.url || ''" alt="Product" 
                                class="w-full h-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                                loading="eager" />
                            <!-- Image overlay gradient -->
                            <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent rounded-b-xl"></div>
                        </div>
                    </div>

                    <!-- Tab content container -->
                    <div class="lg:w-3/5 flex flex-col min-h-0 bg-white">
                        <!-- Enhanced Tabs Navigation -->
                        <div class="flex border-b border-gray-100 px-8 bg-white flex-shrink-0 z-10">
                            <button v-for="(tab, index) in tabs" :key="index" 
                                @click="activeTab = index" 
                                :class="[
                                'px-6 py-4 font-semibold transition-all duration-300 relative overflow-hidden',
                                activeTab === index
                                    ? 'text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700',
                            ]">
                                <span class="relative z-10">{{ tab }}</span>
                                <!-- Animated tab indicator -->
                                <div v-if="activeTab === index" 
                                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-all duration-300"></div>
                                <!-- Hover effect -->
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>

                        <!-- Tab content with enhanced styling -->
                        <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <!-- Tab 1: Enhanced product info -->
                            <div v-show="activeTab === 0" class="space-y-8">
                                <div class="space-y-6">
                                    <h3 class="text-3xl font-bold text-gray-800 leading-tight">
                                        {{ productData?.tenSP || "Đang tải..." }}
                                    </h3>

                                    <!-- Price with enhanced styling -->
                                    <div v-if="currentVariantPrice" class="relative">
                                        <div class="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                                            {{ formatPrice(currentVariantPrice) }}
                                        </div>
                                    </div>

                                    <!-- Enhanced info cards -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <!-- Seller info card -->
                                        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                                            <h4 class="font-semibold text-gray-600 text-sm mb-1">Người bán</h4>
                                            <span class="text-blue-700 font-bold text-lg">{{ product.hoTen }}</span>
                                        </div>

                                        <!-- Student ID card -->
                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                                            <h4 class="font-semibold text-gray-600 text-sm mb-1">MSSV</h4>
                                            <span class="text-purple-700 font-bold text-lg">{{ product.mssv }}</span>
                                        </div>

                                        <!-- Stock info card -->
                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                                            <h4 class="font-semibold text-gray-600 text-sm mb-1">Còn lại</h4>
                                            <div v-if="currentVariantStock" class="text-green-700 font-bold text-lg">
                                                {{ currentVariantStock }} sản phẩm
                                            </div>
                                        </div>

                                        <!-- Weight info card -->
                                        <div class="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-100">
                                            <h4 class="font-semibold text-gray-600 text-sm mb-1">Trọng lượng</h4>
                                            <span class="text-orange-700 font-bold text-lg">
                                                {{ currentVariant?.trongLuong || productData?.trongLuong || "-" }} gram
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Enhanced quantity selector -->
                                    <div class="bg-gray-50 p-6 rounded-xl">
                                        <h4 class="font-semibold mb-4 text-gray-800">Số lượng:</h4>
                                        <div class="flex items-center justify-center">
                                            <button @click="decrementQuantity"
                                                class="w-12 h-12 bg-white shadow-lg flex items-center justify-center rounded-l-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-xl">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                                </svg>
                                            </button>
                                            <input v-model="quantity" type="number" min="1"
                                                class="w-20 h-12 text-center text-lg font-semibold border-t border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                            <button @click="incrementQuantity"
                                                class="w-12 h-12 bg-white shadow-lg flex items-center justify-center rounded-r-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-xl">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab 2: Enhanced description -->
                            <div v-show="activeTab === 1" class="space-y-8">
                                <h3 class="text-3xl font-bold text-gray-800 mb-6">Mô tả sản phẩm</h3>

                                <!-- Description with enhanced typography -->
                                <div class="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-100">
                                    <p class="text-gray-700 leading-relaxed text-lg">
                                        {{ productData?.moTa || "Không có mô tả" }}
                                    </p>
                                </div>

                                <!-- Enhanced image gallery -->
                                <div v-if="motaImages.length > 0" class="mt-8">
                                    <h4 class="text-xl font-semibold mb-6 text-gray-800">Hình ảnh sản phẩm</h4>
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        <div v-for="(image, index) in motaImages" :key="index"
                                            class="group aspect-square overflow-hidden rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                            <img :src="image.url"
                                                :alt="`Hình ảnh ${index + 1} của sản phẩm ${productData.tenSP}`"
                                                class="w-full h-full object-contain cursor-pointer transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy" @click="openFullImage(image.url)" />
                                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab 3: Enhanced specifications -->
                            <div v-show="activeTab === 2" class="space-y-6">
                                <h3 class="text-3xl font-bold text-gray-800 mb-6">Thông số kỹ thuật</h3>

                                <div v-if="productData?.kichThuoc" class="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                                    <h4 class="font-bold text-indigo-700 text-lg mb-3">Kích thước sản phẩm</h4>
                                    <p class="text-gray-700 text-lg">{{ productData.kichThuoc }}</p>
                                </div>

                                <div v-else class="bg-gray-50 p-8 rounded-xl text-center">
                                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    <p class="text-gray-500 text-lg">Không có thông số kỹ thuật chi tiết khác</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enhanced footer with gradient button -->
            <div class="px-8 py-6 border-t border-gray-100 flex justify-end flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-2xl">
                <button @click="addToCart"
                    class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:via-blue-600 text-white shadow-xl hover:shadow-2xl px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group">
                    <span class="relative z-10 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5l2.5 5"></path>
                        </svg>
                        Thêm vào giỏ hàng
                    </span>
                    <!-- Button shine effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Enhanced animations */
@keyframes modalEnter {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.fixed {
    animation: modalEnter 0.3s ease-out;
}
</style>