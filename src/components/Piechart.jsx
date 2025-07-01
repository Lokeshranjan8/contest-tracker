import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer} from "recharts";

export default function Piechart() {
    const data = [
        { name: 'greedy', value: 23 },
        { name: 'math', value: 15 },
        { name: 'constructive algorithms', value: 13 },
        { name: 'implementation', value: 12 },
        { name: 'brute force', value: 9 },
        { name: 'sortings', value: 5 },
        { name: 'binary search', value: 4 },
        { name: 'two pointers', value: 4 },
        { name: 'strings', value: 3 },
        { name: 'dp', value: 3 },
        { name: 'number theory', value: 3 },
        { name: 'bitmasks', value: 2 },
        { name: 'data structures', value: 2 },
        { name: 'graphs', value: 1 },
        { name: 'probabilities', value: 1 },
        { name: 'interactive', value: 1 }
    ];

    const COLORS = [ 
        '#1f77b4','#ff4136','#2ca02c', '#9467bd', '#8c564b', 
        '#e377c2','#7f7f7f', '#bcbd22', '#17becf', '#005f73', '#0a9396', 
        '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#6a040f'
    ];

    const customTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-gray-700 font-medium">{`${payload[0].name}: ${payload[0].value} problems`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Problems by Tags
                </h3>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                    <div className="w-full lg:w-2/3">
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={140}
                                    paddingAngle={1}
                                    labelLine={false}
                                    label={({value, percent}) => percent > 5 ? `${value}` : ''}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={customTooltip} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="max-h-80 overflow-y-auto">
                            <div className="space-y-2">
                                {data.map((entry, index) => (
                                    <div key={entry.name} className="flex items-center text-sm">
                                        <div 
                                            className="w-3 h-3 rounded-sm mr-2 flex-shrink-0"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        ></div>
                                        <span className="text-gray-700 truncate">
                                            {entry.name} ({entry.value})
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}