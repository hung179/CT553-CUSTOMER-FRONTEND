<template>
    <div class="h-fit w-full p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500">
        <!-- Modern header with gradient -->
        <div class="flex items-center mb-8">
            <div class="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mr-4"></div>
            <h2 class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Thông tin bán hàng
            </h2>
        </div>
        
        <div class="space-y-8">
            <!-- Price Field -->
            <div class="group">
                <div class="flex items-center">
                    <div class="w-48 mr-8 flex justify-end text-sm font-medium text-slate-700">
                        <span class="text-red-500 mr-2 text-lg">*</span>
                        <span>Giá bán</span>
                    </div>
                    <div class="relative flex-1 max-w-md">
                        <div class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                            <span class="text-slate-500 font-medium text-sm border-r border-slate-300 pr-3">₫</span>
                        </div>
                        <input
                            type="number"
                            v-model="props.sanPham.giaSP"
                            class="w-full text-slate-700 bg-white border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 rounded-xl h-12 outline-none pl-12 pr-4 text-sm transition-all duration-300 shadow-sm focus:shadow-md group-hover:shadow-md"
                            placeholder="Nhập giá bán..."
                        />
                        <div class="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-if="validateField(props.sanPham.giaSP, 'giaSP') != true" class="ml-56 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-sm text-red-600 flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        {{ validateField(props.sanPham.giaSP, "giaSP") }}
                    </p>
                </div>
            </div>

            <!-- Weight Field -->
            <div class="group">
                <div class="flex items-center">
                    <div class="w-48 mr-8 flex justify-end text-sm font-medium text-slate-700">
                        <span class="text-red-500 mr-2 text-lg">*</span>
                        <span>Trọng lượng</span>
                    </div>
                    <div class="relative flex-1 max-w-md">
                        <div class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                            <span class="text-slate-500 font-medium text-sm border-r border-slate-300 pr-3">gr</span>
                        </div>
                        <input
                            type="number"
                            v-model="props.sanPham.trongLuong"
                            class="w-full text-slate-700 bg-white border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 rounded-xl h-12 outline-none pl-12 pr-4 text-sm transition-all duration-300 shadow-sm focus:shadow-md group-hover:shadow-md"
                            placeholder="Nhập trọng lượng..."
                        />
                        <div class="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-if="validateField(props.sanPham.trongLuong, 'trongLuong') != true" class="ml-56 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-sm text-red-600 flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        {{ validateField(props.sanPham.trongLuong, "trongLuong") }}
                    </p>
                </div>
            </div>

            <!-- Dimensions Field -->
            <div class="group">
                <div class="flex items-center">
                    <div class="w-48 mr-8 flex justify-end text-sm font-medium text-slate-700">
                        <span class="text-red-500 mr-2 text-lg">*</span>
                        <span>Kích thước</span>
                    </div>
                    <div class="relative flex-1 max-w-md">
                        <div class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                            <span class="text-slate-500 font-medium text-sm border-r border-slate-300 pr-2">D×R×C</span>
                        </div>
                        <input
                            type="text"
                            v-model="props.sanPham.kichThuoc"
                            class="w-full text-slate-700 bg-white border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 rounded-xl h-12 outline-none pl-16 pr-4 text-sm transition-all duration-300 shadow-sm focus:shadow-md group-hover:shadow-md"
                            placeholder="VD: 10x20x30"
                        />
                        <div class="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-if="validateField(props.sanPham.kichThuoc, 'kichThuoc') != true" class="ml-56 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-sm text-red-600 flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        {{ validateField(props.sanPham.kichThuoc, "kichThuoc") }}
                    </p>
                </div>
            </div>

            <!-- Stock Quantity Field -->
            <div class="group">
                <div class="flex items-center">
                    <div class="w-48 mr-8 flex justify-end text-sm font-medium text-slate-700">
                        <span class="text-red-500 mr-2 text-lg">*</span>
                        <span>Kho hàng</span>
                    </div>
                    <div class="relative flex-1 max-w-md">
                        <input
                            type="number"
                            v-model="props.sanPham.soLuong"
                            class="w-full text-slate-700 bg-white border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 rounded-xl h-12 outline-none pl-4 pr-12 text-sm transition-all duration-300 shadow-sm focus:shadow-md group-hover:shadow-md"
                            placeholder="Số lượng trong kho..."
                            min="0"
                        />
                        <div class="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-if="validateField(props.sanPham.soLuong, 'soLuong') != true" class="ml-56 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-sm text-red-600 flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        {{ validateField(props.sanPham.soLuong, "soLuong") }}
                    </p>
                </div>
            </div>            
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
const props = defineProps(["sanPham"]);

const addCategory = () => {
    if (props.sanPham.phanLoai_SP.length < 2) {
        props.sanPham.phanLoai_SP.push({ ten_PL: "", tuyChon_PL: [] });
        props.sanPham.ttBanHang_SP = generateSalesList();
    }
};

const removeCategory = (index) => {
    props.sanPham.phanLoai_SP.splice(index, 1);
    props.sanPham.ttBanHang_SP = generateSalesList();
};

const generateSalesList = () => {
    const salesList = [];
    return salesList;
};

onBeforeMount(() => {
    // Initialization logic here if needed
});

// Validation methods
const validateField = (value, fieldType) => {
    if (value === "" || value === null || value === undefined) return "Không được để trống ô";
    if (fieldType === "giaSP" && (value < 1000 || value > 120000000))
        return "Giá từ 1.000đ - 120.000.000đ";
    if (fieldType === "trongLuong" && (value <= 0 || value > 1000000))
        return "Trọng lượng từ 1gr - 1.000.000gr";
    if (fieldType === "soLuong" && (value < 0 || value > 10000000))
        return "Số lượng tối đa 10.000.000 sản phẩm";
    if (fieldType === "kichThuoc") {
        const regex = /^\d+(\.\d+)?x\d+(\.\d+)?x\d+(\.\d+)?$/;
        if (!regex.test(value))
            return "Kích thước phải theo định dạng D×R×C (VD: 10x20x30)";
    }
    return true;
};

const validateForm = () => {
    if (
        validateField(props.sanPham.giaSP, "giaSP") !== true ||
        validateField(props.sanPham.trongLuong, "trongLuong") !== true ||
        validateField(props.sanPham.soLuong, "soLuong") !== true ||
        validateField(props.sanPham.kichThuoc, "kichThuoc") !== true
    ) {
        return false;
    }
    return true;
};

defineExpose({ validateForm });
</script>

<style scoped>
/* Hide number input spinners */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

/* Custom focus ring for better accessibility */
input:focus {
    
}

/* Smooth transitions for all interactive elements */
.group:hover input {
    transform: translateY(-1px);
}
</style>