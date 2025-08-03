import { getCookie } from 'h3'


export async function getUserId(event?: any) {
    const { $api } = useNuxtApp();
    let token: string | undefined

    if (import.meta.server && event) {
        // Server-side: lấy token từ cookie trong request
        token = getCookie(event, 'access_token')
    } else {
        // Client-side: lấy token từ cookie JS
        const cookie = useCookie('access_token')
        token = cookie.value || undefined
    }
    try {
        if (token) {
            const isActive = (await $api.post(`students/auth/introspect`, { token: token })).data;

            if (isActive.valid) {
                const user = (await $api.get(`students/myInfo`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })).data;
                return user ? user.mssv : null;
            }
        }
    } catch {
        console.error("Không tìm thấy thông tin người dùng");
        return null;
    }
}