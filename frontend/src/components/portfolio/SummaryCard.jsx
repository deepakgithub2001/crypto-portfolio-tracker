const SummaryCard = ({
  label,
  value,
  highlight = false,
  className = "",
}) => {
  return (
    <div
      className={`p-6 rounded-xl border shadow-sm bg-white
        ${highlight ? className : "border-gray-200"}
      `}
    >
      {/* Label */}
      <p className="text-sm text-gray-600 mb-1">
        {label}
      </p>

      {/* Value */}
      <p className="text-2xl font-bold">
        ₹{Number(value).toLocaleString()}
      </p>
    </div>
  );
};

export default SummaryCard;
