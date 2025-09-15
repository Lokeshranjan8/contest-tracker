import {BarChart,Bar,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts";

export default function Barrating({data}) {

  data = Object.entries(data).map(([rating, count]) =>({
    name: rating,
    uv: count,
  }));

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded shadow-lg border border-gray-600">
          <p className="text-gray-200 font-medium">{`Rating ${label}: ${payload[0].value} problems`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md border border-gray-700 p-6 mt-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          Problems by Rating
        </h3>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#d1d5db' }}
                axisLine={{ stroke: '#6b7280' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#d1d5db' }}
                axisLine={{ stroke: '#6b7280' }}
              />
              <Tooltip content={customTooltip} />
              <Bar 
                dataKey="uv" 
                fill="#3b82f6" 
                barSize={35} 
                radius={[2, 2, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
