<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div class="min-w-5xl w-full h-full max-w-7xl mx-auto">
            <div class="h-fit p-8">
                <div class="h-fit w-full space-y-8">
                    <!-- Header với animation -->
                    <div class=" mb-12">
                        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            {{ props.id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}
                        </h1>
                    </div>

                    <!-- Form sections với stagger animation -->
                    <div v-if="(props.id && !sanPham.isNew) || (!props.id && sanPham.isNew)" 
                         class="transform transition-all duration-500 hover:scale-[1.01]">
                        <ProductFormBaseInfo ref="baseInf" :sanPham="sanPham" />
                    </div>
                    
                    <div v-if="(props.id && !sanPham.isNew) || (!props.id && sanPham.isNew)"
                         class="transform transition-all duration-500 hover:scale-[1.01] delay-100">
                        <ProductFormSalesInfo ref="salesInf" :sanPham="sanPham" />
                    </div>
                    
                    <!-- Modern sticky footer với glassmorphism -->
                    <div class="w-full h-fit p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 sticky bottom-4 shadow-2xl shadow-blue-500/10">
                        <div class="w-full h-fit flex items-center justify-end space-x-4">
                            <!-- Cancel button -->
                            <button
                                @click="cancel()"
                                class="group px-8 py-3 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-800 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <span class="flex items-center space-x-2">
                                    <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    <span>Hủy</span>
                                </span>
                            </button>

                            <!-- Save & Hide button -->
                            <button
                                @click="saveAndHide()"
                                class="group px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <span class="flex items-center space-x-2">
                                    <svg class="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                    <span>Lưu & Ẩn</span>
                                </span>
                            </button>

                            <!-- Save & Show button -->
                            <button
                                @click="saveAndShow()"
                                class="group px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <span class="flex items-center space-x-2">
                                    <svg class="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Lưu & Hiển thị</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();
const props = defineProps(["id", "isNew"]);
const route = useRoute()
const id = computed(() => route.params.id)
const baseInf = ref(null);
const salesInf = ref(null);

const validateForm = () => {
    return (baseInf.value.validateForm() && salesInf.value.validateForm());
};

const saveAndHide = () => {
    sanPham.daAn = true;
    submit();
};

const saveAndShow = () => {
    sanPham.daAn = false;
    submit();
};

const cancel = () => {
    router.push(`/store/${id.value}/manage`);
};

const emit = defineEmits(["submit"]);
const submit = () => {
    if (validateForm()) {
        emit("submit", sanPham);
    } else {
        // Show error notification
    }
};

const sanPham = reactive({
    isNew: true,
    maSP: null,
    tenSP: "",
    maGHSH: null,
    danhMuc: "",
    giaSP: null,
    moTa: "",
    soLuong: null,
    kichThuoc: null,
    trongLuong: null,
    daAn: false,
    images: [],
    newFiles: [],
    newImageDtos: []
});

const authStore = useAuthStore();
const { $api } = useNuxtApp();

async function getProduct(id) {
    try {
        const res = await $api.get(`products/${id}`);
        
        Object.assign(sanPham, {
            maSP: res.data.maSP,
            images: res.data.images,
            tenSP: res.data.tenSP,
            danhMuc: res.data.danhMuc,
            moTa: res.data.moTa,
            soLuong: res.data.soLuong,
            giaSP: res.data.giaSP,
            kichThuoc: res.data.kichThuoc,
            trongLuong: res.data.trongLuong,
            daAn: res.data.daAn,
            maGHSH: res.data.maGHSH,
            isNew: false,
            newFiles: [],
            newImageDtos: []
        });
        
    } catch (error) {
        console.error("Lỗi:", error);
        showError();
    }
}

onMounted(() => {
    if (props.id) {
        getProduct(props.id);
    } else {
        sanPham.maGHSH = authStore.user.maGHSH;
    }
});
</script>

<style scoped>
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
</style>