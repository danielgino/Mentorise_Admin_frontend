import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { CircularProgress } from './CircularProgress.tsx';
import { AnimatedCounter } from './AnimatedCounter.tsx';

interface StatCardProps {
    title: string;
    value: number;
    maxValue: number;
    icon: LucideIcon;
    color: string;
    delay: number;
    suffix?: string;
    prefix?: string;
    topLabel?: string;
}

export function StatCard({
                             title,
                             value,
                             maxValue,
                             icon: Icon,
                             color,
                             delay,
                             suffix = '',
                             prefix = '',
                             topLabel
                         }: StatCardProps) {
    const rawDigitsLength = value.toString().length;

    const valueScale =
        rawDigitsLength >= 6
            ? 0.82
            : rawDigitsLength === 5
                ? 0.95
                : rawDigitsLength === 4
                    ? 0.98
                    : 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay / 1000 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="relative flex flex-col items-center gap-4">
                <div className="p-3 rounded-full bg-gray-50 border border-gray-100">
                    <Icon size={24} style={{ color }} />
                </div>

                <CircularProgress
                    value={value}
                    maxValue={maxValue}
                    size={140}
                    strokeWidth={10}
                    color={color}
                    delay={delay}
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                        className="mt-10 w-[110px] text-center font-bold leading-none text-gray-900 origin-center"
                        style={{
                            transform: `scale(${valueScale})`,
                        }}
                    >
                        <AnimatedCounter
                            value={value}
                            delay={delay}
                            prefix={prefix}
                            suffix={suffix}
                        />
                    </div>
                </div>

                <div className="mt-2 text-center">
                    {topLabel && (
                        <p className="text-xs text-gray-500 font-medium mb-1 break-words max-w-[220px] mx-auto">
                            {topLabel}
                        </p>
                    )}

                    <h3 className="text-center text-gray-600 text-sm font-medium">
                        {title}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
}