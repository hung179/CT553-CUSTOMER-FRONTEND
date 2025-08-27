<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Enhanced overlay with blur -->
        <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/60 backdrop-blur-md transition-all duration-300" @click="closeModal"></div>

        <div class="bg-white rounded-2xl w-full max-w-5xl mx-auto flex flex-col shadow-2xl relative z-10 h-[90vh] transform transition-all duration-300 scale-100 opacity-100">
            <!-- Enhanced Header with edit theme -->
            <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-2xl">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                        {{ productData?.tenSP || "Đang tải..." }}
                    </h2>
                </div>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-white/50 rounded-full">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- Enhanced main content -->
            <div class="flex-1 overflow-hidden">
                <div class="flex flex-col lg:flex-row h-full">
                    <!-- Image section with enhanced gradient -->
                    <div class="lg:w-2/5 flex-shrink-0 bg-gradient-to-r from-green-50 to-blue-50">
                        <div class="h-64 lg:h-full p-6 flex items-center justify-center overflow-hidden relative group"
                            v-for="(image, index) in productData.images.filter((img) => img.loaiAnh === 'DAIDIEN')"
                            :key="index">
                            <!-- Background pattern -->
                            <div class="absolute inset-0 opacity-5">
                                <div class="w-full h-full" style="background-image: radial-gradient(circle, #8b5cf6 1px, transparent 1px); background-size: 20px 20px;"></div>
                            </div>
                            
                            <div class="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            <img :src="image?.url || ''" alt="Product" 
                                class="w-full h-full object-contain rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-105 relative z-10"
                                loading="eager" />
                            


                            <!-- Image overlay gradient -->
                            <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-900/20 to-transparent rounded-b-xl"></div>
                        </div>
                    </div>

                    <!-- Tab content container -->
                    <div class="lg:w-3/5 flex flex-col min-h-0 bg-white">
                        <!-- Enhanced Tabs Navigation -->
                        <div class="flex border-b border-gray-100 px-8 bg-white flex-shrink-0 z-10">
                            <button v-for="(tab, index) in tabs" :key="index" 
                                @click="activeTab = index" 
                                :class="[
                                'px-6 py-4 font-semibold transition-all duration-300 relative overflow-hidden group',
                                activeTab === index
                                    ? 'text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700',
                            ]">
                                <span class="relative z-10 flex items-center space-x-2">
                                    <!-- Tab icons -->
                                    <svg v-if="index === 0" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <svg v-else-if="index === 1" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                    </svg>
                                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                    </svg>
                                    <span>{{ tab }}</span>
                                </span>
                                <!-- Animated tab indicator -->
                                <div v-if="activeTab === index" 
                                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transform transition-all duration-300"></div>
                                <!-- Hover effect -->
                                <div class="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>

                        <!-- Tab content with enhanced styling -->
                        <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <!-- Tab 1: Enhanced product info -->
                            <div v-show="activeTab === 0" class="space-y-8">
                                <div class="space-y-6">
                                    <!-- Product title with edit indicator -->
                                    <div class="relative">
                                        <h3 class="text-3xl font-bold text-gray-800 leading-tight pr-12">
                                            {{ productData?.tenSP || "Đang tải..." }}
                                        </h3>
                                    </div>

                                    <!-- Price with enhanced styling -->
                                    <div v-if="currentVariantPrice" class="relative">
                                        <div class="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                                            {{ formatPrice(currentVariantPrice) }}
                                        </div>
                                    </div>

                                    <!-- Enhanced info cards with management theme -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <!-- Stock info card -->
                                        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100 relative group cursor-pointer hover:shadow-lg transition-all duration-300">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h4 class="font-semibold text-gray-600 text-sm mb-1">Tồn kho</h4>
                                                    <div v-if="currentVariantStock" class="text-emerald-700 font-bold text-xl">
                                                        {{ currentVariantStock }}
                                                    </div>
                                                    <span class="text-emerald-600 text-sm">sản phẩm</span>
                                                </div>
                                                <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Weight info card -->
                                        <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100 relative group cursor-pointer hover:shadow-lg transition-all duration-300">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h4 class="font-semibold text-gray-600 text-sm mb-1">Trọng lượng</h4>
                                                    <span class="text-amber-700 font-bold text-xl">
                                                        {{ currentVariant?.trongLuong || productData?.trongLuong || "-" }}
                                                    </span>
                                                    <span class="text-amber-600 text-sm ml-1">gram</span>
                                                </div>
                                                <div class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Management status card -->
                                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                                        <div class="flex items-center space-x-4">
                                            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 class="font-bold text-blue-700 text-lg">Sản phẩm đang hoạt động</h4>
                                                <p class="text-blue-600">Sẵn sàng để chỉnh sửa và cập nhật thông tin</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab 2: Enhanced description -->
                            <div v-show="activeTab === 1" class="space-y-8">
                                <div class="flex items-center space-x-3 mb-6">
                                    <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                        </svg>
                                    </div>
                                    <h3 class="text-3xl font-bold text-gray-800">Mô tả sản phẩm</h3>
                                </div>

                                <!-- Description with enhanced typography and edit indicator -->
                                <div class="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-100 relative group cursor-pointer hover:shadow-lg transition-all duration-300">
                                    <p class="text-gray-700 leading-relaxed text-lg mb-4">
                                        {{ productData?.moTa || "Không có mô tả" }}
                                    </p>
                                </div>

                                <!-- Enhanced image gallery with management features -->
                                <div v-if="motaImages.length > 0" class="mt-8">
                                    <div class="flex items-center justify-between mb-6">
                                        <h4 class="text-xl font-semibold text-gray-800">Hình ảnh sản phẩm</h4>
                                        <div class="bg-gradient-to-r from-green-500 to-blue-500 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                                            {{ motaImages.length }} ảnh
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        <div v-for="(image, index) in motaImages" :key="index"
                                            class="group aspect-square overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
                                            <img :src="image.url"
                                                :alt="`Hình ảnh ${index + 1} của sản phẩm ${productData.tenSP}`"
                                                class="w-full h-full object-contain cursor-pointer transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy" @click="openFullImage(image.url)" />
                                            <!-- Image management overlay -->
                                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div class="text-white text-center">
                                                    <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                    </svg>
                                                    <span class="text-sm font-medium">Xem chi tiết</span>
                                                </div>
                                            </div>
                                            <!-- Image index -->
                                            <div class="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                {{ index + 1 }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab 3: Enhanced specifications -->
                            <div v-show="activeTab === 2" class="space-y-6">
                                <div class="flex items-center space-x-3 mb-6">
                                    <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                        </svg>
                                    </div>
                                    <h3 class="text-3xl font-bold text-gray-800">Thông số kỹ thuật</h3>
                                </div>

                                <div v-if="productData?.kichThuoc" class="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-indigo-100 relative group cursor-pointer hover:shadow-lg transition-all duration-300">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <h4 class="font-bold text-indigo-700 text-lg mb-3 flex items-center">
                                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                                                </svg>
                                                Kích thước sản phẩm
                                            </h4>
                                            <p class="text-gray-700 text-lg">{{ productData.kichThuoc }}</p>
                                        </div>
                                        <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="bg-gradient-to-br from-gray-50 to-blue-50 p-12 rounded-xl text-center border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors duration-300">
                                    <div class="w-20 h-20 bg-gradient-to-r from-gray-300 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-600 mb-2">Chưa có thông số kỹ thuật</h4>
                                    <p class="text-gray-500 text-lg">Bạn có thể thêm thông số kỹ thuật khi chỉnh sửa sản phẩm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enhanced footer with edit button -->
            <div class="px-8 py-6 border-t border-gray-100 flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-2xl">
                <div class="text-sm text-gray-600">
                    <span class="font-medium">Mã sản phẩm:</span> 
                    <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ productData?.maSP || 'N/A' }}</span>
                </div>
                <button @click="updateProduct(productData)"
                    class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group">
                    <span class="relative z-10 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Chỉnh sửa sản phẩm
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
const router = useRouter();

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
const route = useRoute()
const id = computed(() => route.params.id)

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

const closeModal = () => {
    emit("close");
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

const updateProduct = (product) => {
    router.push({
        path: `/store/${id.value}/manage/management/product/update`,
        query: { maSP: product.maSP }
    });
}

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
    background: linear-gradient(to bottom, #8b5cf6, #ec4899);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #7c3aed, #db2777);
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

/* Floating animation */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}
</style>