<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 py-8">
      <!-- Header with animations -->
      <div class="mb-8 animate-fade-in">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          Ví điện tử
        </h1>
        <p class="text-gray-600">Quản lý tài chính thông minh</p>
      </div>

      <!-- Enhanced Wallet Balance Card -->
      <div class="relative group mb-8 animate-slide-up">
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div class="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
          <div class="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div class="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div class="relative flex items-center justify-between">
            <div class="space-y-3">
              <p class="text-blue-100 text-sm font-medium tracking-wide">Số dư khả dụng</p>
              <div class="flex items-center space-x-3">
                <h2 class="text-4xl font-bold tracking-tight animate-number-change">
                  {{ formatCurrency(walletData?.soDuVDT || 0) }}
                </h2>
                <span class="text-blue-200 text-xl font-medium">VNĐ</span>
              </div>
              <p class="text-blue-200 text-sm font-mono">
                Mã ví: {{ walletData?.maVDT || "N/A" }}
              </p>
            </div>
            
            <div class="relative">
              <div class="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zM12 16h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-2xl blur animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <NuxtLink :to="`/wallet/${mssv}/pay`" class="group relative overflow-hidden bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 animate-slide-up-delay-1">
          <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative flex items-center space-x-4">
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>
              <span class="font-semibold text-gray-900 text-lg">Nạp tiền</span>
              <p class="text-gray-600 text-sm mt-1">Thêm tiền vào ví</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink :to="`/wallet/${mssv}/withdraw`" class="group relative overflow-hidden bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 animate-slide-up-delay-2">
          <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative flex items-center space-x-4">
            <div class="bg-gradient-to-r from-red-500 to-rose-600 p-4 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-3-6h6"></path>
              </svg>
            </div>
            <div>
              <span class="font-semibold text-gray-900 text-lg">Rút tiền</span>
              <p class="text-gray-600 text-sm mt-1">Chuyển tiền ra ngân hàng</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Enhanced Transaction Filters -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/50 animate-slide-up-delay-3">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          Bộ lọc giao dịch
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Loại giao dịch</label>
            <select v-model="filters.loaiGD" @change="applyFilters" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white">
              <option value="">Tất cả</option>
              <option value="NAPTIEN">Nạp tiền</option>
              <option value="THANHTOAN">Thanh toán</option>
              <option value="HOANTIEN">Hoàn tiền</option>
              <option value="RUTTIEN">Rút tiền</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Trạng thái</label>
            <select v-model="filters.trangThaiGD" @change="applyFilters" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white">
              <option value="">Tất cả</option>
              <option value="DATHANHTOAN">Thành công</option>
              <option value="DANGXULY">Đang xử lý</option>
              <option value="DA_HUY">Đã hủy</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Thời gian</label>
            <select v-model="filters.timeRange" @change="applyFilters" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white">
              <option value="all">Tất cả</option>
              <option value="today">Hôm nay</option>
              <option value="week">7 ngày qua</option>
              <option value="month">30 ngày qua</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Enhanced Transaction History -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden animate-slide-up-delay-4">
        <div class="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm p-6 border-b border-gray-200/50">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Lịch sử giao dịch</h3>
              <p class="text-sm text-gray-600 mt-1">{{ filteredTransactions.length }} giao dịch</p>
            </div>
            <button @click="refreshData" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors duration-300 flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        <div v-if="loading" class="p-12 text-center">
          <div class="relative">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 animate-spin animation-delay-150"></div>
          </div>
          <p class="text-gray-600 mt-4 font-medium">Đang tải dữ liệu...</p>
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="p-12 text-center">
          <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-gray-700 mb-2">Chưa có giao dịch</h4>
          <p class="text-gray-500">Bạn chưa thực hiện giao dịch nào</p>
        </div>

        <div v-else class="divide-y divide-gray-100/80">
          <div v-for="(transaction, index) in filteredTransactions" :key="transaction.maGD" 
               class="p-6 hover:bg-white/60 transition-all duration-300 cursor-pointer group transform hover:scale-[1.01]" 
               @click="viewTransactionDetail(transaction)"
               :style="{ animationDelay: `${index * 100}ms` }"
               :class="`animate-fade-in-up`">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0 relative">
                  <div :class="getTransactionIconClass(transaction.loaiGD)" class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <component :is="getTransactionIcon(transaction.loaiGD)" class="w-6 h-6" />
                  </div>
                  <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" v-if="transaction.trangThaiGD === 'DATHANHTOAN'"></div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <p class="text-base font-semibold text-gray-900">{{ getTransactionTypeLabel(transaction.loaiGD) }}</p>
                    <span :class="getStatusBadgeClass(transaction.trangThaiGD)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      {{ getStatusLabel(transaction.trangThaiGD) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-1 font-medium">{{ formatDate(transaction.thoiGianGD) }}</p>
                  <p v-if="transaction.chiTietGD" class="text-xs text-gray-500 truncate bg-gray-50 px-2 py-1 rounded-lg">{{ transaction.chiTietGD }}</p>
                  <p v-if="transaction.idDonHangGD" class="text-xs text-blue-600 mt-1 font-mono">Đơn hàng: #{{ transaction.idDonHangGD }}</p>
                </div>
              </div>
              <div class="flex flex-col items-end space-y-1">
                <p :class="getAmountClass(transaction.loaiGD)" class="text-lg font-bold">
                  {{ getAmountPrefix(transaction.loaiGD) }}{{ formatCurrency(transaction.soTienGD) }}
                </p>
                <svg class="w-5 h-5 text-gray-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center animate-fade-in">
        <nav class="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 0" 
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 border border-gray-300 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <span class="px-6 py-2 text-sm font-semibold text-gray-700 bg-blue-50 rounded-xl">
            Trang {{ currentPage + 1 }} / {{ totalPages }}
          </span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages - 1" 
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 border border-gray-300 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- Enhanced Transaction Detail Modal -->
    <Teleport to="body">
      <div v-if="selectedTransaction" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" @click="closeModal">
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl max-w-md w-full shadow-2xl border border-white/50 animate-modal-slide-up" @click.stop>
          <div class="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl p-6 text-white">
            <button @click="closeModal" class="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 class="text-xl font-bold mb-2">Chi tiết giao dịch</h3>
            <p class="text-blue-100 text-sm">Mã GD: #{{ selectedTransaction.maGD }}</p>
          </div>
          
          <div class="p-6 space-y-4">
            <div class="flex justify-between items-center p-3 bg-gray-50/80 rounded-xl">
              <span class="text-gray-600 font-medium">Loại giao dịch:</span>
              <span class="font-semibold text-gray-900">{{ getTransactionTypeLabel(selectedTransaction.loaiGD) }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50/80 rounded-xl">
              <span class="text-gray-600 font-medium">Số tiền:</span>
              <span :class="getAmountClass(selectedTransaction.loaiGD)" class="font-bold text-lg">
                {{ getAmountPrefix(selectedTransaction.loaiGD) }}{{ formatCurrency(selectedTransaction.soTienGD) }}
              </span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50/80 rounded-xl">
              <span class="text-gray-600 font-medium">Trạng thái:</span>
              <span :class="getStatusBadgeClass(selectedTransaction.trangThaiGD)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold">
                {{ getStatusLabel(selectedTransaction.trangThaiGD) }}
              </span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50/80 rounded-xl">
              <span class="text-gray-600 font-medium">Thời gian:</span>
              <span class="font-semibold text-gray-900 text-sm">{{ formatDate(selectedTransaction.thoiGianGD) }}</span>
            </div>
            <div v-if="selectedTransaction.idDonHangGD" class="flex justify-between items-center p-3 bg-gray-50/80 rounded-xl">
              <span class="text-gray-600 font-medium">Đơn hàng:</span>
              <span class="font-mono font-semibold text-blue-600">#{{ selectedTransaction.idDonHangGD }}</span>
            </div>
            <div v-if="selectedTransaction.chiTietGD" class="p-3 bg-blue-50/80 rounded-xl border-l-4 border-blue-500">
              <span class="text-gray-600 font-medium block mb-2">Chi tiết:</span>
              <p class="text-sm text-gray-900 leading-relaxed">{{ selectedTransaction.chiTietGD }}</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { h } from 'vue'

const route = useRoute()
const mssv = computed(() => route.params.id)

const loading = ref(false)
const walletData = ref(null)
const transactions = ref([])
const selectedTransaction = ref(null)
const currentPage = ref(0)
const totalPages = ref(1)
const { $api } = useNuxtApp()

const filters = ref({
  loaiGD: "",
  trangThaiGD: "",
  timeRange: "all",
})

const filteredTransactions = computed(() => {
  let filtered = [...transactions.value]

  if (filters.value.loaiGD) {
    filtered = filtered.filter((t) => t.loaiGD === filters.value.loaiGD)
  }

  if (filters.value.trangThaiGD) {
    filtered = filtered.filter((t) => t.trangThaiGD === filters.value.trangThaiGD)
  }

  if (filters.value.timeRange !== "all") {
    const now = new Date()
    const timeFilter = {
      today: (t) => {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        return new Date(t.thoiGianGD) >= today
      },
      week: (t) => {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return new Date(t.thoiGianGD) >= weekAgo
      },
      month: (t) => {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return new Date(t.thoiGianGD) >= monthAgo
      },
    }

    filtered = filtered.filter(timeFilter[filters.value.timeRange])
  }

  return filtered
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount)
}

const formatDate = (date) => {
  return new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const getTransactionTypeLabel = (type) => {
  const labels = {
    NAPTIEN: "Nạp tiền",
    THANHTOAN: "Thanh toán",
    CHUYENTIEN: "Chuyển tiền",
    HOANTIEN: "Hoàn tiền",
    RUTTIEN: "Rút tiền",
  }
  return labels[type] || type
}

const getStatusLabel = (status) => {
  const labels = {
    DATHANHTOAN: "Thành công",
    DANGXULY: "Đang xử lý",
    THATBAI: "Thất bại",
    DAHUY: "Đã hủy",
  }
  return labels[status] || status
}

const getStatusBadgeClass = (status) => {
  const classes = {
    DATHANHTOAN: "bg-green-100 text-green-800 border border-green-200",
    DANGXULY: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    THATBAI: "bg-red-100 text-red-800 border border-red-200",
    DA_HUY: "bg-gray-100 text-gray-800 border border-gray-200",
  }
  return classes[status] || "bg-gray-100 text-gray-800 border border-gray-200"
}

const getTransactionIconClass = (type) => {
  const classes = {
    NAPTIEN: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
    THANHTOAN: "bg-gradient-to-r from-red-500 to-rose-600 text-white",
    CHUYENTIEN: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
    HOANTIEN: "bg-gradient-to-r from-purple-500 to-violet-600 text-white",
    RUTTIEN: "bg-gradient-to-r from-orange-500 to-amber-600 text-white",
  }
  return classes[type] || "bg-gradient-to-r from-gray-500 to-slate-600 text-white"
}

const getTransactionIcon = (type) => {
  const icons = {
    NAPTIEN: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6v6m0 0v6m0-6h6m-6 0H6' })
    ]),
    THANHTOAN: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' })
    ]),
    RUTTIEN: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-3-6h6' })
    ]),
    HOANTIEN: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' })
    ]),
    CHUYENTIEN: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' })
    ])
  }
  return icons[type] || icons.THANHTOAN
}

const getAmountClass = (type) => {
  return type === "NAPTIEN" || type === "HOANTIEN" ? "text-green-600" : "text-red-600"
}

const getAmountPrefix = (type) => {
  return type === "NAPTIEN" || type === "HOANTIEN" ? "+" : "-"
}

const viewTransactionDetail = (transaction) => {
  selectedTransaction.value = transaction
}

const closeModal = () => {
  selectedTransaction.value = null
}

const applyFilters = () => {
  console.log("Applying filters:", filters.value)
}

const changePage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page
    fetchTransactions()
  }
}

const refreshData = async () => {
  await fetchWalletData()
  await fetchTransactions()
}

const fetchWalletData = async () => {
  loading.value = true
  try {
    const response = await $api.get(`/wallet/${mssv.value}`)
    walletData.value = response.data
  } catch (error) {
    console.error("Error fetching wallet data:", error)
  } finally {
    loading.value = false
  }
}

const fetchTransactions = async () => {
  if (!walletData.value?.maVDT) return
  
  loading.value = true
  try {
    const response = await $api.get(`/wallet/transactions/${walletData.value.maVDT}?page=${currentPage.value}`)
    transactions.value = response.data.content || []
    totalPages.value = response.data.totalPages || 1
  } catch (error) {
    console.error("Error fetching transactions:", error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchWalletData()
  await fetchTransactions()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modal-slide-up {
  from {
    opacity: 0;
    transform: translateY(100px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes number-change {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out;
}

.animate-slide-up-delay-1 {
  animation: slide-up 0.8s ease-out 0.1s both;
}

.animate-slide-up-delay-2 {
  animation: slide-up 0.8s ease-out 0.2s both;
}

.animate-slide-up-delay-3 {
  animation: slide-up 0.8s ease-out 0.3s both;
}

.animate-slide-up-delay-4 {
  animation: slide-up 0.8s ease-out 0.4s both;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out;
}

.animate-modal-slide-up {
  animation: modal-slide-up 0.4s ease-out;
}

.animate-number-change {
  animation: number-change 0.6s ease-out;
}

.animation-delay-150 {
  animation-delay: 150ms;
}

/* Glassmorphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2563eb, #7c3aed);
}

/* Hover effects */
.group:hover .animate-ping {
  animation-duration: 1s;
}

/* Focus states */
select:focus, input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading spinner enhancement */
@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin-slow 1s linear infinite;
}
</style>