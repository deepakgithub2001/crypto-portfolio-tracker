const TopMovers = ({ data }) => {
  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center text-gray-400 mt-6">
        No data to display
      </div>
    );
  }

  // Keep only valid profit/loss numbers
  const scoredCoins = data.filter(
    (d) => typeof d.profit_loss === "number"
  );

  if (scoredCoins.length === 0) return null;

  // Sort by profit/loss
  const sorted = [...scoredCoins].sort(
    (a, b) => b.profit_loss - a.profit_loss
  );

  const topGainer = sorted[0];
  const topLoser = sorted[sorted.length - 1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* 🚀 Top Gainer */}
      <div className="bg-gray-900 border border-green-700/40 p-6 rounded-xl shadow">
        <h3 className="text-green-400 font-semibold text-sm uppercase mb-2">
          🚀 Top Gainer
        </h3>

        <p className="text-2xl font-bold text-white uppercase">
          {topGainer?.coin || "N/A"}
        </p>

        <p className="text-green-400 mt-2 font-medium">
          +₹{Number(topGainer?.profit_loss || 0).toFixed(2)}
        </p>
      </div>

      {/* 📉 Top Loser */}
      <div className="bg-gray-900 border border-red-700/40 p-6 rounded-xl shadow">
        <h3 className="text-red-400 font-semibold text-sm uppercase mb-2">
          📉 Top Loser
        </h3>

        <p className="text-2xl font-bold text-white uppercase">
          {topLoser?.coin || "N/A"}
        </p>

        <p className="text-red-400 mt-2 font-medium">
          ₹{Number(topLoser?.profit_loss || 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TopMovers;
