<template>
    <div class="h-fit w-full p-8 rounded-lg bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
        <div class="text-xl font-semibold text-zinc-900 w-full rounded-t-xl bg-zinc-50 mb-10">
            Thông tin bán hàng
        </div>
        
        <div>
            <div class="flex items-center mt-5">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Giá bán
                </div>
                <div class="relative flex-1 grid grid-cols-2 gap-6">
                    <span
                        class="absolute top-1/2 -translate-y-1/2 left-4 h-6 border-r-[1px] border-zinc-300 pr-2 text-zinc-300"
                        >đ</span
                    >
                    <input
                        type="number"
                        v-model="props.sanPham.giaSP"
                        class="w-full text-zinc-700 relative text-left h-10 outline-none pr-3 pl-10 border-[1px] border-zinc-300 hover:border-zinc-400 focus:border-zinc-400 rounded-md"
                        placeholder="Nhập vào"
                    />
                </div>
            </div>
            <p
                v-if="validateField(props.sanPham.giaSP, 'giaSP') != true"
                class="pl-56 text-xs text-red-400 pt-2"
            >
                {{ validateField(props.sanPham.giaSP, "giaSP") }}
            </p>
            <div class="flex items-center mt-5">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Trọng lượng
                </div>
                <div class="relative flex-1 grid grid-cols-2 gap-6">
                    <span
                        class="absolute top-1/2 -translate-y-1/2 left-4 h-6 border-r-[1px] pr-2 text-zinc-300"
                        >gr</span
                    >
                    <input
                        type="number"
                        v-model="props.sanPham.trongLuong"
                        class="w-full text-zinc-700 relative text-left h-10 outline-none pr-3 pl-11 border-[1px] border-zinc-300 hover:border-zinc-400 focus:border-zinc-400 rounded-md"
                        placeholder="Nhập vào"
                    />
                </div>
            </div>
            <p
                v-if="
                    validateField(props.sanPham.trongLuong, 'trongLuong') !=
                    true
                "
                class="pl-56 text-xs text-red-400 pt-2"
            >
                {{ validateField(props.sanPham.trongLuong, "trongLuong") }}
            </p>
            <div class="flex items-center mt-5">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Kích thước
                </div>
                <div class="relative flex-1 grid grid-cols-2 gap-6">
                    <span
                        class="absolute top-1/2 -translate-y-1/2 left-4 h-6 border-r-[1px] pr-2 text-zinc-300"
                        >AxB</span
                    >
                    <input
                        type="text"
                        v-model="props.sanPham.kichThuoc"
                        class="w-full text-zinc-700 relative text-left h-10 outline-none pr-3 pl-11 border-[1px] border-zinc-300 hover:border-zinc-400 focus:border-zinc-400 rounded-md"
                        placeholder="Nhập vào"
                    />
                </div>
            </div>
            <p
                v-if="
                    validateField(props.sanPham.kichThuoc, 'kichThuoc') !=
                    true
                "
                class="pl-56 text-xs text-red-400 pt-2"
            >
                {{ validateField(props.sanPham.kichThuoc, "kichThuoc") }}
            </p>
            <div class="flex items-center mt-5">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Kho hàng
                </div>
                <div class="relative flex-1 grid grid-cols-2 gap-6">
                    <input
                        type="number"
                        v-model="props.sanPham.soLuong"
                        class="w-full text-zinc-700 relative text-left h-10 outline-none p-3 border-[1px] border-zinc-300 hover:border-zinc-400 focus:border-zinc-400 rounded-md"
                        placeholder="0"
                    />
                </div>
            </div>
            <p
                v-if="validateField(props.sanPham.soLuong, 'soLuong') != true"
                class="pl-56 text-xs text-red-400 pt-2"
            >
                {{ validateField(props.sanPham.soLuong, "soLuong") }}
            </p>
        </div>
    </div>
</template>
<script setup>
import {  onBeforeMount } from "vue";
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

    // if (props.sanPham.phanLoai_SP.length === 2) {
    //     props.sanPham.phanLoai_SP[0].tuyChon_PL.forEach((option1, index1) => {
    //         props.sanPham.phanLoai_SP[1].tuyChon_PL.forEach((option2, index2) => {
    //             salesList.push({
    //                 tuyChonPhanLoai1_BH: index1,
    //                 tuyChonPhanLoai2_BH: index2,
    //                 giaBan_BH: null,
    //                 trongLuong_BH: null,
    //                 khoHang_BH: null,
    //             });
    //         });
    //     });
    // } else if (props.sanPham.phanLoai_SP.length === 1) {
    //     props.sanPham.phanLoai_SP[0].tuyChon_PL.forEach((option1, index1) => {
    //         salesList.push({
    //             tuyChonPhanLoai1_BH: index1,
    //             tuyChonPhanLoai2_BH: null,
    //             giaBan_BH: null,
    //             trongLuong_BH: null,
    //             khoHang_BH: null,
    //         });
    //     });
    // } else {
    //     salesList.push({
    //         tuyChonPhanLoai1_BH: null,
    //         tuyChonPhanLoai2_BH: null,
    //         giaBan_BH: null,
    //         trongLuong_BH: null,
    //         khoHang_BH: null,
    //     });
    // }

    // return salesList;
};

onBeforeMount(() => {
    // if (props.sanPham.ttBanHang_SP.length === 0) {
    //     props.sanPham.ttBanHang_SP = generateSalesList();
    // }
});

// Kiểm tra giá trị hợp lệ
const validateField = (value, fieldType) => {
    if (value === "" || value === null || value === undefined) return "Không được để trống ô";
    if (fieldType === "giaSP" && (value < 1000 || value > 120000000))
        return "Giá từ 1.000 - 120.000.000";
    if (fieldType === "trongLuong" && (value <= 0 || value > 1000000))
        return "Trọng lượng từ 0 - 1.000.000";
    if (fieldType === "soLuong" && (value < 0 || value > 10000000))
        return "Số lượng tối đa 10.000.000";
    if (fieldType === "kickThuoc") {
        const regex = /^\d+(\.\d+)?x\d+(\.\d+)?x\d+(\.\d+)?$/;
        if (!regex.test(value))
            return "Kích thước phải theo định dạng DxRxC (vd: 10x20x30)";
    }
    return true;
};

// Hàm kiểm tra dữ liệu toàn bộ
const validateForm = () => {
    // Kiểm tra thông tin bán hàng

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
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Ẩn nút tăng giảm trên Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>