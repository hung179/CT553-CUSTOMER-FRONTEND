<template>
    <div class="h-fit w-full p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500">
        <!-- Modern header with gradient -->
        <div class="flex items-center mb-8">
            <div class="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
            <h2 class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Thông tin cơ bản
            </h2>
        </div>
        
        <!-- Product Cover Image Section -->
        <div class="w-full h-fit mb-10">
            <div class="w-full h-fit flex items-start">
                <div class="w-48 mr-8 flex justify-end text-sm font-medium text-slate-700">
                    <span class="text-red-500 mr-2 text-lg">*</span>
                    <span>Ảnh đại diện sản phẩm</span>
                </div>
                
                <div class="flex-1 flex items-start">
                    <div class="flex items-center space-x-4">
                        <!-- Existing cover images -->
                        <div v-for="(image, i) in daiDienImages" :key="i" class="relative group">
                            <div class="w-28 h-28 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <img :src="image.url" alt="Product Cover"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <button @click="deleteImgCover"
                                class="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- New cover image preview -->
                        <div v-if="imageCover && daiDienImages.length === 0" class="relative group">
                            <div class="w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-300 shadow-lg hover:shadow-xl">
                                <img :src="imageCover" alt="New Cover"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <button @click="removeImgCover"
                                class="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Add cover image button -->
                        <div v-if="!imageCover && daiDienImages.length === 0" 
                             @click="$refs.file.click()"
                             class="w-28 h-28 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:shadow-lg group">
                            <div class="w-full h-full flex flex-col justify-center items-center">
                                <svg class="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors duration-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span class="text-xs text-slate-500 group-hover:text-blue-600 font-medium text-center">Thêm ảnh đại diện</span>
                            </div>
                        </div>
                    </div>

                    <!-- Instructions -->
                    <div class="ml-8 mt-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 class="font-medium text-blue-900 mb-2">Hướng dẫn tải ảnh:</h4>
                        <ul class="text-sm text-blue-700 space-y-1">
                            <li class="flex items-start">
                                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                Tải lên hình ảnh tỷ lệ 1:1 để có hiển thị tốt nhất
                            </li>
                            <li class="flex items-start">
                                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                Ảnh đại diện sẽ hiển thị tại trang tìm kiếm và gợi ý
                            </li>
                        </ul>
                    </div>

                    <input ref="file" type="file" class="hidden" accept="image/*" @change="handleFileChange_imgCover" />
                </div>
            </div>
            
            <!-- Cover image validation error -->
            <div v-if="showDaiDienError" class="ml-56 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    {{ daiDienErrorMessage }}
                </p>
            </div>
        </div>

        <!-- Product Description Images Section -->
        <div class="w-full h-fit mb-10">
            <div class="w-full h-fit flex items-start">
                <div class="w-48 mr-8 flex justify-end text-sm font-medium text-slate-700">
                    <span class="text-red-500 mr-2 text-lg">*</span>
                    <span>Ảnh mô tả sản phẩm</span>
                </div>
                
                <div class="flex-1">
                    <div class="grid grid-cols-5 gap-4">
                        <!-- Existing description images -->
                        <div v-for="(image, index) in moTaImages" :key="`existing-${index}`"
                             class="relative group">
                            <div class="w-24 h-24 rounded-xl overflow-hidden border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-md hover:shadow-lg">
                                <img :src="image.url" alt="Description Image"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <button @click="deleteImg(index, image.publicId)"
                                class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- New description images -->
                        <div v-for="(image, index) in images" :key="`new-${index}`" 
                             class="relative group">
                            <div class="w-24 h-24 rounded-xl overflow-hidden border-2 border-blue-300 shadow-md hover:shadow-lg">
                                <img :src="image" alt="New Description Image"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <button @click="removeImg(index)"
                                class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Add description images button -->
                        <div v-if="totalMoTaImages < 9" 
                             @click="$refs.files.click()"
                             class="w-24 h-24 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:shadow-md group">
                            <div class="w-full h-full flex flex-col justify-center items-center">
                                <svg class="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span class="text-xs text-slate-500 group-hover:text-blue-600 font-medium text-center mt-1">
                                    {{ totalMoTaImages }}/{{ maxFiles }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <input ref="files" type="file" multiple class="hidden" accept="image/*" 
                           @change="handleFileChange_imgs" :disabled="totalMoTaImages >= 9" />
                </div>
            </div>
        </div>

        <!-- Product Name -->
        <div class="w-full h-fit mb-10">
            <div class="w-full h-fit flex items-center">
                <div class="w-48 mr-8 flex justify-end text-sm font-medium text-slate-700">
                    <span class="text-red-500 mr-2 text-lg">*</span>
                    <span>Tên sản phẩm</span>
                </div>
                <div class="relative flex-1">
                    <input type="text" 
                           v-model="props.sanPham.tenSP" 
                           placeholder="Nhập tên sản phẩm..."
                           :maxlength="120"
                           class="w-full text-slate-700 bg-white border-2 border-slate-200 hover:border-blue-300 focus:border-blue-500 rounded-xl h-12 outline-none pl-4 pr-20 text-sm transition-all duration-300 shadow-sm focus:shadow-md" />
                    <div class="absolute right-0 top-0 h-12 flex items-center">
                        <div class="h-6 w-px bg-slate-300 mr-4"></div>
                        <span class="text-xs text-slate-500 mr-4 font-medium">
                            {{ (props.sanPham.tenSP || '').length }}/120
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="validateField(props.sanPham.tenSP, 'tenSP') !== true" class="ml-56 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    {{ validateField(props.sanPham.tenSP, "tenSP") }}
                </p>
            </div>
        </div>

        <!-- Category Selection -->
        <div @click="getCategory" class="w-full h-fit mb-10">
            <DropdownCategories v-model="selectedCategory" :categories="categories" />
        </div>

        <!-- Product Description -->
        <div class="w-full h-fit">
            <div class="w-full h-fit flex items-start">
                <div class="w-48 mr-8 flex justify-end text-sm font-medium text-slate-700 pt-3">
                    <span class="text-red-500 mr-2 text-lg">*</span>
                    <span>Mô tả sản phẩm</span>
                </div>
                <div class="flex-1 flex flex-col">
                    <textarea v-model="props.sanPham.moTa" 
                              :maxlength="200"
                              placeholder="Nhập mô tả chi tiết về sản phẩm của bạn..."
                              class="w-full text-slate-700 bg-white border-2 border-slate-200 hover:border-blue-300 focus:border-blue-500 rounded-xl h-48 outline-none p-4 text-sm transition-all duration-300 resize-none overflow-y-auto shadow-sm focus:shadow-md"></textarea>
                    <div class="flex justify-end mt-2">
                        <span class="text-xs text-slate-500 font-medium">
                            {{ (props.sanPham.moTa || '').length }}/200
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="validateField(props.sanPham.moTa, 'moTa') !== true" class="ml-56 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    {{ validateField(props.sanPham.moTa, "moTa") }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["sanPham"]);

// Initialize default values
const initializeDefaultValues = () => {
    if (!props.sanPham.images) props.sanPham.images = [];
    if (!props.sanPham.newFiles) props.sanPham.newFiles = [];
    if (!props.sanPham.newImageDtos) props.sanPham.newImageDtos = [];
    if (!props.sanPham.tenSP) props.sanPham.tenSP = '';
    if (!props.sanPham.moTa) props.sanPham.moTa = '';
};

initializeDefaultValues();

const imageCover = ref(null);
const selectedCategory = ref(props.sanPham.danhMuc);
const images = ref([]);
const maxFiles = 9;
const categories = ref([]);

// Computed properties
const daiDienImages = computed(() => {
    if (!props.sanPham.images || !Array.isArray(props.sanPham.images)) return [];
    return props.sanPham.images.filter((img) => img.loaiAnh === 'DAIDIEN');
});

const moTaImages = computed(() => {
    if (!props.sanPham.images || !Array.isArray(props.sanPham.images)) return [];
    return props.sanPham.images.filter((img) => img.loaiAnh === 'MOTA');
});

const totalMoTaImages = computed(() => {
    return moTaImages.value.length + images.value.length;
});

const showDaiDienError = computed(() => {
    return !imageCover.value && daiDienImages.value.length === 0;
});

const daiDienErrorMessage = computed(() => {
    if (showDaiDienError.value) return "Vui lòng tải lên ảnh đại diện";
    return "";
});

// Watchers
watch(selectedCategory, (newValue) => {
    if (newValue) props.sanPham.danhMuc = newValue;
});

// File handling methods
const handleFileChange_imgCover = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (!props.sanPham.newFiles) props.sanPham.newFiles = [];
        if (!props.sanPham.newImageDtos) props.sanPham.newImageDtos = [];

        props.sanPham.newFiles.push(file);
        props.sanPham.newImageDtos.push({
            idChuSoHuu: props.sanPham.maSP || null,
            loaiAnh: "Đại diện",
            chuSoHuu: "Sản phẩm"
        });

        const reader = new FileReader();
        reader.onload = () => imageCover.value = reader.result;
        reader.readAsDataURL(file);
    }
    event.target.value = "";
};

const handleFileChange_imgs = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
        if (!props.sanPham.newFiles) props.sanPham.newFiles = [];
        if (!props.sanPham.newImageDtos) props.sanPham.newImageDtos = [];

        const currentTotal = moTaImages.value.length + images.value.length;
        const remainingSlots = maxFiles - currentTotal;
        const filesToProcess = files.slice(0, remainingSlots);

        filesToProcess.forEach((file) => {
            props.sanPham.newFiles.push(file);
            props.sanPham.newImageDtos.push({
                idChuSoHuu: props.sanPham.maSP || null,
                loaiAnh: "Mô tả",
                chuSoHuu: "Sản phẩm"
            });

            const reader = new FileReader();
            reader.onload = () => images.value.push(reader.result);
            reader.readAsDataURL(file);
        });
    }
    event.target.value = "";
};

// Image removal methods
const removeImgCover = () => {
    if (!props.sanPham.newImageDtos || !props.sanPham.newFiles) return;
        
    const coverIndex = props.sanPham.newImageDtos.findIndex(dto => dto.loaiAnh === 'Đại diện');
    if (coverIndex !== -1) {
        props.sanPham.newFiles.splice(coverIndex, 1);
        props.sanPham.newImageDtos.splice(coverIndex, 1);
    }
    imageCover.value = null;
};

const deleteImgCover = () => {
    if (!props.sanPham.images) return;
    
    const daiDienImage = props.sanPham.images.find(img => img.loaiAnh === 'DAIDIEN');
    if (daiDienImage) {
        const index = props.sanPham.images.findIndex(img => img.loaiAnh === 'DAIDIEN');
        if (index !== -1) {
            props.sanPham.images.splice(index, 1);
        }
    }
};

const removeImg = (index) => {
    if (!props.sanPham.newImageDtos || !props.sanPham.newFiles) return;

    const moTaIndexes = [];
    props.sanPham.newImageDtos.forEach((dto, i) => {
        if (dto.loaiAnh === 'Mô tả') {
            moTaIndexes.push(i);
        }
    });
    
    const actualIndex = moTaIndexes[index];
    if (actualIndex !== undefined && actualIndex >= 0) {
        props.sanPham.newFiles.splice(actualIndex, 1);
        props.sanPham.newImageDtos.splice(actualIndex, 1);
    }
    images.value.splice(index, 1);
};

const deleteImg = (index, public_id) => {
    if (props.sanPham.images) {
        const originalIndex = props.sanPham.images.findIndex(img =>
            img.loaiAnh === 'MOTA' && img.publicId === public_id
        );
        if (originalIndex !== -1) {
            props.sanPham.images.splice(originalIndex, 1);
        }
    }
};

// Category methods
const getCategoryAttributes = (categoryId) => {
    let attrs = [];
    let seen = new Set();
    let currentCategory = categories.value.find((cat) => cat._id === categoryId);

    while (currentCategory) {
        if (currentCategory.dsThuocTinh_NH?.length) {
            currentCategory.dsThuocTinh_NH.forEach((attr) => {
                if (!seen.has(attr)) {
                    seen.add(attr);
                    attrs.push({ thuocTinh_CTSP: attr, giaTri_CTSP: "" });
                }
            });
        }
        if (!currentCategory.idCha_NH) break;
        currentCategory = categories.value.find((cat) => cat._id === currentCategory.idCha_NH);
    }
    return attrs;
};

const authStore = useAuthStore();
const { $api } = useNuxtApp();

async function getCategory() {
    try {
        const res = await $api.get("/categories/all");
        if (res.data) {
            categories.value = res.data.content;
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

const categorySelected = ref(null);

const findCategoryPath = (id) => {
    const category = categories.value.find((cat) => cat._id === id);
    if (!category) return { category1: null, category2: null, category3: null };

    if (category.cap_NH === 1) {
        return { category1: category, category2: null, category3: null };
    }
    if (category.cap_NH === 2) {
        const parent1 = categories.value.find((cat) => cat._id === category.idCha_NH);
        return { category1: parent1 || null, category2: category, category3: null };
    }
    if (category.cap_NH === 3) {
        const parent2 = categories.value.find((cat) => cat._id === category.idCha_NH);
        const parent1 = categories.value.find((cat) => cat._id === parent2?.idCha_NH);
        return { category1: parent1 || null, category2: parent2 || null, category3: category };
    }
    return { category1: null, category2: null, category3: null };
};

const getCategoryPathString = (_id) => {
    const categoryPath = findCategoryPath(_id);
    categorySelected.value = findCategoryPath(_id);
    return [categoryPath.category1?.ten_NH].filter(Boolean).join(" > ");
};

const formattedCategoriesSelected = ref("Chọn ngành hàng");

const updateCategoriesSelected = (value) => {
    if (!value) {
        formattedCategoriesSelected.value = "Chọn ngành hàng";
        categorySelected.value = { category1: null, category2: null, category3: null };
        return;
    }

    if (typeof value === 'object' && value !== null) {
        let category1Obj = null;
        if (value.cap1_NH) {
            category1Obj = categories.value.find(cat => cat._id === value.cap1_NH);
        }

        categorySelected.value = {
            category1: category1Obj,
            category2: null,
            category3: null
        };

        formattedCategoriesSelected.value = [category1Obj?.ten_NH].filter(Boolean).join(" > ");

        if (!props.sanPham.nganhHang_SP || typeof props.sanPham.nganhHang_SP !== 'object') {
            props.sanPham.nganhHang_SP = value;
        }
    } else if (typeof value === 'string') {
        formattedCategoriesSelected.value = getCategoryPathString(value);
    }
};

const handlecategoriesSelected = (data) => {
    props.sanPham.nganhHang_SP = data.categoryObject;
    updateCategoriesSelected(data.categoryObject);

    const finalId = data._id;
    if (finalId) {
        props.sanPham.ttChiTiet_SP = getCategoryAttributes(finalId);
    }
};

// Validation methods
const validateField = (value, fieldType) => {
    if (fieldType === "DAIDIEN") {
        if (!imageCover.value && daiDienImages.value.length === 0) {
            return "Vui lòng tải lên ảnh đại diện";
        }
    }

    if (!value) return "Không được để trống ô";

    if (fieldType === "tenSP" && value.length < 10)
        return "Tên sản phẩm phải có ít nhất 10 ký tự";

    if (fieldType === "moTa" && value.length < 100)
        return "Mô tả sản phẩm ít nhất 100 ký tự";

    return true;
};

const validateForm = () => {
    if (!imageCover.value && daiDienImages.value.length === 0) return false;
    if (!props.sanPham.danhMuc) return false;
    if (validateField(props.sanPham.tenSP, "tenSP") !== true) return false;
    if (validateField(props.sanPham.moTa, "moTa") !== true) return false;
    return true;
};

onMounted(async () => {
    initializeDefaultValues();
});

const showCategoryTable = ref(false);
defineExpose({ validateForm });
</script>