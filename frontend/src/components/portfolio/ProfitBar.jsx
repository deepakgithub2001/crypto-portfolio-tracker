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
      <div className="bg-white p-6 rounded-xl border border-gray-200
                      text-center text-gray-500 mt-6 shadow-sm">
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
      <div className="bg-white p-6 rounded-xl border border-gray-200
                      text-center text-gray-500 mt-6 shadow-sm">
        No profit data available
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200
                    mt-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Invested vs Current Value
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={validData}>
          <XAxis
            dataKey="coin"
            stroke="#6B7280"
            tick={{ fill: "#6B7280" }}
          />

          <YAxis
            stroke="#6B7280"
            tick={{ fill: "#6B7280" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              color: "#111827",
            }}
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
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
