const SummaryCard = ({ label, value, highlight, className = "" }) => {
  return (
    <div
      className={`bg-gray-900 border border-gray-800 rounded-xl p-6 shadow
                  ${highlight ? "font-semibold" : ""}
                  ${className}`}
    >
      <p className="text-sm text-gray-400 mb-2">{label}</p>

      <p className="text-2xl text-white">
        ₹{Number(value).toLocaleString()}
      </p>
    </div>
  );
};

export default SummaryCard;
