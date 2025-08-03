<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Main Card -->
            <div class="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300">
                <!-- Header -->
                <div class="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white text-center">
                    <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <h1 class="text-2xl font-bold mb-2">Nạp Tiền E-Wallet</h1>
                    <p class="text-green-100">Nạp tiền vào ví điện tử của bạn</p>
                </div>

                <!-- Balance Display -->
                <div class="p-6 bg-gray-50">
                    <div class="text-center">
                        <p class="text-gray-600 text-sm mb-2">Số dư hiện tại</p>
                        <p class="text-3xl font-bold text-gray-800">
                            {{ formatCurrency(currentBalance) }}
                        </p>
                    </div>
                </div>

                <!-- Form -->
                <form @submit.prevent="handlePayment" class="p-6 space-y-6">
                    <!-- MSSV Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Mã số sinh viên
                        </label>
                        <input v-model="mssv" type="text" required disabled
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Số tiền nạp
                        </label>
                        <input v-model="selectedAmount" type="text" required placeholder="Nhập số tiền nạp"
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" />
                    </div>

                    <!-- Payment Method -->
                    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-.605 3.803zm.605-3.803h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.136-1.012-4.287C16.472.543 14.464 0 11.894 0H4.434c-.524 0-.972.382-1.054.901L.273 20.597a.641.641 0 0 0 .633.74h4.606c.524 0 .968-.382 1.05-.9l.119-.803z" />
                                </svg>
                            </div>
                            <div>
                                <p class="font-medium text-gray-800">PayPal</p>
                                <p class="text-sm text-gray-600">
                                    Thanh toán an toàn với PayPal
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Summary -->
                    <div class="bg-gray-50 rounded-xl p-4 space-y-2">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Số tiền nạp:</span>
                            <span class="font-medium">{{
                                formatCurrency(selectedAmount)
                            }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Phí giao dịch:</span>
                            <span class="font-medium text-green-600">Miễn phí</span>
                        </div>
                        <div class="border-t pt-2">
                            <div class="flex justify-between font-semibold">
                                <span>Tổng cộng:</span>
                                <span class="text-green-600">{{
                                    formatCurrency(selectedAmount)
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="!selectedAmount || !mssv || isProcessing"
                        class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2">
                        <span v-if="!isProcessing">Nạp tiền với PayPal</span>
                        <span v-else class="flex items-center space-x-2">
                            <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>Đang xử lý...</span>
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>

// Reactive data
const route = useRoute();
const mssv = computed(() => route.params.id);
const selectedAmount = ref(null);
const customAmount = ref(null);
const isProcessing = ref(false);
const currentBalance = ref(null);
const { $api } = useNuxtApp();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.baseURL || "http://localhost:4000";
const fullUrl = baseUrl + route.fullPath;
const successUrl = baseUrl + "/wallet/" + mssv.value + "/success";
// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
};

async function convertVndToUsd(vndAmount) {
  const data = await $fetch('/api/exchange-rate');
  if (!data.success || !data.rate) {
    throw new Error("Không lấy được tỷ giá VND → USD");
  }

  const usdAmount = vndAmount * data.rate;
  return parseFloat(usdAmount.toFixed(2));
}



// Handle payment submission
const handlePayment = async () => {
    if (!selectedAmount.value || !mssv.value) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    isProcessing.value = true;

    try {

        // Create form data
        const usdAmount = await convertVndToUsd(selectedAmount.value);
        const formData = new FormData();
        formData.append("amount", usdAmount);
        formData.append("amountVND", selectedAmount.value);
        formData.append("description", `Nạp tiền vào ví điện tử cho MSSV: ${mssv.value} - Số tiền: ${selectedAmount.value} VND`);
        formData.append("SUCCESS_URL", successUrl);
        formData.append("CANCEL_URL", fullUrl);

        // Submit to your Spring Boot backend
        const response = await $api.post(`paypal/pay`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response)

        if (response.data) {
            // PayPal redirect URL
            const approvalUrl = response.data;
            window.location.href = approvalUrl;
        } else {
            // Handle response
            // Còn lại việc direct trang thành công hoặc hủy khi thanh toán thành công
            const result = await response.text();
            console.log("Payment result:", result);
        }
    } catch (error) {
        console.error("Payment error:", error);
    } finally {
        isProcessing.value = false;
    }
};

// Watch for custom amount changes
watch(customAmount, (newValue) => {
    if (newValue && newValue > 0) {
        selectedAmount.value = newValue;
    }
});

const fetchCurrentBalance = async () => {
    try {
        const response = await $api.get(`/wallet/${mssv.value}`);
        currentBalance.value = response.data.soDuVDT;
    } catch (error) {
        console.error("Error fetching balance:", error);
        // alert("Không thể lấy số dư hiện tại. Vui lòng thử lại sau.");
    }
};

onMounted(() => {
    fetchCurrentBalance();
});
</script>

<style scoped>
/* Additional custom styles if needed */
.animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>