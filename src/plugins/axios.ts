import axios from "axios";
import { useAuthStore } from "../stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const router = useRouter();
    const authStore = useAuthStore();
    
    const api = axios.create({
        baseURL: config.public.apiBase as string,
        withCredentials: true,
    });
    
    // 🛑 Request Interceptor: Thêm accessToken vào mỗi request
    api.interceptors.request.use(
        (config) => {
            if (authStore.accessToken) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${authStore.accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    
    // ⚡ Response Interceptor: Tự động logout khi token hết hạn
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                console.error("Token hết hạn hoặc không hợp lệ:", error);
                authStore.clearAuth();
                router.push("/login");
            }
            return Promise.reject(error);
        }
    );
    
    return {
        provide: {
            api,
        },
    };
});