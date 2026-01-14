import SummaryCard from "./SummaryCard";

const PortfolioSummary = ({ summary }) => {
  if (!summary) {
    return (
      <div className="p-6 text-center text-gray-400 bg-gray-900 rounded-xl border border-gray-800 mb-6">
        No portfolio data available
      </div>
    );
  }

  const isProfit = summary.profit_loss >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <SummaryCard
        label="Invested"
        value={summary.invested}
      />

      <SummaryCard
        label="Current Value"
        value={summary.current}
      />

      <SummaryCard
        label="Profit / Loss"
        value={summary.profit_loss}
        highlight
        className={
          isProfit
            ? "border-green-500 text-green-400"
            : "border-red-500 text-red-400"
        }
      />
    </div>
  );
};

export default PortfolioSummary;
