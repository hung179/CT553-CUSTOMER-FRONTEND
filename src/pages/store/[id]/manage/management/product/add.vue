<template>
  <div>
    <ProductForm @submit="handleSubmit" :disabled="isLoading" />

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
  </div>
</template>

<script setup>
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
  // Bắt đầu loading
  isLoading.value = true;
  
  try {
    if (sanPham.isNew) {
      loadingMessage.value = 'Đang tạo sản phẩm mới...';
      await createProduct(sanPham);
    } else {
      loadingMessage.value = 'Đang cập nhật sản phẩm...';
      await updateProduct(sanPham);
    }
  } finally {
    // Tắt loading sau khi hoàn thành (thành công hoặc lỗi)
    isLoading.value = false;
    loadingMessage.value = '';
  }
};

const authStore = useAuthStore();
const { $api } = useNuxtApp();
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
    
    // Cập nhật message loading khi đang upload
    loadingMessage.value = 'Đang tải lên hình ảnh...';
    
    // 5. Gửi API
    const res = await $api.post("products/create", formData);


    if (res.data.success === true) {
      showModalConfirm(res.data);
    }
  } catch (error) {
    console.error('Error creating product:', error);
    showModalConfirm({ 
      type: 'ERROR', 
      message: error.response?.data?.message || 'Lỗi tạo sản phẩm' 
    });
  }
};


const updateProduct = async (sanPham) => {
  try {
    loadingMessage.value = 'Đang lưu thay đổi...';
    
  } catch (error) {
    console.error('Error updating product:', error);
    showModalConfirm({ 
      type: 'ERROR', 
      message: error.response?.data?.message || 'Lỗi cập nhật sản phẩm' 
    });
  }
};
</script>

<style></style>