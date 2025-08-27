<template>
    <ProductForm :id="maSP" @submit="handleSubmit" />
     <!-- Loading Component -->
    <LoadingComponent
      :show="isLoading"
      :message="loadingMessage"
    />
    
    <!-- Modal thông báo -->
    <Modal 
      :show="showModal" 
      :type="modalType" 
      :title="titleModal" 
      :message="message" 
      :confirmText="confirmText"
      @confirm="handleConfirm()" 
      @cancel="showModal = false" 
      @close="showModal = false" 
    />
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { $api } = useNuxtApp();

const maSP = route.query.maSP;

const showModal = ref(false);
const modalType = ref(null);
const titleModal = ref(null);
const message = ref(null);
const confirmText = ref(null);
const handleConfirm = ref();

// Loading states
const isLoading = ref(false);
const loadingMessage = ref('');

const showModalConfirm = (element, item) => {
  switch (element.type) {
    case 'ERROR': {
      handleConfirm.value = () => { showModal.value = false; };
      modalType.value = "warning";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'SUCCESS': {
      handleConfirm.value = () => {
         router.push(`/store/${authStore.user.mssv}/manage/management/product`);
        showModal.value = false;
       };
      modalType.value = "success";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
  }
}

const handleSubmit = async (sanPham) => {
    isLoading.value = true;
    if (sanPham.isNew) {
        loadingMessage.value = 'Đang tạo sản phẩm...';
        await createProduct(sanPham);
    } else {
        loadingMessage.value = 'Đang cập nhật sản phẩm...';
        await updateProduct(sanPham);
    }
};

// ✅ HÀM TẠO SẢN PHẨM MỚI
const createProduct = async (sanPham) => {
    try {
        const formData = new FormData();

        // 1. Chuẩn bị ImageDto cho tất cả file
        const imageDtos = [];

        sanPham.newFiles.forEach((file, index) => {
            // Tìm loại ảnh tương ứng từ newImageDtos
            const imageDto = sanPham.newImageDtos[index];
            imageDtos.push({
                idChuSoHuu: 0, // Backend sẽ set sau khi tạo product
                loaiAnh: imageDto.loaiAnh,
                chuSoHuu: "SANPHAM"
            });
        });

        // 2. Tạo ProductDto
        const productDto = {
            tenSP: sanPham.tenSP,
            maGHSH: sanPham.maGHSH,
            giaSP: sanPham.giaSP || 0,
            soLuong: sanPham.soLuong || 1,
            kichThuoc: sanPham.kichThuoc || '',
            trongLuong: sanPham.trongLuong || 0,
            moTa: sanPham.moTa,
            daAn: sanPham.daAn || false,
            danhMuc: sanPham.danhMuc,
            images: imageDtos
        };

        // 3. Append vào FormData
        formData.append("productRequestDto", new Blob([JSON.stringify(productDto)], {
            type: 'application/json'
        }));

        // 4. Append files
        sanPham.newFiles.forEach((file) => {
            formData.append("files", file);
        });


        // 5. Gửi API
        const res = await $api.post("products/create", formData);

        if (res.data.success === true) {
            showSuccess();
        } else {
            showError();
        }

    } catch (error) {
        console.error("Lỗi tạo sản phẩm:", error);
        showError();
    }
};

// ✅ HÀM CẬP NHẬT SẢN PHẨM
const updateProduct = async (sanPham) => {
    try {
        const formData = new FormData();

        // 1. Tạo file objects từ ảnh cũ (chuyển URL thành File object)
        const oldFiles = await Promise.all(
            sanPham.images.map(async (image) => {
                try {
                    const response = await fetch(image.url);
                    const blob = await response.blob();
                    const fileName = `existing_${image.publicId || Date.now()}.jpg`;
                    return new File([blob], fileName, { type: blob.type || 'image/jpeg' });
                } catch (error) {
                    console.error('Lỗi khi chuyển đổi URL thành File:', error);
                    // Tạo file placeholder nếu không thể fetch được
                    return new File([''], `placeholder_${image.publicId}.jpg`, { type: 'image/jpeg' });
                }
            })
        );

        // 2. Gom tất cả files lại (cũ + mới)
        const allFiles = [...oldFiles, ...sanPham.newFiles];

        // 3. Tạo ProductDto với tất cả images
        const productDto = {
            tenSP: sanPham.tenSP,
            maGHSH: sanPham.maGHSH,
            giaSP: sanPham.giaSP,
            soLuong: sanPham.soLuong,
            kichThuoc: sanPham.kichThuoc,
            trongLuong: sanPham.trongLuong,
            moTa: sanPham.moTa,
            daAn: sanPham.daAn,
            danhMuc: sanPham.danhMuc,
            images: [
                // Ảnh cũ (được giữ lại)
                ...sanPham.images.map(image => ({
                    idChuSoHuu: sanPham.maSP,
                    loaiAnh: convertLoaiAnh(image.loaiAnh),
                    chuSoHuu: "Sản phẩm",
                })),
                // Ảnh mới được thêm
                ...sanPham.newImageDtos.map(dto => ({
                    idChuSoHuu: sanPham.maSP,
                    loaiAnh: convertLoaiAnh(dto.loaiAnh),
                    chuSoHuu: "Sản phẩm"
                }))
            ]
        };

        // 4. Append ProductDto
        formData.append("productRequestDto", new Blob([JSON.stringify(productDto)], {
            type: 'application/json'
        }));

        // 5. Append tất cả files (cũ + mới)
        allFiles.forEach((file, index) => {
            formData.append("files", file);
        });

        // 6. Gửi API Update
        const res = await $api.patch(`products/update/${sanPham.maSP}`, formData);

        if (res.data.success === true) {
            showModalConfirm(res.data);
        } else {
            showError();
        }

    } catch (error) {
        showError();
    }
};

// ✅ UTILITY FUNCTIONS
const showSuccess = () => {

};

const showError = () => {
    // Implement error notification  
    console.log("Có lỗi xảy ra!");
};

function convertLoaiAnh(loaiAnh) {
    const mapping = {
        "DAIDIEN": "Đại diện",
        "MOTA": "Mô tả",
        "Đại diện": "Đại diện",
        "Mô tả": "Mô tả",
    };
    return mapping[loaiAnh]; // fallback nếu không khớp
}

</script>
