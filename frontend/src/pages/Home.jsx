import { useEffect, useState } from "react";
import { subscribeToPrices } from "../cable/pricesChannel";

const Home = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const sub = subscribeToPrices((data) => {
      console.log("📡 Price tick received:", data);
      setPrices(data.prices); // ✅ IMPORTANT
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        Live Crypto Prices ⚡
      </h1>

      {!prices ? (
        <p className="text-gray-400">Waiting for live prices…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(prices).map(([coin, data]) => (
            <div
              key={coin}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold uppercase">
                {coin}
              </h3>
              <p className="text-green-400 text-xl">
                ₹{data.price}
              </p>
              <p className="text-sm text-gray-400">
                Prev: ₹{data.previous_price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
