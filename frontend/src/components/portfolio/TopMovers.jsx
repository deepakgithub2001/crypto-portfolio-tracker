const TopMovers = ({ data }) => {
  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200
                      text-center text-gray-500 mt-6 shadow-sm">
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
      <div className="bg-green-50 border border-green-200
                      p-6 rounded-xl shadow-sm">
        <h3 className="text-green-600 font-semibold text-sm uppercase mb-2">
          🚀 Top Gainer
        </h3>

        <p className="text-2xl font-bold text-gray-900 uppercase">
          {topGainer?.coin || "N/A"}
        </p>

        <p className="text-green-600 mt-2 font-medium">
          +₹{Number(topGainer?.profit_loss || 0).toLocaleString()}
        </p>
      </div>

      {/* 📉 Top Loser */}
      <div className="bg-red-50 border border-red-200
                      p-6 rounded-xl shadow-sm">
        <h3 className="text-red-600 font-semibold text-sm uppercase mb-2">
          📉 Top Loser
        </h3>

        <p className="text-2xl font-bold text-gray-900 uppercase">
          {topLoser?.coin || "N/A"}
        </p>

        <p className="text-red-600 mt-2 font-medium">
          ₹{Number(topLoser?.profit_loss || 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TopMovers;
