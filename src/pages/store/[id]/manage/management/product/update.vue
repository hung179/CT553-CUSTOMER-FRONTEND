<template>
    <ProductForm :id="maSP" @submit="handleSubmit"/>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { $api } = useNuxtApp();

const maSP = route.query.maSP;

const handleSubmit = async (sanPham) => {
    console.log("Ở đây")
    if (sanPham.isNew) {
        
        await createProduct(sanPham);
    } else {
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
            router.push(`/store/${authStore.user.mssv}/manage/management/product`);
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
        
        // 1. Tạo ProductDto
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
            images: sanPham.newImageDtos.map(dto => ({
                ...dto,
                idChuSoHuu: sanPham.maSP
            }))
        };
        
        console.log(productDto);

        // 2. Append ProductDto
        formData.append("productRequestDto", new Blob([JSON.stringify(productDto)], { 
            type: 'application/json' 
        }));
        
        // 3. Append files (chỉ khi có file mới)
        if (sanPham.newFiles.length > 0) {
            sanPham.newFiles.forEach((file) => {
                formData.append("files", file);
            });
        }

        // 4. Gửi API Update
        const res = await $api.patch(`products/update/${sanPham.maSP}`, formData);
        
        if (res.data) {
            showSuccess();
            router.push(`/store/${authStore.user.mssv}/manage/management/product`);
        } else {
            showError();
        }
        
    } catch (error) {
        console.error("Lỗi cập nhật sản phẩm:", error);
        showError();
    }
};

// ✅ UTILITY FUNCTIONS
const showSuccess = () => {
    // Implement success notification
    console.log("Thành công!");
};

const showError = () => {
    // Implement error notification  
    console.log("Có lỗi xảy ra!");
};
</script>
