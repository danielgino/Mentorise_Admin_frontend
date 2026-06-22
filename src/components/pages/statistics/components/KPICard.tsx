import { motion } from 'motion/react';
import type {LucideIcon} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter.tsx';

interface KPICardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;
    delay: number;
    prefix?: string;
    suffix?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export function KPICard({
                            title,
                            value,
                            icon: Icon,
                            color,
                            delay,
                            prefix = '',
                            suffix = '',
                            trend
                        }: KPICardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay / 1000 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                        <Icon size={28} style={{ color }} />
                    </div>

                    {trend && (
                        <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                            trend.isPositive ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
                        }`}>
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <div className="text-4xl font-bold text-gray-900">
                        <AnimatedCounter
                            value={value}
                            delay={delay}
                            prefix={prefix}
                            suffix={suffix}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
