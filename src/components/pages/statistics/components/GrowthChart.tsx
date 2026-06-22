import { motion } from "motion/react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";

interface GrowthTimelinePoint {
    month: string;
    users: number;
    sessions: number;
}

interface GrowthChartProps {
    data?: GrowthTimelinePoint[];
}

export function GrowthChart({ data = [] }: GrowthChartProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm"
        >
            <div className="mb-6 text-right">
                <h3 className="text-xl font-bold text-gray-900 mb-2">צמיחה לאורך זמן</h3>
                <p className="text-gray-600 text-sm">משתמשים ושיעורים חודשיים</p>
            </div>

            {data.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-500">
                    אין נתונים להצגה
                </div>
            ) : (
                <div dir="ltr">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#40E0D0" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#40E0D0" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#A66CFF" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#A66CFF" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />

                            <XAxis
                                dataKey="month"
                                stroke="rgba(0,0,0,0.4)"
                                tick={{ fontSize: 12 }}
                                tickMargin={10}
                            />

                            <YAxis
                                width={45}
                                tickMargin={8}
                                stroke="rgba(0,0,0,0.4)"
                                tick={{ fontSize: 12 }}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                    color: "#000",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                                formatter={(value, name) => {
                                    const safeValue: string | number =
                                        typeof value === "number" || typeof value === "string"
                                            ? value
                                            : Array.isArray(value)
                                                ? value.join(" ~ ")
                                                : "";

                                    const safeName =
                                        name === "users"
                                            ? "משתמשים"
                                            : name === "sessions"
                                                ? "שיעורים"
                                                : String(name ?? "");

                                    return [safeValue, safeName];
                                }}
                                labelFormatter={(label) => `חודש: ${label}`}
                            />

                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke="#40E0D0"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorUsers)"
                            />

                            <Area
                                type="monotone"
                                dataKey="sessions"
                                stroke="#A66CFF"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorSessions)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}

            <div className="flex gap-6 mt-4 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#40E0D0]" />
                    <span className="text-gray-600 text-sm">משתמשים</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#A66CFF]" />
                    <span className="text-gray-600 text-sm">שיעורים</span>
                </div>
            </div>
        </motion.div>
    );
}