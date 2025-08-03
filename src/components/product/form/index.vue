<template>
    <div class="min-w-5xl w-full h-full max-w-7xl mx-auto">
        <div class="h-fit p-6">
            <div class="h-fit w-full rounded-lg space-y-5">
                <div v-if="(props.id && !sanPham.isNew) || (!props.id && sanPham.isNew)">
                    <ProductFormBaseInfo ref="baseInf" :sanPham="sanPham" />
                </div>
                <div v-if="(props.id && !sanPham.isNew) || (!props.id && sanPham.isNew)">
                    <ProductFormSalesInfo ref="salesInf" :sanPham="sanPham" />
                </div>
                
                <div class="w-full h-fit px-8 py-4 rounded-lg bg-white sticky bottom-0 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
                    <div class="w-full h-fit flex items-center round-t-md justify-end space-x-4">
                        <button
                            @click="cancel()"
                            class="py-auto px-6 bg-transparent h-10 text-sm text-zinc-700 rounded-md cursor-pointer border-[1px] border-zinc-400 hover:bg-zinc-100 box-border"
                        >
                            Hủy
                        </button>
                        <button
                            @click="saveAndHide()"
                            class="py-auto px-6 bg-transparent h-10 text-sm text-zinc-700 rounded-md cursor-pointer border-[1px] border-zinc-400 hover:bg-zinc-100 box-border"
                        >
                            Lưu & Ẩn
                        </button>
                        <button
                            @click="saveAndShow()"
                            class="py-auto px-6 bg-emerald-400 h-10 text-sm text-white rounded-md hover:bg-emerald-500 cursor-pointer"
                        >
                            Lưu & Hiển thị
                        </button>
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
    console.log(baseInf.value.validateForm())
    console.log(salesInf.value.validateForm())
    return (baseInf.value.validateForm() && salesInf.value.validateForm());
};

const saveAndHide = () => {
    sanPham.daAn = true;
    submit();
};

const saveAndShow = () => {
    sanPham.daAn = false; // ✅ Sửa lại: false = hiển thị
    submit();
};

const cancel = () => {
    router.push(`/store/${id.value}/manage`);
};

const emit = defineEmits(["submit"]);
const submit = () => {
    console.log(validateForm())
    if (validateForm()) {
            console.log("Ở đây")

        emit("submit", sanPham);
    } else {
        // Thông báo lỗi 
    }
};

// ✅ CẤU TRÚC DỮ LIỆU CHÍNH XÁC
const sanPham = reactive({
    // Thông tin cơ bản
    isNew: true,
    maSP: null,           // ✅ Thêm field này cho update
    tenSP: "",
    maGHSH: null,
    danhMuc: "",
    giaSP: null,
    moTa: "",
    soLuong: null,
    kichThuoc: null,
    trongLuong: null,
    daAn: false,
    
    // Dữ liệu ảnh từ server
    images: [],           // Ảnh hiện tại từ server
    
    // Dữ liệu cho upload
    newFiles: [],         // ✅ File objects sẽ upload
    newImageDtos: []      // ✅ ImageDto tương ứng với newFiles
});

const authStore = useAuthStore();
const { $api } = useNuxtApp();

async function getProduct(id) {
    try {
        const res = await $api.get(`products/${id}`);
        
        // ✅ Mapping dữ liệu chính xác
        sanPham.maSP = res.data.maSP;
        sanPham.images = res.data.images;
        sanPham.tenSP = res.data.tenSP;
        sanPham.danhMuc = res.data.danhMuc;
        sanPham.moTa = res.data.moTa;
        sanPham.soLuong = res.data.soLuong;
        sanPham.giaSP = res.data.giaSP;
        sanPham.kichThuoc = res.data.kichThuoc;
        sanPham.trongLuong = res.data.trongLuong;
        sanPham.daAn = res.data.daAn;
        sanPham.maGHSH = res.data.maGHSH; 

        sanPham.isNew = false;
        
        // ✅ Reset dữ liệu upload
        sanPham.newFiles = [];
        sanPham.newImageDtos = [];
        
    } catch (error) {
        console.error("Lỗi:", error);
        showError();
    }
}

onMounted(() => {
    if (props.id) {
        getProduct(props.id);
    } else {
        // ✅ Set maGHSH cho sản phẩm mới
        sanPham.maGHSH = authStore.user.maGHSH;
    }
});
</script>