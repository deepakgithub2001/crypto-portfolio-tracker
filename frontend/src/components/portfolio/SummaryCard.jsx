const SummaryCard = ({ label, value = 0, highlight }) => {
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
        ₹{Number(value).toFixed(2)}
      </h3>
    </div>
  );
};

export default SummaryCard;
