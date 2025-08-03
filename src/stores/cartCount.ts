// stores/cartStore.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
    const cartCount = ref(0);
    const { $api } = useNuxtApp();

    const fetchCartCount = async (userId: string, token: string) => {
        try {
            const { data } = await $api.get(`/students/cart/all/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            cartCount.value = data.items.length;
        } catch (error) {
            console.error("Lỗi khi fetch số lượng sản phẩm:", error);
        }
    };

    return {
        cartCount,
        fetchCartCount,
    };
});
