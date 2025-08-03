<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Đơn hàng của tôi</h1>
        <p class="mt-2 text-gray-600">Quản lý và theo dõi tình trạng các đơn hàng</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Có lỗi xảy ra</h3>
            <div class="mt-2 text-sm text-red-700">{{ error }}</div>
          </div>
        </div>
      </div>

      <!-- Orders List -->
      <div v-else-if="orders && orders.length > 0" class="space-y-6">
        <div v-for="order in orders" :key="order.maDH" class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Order Header -->
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <h3 class="text-lg font-semibold text-gray-900">
                  Đơn hàng #{{ order.maDH }}
                </h3>
                <span :class="getStatusClass(order.thanhToan)" class="px-3 py-1 rounded-full text-xs font-medium">
                  {{ getStatusText(order.thanhToan) }}
                </span>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-gray-900">
                  {{ formatCurrency(order.tongTienDH) }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(order.ngayTaoDH) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="px-6 py-4">
            <div v-for="subOrder in order.subOrder" :key="subOrder.maDHC" class="mb-4 last:mb-0">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-gray-900">Gian hàng #{{ subOrder.maGianHangDHC }}</h4>
                <span :class="getSubOrderStatusClass(subOrder.orderState)" class="px-2 py-1 rounded text-xs font-medium">
                  {{ getSubOrderStatusText(subOrder.orderState) }}
                </span>
              </div>
              
              <div class="space-y-2">
                <div v-for="item in subOrder.orderItems" :key="`${item.orderItemId.maDH}-${item.orderItemId.maSP}`" 
                     class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <div>
                    <span class="text-sm text-gray-600">Sản phẩm #{{ item.orderItemId.maSP }}</span>
                  </div>
                  <div class="text-sm font-medium">
                    {{ formatCurrency(item.giaSP) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Actions -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <button 
                @click="toggleOrderDetails(order.maDH)"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <span>{{ expandedOrders.has(order.maDH) ? 'Thu gọn' : 'Xem chi tiết' }}</span>
                <svg :class="{ 'rotate-180': expandedOrders.has(order.maDH) }" class="ml-1 h-4 w-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div class="flex space-x-2">
                <button 
                  v-if="canCancelOrder(order)"
                  @click="showCancelConfirmation(order)"
                  class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Hủy đơn hàng
                </button>
              </div>
            </div>
          </div>

          <!-- Expanded Details -->
          <div v-if="expandedOrders.has(order.maDH)" class="px-6 py-4 border-t border-gray-200 bg-white">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-gray-900 mb-3">Thông tin đơn hàng</h4>
                <dl class="space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-600">Mã đơn hàng:</dt>
                    <dd class="text-sm font-medium text-gray-900">#{{ order.maDH }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-600">MSSV:</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ order.mssvDH }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-600">Ngày tạo:</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ formatDate(order.ngayTaoDH) }}</dd>
                  </div>
                  <div v-if="order.ngayThanhToanDH" class="flex justify-between">
                    <dt class="text-sm text-gray-600">Ngày thanh toán:</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ formatDate(order.ngayThanhToanDH) }}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 class="font-medium text-gray-900 mb-3">Trạng thái chi tiết</h4>
                <div class="space-y-3">
                  <div v-for="subOrder in order.subOrder" :key="subOrder.maDHC">
                    <h5 class="text-sm font-medium text-gray-700">Gian hàng #{{ subOrder.maGianHangDHC }}</h5>
                    <div class="mt-2 space-y-1">
                      <div v-if="subOrder.orderState.choDuyetTTDH" class="flex items-center text-xs text-gray-600">
                        <div class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        Chờ duyệt: {{ formatDate(subOrder.orderState.choDuyetTTDH) }}
                      </div>
                      <div v-if="subOrder.orderState.xacNhanTTDH" class="flex items-center text-xs text-gray-600">
                        <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        Xác nhận: {{ formatDate(subOrder.orderState.xacNhanTTDH) }}
                      </div>
                      <div v-if="subOrder.orderState.dangGiaoTTDH" class="flex items-center text-xs text-gray-600">
                        <div class="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                        Đang giao: {{ formatDate(subOrder.orderState.dangGiaoTTDH) }}
                      </div>
                      <div v-if="subOrder.orderState.daGiaoTTDH" class="flex items-center text-xs text-gray-600">
                        <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Đã giao: {{ formatDate(subOrder.orderState.daGiaoTTDH) }}
                      </div>
                      <div v-if="subOrder.orderState.daNhanTTDH" class="flex items-center text-xs text-gray-600">
                        <div class="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                        Đã nhận: {{ formatDate(subOrder.orderState.daNhanTTDH) }}
                      </div>
                      <div v-if="subOrder.orderState.daHuyTTDH" class="flex items-center text-xs text-gray-600">
                        <div class="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                        Đã hủy: {{ formatDate(subOrder.orderState.daHuyTTDH) }}
                      </div>
                      <div v-if="subOrder.orderState.daHoanTienTTDH" class="flex items-center text-xs text-gray-600">
                        <div class="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        Đã hoàn tiền: {{ formatDate(subOrder.orderState.daHoanTienTTDH) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
          <div class="flex flex-1 justify-between sm:hidden">
            <button 
              @click="previousPage" 
              :disabled="currentPage === 0"
              class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Trước
            </button>
            <button 
              @click="nextPage" 
              :disabled="currentPage >= totalPages - 1"
              class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Hiển thị <span class="font-medium">{{ currentPage * pageSize + 1 }}</span> đến 
                <span class="font-medium">{{ Math.min((currentPage + 1) * pageSize, totalElements) }}</span> 
                trong tổng số <span class="font-medium">{{ totalElements }}</span> đơn hàng
              </p>
            </div>
            <div>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button 
                  @click="previousPage" 
                  :disabled="currentPage === 0"
                  class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none disabled:opacity-50"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <button 
                  v-for="page in getPageNumbers()" 
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20',
                    page === currentPage 
                      ? 'z-10 bg-blue-600 text-white focus:bg-blue-500' 
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  ]"
                >
                  {{ page + 1 }}
                </button>
                
                <button 
                  @click="nextPage" 
                  :disabled="currentPage >= totalPages - 1"
                  class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none disabled:opacity-50"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Chưa có đơn hàng nào</h3>
        <p class="mt-1 text-sm text-gray-500">Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm!</p>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div v-if="showCancelModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-2">Xác nhận hủy đơn hàng</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Bạn có chắc chắn muốn hủy đơn hàng #{{ orderToCancel?.maDH }}? 
              Hành động này không thể hoàn tác.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="confirmCancelOrder"
              :disabled="cancelLoading"
              class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2 disabled:opacity-50"
            >
              <span v-if="cancelLoading">Đang hủy...</span>
              <span v-else>Xác nhận hủy</span>
            </button>
            <button
              @click="closeCancelModal"
              class="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const mssv = ref(null);
const { $api } = useNuxtApp();

// Reactive data
const orders = ref([]);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(0);
const pageSize = ref(10);
const totalPages = ref(0);
const totalElements = ref(0);
const expandedOrders = ref(new Set());
const showCancelModal = ref(false);
const orderToCancel = ref(null);
const cancelLoading = ref(false);

// Get user MSSV
const getUserId = async () => {
  await authStore.loadUser();
  mssv.value = authStore.user.mssv;
};

// Fetch orders
const fetchOrders = async () => {
  if (!mssv.value) return;
  
  loading.value = true;
  error.value = null;
  
  try {
    const response = await $api.get(`/orders/all/${mssv.value}`, {
      params: {
        page: currentPage.value,
        size: pageSize.value
      }
    });
    
    orders.value = response.data.content;
    totalPages.value = response.data.totalPages;
    totalElements.value = response.data.totalElements;
  } catch (err) {
    error.value = err.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng';
    console.error('Error fetching orders:', err);
  } finally {
    loading.value = false;
  }
};

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusClass = (status) => {
  switch (status) {
    case 'DATHANHTOAN':
      return 'bg-green-100 text-green-800';
    case 'CHUATHANHTOAN':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'DATHANHTOAN':
      return 'Đã thanh toán';
    case 'CHUATHANHTOAN':
      return 'Chưa thanh toán';
    default:
      return 'Không xác định';
  }
};

const getSubOrderStatusClass = (orderState) => {
  if (orderState.daNhanTTDH) return 'bg-green-100 text-green-800';
  if (orderState.daHuyTTDH) return 'bg-red-100 text-red-800';
  if (orderState.daHoanTienTTDH) return 'bg-purple-100 text-purple-800';
  if (orderState.daGiaoTTDH) return 'bg-blue-100 text-blue-800';
  if (orderState.dangGiaoTTDH) return 'bg-orange-100 text-orange-800';
  if (orderState.xacNhanTTDH) return 'bg-indigo-100 text-indigo-800';
  if (orderState.choDuyetTTDH) return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
};

const getSubOrderStatusText = (orderState) => {
  if (orderState.daNhanTTDH) return 'Đã nhận';
  if (orderState.daHuyTTDH) return 'Đã hủy';
  if (orderState.daHoanTienTTDH) return 'Đã hoàn tiền';
  if (orderState.daGiaoTTDH) return 'Đã giao';
  if (orderState.dangGiaoTTDH) return 'Đang giao';
  if (orderState.xacNhanTTDH) return 'Đã xác nhận';
  if (orderState.choDuyetTTDH) return 'Chờ duyệt';
  return 'Không xác định';
};

// Check if order can be cancelled
const canCancelOrder = (order) => {
  return order.subOrder.some(subOrder => 
    subOrder.orderState.choDuyetTTDH && 
    !subOrder.orderState.xacNhanTTDH &&
    !subOrder.orderState.dangGiaoTTDH &&
    !subOrder.orderState.daGiaoTTDH &&
    !subOrder.orderState.daNhanTTDH &&
    !subOrder.orderState.daHuyTTDH &&
    !subOrder.orderState.daHoanTienTTDH
  );
};

// Order details toggle
const toggleOrderDetails = (orderId) => {
  if (expandedOrders.value.has(orderId)) {
    expandedOrders.value.delete(orderId);
  } else {
    expandedOrders.value.add(orderId);
  }
};

// Cancel order functions
const showCancelConfirmation = (order) => {
  orderToCancel.value = order;
  showCancelModal.value = true;
};

const closeCancelModal = () => {
  showCancelModal.value = false;
  orderToCancel.value = null;
};

const confirmCancelOrder = async () => {
  if (!orderToCancel.value) return;
  
  cancelLoading.value = true;
  
  try {
    // Find the sub-orders that can be cancelled
    const cancelableSubOrders = orderToCancel.value.subOrder.filter(subOrder => 
      subOrder.orderState.choDuyetTTDH && 
      !subOrder.orderState.xacNhanTTDH &&
      !subOrder.orderState.dangGiaoTTDH &&
      !subOrder.orderState.daGiaoTTDH &&
      !subOrder.orderState.daNhanTTDH &&
      !subOrder.orderState.daHuyTTDH &&
      !subOrder.orderState.daHoanTienTTDH
    );
    
    // Cancel each sub-order
    for (const subOrder of cancelableSubOrders) {
      await $api.post(`/subOrders/daHuy/${subOrder.maDHC}`);
    }
    
    // Refresh orders list
    await fetchOrders();
    
    closeCancelModal();
    
    // Show success message (you can implement toast notification here)
    alert('Đơn hàng đã được hủy thành công!');
  } catch (err) {
    error.value = err.response?.data?.message || 'Có lỗi xảy ra khi hủy đơn hàng';
    console.error('Error cancelling order:', err);
  } finally {
    cancelLoading.value = false;
  }
};

// Pagination functions
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    fetchOrders();
  }
};

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    fetchOrders();
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  fetchOrders();
};

const getPageNumbers = () => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(0, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value - 1, start + maxVisible - 1);
  
  if (end - start < maxVisible - 1) {
    start = Math.max(0, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
};

// Watchers
watch(mssv, (newMssv) => {
  if (newMssv) {
    fetchOrders();
  }
});

// Lifecycle
onMounted(async () => {
  await getUserId();
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>