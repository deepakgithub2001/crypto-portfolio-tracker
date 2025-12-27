const PortfolioSummary = ({ summary }) => {
  return (
    <div className="flex gap-6 mb-8">
      <SummaryCard label="Invested" value={summary.invested} />
      <SummaryCard label="Current Value" value={summary.current} />
      <SummaryCard
        label="Profit / Loss"
        value={summary.profit_loss}
        highlight
      />
    </div>
  );
};

const SummaryCard = ({ label, value, highlight }) => {
  const color =
    highlight && value >= 0
      ? "text-green-600"
      : highlight && value < 0
      ? "text-red-600"
      : "text-gray-900";

  return (
    <div className="border rounded-lg p-5 min-w-[160px] bg-white shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className={`text-xl font-semibold mt-2 ${color}`}>
        ₹{value}
      </h3>
    </div>
  );
};

export default PortfolioSummary;
