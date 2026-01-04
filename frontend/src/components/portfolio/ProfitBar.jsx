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
      <div className="bg-white p-6 rounded shadow text-center text-gray-500">
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
      <div className="bg-white p-6 rounded shadow text-center text-gray-500">
        No profit data available
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Invested vs Current Value
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={validData}>
          <XAxis dataKey="coin" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="invested" fill="#8884d8" />
          <Bar dataKey="current" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitBar;
