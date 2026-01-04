import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AllocationPie = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow text-center text-gray-500">
        No allocation data available
      </div>
    );
  }

  // keep only valid invested values
  const validData = data.filter(
    (d) => typeof d.invested === "number" && d.invested > 0
  );

  if (validData.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow text-center text-gray-500">
        No allocation data available
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Portfolio Allocation
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={validData}
            dataKey="invested"
            nameKey="coin"
            outerRadius={100}
            label
          >
            {validData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllocationPie;
