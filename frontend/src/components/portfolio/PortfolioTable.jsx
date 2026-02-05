import { useEffect, useRef, useState } from "react";
import { usdFormatter } from "../../utils/currencyFormatter";

/* ---------- Utils ---------- */
const calculateProfitPercent = (buyPrice, currentPrice) => {
  if (!buyPrice || buyPrice === 0) return 0;
  return ((currentPrice - buyPrice) / buyPrice) * 100;
};

/* ---------- Profit Cell (with animation) ---------- */
const ProfitCell = ({ value }) => {
  const prevRef = useRef(null);
  const [direction, setDirection] = useState(null); // "up" | "down" | null

  useEffect(() => {
    if (prevRef.current !== null) {
      if (value > prevRef.current) setDirection("up");
      else if (value < prevRef.current) setDirection("down");
    }

    prevRef.current = value;

    const timer = setTimeout(() => setDirection(null), 800);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <td
      className={`px-4 py-3 font-semibold transition-all duration-700
        ${direction === "up" ? "bg-green-50 text-green-600" : ""}
        ${direction === "down" ? "bg-red-50 text-red-600" : ""}
      `}
    >
      <div className="flex items-center gap-1">
        {direction === "up" && <span>▲</span>}
        {direction === "down" && <span>▼</span>}
        {usdFormatter.format(value)}
      </div>
    </td>
  );
};

/* ---------- Profit % Cell ---------- */
const ProfitPercentCell = ({ value }) => {
  const isUp = value > 0;
  const isDown = value < 0;

  return (
    <td
      className={`px-4 py-3 font-semibold
        ${isUp ? "text-green-600" : ""}
        ${isDown ? "text-red-600" : ""}
      `}
    >
      {isUp && "+"}
      {value.toFixed(2)}%
    </td>
  );
};

/* ---------- Portfolio Table ---------- */
const PortfolioTable = ({ portfolio, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl
                    border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Coin</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Buy Price</th>
            <th className="px-4 py-3">Current Price</th>
            <th className="px-4 py-3">Profit / Loss</th>
            <th className="px-4 py-3">Profit %</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {portfolio.map((coin) => {
            const profitPercent = calculateProfitPercent(
              coin.buy_price,
              coin.current_price
            );

            return (
              <tr
                key={coin.id}
                className="border-t border-gray-200
                           hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium text-gray-900 uppercase">
                  {coin.coin}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {coin.quantity}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {usdFormatter.format(coin.buy_price)}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {usdFormatter.format(coin.current_price)}
                </td>

                <ProfitCell value={coin.profit_loss} />

                <ProfitPercentCell value={profitPercent} />

                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(coin)}
                    className="text-yellow-600 hover:text-yellow-500 mr-4 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(coin.id)}
                    className="text-red-600 hover:text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
