const PortfolioTable = ({ portfolio, onDelete, onEdit }) => {
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
        {portfolio.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.coin}</td>
            <td>{coin.quantity}</td>
            <td>₹{coin.buy_price}</td>
            <td>₹{coin.current_price}</td>
            <td
              style={{ color: coin.profit_loss >= 0 ? "green" : "red" }}
            >
              ₹{coin.profit_loss}
            </td>
            <td>
              <button
                onClick={() => onEdit(coin)}
                className="text-yellow-600 hover:underline mx-2">
                Edit
              </button>
              <button
                onClick={() => onDelete(coin.id)}
                className="text-red-600 hover:underline">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PortfolioTable;
