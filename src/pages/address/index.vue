<template>
    <div class="min-h-screen bg-gray-50 mt-2">

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <button @click="showAddForm = true"
                class="bg-gradient-to-r from-green-600 to-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors my-4">
                + Thêm địa chỉ mới
            </button>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="mt-2 text-gray-600">Đang tải...</p>
            </div>

            <!-- Address List -->
            <div v-else-if="addresses.length > 0" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="address in addresses" :key="address.maDC"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex-1">
                            <div v-if="address.macDinhDC"
                                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                                Địa chỉ mặc định
                            </div>
                            <p class="text-sm text-gray-600 mb-1">{{ address.chiTietDC }}</p>
                            <p class="text-sm text-gray-600">{{ address.xaDC }}, {{ address.huyenDC }}, {{
                                address.tinhDC }}</p>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-2">
                        <button @click="editAddress(address)"
                            class="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors">
                            Sửa
                        </button>
                        <button @click="deleteAddress(address.maDC)"
                            class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors">
                            Xóa
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Chưa có địa chỉ nào</h3>
                <p class="mt-1 text-sm text-gray-500">Bắt đầu bằng cách tạo địa chỉ mới.</p>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8 flex justify-center">
                <nav class="flex items-center space-x-2">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0"
                        class="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Trước
                    </button>

                    <template v-for="page in visiblePages" :key="page">
                        <button @click="changePage(page)" :class="[
                            'px-3 py-2 text-sm border rounded-md',
                            page === currentPage
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        ]">
                            {{ page + 1 }}
                        </button>
                    </template>

                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages - 1"
                        class="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Sau
                    </button>
                </nav>
            </div>
        </div>

        <!-- Add/Edit Address Modal -->
        <div v-if="showAddForm || editingAddress"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 z-50 transition-opacity duration-300">
            <div
                class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-modalShow">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold text-gray-900">
                            {{ editingAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới' }}
                        </h2>
                        <button @click="closeForm" class="text-gray-400 hover:text-gray-600">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố *</label>
                            <select v-model="selectedProvince" @change="onProvinceChange" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                <option value="">-- Chọn tỉnh/thành phố --</option>
                                <option v-for="province in provinces" :key="province.code" :value="province">
                                    {{ province.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện *</label>
                            <select v-model="selectedDistrict" @change="onDistrictChange" :disabled="!selectedProvince"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed">
                                <option value="">-- Chọn quận/huyện --</option>
                                <option v-for="district in districts" :key="district.code" :value="district">
                                    {{ district.name }}
                                </option>
                            </select>
                            <p v-if="!selectedProvince" class="text-xs text-gray-500 mt-1">
                                Vui lòng chọn tỉnh/thành phố trước
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Phường/Xã *</label>
                            <select v-model="selectedWard" @change="onWardChange" :disabled="!selectedDistrict" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed">
                                <option value="">-- Chọn phường/xã --</option>
                                <option v-for="ward in wards" :key="ward.code" :value="ward">
                                    {{ ward.name }}
                                </option>
                            </select>
                            <p v-if="!selectedDistrict" class="text-xs text-gray-500 mt-1">
                                Vui lòng chọn quận/huyện trước
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ chi tiết *</label>
                            <textarea v-model="formData.chiTietDC" required rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường...)"></textarea>
                        </div>

                        <div class="flex items-center">
                            <input v-model="formData.macDinhDC" type="checkbox" id="defaultAddress"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="defaultAddress" class="ml-2 block text-sm text-gray-700">
                                Đặt làm địa chỉ mặc định
                            </label>
                        </div>

                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" @click="closeForm"
                                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                                Hủy
                            </button>
                            <button type="submit" :disabled="submitting"
                                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50">
                                {{ submitting ? 'Đang xử lý...' : (editingAddress ? 'Cập nhật' : 'Thêm mới') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="deletingAddressId"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 z-50 transition-opacity duration-300">
            <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all duration-300 scale-95 animate-modalShow">
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <div class="flex-shrink-0">
                            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-lg font-medium text-gray-900">Xác nhận xóa</h3>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-6">
                        Bạn có chắc chắn muốn xóa địa chỉ này? Hành động này không thể hoàn tác.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button @click="deletingAddressId = null"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                            Hủy
                        </button>
                        <button @click="confirmDelete" :disabled="submitting"
                            class ="text-red-600 bg-red-100 px-4 py-2 rounded-md  disabled:opacity-50 transition-colors bg-red-600">
                            {{ submitting ? 'Đang xóa...' : 'Xóa' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Toast Notification -->
        <div v-if="notification.show" class="fixed top-4 right-4 z-50">
            <div :class="[
                'px-4 py-3 rounded-md shadow-lg',
                notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            ]">
                {{ notification.message }}
            </div>
        </div>
    </div>
</template>

<script setup>
const { $api } = useNuxtApp();
const authStore = useAuthStore();

// Reactive data
const addresses = ref([]);
const loading = ref(false);
const submitting = ref(false);
const showAddForm = ref(false);
const editingAddress = ref(null);
const deletingAddressId = ref(null);
const currentPage = ref(0);
const totalPages = ref(0);
const pageSize = ref(5);

// Location data
const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);
const loadingProvinces = ref(false);
const loadingDistricts = ref(false);
const loadingWards = ref(false);

const formData = ref({
    tinhDC: '',
    huyenDC: '',
    xaDC: '',
    chiTietDC: '',
    macDinhDC: false
});

const notification = ref({
    show: false,
    message: '',
    type: 'success'
});

// Computed
const visiblePages = computed(() => {
    const pages = [];
    const start = Math.max(0, currentPage.value - 2);
    const end = Math.min(totalPages.value - 1, currentPage.value + 2);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

// Methods
const showNotification = (message, type = 'success') => {
    notification.value = { show: true, message, type };
    setTimeout(() => {
        notification.value.show = false;
    }, 3000);
};

// Location API methods
const loadProvinces = async () => {
    try {
        loadingProvinces.value = true;
        const response = await $fetch('https://provinces.open-api.vn/api/p/');
        provinces.value = response.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error loading provinces:', error);
        showNotification('Có lỗi xảy ra khi tải danh sách tỉnh/thành phố', 'error');
    } finally {
        loadingProvinces.value = false;
    }
};

const loadDistricts = async (provinceCode) => {
    try {
        loadingDistricts.value = true;
        const response = await $fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        districts.value = response.districts.sort((a, b) => a.name.localeCompare(b.name));
        wards.value = []; // Reset wards when province changes
    } catch (error) {
        console.error('Error loading districts:', error);
        showNotification('Có lỗi xảy ra khi tải danh sách quận/huyện', 'error');
    } finally {
        loadingDistricts.value = false;
    }
};

const loadWards = async (districtCode) => {
    try {
        loadingWards.value = true;
        const response = await $fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        wards.value = response.wards.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error loading wards:', error);
        showNotification('Có lỗi xảy ra khi tải danh sách phường/xã', 'error');
    } finally {
        loadingWards.value = false;
    }
};

// Dropdown change handlers
const onProvinceChange = () => {
    selectedDistrict.value = null;
    selectedWard.value = null;
    districts.value = [];
    wards.value = [];

    if (selectedProvince.value) {
        formData.value.tinhDC = selectedProvince.value.name;
        loadDistricts(selectedProvince.value.code);
    } else {
        formData.value.tinhDC = '';
    }
    formData.value.huyenDC = '';
    formData.value.xaDC = '';
};

const onDistrictChange = () => {
    selectedWard.value = null;
    wards.value = [];

    if (selectedDistrict.value) {
        formData.value.huyenDC = selectedDistrict.value.name;
        loadWards(selectedDistrict.value.code);
    } else {
        formData.value.huyenDC = '';
    }
    formData.value.xaDC = '';
};

const onWardChange = () => {
    if (selectedWard.value) {
        formData.value.xaDC = selectedWard.value.name;
    } else {
        formData.value.xaDC = '';
    }
};

// Find location objects by name (for editing)
const findLocationByName = async (provinceName, districtName, wardName) => {
    try {
        // Find province
        const province = provinces.value.find(p => p.name === provinceName);
        if (province) {
            selectedProvince.value = province;
            await loadDistricts(province.code);

            // Find district
            if (districtName) {
                const district = districts.value.find(d => d.name === districtName);
                if (district) {
                    selectedDistrict.value = district;
                    await loadWards(district.code);

                    // Find ward
                    if (wardName) {
                        const ward = wards.value.find(w => w.name === wardName);
                        if (ward) {
                            selectedWard.value = ward;
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error finding location:', error);
    }
};

const loadAddresses = async () => {
    try {
        loading.value = true;
        await authStore.loadUser();
        const mssv = authStore.user.mssv;

        const response = await $api.get(`/addresses/all/${mssv}`, {
            params: {
                page: currentPage.value,
                size: pageSize.value
            }
        });

        addresses.value = response.data.content || response.data;
        totalPages.value = response.data.totalPages || 1;
    } catch (error) {
        console.error('Error loading addresses:', error);
        showNotification('Có lỗi xảy ra khi tải danh sách địa chỉ', 'error');
    } finally {
        loading.value = false;
    }
};

const searchAddresses = async () => {
    // Implement search logic if needed
    // For now, just reload addresses
    await loadAddresses();
};

const changePage = (page) => {
    if (page >= 0 && page < totalPages.value) {
        currentPage.value = page;
        loadAddresses();
    }
};

const editAddress = async (address) => {
    editingAddress.value = address;
    formData.value = {
        tinhDC: address.tinhDC || '',
        huyenDC: address.huyenDC || '',
        xaDC: address.xaDC || '',
        chiTietDC: address.chiTietDC || '',
        macDinhDC: address.macDinhDC || false
    };

    // Load location data and set selections
    if (address.tinhDC) {
        await findLocationByName(address.tinhDC, address.huyenDC, address.xaDC);
    }
};

const closeForm = () => {
    showAddForm.value = false;
    editingAddress.value = null;

    // Reset form data
    formData.value = {
        tinhDC: '',
        huyenDC: '',
        xaDC: '',
        chiTietDC: '',
        macDinhDC: false
    };

    // Reset location selections
    selectedProvince.value = null;
    selectedDistrict.value = null;
    selectedWard.value = null;
    districts.value = [];
    wards.value = [];
};

const submitForm = async () => {
    // Validation
    if (!selectedProvince.value) {
        showNotification('Vui lòng chọn tỉnh/thành phố', 'error');
        return;
    }
    if (!selectedDistrict.value) {
        showNotification('Vui lòng chọn quận/huyện', 'error');
        return;
    }
    if (!selectedWard.value) {
        showNotification('Vui lòng chọn phường/xã', 'error');
        return;
    }
    if (!formData.value.chiTietDC.trim()) {
        showNotification('Vui lòng nhập địa chỉ chi tiết', 'error');
        return;
    }

    try {
        submitting.value = true;
        await authStore.loadUser();
        const mssv = authStore.user.mssv;

        if (editingAddress.value) {
            // Update address
            const formDataObj = new FormData();
            formDataObj.append('dto', new Blob([JSON.stringify(formData.value)], {
                type: 'application/json'
            }));


            const response = await $api.patch(`/addresses/update/${mssv}`, formDataObj, {
                params: { maDC: editingAddress.value.maDC },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Update response:', response);
            showNotification('Cập nhật địa chỉ thành công');
        } else {
            // Create new address
            await $api.post(`/addresses/create/${mssv}`, formData.value);
            showNotification('Thêm địa chỉ mới thành công');
        }

        closeForm();
        await loadAddresses();
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification('Có lỗi xảy ra khi lưu địa chỉ', 'error');
    } finally {
        submitting.value = false;
    }
};

const deleteAddress = (maDC) => {
    deletingAddressId.value = maDC;
};

const confirmDelete = async () => {
    try {
        submitting.value = true;
        await authStore.loadUser();
        const mssv = authStore.user.mssv;

        await $api.delete(`/addresses/delete/${mssv}`, {
            params: { maDC: deletingAddressId.value }
        });

        showNotification('Xóa địa chỉ thành công');
        deletingAddressId.value = null;
        await loadAddresses();
    } catch (error) {
        console.error('Error deleting address:', error);
        showNotification('Có lỗi xảy ra khi xóa địa chỉ', 'error');
    } finally {
        submitting.value = false;
    }
};

// Lifecycle
onMounted(() => {
    loadAddresses();
    loadProvinces();
});

// Watch for form modal opening to load provinces
watch(showAddForm, (newValue) => {
    if (newValue && provinces.value.length === 0) {
        loadProvinces();
    }
});
</script>

<style scoped>
@keyframes modalShow {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-modalShow {
  animation: modalShow 0.25s ease-out forwards;
}

</style>