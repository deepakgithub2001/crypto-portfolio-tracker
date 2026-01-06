import { useRef } from "react";

/* ---------- Profit Cell ---------- */
const ProfitCell = ({ value, previous }) => {
  const isUp = previous !== null && value > previous;
  const isDown = previous !== null && value < previous;

  return (
    <td
      className={`px-4 py-2 font-semibold transition-colors duration-500
        ${isUp ? "bg-green-100 text-green-700" : ""}
        ${isDown ? "bg-red-100 text-red-700" : ""}
      `}
    >
      ₹{value.toFixed(2)}
    </td>
  );
};

/* ---------- Portfolio Table ---------- */
const PortfolioTable = ({ portfolio, onDelete, onEdit }) => {
  const previousProfitRef = useRef({});

  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>Coin</th>
          <th>Quantity</th>
          <th>Buy Price</th>
          <th>Current Price</th>
          <th>Profit / Loss</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {portfolio.map((coin) => {
          const previousProfit =
            previousProfitRef.current[coin.id] ?? null;

          // Store current profit for next render
          previousProfitRef.current[coin.id] = coin.profit_loss;

          return (
            <tr key={coin.id}>
              <td>{coin.coin}</td>
              <td>{coin.quantity}</td>
              <td>₹{coin.buy_price}</td>
              <td>₹{coin.current_price}</td>

              {/* 👇 THIS is the important change */}
              <ProfitCell
                value={coin.profit_loss}
                previous={previousProfit}
              />

              <td>
                <button
                  onClick={() => onEdit(coin)}
                  className="text-yellow-600 hover:underline mx-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(coin.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PortfolioTable;
