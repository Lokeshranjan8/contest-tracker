import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Barrating() {
  const data = [
    { name: "800", uv: 15 },
    { name: "900", uv: 3 },
    { name: "1000", uv: 2 },
    { name: "1100", uv: 4 },
    { name: "1200", uv: 7 },
    { name: "1300", uv: 2 },
    { name: "1400", uv: 1 },
    { name: "1500", uv: 2 },
    { name: "1600", uv: 4 },
    { name: "1700", uv: 1 },
  ];

  return (
    <div className="bg-emerald-200 min-h-[60vh] text-black font-sans p-6 rounded-xl shadow-lg mt-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-6">
          Problem Ratings Breakdown
        </h2>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" name="Problems Solved" fill="#34d399" barSize={40} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
