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
        '#ff6b6b', '#ff89b3', '#d687f2', '#9d7bf4', '#7da7f2', '#68e0ff',
        '#58d6f7', '#54cccf', '#6ace9f', '#93e06d', '#e7f36f', '#f7ea65',
        '#fde74c', '#ffa600', '#ffc300', '#ff7f50'
    ];
    return (
        <div className="bg-white min-h-[60vh] text-black font-sans p-8 rounded-xl shadow-2xl mt-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Tags Solved
                </h2>

                    <ResponsiveContainer width="100%" height={500}>

                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={90}
                                outerRadius={180}
                                paddingAngle={2}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" align="right" verticalAlign="middle" />
                        </PieChart>
                    </ResponsiveContainer>


            </div>
        </div>

    )

}