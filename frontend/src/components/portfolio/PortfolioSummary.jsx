import SummaryCard from "./SummaryCard";

const PortfolioSummary = ({ summary }) => {
  if (!summary) {
    return (
      <div className="p-6 text-center text-gray-600 bg-white
                      rounded-xl border border-gray-200 mb-6 shadow-sm">
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
            ? "border-green-400 text-green-600 bg-green-50"
            : "border-red-400 text-red-600 bg-red-50"
        }
      />
    </div>
  );
};

export default PortfolioSummary;
