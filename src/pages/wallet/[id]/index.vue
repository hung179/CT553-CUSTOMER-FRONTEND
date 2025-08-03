<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <!-- <div class="bg-white shadow-sm border-b">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-gray-900">Ví điện tử</h1>
          </div>
          <button @click="refreshData" :disabled="loading" class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span>Làm mới</span>
          </button>
        </div>
      </div>
    </div> -->

    <div class="max-w-4xl mx-auto px-4 py-6 my-4">
      <!-- Wallet Balance Card -->
      <div
        class="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white mb-6 shadow-lg"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium mb-1">Số dư khả dụng</p>
            <div class="flex items-center space-x-2">
              <h2 class="text-3xl font-bold">
                {{ formatCurrency(walletData?.soDuVDT || 0) }}
              </h2>
              <span class="text-blue-100 text-lg">VNĐ</span>
            </div>
            <p class="text-blue-100 text-xs mt-1">
              Mã ví: {{ walletData?.maVDT || "N/A" }}
            </p>
          </div>
          <div class="bg-white/10 p-4 rounded-xl">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zM12 16h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
       <NuxtLink :to="`/wallet/${mssv}/pay`">

      <div class="grid grid-cols-2 gap-4 mb-6">
        <button
          class="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow flex items-center space-x-3"
        >
          <div class="bg-green-100 p-3 rounded-lg">
            <svg
              class="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <span class="mx-3 font-medium text-gray-900">Nạp tiền</span>
        </button>
      </div>
       </NuxtLink>

      <!-- Transaction Filters -->
      <div class="bg-white rounded-xl p-4 mb-6 shadow-sm border">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Loại giao dịch</label
            >
            <select
              v-model="filters.loaiGD"
              @change="applyFilters"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả</option>
              <option value="NAPTIEN">Nạp tiền</option>
              <option value="THANHTOAN">Thanh toán</option>
              <option value="HOANTIEN">Hoàn tiền</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Trạng thái</label
            >
            <select
              v-model="filters.trangThaiGD"
              @change="applyFilters"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả</option>
              <option value="DATHANHTOAN">Thành công</option>
              <option value="CHUATHANHTOAN">Chưa thanh toán</option>
              <option value="DA_HUY">Đã hủy</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Thời gian</label
            >
            <select
              v-model="filters.timeRange"
              @change="applyFilters"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="today">Hôm nay</option>
              <option value="week">7 ngày qua</option>
              <option value="month">30 ngày qua</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Transaction History -->
      <div class="bg-white rounded-xl shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Lịch sử giao dịch</h3>
          <p class="text-sm text-gray-600 mt-1">
            {{ filteredTransactions.length }} giao dịch
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="p-8 text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="text-gray-500 mt-2">Đang tải dữ liệu...</p>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="filteredTransactions.length === 0"
          class="p-8 text-center"
        >
          <svg
            class="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <p class="text-gray-500">Không có giao dịch nào</p>
        </div>

        <!-- Transaction List -->
        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="transaction in filteredTransactions"
            :key="transaction.maGD"
            class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            @click="viewTransactionDetail(transaction)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div
                    :class="getTransactionIconClass(transaction.loaiGD)"
                    class="w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        v-if="transaction.loaiGD === 'NAPTIEN'"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                      <path
                        v-else-if="transaction.loaiGD === 'THANHTOAN'"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                      <path
                        v-else
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center space-x-2">
                    <p class="text-sm font-medium text-gray-900">
                      {{ getTransactionTypeLabel(transaction.loaiGD) }}
                    </p>
                    <span
                      :class="getStatusBadgeClass(transaction.trangThaiGD)"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                    >
                      {{ getStatusLabel(transaction.trangThaiGD) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ formatDate(transaction.thoiGianGD) }}
                  </p>
                  <p
                    v-if="transaction.chiTietGD"
                    class="text-xs text-gray-400 mt-1 truncate"
                  >
                    {{ transaction.chiTietGD }}
                  </p>
                  <p
                    v-if="transaction.idDonHangGD"
                    class="text-xs text-gray-400 mt-1"
                  >
                    Đơn hàng: #{{ transaction.idDonHangGD }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <p
                  :class="getAmountClass(transaction.loaiGD)"
                  class="text-sm font-semibold"
                >
                  {{ getAmountPrefix(transaction.loaiGD)
                  }}{{ formatCurrency(transaction.soTienGD) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <span class="px-3 py-2 text-sm text-gray-700">
            Trang {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </nav>
      </div>
    </div>

    <!-- Transaction Detail Modal -->
    <div
      v-if="selectedTransaction"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Chi tiết giao dịch</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Mã giao dịch:</span>
            <span class="font-medium">#{{ selectedTransaction.maGD }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Loại giao dịch:</span>
            <span class="font-medium">{{
              getTransactionTypeLabel(selectedTransaction.loaiGD)
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Số tiền:</span>
            <span
              :class="getAmountClass(selectedTransaction.loaiGD)"
              class="font-medium"
            >
              {{ getAmountPrefix(selectedTransaction.loaiGD)
              }}{{ formatCurrency(selectedTransaction.soTienGD) }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Trạng thái:</span>
            <span
              :class="getStatusBadgeClass(selectedTransaction.trangThaiGD)"
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
            >
              {{ getStatusLabel(selectedTransaction.trangThaiGD) }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Thời gian:</span>
            <span class="font-medium">{{
              formatDate(selectedTransaction.thoiGianGD)
            }}</span>
          </div>
          <div
            v-if="selectedTransaction.idDonHangGD"
            class="flex justify-between"
          >
            <span class="text-gray-600">Đơn hàng:</span>
            <span class="font-medium"
              >#{{ selectedTransaction.idDonHangGD }}</span
            >
          </div>
          <div v-if="selectedTransaction.chiTietGD" class="border-t pt-3">
            <span class="text-gray-600">Chi tiết:</span>
            <p class="text-sm text-gray-900 mt-1">
              {{ selectedTransaction.chiTietGD }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const mssv = computed(() => route.params.id);

// Reactive data
const loading = ref(false);
const walletData = ref(null);
const transactions = ref([]);
const selectedTransaction = ref(null);
const currentPage = ref(0);
const totalPages = ref(1);
const { $api } = useNuxtApp();
// Filters
const filters = ref({
  loaiGD: "",
  trangThaiGD: "",
  timeRange: "all",
});

// Computed properties
const filteredTransactions = computed(() => {
  let filtered = [...transactions.value];

  if (filters.value.loaiGD) {
    filtered = filtered.filter((t) => t.loaiGD === filters.value.loaiGD);
  }

  if (filters.value.trangThaiGD) {
    filtered = filtered.filter(
      (t) => t.trangThaiGD === filters.value.trangThaiGD
    );
  }

  if (filters.value.timeRange !== "all") {
    const now = new Date();
    const timeFilter = {
      today: () => {
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        return new Date(t.thoiGianGD) >= today;
      },
      week: () => {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return new Date(t.thoiGianGD) >= weekAgo;
      },
      month: () => {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return new Date(t.thoiGianGD) >= monthAgo;
      },
    };

    filtered = filtered.filter(timeFilter[filters.value.timeRange]);
  }

  return filtered;
});

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTransactionTypeLabel = (type) => {
  const labels = {
    NAP_TIEN: "Nạp tiền",
    THANH_TOAN: "Thanh toán",
    CHUYEN_TIEN: "Chuyển tiền",
    HOAN_TIEN: "Hoàn tiền",
  };
  return labels[type] || type;
};

const getStatusLabel = (status) => {
  const labels = {
    THANH_CONG: "Thành công",
    DANG_XU_LY: "Đang xử lý",
    THAT_BAI: "Thất bại",
    DA_HUY: "Đã hủy",
  };
  return labels[status] || status;
};

const getStatusBadgeClass = (status) => {
  const classes = {
    DATHANHTOAN: "bg-green-100 text-green-800",
    DANG_XU_LY: "bg-yellow-100 text-yellow-800",
    THAT_BAI: "bg-red-100 text-red-800",
    DA_HUY: "bg-gray-100 text-gray-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getTransactionIconClass = (type) => {
  const classes = {
    NAPTIEN: "bg-green-100 text-green-600",
    THANHTOAN: "bg-red-100 text-red-600",
    CHUYENTIEN: "bg-blue-100 text-blue-600",
    HOANTIEN: "bg-purple-100 text-purple-600",
  };
  return classes[type] || "bg-gray-100 text-gray-600";
};

const getAmountClass = (type) => {
  return type === "NAPTIEN" || type === "HOANTIEN"
    ? "text-green-600"
    : "text-red-600";
};

const getAmountPrefix = (type) => {
  return type === "NAPTIEN" || type === "HOAN_TIEN" ? "+" : "-";
};

const viewTransactionDetail = (transaction) => {
  selectedTransaction.value = transaction;
};

const closeModal = () => {
  selectedTransaction.value = null;
};

const applyFilters = () => {
  // Apply filters logic here
  console.log("Applying filters:", filters.value);
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchTransactions();
  }
};

const refreshData = async () => {
  await fetchWalletData();
  await fetchTransactions();
};

const fetchWalletData = async () => {
  loading.value = true;
  try {

    const response = await $api.get(`/wallet/${mssv.value}`);
    console.log("Wallet data:", response.data);
    // Mock data
    walletData.value = {
      maVDT: response.data.maVDT,
      soDuVDT: response.data.soDuVDT,
    };
  } catch (error) {
    console.error("Error fetching wallet data:", error);
  } finally {
    loading.value = false;
  }
};

const fetchTransactions = async () => {
  loading.value = true;
  try {
    // Mock API call - replace with actual API
    const response = (await $api.get(`/wallet/transactions/${walletData.value.maVDT}?page=${currentPage.value}`)  ).data; ;

    console.log("Transactions data:", response);
    transactions.value = response.content || [];

    totalPages.value = response.totalPages;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  await fetchWalletData();
  await fetchTransactions();
});
</script>