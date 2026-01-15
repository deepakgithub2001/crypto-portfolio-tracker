import consumer from "./consumer";

export const subscribeToPrices = (callback) => {
  return consumer.subscriptions.create("PricesChannel", {
    connected() {
      console.log("✅ Connected to PricesChannel");
    },

    received(data) {
      console.log("📡 RAW DATA RECEIVED:", data);

      if (data?.prices) {
        callback(data.prices);
      } else {
        console.warn("⚠️ No prices key in data", data);
      }
    },

    disconnected() {
      console.log("❌ Disconnected from PricesChannel");
    },
  });
};
