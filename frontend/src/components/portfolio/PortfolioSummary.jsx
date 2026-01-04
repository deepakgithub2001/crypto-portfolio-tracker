import SummaryCard from "./SummaryCard";

const PortfolioSummary = ({ summary }) => {
  if (!summary) {
    return (
      <div className="p-4 text-center text-gray-500">
        No portfolio data available
      </div>
    );
  }

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

export default PortfolioSummary;
