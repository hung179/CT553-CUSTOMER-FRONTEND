
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-lg">
      <!-- Loading State -->
      <div
        v-if="isProcessing"
        class="bg-white rounded-2xl shadow-2xl p-8 text-center"
      >
        <div
          class="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-6"
        ></div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          Đang xử lý thanh toán...
        </h2>
        <p class="text-gray-600">Vui lòng đợi trong giây lát</p>
      </div>

      <!-- Success State -->
      <div
        v-else-if="paymentStatus === 'success'"
        class="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 scale-100 animate-pulse-slow"
      >
        <!-- Success Header -->
        <div
          class="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center"
        >
          <div
            class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"
          >
            <svg
              class="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold mb-2">Thanh toán thành công!</h1>
          <p class="text-green-100">Giao dịch đã được xử lý thành công</p>
        </div>

        <!-- Payment Details -->
        <div class="p-8 space-y-6">
          <!-- Transaction Info -->
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="font-semibold text-gray-800 mb-3 flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Thông tin giao dịch
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Mã giao dịch:</span>
                <span class="font-mono text-gray-800">{{
                  paymentDetails.paymentId
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">MSSV:</span>
                <span class="font-semibold text-blue-600">{{
                  paymentDetails.mssv
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Số tiền:</span>
                <span class="font-semibold text-green-600">{{
                  formatCurrency(paymentDetails.amount)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Thời gian:</span>
                <span class="text-gray-800">{{
                  formatDateTime(paymentDetails.timestamp)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Phương thức:</span>
                <span class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-1 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-.605 3.803zm.605-3.803h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.136-1.012-4.287C16.472.543 14.464 0 11.894 0H4.434c-.524 0-.972.382-1.054.901L.273 20.597a.641.641 0 0 0 .633.74h4.606c.524 0 .968-.382 1.05-.9l.119-.803z"
                    />
                  </svg>
                  PayPal
                </span>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div class="bg-green-50 border border-green-200 rounded-xl p-4">
            <div class="flex items-start space-x-3">
              <svg
                class="w-6 h-6 text-green-500 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h4 class="font-semibold text-green-800">
                  Nạp tiền thành công!
                </h4>
                <p class="text-green-700 text-sm mt-1">
                  Số tiền {{ formatCurrency(paymentDetails.amount) }} đã được
                  thêm vào ví điện tử của bạn. Bạn có thể sử dụng ngay bây giờ.
                </p>
              </div>
            </div>
          </div>

          <!-- New Balance Display -->
          <div
            class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4"
          >
            <div class="text-center">
              <p class="text-gray-600 text-sm mb-2">Số dư ví sau giao dịch</p>
              <p
                class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {{ formatCurrency(newBalance) }}
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              @click="goToWallet"
              class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
              <span>Xem ví của tôi</span>
            </button>

            <button
              @click="goHome"
              class="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span>Về trang chủ</span>
            </button>
          </div>

          <!-- Download Receipt -->
          <button
            @click="downloadReceipt"
            class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <span>Tải hóa đơn</span>
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="paymentStatus === 'error'"
        class="bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div
          class="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white text-center"
        >
          <div
            class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-10 h-10 text-red-500"
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
          </div>
          <h1 class="text-2xl font-bold mb-2">Thanh toán thất bại</h1>
          <p class="text-red-100">Có lỗi xảy ra trong quá trình xử lý</p>
        </div>

        <div class="p-8 text-center space-y-4">
          <p class="text-gray-600">{{ errorMessage }}</p>
          <button
            @click="retryPayment"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Thử lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: "Kết quả thanh toán - Student Market",
  meta: [
    { name: "description", content: "Kết quả thanh toán nạp tiền ví điện tử" },
  ],
});

// Get route parameters and query
const route = useRoute();
const router = useRouter();
// Reactive data
const isProcessing = ref(true);
const paymentStatus = ref(null);
const paymentDetails = ref({});
const newBalance = ref(0);
const errorMessage = ref("");
const { $api } = useNuxtApp();
// Extract parameters from URL
const mssv = computed(() => route.params.id);
const paymentId = route.query.paymentId;
const payerId = route.query.PayerID;

onMounted(async () => {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    // Call your Spring Boot success endpoint
    const response = await $api.get(
      `paypal/success/${mssv.value}?paymentId=${paymentId}&payerId=${payerId}`
    );

    if (response) {
      console.log("Payment response:", response);
      const result = await response.data;

      if (result.status === "success") {
        paymentStatus.value = "success";

        paymentDetails.value = {
          paymentId: result.paymentId,
          mssv: result.mssv,
          amount: result.convertedAmount,
          timestamp: result.timestamp,
        };
        console.log("Payment details:", paymentDetails.value);
        newBalance.value = result.newBalance;

        router.replace({
          path: route.path,
          query: {},
        });
      } else {
        throw new Error("Payment not approved");
      }
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    paymentStatus.value = "error";
    errorMessage.value =
      "Không thể xử lý thanh toán. Vui lòng liên hệ hỗ trợ khách hàng.";
  } finally {
    isProcessing.value = false;
  }
});

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Format date time
const formatDateTime = (timestamp) => {
  return new Date(timestamp).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Navigation functions
const goToWallet = () => {
  router.push(`/wallet/${mssv.value}`);
};

const goHome = () => {
  router.push("/");
};

const retryPayment = () => {
  router.push("/wallet/" + mssv.value + "/pay");
};

// Download receipt
const downloadReceipt = () => {
  const receiptData = {
    transactionId: paymentDetails.value.paymentId,
    mssv: paymentDetails.value.mssv,
    amount: paymentDetails.value.amount,
    timestamp: paymentDetails.value.timestamp,
    method: "PayPal",
  };

  const dataStr = JSON.stringify(receiptData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `receipt-${paymentDetails.value.paymentId}.json`;
  link.click();

  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
</style>