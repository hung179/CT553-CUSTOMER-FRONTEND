<template>
    <div class="h-fit w-full p-8 rounded-lg bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
        <div class="text-xl font-semibold text-zinc-900 w-full rounded-t-xl bg-zinc-50 mb-10">
            Thông tin cơ bản
        </div>
        <!-- Ảnh đại diện  -->
        <div class="w-full h-fit">
            <div class="w-full h-fit flex">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Ảnh đại diện sản phẩm
                </div>
                <div class="flex-1 flex">
                    <!-- Sử dụng computed để đảm bảo an toàn -->
                    <div v-for="(image, i) in daiDienImages" :key="i" class="flex-1 flex">
                        <div v-if="image" class="relative group w-20 h-20">
                            <!-- Hiển thị ảnh sau khi chọn -->
                            <img :src="image.url" alt="Product Image"
                                class="w-full h-full object-cover border-[1px] border-zinc-300 rounded-md" />
                            <div @click="deleteImgCover"
                                class="absolute bottom-0 w-full h-fit bg-zinc-200 rounded-b-md group-hover:flex justify-center items-center py-1 hidden cursor-pointer">
                                <Icon name="material-symbols:delete-outline-rounded" size="18" class="text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <!-- Hiển thị ảnh cover mới được chọn -->
                    <div v-if="imageCover && daiDienImages.length === 0" class="relative group w-20 h-20">
                        <img :src="imageCover" alt="Product Image1"
                            class="w-full h-full object-cover border-[1px] border-zinc-300 rounded-md" />
                        <div @click="removeImgCover"
                            class="absolute bottom-0 w-full h-fit bg-zinc-200 rounded-b-md group-hover:flex justify-center items-center py-1 hidden cursor-pointer">
                            <Icon name="material-symbols:delete-outline-rounded" size="18" class="text-white" />
                        </div>
                    </div>

                    <!-- Nút thêm ảnh đại diện -->
                    <div v-if="!imageCover && daiDienImages.length === 0" @click="$refs.file.click()"
                        class="w-20 h-20 border-[1px] border-zinc-400 rounded-md border-dashed bg-transparent hover:bg-emerald-200/20 hover:border-emerald-400 cursor-pointer">
                        <div class="w-full h-full flex flex-col justify-center items-center">
                            <Icon name="material-symbols:add-photo-alternate-outline-rounded" size="28px"
                                class="text-emerald-400" />
                            <p class="text-xs text-center">Thêm hình ảnh</p>
                        </div>
                    </div>

                    <div class="h-full flex-1 ml-10 mt-2 text-xs text-zinc-600">
                        <ul class="list-disc">
                            <li>Tải lên hình ảnh 1:1.</li>
                            <li>
                                Ảnh đại diện sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý,...
                                Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm
                                của bạn
                            </li>
                        </ul>
                    </div>

                    <input ref="file" type="file" class="hidden" accept="image/*"
                        @change="handleFileChange_imgCover" />
                </div>
            </div>
            <!-- Hiển thị lỗi validation cho ảnh đại diện -->
            <p v-if="showDaiDienError" class="pl-54 text-xs text-red-500 pt-2">
                {{ daiDienErrorMessage }}
            </p>
        </div>

        <!-- Ảnh sản phẩm -->
        <div class="w-full h-fit mt-10">
            <div class="w-full h-fit flex">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Ảnh mô tả sản phẩm
                </div>
                <div class="flex-1">
                    <div class="flex space-x-2 flex-wrap">
                        <!-- Hiển thị ảnh sản phẩm đã có -->
                        <div v-for="(image, index) in moTaImages" :key="`existing-${index}`"
                            class="relative group w-20 h-20 rounded-md">
                            <img :src="image.url" alt="Product Image"
                                class="w-full h-full object-cover rounded-md border-[1px] border-zinc-300" />
                            <div @click="deleteImg(index, image.public_id)"
                                class="absolute bottom-0 w-full h-fit bg-zinc-200/90 rounded-b-md group-hover:flex justify-center items-center py-1 hidden cursor-pointer">
                                <Icon name="material-symbols:delete-outline-rounded" size="18" class="text-white" />
                            </div>
                        </div>

                        <!-- Hiển thị các ảnh mới được chọn -->
                        <div v-for="(image, index) in images" :key="`new-${index}`" 
                            class="relative group w-20 h-20 rounded-md">
                            <img :src="image" alt="Product Image"
                                class="w-full h-full object-cover rounded-md border-[1px] border-zinc-300" />
                            <div @click="removeImg(index)"
                                class="absolute bottom-0 w-full h-fit bg-zinc-200/90 rounded-b-md group-hover:flex justify-center items-center py-1 hidden cursor-pointer">
                                <Icon name="material-symbols:delete-outline-rounded" size="18" class="text-white" />
                            </div>
                        </div>

                        <!-- Nút thêm ảnh mô tả -->
                        <div v-if="totalMoTaImages < 9" @click="$refs.files.click()"
                            class="w-20 h-20 border-[1px] border-zinc-400 rounded-md border-dashed bg-transparent hover:bg-emerald-200/20 hover:border-emerald-400 cursor-pointer">
                            <div class="w-full h-full flex flex-col justify-center items-center">
                                <Icon name="material-symbols:add-photo-alternate-outline-rounded" size="28px"
                                    class="text-emerald-400" />
                                <p class="text-xs text-center">
                                    Thêm hình ảnh ({{ totalMoTaImages }}/{{ maxFiles }})
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Input file ẩn -->
                <input ref="files" type="file" multiple class="hidden" accept="image/*" @change="handleFileChange_imgs"
                    :disabled="totalMoTaImages >= 9" />
            </div>
        </div>

        <!-- Tên sản phẩm  -->
        <div class="w-full h-fit mt-10">
            <div class="w-full h-fit flex items-center">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Tên sản phẩm
                </div>
                <div class="relative flex-1">
                    <input type="text" id="p_name" v-model="props.sanPham.tenSP" placeholder="Nhập tên sản phẩm"
                        :maxlength="120"
                        class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none pl-3 pr-20 focus:border-zinc-400" />
                    <div class="absolute right-0 top-0 w-20 h-10 flex items-center">
                        <div class="h-6 w-[1px] bg-zinc-300"></div>
                        <p class="w-full text-center mx-2 text-zinc-400">
                            {{ (props.sanPham.tenSP || '').length }}/120
                        </p>
                    </div>
                </div>
            </div>
            <p v-if="validateField(props.sanPham.tenSP, 'tenSP') !== true" class="pl-54 text-xs text-red-500 pt-2">
                {{ validateField(props.sanPham.tenSP, "tenSP") }}
            </p>
        </div>

        <!-- Ngành hàng -->
        <div @click="getCategory" class="w-full h-fit mt-10">
            <DropdownCategories v-model="selectedCategory" :categories="categories" />
        </div>

        <!-- Mô tả sản phẩm -->
        <div class="w-full h-fit mt-10">
            <div class="w-full h-fit flex">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900" @click="a()">
                    <span class="text-red-400 mr-1">*</span>
                    Mô tả sản phẩm
                </div>
                <div class="flex-1 flex flex-col items-end">
                    <textarea id="p_describe" v-model="props.sanPham.moTa" :maxlength="3000"
                        class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-48 outline-none p-3 focus:border-zinc-400 resize-none overflow-y-auto"></textarea>
                    <div class="right-0 w-fit h-fit flex items-center">
                        <p class="w-full text-center mx-2 text-zinc-400">
                            {{ (props.sanPham.moTa || '').length }}/3000
                        </p>
                    </div>
                </div>
            </div>
            <p v-if="validateField(props.sanPham.moTa, 'moTa') !== true" class="pl-54 text-xs text-red-500 pt-2">
                {{ validateField(props.sanPham.moTa, "moTa") }}
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["sanPham"]);

// Khởi tạo các giá trị mặc định để tránh lỗi
const initializeDefaultValues = () => {
    if (!props.sanPham.images) {
        props.sanPham.images = [];
    }
    if (!props.sanPham.newFiles) {
        props.sanPham.newFiles = [];
    }
    if (!props.sanPham.newImageDtos) {
        props.sanPham.newImageDtos = [];
    }
    if (!props.sanPham.tenSP) {
        props.sanPham.tenSP = '';
    }
    if (!props.sanPham.moTa) {
        props.sanPham.moTa = '';
    }
};

// Gọi hàm khởi tạo ngay khi component được tạo
initializeDefaultValues();

const totalImg = ref(0);
const imageCover = ref(null);
const selectedCategory = ref(props.sanPham.danhMuc);
const images = ref([]);
const maxFiles = 9;
const categories = ref([]);

// Computed properties để xử lý an toàn việc filter
const daiDienImages = computed(() => {
    if (!props.sanPham.images || !Array.isArray(props.sanPham.images)) {
        return [];
    }
    return props.sanPham.images.filter((img) => img.loaiAnh === 'DAIDIEN');
});

const moTaImages = computed(() => {
    if (!props.sanPham.images || !Array.isArray(props.sanPham.images)) {
        return [];
    }
    return props.sanPham.images.filter((img) => img.loaiAnh === 'MOTA');
});

const totalMoTaImages = computed(() => {
    return moTaImages.value.length + images.value.length;
});

// Computed cho validation ảnh đại diện
const showDaiDienError = computed(() => {
    return !imageCover.value && daiDienImages.value.length === 0;
});

const daiDienErrorMessage = computed(() => {
    if (showDaiDienError.value) {
        return "Vui lòng tải lên ảnh đại diện";
    }
    return "";
});

watch(selectedCategory, (newValue) => {
    if (newValue) {
        props.sanPham.danhMuc = newValue;
    }
});

const handleFileChange_imgCover = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Khởi tạo mảng nếu chưa có
        if (!props.sanPham.newFiles) props.sanPham.newFiles = [];
        if (!props.sanPham.newImageDtos) props.sanPham.newImageDtos = [];

        // ✅ Thêm file vào newFiles
        props.sanPham.newFiles.push(file);

        // ✅ Thêm ImageDto tương ứng
        props.sanPham.newImageDtos.push({
            idChuSoHuu: props.sanPham.maSP || null,
            loaiAnh: "Đại diện",
            chuSoHuu: "Sản phẩm"
        });

        // Tạo preview
        const reader = new FileReader();
        reader.onload = () => {
            imageCover.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
    event.target.value = "";
};

const handleFileChange_imgs = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);

    if (filesArray.length > 0) {
        // Khởi tạo mảng nếu chưa có
        if (!props.sanPham.newFiles) props.sanPham.newFiles = [];
        if (!props.sanPham.newImageDtos) props.sanPham.newImageDtos = [];

        const currentTotal = moTaImages.value.length + images.value.length;
        const remainingSlots = maxFiles - currentTotal;
        const filesToProcess = filesArray.slice(0, remainingSlots);

        filesToProcess.forEach((file) => {
            // ✅ Thêm file vào newFiles
            props.sanPham.newFiles.push(file);

            // ✅ Thêm ImageDto tương ứng
            props.sanPham.newImageDtos.push({
                idChuSoHuu: props.sanPham.maSP || null,
                loaiAnh: "Mô tả",
                chuSoHuu: "Sản phẩm"
            });

            // Tạo preview
            const reader = new FileReader();
            reader.onload = () => {
                images.value.push(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }
    event.target.value = "";
};

const removeImgCover = () => {
    if (!props.sanPham.newImageDtos) return;
    
    // Tìm index của ảnh đại diện trong newImageDtos
    const coverIndex = props.sanPham.newImageDtos.findIndex(dto => dto.loaiAnh === 'DAIDIEN');

    if (coverIndex !== -1) {
        // Xóa file khỏi newFiles
        if (props.sanPham.newFiles) {
            props.sanPham.newFiles.splice(coverIndex, 1);
        }

        // Xóa ImageDto khỏi newImageDtos
        props.sanPham.newImageDtos.splice(coverIndex, 1);
    }

    // Reset preview
    imageCover.value = null;
};

// Xóa ảnh đại diện đã có sẵn (đã upload)
const deleteImgCover = () => {
    if (!props.sanPham.images) return;
    
    const daiDienImage = props.sanPham.images.find(img => img.loaiAnh === 'DAIDIEN');

    if (daiDienImage) {
        // Xóa khỏi danh sách images
        const index = props.sanPham.images.findIndex(img => img.loaiAnh === 'DAIDIEN');
        if (index !== -1) {
            props.sanPham.images.splice(index, 1);
        }
        
        // Thêm vào danh sách xóa nếu cần
        if (!props.sanPham.ttAnhXoa_SP) {
            props.sanPham.ttAnhXoa_SP = [];
        }
        if (daiDienImage.public_id) {
            props.sanPham.ttAnhXoa_SP.push(daiDienImage.public_id);
        }
    }
};

// Xóa ảnh mô tả mới (chưa upload)
const removeImg = (index) => {
    if (!props.sanPham.newImageDtos || !props.sanPham.newFiles) return;
    
    // Tính toán index thực tế trong newFiles/newImageDtos
    const moTaImageDtos = props.sanPham.newImageDtos.filter(dto => dto.loaiAnh === 'MOTA');
    const startIndex = props.sanPham.newImageDtos.length - moTaImageDtos.length;
    const actualIndex = startIndex + index;

    if (actualIndex >= 0 && actualIndex < props.sanPham.newFiles.length) {
        // Xóa file khỏi newFiles
        props.sanPham.newFiles.splice(actualIndex, 1);

        // Xóa ImageDto khỏi newImageDtos
        props.sanPham.newImageDtos.splice(actualIndex, 1);
    }

    // Xóa preview khỏi images array
    images.value.splice(index, 1);
};

// Xóa ảnh mô tả đã có sẵn (đã upload)
const deleteImg = (index, public_id) => {
    // Xóa khỏi danh sách images gốc
    if (props.sanPham.images) {
        const originalIndex = props.sanPham.images.findIndex(img =>
            img.loaiAnh === 'MOTA' && img.public_id === public_id
        );
        if (originalIndex !== -1) {
            props.sanPham.images.splice(originalIndex, 1);
        }
    }

    // Thêm public_id vào danh sách ảnh cần xóa
    if (!props.sanPham.ttAnhXoa_SP) {
        props.sanPham.ttAnhXoa_SP = [];
    }
    props.sanPham.ttAnhXoa_SP.push(public_id);
};

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
    return [categoryPath.category1?.ten_NH]
        .filter(Boolean)
        .join(" > ");
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

        formattedCategoriesSelected.value = [category1Obj?.ten_NH]
            .filter(Boolean)
            .join(" > ");

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
    // Kiểm tra ảnh đại diện
    if (!imageCover.value && daiDienImages.value.length === 0) {
        return false;
    }
    
    if (!props.sanPham.danhMuc) return false;
    if (validateField(props.sanPham.tenSP, "tenSP") !== true) return false;
    if (validateField(props.sanPham.moTa, "moTa") !== true) return false;

    return true;
};

onMounted(async () => {
    // Đảm bảo khởi tạo giá trị mặc định khi component mount
    initializeDefaultValues();
});

const showCategoryTable = ref(false);
defineExpose({ validateForm });
</script>