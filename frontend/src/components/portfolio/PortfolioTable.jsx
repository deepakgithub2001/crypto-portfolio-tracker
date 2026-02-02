import { usdFormatter } from "../../utils/currencyFormatter";
import { useRef } from "react";

/* ---------- Profit Cell ---------- */
const ProfitCell = ({ value, previous }) => {
  const isUp = previous !== null && value > previous;
  const isDown = previous !== null && value < previous;

  return (
    <td
      className={`px-4 py-3 font-semibold transition-all duration-500
        ${isUp ? "bg-green-900/40 text-green-400" : ""}
        ${isDown ? "bg-red-900/40 text-red-400" : ""}
      `}
    >
      <div className="flex items-center gap-1">
        {isUp && <span className="text-green-400">▲</span>}
        {isDown && <span className="text-red-400">▼</span>}
        {usdFormatter.format(value)}
      </div>
    </td>
  );
};

/* ---------- Portfolio Table ---------- */
const PortfolioTable = ({ portfolio, onDelete, onEdit }) => {
  const previousProfitRef = useRef({});

  return (
    <div className="overflow-x-auto bg-gray-900 rounded-xl border border-gray-800 shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Coin</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Buy Price</th>
            <th className="px-4 py-3">Current Price</th>
            <th className="px-4 py-3">Profit / Loss</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {portfolio.map((coin) => {
            const previousProfit =
              previousProfitRef.current[coin.id] ?? null;

            // store current profit for next render
            previousProfitRef.current[coin.id] = coin.profit_loss;

            return (
              <tr
                key={coin.id}
                className="border-t border-gray-800 hover:bg-gray-800/50 transition"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {coin.coin}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {coin.quantity}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {usdFormatter.format(coin.buy_price)}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {usdFormatter.format(coin.current_price)}
                </td>

                <ProfitCell
                  value={coin.profit_loss}
                  previous={previousProfit}
                />

                <td className="px-4 py-3">
                  <button
                    onClick={() => onEdit(coin)}
                    className="text-yellow-400 hover:text-yellow-300 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(coin.id)}
                    className="text-red-400 hover:text-red-300"
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
