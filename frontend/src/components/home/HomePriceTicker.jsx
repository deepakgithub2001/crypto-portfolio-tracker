import { useEffect, useState } from "react";
import { subscribeToPrices } from "../../cable/pricesChannel";

const HomePriceTicker = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const subscription = subscribeToPrices((newPrices) => {
      setPrices(newPrices);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        📈 Live Crypto Prices
      </h2>

      <div className="space-y-3">
        {Object.entries(prices).map(
          ([coin, { price, previous_price }]) => {
            const isUp = price > previous_price;
            const isDown = price < previous_price;

            return (
              <div
                key={coin}
                className="flex justify-between items-center p-3 bg-gray-800 rounded-lg"
              >
                <span className="uppercase font-medium">
                  {coin}
                </span>

                <span
                  className={`font-semibold transition-colors
                    ${isUp ? "text-green-400" : ""}
                    ${isDown ? "text-red-400" : ""}
                  `}
                >
                  ₹{price}
                </span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default HomePriceTicker;
