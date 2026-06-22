import { motion } from 'motion/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

type CourseItem = {
    name: string;
    count: number;
};

type CoursesBarChartProps = {
    courses: CourseItem[];
};

interface TickProps {
    x: string | number;
    y: string | number;
    payload: { value: string | number };
}

function splitLabel(label: string): string[] {
    const words = label.split(' ');

    if (words.length <= 2) {
        return [label];
    }

    const middle = Math.ceil(words.length / 2);
    return [
        words.slice(0, middle).join(' '),
        words.slice(middle).join(' '),
    ];
}

function CustomXAxisTick({ x, y, payload }: TickProps) {
    const lines = splitLabel(String(payload.value));

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={10}
                textAnchor="middle"
                fill="rgba(0,0,0,0.4)"
                fontSize={11}
            >
                {lines.map((line, index) => (
                    <tspan key={index} x={0} dy={index === 0 ? 0 : 14}>
                        {line}
                    </tspan>
                ))}
            </text>
        </g>
    );
}

function CustomYAxisTick({ x, y, payload }: TickProps) {

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={4}
                textAnchor="end"
                fill="rgba(0,0,0,0.4)"
                fontSize={12}
            >
                {payload.value}
            </text>
        </g>
    );
}

export function CoursesBarChart({ courses }: CoursesBarChartProps) {
    const palette = ['#40E0D0', '#2E86DE', '#A66CFF'];

    const data = courses.map((course, index) => ({
        name: course.name,
        value: course.count,
        color: palette[index % palette.length],
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm"
        >
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">קורסים מבוקשים</h3>
                <p className="text-gray-600 text-sm">מספר בקשות לשיעורי עזר</p>
            </div>

            <div dir="ltr">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 10, bottom: 35 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />

                        <XAxis
                            dataKey="name"
                            stroke="rgba(0,0,0,0.4)"
                            tick={(props: TickProps) => <CustomXAxisTick {...props} />}
                            height={60}
                            interval={0}
                            tickLine={false}
                            axisLine={true}
                        />

                        <YAxis
                            stroke="rgba(0,0,0,0.4)"
                            tick={(props: TickProps) => <CustomYAxisTick {...props} />}
                            width={38}
                            tickMargin={8}
                            tickLine={false}
                            axisLine={true}
                            allowDecimals={false}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                color: '#000',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                            cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }}
                        />

                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}