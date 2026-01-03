const TopMovers = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  // Filter invalid entries first (important!)
  const validData = data.filter(
    (d) => typeof d.profit_loss === "number"
  );

  if (validData.length === 0) return null;

  const sorted = [...validData].sort(
    (a, b) => b.profit_loss - a.profit_loss
  );

  const topGainer = sorted[0];
  const topLoser = sorted[sorted.length - 1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  {/* Top Gainer */}
  <div className="bg-green-50 border border-green-300 p-4 rounded shadow">
    <h3 className="text-green-700 font-semibold text-lg mb-2">
      🚀 Top Gainer
    </h3>
    <p className="text-xl font-bold uppercase">
      {topGainer?.coin || "N/A"}
    </p>
    <p className="text-green-600 mt-1">
      Profit: ₹{Number(topGainer?.profit_loss || 0).toFixed(2)}
    </p>
  </div>

  {/* Top Loser */}
  <div className="bg-red-50 border border-red-300 p-4 rounded shadow">
    <h3 className="text-red-700 font-semibold text-lg mb-2">
      📉 Top Loser
    </h3>
    <p className="text-xl font-bold uppercase">
      {topLoser?.coin || "N/A"}
    </p>
    <p className="text-red-600 mt-1">
      Loss: ₹{Number(topLoser?.profit_loss || 0).toFixed(2)}
    </p>
  </div>
</div>
  );
};

export default TopMovers;
