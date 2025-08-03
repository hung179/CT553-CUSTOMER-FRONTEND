export default defineEventHandler(async () => {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/VND');
    const data = await res.json();

    if (data?.result !== 'success') {
      throw new Error('Không lấy được tỷ giá VND → USD');
    }

    const rate = data.rates?.USD;
    if (!rate) {
      throw new Error('Không có tỷ giá USD');
    }

    return { success: true, rate };
  } catch (e) {
    console.error('Exchange rate error:', e);
    return { success: false, error: 'Failed to fetch exchange rate' };
  }
});
