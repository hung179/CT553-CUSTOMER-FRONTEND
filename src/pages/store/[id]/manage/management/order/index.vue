<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header with glassmorphism effect -->
    <div class="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Quản Lý Đơn Hàng
                </h1>
                <p class="text-sm text-gray-600 mt-1">Theo dõi và xử lý đơn hàng của bạn</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="relative group">
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-75 transition duration-1000 animate-tilt"></div>
                <div class="relative bg-white px-6 py-3 rounded-xl shadow-lg">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span class="text-sm font-semibold text-gray-800">{{ orders.length }}</span>
                    <span class="text-sm text-gray-600">Tổng đơn</span>
                  </div>
                </div>
              </div>
              <div class="relative group">
                <div class=" bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div class="relative bg-white px-6 py-3 rounded-xl shadow-lg">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span class="text-sm font-semibold text-gray-800">{{ pendingOrdersCount }}</span>
                    <span class="text-sm text-gray-600">Chờ xác nhận</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Enhanced Filters and Search -->
      <div class="relative group mb-8">
        <div class="rounded-2xl blur-sm opacity-25  transition duration-1000 group-hover:duration-200"></div>
        <div class="relative bg-white/90 rounded-2xl shadow-xl border border-white/20 p-8">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <!-- Search Input -->
              <div class="relative group">
                <div class=" bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-30 transition duration-300"></div>
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Tìm kiếm theo mã đơn hàng..."
                    class="pl-12 pr-4 py-4 w-80 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Status Filter -->
              <div class="relative group">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
                <select
                  v-model="statusFilter"
                  class="relative px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl appearance-none cursor-pointer min-w-48"
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="choDuyet">Chờ duyệt</option>
                  <option value="xacNhan">Đã xác nhận</option>
                  <option value="dangGiao">Đang giao</option>
                  <option value="daGiao">Đã giao</option>
                  <option value="daNhan">Đã nhận</option>
                  <option value="daHuy">Đã hủy</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Refresh Button -->
            <button
              @click="fetchOrders"
              :disabled="loading"
              class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
            >
              <div class=" bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div class="relative flex items-center space-x-2">
                <span>{{ loading ? 'Đang tải...' : 'Làm mới' }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State with enhanced animation -->
      <div v-if="loading" class="flex flex-col justify-center items-center py-20">
        <div class="relative">
          <div class="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div class="w-20 h-20 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
        </div>
        <p class="mt-4 text-gray-600 font-medium">Đang tải dữ liệu...</p>
      </div>

      <!-- Enhanced Empty State -->
      <div v-else-if="filteredOrders.length === 0" class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl blur opacity-25"></div>
        <div class="relative backdrop-blur-lg bg-white/90 rounded-3xl shadow-2xl border border-white/20 p-16 text-center">
          <div class="mx-auto h-32 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-8 shadow-inner">
            <svg class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Chưa có đơn hàng nào</h3>
          <p class="text-gray-600 text-lg">Khi có đơn hàng mới, chúng sẽ hiển thị tại đây.</p>
        </div>
      </div>

      <!-- Enhanced Orders List -->
      <div v-else class="space-y-6">
        <div
          v-for="(order, index) in filteredOrders"
          :key="order.maDHC"
          class="group relative transform transition-all duration-500"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="absolute bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl opacity-25 transition duration-1000 animate-tilt"></div>
          
          <div class="relative bg-white/90 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <!-- Enhanced Order Header -->
            <div class="px-8 py-6 bg-gradient-to-r from-gray-50/90 to-blue-50/90 border-b border-gray-200/50">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-6">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-gray-900">
                        Đơn hàng #{{ order.maDHC }}
                      </h3>
                      <p class="text-sm text-gray-600">Gian hàng: {{ order.maGianHangDHC }}</p>
                    </div>
                  </div>
                  <div class="relative">
                    <span :class="getEnhancedStatusBadgeClass(getOrderStatus(order.orderState))">
                      {{ getStatusText(getOrderStatus(order.orderState)) }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm text-gray-600">
                    {{ formatDate(getOrderDate(order.orderState)) }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    ID: {{ order.maDHC }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Order Items -->
            <div class="px-8 py-6">
              <div class="space-y-4">
                <div
                  v-for="(item) in order.orderItems"
                  :key="`${item.orderItemId.maDH}-${item.orderItemId.maSP}`"
                  class="group/item relative overflow-hidden"
                >
                  <div class="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-0 group-hover/item:opacity-30 transition duration-300"></div>
                  <div class="relative flex items-center justify-between p-6 bg-gradient-to-r from-gray-50/50 to-blue-50/50 rounded-xl border border-gray-200/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center space-x-4">
                      <div class="relative">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div class="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {{ item.soLuong || 1 }}
                        </div>
                      </div>
                      <div>
                        <div class="font-bold text-gray-900 text-lg">Sản phẩm #{{ item.orderItemId.maSP }}</div>
                        <div class="text-sm text-gray-600 flex items-center space-x-2 mt-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span>Số lượng: {{ item.soLuong || 1 }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {{ formatCurrency(item.giaSP) }}
                      </div>
                      <div class="text-sm text-gray-500 mt-1">
                        Đơn giá
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Order Actions -->
            <div class="px-8 py-6 bg-gradient-to-r from-gray-50/90 to-blue-50/90 border-t border-gray-200/50">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-sm text-gray-600 mb-1">Tổng giá trị đơn hàng</span>
                  <span class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {{ formatCurrency(calculateOrderTotal(order.orderItems)) }}
                  </span>
                </div>
                <div class="flex space-x-4">
                  <button
                    v-if="canConfirmOrder(order.orderState)"
                    @click="confirmOrder(order.maDHC)"
                    :disabled="confirmingOrders.has(order.maDHC)"
                    class="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                  >
                    <div class=" bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div class="relative flex items-center space-x-2">
                      <svg 
                        :class="confirmingOrders.has(order.maDHC) ? 'animate-spin' : ''"
                        class="w-5 h-5" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle v-if="confirmingOrders.has(order.maDHC)" class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path v-if="confirmingOrders.has(order.maDHC)" class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{{ confirmingOrders.has(order.maDHC) ? 'Đang xử lý...' : 'Xác nhận đơn hàng' }}</span>
                    </div>
                  </button>
                  <button
                    @click="viewOrderDetails(order)"
                    class="group relative inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div class="flex items-center space-x-2">
                      <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Chi tiết</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <nav class="relative backdrop-blur-lg bg-white/90 rounded-2xl shadow-xl border border-white/20 flex items-center" aria-label="Pagination">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 0"
              class="relative inline-flex items-center px-4 py-3 rounded-l-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 focus:z-10 disabled:opacity-50 transition-all duration-200"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="px-6 py-3">
              <span class="text-sm font-medium text-gray-700">
                Trang {{ currentPage + 1 }} / {{ totalPages }}
              </span>
            </div>
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage >= totalPages - 1"
              class="relative inline-flex items-center px-4 py-3 rounded-r-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 focus:z-10 disabled:opacity-50 transition-all duration-200"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Enhanced Order Details Modal -->
    <div
      v-if="selectedOrder"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div 
        class="relative w-full max-w-4xl transform transition-all duration-300 ease-out"
        @click.stop
      >
        <div class="absolute bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-75"></div>
        <div class="relative backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Chi tiết đơn hàng #{{ selectedOrder.maDHC }}</h3>
                <p class="text-sm text-gray-600 mt-1">Thông tin chi tiết về đơn hàng</p>
              </div>
            </div>
            <button 
              @click="closeModal" 
              class="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-8 space-y-8 max-h-96 overflow-y-auto">
            <!-- Order Information -->
            <div>
              <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Thông tin đơn hàng</span>
              </h4>
              <div class="relative group">
                <div class="absolute bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-25 transition duration-300"></div>
                <div class="relative bg-gradient-to-r from-gray-50/80 to-blue-50/80 p-6 rounded-2xl border border-gray-200/50 space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Mã đơn hàng con</p>
                        <p class="font-bold text-gray-900">{{ selectedOrder.maDHC }}</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Gian hàng</p>
                        <p class="font-bold text-gray-900">{{ selectedOrder.maGianHangDHC }}</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Trạng thái</p>
                        <span :class="getEnhancedStatusBadgeClass(getOrderStatus(selectedOrder.orderState))">
                          {{ getStatusText(getOrderStatus(selectedOrder.orderState)) }}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4m-4 4a2 2 0 01-2-2v-1a2 2 0 012-2h8a2 2 0 012 2v1a2 2 0 01-2 2H8z" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Ngày tạo</p>
                        <p class="font-bold text-gray-900">{{ formatDate(getOrderDate(selectedOrder.orderState)) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Products Section -->
            <div>
              <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Sản phẩm trong đơn hàng</span>
              </h4>
              <div class="space-y-3">
                <div
                  v-for="(item) in selectedOrder.orderItems"
                  :key="`${item.orderItemId.maDH}-${item.orderItemId.maSP}`"
                  class="group relative transform transition-all duration-300"
                >
                  <div class="absolute bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-0 transition duration-300"></div>
                  <div class="relative flex justify-between items-center p-4 bg-gradient-to-r from-gray-50/80 to-green-50/80 rounded-xl border border-gray-200/50 shadow-sm transition-all duration-300">
                    <div class="flex items-center space-x-4">
                      <div class="relative">
                        <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                          {{ item.soLuong || 1 }}
                        </div>
                      </div>
                      <div>
                        <p class="font-bold text-gray-900 text-lg">Sản phẩm #{{ item.orderItemId.maSP }}</p>
                        <div class="flex items-center space-x-4 mt-1">
                          <span class="text-sm text-gray-600 flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span>Số lượng: {{ item.soLuong || 1 }}</span>
                          </span>
                          <span class="text-sm text-gray-600 flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>Đơn giá</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {{ formatCurrency(item.giaSP) }}
                      </p>
                      <p class="text-sm text-gray-500 mt-1">
                        Thành tiền: {{ formatCurrency((item.giaSP || 0) * (item.soLuong || 1)) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Total Section -->
            <div class="relative group">
              <div class="absolute bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-50"></div>
              <div class="relative backdrop-blur-sm bg-gradient-to-r from-green-50/90 to-emerald-50/90 p-6 rounded-2xl border-2 border-green-200/50">
                <div class="flex justify-between items-center">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-lg text-gray-600">Tổng giá trị đơn hàng</p>
                      <p class="text-xs text-gray-500">Bao gồm tất cả sản phẩm</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {{ formatCurrency(calculateOrderTotal(selectedOrder.orderItems)) }}
                    </p>
                    <p class="text-sm text-gray-500 mt-1">VNĐ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end space-x-4 p-8 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90">
            <button
              @click="closeModal"
              class="px-8 py-3 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Success Toast -->
    <Transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-2 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-2 opacity-0 scale-95"
    >
      <div
        v-if="showSuccessToast"
        class="fixed top-8 right-8 z-50"
      >
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div class="relative backdrop-blur-lg bg-white/95 px-8 py-4 rounded-2xl shadow-2xl border border-white/20">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Thành công!</p>
                <p class="text-sm text-gray-600">{{ successMessage }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Enhanced Error Toast -->
    <Transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-2 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-2 opacity-0 scale-95"
    >
      <div
        v-if="showErrorToast"
        class="fixed top-8 right-8 z-50"
      >
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div class="relative backdrop-blur-lg bg-white/95 px-8 py-4 rounded-2xl shadow-2xl border border-white/20">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Có lỗi xảy ra!</p>
                <p class="text-sm text-gray-600">{{ errorMessage }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['is-store-owner']
});

const route = useRoute();
const { $api } = useNuxtApp();
const mssv = computed(() => route.params.id);
const authStore = useAuthStore();
const storeId = computed(() => authStore.user?.maGHDT);

// Reactive data
const orders = ref([]);
const loading = ref(false);
const confirmingOrders = ref(new Set());
const selectedOrder = ref(null);
const searchQuery = ref('');
const statusFilter = ref('');
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);

// Toast notifications
const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// Computed properties
const filteredOrders = computed(() => {
  let filtered = orders.value;
  
  if (searchQuery.value) {
    filtered = filtered.filter(order => 
      order.maDHC.toString().includes(searchQuery.value)
    );
  }
  
  if (statusFilter.value) {
    filtered = filtered.filter(order => {
      const status = getOrderStatus(order.orderState);
      return status === statusFilter.value;
    });
  }
  
  return filtered;
});

const pendingOrdersCount = computed(() => {
  return orders.value.filter(order => getOrderStatus(order.orderState) === 'choDuyet').length;
});

// Methods
const fetchOrders = async () => {
  try {
    loading.value = true;
    const response = await $api.get(`subOrders/byId/${storeId.value}?page=${currentPage.value}&size=${pageSize.value}`);
    orders.value = response.data.content || [];
    totalPages.value = response.data.totalPages || 1;
    console.log('Orders fetched:', orders.value);
  } catch (error) {
    console.error('Error fetching orders:', error);
    showError('Có lỗi xảy ra khi tải danh sách đơn hàng');
  } finally {
    loading.value = false;
  }
}; 

const confirmOrder = async (maDHC) => {
  try {
    confirmingOrders.value.add(maDHC);
    const response = await $api.post(`subOrders/xacNhan/${maDHC}`);
    
    if (response.success) {
      const orderIndex = orders.value.findIndex(order => order.maDHC === maDHC);
      if (orderIndex !== -1) {
        orders.value[orderIndex].orderState.xacNhanTTDH = new Date().toISOString();
      }
      showSuccess('Xác nhận đơn hàng thành công!');
    } else {
      showError(response.message || 'Không thể xác nhận đơn hàng');
    }
  } catch (error) {
    console.error('Error confirming order:', error);
    showError('Có lỗi xảy ra khi xác nhận đơn hàng');
  } finally {
    confirmingOrders.value.delete(maDHC);
  }
};

const getOrderStatus = (orderState) => {
  if (orderState.daHuyTTDH) return 'daHuy';
  if (orderState.daNhanTTDH) return 'daNhan';
  if (orderState.daGiaoTTDH) return 'daGiao';
  if (orderState.dangGiaoTTDH) return 'dangGiao';
  if (orderState.xacNhanTTDH) return 'xacNhan';
  if (orderState.choDuyetTTDH) return 'choDuyet';
  return 'unknown';
};

const getStatusText = (status) => {
  const statusMap = {
    choDuyet: 'Chờ duyệt',
    xacNhan: 'Đã xác nhận',
    dangGiao: 'Đang giao',
    daGiao: 'Đã giao',
    daNhan: 'Đã nhận',
    daHuy: 'Đã hủy',
    unknown: 'Không xác định'
  };
  return statusMap[status] || status;
};

const getStatusBadgeClass = (status) => {
  const classMap = {
    choDuyet: 'px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800',
    xacNhan: 'px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800',
    dangGiao: 'px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800',
    daGiao: 'px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800',
    daNhan: 'px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800',
    daHuy: 'px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800',
    unknown: 'px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800'
  };
  return classMap[status] || classMap.unknown;
};

const getEnhancedStatusBadgeClass = (status) => {
  const classMap = {
    choDuyet: 'inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg transform hover:scale-105 transition-all duration-200',
    xacNhan: 'inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200',
    dangGiao: 'inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200',
    daGiao: 'inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200',
    daNhan: 'inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200',
    daHuy: 'inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200',
    unknown: 'inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200'
  };
  return classMap[status] || classMap.unknown;
};

const canConfirmOrder = (orderState) => {
  return orderState.choDuyetTTDH && !orderState.xacNhanTTDH && !orderState.daHuyTTDH;
};

const getOrderDate = (orderState) => {
  return orderState.choDuyetTTDH || orderState.xacNhanTTDH || new Date().toISOString();
};

const calculateOrderTotal = (orderItems) => {
  if (!orderItems || orderItems.length === 0) return 0;
  return orderItems.reduce((total, item) => {
    const quantity = item.soLuong || 1;
    const price = item.giaSP || 0;
    return total + (price * quantity);
  }, 0);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
};

const viewOrderDetails = (order) => {
  selectedOrder.value = order;
};

const closeModal = () => {
  selectedOrder.value = null;
};

const changePage = (newPage) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    fetchOrders();
  }
};

const showSuccess = (message) => {
  successMessage.value = message;
  showSuccessToast.value = true;
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 5000);
};

const showError = (message) => {
  errorMessage.value = message;
  showErrorToast.value = true;
  setTimeout(() => {
    showErrorToast.value = false;
  }, 5000);
};

// Lifecycle
onMounted(() => {
  fetchOrders();
});

// Watch for filter changes
watch([searchQuery, statusFilter], () => {
  // Optional: Add debouncing for search
});
</script>

<style scoped>
@keyframes tilt {
  0%, 50%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  75% {
    transform: rotate(-0.5deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #6366f1);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #4f46e5);
}

/* Glass morphism utilities */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Hover scale utility */
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>