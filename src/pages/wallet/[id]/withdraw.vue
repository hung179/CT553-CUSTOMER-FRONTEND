<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-2xl mx-auto px-4 py-6">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center space-x-3 mb-4">
          <NuxtLink :to="`/wallet/${mssv}`" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </NuxtLink>
          <h1 class="text-2xl font-bold text-gray-900">Rút tiền từ ví</h1>
        </div>
        <p class="text-gray-600">
          Rút tiền từ ví điện tử về tài khoản PayPal của bạn
        </p>
      </div>

      <!-- Current Balance Card -->
      <div class="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <div class="text-center">
          <p class="text-blue-100 text-sm font-medium mb-1">Số dư có thể rút</p>
          <h2 class="text-3xl font-bold">
            {{ formatCurrency(currentBalance) }} VNĐ
          </h2>
          <p class="text-blue-100 text-xs mt-2">
            ≈ ${{ (currentBalance / 25000).toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- Withdraw Form -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">
          Thông tin rút tiền
        </h3>

        <!-- PayPal Email -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email PayPal nhận tiền *
          </label>
          <input v-model="paypalEmail" type="email" placeholder="your-email@example.com"
            class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required />
          <p class="text-xs text-gray-500 mt-1">
            Nhập chính xác email PayPal của bạn để nhận tiền
          </p>
        </div>

        <!-- Withdraw amount presets -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Chọn số tiền muốn rút (VNĐ)
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <button v-for="preset in availablePresets" :key="preset" @click="selectWithdrawAmount(preset)" :class="[
              'p-3 border-2 rounded-xl text-center transition-all duration-200',
              selectedWithdrawAmount === preset
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-200 hover:border-red-300 hover:bg-red-50',
            ]">
              <div class="font-semibold">{{ formatCurrency(preset) }}</div>
              <div class="text-xs text-gray-500 mt-1">
                ≈ ${{ (preset / 25000).toFixed(2) }}
              </div>
            </button>
          </div>
        </div>

        <!-- Custom withdraw amount -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Hoặc nhập số tiền tùy chỉnh (VNĐ)
          </label>
          <div class="relative">
            <input v-model="customWithdrawAmount" @input="handleCustomWithdrawAmount" type="number"
              placeholder="Nhập số tiền..."
              class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              :min="minWithdrawAmount" :max="maxWithdrawAmount" />
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span class="text-gray-500 text-sm">VNĐ</span>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            Số tiền tối thiểu: {{ formatCurrency(minWithdrawAmount) }} VNĐ | Tối
            đa: {{ formatCurrency(maxWithdrawAmount) }} VNĐ
          </p>
        </div>

        <!-- Withdraw summary -->
        <div v-if="selectedWithdrawAmount && paypalEmail" class="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
          <h4 class="font-medium text-red-900 mb-3">Tóm tắt rút tiền</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-red-700">Số tiền rút:</span>
              <span class="font-medium text-red-900">{{ formatCurrency(selectedWithdrawAmount) }} VNĐ</span>
            </div>
            <div class="flex justify-between">
              <span class="text-red-700">Phí rút tiền (5%):</span>
              <span class="font-medium text-red-900">{{ formatCurrency(withdrawFee) }} VNĐ</span>
            </div>
            <div class="flex justify-between">
              <span class="text-red-700">Tổng tiền trừ từ ví:</span>
              <span class="font-medium text-red-900">{{ formatCurrency(totalDeduction) }} VNĐ</span>
            </div>
            <div class="border-t border-red-200 pt-2">
              <div class="flex justify-between">
                <span class="text-red-700">Chuyển về PayPal:</span>
                <span class="font-medium text-red-900">${{ (selectedWithdrawAmount / 26000).toFixed(2) }}</span>
              </div>
            </div>
            <div class="border-t border-red-200 pt-2">
              <div class="flex justify-between">
                <span class="text-red-700">Email nhận:</span>
                <span class="font-medium text-red-900 text-xs">{{
                  paypalEmail
                }}</span>
              </div>
            </div>
            <div class="border-t border-red-200 pt-2">
              <div class="flex justify-between text-base font-semibold">
                <span class="text-red-700">Số dư còn lại:</span>
                <span class="text-red-900">{{ formatCurrency(remainingBalance) }} VNĐ</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Validation Messages -->
        <div v-if="validationError" class="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p class="text-red-700 text-sm">{{ validationError }}</p>
        </div>
        <!-- Action buttons -->
        <div class="space-y-3">
          <button @click="processWithdraw" :disabled="!canWithdraw || processing"
            class="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
            <svg v-if="processing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            <span>{{
              processing ? "Đang xử lý..." : "Xác nhận rút tiền"
            }}</span>
          </button>

          <NuxtLink :to="`/wallet/${mssv}`"
            class="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center block">
            Hủy bỏ
          </NuxtLink>
        </div>

        <!-- Important Notes -->
        <div class="mt-6 space-y-4">
          <div class="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z">
                </path>
              </svg>
              <div class="text-sm text-yellow-800">
                <p class="font-medium mb-1">Lưu ý quan trọng</p>
                <ul class="space-y-1 text-xs">
                  <li>• Phí rút tiền là 5% số tiền rút</li>
                  <li>• Thời gian xử lý: 1-3 ngày làm việc</li>
                  <li>• Email PayPal phải chính xác và đã được xác thực</li>
                  <li>• Không thể hủy giao dịch sau khi xác nhận</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-sm text-blue-800">
                <p class="font-medium mb-1">Hỗ trợ khách hàng</p>
                <p class="text-xs">
                  Nếu có vấn đề với giao dịch rút tiền, vui lòng liên hệ bộ phận
                  hỗ trợ để được trợ giúp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :show="showModal" :type="modalType" :title="titleModal" :message="message" :confirmText="confirmText"
    @confirm="handleConfirm()" @cancel="showModal = false" @close="showModal = false" />
</template>

<script setup>
const route = useRoute();
const mssv = computed(() => route.params.id);
const { $api } = useNuxtApp();

const currentBalance = ref(0);
const paypalEmail = ref("");
const selectedWithdrawAmount = ref(null);
const customWithdrawAmount = ref("");
const processing = ref(false);
const validationError = ref("");

const minWithdrawAmount = 50000; // 50k VND
const withdrawFeeRate = 0.05; // 5%

const showModal = ref(false);
const modalType = ref(null);
const titleModal = ref(null);
const message = ref(null);
const confirmText = ref(null);
const handleConfirm = ref();

const showModalConfirm = (element, item) => {
  switch (element.type) {
    case 'LIMITED': {
      handleConfirm.value = async () => { 
        showModal.value = false;
       };
      modalType.value = "warning";
      titleModal.value = "Thông báo";
      message.value = element.message;
      confirmText.value = 'Xác nhận';
      showModal.value = true;
      break;
    }
    case 'SUCCESS': {
      handleConfirm.value = async () => { 
        showModal.value = false;
        await navigateTo(`/wallet/${mssv.value}`);
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


const maxWithdrawAmount = computed(() => {
  return Math.floor(currentBalance.value * 0.9); // Allow up to 90% of balance
});

const availablePresets = computed(() => {
  const presets = [100000, 500000, 1000000, 2000000, 5000000, 10000000];
  return presets.filter(
    (amount) => amount <= maxWithdrawAmount.value && amount >= minWithdrawAmount
  );
});

const withdrawFee = computed(() => {
  return selectedWithdrawAmount.value
    ? Math.ceil(selectedWithdrawAmount.value * withdrawFeeRate)
    : 0;
});

const totalDeduction = computed(() => {
  return selectedWithdrawAmount.value
    ? selectedWithdrawAmount.value + withdrawFee.value
    : 0;
});

const remainingBalance = computed(() => {
  return currentBalance.value - totalDeduction.value;
});

const canWithdraw = computed(() => {
  return (
    paypalEmail.value &&
    selectedWithdrawAmount.value &&
    selectedWithdrawAmount.value >= minWithdrawAmount &&
    totalDeduction.value <= currentBalance.value &&
    !validationError.value
  );
});

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

const selectWithdrawAmount = (amount) => {
  selectedWithdrawAmount.value = amount;
  customWithdrawAmount.value = amount.toString();
  validateWithdraw();
};

const handleCustomWithdrawAmount = () => {
  const amount = parseInt(customWithdrawAmount.value) || 0;
  selectedWithdrawAmount.value = amount > 0 ? amount : null;
  validateWithdraw();
};

const validateWithdraw = () => {
  validationError.value = "";

  if (!selectedWithdrawAmount.value) return;

  if (selectedWithdrawAmount.value < minWithdrawAmount) {
    validationError.value = `Số tiền rút tối thiểu là ${formatCurrency(
      minWithdrawAmount
    )} VNĐ`;
    return;
  }

  if (selectedWithdrawAmount.value > maxWithdrawAmount.value) {
    validationError.value = `Số tiền rút tối đa là ${formatCurrency(
      maxWithdrawAmount.value
    )} VNĐ`;
    return;
  }

  if (totalDeduction.value > currentBalance.value) {
    validationError.value =
      "Số dư không đủ để thực hiện giao dịch (bao gồm phí rút tiền)";
    return;
  }
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const processWithdraw = async () => {
  if (!canWithdraw.value) return;

  if (!validateEmail(paypalEmail.value)) {
    validationError.value = "Email PayPal không hợp lệ";
    return;
  }

  processing.value = true;
  validationError.value = "";

  try {
    const response = await $api.post(`/paypal/withdraw/${mssv.value}`, null, {
      params: {
        email: paypalEmail.value,
        amount: selectedWithdrawAmount.value / 26000,
        amountVND: selectedWithdrawAmount.value,
        currency: 'USD'
      }
    });
    if (response.data.type === "SUCCESS") {

      showModalConfirm(response.data)
    } else {
      validationError.value =
        response.data.message || "Có lỗi xảy ra khi xử lý yêu cầu";
    }
  } catch (error) {
    console.error("Withdraw error:", error);
    validationError.value =
      error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
  } finally {
    processing.value = false;
  }
};

const fetchWalletData = async () => {
  try {
    const response = await $api.get(`/wallet/${mssv.value}`);
    currentBalance.value = response.data.soDuVDT || 0;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
  }
};

watch([selectedWithdrawAmount, paypalEmail], () => {
  validateWithdraw();
});

onMounted(() => {
  fetchWalletData();
});
</script>