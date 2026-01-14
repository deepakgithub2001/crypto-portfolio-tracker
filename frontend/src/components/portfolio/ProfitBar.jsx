import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ProfitBar = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center text-gray-400 mt-6">
        No profit data available
      </div>
    );
  }

  // ensure valid numbers
  const validData = data.filter(
    (d) =>
      typeof d.invested === "number" &&
      typeof d.current === "number"
  );

  if (validData.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center text-gray-400 mt-6">
        No profit data available
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mt-8">
      <h2 className="text-lg font-semibold text-white mb-4">
        Invested vs Current Value
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={validData}>
          <XAxis
            dataKey="coin"
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF" }}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />

          <Legend />

          <Bar
            dataKey="invested"
            name="Invested"
            fill="#6366F1" // indigo
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="current"
            name="Current Value"
            fill="#22C55E" // green
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitBar;
