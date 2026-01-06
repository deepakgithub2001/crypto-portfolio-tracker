import consumer from "./consumer";

export const subscribeToPortfolio = () => {
  return consumer.subscriptions.create(
    { channel: "PortfolioChannel" },
    {
      connected() {
        console.log("✅ Connected to PortfolioChannel");
      },

      disconnected() {
        console.log("❌ Disconnected from PortfolioChannel");
      },

      received(data) {
        if (data.type === "PORTFOLIO_UPDATE") {
          console.log("📡 Live portfolio update:", data.payload);

          window.dispatchEvent(
            new CustomEvent("portfolio:update", {
              detail: data.payload,
            })
          );
        }
      },
    }
  );
};
