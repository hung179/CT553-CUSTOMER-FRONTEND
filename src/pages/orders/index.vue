<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Header Section -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Đơn hàng của tôi
              </h1>
              <p class="text-gray-600 mt-1">Quản lý và theo dõi tình trạng các đơn hàng</p>
            </div>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <div class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-2">
              <span class="text-sm text-gray-600">Tổng đơn hàng:</span>
              <span class="font-bold text-lg text-blue-600 ml-2">{{ totalElements }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-16">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-blue-400"></div>
        </div>
        <p class="mt-4 text-gray-600 animate-pulse">Đang tải danh sách đơn hàng...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 mb-8">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg class="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-red-800">Có lỗi xảy ra</h3>
            <p class="mt-2 text-red-700">{{ error }}</p>
            <button @click="fetchOrders" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Thử lại
            </button>
          </div>
        </div>
      </div>

      <!-- Orders List -->
      <div v-else-if="orders && orders.length > 0" class="space-y-6">
        <div 
          v-for="order in orders" 
          :key="order.maDH" 
          class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-300"
        >
          <!-- Order Header -->
          <div class="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm px-6 py-5 border-b border-gray-200/50">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="p-2 bg-white rounded-xl shadow-sm">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900">
                    Đơn hàng #{{ order.maDH }}
                  </h3>
                  <p class="text-sm text-gray-500 mt-1">{{ formatDate(order.ngayTaoDH) }}</p>
                </div>
                <span :class="getStatusClass(order.thanhToan)" class="px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {{ getStatusText(order.thanhToan) }}
                </span>
              </div>
              <div class="text-right">
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200/50">
                  <p class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {{ formatCurrency(order.tongTienDH) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="px-6 py-5">
            <div v-for="subOrder in order.subOrder" :key="subOrder.maDHC" class="mb-6 last:mb-0">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-900">Gian hàng #{{ subOrder.maGianHangDHC }}</h4>
                </div>
                <span :class="getSubOrderStatusClass(subOrder.orderState)" class="px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  {{ getSubOrderStatusText(subOrder.orderState) }}
                </span>
              </div>
              
              <div class="grid grid-cols-1 gap-3">
                <div 
                  v-for="item in subOrder.orderItems" 
                  :key="`${item.orderItemId.maDH}-${item.orderItemId.maSP}`" 
                  class="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">Sản phẩm #{{ item.orderItemId.maSP }}</p>
                      <p class="text-sm text-gray-500">Số lượng: {{ item.soLuongSP || 1 }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg text-gray-900">{{ formatCurrency(item.giaSP) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Actions -->
          <div class="px-6 py-4 bg-gradient-to-r from-gray-50/50 to-white/50 border-t border-gray-200/50">
            <div class="flex items-center justify-between">
              <button 
                @click="toggleOrderDetails(order.maDH)"
                class="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors font-medium group"
              >
                <span>{{ expandedOrders.has(order.maDH) ? 'Thu gọn' : 'Xem chi tiết' }}</span>
                <svg 
                  :class="{ 'rotate-180': expandedOrders.has(order.maDH) }" 
                  class="w-5 h-5 transform transition-transform group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div class="flex space-x-3">
                <button 
                  v-if="canCancelOrder(order)"
                  @click="showCancelConfirmation(order)"
                  class="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all shadow-lg hover:shadow-xl"
                >
                  Hủy đơn hàng
                </button>
              </div>
            </div>
          </div>

          <!-- Expanded Details -->
          <div v-if="expandedOrders.has(order.maDH)" class="px-6 py-6 border-t border-gray-200/50 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Order Information -->
              <div class="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                <h4 class="font-bold text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Thông tin đơn hàng
                </h4>
                <dl class="space-y-3">
                  <div class="flex justify-between items-center py-2 px-3 bg-gray-50/80 rounded-lg">
                    <dt class="text-sm font-medium text-gray-600">Mã đơn hàng:</dt>
                    <dd class="text-sm font-bold text-gray-900">#{{ order.maDH }}</dd>
                  </div>
                  <div class="flex justify-between items-center py-2 px-3 bg-gray-50/80 rounded-lg">
                    <dt class="text-sm font-medium text-gray-600">MSSV:</dt>
                    <dd class="text-sm font-bold text-gray-900">{{ order.mssvDH }}</dd>
                  </div>
                  <div class="flex justify-between items-center py-2 px-3 bg-gray-50/80 rounded-lg">
                    <dt class="text-sm font-medium text-gray-600">Ngày tạo:</dt>
                    <dd class="text-sm font-bold text-gray-900">{{ formatDate(order.ngayTaoDH) }}</dd>
                  </div>
                  <div v-if="order.ngayThanhToanDH" class="flex justify-between items-center py-2 px-3 bg-green-50/80 rounded-lg">
                    <dt class="text-sm font-medium text-green-600">Ngày thanh toán:</dt>
                    <dd class="text-sm font-bold text-green-900">{{ formatDate(order.ngayThanhToanDH) }}</dd>
                  </div>
                </dl>
              </div>
              
              <!-- Status Timeline -->
              <div class="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                <h4 class="font-bold text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Trạng thái chi tiết
                </h4>
                <div class="space-y-4">
                  <div v-for="subOrder in order.subOrder" :key="subOrder.maDHC">
                    <h5 class="text-sm font-semibold text-gray-700 mb-3 px-3 py-1 bg-purple-100 rounded-lg">
                      Gian hàng #{{ subOrder.maGianHangDHC }}
                    </h5>
                    <div class="space-y-2 pl-4 border-l-2 border-gray-200">
                      <div v-if="subOrder.orderState.choDuyetTTDH" class="flex items-center space-x-3 py-2">
                        <div class="w-3 h-3 bg-yellow-400 rounded-full shadow-sm animate-pulse"></div>
                        <div>
                          <p class="text-xs font-medium text-gray-700">Chờ duyệt</p>
                          <p class="text-xs text-gray-500">{{ formatDate(subOrder.orderState.choDuyetTTDH) }}</p>
                        </div>
                      </div>
                      <div v-if="subOrder.orderState.xacNhanTTDH" class="flex items-center space-x-3 py-2">
                        <div class="w-3 h-3 bg-blue-400 rounded-full shadow-sm"></div>
                        <div>
                          <p class="text-xs font-medium text-gray-700">Đã xác nhận</p>
                          <p class="text-xs text-gray-500">{{ formatDate(subOrder.orderState.xacNhanTTDH) }}</p>
                        </div>
                      </div>
                      <div v-if="subOrder.orderState.dangGiaoTTDH" class="flex items-center space-x-3 py-2">
                        <div class="w-3 h-3 bg-orange-400 rounded-full shadow-sm animate-pulse"></div>
                        <div>
                          <p class="text-xs font-medium text-gray-700">Đang giao hàng</p>
                          <p class="text-xs text-gray-500">{{ formatDate(subOrder.orderState.dangGiaoTTDH) }}</p>
                        </div>
                      </div>
                      <div v-if="subOrder.orderState.daGiaoTTDH" class="flex items-center space-x-3 py-2">
                        <div class="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
                        <div>
                          <p class="text-xs font-medium text-gray-700">Đã giao hàng</p>
                          <p class="text-xs text-gray-500">{{ formatDate(subOrder.orderState.daGiaoTTDH) }}</p>
                        </div>
                      </div>
                      <div v-if="subOrder.orderState.daNhanTTDH" class="flex items-center space-x-3 py-2">
                        <div class="w-3 h-3 bg-green-600 rounded-full shadow-sm"></div>
                        <div>
                          <p class="text-xs font-medium text-green-700">Đã nhận hàng</p>
                          <p class="text-xs text-gray-500">{{ formatDate(subOrder.orderState.daNhanTTDH) }}</p>
                        </div>
                      </div>
                      <div v-if="subOrder.orderState.daHuyTTDH" class="flex items-center space-x-3 py-2">
                        <div class="w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
                        <div>
                          <p class="text-xs font-medium text-red-700">Đã hủy</p>
                          <p class="text-xs text-gray-500">{{ formatDate(subOrder.orderState.daHuyTTDH) }}</p>
                        </div>
                      </div>
                      <div v-if="subOrder.orderState.daHoanTienTTDH" class="flex items-center space-x-3 py-2">
                        <div class="w-3 h-3 bg-purple-400 rounded-full shadow-sm"></div>
                        <div>
                          <p class="text-xs font-medium text-purple-700">Đã hoàn tiền</p>
                          <p class="text-xs text-gray-500">{{ formatDate(subOrder.orderState.daHoanTienTTDH) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Pagination -->
        <div v-if="totalPages > 1" class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div class="px-6 py-4">
            <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div class="text-sm text-gray-700">
                Hiển thị <span class="font-bold text-blue-600">{{ currentPage * pageSize + 1 }}</span> đến 
                <span class="font-bold text-blue-600">{{ Math.min((currentPage + 1) * pageSize, totalElements) }}</span> 
                trong tổng số <span class="font-bold text-blue-600">{{ totalElements }}</span> đơn hàng
              </div>
              
              <nav class="flex items-center space-x-2">
                <button 
                  @click="previousPage" 
                  :disabled="currentPage === 0"
                  class="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Trước
                </button>
                
                <div class="hidden sm:flex space-x-1">
                  <button 
                    v-for="page in getPageNumbers()" 
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'px-4 py-2 rounded-xl font-medium transition-all shadow-sm',
                      page === currentPage 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                        : 'bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-200/50'
                    ]"
                  >
                    {{ page + 1 }}
                  </button>
                </div>
                
                <button 
                  @click="nextPage" 
                  :disabled="currentPage >= totalPages - 1"
                  class="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Sau
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
          <p class="text-gray-600 mb-6">Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!</p>
          <button class="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all shadow-lg hover:shadow-xl">
            Bắt đầu mua sắm
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Cancel Confirmation Modal -->
    <div v-if="showCancelModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all">
        <div class="p-8">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Xác nhận hủy đơn hàng</h3>
            <p class="text-gray-600 mb-8">
              Bạn có chắc chắn muốn hủy đơn hàng <span class="font-bold text-red-600">#{{ orderToCancel?.maDH }}</span>? 
              Hành động này không thể hoàn tác.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="confirmCancelOrder"
                :disabled="cancelLoading"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <span v-if="cancelLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang hủy...
                </span>
                <span v-else>Xác nhận hủy</span>
              </button>
              <button
                @click="closeCancelModal"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all shadow-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

const showModal = ref(false);
const modalType = ref(null);
const titleModal = ref(null);
const message = ref(null);
const confirmText = ref(null);
const handleConfirm = ref();

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
      return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200';
    case 'CHUATHANHTOAN':
      return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200';
    default:
      return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300';
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
  if (orderState.daNhanTTDH) return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200';
  if (orderState.daHoanTienTTDH) return 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border border-purple-200';
  if (orderState.daHuyTTDH) return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200';
  if (orderState.daGiaoTTDH) return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200';
  if (orderState.dangGiaoTTDH) return 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200';
  if (orderState.xacNhanTTDH) return 'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border border-indigo-200';
  if (orderState.choDuyetTTDH) return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200';
  return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300';
};

const getSubOrderStatusText = (orderState) => {
  if (orderState.daNhanTTDH) return 'Đã nhận';
  if (orderState.daHoanTienTTDH) return 'Đã hoàn tiền';
  if (orderState.daHuyTTDH) return 'Đã hủy';
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
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Có lỗi xảy ra khi hủy đơn hàng';
  } finally {
    showModalConfirm({
      type: 'SUCCESS',
      message: 'Đơn hàng đã được hủy thành công!'
    });
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

// SEO Meta
useHead({
  title: 'Quản lý đơn hàng',
  meta: [
    { name: 'description', content: 'Quản lý và theo dõi tình trạng các đơn hàng của bạn' }
  ]
});
</script>

<style scoped>
/* Custom animations and effects */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.order-card {
  animation: slideIn 0.5s ease-out;
}

.status-badge {
  animation: fadeIn 0.3s ease-out;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .order-card {
    margin: 0 -1rem;
    border-radius: 1rem;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Loading animation improvements */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover effects for interactive elements */
.interactive-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive-hover:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Focus states for accessibility */
button:focus,
.focusable:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Glass morphism effect for modern look */
.glass-morphism {
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.125);
}
</style>