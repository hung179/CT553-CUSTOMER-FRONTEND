export async function getUser(mssv: string) {
    const { $api } = useNuxtApp();
    const authStore = useAuthStore();


    const user = (await $api.get(`students/${mssv}`,
    {
        headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
        }
    }
    )).data;
    console.log(user)
    if (user)
        return user;
}