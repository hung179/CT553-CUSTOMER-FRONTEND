<template>
    <ProductForm @submit="handleSubmit" />
</template>

<script setup>
const handleSubmit = async (sanPham) => {
    console.log("Ở đây")
    if (sanPham.isNew) {

        await createProduct(sanPham);
    } else {
        await updateProduct(sanPham);
    }
};


const authStore = useAuthStore();
const { $api } = useNuxtApp(); // ✅ Truy cập api từ plugin

const router = useRouter();
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
                chuSoHuu: "Sản phẩm"
            });
        });


        // 2. Tạo ProductDto
        const productDto = {
            tenSP: sanPham.tenSP,
            maGHSH: authStore.user.maGHDT,
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
        formData.append("productDto", new Blob([JSON.stringify(productDto)], {
            type: 'application/json'
        }));

        // 4. Append files
        sanPham.newFiles.forEach((file) => {
            formData.append("files", file);
        });

        for (const [key, value] of formData.entries()) {
            if (value instanceof Blob) {
                const reader = new FileReader();
                reader.onload = function () {
                    console.log(`🔍 ${key} (as text):`, reader.result);
                };
                reader.readAsText(value);
            } else {
                console.log(`🔍 ${key}:`, value);
            }
        }
        // 5. Gửi API
        const res = await $api.post("products/create", formData);

        if (res.data.success === true) {
            showSuccess();
            router.push(`/store/${authStore.user.mssv}/manage/management/product`);
        }
    } catch (error) {
        console.error("Lỗi tạo sản phẩm:", error);
    }
};
</script>

<style></style>